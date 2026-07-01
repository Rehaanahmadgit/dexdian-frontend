import axios from 'axios';
import Cookies from 'js-cookie';

// ─── Constants ───────────────────────────────────────────

const API_BASE_URL = 'https://dexschool-backend.dexlabsai.in';

// ─── Axios Instance ──────────────────────────────────────

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

// ─── Request Interceptor ─────────────────────────────────
// Attaches JWT from httpOnly-style cookie on every request

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────
// Handles 401 globally: clears token and redirects to login

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('accessToken');
      if (typeof window !== 'undefined') {
        // Avoid redirect loops on the login page itself
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
