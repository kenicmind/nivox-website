import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, authInitialized } = useAuth();

  if (!authInitialized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#140726] text-sm text-[#FFE7A3]">
        Loading your NIVOX session…
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but email not verified
  if (!user.emailVerified) {
    return (
      <Navigate
        to="/auth-status"
        replace
        state={{
          type: "warning",
          title: "Email Not Verified",
          message:
            "Please verify your email before accessing your dashboard.",
          primaryText: "Verify Email",
          primaryLink: "/verify-email",
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
