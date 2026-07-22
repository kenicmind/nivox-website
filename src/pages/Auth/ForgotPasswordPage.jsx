import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
  e.preventDefault();

  if (!email) {
    navigate("/auth-status", {
      state: {
        type: "warning",
        title: "Email Required",
        message: "Please enter your email address.",
        primaryText: "Try Again",
        primaryLink: "/forgot-password",
      },
    });

    return;
  }

  try {
    setLoading(true);

    await sendPasswordResetEmail(auth, email);

    navigate("/auth-status", {
      state: {
        type: "success",
        title: "Reset Link Sent",
        message:
          "We've sent a password reset link to your email. Please check your inbox (and Spam folder if necessary).",
        primaryText: "Back to Login",
        primaryLink: "/login",
      },
    });

  } catch (error) {

    navigate("/auth-status", {
      state: {
        type: "error",
        title: "Reset Failed",
        message: error.message,
        primaryText: "Try Again",
        primaryLink: "/forgot-password",
      },
    });

  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-[linear-gradient(125deg,_#2B0A5A_0%,_#140726_55%,_#0C031C_100%)] px-6">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
      >

        <div className="flex justify-center">

          <div className="rounded-full bg-[#FFD54A]/20 p-4">

            <Mail
              size={45}
              className="text-[#FFD54A]"
            />

          </div>

        </div>

        <h1 className="mt-6 text-center text-3xl font-black text-white">
          Forgot Password?
        </h1>

        <p className="mt-3 text-center text-white/70 leading-7">
          Enter the email address associated with your NIVOX account and we'll send you a password reset link.
        </p>

        <form onSubmit={handleResetPassword} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 py-3 px-4 text-white placeholder:text-white/50 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#FFD54A] py-3.5 font-bold text-[#140726] transition duration-300 hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(255,213,74,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
            >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <p className="mt-6 text-center text-white/70">

          Remember your password?

          <Link
            to="/login"
            className="ml-2 font-bold text-[#FFD54A]"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </main>
  );
};

export default ForgotPasswordPage;