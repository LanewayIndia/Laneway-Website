'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, TrendingUp, AlertTriangle, CalendarClock, DollarSign,
  Target, ArrowUpRight, ArrowDownRight, BarChart3, Clock,
} from 'lucide-react';
import { dashboardApi, interactionsApi } from '@/lib/crm/api-client';
import { DashboardData, Interaction, STAGE_CONFIG, SOURCE_CONFIG } from '@/lib/crm/types';
import { KPISkeleton } from '@/components/crm/shared/skeletons';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const CHART_COLORS = ['#60a5fa', '#a78bfa', '#f59e0b', '#c9a855', '#f97316', '#22c55e', '#ef4444'];

function formatCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [recentActivity, setRecentActivity] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dashRes, actRes] = await Promise.all([
          dashboardApi.getFull(),
          interactionsApi.getRecent(8),
        ]);
        if (dashRes.success) setData(dashRes.data);
        if (actRes.success) setRecentActivity(actRes.data);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading || !data) return <KPISkeleton />;

  const kpis = data.kpis;

  const kpiCards = [
    { label: 'Total Leads', value: kpis.totalLeads, icon: Users, color: '#60a5fa' },
    { label: 'New Leads', value: kpis.newLeads, icon: TrendingUp, color: '#a78bfa' },
    { label: 'Won Deals', value: kpis.wonLeads, icon: Target, color: '#22c55e' },
    { label: 'Lost Deals', value: kpis.lostLeads, icon: ArrowDownRight, color: '#ef4444' },
    { label: 'Overdue', value: kpis.overdueLeads, icon: AlertTriangle, color: kpis.overdueLeads > 0 ? '#ef4444' : '#6b7280' },
    { label: 'Follow-ups Today', value: kpis.followUpsToday, icon: CalendarClock, color: '#f59e0b' },
    { label: 'Conversion Rate', value: `${kpis.conversionRate}%`, icon: ArrowUpRight, color: '#22c55e' },
    { label: 'Pipeline Value', value: formatCurrency(kpis.totalPipelineValue), icon: DollarSign, color: 'var(--gold)' },
  ];

  const stageChartData = data.stageDistribution.map((s) => ({
    name: STAGE_CONFIG[s.stage]?.label || s.stage,
    count: s.count,
    value: s.value,
    fill: STAGE_CONFIG[s.stage]?.color || '#6b7280',
  }));

  const sourceChartData = data.sourceDistribution.map((s, i) => ({
    name: SOURCE_CONFIG[s.source]?.label || s.source,
    count: s.count,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--pumice)' }}>
          Welcome back — here&apos;s your pipeline overview
        </p>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpiCards.map((kpi) => (
          <motion.div
            key={kpi.label}
            variants={item}
            className="glass-card rounded-xl p-5 group hover:glow-gold-sm transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>
                {kpi.label}
              </span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${kpi.color}15`, color: kpi.color }}
              >
                <kpi.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline by Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} style={{ color: 'var(--gold)' }} />
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Pipeline by Stage
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageChartData} barCategoryGap="20%">
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--pumice)', fontSize: 11 }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--pumice)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0c0c0c',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {stageChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Source Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} style={{ color: 'var(--gold)' }} />
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Lead Sources
            </h2>
          </div>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={sourceChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="count"
                  stroke="none"
                >
                  {sourceChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0c0c0c',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {sourceChartData.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
                  <span style={{ color: 'var(--pumice)' }}>{s.name}</span>
                  <span className="ml-auto font-medium" style={{ color: 'var(--foreground)' }}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity + Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} style={{ color: 'var(--gold)' }} />
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Recent Activity
            </h2>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: 'var(--pumice)' }}>
                No recent activity
              </p>
            ) : (
              recentActivity.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/2 transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
                  >
                    {act.user_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                      <span className="font-medium">{act.user_name}</span>
                      {' logged a '}
                      <span style={{ color: 'var(--gold)' }}>{act.type}</span>
                      {' on '}
                      <span className="font-medium">{(act as any).lead_name || 'a lead'}</span>
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--pumice)' }}>
                      {act.content}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--pumice)' }}>
                      {formatDate(act.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Team Performance */}
        {data.userPerformance.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} style={{ color: 'var(--gold)' }} />
              <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Team Performance
              </h2>
            </div>
            <div className="space-y-3">
              {data.userPerformance.map((perf) => (
                <div
                  key={perf.user_id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/2 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
                  >
                    {perf.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                      {perf.user_name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--pumice)' }}>
                      {perf.total_leads} leads · {perf.conversion_rate}% conversion
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: 'var(--gold)' }}>
                      {formatCurrency(perf.total_value)}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--pumice)' }}>
                      {perf.won_leads} won
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
