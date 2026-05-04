import { query, queryOne } from '../../database/connection';
import { ConflictError, NotFoundError } from '../../middleware/error-handler';
import { AuthPayload } from '../../middleware/auth';
import { logActivity, diffChanges, getClientIp } from '../../utils/activity-logger';
import { PaginationParams, buildPaginatedResult, sanitizeSortColumn } from '../../utils/pagination';
import { CreateLeadInput, UpdateLeadInput, LEAD_STAGES } from './leads.validation';

// Follow-up auto-calculation: days until next follow-up based on stage
const STAGE_FOLLOW_UP_DAYS: Record<string, number> = {
  new: 2,
  contacted: 3,
  qualified: 5,
  proposal: 4,
  negotiation: 3,
  won: 0,
  lost: 0,
};

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  stage: string;
  priority: string;
  value: number;
  follow_up_date: string | null;
  follow_up_count: number;
  is_overdue: boolean;
  notes: string;
  tags: string[];
  assigned_user_id: string | null;
  assigned_user_name?: string;
  created_by: string;
  created_by_name?: string;
  updated_by: string;
  version: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

function calculateFollowUpDate(stage: string): string | null {
  const days = STAGE_FOLLOW_UP_DAYS[stage];
  if (!days) return null;

  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export async function getLeads(
  filters: Record<string, any>,
  pagination: PaginationParams,
  user: AuthPayload,
  canAccessAll: boolean
) {
  const conditions: string[] = ['l.is_deleted = FALSE'];
  const params: any[] = [];
  let paramIndex = 1;

  // RBAC: Sales can only see their own leads
  if (!canAccessAll) {
    conditions.push(`l.assigned_user_id = $${paramIndex}`);
    params.push(user.userId);
    paramIndex++;
  }

  // Filters
  if (filters.stage) {
    conditions.push(`l.stage = $${paramIndex}`);
    params.push(filters.stage);
    paramIndex++;
  }

  if (filters.source) {
    conditions.push(`l.source = $${paramIndex}`);
    params.push(filters.source);
    paramIndex++;
  }

  if (filters.priority) {
    conditions.push(`l.priority = $${paramIndex}`);
    params.push(filters.priority);
    paramIndex++;
  }

  if (filters.assigned_user_id) {
    conditions.push(`l.assigned_user_id = $${paramIndex}`);
    params.push(filters.assigned_user_id);
    paramIndex++;
  }

  if (filters.is_overdue === 'true') {
    conditions.push(`l.is_overdue = TRUE`);
  }

  // Search (name, email, company, phone)
  if (filters.search) {
    conditions.push(
      `(l.name ILIKE $${paramIndex} OR l.email ILIKE $${paramIndex} OR l.company ILIKE $${paramIndex} OR l.phone ILIKE $${paramIndex})`
    );
    params.push(`%${filters.search}%`);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count
  const countResult = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM leads l ${whereClause}`,
    params
  );
  const total = parseInt(countResult?.count || '0', 10);

  // Get paginated data
  const sortColumn = sanitizeSortColumn(pagination.sortBy, 'leads');
  const offset = (pagination.page - 1) * pagination.limit;

  const leads = await query<LeadRow>(
    `SELECT l.*,
            au.name as assigned_user_name,
            cu.name as created_by_name
     FROM leads l
     LEFT JOIN users au ON au.id = l.assigned_user_id
     LEFT JOIN users cu ON cu.id = l.created_by
     ${whereClause}
     ORDER BY l.${sortColumn} ${pagination.sortOrder}
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, pagination.limit, offset]
  );

  return buildPaginatedResult(leads, total, pagination);
}

export async function getLeadById(id: string, user: AuthPayload, canAccessAll: boolean) {
  const lead = await queryOne<LeadRow>(
    `SELECT l.*,
            au.name as assigned_user_name,
            cu.name as created_by_name
     FROM leads l
     LEFT JOIN users au ON au.id = l.assigned_user_id
     LEFT JOIN users cu ON cu.id = l.created_by
     WHERE l.id = $1 AND l.is_deleted = FALSE`,
    [id]
  );

  if (!lead) {
    throw new NotFoundError('Lead');
  }

  // RBAC check for non-admin/non-full-access users
  if (!canAccessAll && lead.assigned_user_id !== user.userId) {
    throw new NotFoundError('Lead');
  }

  return lead;
}

export async function createLead(input: CreateLeadInput, user: AuthPayload, ipAddress?: string) {
  // Auto-calculate follow-up date if not provided
  const followUpDate = input.follow_up_date || calculateFollowUpDate(input.stage || 'new');
  const assignedUserId = input.assigned_user_id || user.userId;

  const lead = await queryOne<LeadRow>(
    `INSERT INTO leads (name, email, phone, company, source, stage, priority, value,
                        follow_up_date, notes, tags, assigned_user_id, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $13)
     RETURNING *`,
    [
      input.name,
      input.email || null,
      input.phone || null,
      input.company || null,
      input.source || 'other',
      input.stage || 'new',
      input.priority || 'medium',
      input.value || 0,
      followUpDate,
      input.notes || null,
      input.tags || [],
      assignedUserId,
      user.userId,
    ]
  );

  if (lead) {
    await logActivity({
      userId: user.userId,
      entityType: 'lead',
      entityId: lead.id,
      action: 'create',
      ipAddress,
    });
  }

  return lead;
}

export async function updateLead(
  id: string,
  input: UpdateLeadInput,
  user: AuthPayload,
  canAccessAll: boolean,
  ipAddress?: string
) {
  // First fetch current lead
  const current = await queryOne<LeadRow>(
    `SELECT * FROM leads WHERE id = $1 AND is_deleted = FALSE`,
    [id]
  );

  if (!current) {
    throw new NotFoundError('Lead');
  }

  // RBAC check
  if (!canAccessAll && current.assigned_user_id !== user.userId) {
    throw new NotFoundError('Lead');
  }

  // ═══════════════════════════════════════════════════════════════
  // OPTIMISTIC LOCKING: Compare version
  // ═══════════════════════════════════════════════════════════════
  if (input.version !== current.version) {
    throw new ConflictError(
      `Lead was modified by another user (your version: ${input.version}, current version: ${current.version}). Please refresh and try again.`
    );
  }

  // Auto-calculate follow-up date if stage changed
  let followUpDate = input.follow_up_date !== undefined ? input.follow_up_date : current.follow_up_date;
  let followUpCount = current.follow_up_count;

  if (input.stage && input.stage !== current.stage) {
    if (!input.follow_up_date) {
      followUpDate = calculateFollowUpDate(input.stage);
    }
    followUpCount++;
  }

  // Build SET clause dynamically
  const updates: Record<string, any> = {
    name: input.name ?? current.name,
    email: input.email !== undefined ? (input.email || null) : current.email,
    phone: input.phone !== undefined ? (input.phone || null) : current.phone,
    company: input.company !== undefined ? (input.company || null) : current.company,
    source: input.source ?? current.source,
    stage: input.stage ?? current.stage,
    priority: input.priority ?? current.priority,
    value: input.value ?? current.value,
    follow_up_date: followUpDate || null,
    follow_up_count: followUpCount,
    notes: input.notes !== undefined ? (input.notes || null) : current.notes,
    tags: input.tags ?? current.tags,
    assigned_user_id: input.assigned_user_id !== undefined
      ? (input.assigned_user_id || null)
      : current.assigned_user_id,
    updated_by: user.userId,
  };

  // Update with version increment (optimistic locking)
  const updated = await queryOne<LeadRow>(
    `UPDATE leads SET
       name = $1, email = $2, phone = $3, company = $4, source = $5,
       stage = $6, priority = $7, value = $8, follow_up_date = $9,
       follow_up_count = $10, notes = $11, tags = $12, assigned_user_id = $13,
       updated_by = $14, version = version + 1
     WHERE id = $15 AND version = $16 AND is_deleted = FALSE
     RETURNING *`,
    [
      updates.name, updates.email, updates.phone, updates.company, updates.source,
      updates.stage, updates.priority, updates.value, updates.follow_up_date,
      updates.follow_up_count, updates.notes, updates.tags, updates.assigned_user_id,
      updates.updated_by, id, input.version,
    ]
  );

  if (!updated) {
    // Double-check — this can happen if version changed between our check and update
    throw new ConflictError(
      'Lead was modified by another user during your update. Please refresh and try again.'
    );
  }

  // Log activity with changes
  const trackFields = ['name', 'email', 'phone', 'company', 'source', 'stage', 'priority', 'value', 'assigned_user_id'];
  const changes = diffChanges(current, updated, trackFields);

  const action = input.stage && input.stage !== current.stage ? 'stage_change' :
    input.assigned_user_id && input.assigned_user_id !== current.assigned_user_id ? 'assign' :
      'update';

  await logActivity({
    userId: user.userId,
    entityType: 'lead',
    entityId: id,
    action,
    changes: changes || undefined,
    ipAddress,
  });

  return updated;
}

export async function softDeleteLead(id: string, user: AuthPayload, ipAddress?: string) {
  const lead = await queryOne<LeadRow>(
    `UPDATE leads SET is_deleted = TRUE, deleted_at = NOW(), updated_by = $1
     WHERE id = $2 AND is_deleted = FALSE
     RETURNING id`,
    [user.userId, id]
  );

  if (!lead) {
    throw new NotFoundError('Lead');
  }

  await logActivity({
    userId: user.userId,
    entityType: 'lead',
    entityId: id,
    action: 'delete',
    ipAddress,
  });

  return { id, deleted: true };
}

export async function getLeadsByStage(user: AuthPayload, canAccessAll: boolean) {
  const accessFilter = canAccessAll ? '' : `AND l.assigned_user_id = '${user.userId}'`;

  const leads = await query<LeadRow & { assigned_user_name: string }>(
    `SELECT l.*, au.name as assigned_user_name
     FROM leads l
     LEFT JOIN users au ON au.id = l.assigned_user_id
     WHERE l.is_deleted = FALSE ${accessFilter}
     ORDER BY l.priority DESC, l.updated_at DESC`
  );

  // Group by stage
  const stages: Record<string, any[]> = {};
  for (const stage of LEAD_STAGES) {
    stages[stage] = leads.filter((l) => l.stage === stage);
  }

  return stages;
}
