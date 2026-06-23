export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const parsePaginationParams = (query: { page?: string; limit?: string }): PaginationParams => {
  return {
    page: Math.max(1, parseInt(query.page || '1', 10)),
    limit: Math.min(100, Math.max(1, parseInt(query.limit || '10', 10))),
  };
};

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> => {
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
