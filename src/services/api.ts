import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject auth token when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — unwrap API envelope
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiErrors = error.response?.data?.errors;
    if (apiErrors && apiErrors.length > 0) {
      return Promise.reject({ errors: apiErrors, status: error.response.status });
    }
    return Promise.reject(error);
  }
);

export default api;
