import { createBrowserRouter } from "react-router-dom";

import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from './pages/Profile.jsx';
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/setting",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/course",
    element: (
      <PrivateRoute>
        <Course />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/batch",
    element: (
      <PrivateRoute>
        <Batch />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/setupbatch",
    element: (
      <PrivateRoute>
        <SetupBatch />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/lecturelist",
    element: (
      <PrivateRoute>
        <LectureList />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/studentproject",
    element: (
      <PrivateRoute>
        <StudentProject />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/userrequest",
    element: (
      <PrivateRoute>
        <UserRequest />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/projectrequirement",
    element: (
      <PrivateRoute>
        <ProjectRequirement />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/projectlist",
    element: (
      <PrivateRoute>
        <ProjectList />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/batch/new",
    element: (
      <PrivateRoute>
        <SetupBatch />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/project/newproject",
    element: (
      <PrivateRoute>
        <StudentProject />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/web-setting",
    element: (
      <PrivateRoute>
        <WebSetting />
      </PrivateRoute>
    ),
  },
]);

export default router;
