// ═══════════════════════════════════════════════════════════════
// OutreachDesk CRM — Shared TypeScript Types
// ═══════════════════════════════════════════════════════════════

export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type LeadSource = 'website' | 'referral' | 'linkedin' | 'cold_call' | 'event' | 'other';
export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';
export type InteractionType = 'call' | 'email' | 'meeting' | 'note' | 'whatsapp' | 'follow_up';
export type InteractionOutcome = 'positive' | 'neutral' | 'negative' | 'no_response';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: LeadSource;
  stage: LeadStage;
  priority: LeadPriority;
  value: number;
  follow_up_date: string | null;
  follow_up_count: number;
  is_overdue: boolean;
  notes: string | null;
  tags: string[];
  assigned_user_id: string | null;
  assigned_user_name?: string;
  created_by: string;
  created_by_name?: string;
  updated_by: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Interaction {
  id: string;
  lead_id: string;
  user_id: string;
  user_name?: string;
  lead_name?: string;
  type: InteractionType;
  content: string;
  outcome: InteractionOutcome | null;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface DashboardKPIs {
  totalLeads: number;
  newLeads: number;
  wonLeads: number;
  lostLeads: number;
  overdueLeads: number;
  followUpsToday: number;
  conversionRate: number;
  totalPipelineValue: number;
  wonValue: number;
  avgDealValue: number;
}

export interface StageDistribution {
  stage: LeadStage;
  count: number;
  value: number;
}

export interface SourceDistribution {
  source: LeadSource;
  count: number;
  value: number;
}

export interface UserPerformance {
  user_id: string;
  user_name: string;
  total_leads: number;
  won_leads: number;
  conversion_rate: number;
  total_value: number;
}

export interface DashboardData {
  kpis: DashboardKPIs;
  stageDistribution: StageDistribution[];
  sourceDistribution: SourceDistribution[];
  userPerformance: UserPerformance[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    statusCode: number;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Stage metadata for display
export const STAGE_CONFIG: Record<LeadStage, { label: string; color: string; bgColor: string }> = {
  new: { label: 'New', color: '#60a5fa', bgColor: 'rgba(96, 165, 250, 0.15)' },
  contacted: { label: 'Contacted', color: '#a78bfa', bgColor: 'rgba(167, 139, 250, 0.15)' },
  qualified: { label: 'Qualified', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' },
  proposal: { label: 'Proposal', color: '#c9a855', bgColor: 'rgba(201, 168, 85, 0.15)' },
  negotiation: { label: 'Negotiation', color: '#f97316', bgColor: 'rgba(249, 115, 22, 0.15)' },
  won: { label: 'Won', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.15)' },
  lost: { label: 'Lost', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.15)' },
};

export const PRIORITY_CONFIG: Record<LeadPriority, { label: string; color: string }> = {
  low: { label: 'Low', color: '#6b7280' },
  medium: { label: 'Medium', color: '#f59e0b' },
  high: { label: 'High', color: '#f97316' },
  urgent: { label: 'Urgent', color: '#ef4444' },
};

export const SOURCE_CONFIG: Record<LeadSource, { label: string; icon: string }> = {
  website: { label: 'Website', icon: '🌐' },
  referral: { label: 'Referral', icon: '🤝' },
  linkedin: { label: 'LinkedIn', icon: '💼' },
  cold_call: { label: 'Cold Call', icon: '📞' },
  event: { label: 'Event', icon: '🎪' },
  other: { label: 'Other', icon: '📋' },
};
