import { motion } from 'framer-motion';

const Loader = ({
  title = 'NIVOX',
  subtitle = 'Shaping Tomorrow, Today.',
  logoSrc = '/images/logo.png',
  backgroundColor = '#140726',
  accentColor = '#d4af37',
  glowColor = 'rgba(167, 139, 250, 0.35)',
  className = '',
}) => {
  return (
    <div
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06), transparent 22%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.05), transparent 30%)',
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(255,255,255,0.02), rgba(212,175,55,0.06), rgba(255,255,255,0.02))',
            backgroundSize: '200% 200%',
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={logoSrc}
            alt="NIVOX logo"
            className="mb-5 h-24 w-24 rounded-full object-contain shadow-[0_0_45px_8px_rgba(167,139,250,0.28)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="text-4xl font-black tracking-[0.35em] text-white sm:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="mt-3 text-sm font-medium uppercase tracking-[0.35em] text-white/80 sm:text-base"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: '0%' }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
          className="mt-8 h-[1px] w-48 overflow-hidden rounded-full bg-white/15 sm:w-64"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 18px ${glowColor}` }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
