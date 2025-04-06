import api from './api';
import { RestaurantResponse } from '../types';

export const getRestaurants = async (
  filters: any,
): Promise<RestaurantResponse | null> => {
  try {
    const {
      cuisine,
      occasion,
      ambiance,
      price,
      distance,
      rating,
      liked_by,
      sort_by,
      open_now,
      search,
      page,
    } = filters;

    const params: Record<string, any> = {
      location: 'Toronto Ontario',
      page,
      per_page: 10,
    };

    if (cuisine?.length) params.cuisine = cuisine.join(',');
    if (occasion) params.occasion = occasion;
    if (ambiance) params.ambiance = ambiance;
    if (price?.length) params.price = price.join(',');
    if (distance) params.distance = distance;
    if (rating) params.rating = rating;
    if (liked_by?.length) params.liked_by = liked_by.join(',');
    if (sort_by) params.sort_by = sort_by;
    if (open_now) params.open_now = open_now;
    if (search) params.search = search;

    console.log('Request to /v1/restaurants with params:', params);
    const response = await api.get('/v1/restaurants', { params });
    console.log(' Response from /v1/restaurants:', response.data);

    return response.data;
  } catch (err) {
    console.error('Failed to fetch restaurants:', err);
    return null;
  }
};
