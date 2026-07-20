import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Drawer = ({ open, onClose, children, className = '' }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
        <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 180, damping: 24 }} className={twMerge('absolute right-0 h-full w-full max-w-sm border-l border-white/15 bg-[#140726] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]', className)} onClick={(event) => event.stopPropagation()}>
          {children}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
};

export default Drawer;
