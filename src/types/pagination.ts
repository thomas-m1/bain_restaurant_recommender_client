export type PaginatedResponse<T> = {
    total: number;
    limit: number;
    offset: number;
    items: T[];
  };
