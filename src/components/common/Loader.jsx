import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

const PARTICLES = [
  { left: '12%', top: '18%', size: 3, delay: 0 },
  { left: '24%', top: '72%', size: 2, delay: 1.2 },
  { left: '78%', top: '22%', size: 2, delay: 0.6 },
  { left: '86%', top: '68%', size: 3, delay: 1.8 },
  { left: '62%', top: '12%', size: 2, delay: 2.4 },
  { left: '38%', top: '86%', size: 2, delay: 1.5 },
  { left: '92%', top: '42%', size: 2, delay: 0.9 },
  { left: '7%', top: '48%', size: 2, delay: 2.1 },
];

const Loader = ({
  title = 'NIVOX',
  subtitle = 'Shaping Tomorrow, Today.',
  logoSrc = '/images/logo.png',
  className = '',
  onComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!onComplete) return undefined;

    const timeout = window.setTimeout(onComplete, prefersReducedMotion ? 450 : 1150);
    return () => window.clearTimeout(timeout);
  }, [onComplete, prefersReducedMotion]);

  return (
    <motion.main
      aria-label="Loading NIVOX"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.12 : 0.35, ease: 'easeOut' }}
      className={`fixed inset-0 z-[100] isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#140726] px-6 text-white ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,213,74,0.14),transparent_25%),radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.2),transparent_32%),linear-gradient(135deg,#140726_0%,#1e1038_52%,#0c031c_100%)]"
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD54A]/10 blur-[90px] sm:h-72 sm:w-72"
        animate={prefersReducedMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.45, 0.75, 0.45] }}
        transition={prefersReducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {!prefersReducedMotion &&
        PARTICLES.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            aria-hidden="true"
            className="absolute rounded-full bg-[#FFE7A3]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 0.7, 0], y: [8, -12, 8] }}
            transition={{
              duration: 3.8 + (index % 3) * 0.5,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0.12 } : { duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 flex w-full max-w-sm flex-col items-center text-center"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-full border border-[#FFD54A]/20 shadow-[0_0_50px_rgba(255,213,74,0.22)] sm:-inset-6"
          />
          <img
            src={logoSrc}
            alt="NIVOX logo"
            className="relative h-20 w-20 rounded-full border-2 border-[#FFD54A]/70 object-cover shadow-[0_0_35px_rgba(255,213,74,0.28)] sm:h-24 sm:w-24"
          />
        </motion.div>

        <h1 className="mt-9 text-3xl font-black tracking-[0.3em] text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-[#FFE7A3] sm:text-sm">
          {subtitle}
        </p>

        <div
          role="progressbar"
          aria-label="Loading application"
          className="mt-9 h-px w-48 overflow-hidden rounded-full bg-white/15 sm:w-64"
        >
          {prefersReducedMotion ? (
            <div className="h-full w-1/2 rounded-full bg-[#FFD54A]" />
          ) : (
            <motion.div
              className="h-full w-2/5 rounded-full bg-gradient-to-r from-transparent via-[#FFD54A] to-transparent shadow-[0_0_16px_rgba(255,213,74,0.85)]"
              animate={{ x: ['-120%', '280%'] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Loader;
