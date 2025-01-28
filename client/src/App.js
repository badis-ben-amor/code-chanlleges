import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import ProtectRoute from "./components/protectRoutes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import AdminChallenges from "./pages/admin/AdminChallenges";
import Navbar from "./components/layouts/Navbar";
// import Footer from "./components/layouts/Footer";
import { fetchUserProfileThunk } from "./redux/slices/userSlice";
import AdminProtectedRoute from "./components/protectRoutes/AdminProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
// import Unauthorized from "./pages/admin/Unauthorized";
// import AdminSettings from "./pages/admin/AdminSettings";
import ChallengeDetails from "./pages/ChallengeDetails";
import Notifications from "./pages/Notifications";
import BadgePage from "./pages/BadgePage";
import ActivityLogPage from "./pages/ActivityLogPage";

const App = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(fetchUserProfileThunk(accessToken));
  // }, [dispatch, accessToken]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetails />} />
        {/* user */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/badge" element={<BadgePage />} />
        <Route path="/activity" element={<ActivityLogPage />} />
        {/* user routes         */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <Outlet />
            </ProtectRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        {/* admin protect rotes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="challenges" element={<AdminChallenges />} />
          <Route path="users" element={<AdminUsers />} />
          {/* <Route path="settings" element={<AdminSettings />} /> */}
        </Route>
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
