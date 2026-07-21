import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf8ff] px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-[#2b0a5a]">
          Student Login
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back to NIVOX.
        </p>

        <form className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-gray-300 p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-gray-300 p-3"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#FFD54A] py-3 font-semibold text-[#2b0a5a]"
          >
            Login
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default LoginPage;