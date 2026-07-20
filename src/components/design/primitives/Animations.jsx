import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const FadeUp = ({ children, className = '', delay = 0, once = true, amount = 0.2 }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, amount }} transition={{ duration: 0.6, delay }} className={className}>
    {children}
  </motion.div>
);

export const FadeLeft = ({ children, className = '', delay = 0, once = true, amount = 0.2 }) => (
  <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once, amount }} transition={{ duration: 0.6, delay }} className={className}>
    {children}
  </motion.div>
);

export const FadeRight = ({ children, className = '', delay = 0, once = true, amount = 0.2 }) => (
  <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once, amount }} transition={{ duration: 0.6, delay }} className={className}>
    {children}
  </motion.div>
);

export const Scale = ({ children, className = '', delay = 0, once = true, amount = 0.2 }) => (
  <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once, amount }} transition={{ duration: 0.6, delay }} className={className}>
    {children}
  </motion.div>
);

export const Float = ({ children, className = '', duration = 4, amplitude = 8 }) => (
  <motion.div animate={{ y: [0, -amplitude, 0] }} transition={{ duration, repeat: Infinity, ease: 'easeInOut' }} className={className}>
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className = '', stagger = 0.06 }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }} className={className}>
    {children}
  </motion.div>
);

export const HoverGlow = ({ children, className = '' }) => (
  <motion.div whileHover={{ boxShadow: '0 0 0 1px rgba(255,213,74,0.18), 0 18px 45px rgba(255,213,74,0.18)', scale: 1.01 }} transition={{ duration: 0.2 }} className={className}>
    {children}
  </motion.div>
);

export const HoverLift = ({ children, className = '' }) => (
  <motion.div whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.25 }} className={className}>
    {children}
  </motion.div>
);
