import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf8ff] px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
          Join NIVOX
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#2b0a5a]">
          Create Your Account
        </h1>

        <p className="mt-3 text-gray-600">
          Register once and start booking your sessions at NIVOX.
        </p>

        <form className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#FFD54A]"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#FFD54A]"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#FFD54A]"
          />

          <input
            type="text"
            placeholder="University"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#FFD54A]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#FFD54A]"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FFD54A] py-4 font-semibold text-[#2b0a5a] transition hover:brightness-105"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#2b0a5a]"
          >
            Sign In
          </Link>
        </p>

      </motion.div>
    </main>
  );
};

export default RegisterPage;