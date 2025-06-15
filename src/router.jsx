import { createBrowserRouter } from "react-router-dom";

import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Course from "./pages/Course.jsx";
import Batch from "./pages/Batch.jsx";
import SetupBatch from "./pages/SetupBatch.jsx";
import LectureList from "./pages/LectureList.jsx";
import StudentProject from "./pages/StudentProject.jsx";
import UserRequest from "./pages/UserRequest.jsx";
import ProjectRequirement from "./pages/ProjectRequirement.jsx";
import ProjectList from "./pages/ProjectList.jsx";
import WebSetting from "./pages/WebSetting.jsx";
import VerifyEmailPage from "./pages/VerifyEmail.jsx";
import Homepage from "./pages/Homepage.jsx";
import PrivateRoute from "./components/PrivateRoute";
import { Error401, Error403, Error404 } from "./pages/ErrorPages";
import Category from "./pages/Category.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />, // Public route
  },
  {
    path: "/login",
    element: <Auth />, // Public route
  },
  {
    path: "/verifyemail",
    element: <VerifyEmailPage />, // Public route
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} roles={[1, 2, 3, 4, 5]} />,
  },
  {
    path: "/dashboard/setting",
    element: <PrivateRoute element={<Profile />} roles={[1, 2, 3, 4, 5]} />,
  },
  {
    path: "/dashboard/course",
    element: <PrivateRoute element={<Course />} roles={[1]} />,
  },
  {
    path: "/dashboard/batch",
    element: <PrivateRoute element={<Batch />} roles={[1]} />,
  },
  {
    path: "/dashboard/setupbatch",
    element: <PrivateRoute element={<SetupBatch />} roles={[1]} />,
  },
  {
    path: "/dashboard/lecturelist",
    element: <PrivateRoute element={<LectureList />} roles={[1]} />,
  },
  {
    path: "/dashboard/studentproject",
    element: <PrivateRoute element={<StudentProject />} roles={[5]} />,
  },
  {
    path: "/dashboard/userrequest",
    element: <PrivateRoute element={<UserRequest />} roles={[1]} />,
  },
  {
    path: "/dashboard/projectrequirement",
    element: <PrivateRoute element={<ProjectRequirement />} roles={[1]} />,
  },
  {
    path: "/dashboard/projectlist",
    element: <PrivateRoute element={<ProjectList />} roles={[1, 3, 4, 5]} />,
  },
  {
    path: "/dashboard/batch/new",
    element: <PrivateRoute element={<SetupBatch />} roles={[1]} />,
  },
  {
    path: "/dashboard/project/newproject",
    element: <PrivateRoute element={<StudentProject />} roles={[5]} />,
  },
  {
    path: "/dashboard/web-setting",
    element: <PrivateRoute element={<WebSetting />} roles={[2]} />,
  },
  {
    path: "/dashboard/category",
    element: <PrivateRoute element={<Category />} roles={[1]} />,
  },
  {
    path: "/error/401",
    element: <Error401 />,
  },
  {
    path: "/error/403",
    element: <Error403 />,
  },

  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
