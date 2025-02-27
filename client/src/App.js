import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
// import ProtectRoute from "./components/protectRoutes/ProtectedRoute";
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
import ChallengeDetails from "./pages/ChallengeDetails";

const App = () => {
  const dispatch = useDispatch();

  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(fetchUserProfileThunk(accessToken));
  }, [dispatch, accessToken]);

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
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* user */}
        {/* admin protect rotes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route index element={<AdminChallenges />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
