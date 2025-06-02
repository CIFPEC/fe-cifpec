import { useEffect } from 'react';
import axiosInstance from './utils/axiosInstance';

const AppWrapper = ({ children }) => {
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await axiosInstance.get('/site/settings');
        const data = response.data?.data;

        if (data?.title) {
          document.title = data.title || "";
        }

        if (data?.logo) {
          const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = data.logo;
          document.getElementsByTagName('head')[0].appendChild(link);
        }

        console.log('Site Settings:', data);
      } catch (err) {
        console.error('Failed to load site settings:', err);
      }
    };

    fetchSiteSettings();
  }, []);

  return children;
};

export default AppWrapper;
