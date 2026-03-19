import { query, queryOne } from '../../database/connection';
import { NotFoundError } from '../../middleware/error-handler';
import { AuthPayload } from '../../middleware/auth';
import { logActivity } from '../../utils/activity-logger';
import { CreateInteractionInput } from './interactions.validation';

interface InteractionRow {
  id: string;
  lead_id: string;
  user_id: string;
  user_name?: string;
  type: string;
  content: string;
  outcome: string | null;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export async function getInteractionsByLead(leadId: string) {
  const interactions = await query<InteractionRow>(
    `SELECT i.*, u.name as user_name
     FROM interactions i
     JOIN users u ON u.id = i.user_id
     WHERE i.lead_id = $1
     ORDER BY i.created_at DESC`,
    [leadId]
  );

  return interactions;
}

export async function createInteraction(
  input: CreateInteractionInput,
  user: AuthPayload,
  ipAddress?: string
) {
  // Verify lead exists
  const lead = await queryOne(
    `SELECT id FROM leads WHERE id = $1 AND is_deleted = FALSE`,
    [input.lead_id]
  );

  if (!lead) {
    throw new NotFoundError('Lead');
  }

  const interaction = await queryOne<InteractionRow>(
    `INSERT INTO interactions (lead_id, user_id, type, content, outcome, scheduled_at, completed_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      input.lead_id,
      user.userId,
      input.type,
      input.content,
      input.outcome || null,
      input.scheduled_at || null,
      input.completed_at || null,
    ]
  );

  if (interaction) {
    // Update lead follow-up count
    await query(
      `UPDATE leads SET follow_up_count = follow_up_count + 1, updated_by = $1 WHERE id = $2`,
      [user.userId, input.lead_id]
    );

    await logActivity({
      userId: user.userId,
      entityType: 'interaction',
      entityId: interaction.id,
      action: 'create',
      changes: { lead_id: { old: null, new: input.lead_id }, type: { old: null, new: input.type } },
      ipAddress,
    });
  }

  return interaction;
}

export async function getRecentInteractions(limit: number = 10) {
  const interactions = await query<InteractionRow & { lead_name: string }>(
    `SELECT i.*, u.name as user_name, l.name as lead_name
     FROM interactions i
     JOIN users u ON u.id = i.user_id
     JOIN leads l ON l.id = i.lead_id
     WHERE l.is_deleted = FALSE
     ORDER BY i.created_at DESC
     LIMIT $1`,
    [limit]
  );

  return interactions;
}
