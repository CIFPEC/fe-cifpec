import {
  createBrowserRouter
} from "react-router";

import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/setting",
    element: <Profile />,
  },
]);

export default router;