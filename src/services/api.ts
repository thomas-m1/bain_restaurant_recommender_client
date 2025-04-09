import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

if (!baseURL) {
  throw new Error('Missing REACT_APP_API_BASE_URL');
}

const api = axios.create({
  baseURL: 'https://restaurantrecommenderserver-production.up.railway.app/api',
});

export default api;
