import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";

const VerifyEmailPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[linear-gradient(125deg,_#2B0A5A_0%,_#140726_55%,_#0C031C_100%)] px-6">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/10 p-10 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
      >

        <div className="flex justify-center">
          <div className="rounded-full bg-[#FFD54A]/20 p-5">
            <MailCheck
              size={60}
              className="text-[#FFD54A]"
            />
          </div>
        </div>

        <h1 className="mt-8 text-center text-4xl font-black text-white">
          Verify Your Email
        </h1>

        <p className="mt-5 text-center leading-8 text-white/70">
          We've sent a verification email to the address you registered with.
          <br /><br />
          Click the verification link in your inbox before signing in.
        </p>

        <div className="mt-10 space-y-4">

          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-[#FFD54A] py-3 text-center font-bold text-[#140726] hover:scale-[1.02] transition"
          >
            Open Gmail
          </a>

          <button
            className="w-full rounded-xl border border-[#FFD54A] py-3 font-bold text-[#FFD54A] hover:bg-[#FFD54A]/10 transition"
          >
            Resend Verification Email
          </button>

          <Link
            to="/login"
            className="block text-center font-semibold text-white hover:text-[#FFD54A]"
          >
            ← Back to Login
          </Link>

        </div>

      </motion.div>

    </main>
  );
};

export default VerifyEmailPage;