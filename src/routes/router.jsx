import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/common/layout/Layout.jsx';
import HomePage from '../pages/Home/HomePage';
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded pages for optimized performance
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const SpacesPage = lazy(() => import('../pages/Spaces/SpacesPage'));
const EventsPage = lazy(() => import('../pages/Events/EventsPage'));
const CommunityPage = lazy(() => import('../pages/Community/CommunityPage'));
const MembershipPage = lazy(() => import('../pages/Membership/MembershipPage'));
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const AdminPage = lazy(() => import('../pages/Admin/AdminPage'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const VerifyEmailPage = lazy(() => import('../pages/Auth/VerifyEmailPage'));
const AuthStatusPage = lazy(() => import('../pages/Auth/AuthStatusPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Auth/ForgotPasswordPage'));
const BookingsPage = lazy(() => import('../pages/Bookings/BookingsPage'));
const TicketsPage = lazy(() => import('../pages/Bookings/TicketsPage'));
const ReservationDetailsPage = lazy(() => import('../pages/Bookings/ReservationDetailsPage'));
const ResourcesPage = lazy(() => import('../pages/Student/ResourcesPage'));
const AchievementsPage = lazy(() => import('../pages/Student/AchievementsPage'));
const AnalyticsPage = lazy(() => import('../pages/Student/AnalyticsPage'));
const OpportunitiesPage = lazy(() => import('../pages/Student/OpportunitiesPage'));
const TermsPage = lazy(() => import('../pages/Legal/TermsPage'));
const PrivacyPage = lazy(() => import('../pages/Legal/PrivacyPage'));
const FaqPage = lazy(() => import('../pages/Help/FaqPage'));
const NotFoundPage = lazy(() => import('../pages/Common/NotFoundPage'));

// Hidden Footer Pages
const PartnersPage = lazy(() => import('../pages/FooterPages/PartnersPage'));
const SponsorPage = lazy(() => import('../pages/FooterPages/SponsorPage'));
const UniversitiesPage = lazy(() => import('../pages/FooterPages/UniversitiesPage'));
const CorporatePartnersPage = lazy(() => import('../pages/FooterPages/CorporatePartnersPage'));
const ProspectusPage = lazy(() => import('../pages/FooterPages/ProspectusPage'));

const RouteLoadingState = () => (
  <div
    aria-label="Loading page"
    aria-live="polite"
    className="flex min-h-[50vh] items-center justify-center bg-[#140726] text-sm text-[#FFE7A3]"
  >
    Loading…
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingState />}>
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
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/bookings"
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <TicketsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/tickets"
              element={
                <ProtectedRoute>
                  <TicketsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reservations/:id"
              element={
                <ProtectedRoute>
                  <ReservationDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/reservations/:id"
              element={
                <ProtectedRoute>
                  <ReservationDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <ResourcesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/resources"
              element={
                <ProtectedRoute>
                  <ResourcesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <ProtectedRoute>
                  <AchievementsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/achievements"
              element={
                <ProtectedRoute>
                  <AchievementsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/opportunities"
              element={
                <ProtectedRoute>
                  <OpportunitiesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/opportunities"
              element={
                <ProtectedRoute>
                  <OpportunitiesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth-status" element={<AuthStatusPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Legal & Help Routes */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/help" element={<FaqPage />} />

            {/* Hidden Footer Routes */}
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/corporate-partners" element={<CorporatePartnersPage />} />
            <Route path="/prospectus" element={<ProspectusPage />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
