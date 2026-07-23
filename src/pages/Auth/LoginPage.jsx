import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

import { auth } from "../../firebase/firebase";

import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        try {
          await sendEmailVerification(userCredential.user);
        } catch {
          toast.error("We couldn't send a verification email. Please try again.");
        }
        navigate("/verify-email");
        return;
      }

      sessionStorage.setItem('showWelcomeOverlay', 'true');
      navigate("/dashboard");

    } catch (error) {
      const messages = {
        "auth/invalid-credential": "The email or password you entered is incorrect.",
        "auth/too-many-requests": "Too many attempts. Please wait and try again.",
        "auth/user-disabled": "This account has been disabled. Please contact support.",
      };
      toast.error(messages[error.code] || "Unable to sign in. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0a5a] via-[#16052f] to-black px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white">
          Student Login
        </h1>

        <p className="mt-2 text-gray-300">
          Welcome back to NIVOX.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
          />

          <div className="relative">

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-12 text-white placeholder:text-gray-400 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFD54A]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2b0a5a] py-3 font-semibold text-white hover:bg-[#3d147a]"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-white hover:text-[#FFD54A]"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#FFD54A]"
          >
            Sign Up
          </Link>
        </p>

      </motion.div>
    </main>
  );
};

export default LoginPage;
