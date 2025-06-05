import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');

  if (token && token.split('.').length === 3) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        const refreshRes = await axios.get(`${baseURL}/token`, {
          withCredentials: true
        });

        const newToken = refreshRes.data?.data?.token;
        localStorage.setItem('accessToken', newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw err;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshRes = await axios.get(`${baseURL}/token`, {
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
