import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Headphones,
  Laptop2,
  Library,
  Network,
  Sparkles,
  Users,
} from 'lucide-react';

const features = [
  {
    title: 'High-Speed Internet',
    icon: Network,
    description: 'Ultra-fast connectivity for focus and flow.',
  },
  {
    title: 'Smart Workstations',
    icon: Laptop2,
    description: 'Premium setups for deep work and creation.',
  },
  {
    title: 'Content Studio',
    icon: Headphones,
    description: 'A polished space for recording and production.',
  },
  {
    title: 'Collaboration Space',
    icon: Users,
    description: 'Designed for teamwork and innovation.',
  },
  {
    title: 'Learning Zone',
    icon: Library,
    description: 'Curated resources to accelerate growth.',
  },
];

const HeroSection = () => {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,213,74,0.16),_transparent_26%),linear-gradient(125deg,_#2B0A5A_0%,_#140726_55%,_#0C031C_100%)] px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[-8%] top-[-8%] h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-8%] h-80 w-80 rounded-full bg-[#FFD54A]/15 blur-[140px]" />
      <div className="absolute right-[10%] top-[20%] h-28 w-28 rounded-full border border-white/10 bg-white/10 blur-3xl" />
      <div className="absolute bottom-[15%] left-[12%] h-24 w-24 rounded-full border border-[#FFD54A]/20 bg-[#FFD54A]/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#FFD54A]" />
            Premium student innovation hub
          </div>

          <h1 className="text-4xl font-black leading-[0.9] tracking-[-0.03em] text-white sm:text-5xl lg:text-7xl">
            Building the
            <span className="block text-[#FFD54A]">Future</span>
            Student Hub
          </h1>

          <div className="mt-6 flex flex-wrap gap-3 text-lg font-semibold uppercase tracking-[0.3em] text-white/85 sm:text-xl">
            <span>Study.</span>
            <span>Create.</span>
            <span>Innovate.</span>
            <span>Connect.</span>
          </div>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/75 sm:text-xl">
            NIVOX is a modern digital hub where students gain access to premium internet,
            collaborative spaces, computers, learning resources, and creative studios designed
            for tomorrow’s innovators.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-[#FFD54A] px-6 py-3.5 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(255,213,74,0.25)] transition"
            >
              Join the Waitlist
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition"
            >
              Explore NIVOX
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-white/10 blur-3xl" />
          <div className="relative rounded-[32px] border border-white/15 bg-white/10 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.16)]">
              <div>
                <p className="text-sm font-medium text-white/80">NIVOX Studio</p>
                <p className="text-xs text-white/50">Student Experience Dashboard</p>
              </div>
              <div className="rounded-full bg-[#FFD54A]/20 p-2 text-[#FFD54A]">
                <Cpu className="h-5 w-5" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.07, ease: 'easeOut' }}
                    whileHover={{ y: -6, scale: 1.02, rotate: -1 }}
                    className="rounded-[20px] border border-white/12 bg-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/65">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
