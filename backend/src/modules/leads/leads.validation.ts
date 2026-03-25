import { z } from 'zod';

export const LEAD_STAGES = [
  'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost',
] as const;

export const LEAD_SOURCES = [
  'website', 'referral', 'linkedin', 'cold_call', 'event', 'other',
] as const;

export const LEAD_PRIORITIES = [
  'low', 'medium', 'high', 'urgent',
] as const;

export const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  company: z.string().max(200).optional().or(z.literal('')),
  source: z.enum(LEAD_SOURCES).optional().default('other'),
  stage: z.enum(LEAD_STAGES).optional().default('new'),
  priority: z.enum(LEAD_PRIORITIES).optional().default('medium'),
  value: z.number().nonnegative().optional().default(0),
  follow_up_date: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()).optional().default([]),
  assigned_user_id: z.string().uuid().optional().or(z.literal('')),
});

export const updateLeadSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  company: z.string().max(200).optional().or(z.literal('')),
  source: z.enum(LEAD_SOURCES).optional(),
  stage: z.enum(LEAD_STAGES).optional(),
  priority: z.enum(LEAD_PRIORITIES).optional(),
  value: z.number().nonnegative().optional(),
  follow_up_date: z.string().optional().or(z.literal('')).nullable(),
  notes: z.string().optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  assigned_user_id: z.string().uuid().optional().or(z.literal('')).nullable(),
  version: z.number().int().positive('Version is required for update'),
});

export const leadFiltersSchema = z.object({
  search: z.string().optional(),
  stage: z.enum(LEAD_STAGES).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
  priority: z.enum(LEAD_PRIORITIES).optional(),
  assigned_user_id: z.string().uuid().optional(),
  is_overdue: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
