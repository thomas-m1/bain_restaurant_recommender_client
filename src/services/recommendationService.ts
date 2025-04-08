import api from './api';


export const submitRecommendation = async (data: {
    business_id: string;
    user_email: string;
    suggest: boolean;
    note?: string;
  }) => {
    return await api.post('/v1/recommendations', data);
  };