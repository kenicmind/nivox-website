import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout.jsx';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import SpacesPage from '../pages/Spaces/SpacesPage';
import EventsPage from '../pages/Events/EventsPage';
import CommunityPage from '../pages/Community/CommunityPage';
import MembershipPage from "../pages/Membership/MembershipPage";
import AuthPage from '../pages/Auth/LoginPage.jsx';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AdminPage from '../pages/Admin/AdminPage';
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
