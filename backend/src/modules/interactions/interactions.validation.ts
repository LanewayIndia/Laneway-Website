import { z } from 'zod';

export const INTERACTION_TYPES = [
  'call', 'email', 'meeting', 'note', 'whatsapp', 'follow_up',
] as const;

export const INTERACTION_OUTCOMES = [
  'positive', 'neutral', 'negative', 'no_response',
] as const;

export const createInteractionSchema = z.object({
  lead_id: z.string().uuid('Valid lead ID is required'),
  type: z.enum(INTERACTION_TYPES),
  content: z.string().min(1, 'Content is required'),
  outcome: z.enum(INTERACTION_OUTCOMES).optional(),
  scheduled_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
});

export type CreateInteractionInput = z.infer<typeof createInteractionSchema>;
