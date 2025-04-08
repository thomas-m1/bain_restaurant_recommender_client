import api from './api';
import { Restaurant } from '../types/restaurant';

type SearchParams = {
  price?: string[];
  categories?: string[];
  scenario_tag?: string;
  sort_by?: 'best_match' | 'highest_rated' | 'popularity' | 'distance';
  outdoor_seating?: boolean;
  good_for_groups?: boolean;
  max_distance_km?: number;
  skip?: number;
  limit?: number;
};

export const fetchRestaurants = async (
  params: SearchParams
): Promise<Restaurant[]> => {
  const response = await api.get<Restaurant[]>('/v1/restaurants', {
    params,
    paramsSerializer: (params) => {
      const query = new URLSearchParams();

      if (params.categories)
        params.categories.forEach((c: string) => query.append('categories', c));

      if (params.price)
        params.price.forEach((p: string) => query.append('price', p));

      if (params.scenario_tag)
        query.append('scenario_tag', params.scenario_tag);

      if (params.sort_by)
        query.append('sort_by', params.sort_by);

      if (params.outdoor_seating !== undefined)
        query.append('outdoor_seating', String(params.outdoor_seating));

      if (params.good_for_groups !== undefined)
        query.append('good_for_groups', String(params.good_for_groups));

      if (params.max_distance_km !== undefined)
        query.append('max_distance_km', params.max_distance_km.toString());

      if (params.skip)
        query.append('skip', params.skip.toString());

      if (params.limit)
        query.append('limit', params.limit.toString());

      return query.toString();
    },
  });

  return response.data;
};
