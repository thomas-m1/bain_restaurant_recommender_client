import api from './api';
import { Restaurant } from '../types/restaurant';
import { PaginatedResponse } from '../types/pagination';
import { Filters } from '../types/filters';

export type SearchParams = Filters & {
  skip?: number;
  limit?: number;
};

export const fetchRestaurants = async (
  params: SearchParams
): Promise<PaginatedResponse<Restaurant>> => {
  const response = await api.get<PaginatedResponse<Restaurant>>('/v1/restaurants/', {
    params,
    paramsSerializer: (params) => {
      const query = new URLSearchParams();

      // Handle array parameters
      const arrayFields: (keyof SearchParams)[] = [
        'categories',
        'price',
        'good_for_meal',
      ];

      arrayFields.forEach((key) => {
        const values = params[key];
        if (Array.isArray(values)) {
          values.forEach((val) => {
            query.append(key, key === 'good_for_meal' ? val.toLowerCase() : val);
          });
        }
      });

      // Handle single-value filters
      const singleFields: (keyof SearchParams)[] = [
        'scenario_tag',
        'sort_by',
        'outdoor_seating',
        'good_for_groups',
        'max_distance_km',
        'skip',
        'limit',
      ];

      singleFields.forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      return query.toString();
    },
  });

  return response.data;
};
