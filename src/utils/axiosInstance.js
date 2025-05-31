import axios from 'axios';

// Base URL API
const baseURL = 'https://api-cifpec.xtivebiz.com/api/v1';

// Cipta instance axios
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // penting untuk support cookie (refresh token)
});

// Interceptor untuk tambah token sebelum setiap request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor untuk refresh token bila dapat 401
axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshRes = await axios.post(`${baseURL}/auth/token/refresh`, {}, {
        withCredentials: true
      });
      const newToken = refreshRes.data?.data?.token;
      localStorage.setItem('accessToken', newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});

export default axiosInstance;
