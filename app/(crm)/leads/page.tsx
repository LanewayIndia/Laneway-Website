'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, Plus, ChevronLeft, ChevronRight, SlidersHorizontal,
  AlertTriangle, Building2, X,
} from 'lucide-react';
import { leadsApi } from '@/lib/crm/api-client';
import { Lead, LeadStage, STAGE_CONFIG, PRIORITY_CONFIG, SOURCE_CONFIG, Pagination } from '@/lib/crm/types';
import { TableSkeleton, EmptyState } from '@/components/crm/shared/skeletons';
import { toast } from 'sonner';

function formatCurrency(value: number): string {3
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const searchTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const loadLeads = useCallback(async (page?: number) => {
    try {
      setIsLoading(true);
      const params: Record<string, any> = { page: page ?? 1, limit: 20, ...filters };
      if (search) params.search = search;

      const res = await leadsApi.list(params);
      if (res.success) {
        setLeads(res.data);
        setPagination(res.pagination);
      }
    } catch (err) {
      console.error('Leads load error:', err);
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  }, [search, filters]);

  useEffect(() => { loadLeads(); }, [loadLeads]);

  // Debounced search
  const handleSearch = (value: string) => {
    setSearch(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadLeads(1), 300);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearch('');
  };

  const activeFilterCount = Object.keys(filters).length + (search ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Leads</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--pumice)' }}>
            {pagination?.total || 0} total leads
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
            hover:brightness-110 active:scale-[0.98] self-start sm:self-auto"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Plus size={16} />
          New Lead
        </button>
      </div>

      {/* Search & Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--pumice)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search leads by name, email, company..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition-all
                focus:ring-1 focus:ring-gold placeholder:text-(--pumice)/50"
              style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5 shrink-0"
            style={{
              border: '1px solid var(--border)',
              color: activeFilterCount > 0 ? 'var(--gold)' : 'var(--pumice)',
            }}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter dropdowns */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 pt-3 mt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                {/* Stage filter */}
                <select
                  value={filters.stage || ''}
                  onChange={(e) => handleFilterChange('stage', e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                >
                  <option value="">All Stages</option>
                  {Object.entries(STAGE_CONFIG).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>

                {/* Priority filter */}
                <select
                  value={filters.priority || ''}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                >
                  <option value="">All Priorities</option>
                  {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>

                {/* Source filter */}
                <select
                  value={filters.source || ''}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                >
                  <option value="">All Sources</option>
                  {Object.entries(SOURCE_CONFIG).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>

                {/* Overdue filter */}
                <select
                  value={filters.is_overdue || ''}
                  onChange={(e) => handleFilterChange('is_overdue', e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                >
                  <option value="">Overdue Status</option>
                  <option value="true">Overdue Only</option>
                </select>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs hover:bg-white/5 transition-colors"
                    style={{ color: 'var(--pumice)' }}
                  >
                    <X size={12} />
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : leads.length === 0 ? (
        <EmptyState
          icon={<Users size={28} />}
          title="No leads found"
          description={activeFilterCount > 0 ? 'Try adjusting your filters' : 'Create your first lead to get started'}
          action={
            activeFilterCount > 0 ? (
              <button onClick={clearFilters} className="text-sm font-medium" style={{ color: 'var(--gold)' }}>
                Clear filters
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Lead', 'Company', 'Stage', 'Priority', 'Value', 'Follow-up', 'Assigned'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium tracking-premium uppercase"
                      style={{ color: 'var(--pumice)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => {
                  const stageC = STAGE_CONFIG[lead.stage];
                  const prioC = PRIORITY_CONFIG[lead.priority];

                  return (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-white/2 transition-colors cursor-pointer"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="block"
                        >
                          <p className="text-sm font-medium hover:underline" style={{ color: 'var(--foreground)' }}>
                            {lead.name}
                          </p>
                          {lead.email && (
                            <p className="text-xs mt-0.5" style={{ color: 'var(--pumice)' }}>{lead.email}</p>
                          )}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm" style={{ color: 'var(--pumice)' }}>{lead.company || '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{ background: stageC.bgColor, color: stageC.color }}
                        >
                          {stageC.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{ color: prioC.color }}
                        >
                          {prioC.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium" style={{ color: 'var(--gold)' }}>
                          {lead.value > 0 ? formatCurrency(lead.value) : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {lead.is_overdue && <AlertTriangle size={12} style={{ color: '#ef4444' }} />}
                          <span
                            className="text-xs"
                            style={{ color: lead.is_overdue ? '#ef4444' : 'var(--pumice)' }}
                          >
                            {lead.follow_up_date ? formatDate(lead.follow_up_date) : '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{ color: 'var(--pumice)' }}>
                          {lead.assigned_user_name || '—'}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-0">
            {leads.map((lead) => {
              const stageC = STAGE_CONFIG[lead.stage];
              return (
                <Link
                  key={lead.id}
                  href={`/leads/${lead.id}`}
                  className="block p-4 hover:bg-white/2 transition-colors"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{lead.name}</p>
                      {lead.company && (
                        <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--pumice)' }}>
                          <Building2 size={10} /> {lead.company}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                      style={{ background: stageC.bgColor, color: stageC.color }}
                    >
                      {stageC.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--pumice)' }}>
                    {lead.value > 0 && (
                      <span style={{ color: 'var(--gold)' }}>{formatCurrency(lead.value)}</span>
                    )}
                    {lead.is_overdue && (
                      <span className="flex items-center gap-0.5" style={{ color: '#ef4444' }}>
                        <AlertTriangle size={10} /> Overdue
                      </span>
                    )}
                    {lead.assigned_user_name && (
                      <span className="ml-auto">{lead.assigned_user_name}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--pumice)' }}>
                Page {pagination.page} of {pagination.totalPages}
                {' · '}
                {pagination.total} total
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadLeads(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="p-1.5 rounded-lg transition-colors hover:bg-white/5 disabled:opacity-30"
                  style={{ color: 'var(--pumice)' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => loadLeads(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="p-1.5 rounded-lg transition-colors hover:bg-white/5 disabled:opacity-30"
                  style={{ color: 'var(--pumice)' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Lead Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateLeadModal
            onClose={() => setShowCreateModal(false)}
            onCreated={() => { setShowCreateModal(false); loadLeads(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Create Lead Modal ─────────────────────────────────────────

function CreateLeadModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'website',
    stage: 'new',
    priority: 'medium',
    value: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await leadsApi.create({
        ...formData,
        value: formData.value ? parseFloat(formData.value) : 0,
      });
      toast.success(`Lead "${formData.name}" created!`);
      onCreated();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto z-50 glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>New Lead</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5" style={{ color: 'var(--pumice)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gold"
              style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              placeholder="Contact name"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gold"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gold"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Company & Value */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gold"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Deal Value (₹)</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gold"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                placeholder="0"
              />
            </div>
          </div>

          {/* Source, Stage, Priority */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                {Object.entries(SOURCE_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Stage</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                {Object.entries(STAGE_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium mb-1 tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none focus:ring-1 focus:ring-gold"
              style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              placeholder="Additional notes..."
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
              style={{ border: '1px solid var(--border)', color: 'var(--pumice)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-50"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              {isSubmitting ? 'Creating...' : 'Create Lead'}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
