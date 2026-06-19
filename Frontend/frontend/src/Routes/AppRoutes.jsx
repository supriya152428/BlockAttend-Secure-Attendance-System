import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import StudentDashboard from "../Pages/StudentDashboard";
import FaceAttendance from "../Pages/FaceAttendance";

import Attendance from "../Pages/Attendance";
import Analytics from "../Pages/Analytics";
import BlockchainLogs from "../Pages/BlockchainLogs";
import TeacherDashboard from "../Pages/TeacherDashboard";
import Settings from "../Pages/Settings";
function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<StudentDashboard />}
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        {/* Analytics */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Blockchain */}

        <Route
          path="/blockchain"
          element={<BlockchainLogs />}
        />

        {/* Face Attendance */}

        <Route
          path="/face-attendance"
          element={<FaceAttendance />}
        />
        <Route
  path="/teacher-dashboard"
  element={<TeacherDashboard />}
/>
        <Route
  path="/settings"
  element={<Settings />}
/>

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;