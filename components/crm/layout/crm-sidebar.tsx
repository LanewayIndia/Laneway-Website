'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, KanbanSquare, UserCircle, LogOut, Menu, X,
  Activity, Settings, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useCrmAuth } from '@/lib/crm/hooks/use-crm-auth';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/activity', label: 'Activity', icon: Activity },
];

export function CrmSidebar() {
  const pathname = usePathname();
  const { user, logout } = useCrmAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden"
        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
        aria-label="Open menu"
      >
        <Menu size={20} style={{ color: 'var(--gold)' }} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          width: collapsed ? 72 : 260,
          background: '#0a0a0a',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 h-16 border-b" style={{ borderColor: 'var(--border)' }}>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
                >
                  OD
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  OutreachDesk
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse toggle (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md hover:bg-white/5 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={14} style={{ color: 'var(--pumice)' }} /> : <ChevronLeft size={14} style={{ color: 'var(--pumice)' }} />}
          </button>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-white/5"
            aria-label="Close menu"
          >
            <X size={18} style={{ color: 'var(--pumice)' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive ? '' : 'hover:bg-white/5'}`}
                style={{
                  color: isActive ? 'var(--gold)' : 'var(--pumice)',
                  background: isActive ? 'var(--gold-muted)' : 'transparent',
                }}
              >
                <Icon size={18} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--gold)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                  {user?.name || 'User'}
                </p>
                <p className="text-xs truncate capitalize" style={{ color: 'var(--pumice)' }}>
                  {user?.role || 'Role'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => { logout(); setMobileOpen(false); }}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5 mt-1"
            style={{ color: 'var(--pumice)' }}
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
