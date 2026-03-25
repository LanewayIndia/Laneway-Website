'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KanbanSquare, GripVertical, Phone, Mail, Building2, AlertTriangle, Clock,
} from 'lucide-react';
import { leadsApi } from '@/lib/crm/api-client';
import { Lead, LeadStage, STAGE_CONFIG, PRIORITY_CONFIG } from '@/lib/crm/types';
import { PipelineSkeleton, EmptyState } from '@/components/crm/shared/skeletons';
import { toast } from 'sonner';

function formatCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

const STAGES: LeadStage[] = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

export default function PipelinePage() {
  const [pipeline, setPipeline] = useState<Record<string, Lead[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const loadPipeline = useCallback(async () => {
    try {
      const res = await leadsApi.getPipeline();
      if (res.success) setPipeline(res.data);
    } catch (err) {
      console.error('Pipeline load error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadPipeline(); }, [loadPipeline]);

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = async (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    setDragOverStage(null);

    if (!draggedLead || draggedLead.stage === newStage) {
      setDraggedLead(null);
      return;
    }

    const leadToMove = draggedLead;
    setDraggedLead(null);
    handleMoveStage(leadToMove, newStage);
  };

  const handleMoveStage = async (leadToMove: Lead, newStage: string) => {
    if (leadToMove.stage === newStage) return;
    
    const oldStage = leadToMove.stage;

    // Optimistic update
    setPipeline((prev) => {
      const updated = { ...prev };
      updated[oldStage] = (prev[oldStage] || []).filter((l) => l.id !== leadToMove.id);
      updated[newStage] = [...(prev[newStage] || []), { ...leadToMove, stage: newStage as LeadStage }];
      return updated;
    });

    try {
      await leadsApi.update(leadToMove.id, {
        stage: newStage,
        version: leadToMove.version,
      });
      toast.success(`Moved "${leadToMove.name}" to ${STAGE_CONFIG[newStage as LeadStage]?.label}`);
      // Reload to get updated versions
      loadPipeline();
    } catch (err: any) {
      // Revert on failure
      setPipeline((prev) => {
        const updated = { ...prev };
        updated[newStage] = (prev[newStage] || []).filter((l) => l.id !== leadToMove.id);
        updated[oldStage] = [...(prev[oldStage] || []), leadToMove];
        return updated;
      });

      if (err.statusCode === 409) {
        toast.error('Conflict: Lead was modified by another user. Refreshing...');
        loadPipeline();
      } else {
        toast.error('Failed to update stage');
      }
    }
  };

  if (isLoading) return <PipelineSkeleton />;

  const totalLeads = Object.values(pipeline).reduce((sum, leads) => sum + leads.length, 0);

  if (totalLeads === 0) {
    return (
      <EmptyState
        icon={<KanbanSquare size={28} />}
        title="No leads yet"
        description="Start adding leads to see them in your pipeline view"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Pipeline</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--pumice)' }}>
          Drag leads between stages to update their status. <span style={{ opacity: 0.7 }}>Scroll horizontally to see all stages.</span>
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pipeline-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .pipeline-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05); 
          border-radius: 4px;
        }
        .pipeline-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2); 
          border-radius: 4px;
        }
        .pipeline-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--gold); 
        }
      `}} />

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-6 mt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory pipeline-scroll">
        {STAGES.map((stage) => {
          const leads = pipeline[stage] || [];
          const stageConfig = STAGE_CONFIG[stage];
          const totalValue = leads.reduce((sum, l) => sum + (l.value || 0), 0);

          return (
            <div
              key={stage}
              className="min-w-[280px] sm:min-w-[300px] shrink-0 flex flex-col snap-start"
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              {/* Stage Header */}
              <div
                className="rounded-t-xl px-4 py-3 flex items-center justify-between"
                style={{
                  background: stageConfig.bgColor,
                  borderBottom: `2px solid ${stageConfig.color}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: stageConfig.color }}
                  />
                  <span className="text-sm font-semibold" style={{ color: stageConfig.color }}>
                    {stageConfig.label}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: `${stageConfig.color}20`, color: stageConfig.color }}
                  >
                    {leads.length}
                  </span>
                </div>
                {totalValue > 0 && (
                  <span className="text-xs font-medium" style={{ color: stageConfig.color }}>
                    {formatCurrency(totalValue)}
                  </span>
                )}
              </div>

              {/* Cards Container */}
              <div
                className="flex-1 p-2 space-y-2 min-h-[200px] rounded-b-xl transition-all duration-200"
                style={{
                  background: dragOverStage === stage ? 'rgba(201, 168, 85, 0.05)' : 'rgba(12, 12, 12, 0.3)',
                  borderRight: dragOverStage === stage ? '2px dashed var(--gold)' : '1px solid var(--border)',
                  borderBottom: dragOverStage === stage ? '2px dashed var(--gold)' : '1px solid var(--border)',
                  borderLeft: dragOverStage === stage ? '2px dashed var(--gold)' : '1px solid var(--border)',
                  borderTop: 'none',
                }}
              >
                <AnimatePresence mode="popLayout">
                  {leads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      draggable
                      onDragStart={() => handleDragStart(lead)}
                      className="glass-card rounded-lg p-3 cursor-grab active:cursor-grabbing
                        hover:glow-gold-sm transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="text-sm font-medium hover:underline truncate flex-1"
                          style={{ color: 'var(--foreground)' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lead.name}
                        </Link>
                        <GripVertical
                          size={14}
                          className="shrink-0 ml-1 opacity-0 group-hover:opacity-50 transition-opacity"
                          style={{ color: 'var(--pumice)' }}
                        />
                      </div>

                      {lead.company && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Building2 size={12} style={{ color: 'var(--pumice)' }} />
                          <span className="text-xs truncate" style={{ color: 'var(--pumice)' }}>
                            {lead.company}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Priority badge */}
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{
                            background: `${PRIORITY_CONFIG[lead.priority].color}20`,
                            color: PRIORITY_CONFIG[lead.priority].color,
                          }}
                        >
                          {PRIORITY_CONFIG[lead.priority].label}
                        </span>

                        {/* Value */}
                        {lead.value > 0 && (
                          <span className="text-[10px] font-medium" style={{ color: 'var(--gold)' }}>
                            {formatCurrency(lead.value)}
                          </span>
                        )}

                        {/* Overdue indicator */}
                        {lead.is_overdue && (
                          <span className="flex items-center gap-0.5 text-[10px]" style={{ color: '#ef4444' }}>
                            <AlertTriangle size={10} />
                            Overdue
                          </span>
                        )}
                      </div>

                      {/* Bottom Row: Assigned User & Mobile Stage Selector */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                        {lead.assigned_user_name ? (
                          <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                              style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
                            >
                              {lead.assigned_user_name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-[10px] truncate" style={{ color: 'var(--pumice)' }}>
                              {lead.assigned_user_name}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[10px] flex-1 text-transparent select-none">-</div>
                        )}
                        
                        {/* Mobile Stage Selector (Only visible on small screens / touch) */}
                        <div className="lg:hidden shrink-0">
                          <select
                            value={lead.stage}
                            onChange={(e) => handleMoveStage(lead, e.target.value)}
                            className="bg-transparent text-[10px] font-medium outline-none cursor-pointer py-1"
                            style={{ color: 'var(--gold)' }}
                            aria-label="Move stage"
                          >
                            <option value={lead.stage} disabled>Move to...</option>
                            {STAGES.map(s => (
                              s !== lead.stage && <option key={s} value={s}>{STAGE_CONFIG[s].label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {leads.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-xs" style={{ color: 'var(--pumice)' }}>
                    Drop leads here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
