import { query, queryOne } from '../../database/connection';
import { AuthPayload } from '../../middleware/auth';

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
  stage: string;
  count: number;
  value: number;
}

export interface SourceDistribution {
  source: string;
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

export async function getDashboardKPIs(
  user: AuthPayload,
  canAccessAll: boolean
): Promise<DashboardKPIs> {
  const accessFilter = canAccessAll ? '' : `AND assigned_user_id = '${user.userId}'`;
  const today = new Date().toISOString().split('T')[0];

  const result = await queryOne<{
    total_leads: string;
    new_leads: string;
    won_leads: string;
    lost_leads: string;
    overdue_leads: string;
    follow_ups_today: string;
    total_pipeline_value: string;
    won_value: string;
  }>(`
    SELECT
      COUNT(*) as total_leads,
      COUNT(*) FILTER (WHERE stage = 'new') as new_leads,
      COUNT(*) FILTER (WHERE stage = 'won') as won_leads,
      COUNT(*) FILTER (WHERE stage = 'lost') as lost_leads,
      COUNT(*) FILTER (WHERE is_overdue = TRUE) as overdue_leads,
      COUNT(*) FILTER (WHERE follow_up_date = '${today}') as follow_ups_today,
      COALESCE(SUM(value) FILTER (WHERE stage NOT IN ('won', 'lost')), 0) as total_pipeline_value,
      COALESCE(SUM(value) FILTER (WHERE stage = 'won'), 0) as won_value
    FROM leads
    WHERE is_deleted = FALSE ${accessFilter}
  `);

  const totalLeads = parseInt(result?.total_leads || '0');
  const wonLeads = parseInt(result?.won_leads || '0');
  const lostLeads = parseInt(result?.lost_leads || '0');
  const closedLeads = wonLeads + lostLeads;
  const conversionRate = closedLeads > 0 ? Math.round((wonLeads / closedLeads) * 100) : 0;
  const wonValue = parseFloat(result?.won_value || '0');
  const avgDealValue = wonLeads > 0 ? Math.round(wonValue / wonLeads) : 0;

  return {
    totalLeads,
    newLeads: parseInt(result?.new_leads || '0'),
    wonLeads,
    lostLeads,
    overdueLeads: parseInt(result?.overdue_leads || '0'),
    followUpsToday: parseInt(result?.follow_ups_today || '0'),
    conversionRate,
    totalPipelineValue: parseFloat(result?.total_pipeline_value || '0'),
    wonValue,
    avgDealValue,
  };
}

export async function getStageDistribution(
  user: AuthPayload,
  canAccessAll: boolean
): Promise<StageDistribution[]> {
  const accessFilter = canAccessAll ? '' : `AND assigned_user_id = '${user.userId}'`;

  const distribution = await query<StageDistribution>(`
    SELECT
      stage,
      COUNT(*)::int as count,
      COALESCE(SUM(value), 0)::float as value
    FROM leads
    WHERE is_deleted = FALSE ${accessFilter}
    GROUP BY stage
    ORDER BY
      CASE stage
        WHEN 'new' THEN 1
        WHEN 'contacted' THEN 2
        WHEN 'qualified' THEN 3
        WHEN 'proposal' THEN 4
        WHEN 'negotiation' THEN 5
        WHEN 'won' THEN 6
        WHEN 'lost' THEN 7
      END
  `);

  return distribution;
}

export async function getSourceDistribution(
  user: AuthPayload,
  canAccessAll: boolean
): Promise<SourceDistribution[]> {
  const accessFilter = canAccessAll ? '' : `AND assigned_user_id = '${user.userId}'`;

  const distribution = await query<SourceDistribution>(`
    SELECT
      source,
      COUNT(*)::int as count,
      COALESCE(SUM(value), 0)::float as value
    FROM leads
    WHERE is_deleted = FALSE ${accessFilter}
    GROUP BY source
    ORDER BY count DESC
  `);

  return distribution;
}

export async function getUserPerformance(): Promise<UserPerformance[]> {
  const performance = await query<UserPerformance>(`
    SELECT
      u.id as user_id,
      u.name as user_name,
      COUNT(l.id)::int as total_leads,
      COUNT(l.id) FILTER (WHERE l.stage = 'won')::int as won_leads,
      CASE
        WHEN COUNT(l.id) FILTER (WHERE l.stage IN ('won', 'lost')) > 0
        THEN ROUND(
          COUNT(l.id) FILTER (WHERE l.stage = 'won')::numeric /
          COUNT(l.id) FILTER (WHERE l.stage IN ('won', 'lost'))::numeric * 100
        )::int
        ELSE 0
      END as conversion_rate,
      COALESCE(SUM(l.value) FILTER (WHERE l.stage = 'won'), 0)::float as total_value
    FROM users u
    LEFT JOIN leads l ON l.assigned_user_id = u.id AND l.is_deleted = FALSE
    WHERE u.is_active = TRUE
    GROUP BY u.id, u.name
    ORDER BY total_value DESC
  `);

  return performance;
}

export async function getFullDashboard(user: AuthPayload, canAccessAll: boolean) {
  const [kpis, stageDistribution, sourceDistribution] = await Promise.all([
    getDashboardKPIs(user, canAccessAll),
    getStageDistribution(user, canAccessAll),
    getSourceDistribution(user, canAccessAll),
  ]);

  // Only return user performance for admins/managers
  let userPerformance: UserPerformance[] = [];
  if (canAccessAll) {
    userPerformance = await getUserPerformance();
  }

  return {
    kpis,
    stageDistribution,
    sourceDistribution,
    userPerformance,
  };
}
