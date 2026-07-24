import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, authInitialized } = useAuth();

  if (!authInitialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#140726] text-sm text-[#FFE7A3]">
        Verifying administrative access…
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!user.emailVerified) return <Navigate to="/verify-email" replace />;
  if (!isAdmin) {
    return (
      <Navigate
        to="/auth-status"
        replace
        state={{
          type: 'error',
          title: 'Access Restricted',
          message: 'Your account does not have NIVOX administrator permissions.',
          primaryText: 'Return to Dashboard',
          primaryLink: '/dashboard',
        }}
      />
    );
  }

  return children;
};

export default AdminRoute;
