'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Save, Phone, Mail, Building2, DollarSign, Calendar,
  MessageSquare, AlertTriangle, Clock, Plus, Hash, User, RefreshCw,
} from 'lucide-react';
import { leadsApi, interactionsApi } from '@/lib/crm/api-client';
import {
  Lead, Interaction, STAGE_CONFIG, PRIORITY_CONFIG, SOURCE_CONFIG,
  LeadStage, LeadPriority, LeadSource, InteractionType,
} from '@/lib/crm/types';
import { Skeleton } from '@/components/crm/shared/skeletons';
import { toast } from 'sonner';

function formatCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const INTERACTION_ICONS: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  meeting: User,
  note: MessageSquare,
  whatsapp: MessageSquare,
  follow_up: Calendar,
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Lead>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showAddInteraction, setShowAddInteraction] = useState(false);
  const [conflictError, setConflictError] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [leadRes, intRes] = await Promise.all([
        leadsApi.getById(id),
        interactionsApi.getByLead(id),
      ]);
      if (leadRes.success) {
        setLead(leadRes.data);
        setEditData(leadRes.data);
      }
      if (intRes.success) setInteractions(intRes.data);
    } catch (err) {
      console.error('Lead load error:', err);
      toast.error('Failed to load lead');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async () => {
    if (!lead) return;
    setIsSaving(true);
    setConflictError(false);

    try {
      const res = await leadsApi.update(id, {
        ...editData,
        version: lead.version,
        value: editData.value ? Number(editData.value) : 0,
      });

      if (res.success) {
        setLead(res.data);
        setEditData(res.data);
        setIsEditing(false);
        toast.success('Lead updated successfully');
      }
    } catch (err: any) {
      if (err.statusCode === 409) {
        setConflictError(true);
        toast.error('Conflict: Lead was modified by another user');
      } else {
        toast.error(err.message || 'Failed to update');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = async () => {
    setConflictError(false);
    setIsLoading(true);
    await loadData();
    setIsEditing(false);
    toast.info('Lead data refreshed');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Skeleton className="h-96 w-full" /></div>
          <div><Skeleton className="h-96 w-full" /></div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>Lead not found</p>
        <button onClick={() => router.push('/leads')} className="mt-4 text-sm" style={{ color: 'var(--gold)' }}>
          ← Back to leads
        </button>
      </div>
    );
  }

  const stageC = STAGE_CONFIG[lead.stage];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          onClick={() => router.push('/leads')}
          className="flex items-center gap-2 text-sm hover:underline self-start"
          style={{ color: 'var(--pumice)' }}
        >
          <ArrowLeft size={16} />
          Back to leads
        </button>

        <div className="flex-1" />

        {/* Conflict warning */}
        {conflictError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          >
            <AlertTriangle size={14} />
            Version conflict — click Refresh to reload
            <button
              onClick={handleRefresh}
              className="ml-2 flex items-center gap-1 font-medium hover:underline"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          </motion.div>
        )}

        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => { setIsEditing(false); setEditData(lead); setConflictError(false); }}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              style={{ border: '1px solid var(--border)', color: 'var(--pumice)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-50"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              <Save size={14} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Edit Lead
          </button>
        )}
      </div>

      {/* Lead header card */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: stageC.bgColor, color: stageC.color }}
          >
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>{lead.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: stageC.bgColor, color: stageC.color }}
              >
                {stageC.label}
              </span>
              <span
                className="text-xs px-2 py-1 rounded font-medium"
                style={{ color: PRIORITY_CONFIG[lead.priority].color }}
              >
                {PRIORITY_CONFIG[lead.priority].label} priority
              </span>
              {lead.is_overdue && (
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: '#ef4444' }}>
                  <AlertTriangle size={12} /> Overdue
                </span>
              )}
              <span className="text-xs" style={{ color: 'var(--pumice)' }}>
                v{lead.version}
              </span>
            </div>
          </div>
          {lead.value > 0 && (
            <div className="text-right">
              <p className="text-xs tracking-premium uppercase" style={{ color: 'var(--pumice)' }}>Deal Value</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>{formatCurrency(lead.value)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <EditField label="Email" value={editData.email || ''} onChange={(v) => setEditData({ ...editData, email: v })} icon={<Mail size={14} />} />
                  <EditField label="Phone" value={editData.phone || ''} onChange={(v) => setEditData({ ...editData, phone: v })} icon={<Phone size={14} />} />
                  <EditField label="Company" value={editData.company || ''} onChange={(v) => setEditData({ ...editData, company: v })} icon={<Building2 size={14} />} />
                  <EditField label="Value" value={String(editData.value || '')} onChange={(v) => setEditData({ ...editData, value: parseFloat(v) || 0 } as any)} icon={<DollarSign size={14} />} type="number" />
                </>
              ) : (
                <>
                  <InfoField label="Email" value={lead.email} icon={<Mail size={14} />} />
                  <InfoField label="Phone" value={lead.phone} icon={<Phone size={14} />} />
                  <InfoField label="Company" value={lead.company} icon={<Building2 size={14} />} />
                  <InfoField label="Value" value={lead.value > 0 ? formatCurrency(lead.value) : null} icon={<DollarSign size={14} />} />
                </>
              )}
            </div>
          </div>

          {/* Lead Meta */}
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Lead Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Stage</label>
                    <select
                      value={editData.stage || lead.stage}
                      onChange={(e) => setEditData({ ...editData, stage: e.target.value as LeadStage })}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      {Object.entries(STAGE_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Priority</label>
                    <select
                      value={editData.priority || lead.priority}
                      onChange={(e) => setEditData({ ...editData, priority: e.target.value as LeadPriority })}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Source</label>
                    <select
                      value={editData.source || lead.source}
                      onChange={(e) => setEditData({ ...editData, source: e.target.value as LeadSource })}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      {Object.entries(SOURCE_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <InfoField
                    label="Source"
                    value={SOURCE_CONFIG[lead.source]?.label}
                    icon={<span className="text-xs">{SOURCE_CONFIG[lead.source]?.icon}</span>}
                  />
                  <InfoField label="Follow-up" value={lead.follow_up_date} icon={<Calendar size={14} />} />
                  <InfoField label="Follow-up Count" value={String(lead.follow_up_count)} icon={<Hash size={14} />} />
                </>
              )}
            </div>

            {/* Notes */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Notes</label>
              {isEditing ? (
                <textarea
                  value={editData.notes || ''}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none focus:ring-1 focus:ring-gold"
                  style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                />
              ) : (
                <p className="text-sm" style={{ color: lead.notes ? 'var(--foreground)' : 'var(--pumice)' }}>
                  {lead.notes || 'No notes yet'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Interactions Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Interactions</h2>
            <button
              onClick={() => setShowAddInteraction(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:brightness-110"
              style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
            >
              <Plus size={12} /> Add
            </button>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {interactions.length === 0 ? (
              <div className="glass-card rounded-xl p-6 text-center">
                <MessageSquare size={24} className="mx-auto mb-2" style={{ color: 'var(--pumice)' }} />
                <p className="text-sm" style={{ color: 'var(--pumice)' }}>No interactions yet</p>
              </div>
            ) : (
              interactions.map((int) => {
                const Icon = INTERACTION_ICONS[int.type] || MessageSquare;
                return (
                  <motion.div
                    key={int.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card rounded-lg p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
                      >
                        <Icon size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium capitalize" style={{ color: 'var(--gold)' }}>
                            {int.type}
                          </span>
                          {int.outcome && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded capitalize" style={{
                              color: int.outcome === 'positive' ? '#22c55e' : int.outcome === 'negative' ? '#ef4444' : 'var(--pumice)',
                              background: int.outcome === 'positive' ? 'rgba(34,197,94,0.1)' : int.outcome === 'negative' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)',
                            }}>
                              {int.outcome}
                            </span>
                          )}
                        </div>
                        <p className="text-sm wrap-break-word" style={{ color: 'var(--foreground)' }}>
                          {int.content}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px]" style={{ color: 'var(--pumice)' }}>{int.user_name}</span>
                          <span className="text-[10px]" style={{ color: 'var(--pumice)' }}>
                            {formatDateTime(int.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Add Interaction Modal */}
      <AnimatePresence>
        {showAddInteraction && (
          <AddInteractionModal
            leadId={id}
            onClose={() => setShowAddInteraction(false)}
            onCreated={() => { setShowAddInteraction(false); loadData(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Helper Components ─────────────────────────────────────────

function InfoField({ label, value, icon }: { label: string; value: string | null | undefined; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ color: 'var(--pumice)' }}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-premium" style={{ color: 'var(--pumice)' }}>{label}</p>
        <p className="text-sm" style={{ color: value ? 'var(--foreground)' : 'var(--pumice)' }}>
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, icon, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; icon: React.ReactNode; type?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[10px] uppercase tracking-premium mb-1" style={{ color: 'var(--pumice)' }}>
        {icon} {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-gold"
        style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
      />
    </div>
  );
}

function AddInteractionModal({ leadId, onClose, onCreated }: {
  leadId: string; onClose: () => void; onCreated: () => void;
}) {
  const [form, setForm] = useState({ type: 'note' as InteractionType, content: '', outcome: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await interactionsApi.create({
        lead_id: leadId,
        type: form.type,
        content: form.content,
        outcome: form.outcome || undefined,
      });
      toast.success('Interaction logged');
      onCreated();
    } catch (err: any) {
      toast.error(err.message || 'Failed to log interaction');
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>Log Interaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as InteractionType })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="note">Note</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="follow_up">Follow-up</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Outcome</label>
              <select
                value={form.outcome}
                onChange={(e) => setForm({ ...form, outcome: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <option value="">None</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
                <option value="no_response">No Response</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--pumice)' }}>Notes *</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none focus:ring-1 focus:ring-gold"
              style={{ background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              placeholder="Describe the interaction..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5"
              style={{ border: '1px solid var(--border)', color: 'var(--pumice)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 disabled:opacity-50"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              {isSubmitting ? 'Saving...' : 'Log Interaction'}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
