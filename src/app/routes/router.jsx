import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoadingState from '../components/common/LoadingState';

const HomePage = lazy(() => import('../../pages/Home/HomePage'));
const AboutPage = lazy(() => import('../../pages/About/AboutPage'));
const SpacesPage = lazy(() => import('../../pages/Spaces/SpacesPage'));
const MembershipPage = lazy(() => import('../../pages/Membership/MembershipPage'));
const PartnersPage = lazy(() => import('../../pages/Partners/PartnersPage'));
const EventsPage = lazy(() => import('../../pages/Events/EventsPage'));
const CommunityPage = lazy(() => import('../../pages/Community/CommunityPage'));
const ContactPage = lazy(() => import('../../pages/Contact/ContactPage'));

const AuthPage = lazy(() => import('../../pages/Auth/AuthPage'));

const StudentDashboardPage = lazy(() => import('../../pages/Dashboard/DashboardPage'));
const StudentMembershipPage = lazy(() => import('../../pages/StudentMembership/StudentMembershipPage'));
const StudentBookingsPage = lazy(() => import('../../pages/StudentBookings/StudentBookingsPage'));
const StudentEventsPage = lazy(() => import('../../pages/StudentEvents/StudentEventsPage'));
const StudentResourcesPage = lazy(() => import('../../pages/StudentResources/StudentResourcesPage'));
const StudentNotificationsPage = lazy(() => import('../../pages/StudentNotifications/StudentNotificationsPage'));
const StudentProfilePage = lazy(() => import('../../pages/StudentProfile/StudentProfilePage'));

const AdminDashboardPage = lazy(() => import('../../pages/Admin/AdminPage'));
const AdminStudentsPage = lazy(() => import('../../pages/AdminStudents/AdminStudentsPage'));
const AdminBookingsPage = lazy(() => import('../../pages/AdminBookings/AdminBookingsPage'));
const AdminEventsPage = lazy(() => import('../../pages/AdminEvents/AdminEventsPage'));
const AdminPartnersPage = lazy(() => import('../../pages/AdminPartners/AdminPartnersPage'));
const AdminResourcesPage = lazy(() => import('../../pages/AdminResources/AdminResourcesPage'));
const AdminReportsPage = lazy(() => import('../../pages/AdminReports/AdminReportsPage'));
const AdminSettingsPage = lazy(() => import('../../pages/AdminSettings/AdminSettingsPage'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingState message="Loading NIVOX" />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/spaces" element={<SpacesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/register" element={<Navigate to="/auth" replace />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            <Route path="/student/membership" element={<StudentMembershipPage />} />
            <Route path="/student/bookings" element={<StudentBookingsPage />} />
            <Route path="/student/events" element={<StudentEventsPage />} />
            <Route path="/student/resources" element={<StudentResourcesPage />} />
            <Route path="/student/notifications" element={<StudentNotificationsPage />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/students" element={<AdminStudentsPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route path="/admin/events" element={<AdminEventsPage />} />
            <Route path="/admin/partners" element={<AdminPartnersPage />} />
            <Route path="/admin/resources" element={<AdminResourcesPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
