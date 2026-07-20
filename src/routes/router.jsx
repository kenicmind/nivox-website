import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout.jsx';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import SpacesPage from '../pages/Spaces/SpacesPage';
import EventsPage from '../pages/Events/EventsPage';
import CommunityPage from '../pages/Community/CommunityPage';
import AuthPage from '../pages/Auth/AuthPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AdminPage from '../pages/Admin/AdminPage';

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
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
