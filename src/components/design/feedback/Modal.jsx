import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Modal = ({ open, onClose, children, className = '' }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 flex touch-pan-y items-start justify-center overflow-y-auto bg-black/55 px-4 py-4 sm:items-center sm:py-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={twMerge('w-full max-w-lg rounded-[28px] border border-white/15 bg-[#140726]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl', className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
