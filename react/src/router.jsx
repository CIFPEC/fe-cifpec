import {
  createBrowserRouter
} from "react-router";

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
   {
    path: "/dashboard/course",
    element: <Course />,
  },
  {
    path: "/dashboard/batch",
    element: <Batch />,
  },
   {
    path: "/dashboard/setupbatch",
    element: <SetupBatch />,
  },
  {
    path: "/dashboard/lecturelist",
    element: <LectureList />,
  },
  {
    path: "/dashboard/studentproject",
    element: <StudentProject />,
  },
  {
    path: "/dashboard/userrequest",
    element: <UserRequest />,
  },
  {
    path: "/dashboard/projectrequirement",
    element: <ProjectRequirement />,
  },
  {
    path: "/dashboard/projectlist",
    element: <ProjectList />,
  },
]);

export default router;