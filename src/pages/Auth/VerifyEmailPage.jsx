import { Link, useLocation, useNavigate } from 'react-router-dom';
import { applyActionCode, sendEmailVerification } from 'firebase/auth';
import { CheckCircle2, Mail, MailCheck, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../../firebase/firebase';
import { getEmailVerificationActionSettings } from '../../services/authService';

const particles = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 37) % 84)}%`,
  top: `${10 + ((index * 53) % 78)}%`,
  delay: index * 0.12,
}));

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [sending, setSending] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const email = useMemo(
    () => location.state?.email || auth.currentUser?.email || '',
    [location.state?.email],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') !== 'verifyEmail' || !params.get('oobCode')) return;

    let active = true;
    // Verification is an external Firebase action; this state reflects its progress.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProcessing(true);
    applyActionCode(auth, params.get('oobCode'))
      .then(() => {
        if (active) {
          setVerified(true);
          setError('');
          window.history.replaceState({}, document.title, '/verify-email');
        }
      })
      .catch((actionError) => {
        if (active) setError(actionError.code === 'auth/expired-action-code'
          ? 'This verification link has expired. Request a new one below.'
          : 'This verification link is invalid or has already been used.');
      })
      .finally(() => active && setProcessing(false));
    return () => { active = false; };
  }, [location.search]);

  const handleResend = async () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    try {
      setSending(true);
      await sendEmailVerification(auth.currentUser, getEmailVerificationActionSettings());
      toast.success('A fresh verification email is on its way.');
    } catch (resendError) {
      toast.error(resendError.code === 'auth/too-many-requests'
        ? 'Please wait before requesting another email.'
        : 'Unable to resend verification email.');
    } finally {
      setSending(false);
    }
  };

  if (verified) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(125deg,_#2B0A5A_0%,_#140726_55%,_#0C031C_100%)] px-6 py-16">
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#FFD54A]/20 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[130px]" />
        {particles.map((particle) => <span key={particle.id} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#FFD54A]/60" style={{ left: particle.left, top: particle.top }} />)}
        <motion.section initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="relative w-full max-w-xl rounded-[32px] border border-white/15 bg-white/10 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-12">
          <img src="/images/logo.png" alt="NIVOX" className="mx-auto h-16 w-auto" />
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.2 }} className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30">
            <CheckCircle2 className="h-11 w-11" />
          </motion.div>
          <h1 className="mt-7 text-3xl font-black text-white sm:text-4xl">Email Verified Successfully</h1>
          <p className="mt-3 text-lg font-semibold text-[#FFE7A3]">Welcome to NIVOX.</p>
          <p className="mt-2 text-sm leading-7 text-white/70">Your account is now verified. You can book innovation spaces, access digital tickets, join events, download resources, and build your future.</p>
          <Link to="/dashboard" className="mt-8 block rounded-xl bg-[#FFD54A] py-3.5 font-bold text-[#140726] transition hover:bg-[#FFE07A]">Continue to Dashboard</Link>
          <Link to="/" className="mt-4 block font-semibold text-white/75 hover:text-[#FFD54A]">Back to Home</Link>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(125deg,_#2B0A5A_0%,_#140726_55%,_#0C031C_100%)] px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#FFD54A]/15 blur-[120px]" />
      <motion.section initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-xl rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-12">
        <img src="/images/logo.png" alt="NIVOX" className="mx-auto h-16 w-auto" />
        <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54A]/15 text-[#FFD54A]"><MailCheck className="h-9 w-9" /></div>
        <h1 className="mt-7 text-center text-3xl font-black text-white sm:text-4xl">🎉 Welcome to NIVOX</h1>
        <p className="mt-3 text-center text-lg font-semibold text-[#FFE7A3]">Your account has been created successfully.</p>
        <p className="mt-3 text-center text-sm leading-7 text-white/70">One final step remains before you can access all NIVOX services.</p>
        {email && <div className="mt-7 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-center text-sm text-emerald-200"><Mail className="mx-auto mb-2 h-5 w-5" /><span className="block text-white/70">Verification email sent to:</span><strong className="break-all text-white">{email}</strong></div>}
        {processing && <p className="mt-5 text-center text-sm text-[#FFE7A3]">Confirming your verification link…</p>}
        {error && <p className="mt-5 rounded-xl border border-rose-300/20 bg-rose-300/10 p-3 text-center text-sm text-rose-200">{error}</p>}
        <a href="mailto:" className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#FFD54A] py-3.5 font-bold text-[#140726] transition hover:bg-[#FFE07A]"><Mail className="h-4 w-4" /> Open Email App</a>
        <button type="button" onClick={handleResend} disabled={sending} className="mt-3 w-full rounded-xl border border-[#FFD54A]/70 py-3.5 font-bold text-[#FFD54A] transition hover:bg-[#FFD54A]/10 disabled:opacity-60">{sending ? 'Sending…' : 'Resend Verification Email'}</button>
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-white/55"><Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" /> Didn’t receive it? Check your Spam folder or resend another email.</p>
        <Link to="/login" className="mt-7 block text-center font-semibold text-white/75 hover:text-[#FFD54A]">← Back to Login</Link>
      </motion.section>
    </main>
  );
};

export default VerifyEmailPage;
