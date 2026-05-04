import { query } from '../database/connection';

interface LogActivityParams {
  userId: string;
  entityType: 'lead' | 'interaction' | 'user' | 'role';
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'assign' | 'stage_change';
  changes?: Record<string, { old: any; new: any }>;
  ipAddress?: string;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    await query(
      `INSERT INTO activity_logs (user_id, entity_type, entity_id, action, changes, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        params.userId,
        params.entityType,
        params.entityId,
        params.action,
        params.changes ? JSON.stringify(params.changes) : null,
        params.ipAddress || null,
      ]
    );
  } catch (error) {
    // Activity logging should never break the main request
    console.error('⚠️ Failed to log activity:', error);
  }
}

export function getClientIp(req: any): string {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export function diffChanges(
  oldData: Record<string, any>,
  newData: Record<string, any>,
  fields: string[]
): Record<string, { old: any; new: any }> | null {
  const changes: Record<string, { old: any; new: any }> = {};
  let hasChanges = false;

  for (const field of fields) {
    if (oldData[field] !== newData[field]) {
      changes[field] = { old: oldData[field], new: newData[field] };
      hasChanges = true;
    }
  }

  return hasChanges ? changes : null;
}
