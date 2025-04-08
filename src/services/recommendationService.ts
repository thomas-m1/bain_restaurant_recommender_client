import api from './api';
import { Recommendation } from '../types/restaurant';

// export const getRecommendations = async (businessId: string): Promise<Recommendation[]> => {
//   const response = await api.get<Recommendation[]>('/v1/recommendations', {
//     params: { business_id: businessId },
//   });
//   return response.data;
// };


export const submitRecommendation = async (data: {
    business_id: string;
    user_email: string;
    suggest: boolean;
    note?: string;
  }) => {
    return await api.post('/v1/recommendations', data);
  };