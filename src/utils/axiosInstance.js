import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

const MAX_RETRIES = 3;

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  let attempt = 0;


  if (token && token.split('.').length === 3) {
    for(attempt; attempt <= MAX_RETRIES, attempt++;){
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
  
        if (decoded.exp < now) {
          const refreshRes = await axios.get(`${baseURL}/token`, {
            withCredentials: true
          });
  
          const newToken = refreshRes.data?.data?.token;
          if(!newToken) throw new Error(`No access token returned`);

          localStorage.setItem('accessToken', newToken);
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn(`Renew attempt ${attempt} failed`, err);

        await new Promise((resolve) => setTimeout(resolve,1000));
      }

      console.log('Renew token failed after retry. Log out');
      await axiosInstance.delete('/auth/logout');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(error)
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
