import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

      <div className="relative mx-auto flex max-w-7xl flex-col gap-20">
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
              <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight text-[#2b0a5a] sm:text-6xl lg:text-7xl">
                Building the Future Student Hub.
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600">
                NIVOX is creating a future-ready space where students can learn, innovate, collaborate and thrive with access to technology and opportunity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/membership">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_12px_35px_rgba(255,213,74,0.24)]"
                  >
                    Become a Member
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
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
          <div className="rounded-[30px] border border-[#e6ddff] bg-gradient-to-br from-[#faf7ff] via-white to-[#f4eeff] p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">Our Story</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl">
              Built for students who need more than a classroom.
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-8 text-gray-700">
              <p>
                Every great innovation begins with a challenge that refuses to be ignored.
              </p>

              <p>
                Across many campuses, countless students carry brilliant ideas, ambitious dreams,
                and the determination to create meaningful change. Yet for many, those dreams
                never move beyond imagination—not because they lack talent, but because they
                lack access to the right environment.
              </p>

              <p>
                Unreliable internet becomes missed opportunities. Frequent power interruptions
                disrupt creativity. Limited access to technology slows learning, while the
                absence of collaborative spaces leaves brilliant minds working in isolation.
              </p>

              <p>
                We asked ourselves a simple question:
              </p>

              <blockquote className="rounded-2xl border-l-4 border-[#FFD54A] bg-[#FFF9E6] px-6 py-5 text-xl font-semibold italic text-[#2b0a5a]">
                "What if every student had a place built entirely around their potential?"
              </blockquote>

              <p>
                That question became <span className="font-bold text-[#2b0a5a]">NIVOX</span>.
              </p>

              <p>
                More than a workspace, NIVOX is a student innovation hub where ideas are explored,
                skills are developed, collaborations are formed, and opportunities are created.
                It is a place where curiosity becomes confidence, learning becomes action, and
                ambition becomes impact.
              </p>

              <p>
                We believe innovation should never be limited by access. Every student deserves
                an inspiring environment that encourages creativity, nurtures collaboration,
                and provides the tools to shape the future.
              </p>

              <p className="text-xl font-bold text-[#2b0a5a]">
                This is the story of NIVOX. And it is only the beginning.
              </p>

            </div>
          </div>

          <div className="rounded-[30px] border border-[#2b0a5a]/10 bg-[linear-gradient(135deg,#2b0a5a_0%,#3f1176_100%)] p-8 text-white shadow-[0_24px_70px_rgba(43,10,90,0.16)] sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffd54a]">Why We Exist</p>
                <h3 className="text-xl font-semibold">Empowering the Next Generation of Innovators</h3>
              </div>
            </div>
           <div className="mt-8 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
              <h4 className="text-lg font-bold text-[#FFD54A]">
                🌍 We See Potential
              </h4>

              <p className="mt-3 leading-7 text-white/80">
                Every student carries the ability to innovate, create and solve real-world
                problems. What many lack is not talent—but the right environment to grow.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
              <h4 className="text-lg font-bold text-[#FFD54A]">
                🚀 We Build Opportunity
              </h4>

              <p className="mt-3 leading-7 text-white/80">
                NIVOX provides reliable internet, modern technology, collaborative spaces
                and a thriving community where ideas can become projects and projects can
                become businesses.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
              <h4 className="text-lg font-bold text-[#FFD54A]">
                🤝 We Inspire the Future
              </h4>

              <p className="mt-3 leading-7 text-white/80">
                Our mission is to empower students with the confidence, skills and
                opportunities needed to become innovators, entrepreneurs and leaders who
                shape tomorrow.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
            <h4 className="text-lg font-bold text-[#FFD54A]">
              💡 We Foster Innovation
            </h4>

            <p className="mt-3 leading-7 text-white/80">
              We encourage students to think beyond the classroom, transform ideas into
              practical solutions, and develop innovations that can improve lives,
              communities, and industries.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
            <h4 className="text-lg font-bold text-[#FFD54A]">
              🌱 We Create Lasting Impact
            </h4>

            <p className="mt-3 leading-7 text-white/80">
              Our vision extends beyond today's students. We are building a sustainable
              ecosystem where learning, entrepreneurship, and collaboration create
              opportunities that positively impact campuses, communities, and future
              generations.
            </p>
          </div>
          </div>
          </div>
        </motion.section>

        {/* ================= THE PROBLEM WE'RE SOLVING ================= */}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-[#2b0a5a]/10 bg-white/80 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10"
        >
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">
              The Problem We're Solving
            </p>

            <h2 className="mt-4 text-3xl font-black text-[#2b0a5a] sm:text-4xl">
              Transforming Challenges into Opportunities
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-700">
              Every challenge students face today is an opportunity for innovation.
              NIVOX exists to remove barriers and create an environment where students
              can thrive.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">

            {/* Before NIVOX */}

            <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
              <h3 className="text-2xl font-black text-red-600">
                ❌ Before NIVOX
              </h3>

              <div className="mt-8 space-y-5">

                {[
                  "Slow and unreliable internet.",
                  "Frequent power interruptions.",
                  "Limited access to technology.",
                  "No inspiring collaborative spaces.",
                  "Ideas remain unfinished.",
                  "Few opportunities for innovation."
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <span className="text-xl">❌</span>

                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}

              </div>
            </div>

            {/* With NIVOX */}

            <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
              <h3 className="text-2xl font-black text-green-700">
                ✅ With NIVOX
              </h3>

              <div className="mt-8 space-y-5">

                {[
                  "High-speed internet access.",
                  "Reliable electricity.",
                  "Modern technology and equipment.",
                  "Collaborative learning environment.",
                  "Ideas become real projects.",
                  "Pathways to innovation and entrepreneurship."
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <span className="text-xl">✅</span>

                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </motion.section>

      {/* ================= THE NIVOX JOURNEY ================= */}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-[#2b0a5a]/10 bg-[linear-gradient(135deg,#2b0a5a_0%,#3b0f6e_100%)] p-8 text-white shadow-[0_24px_70px_rgba(43,10,90,0.16)] sm:p-10"
        >

          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD54A]">
              The NIVOX Journey
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Every Great Journey Begins With One Step
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/80">
              NIVOX is designed to guide every student from curiosity to confidence,
              from learning to leadership, and from ideas to real impact.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-5">

            {[
              {
                number: "01",
                title: "Discover",
                text: "Students enter a welcoming environment built for learning, creativity and collaboration.",
                emoji: "👋",
              },
              {
                number: "02",
                title: "Learn",
                text: "Access technology, high-speed internet, workshops and practical learning experiences.",
                emoji: "📚",
              },
              {
                number: "03",
                title: "Create",
                text: "Transform ideas into projects through teamwork, innovation and experimentation.",
                emoji: "💡",
              },
              {
                number: "04",
                title: "Launch",
                text: "Develop solutions, startups, portfolios and career-ready skills for the future.",
                emoji: "🚀",
              },
              {
                number: "05",
                title: "Impact",
                text: "Empower communities by creating solutions that inspire positive change across society.",
                emoji: "🌍",
              },
            ].map((step) => (
              <motion.div
                key={step.number}
                whileHover={{ y: -10 }}
                className="relative rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              >
                <span className="absolute right-6 top-6 text-5xl font-black text-white/10">
                  {step.number}
                </span>

                <div className="text-5xl">
                  {step.emoji}
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-white/80">
                  {step.text}
                </p>
              </motion.div>
            ))}

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
              whileHover={{ y: -10, scale: 1.01 }}
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
                  whileHover={{ y: -10, scale: 1.01 }}
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

  {/* ================= WHY CHOOSE NIVOX ================= */}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-[#2b0a5a]/10 bg-white/80 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.08)] backdrop-blur-xl sm:p-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">
              Why Choose NIVOX
            </p>

            <h2 className="mt-4 text-3xl font-black text-[#2b0a5a] sm:text-4xl">
              More Than a Hub. A Launchpad for Success.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-700">
              NIVOX combines technology, community, learning and innovation into one
              inspiring ecosystem designed to help students unlock their full potential.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                icon: "🌐",
                title: "Reliable Internet",
                text: "Stay connected with high-speed internet for research, learning, remote work and innovation.",
              },
              {
                icon: "💻",
                title: "Modern Technology",
                text: "Access computers, digital tools and resources that support creativity and productivity.",
              },
              {
                icon: "🤝",
                title: "Collaboration",
                text: "Connect with like-minded students, mentors and innovators who inspire growth.",
              },
              {
                icon: "🚀",
                title: "Future Opportunities",
                text: "Build projects, strengthen your portfolio and prepare for careers, entrepreneurship and leadership.",
              },
              {
                icon: "🎓",
                title: "Continuous Learning",
                text: "Attend workshops, events and training sessions that develop practical, future-ready skills.",
              },
              {
                icon: "💡",
                title: "Innovation Culture",
                text: "Explore new ideas, experiment with solutions and transform imagination into meaningful impact.",
              },
              {
                icon: "🎯",
                title: "Purpose-Driven Community",
                text: "Become part of a supportive community that encourages excellence, creativity and positive change.",
              },
              {
                icon: "🌍",
                title: "Real Impact",
                text: "Everything at NIVOX is designed to empower students to create lasting value for society.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -10, scale: 1.01 }}
                className="rounded-3xl border border-[#2b0a5a]/10 bg-white p-6 shadow-md transition-all"
              >
                <div className="text-5xl">{item.icon}</div>

                <h3 className="mt-5 text-xl font-bold text-[#2b0a5a]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.text}
                </p>
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
                    whileHover={{ y: -10, scale: 1.01 }}
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
          {/* ================= FINAL QUOTE ================= */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] bg-gradient-to-r from-[#2b0a5a] via-[#3b0f6e] to-[#2b0a5a] p-10 text-center text-white shadow-[0_24px_70px_rgba(43,10,90,0.16)]"
        >
          <p className="text-lg italic leading-9 text-white/90 sm:text-2xl">
            "We believe the future isn't something students should wait for.
            It's something they should have the opportunity to build."
          </p>

          <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-[#FFD54A]" />

          <h3 className="mt-6 text-2xl font-bold">
            — The NIVOX Vision
          </h3>
        </motion.section>
                <br></br>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2b0a5a]/70">Join the Movement</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl">
            The Future Starts With You.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Whether you're a student looking for opportunities, an organization
            seeking meaningful partnerships, or someone who believes in empowering
            the next generation, there's a place for you at NIVOX.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/membership">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_12px_35px_rgba(255,213,74,0.24)]"
                  >
                    Become a Member
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
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
        <div className="h-16"></div>
      </div>
      <div className="mx-auto mt-10 h-px w-40 rounded-full bg-gradient-to-r from-transparent via-[#FFD54A] to-transparent" />
    </main>
  );
};

export default AboutPage;
