import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Coins,
  Cpu,
  Download,
  Globe2,
  GraduationCap,
  Handshake,
  Monitor,
  Rocket,
  Sparkles,
  Wifi,
  Zap,
} from 'lucide-react';

const stats = [
  { value: '22,000+', label: 'Potential Students' },
  { value: '500+', label: 'Daily Capacity' },
  { value: '5+', label: 'Innovation Spaces' },
  { value: '∞', label: 'Future Opportunities' },
];

const partnershipAreas = [
  {
    title: 'Technology Partners',
    description: 'Provide devices, software and infrastructure that power innovation.',
    icon: Cpu,
  },
  {
    title: 'Financial Partners',
    description: 'Support scholarships, student empowerment and long-term access.',
    icon: Coins,
  },
  {
    title: 'Education Partners',
    description: 'Collaborate with universities and institutions shaping future talent.',
    icon: GraduationCap,
  },
  {
    title: 'Internet Partners',
    description: 'Bring connectivity and digital access to every student journey.',
    icon: Wifi,
  },
  {
    title: 'Innovation Partners',
    description: 'Open doors to startups, mentorship and bold entrepreneurial ideas.',
    icon: Rocket,
  },
  {
    title: 'Community Partners',
    description: 'Drive youth development programs and meaningful local impact.',
    icon: Handshake,
  },
];

const partnerPlaceholders = [
  'MTN Foundation',
  'NITDA',
  'HP Nigeria',
  'Access Bank',
  'Delta State Government',
  'Niger Delta University',
];

const particles = [
  { left: '8%', top: '12%', size: '8px', delay: 0 },
  { left: '18%', top: '78%', size: '10px', delay: 0.8 },
  { left: '82%', top: '18%', size: '7px', delay: 1.2 },
  { left: '74%', top: '76%', size: '11px', delay: 1.7 },
  { left: '56%', top: '28%', size: '6px', delay: 0.4 },
  { left: '40%', top: '86%', size: '9px', delay: 1.4 },
];

const NodeIllustration = () => {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-[24px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(43,10,90,0.7),transparent_45%)] p-4">
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[10%] top-[16%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,213,74,0.55),rgba(255,213,74,0.05))] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[12%] right-[10%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(120,77,255,0.45),rgba(120,77,255,0.05))] blur-3xl"
      />

      <div className="absolute left-[14%] top-[24%] h-[2px] w-[36%] bg-gradient-to-r from-[#ffd54a]/70 via-[#ffffff]/30 to-transparent" />
      <div className="absolute left-[50%] top-[24%] h-[33%] w-[2px] bg-gradient-to-b from-[#ffd54a]/70 via-[#ffffff]/20 to-transparent" />
      <div className="absolute bottom-[24%] left-[24%] h-[2px] w-[34%] bg-gradient-to-r from-[#ffffff]/20 via-[#b287ff]/80 to-[#ffd54a]/70" />

      <motion.div
        animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[8%] top-[14%] rounded-full border border-[#ffd54a]/40 bg-white/10 p-3 shadow-[0_0_36px_rgba(255,213,74,0.22)] backdrop-blur-xl"
      >
        <Monitor className="h-6 w-6 text-[#ffd54a]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.06, 1], y: [0, -6, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[48%] top-[12%] rounded-full border border-white/30 bg-[#2b0a5a]/75 p-3 shadow-[0_0_30px_rgba(120,77,255,0.28)] backdrop-blur-xl"
      >
        <Zap className="h-6 w-6 text-white" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.05, 1], y: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[12%] top-[28%] rounded-full border border-[#ffd54a]/30 bg-white/10 p-3 shadow-[0_0_30px_rgba(255,213,74,0.25)] backdrop-blur-xl"
      >
        <Globe2 className="h-6 w-6 text-[#ffd54a]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.04, 1], x: [0, 4, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[18%] left-[22%] rounded-full border border-white/20 bg-[#3d1175]/80 p-3 shadow-[0_0_28px_rgba(120,77,255,0.25)] backdrop-blur-xl"
      >
        <BadgeCheck className="h-6 w-6 text-[#ffd54a]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.06, 1], y: [0, -5, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[18%] right-[18%] rounded-full border border-[#ffd54a]/30 bg-white/10 p-3 shadow-[0_0_30px_rgba(255,213,74,0.22)] backdrop-blur-xl"
      >
        <Building2 className="h-6 w-6 text-white" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.96, 1.02, 0.96] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-8 bottom-6 h-20 rounded-full border border-white/10 bg-white/5 blur-3xl"
      />
    </div>
  );
};

const PartnershipSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_22%),linear-gradient(135deg,#19052f_0%,#2b0a5a_42%,#10031f_100%)] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute left-[-6%] top-10 h-56 w-56 rounded-full bg-[#ffd54a]/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-8%] h-72 w-72 rounded-full bg-[#7b35ff]/35 blur-[140px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd54a]/80 to-transparent" />

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.95, 0.25] }}
          transition={{ duration: 5 + index, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
          className="absolute rounded-full bg-white/80"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-[#ffe7a3] backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[#ffd54a]" />
            Shaping Tomorrow, Today.
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Building the Future Together
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            NIVOX partners with visionary organizations that believe every student deserves access to technology, innovation and opportunity.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="rounded-[24px] border border-white/15 bg-white/10 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            >
              <div className="text-3xl font-black text-white sm:text-4xl">{stat.value}</div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#ffe7a3]/85">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
          whileHover={{ y: -6, scale: 1.005 }}
          className="mt-16 rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd54a]/20 bg-[#ffd54a]/10 px-3 py-2 text-sm font-medium text-[#ffe7a3]">
                <Sparkles className="h-4 w-4 text-[#ffd54a]" />
                Why Partner With NIVOX?
              </div>
              <h3 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                A premium student innovation ecosystem built for the future.
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
                NIVOX is creating a world-class student innovation hub designed to prepare the next generation of creators, developers, entrepreneurs and digital professionals.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="#"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_12px_40px_rgba(255,213,74,0.24)]"
                >
                  Become a Partner
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur"
                >
                  <Download className="h-4 w-4" />
                  Download Partnership Prospectus
                </motion.a>
              </div>
            </div>

            <NodeIllustration />
          </div>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {partnershipAreas.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[24px] border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.20)] backdrop-blur-xl"
              >
                <motion.div
                  animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.99, 1.01, 0.99] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
                  className="pointer-events-none absolute inset-0 rounded-[24px] border border-[#ffd54a]/35"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                      Partner
                    </span>
                  </div>
                  <h4 className="mt-6 text-xl font-semibold text-white">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Partner Showcase</p>
              <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                A circle of institutions and organizations building with us.
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70">
              <Sparkles className="h-4 w-4 text-[#ffd54a]" />
              Prospective Partnership Network
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {partnerPlaceholders.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -5, scale: 1.01, boxShadow: '0 0 0 1px rgba(255,213,74,0.25), 0 22px 60px rgba(0,0,0,0.24)' }}
                className="rounded-[20px] border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))] p-5 text-center backdrop-blur"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#ffd54a]/30 bg-[#ffd54a]/10 text-[#ffd54a]">
                  <Monitor className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-white">{partner}</h4>
                <p className="mt-2 text-sm text-white/60">Prospective Partner</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-[36px] border border-[#ffd54a]/20 bg-[linear-gradient(120deg,rgba(255,213,74,0.23),rgba(255,255,255,0.08))] p-8 shadow-[0_28px_85px_rgba(0,0,0,0.25)] sm:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Join the Movement</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Let&apos;s Build the Future Together.
              </h3>
              <p className="mt-4 text-lg leading-8 text-white/75">
                Whether you&apos;re a corporate organization, educational institution or technology company, your partnership can help shape tomorrow&apos;s innovators.
              </p>
            </div>

            <motion.a
              href="#"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-7 py-3.5 text-sm font-semibold text-[#2b0a5a] shadow-[0_16px_45px_rgba(255,213,74,0.24)]"
            >
              Partner With NIVOX
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
