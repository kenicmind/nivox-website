import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const Modal = ({ open, onClose, children, className = '' }) => {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="presentation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.18 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose?.();
        }}
        className="fixed inset-0 z-50 flex touch-pan-y items-start justify-center overflow-y-auto bg-black/55 px-4 py-4 sm:items-center sm:py-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="NIVOX dialog"
          className={twMerge('w-full max-w-lg rounded-[28px] border border-white/15 bg-[#140726]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl', className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
