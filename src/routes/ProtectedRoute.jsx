import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

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