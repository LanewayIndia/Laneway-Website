import { query } from '../../database/connection';
import { parsePagination, buildPaginatedResult } from '../../utils/pagination';

export async function getActivityLogs(
  filters: Record<string, any>,
  paginationQuery: Record<string, any>
) {
  const pagination = parsePagination(paginationQuery);
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (filters.entityType) {
    conditions.push(`al.entity_type = $${paramIndex}`);
    params.push(filters.entityType);
    paramIndex++;
  }

  if (filters.entityId) {
    conditions.push(`al.entity_id = $${paramIndex}`);
    params.push(filters.entityId);
    paramIndex++;
  }

  if (filters.userId) {
    conditions.push(`al.user_id = $${paramIndex}`);
    params.push(filters.userId);
    paramIndex++;
  }

  if (filters.action) {
    conditions.push(`al.action = $${paramIndex}`);
    params.push(filters.action);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countResult = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM activity_logs al ${whereClause}`,
    params
  );
  const total = parseInt(countResult[0]?.count || '0', 10);

  const offset = (pagination.page - 1) * pagination.limit;

  const logs = await query(
    `SELECT al.*, u.name as user_name
     FROM activity_logs al
     LEFT JOIN users u ON u.id = al.user_id
     ${whereClause}
     ORDER BY al.created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, pagination.limit, offset]
  );

  return buildPaginatedResult(logs, total, pagination);
}

export async function getEntityHistory(entityType: string, entityId: string) {
  const logs = await query(
    `SELECT al.*, u.name as user_name
     FROM activity_logs al
     LEFT JOIN users u ON u.id = al.user_id
     WHERE al.entity_type = $1 AND al.entity_id = $2
     ORDER BY al.created_at DESC
     LIMIT 50`,
    [entityType, entityId]
  );

  return logs;
}
