import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const AnimatedGrid = ({ className = '' }) => {
  return <div className={twMerge('absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:40px_40px]', className)} />;
};

export const GradientBackground = ({ className = '' }) => {
  return <div className={twMerge('absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_24%),linear-gradient(135deg,#160329_0%,#2b0a5a_45%,#0f0220_100%)]', className)} />;
};

export const FloatingBlobs = ({ className = '' }) => {
  return (
    <div className={twMerge('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <motion.div animate={{ y: [0, -18, 0], x: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute left-[-5%] top-8 h-48 w-48 rounded-full bg-[#FFD54A]/20 blur-[120px]" />
      <motion.div animate={{ y: [0, 16, 0], x: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-[-10%] right-[-8%] h-64 w-64 rounded-full bg-[#7B35FF]/30 blur-[140px]" />
    </div>
  );
};

export const ParticleLayer = ({ count = 6, className = '' }) => {
  const particles = Array.from({ length: count }, (_, index) => ({ left: `${10 + index * 12}%`, top: `${12 + (index % 3) * 20}%` }));

  return (
    <div className={twMerge('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full bg-white/80"
          style={{ left: particle.left, top: particle.top, width: `${6 + (index % 3) * 2}px`, height: `${6 + (index % 3) * 2}px` }}
        />
      ))}
    </div>
  );
};

export const GlowEffect = ({ className = '' }) => <div className={twMerge('absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]', className)} />;
