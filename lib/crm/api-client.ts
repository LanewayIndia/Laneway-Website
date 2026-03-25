// ═══════════════════════════════════════════════════════════════
// OutreachDesk CRM — API Client with JWT auth & refresh
// ═══════════════════════════════════════════════════════════════

const API_BASE = process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:4000/api';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: any;
}

// Token management
function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('crm_access_token');
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('crm_refresh_token');
}

function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('crm_access_token', accessToken);
  localStorage.setItem('crm_refresh_token', refreshToken);
}

function clearTokens() {
  localStorage.removeItem('crm_access_token');
  localStorage.removeItem('crm_refresh_token');
  localStorage.removeItem('crm_user');
}

function setUser(user: any) {
  localStorage.setItem('crm_user', JSON.stringify(user));
}

function getUser(): any {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('crm_user');
  return raw ? JSON.parse(raw) : null;
}

// Refresh token logic
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return false;

      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      if (data.success && data.data) {
        setTokens(data.data.accessToken, data.data.refreshToken);
        setUser(data.data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Main fetch wrapper
async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {},
  retry = true
): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // Handle token expiry → refresh and retry
  if (res.status === 401 && retry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch<T>(endpoint, options, false);
    }
    // Redirect to login
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/crm-login';
    }
    throw new Error('Session expired');
  }

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error?.message || 'API request failed') as any;
    error.statusCode = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ─── Auth API ──────────────────────────────────────────────────
export const authApi = {
  login: async (email: string, password: string) => {
    const data = await apiFetch<{ success: boolean; data: any }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (data.success && data.data) {
      setTokens(data.data.accessToken, data.data.refreshToken);
      setUser(data.data.user);
    }
    return data;
  },

  logout: async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      clearTokens();
    }
  },

  getProfile: () => apiFetch('/auth/profile'),

  isAuthenticated: () => !!getAccessToken(),

  getStoredUser: () => getUser(),
};

// ─── Leads API ─────────────────────────────────────────────────
export const leadsApi = {
  list: (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          searchParams.set(key, String(value));
        }
      });
    }
    const qs = searchParams.toString();
    return apiFetch(`/leads${qs ? `?${qs}` : ''}`);
  },

  getById: (id: string) => apiFetch(`/leads/${id}`),

  getPipeline: () => apiFetch('/leads/pipeline'),

  create: (data: any) => apiFetch('/leads', { method: 'POST', body: data }),

  update: (id: string, data: any) =>
    apiFetch(`/leads/${id}`, { method: 'PUT', body: data }),

  delete: (id: string) => apiFetch(`/leads/${id}`, { method: 'DELETE' }),
};

// ─── Interactions API ──────────────────────────────────────────
export const interactionsApi = {
  getByLead: (leadId: string) => apiFetch(`/interactions/lead/${leadId}`),

  create: (data: any) =>
    apiFetch('/interactions', { method: 'POST', body: data }),

  getRecent: (limit = 10) => apiFetch(`/interactions/recent?limit=${limit}`),
};

// ─── Dashboard API ─────────────────────────────────────────────
export const dashboardApi = {
  getFull: () => apiFetch('/dashboard'),
  getKPIs: () => apiFetch('/dashboard/kpis'),
};

// ─── Users API ─────────────────────────────────────────────────
export const usersApi = {
  list: () => apiFetch('/users'),
  getRoles: () => apiFetch('/users/roles'),
};

// ─── Activity Logs API ─────────────────────────────────────────
export const activityLogsApi = {
  list: (params?: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.set(key, String(value));
        }
      });
    }
    const qs = searchParams.toString();
    return apiFetch(`/activity-logs${qs ? `?${qs}` : ''}`);
  },

  getEntityHistory: (entityType: string, entityId: string) =>
    apiFetch(`/activity-logs/${entityType}/${entityId}`),
};

export { clearTokens, getUser, setUser };
