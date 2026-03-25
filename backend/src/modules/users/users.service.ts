import { query } from '../../database/connection';

export async function getAllUsers() {
  const users = await query(
    `SELECT u.id, u.email, u.name, u.avatar_url, r.name as role_name,
            u.is_active, u.last_login_at, u.created_at
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.is_active = TRUE
     ORDER BY u.name ASC`
  );

  return users;
}

export async function getRoles() {
  const roles = await query(
    `SELECT r.*,
            COUNT(rp.permission_id)::int as permission_count
     FROM roles r
     LEFT JOIN role_permissions rp ON rp.role_id = r.id
     GROUP BY r.id
     ORDER BY r.id`
  );

  return roles;
}
