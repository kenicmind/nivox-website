import { AnimatePresence, motion } from 'framer-motion';

const Toast = ({ open, message }) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed bottom-6 right-6 z-50 rounded-full border border-white/15 bg-[#140726]/90 px-4 py-3 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Toast;
