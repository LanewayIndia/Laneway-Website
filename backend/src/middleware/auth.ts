import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { query } from '../database/connection';
import { UnauthorizedError, ForbiddenError } from './error-handler';

export interface AuthPayload {
  userId: string;
  email: string;
  roleId: number;
  roleName: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
  userPermissions?: string[];
}

/**
 * Middleware: Verify JWT access token
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwt.secret) as AuthPayload;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Token expired'));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError('Invalid token'));
    }
    next(error);
  }
}

/**
 * Middleware: Check if user has required permission(s)
 * Usage: authorize('leads:create') or authorize('leads:create', 'leads:read:all')
 */
export function authorize(...requiredPermissions: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Authentication required');
      }

      // Fetch user's permissions from DB
      const userPerms = await query<{ name: string }>(
        `SELECT p.name
         FROM role_permissions rp
         JOIN permissions p ON p.id = rp.permission_id
         WHERE rp.role_id = $1`,
        [req.user.roleId]
      );

      const permissionNames = userPerms.map((p) => p.name);
      req.userPermissions = permissionNames;

      // Check if user has at least one of the required permissions
      const hasPermission = requiredPermissions.some((rp) =>
        permissionNames.includes(rp)
      );

      if (!hasPermission) {
        throw new ForbiddenError(
          `Missing permission: ${requiredPermissions.join(' or ')}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Helper: Check if user has a specific permission (from pre-loaded perms)
 */
export function hasPermission(req: AuthRequest, permission: string): boolean {
  return req.userPermissions?.includes(permission) || false;
}

/**
 * Helper: Check if user can access all leads or only their own
 */
export function canAccessAllLeads(req: AuthRequest): boolean {
  return hasPermission(req, 'leads:read:all');
}
