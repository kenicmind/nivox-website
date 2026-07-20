import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Camera,
  Cpu,
  Lightbulb,
  Mic,
  Monitor,
  Network,
  Rocket,
  Sparkles,
  Sunrise,
  Users,
  Zap,
} from 'lucide-react';

const scenes = [
  {
    id: 1,
    eyebrow: 'Step into the future',
    title: 'Your Journey Starts Here',
    description:
      'A bright new chapter begins the moment you step inside NIVOX, where learning and innovation feel effortless.',
    accent: 'from-[#ffd54a]/25 via-[#ffbf1f]/15 to-transparent',
    icon: Sunrise,
    visual: 'sunrise',
  },
  {
    id: 2,
    eyebrow: 'Built for focus',
    title: 'A Space Built for Learning',
    description:
      'Every detail is designed to help students study deeply, stay connected, and work comfortably all day.',
    accent: 'from-[#7c3aed]/20 via-[#2b0a5a]/20 to-transparent',
    icon: BookOpen,
    visual: 'learning',
  },
  {
    id: 3,
    eyebrow: 'Create with power',
    title: 'Build Amazing Things',
    description:
      'Modern workstations bring together coding, design, research, and productivity in one fluid experience.',
    accent: 'from-[#2dd4bf]/20 via-[#0f766e]/10 to-transparent',
    icon: Monitor,
    visual: 'workstations',
  },
  {
    id: 4,
    eyebrow: 'Studio energy',
    title: 'Create Without Limits',
    description:
      'Record, edit, stream, and publish with tools and spaces made for creators from day one.',
    accent: 'from-[#fb923c]/20 via-[#f59e0b]/10 to-transparent',
    icon: Mic,
    visual: 'studio',
  },
  {
    id: 5,
    eyebrow: 'Future in motion',
    title: 'Shape Tomorrow, Today.',
    description:
      'Students collaborate, mentor, network, and transform ideas into real ventures inside the NIVOX innovation hub.',
    accent: 'from-[#f43f5e]/20 via-[#7c3aed]/15 to-transparent',
    icon: Rocket,
    visual: 'innovation',
  },
];

const ExperienceNivoxSection = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('experience-nivox');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.2;
      const progress = Math.min(Math.max((start - rect.top) / (window.innerHeight * 0.8), 0), 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const section = document.getElementById('experience-nivox');
    if (!section) return;

    const childCount = scenes.length;
    const sectionTop = section.offsetTop;
    const height = section.offsetHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY - sectionTop + window.innerHeight * 0.2;
      const raw = scrollY / (height - window.innerHeight * 0.4);
      const nextScene = Math.min(childCount - 1, Math.max(0, Math.floor(raw * childCount)));
      setActiveScene(nextScene);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSceneData = scenes[activeScene];
  const sceneGlow = useMemo(() => {
    const gradients = {
      sunrise: 'from-[#ffd54a]/30 via-[#ff7a00]/20 to-transparent',
      learning: 'from-[#a78bfa]/30 via-[#2b0a5a]/20 to-transparent',
      workstations: 'from-[#2dd4bf]/25 via-[#0f766e]/15 to-transparent',
      studio: 'from-[#fb923c]/25 via-[#f59e0b]/15 to-transparent',
      innovation: 'from-[#f43f5e]/25 via-[#7c3aed]/15 to-transparent',
    };
    return gradients[activeSceneData.visual] || gradients.sunrise;
  }, [activeSceneData.visual]);

  return (
    <section id="experience-nivox" className="relative overflow-hidden bg-[#0a0315] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.25),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[-6%] top-[12%] h-48 w-48 rounded-full bg-[#ffd54a]/15 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-8%] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[140px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSceneData.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#ffd54a]" />
                Experience NIVOX
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-4xl font-black leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl lg:text-7xl"
              >
                {activeSceneData.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="mt-6 max-w-xl text-lg leading-8 text-white/75 sm:text-xl"
              >
                {activeSceneData.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(255,213,74,0.25)]"
                >
                  Join the Waitlist
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative"
            >
              <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${sceneGlow} blur-3xl`} />
              <div className="relative rounded-[32px] border border-white/15 bg-white/10 p-5 shadow-[0_25px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
                {activeSceneData.visual === 'sunrise' && (
                  <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#ffd54a]/25 via-[#ff9f1c]/20 to-[#2b0a5a]/40 p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.25),transparent_22%)]" />
                    <div className="absolute bottom-[-20px] left-[8%] h-36 w-36 rounded-full bg-[#140726]/80 blur-[1px]" />
                    <div className="absolute bottom-[-6px] left-[30%] h-28 w-36 rounded-[50%] bg-[#2b0a5a]/70" />
                    <div className="absolute bottom-[48px] right-[14%] h-24 w-24 rounded-full border border-white/15 bg-white/10 backdrop-blur-md" />
                    <div className="absolute left-[10%] top-[14%] h-3 w-3 rounded-full bg-[#ffd54a] shadow-[0_0_20px_#ffd54a]" />
                    <div className="absolute left-[22%] top-[24%] h-2.5 w-2.5 rounded-full bg-white/70" />
                    <div className="absolute bottom-[18%] left-[18%] h-20 w-20 rounded-full border-[10px] border-white/20" />
                    <div className="absolute bottom-[18%] left-[16%] h-20 w-20 rounded-full border-[10px] border-white/20" />
                    <div className="absolute bottom-[12%] left-[35%] h-28 w-28 rounded-full border-[10px] border-white/20" />
                    <div className="absolute bottom-[18%] right-[12%] h-20 w-20 rounded-full border-[10px] border-white/20" />
                  </div>
                )}

                {activeSceneData.visual === 'learning' && (
                  <div className="grid min-h-[420px] gap-4 rounded-[24px] border border-white/10 bg-gradient-to-br from-[#2b0a5a]/45 to-[#140726]/60 p-6 lg:grid-cols-2">
                    {[
                      { title: 'High-Speed Internet', icon: Network },
                      { title: 'Comfortable Workspace', icon: BookOpen },
                      { title: 'Reliable Power', icon: Zap },
                      { title: 'Charging Stations', icon: Cpu },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.08 * index }}
                          className="rounded-[20px] border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {activeSceneData.visual === 'workstations' && (
                  <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0f172a]/70 to-[#111827]/80 p-6">
                    <div className="absolute right-[8%] top-[10%] h-24 w-24 rounded-full bg-[#2dd4bf]/15 blur-3xl" />
                    <div className="grid gap-4 md:grid-cols-2">
                      {[{ label: 'Coding', icon: Cpu }, { label: 'Design', icon: Monitor }, { label: 'Research', icon: BookOpen }, { label: 'Productivity', icon: Sparkles }].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 * index }}
                            className="rounded-[20px] border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                          >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2dd4bf]/15 text-[#2dd4bf]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{item.label}</h3>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeSceneData.visual === 'studio' && (
                  <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#7c2d12]/45 to-[#1f2937]/70 p-6">
                    <div className="absolute left-[12%] top-[14%] h-24 w-24 rounded-full border border-white/10 bg-white/10 backdrop-blur-md" />
                    <div className="absolute right-[12%] top-[16%] h-20 w-20 rounded-full border border-white/10 bg-white/10 backdrop-blur-md" />
                    <div className="absolute bottom-[15%] left-[18%] h-28 w-28 rounded-full border border-[#ffd54a]/20 bg-[#ffd54a]/10" />
                    <div className="absolute bottom-[18%] right-[16%] h-24 w-24 rounded-full border border-white/10 bg-white/10 backdrop-blur-md" />
                    <div className="absolute inset-x-0 bottom-8 mx-auto flex w-3/4 items-center justify-center gap-4 rounded-[20px] border border-white/10 bg-[#140726]/50 p-4 backdrop-blur-md">
                      <Mic className="h-5 w-5 text-[#ffd54a]" />
                      <Camera className="h-5 w-5 text-[#ffd54a]" />
                      <Cpu className="h-5 w-5 text-[#ffd54a]" />
                    </div>
                  </div>
                )}

                {activeSceneData.visual === 'innovation' && (
                  <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#f43f5e]/20 to-[#2b0a5a]/60 p-6">
                    <div className="absolute left-[10%] top-[18%] h-24 w-24 rounded-full border border-white/10 bg-white/10 backdrop-blur-md" />
                    <div className="absolute right-[10%] top-[18%] h-24 w-24 rounded-full border border-white/10 bg-white/10 backdrop-blur-md" />
                    <div className="absolute bottom-[14%] left-[20%] h-20 w-20 rounded-full border border-[#ffd54a]/20 bg-[#ffd54a]/10" />
                    <div className="absolute bottom-[16%] right-[20%] h-20 w-20 rounded-full border border-white/10 bg-white/10 backdrop-blur-md" />
                    <div className="absolute inset-x-0 bottom-8 mx-auto flex w-3/4 items-center justify-center gap-4 rounded-[20px] border border-white/10 bg-[#140726]/55 p-4 backdrop-blur-md">
                      <Lightbulb className="h-5 w-5 text-[#ffd54a]" />
                      <Users className="h-5 w-5 text-[#ffd54a]" />
                      <Rocket className="h-5 w-5 text-[#ffd54a]" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/15 bg-gradient-to-r from-[#ffd54a]/20 via-white/10 to-[#ffd54a]/10 p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10"
        >
          <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Ready to Experience NIVOX?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Join the waitlist and be first to discover the future of student connection and creativity.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(255,213,74,0.25)]"
          >
            Join the Waitlist
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceNivoxSection;
