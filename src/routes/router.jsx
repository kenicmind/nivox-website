import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout.jsx';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import SpacesPage from '../pages/Spaces/SpacesPage';
import EventsPage from '../pages/Events/EventsPage';
import CommunityPage from '../pages/Community/CommunityPage';
import MembershipPage from "../pages/Membership/MembershipPage";
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AdminPage from '../pages/Admin/AdminPage';
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import VerifyEmailPage from "../pages/Auth/VerifyEmailPage";
import AuthStatusPage from "../pages/Auth/AuthStatusPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/spaces" element={<SpacesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/community" element={<CommunityPage />} />
         <Route path="/membership" element={<MembershipPage />} />
         <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/auth-status" element={<AuthStatusPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
