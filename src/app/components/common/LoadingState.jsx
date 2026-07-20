import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.12),transparent_30%),linear-gradient(135deg,#140726_0%,#1e1038_100%)] text-white">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center rounded-[24px] border border-white/15 bg-white/10 px-8 py-10 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54A]/15 text-[#FFD54A]">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="mt-4 text-lg font-semibold">{message}</p>
        <div className="mt-4 h-2 w-36 overflow-hidden rounded-full bg-white/10">
          <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-1/3 rounded-full bg-[#FFD54A]" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
