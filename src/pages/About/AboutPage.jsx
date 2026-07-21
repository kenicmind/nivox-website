import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Cpu,
  HeartHandshake,
  Lightbulb,
  Monitor,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

const values = [
  { title: 'Innovation', description: 'We build bold ideas into real opportunities.', icon: Lightbulb },
  { title: 'Community', description: 'We grow stronger when students connect and collaborate.', icon: Users },
  { title: 'Excellence', description: 'We set a high standard for every experience we create.', icon: Sparkles },
  { title: 'Accessibility', description: 'Technology and opportunity should be available to all.', icon: Monitor },
  { title: 'Collaboration', description: 'Great work begins when diverse minds come together.', icon: HeartHandshake },
  { title: 'Growth', description: 'We create spaces where students can evolve with confidence.', icon: Rocket },
];

const stats = [
  { value: '22,000+', label: 'Potential Students' },
  { value: '500+', label: 'Daily Capacity' },
  { value: '5+', label: 'Innovation Spaces' },
  { value: '100%', label: 'Student Focus' },
];

const particles = [
  { left: '8%', top: '18%', size: '8px' },
  { left: '22%', top: '78%', size: '10px' },
  { left: '78%', top: '20%', size: '7px' },
  { left: '74%', top: '82%', size: '11px' },
  { left: '54%', top: '28%', size: '6px' },
];

const AboutPage = () => {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_28%),linear-gradient(135deg,#f8f5ff_0%,#ffffff_35%,#f4eeff_100%)] px-4 py-8 text-[#2b0a5a] sm:px-6 lg:px-8 lg:py-12">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(43,10,90,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,10,90,0.35)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute left-[-6%] top-8 h-48 w-48 rounded-full bg-[#2b0a5a]/10 blur-3xl" />
      <div className="absolute bottom-[-5%] right-[-6%] h-60 w-60 rounded-full bg-[#ffd54a]/20 blur-3xl" />

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full bg-[#2b0a5a]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
        />
      ))}

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[36px] border border-[#2b0a5a]/10 bg-white/70 p-8 shadow-[0_25px_80px_rgba(43,10,90,0.12)] backdrop-blur-xl sm:p-10 lg:p-14"
        >
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2b0a5a]/10 bg-[#2b0a5a]/5 px-4 py-2 text-sm font-medium text-[#2b0a5a]">
                <Sparkles className="h-4 w-4 text-[#ffd54a]" />
                About NIVOX
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-[#2b0a5a] sm:text-5xl lg:text-6xl">
                Building the Future Student Hub.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-700">
                NIVOX is creating a future-ready space where students can learn, innovate, collaborate and thrive with access to technology and opportunity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="#"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_12px_35px_rgba(255,213,74,0.24)]"
                >
                  Become a Member
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2b0a5a]/10 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#2b0a5a]"
                >
                  Partner With NIVOX
                </motion.a>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-[#2b0a5a]/10 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.22),transparent_35%),linear-gradient(135deg,#2b0a5a_0%,#3b0f6e_100%)] p-6 shadow-[0_22px_70px_rgba(43,10,90,0.2)]">
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[10%] top-[16%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,213,74,0.46),transparent_70%)] blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[12%] right-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24),transparent_65%)] blur-2xl"
              />

              <div className="relative flex h-full items-center justify-center">
                <div className="relative h-56 w-56 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                  <motion.div
                    animate={{ rotate: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-6 rounded-full border border-[#ffd54a]/40"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15"
                  >
                    <Cpu className="h-9 w-9 text-[#ffd54a]" />
                  </motion.div>
                  <div className="absolute left-[12%] top-[22%] rounded-full border border-white/20 bg-white/10 p-3 text-white">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="absolute right-[14%] top-[22%] rounded-full border border-white/20 bg-white/10 p-3 text-white">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="absolute bottom-[18%] left-[20%] rounded-full border border-white/20 bg-white/10 p-3 text-white">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div className="absolute bottom-[18%] right-[20%] rounded-full border border-white/20 bg-white/10 p-3 text-white">
                    <Rocket className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="rounded-[30px] border border-[#2b0a5a]/10 bg-white/80 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">Our Story</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl">
              Built for students who need more than a classroom.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              NIVOX was created to solve the challenges students face, including unreliable internet, limited access to technology, a lack of collaborative workspaces and too few opportunities to innovate.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              We believe the next generation deserves a space where curiosity is supported, ideas can flourish and future-ready skills are built every day.
            </p>
          </div>

          <div className="rounded-[30px] border border-[#2b0a5a]/10 bg-[linear-gradient(135deg,#2b0a5a_0%,#3f1176_100%)] p-8 text-white shadow-[0_24px_70px_rgba(43,10,90,0.16)] sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffd54a]">Why We Exist</p>
                <h3 className="text-xl font-semibold">A hub for ambition</h3>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {[
                'Reliable access to technology and modern tools',
                'A welcoming environment for learning and collaboration',
                'Spaces that inspire creativity, entrepreneurship and innovation',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/80">
                  <span className="mt-0.5 text-[#ffd54a]">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-2">
          {[
            {
              title: 'Vision',
              body: 'To become Africa\'s leading student innovation hub where technology meets opportunity.',
              accent: 'bg-[#2b0a5a] text-white',
            },
            {
              title: 'Mission',
              body: 'Empower students through access to technology, collaborative environments and opportunities that prepare them for the future.',
              accent: 'bg-white text-[#2b0a5a]',
            },
          ].map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`rounded-[28px] border border-[#2b0a5a]/10 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl ${card.accent}`}
            >
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${card.title === 'Vision' ? 'bg-[#ffd54a]/15 text-[#ffe7a3]' : 'bg-[#2b0a5a]/5 text-[#2b0a5a]'}`}>
                <Compass className={`h-4 w-4 ${card.title === 'Vision' ? 'text-[#ffd54a]' : 'text-[#2b0a5a]'}`} />
                {card.title}
              </div>
              <p className="mt-6 text-lg leading-8 opacity-90">{card.body}</p>
            </motion.article>
          ))}
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-[#2b0a5a]/10 bg-white/80 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">Core Values</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl">
              Principles that guide every experience.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="rounded-[24px] border border-[#2b0a5a]/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,244,255,0.95))] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#2b0a5a]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#2b0a5a]">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700">{value.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-[#2b0a5a]/10 bg-[linear-gradient(135deg,#2b0a5a_0%,#3f1176_100%)] p-8 text-white shadow-[0_24px_70px_rgba(43,10,90,0.16)] sm:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl"
              >
                <div className="text-3xl font-black sm:text-4xl">{stat.value}</div>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#ffe7a3]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
            {/* ================= WHY NIVOX MATTERS ================= */}

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="rounded-[32px] border border-[#2b0a5a]/10 bg-white/80 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10"
            >
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">
                  Why NIVOX Matters
                </p>

                <h2 className="mt-4 text-3xl font-black text-[#2b0a5a] sm:text-4xl">
                  More Than Just a Workspace
                </h2>

                <p className="mt-5 text-lg leading-8 text-gray-700">
                  NIVOX is an ecosystem where students gain access to technology,
                  collaboration, creativity, entrepreneurship, and opportunities that
                  prepare them for the future.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {[
                  {
                    emoji: "🌐",
                    title: "Digital Access",
                    text: "Fast internet, reliable electricity and modern technology that remove barriers to learning."
                  },
                  {
                    emoji: "💡",
                    title: "Innovation",
                    text: "Transform ideas into projects, startups and meaningful solutions."
                  },
                  {
                    emoji: "🤝",
                    title: "Collaboration",
                    text: "Work with students from different disciplines and build together."
                  },
                  {
                    emoji: "🚀",
                    title: "Career Growth",
                    text: "Develop practical skills and prepare for internships, careers and leadership."
                  },
                  {
                    emoji: "🎥",
                    title: "Creative Studios",
                    text: "Photography, videography, podcasting, graphic design and digital media creation."
                  },
                  {
                    emoji: "💼",
                    title: "Entrepreneurship",
                    text: "Launch ideas, connect with mentors and build businesses that create impact."
                  }
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="rounded-[24px] border border-[#2b0a5a]/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(248,244,255,0.95))] p-6"
                  >
                    <div className="text-4xl">{item.emoji}</div>

                    <h3 className="mt-5 text-xl font-bold text-[#2b0a5a]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-gray-700 leading-7">
                      {item.text}
                    </p>
                  </motion.div>
                ))}

              </div>
            </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[36px] border border-[#2b0a5a]/10 bg-white/80 p-8 text-center shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">Join the Movement</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl">
            Become part of something bigger.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.a
              href="#"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_12px_35px_rgba(255,213,74,0.24)]"
            >
              Become a Member
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2b0a5a]/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#2b0a5a]"
            >
              Partner With NIVOX
            </motion.a>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default AboutPage;
