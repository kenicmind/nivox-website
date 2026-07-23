import { motion } from 'framer-motion';
import { BookOpen, Camera, Cpu, Rocket, Sparkles, Users, Zap } from 'lucide-react';

const cards = [
  {
    eyebrow: 'Student',
    title: 'Study Smarter',
    description:
      'Access reliable internet, quiet workspaces and digital resources for assignments, research and exam preparation.',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    accent: 'from-[#ffd54a]/25 to-[#ffb703]/10',
    glow: 'shadow-[0_20px_60px_rgba(255,213,74,0.15)]',
  },
  {
    eyebrow: 'Tech Learner',
    title: 'Build Projects',
    description:
      'Use modern workstations to code, design, edit videos and learn practical digital skills.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    accent: 'from-[#7c3aed]/25 to-[#a78bfa]/10',
    glow: 'shadow-[0_20px_60px_rgba(124,58,237,0.15)]',
  },
  {
    eyebrow: 'Creator',
    title: 'Create Content',
    description:
      'Produce videos, podcasts and creative projects with professional tools.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    accent: 'from-[#2dd4bf]/25 to-[#14b8a6]/10',
    glow: 'shadow-[0_20px_60px_rgba(45,212,191,0.15)]',
  },
  {
    eyebrow: 'Entrepreneur',
    title: 'Launch Ideas',
    description:
      'Meet collaborators, attend events and turn ideas into startups.',
    icon: Rocket,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    accent: 'from-[#f43f5e]/25 to-[#fb923c]/10',
    glow: 'shadow-[0_20px_60px_rgba(244,63,94,0.15)]',
  },
];

const BuiltForEveryStudentSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_20%),linear-gradient(135deg,#fdfcff_0%,#f7f3ff_45%,#fbfbfe_100%)] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute left-[-5%] top-8 h-40 w-40 rounded-full bg-[#2b0a5a]/10 blur-3xl" />
      <div className="absolute bottom-[-3%] right-[-4%] h-44 w-44 rounded-full bg-[#ffd54a]/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(43,10,90,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,10,90,0.5)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2b0a5a]/10 bg-white/80 px-4 py-2 text-sm font-medium text-[#2b0a5a] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#ffd54a]" />
            Built for Every Student
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl lg:text-5xl">
            Built for Every Student
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            No matter your ambition, NIVOX gives you the space and tools to achieve more.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-[0_18px_55px_rgba(43,10,90,0.08)] backdrop-blur-xl ${card.glow}`}
              >
                <div className={`rounded-[22px] bg-gradient-to-br ${card.accent} p-3`}>
                  <div className="relative h-36 overflow-hidden rounded-[18px]">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140726]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#140726]/80 text-[#ffd54a] backdrop-blur-md">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2b0a5a]/60">{card.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#2b0a5a]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{card.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BuiltForEveryStudentSection;
