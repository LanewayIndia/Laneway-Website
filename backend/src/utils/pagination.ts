export interface PaginationParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function parsePagination(query: any): PaginationParams {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const sortBy = query.sortBy || 'created_at';
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

  return { page, limit, sortBy, sortOrder };
}

export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / params.limit);

  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}

// Allowed sort columns to prevent SQL injection
const ALLOWED_LEAD_SORT_COLUMNS = [
  'name', 'email', 'company', 'stage', 'priority', 'value',
  'follow_up_date', 'created_at', 'updated_at', 'source',
];

export function sanitizeSortColumn(column: string, entity: string = 'leads'): string {
  if (entity === 'leads') {
    return ALLOWED_LEAD_SORT_COLUMNS.includes(column) ? column : 'created_at';
  }
  return 'created_at';
}
