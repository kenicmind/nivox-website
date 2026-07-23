import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Mail, Sparkles, Star, Users, Zap } from 'lucide-react';

const trustCards = [
  {
    title: 'Built for Students',
    description: 'Designed around real student needs.',
    icon: Users,
  },
  {
    title: 'Innovation First',
    description: 'Technology that inspires creativity.',
    icon: Zap,
  },
  {
    title: 'Community Driven',
    description: 'A space where ideas become reality.',
    icon: Sparkles,
  },
];

const particles = [
  { left: '8%', top: '20%', size: '8px', delay: 0.1 },
  { left: '18%', top: '75%', size: '10px', delay: 0.8 },
  { left: '78%', top: '18%', size: '7px', delay: 1.2 },
  { left: '72%', top: '78%', size: '11px', delay: 1.6 },
  { left: '54%', top: '28%', size: '6px', delay: 0.4 },
  { left: '38%', top: '88%', size: '9px', delay: 1.3 },
];

const FinalCtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_25%),linear-gradient(135deg,#18032a_0%,#2b0a5a_45%,#0f0220_100%)] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[-10%] top-8 h-72 w-72 rounded-full bg-[#ffd54a]/20 blur-[140px]" />
      <div className="absolute bottom-[-12%] right-[-8%] h-80 w-80 rounded-full bg-[#7b35ff]/35 blur-[150px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd54a]/80 to-transparent" />

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          animate={{ y: [0, -16, 0], opacity: [0.25, 0.95, 0.25] }}
          transition={{ duration: 5 + index, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
          className="absolute rounded-full bg-white/80"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
        />
      ))}

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-[#ffe7a3] backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[#ffd54a]" />
            Shaping Tomorrow, Today.
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Future Starts With You
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Thousands of students are preparing for a new way to learn, create, collaborate and innovate. Become one of the first members of the NIVOX community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
          whileHover={{ y: -6, scale: 1.005 }}
          className="rounded-[32px] border border-white/15 bg-white/10 p-7 shadow-[0_35px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-9 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd54a]/20 bg-[#ffd54a]/10 px-3 py-2 text-sm font-medium text-[#ffe7a3]">
                <Star className="h-4 w-4 text-[#ffd54a]" />
                Your Next Chapter Starts Here
              </div>
              <h3 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to Experience NIVOX?
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
                Join our growing community and be among the first students to experience a modern learning environment designed for tomorrow&apos;s innovators.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/membership">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_18px_45px_rgba(255,213,74,0.28)]"
                  >
                    Join the Waitlist
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
                <Link to="/spaces">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Book a Tour
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div className="rounded-[24px] border border-[#ffd54a]/20 bg-[#2b0a5a]/70 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ffe7a3]">Stay Updated</p>
                    <h4 className="mt-1 text-xl font-semibold text-white">Be first in line</h4>
                  </div>
                </div>

                <div className="mt-6 rounded-[20px] border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <label className="block text-sm font-medium text-white/70" htmlFor="email">Email address</label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-full border border-white/15 bg-[#13022b] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/40"
                    />
                    <motion.button
                      whileHover={{ y: -2, scale: 1.01, boxShadow: '0 12px 32px rgba(255,213,74,0.2)' }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-[#ffd54a] px-5 py-3 text-sm font-semibold text-[#2b0a5a]"
                    >
                      Notify Me
                    </motion.button>
                  </div>
                  <p className="mt-3 text-sm text-white/60">Be the first to know about our launch, events and opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[24px] border border-white/15 bg-white/10 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a]">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-5 text-xl font-semibold text-white">{card.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/70">{card.description}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center text-xl font-medium leading-9 text-white/85 sm:text-2xl"
        >
          “The future belongs to students who have the courage to build it.”
          <div className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">— NIVOX</div>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default FinalCtaSection;
