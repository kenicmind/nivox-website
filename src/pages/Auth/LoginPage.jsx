import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../../context/useAuth';
import { getEmailVerificationActionSettings } from '../../services/authService';
import { hasDevelopmentAdminRole } from '../../services/adminService';

const authMessages = {
  'auth/invalid-credential': 'The email or password you entered is incorrect.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/network-request-failed': 'Check your connection and try again.',
};

const LoginPage = ({ adminMode = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAdmin, authInitialized, signOutUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get('verified') === '1') {
      toast.success('Email verified. You can now sign in.');
    } else if (searchParams.get('reset') === 'complete') {
      toast.success('Password updated. Sign in with your new password.');
    }
    if (searchParams.has('verified') || searchParams.has('reset')) {
      navigate('/login', { replace: true });
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    if (!authInitialized || !user) return;
    if (adminMode && !isAdmin) {
      signOutUser().catch(() => undefined);
      return;
    }
    if (adminMode || !isAdmin) {
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
      return;
    }
    signOutUser().catch(() => undefined);
  }, [adminMode, authInitialized, isAdmin, navigate, signOutUser, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const token = await credential.user.getIdTokenResult(true);
      const signedInAsAdmin = token.claims.admin === true
        || await hasDevelopmentAdminRole(credential.user.uid);

      if (adminMode && !signedInAsAdmin) {
        await signOut(auth);
        toast.error('This account does not have administrator access.');
        return;
      }
      if (!adminMode && signedInAsAdmin) {
        await signOut(auth);
        toast.error('Administrator accounts must use the administrator sign-in page.');
        return;
      }

      if (!credential.user.emailVerified) {
        try {
          await sendEmailVerification(
            credential.user,
            getEmailVerificationActionSettings(),
          );
        } catch {
          toast.error("We couldn't send a verification email. You can retry from the verification page.");
        }
        navigate('/verify-email', { state: { email: credential.user.email } });
        return;
      }

      sessionStorage.setItem('showWelcomeOverlay', 'true');
      navigate(signedInAsAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
    } catch (error) {
      if (import.meta.env.DEV) console.error('NIVOX sign-in failed:', error);
      toast.error(authMessages[error.code] || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#2b0a5a] via-[#16052f] to-black px-4 py-12 sm:px-6">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        aria-labelledby="login-title"
      >
        <h1 id="login-title" className="text-3xl font-bold text-white">
          {adminMode ? 'Admin Login' : 'Student Login'}
        </h1>
        <p className="mt-2 text-gray-300">
          {adminMode
            ? 'Secure access for authorized NIVOX administrators.'
            : 'Welcome back to NIVOX.'}
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label htmlFor="login-email" className="sr-only">Email address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />
          </div>

          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
              aria-hidden="true"
            />
            <label htmlFor="login-password" className="sr-only">Password</label>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-12 text-white placeholder:text-gray-400 focus:border-[#FFD54A] focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded text-gray-400 outline-none transition hover:text-[#FFD54A] focus-visible:ring-2 focus-visible:ring-[#FFD54A]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2b0a5a] py-3 font-semibold text-white transition hover:bg-[#3d147a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54A] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-right">
          <Link to="/forgot-password" className="text-sm font-semibold text-white hover:text-[#FFD54A]">
            Forgot Password?
          </Link>
        </div>

        {!adminMode && (
          <p className="mt-6 text-center text-sm text-white">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-[#FFD54A]">Sign Up</Link>
          </p>
        )}
      </motion.section>
    </main>
  );
};

export default LoginPage;
