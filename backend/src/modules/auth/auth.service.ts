import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { query, queryOne } from '../../database/connection';
import { AppError, UnauthorizedError } from '../../middleware/error-handler';
import { AuthPayload } from '../../middleware/auth';
import { LoginInput, RegisterInput } from './auth.validation';

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role_id: number;
  role_name: string;
  is_active: boolean;
}

function generateTokens(payload: AuthPayload) {
  const accessToken = jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn as any,
  });

  const refreshToken = jwt.sign(
    { userId: payload.userId, type: 'refresh' },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpiresIn as any }
  );

  return { accessToken, refreshToken };
}

export async function login(input: LoginInput) {
  const user = await queryOne<UserRow>(
    `SELECT u.id, u.email, u.password_hash, u.name, u.role_id, r.name as role_name, u.is_active
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.email = $1`,
    [input.email]
  );

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (!user.is_active) {
    throw new UnauthorizedError('Account is deactivated');
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password_hash);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const payload: AuthPayload = {
    userId: user.id,
    email: user.email,
    roleId: user.role_id,
    roleName: user.role_name,
  };

  const tokens = generateTokens(payload);

  // Store refresh token hash
  const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
  await query(
    `UPDATE users SET refresh_token = $1, last_login_at = NOW() WHERE id = $2`,
    [refreshHash, user.id]
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role_name,
    },
    ...tokens,
  };
}

export async function register(input: RegisterInput) {
  const existingUser = await queryOne(
    `SELECT id FROM users WHERE email = $1`,
    [input.email]
  );

  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const roleId = input.roleId || 2; // Default to 'sales' role (id=2)

  const user = await queryOne<UserRow>(
    `INSERT INTO users (email, password_hash, name, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role_id`,
    [input.email, passwordHash, input.name, roleId]
  );

  if (!user) {
    throw new AppError('Failed to create user', 500);
  }

  const role = await queryOne<{ name: string }>(
    `SELECT name FROM roles WHERE id = $1`,
    [user.role_id]
  );

  const payload: AuthPayload = {
    userId: user.id,
    email: user.email,
    roleId: user.role_id,
    roleName: role?.name || 'sales',
  };

  const tokens = generateTokens(payload);

  const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
  await query(
    `UPDATE users SET refresh_token = $1 WHERE id = $2`,
    [refreshHash, user.id]
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: role?.name || 'sales',
    },
    ...tokens,
  };
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, env.jwt.refreshSecret) as {
      userId: string;
      type: string;
    };

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await queryOne<UserRow & { refresh_token: string }>(
      `SELECT u.id, u.email, u.name, u.role_id, r.name as role_name, u.is_active, u.refresh_token
       FROM users u
       JOIN roles r ON r.id = u.role_id
       WHERE u.id = $1`,
      [decoded.userId]
    );

    if (!user || !user.is_active || !user.refresh_token) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Verify refresh token matches stored hash
    const isValid = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isValid) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const payload: AuthPayload = {
      userId: user.id,
      email: user.email,
      roleId: user.role_id,
      roleName: user.role_name,
    };

    const tokens = generateTokens(payload);

    // Rotate refresh token
    const newRefreshHash = await bcrypt.hash(tokens.refreshToken, 10);
    await query(
      `UPDATE users SET refresh_token = $1 WHERE id = $2`,
      [newRefreshHash, user.id]
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role_name,
      },
      ...tokens,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Refresh token expired');
    }
    throw error;
  }
}

export async function logout(userId: string) {
  await query(
    `UPDATE users SET refresh_token = NULL WHERE id = $1`,
    [userId]
  );
}

export async function getProfile(userId: string) {
  const user = await queryOne<{
    id: string;
    email: string;
    name: string;
    avatar_url: string | null;
    role_name: string;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
  }>(
    `SELECT u.id, u.email, u.name, u.avatar_url, r.name as role_name,
            u.is_active, u.last_login_at, u.created_at
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.id = $1`,
    [userId]
  );

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  return user;
}
