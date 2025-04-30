import {
  createBrowserRouter
} from "react-router";

import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";

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
    element: <h1>Profile Setting</h1>,
  },
]);

export default router;