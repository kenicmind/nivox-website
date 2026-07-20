import { motion } from 'framer-motion';

const AnimatedDivider = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ scaleX: 0.6, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={['h-px w-full bg-gradient-to-r from-transparent via-[#FFD54A]/70 to-transparent', className].join(' ')}
    />
  );
};

export default AnimatedDivider;
