import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Camera,
  Cpu,
  Lightbulb,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';

const rooms = [
  {
    id: 1,
    title: 'Learning Zone',
    icon: BookOpen,
    accent: 'from-[#FFD54A] to-[#ffdf7a]',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description:
      'A quiet, modern environment for focused study, research and online learning.',
    features: ['High-speed Wi-Fi', 'Comfortable seating', 'Charging ports', 'Digital resources'],
  },
  {
    id: 2,
    title: 'Computer Lab',
    icon: Cpu,
    accent: 'from-[#7c3aed] to-[#a78bfa]',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description:
      'High-performance workstations for design, development, programming and digital skills.',
    features: ['Modern PCs', 'Design software', 'Printing support', 'Fast internet'],
  },
  {
    id: 3,
    title: 'Creator Studio',
    icon: Camera,
    accent: 'from-[#2dd4bf] to-[#6ee7b7]',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description:
      'Produce videos, podcasts, livestreams and high quality social media content.',
    features: ['Microphones', 'Lighting setup', 'Cameras', 'Editing suites'],
  },
  {
    id: 4,
    title: 'Collaboration Lounge',
    icon: Users,
    accent: 'from-[#fb923c] to-[#fdba74]',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description:
      'Meet teammates, brainstorm ideas and build exciting projects together.',
    features: ['Meeting tables', 'Whiteboards', 'Projector', 'Relaxed seating'],
  },
  {
    id: 5,
    title: 'Innovation Space',
    icon: Lightbulb,
    accent: 'from-[#f43f5e] to-[#fb7185]',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
    description:
      'Where bold student ideas become real projects and startups through mentorship & events.',
    features: ['Startup sessions', 'Hackathons', 'Founder events', 'Mentorship'],
  },
];

const HubExperienceSection = () => {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  return (
    <section className="relative overflow-hidden bg-[#f7f6fb] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(43,10,90,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,213,74,0.16),transparent_35%)]" />
      <div className="absolute left-[-5%] top-[10%] h-32 w-32 rounded-full bg-[#2B0A5A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[8%] right-[-3%] h-40 w-40 rounded-full bg-[#FFD54A]/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2B0A5A]/10 bg-white px-4 py-2 text-sm font-medium text-[#2B0A5A] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#FFD54A]" />
            Interactive Hub Experience
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#2B0A5A] sm:text-4xl lg:text-5xl">
            Explore the NIVOX Hub
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Discover modern, future-ready spaces designed to help students learn, collaborate, create, and innovate.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Space Selection Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-1"
          >
            {rooms.map((room) => {
              const Icon = room.icon;
              const isActive = selectedRoom.id === room.id;

              return (
                <motion.button
                  key={room.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRoom(room)}
                  className={`group relative overflow-hidden rounded-[24px] border p-4 text-left shadow-md transition-all duration-300 ${
                    isActive
                      ? 'border-[#FFD54A] bg-[#2B0A5A] shadow-[0_12px_40px_rgba(43,10,90,0.35)] ring-2 ring-[#FFD54A]/80'
                      : 'border-[#2B0A5A]/10 bg-white hover:border-[#2B0A5A]/30 hover:bg-white/90'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${room.accent} text-[#140726] shadow-sm transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-base font-bold transition-colors ${
                          isActive ? 'text-white' : 'text-[#2B0A5A]'
                        }`}
                      >
                        {room.title}
                      </h4>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          isActive ? 'text-[#FFE7A3]' : 'text-gray-500'
                        }`}
                      >
                        {room.features[0]} • {room.features[1]}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right: Selected Space Detail Card with High-Res Image & Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoom.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[32px] border border-[#2B0A5A]/10 bg-white p-6 sm:p-8 shadow-[0_20px_70px_rgba(43,10,90,0.12)]"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-[24px]">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140726] via-[#140726]/40 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedRoom.accent} text-[#140726] shadow-lg`}
                      >
                        {(() => {
                          const Icon = selectedRoom.icon;
                          return <Icon className="h-6 w-6" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">{selectedRoom.title}</h3>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFE7A3]">
                          NIVOX Hub Space
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                    {selectedRoom.description}
                  </p>

                  <h5 className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#2B0A5A]/70">
                    Included Amenities & Features
                  </h5>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {selectedRoom.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 rounded-2xl border border-[#2B0A5A]/10 bg-[#f8f7fb] px-4 py-3 text-sm font-medium text-[#2B0A5A]"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
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
