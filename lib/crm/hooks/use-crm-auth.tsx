'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, clearTokens } from '@/lib/crm/api-client';
import { User } from '@/lib/crm/types';

interface CrmAuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const CrmAuthContext = createContext<CrmAuthContextType | undefined>(undefined);

export function CrmAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      if (!authApi.isAuthenticated()) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const stored = authApi.getStoredUser();
      if (stored) {
        setUser(stored);
      }

      const res = await authApi.getProfile();
      if (res.success && res.data) {
        setUser({
          id: res.data.id,
          email: res.data.email,
          name: res.data.name,
          role: res.data.role_name,
          avatar_url: res.data.avatar_url,
        });
      }
    } catch {
      setUser(null);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    if (res.success && res.data?.user) {
      setUser(res.data.user);
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  return (
    <CrmAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </CrmAuthContext.Provider>
  );
}

export function useCrmAuth() {
  const context = useContext(CrmAuthContext);
  if (!context) {
    throw new Error('useCrmAuth must be used within a CrmAuthProvider');
  }
  return context;
}
