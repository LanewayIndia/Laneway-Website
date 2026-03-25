'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter } from 'lucide-react';
import { activityLogsApi } from '@/lib/crm/api-client';
import { Pagination } from '@/lib/crm/types';
import { TableSkeleton, EmptyState } from '@/components/crm/shared/skeletons';

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const ACTION_COLORS: Record<string, string> = {
  create: '#22c55e',
  update: '#60a5fa',
  delete: '#ef4444',
  stage_change: '#f59e0b',
  assign: '#a78bfa',
  login: '#c9a855',
};

export default function ActivityPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const loadLogs = useCallback(async (page?: number) => {
    try {
      setIsLoading(true);
      const params: Record<string, any> = { page: page ?? 1, limit: 25 };
      if (filter) params.action = filter;

      const res = await activityLogsApi.list(params);
      if (res.success) {
        setLogs(res.data);
        setPagination(res.pagination);
        setErrorStatus(null);
      }
    } catch (err: any) {
      if (err.statusCode === 403) {
        setErrorStatus(403);
      } else {
        console.error('Activity load error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  if (errorStatus === 403) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center" style={{ color: 'var(--foreground)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          <Activity size={32} />
        </div>
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p className="text-sm max-w-md" style={{ color: 'var(--pumice)' }}>
          You do not have permission to view system activity logs. Please contact your system administrator if you need access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Activity Log</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--pumice)' }}>
            Track all system actions and changes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: 'var(--pumice)' }} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm outline-none"
            style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          >
            <option value="">All Actions</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="delete">Deleted</option>
            <option value="stage_change">Stage Changes</option>
            <option value="assign">Assignments</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : logs.length === 0 ? (
        <EmptyState
          icon={<Activity size={28} />}
          title="No activity yet"
          description="Actions will be logged here as you interact with the CRM"
        />
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="space-y-0">
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-start gap-3 p-4 hover:bg-white/2 transition-colors"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0 mt-2"
                  style={{ background: ACTION_COLORS[log.action] || 'var(--pumice)' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    <span className="font-medium">{log.user_name || 'System'}</span>
                    {' '}
                    <span
                      className="font-medium capitalize"
                      style={{ color: ACTION_COLORS[log.action] || 'var(--pumice)' }}
                    >
                      {log.action.replace('_', ' ')}
                    </span>
                    {' a '}
                    <span className="capitalize">{log.entity_type}</span>
                  </p>
                  {log.changes && (
                    <div className="text-xs mt-1 space-y-0.5" style={{ color: 'var(--pumice)' }}>
                      {Object.entries(JSON.parse(typeof log.changes === 'string' ? log.changes : JSON.stringify(log.changes))).slice(0, 3).map(([key, val]: [string, any]) => (
                        <p key={key}>
                          {key}: <span style={{ color: '#ef4444' }}>{val.old || '—'}</span> → <span style={{ color: '#22c55e' }}>{val.new || '—'}</span>
                        </p>
                      ))}
                    </div>
                  )}
                  <p className="text-xs mt-1" style={{ color: 'var(--pumice)' }}>
                    {formatDateTime(log.created_at)}
                    {log.ip_address && ` · ${log.ip_address}`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--pumice)' }}>
                Page {pagination.page} of {pagination.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadLogs(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-3 py-1 rounded-lg text-xs hover:bg-white/5 disabled:opacity-30"
                  style={{ color: 'var(--pumice)', border: '1px solid var(--border)' }}
                >
                  Previous
                </button>
                <button
                  onClick={() => loadLogs(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="px-3 py-1 rounded-lg text-xs hover:bg-white/5 disabled:opacity-30"
                  style={{ color: 'var(--pumice)', border: '1px solid var(--border)' }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
