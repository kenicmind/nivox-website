import { motion } from 'framer-motion';
import { BookOpen, Camera, Monitor, Rocket, Sparkles, Users, Zap } from 'lucide-react';

const features = [
  {
    title: 'Reliable High-Speed Internet',
    description: 'Enjoy uninterrupted browsing, online classes, research and downloads.',
    icon: Zap,
  },
  {
    title: 'Modern Workstations',
    description: 'Powerful computers equipped for design, development, research and productivity.',
    icon: Monitor,
  },
  {
    title: 'Collaborative Spaces',
    description: 'Work with classmates, build projects and connect with creative minds.',
    icon: Users,
  },
  {
    title: 'Learning Resources',
    description: 'Access digital tools, tutorials and educational resources anytime.',
    icon: BookOpen,
  },
  {
    title: 'Content Creation Studio',
    description: 'Record videos, podcasts and creative content in a professional environment.',
    icon: Camera,
  },
  {
    title: 'Innovation Hub',
    description: 'Transform ideas into real projects through collaboration and technology.',
    icon: Rocket,
  },
];

const stats = [
  { value: '500+', label: 'Students Daily' },
  { value: '50+', label: 'Computers' },
  { value: '1Gbps', label: 'Internet Speed' },
  { value: '100%', label: 'Innovation' },
];

const AnimatedCounter = ({ value, label }) => {
  return (
    <motion.div
      initial={false}
      transition={{ duration: 0.5 }}
      className="rounded-[24px] border border-[#2B0A5A]/10 bg-white p-6 text-center shadow-[0_15px_45px_rgba(43,10,90,0.08)]"
    >
      <div className="text-3xl font-black text-[#2B0A5A] sm:text-4xl">{value}</div>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[#2B0A5A]/70">{label}</p>
    </motion.div>
  );
};

const WhyNivoxSection = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute left-[-5%] top-10 h-40 w-40 rounded-full bg-[#2B0A5A]/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-[-4%] h-48 w-48 rounded-full bg-[#FFD54A]/20 blur-3xl" />

      <motion.div
        initial={false}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2B0A5A]/10 bg-[#2B0A5A]/5 px-4 py-2 text-sm font-medium text-[#2B0A5A]">
            <Sparkles className="h-4 w-4 text-[#FFD54A]" />
            Why Students Choose NIVOX
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#2B0A5A] sm:text-4xl lg:text-5xl">
            Why Students Choose NIVOX
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Everything you need to learn, create, collaborate and grow in one inspiring space.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={false}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[24px] border border-[#2B0A5A]/10 bg-white p-7 shadow-[0_16px_50px_rgba(43,10,90,0.08)] transition-all duration-300"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#2B0A5A]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#2B0A5A]">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-600">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={false}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 rounded-[32px] border border-[#2B0A5A]/10 bg-gradient-to-r from-[#2B0A5A] to-[#3a0d6a] p-8 text-white shadow-[0_20px_60px_rgba(43,10,90,0.2)] sm:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyNivoxSection;
