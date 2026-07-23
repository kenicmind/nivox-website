import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Camera,
  Cpu,
  Lightbulb,
  Mic,
  Monitor,
  Rocket,
  Sparkles,
  Sunrise,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

const scenes = [
  {
    id: 1,
    step: '01',
    eyebrow: 'Step into the future',
    title: 'Your Journey Starts Here',
    description:
      'A bright new chapter begins the moment you step inside NIVOX, where learning and innovation feel effortless.',
    badge: 'Step 01 • Arrival & Access',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Instant Student Access', 'Welcoming Hub Environment', 'High-Speed Wi-Fi & Lounge'],
    accent: 'from-[#ffd54a]/30 via-[#ffbf1f]/15 to-transparent',
    icon: Sunrise,
    visual: 'sunrise',
  },
  {
    id: 2,
    step: '02',
    eyebrow: 'Built for focus',
    title: 'A Space Built for Learning',
    description:
      'Every detail is designed to help students study deeply, stay connected, and work comfortably all day.',
    badge: 'Step 02 • Deep Focus & Study',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Ergonomic Workstations', 'Quiet Study Pods', 'Power Backup & Charging'],
    accent: 'from-[#7c3aed]/30 via-[#2b0a5a]/20 to-transparent',
    icon: BookOpen,
    visual: 'learning',
  },
  {
    id: 3,
    step: '03',
    eyebrow: 'Create with power',
    title: 'Build Amazing Things',
    description:
      'Modern workstations bring together coding, design, research, and productivity in one fluid experience.',
    badge: 'Step 03 • Building & Prototyping',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    highlights: ['High-Performance PCs', 'Coding & Design Software', 'Peer Collaboration'],
    accent: 'from-[#2dd4bf]/30 via-[#0f766e]/15 to-transparent',
    icon: Monitor,
    visual: 'workstations',
  },
  {
    id: 4,
    step: '04',
    eyebrow: 'Studio energy',
    title: 'Create Without Limits',
    description:
      'Record, edit, stream, and publish with tools and spaces made for creators from day one.',
    badge: 'Step 04 • Content Studio',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Studio Microphones & Mics', '4K Camera & Lighting', 'Audio/Video Editing'],
    accent: 'from-[#fb923c]/30 via-[#f59e0b]/15 to-transparent',
    icon: Mic,
    visual: 'studio',
  },
  {
    id: 5,
    step: '05',
    eyebrow: 'Future in motion',
    title: 'Shape Tomorrow, Today.',
    description:
      'Students collaborate, mentor, network, and transform ideas into real ventures inside the NIVOX innovation hub.',
    badge: 'Step 05 • Innovation & Startups',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Founder Mentorship', 'Pitch & Hackathon Days', 'Active Student Community'],
    accent: 'from-[#f43f5e]/30 via-[#7c3aed]/15 to-transparent',
    icon: Rocket,
    visual: 'innovation',
  },
];

const ExperienceNivoxSection = () => {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const section = document.getElementById('experience-nivox');
    if (!section) return;

    const childCount = scenes.length;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const height = section.offsetHeight;
      const scrollY = -rect.top + window.innerHeight * 0.3;
      const raw = scrollY / (height - window.innerHeight * 0.4);
      const nextScene = Math.min(childCount - 1, Math.max(0, Math.floor(raw * childCount)));
      setActiveScene(nextScene);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSceneData = scenes[activeScene];

  return (
    <section id="experience-nivox" className="relative overflow-hidden bg-[#0a0315] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.25),transparent_35%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px] pointer-events-none" />
      <div className="absolute left-[-6%] top-[12%] h-48 w-48 rounded-full bg-[#ffd54a]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-8%] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Step Navigation Dots */}
        <div className="mb-8 flex items-center justify-center gap-2 sm:gap-3">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(idx)}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                activeScene === idx
                  ? 'bg-[#ffd54a] text-[#140726] shadow-[0_0_15px_rgba(255,213,74,0.4)]'
                  : 'border border-white/15 bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{scene.step}</span>
              <span className="hidden md:inline">{scene.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSceneData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid items-center gap-10 lg:grid-cols-12"
          >
            {/* Left Storytelling Text Column */}
            <div className="lg:col-span-5 max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#ffd54a]" />
                {activeSceneData.eyebrow}
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {activeSceneData.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-4 text-base leading-7 text-white/80 sm:text-lg sm:leading-8"
              >
                {activeSceneData.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-6 space-y-2.5"
              >
                {activeSceneData.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-[#ffd54a] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link to="/membership">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-[#ffd54a] px-6 py-3 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(255,213,74,0.25)]"
                  >
                    Join the Waitlist
                  </motion.button>
                </Link>

                <button
                  onClick={() => setActiveScene((prev) => (prev + 1) % scenes.length)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffd54a] hover:underline"
                >
                  <span>Next Journey Stage</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>

            {/* Right Storytelling Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 relative"
            >
              <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${activeSceneData.accent} blur-3xl pointer-events-none`} />
              <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 p-3 sm:p-4 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-[24px]">
                  <img
                    src={activeSceneData.image}
                    alt={activeSceneData.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140726] via-[#140726]/30 to-transparent" />

                  {/* Stage Badge Chip */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-[#ffd54a] backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5 text-[#ffd54a]" />
                      {activeSceneData.badge}
                    </span>
                  </div>

                  {/* Floating Title Overlay at bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/15 bg-black/50 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffd54a] text-[#140726]">
                        {(() => {
                          const Icon = activeSceneData.icon;
                          return <Icon className="h-5 w-5" />;
                        })()}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{activeSceneData.title}</h4>
                        <p className="text-xs text-[#FFE7A3]">Stage {activeSceneData.step} of 05</p>
                      </div>
                    </div>
                  </div>
                </div>
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
          <Link to="/membership">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(255,213,74,0.25)]"
            >
              Join the Waitlist
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceNivoxSection;
