import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Camera,
  Cpu,
  Lightbulb,
  Sparkles,
  Users,
} from 'lucide-react';

const rooms = [
  {
    id: 1,
    title: 'Learning Zone',
    icon: BookOpen,
    accent: 'from-[#FFD54A] to-[#ffdf7a]',
    description:
      'A quiet environment for focused study, research and online learning.',
    features: ['High-speed Wi-Fi', 'Comfortable seating', 'Charging ports', 'Digital resources'],
    position: 'left-[8%] top-[8%]',
    size: 'w-36 h-24',
  },
  {
    id: 2,
    title: 'Computer Lab',
    icon: Cpu,
    accent: 'from-[#7c3aed] to-[#a78bfa]',
    description:
      'High-performance workstations for design, development, programming and productivity.',
    features: ['Modern PCs', 'Design software', 'Printing support', 'Fast internet'],
    position: 'left-[38%] top-[6%]',
    size: 'w-40 h-24',
  },
  {
    id: 3,
    title: 'Creator Studio',
    icon: Camera,
    accent: 'from-[#2dd4bf] to-[#6ee7b7]',
    description:
      'Produce videos, podcasts, livestreams and social media content.',
    features: ['Microphones', 'Lighting', 'Cameras', 'Editing setup'],
    position: 'left-[12%] top-[48%]',
    size: 'w-36 h-24',
  },
  {
    id: 4,
    title: 'Collaboration Lounge',
    icon: Users,
    accent: 'from-[#fb923c] to-[#fdba74]',
    description:
      'Meet teammates, brainstorm ideas and build projects together.',
    features: ['Meeting tables', 'Whiteboards', 'Projector', 'Relaxed seating'],
    position: 'left-[40%] top-[46%]',
    size: 'w-40 h-24',
  },
  {
    id: 5,
    title: 'Innovation Space',
    icon: Lightbulb,
    accent: 'from-[#f43f5e] to-[#fb7185]',
    description:
      'Where ideas become startups through mentorship, networking and creativity.',
    features: ['Startup sessions', 'Hackathons', 'Events', 'Mentorship'],
    position: 'left-[68%] top-[28%]',
    size: 'w-36 h-24',
  },
];

const HubExperienceSection = () => {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  return (
    <section className="relative overflow-hidden bg-[#f7f6fb] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(43,10,90,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,213,74,0.16),transparent_35%)]" />
      <div className="absolute left-[-5%] top-[10%] h-32 w-32 rounded-full bg-[#2B0A5A]/10 blur-3xl" />
      <div className="absolute bottom-[8%] right-[-3%] h-40 w-40 rounded-full bg-[#FFD54A]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2B0A5A]/10 bg-white px-4 py-2 text-sm font-medium text-[#2B0A5A] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#FFD54A]" />
            Interactive Hub Experience
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#2B0A5A] sm:text-4xl lg:text-5xl">
            Explore the NIVOX Hub
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Discover the spaces designed to help students learn, collaborate, create and innovate.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[32px] border border-[#2B0A5A]/10 bg-gradient-to-br from-[#2B0A5A] via-[#3b0d6f] to-[#140726] p-6 shadow-[0_25px_80px_rgba(43,10,90,0.18)] sm:p-8"
          >
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute left-[10%] top-[18%] h-24 w-24 rounded-full bg-[#FFD54A]/15 blur-3xl" />
            <div className="absolute bottom-[10%] right-[8%] h-28 w-28 rounded-full bg-fuchsia-400/20 blur-3xl" />

            <div className="relative mx-auto flex min-h-[420px] max-w-[560px] items-center justify-center">
              <div className="absolute inset-0 rounded-[32px] border border-white/10" />
              <div className="absolute left-[8%] top-[12%] h-[74%] w-[84%] rounded-[26px] border border-white/10 bg-white/10 backdrop-blur-sm" />

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 420" fill="none" aria-hidden="true">
                <path d="M132 120 C 190 90, 240 90, 290 125" stroke="#FFD54A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
                <path d="M320 120 C 370 95, 420 125, 450 165" stroke="#FFD54A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
                <path d="M148 240 C 208 220, 250 228, 290 252" stroke="#FFD54A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />
                <path d="M320 250 C 370 228, 420 250, 450 220" stroke="#FFD54A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
              </svg>

              {rooms.map((room) => {
                const Icon = room.icon;
                const isActive = selectedRoom.id === room.id;

                return (
                  <motion.button
                    key={room.id}
                    whileHover={{ scale: 1.04, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedRoom(room)}
                    className={`absolute ${room.position} ${room.size} rounded-[24px] border border-white/15 bg-white/10 p-3 text-left shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-md transition ${isActive ? 'ring-2 ring-[#FFD54A]/80' : ''}`}
                  >
                    <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br ${room.accent} text-[#140726]`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-white">{room.title}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="flex items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoom.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-[32px] border border-[#2B0A5A]/10 bg-white p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] sm:p-10"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedRoom.accent} text-[#140726]`}>
                    {(() => {
                      const Icon = selectedRoom.icon;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2B0A5A]">{selectedRoom.title}</h3>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2B0A5A]/60">
                      NIVOX Experience
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-8 text-gray-600">{selectedRoom.description}</p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {selectedRoom.features.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-[#2B0A5A]/10 bg-[#f8f7fb] px-4 py-3 text-sm font-medium text-[#2B0A5A]">
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HubExperienceSection;
