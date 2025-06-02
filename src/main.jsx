import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import AppWrapper from './AppWrapper'; // pastikan import betul

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper>
      <RouterProvider router={router} />
    </AppWrapper>
  </StrictMode>
);

