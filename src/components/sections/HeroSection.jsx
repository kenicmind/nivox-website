import { Link } from 'react-router-dom';
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
    title: "Study Zone",
    icon: Library,
    description: "Quiet learning spaces with high-speed internet.",
  },
  {
    title: "Tech Lab",
    icon: Laptop2,
    description: "Modern computers for coding, design, and research.",
  },
  {
    title: "Creator Studio",
    icon: Headphones,
    description: "Professional space for podcasts, videos, and content creation.",
  },
  {
    title: "Startup Corner",
    icon: Users,
    description: "Collaborate, build startups, and launch innovative ideas.",
  },
  {
    title: "Innovation Hub",
    icon: Network,
    description: "Workshops, hackathons, networking, and innovation events.",
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

          <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building the{" "}
            <span className="text-[#FFD54A]">Future</span>{" "}
            Student Hub
          </h1>

          <div className="mt-6 flex flex-wrap gap-3 text-lg font-semibold uppercase tracking-[0.3em] text-white/85 sm:text-xl">
            <span>Study.</span>
            <span>Create.</span>
            <span>Innovate.</span>
            <span>Connect.</span>
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/75 sm:text-xl">
            NIVOX is a modern digital hub where students gain access to premium internet,
            collaborative spaces, computers, learning resources, and creative studios designed
            for tomorrow’s innovators.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-[#FFD54A] px-6 py-3.5 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(255,213,74,0.25)] transition"
              >
                Join the Waitlist
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition"
            >
              Explore NIVOX
            </motion.button>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-black text-[#FFD54A]">22K+</h3>
              <p className="mt-2 text-sm text-white/70">
                Students to Empower
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-black text-[#FFD54A]">24/7</h3>
              <p className="mt-2 text-sm text-white/70">
                Power & Internet
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-black text-[#FFD54A]">100%</h3>
              <p className="mt-2 text-sm text-white/70">
                Innovation Focused
              </p>
            </motion.div>
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
                    whileHover={{
                      y: -10,
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(255,213,74,0.25)",
                    }}
                    className="rounded-[20px] border border-white/12 bg-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#FFD54A] shadow-lg">
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
