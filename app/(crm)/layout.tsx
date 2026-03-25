'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CrmAuthProvider, useCrmAuth } from '@/lib/crm/hooks/use-crm-auth';
import { CrmSidebar } from '@/components/crm/layout/crm-sidebar';
import { Skeleton } from '@/components/crm/shared/skeletons';

function CrmLayoutInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useCrmAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/crm-login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse"
            style={{ background: 'var(--gold-muted)', color: 'var(--gold)' }}
          >
            <span className="text-lg font-bold">OD</span>
          </div>
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      <CrmSidebar />
      <main
        className="flex-1 min-h-screen transition-all duration-300 lg:ml-[260px]"
        style={{ color: 'var(--foreground)' }}
      >
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <CrmAuthProvider>
      <CrmLayoutInner>{children}</CrmLayoutInner>
    </CrmAuthProvider>
  );
}
