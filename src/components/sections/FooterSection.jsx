import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Send,
  Sparkles,
} from 'lucide-react';

const quickLinks = ['Home', 'About', 'Spaces', 'Events', 'Community', 'Contact'];
const exploreLinks = ['Learning Zone', 'Computer Lab', 'Creator Studio', 'Innovation Hub', 'Membership'];
const partnerLinks = ['Become a Partner', 'Sponsor NIVOX', 'Universities', 'Corporate Partners', 'Download Prospectus'];
const socialLinks = [
  { label: 'Facebook', icon: Globe2 },
  { label: 'Instagram', icon: BadgeCheck },
  { label: 'LinkedIn', icon: MessageCircle },
  { label: 'X (Twitter)', icon: Send },
  { label: 'YouTube', icon: Play },
];

const particles = [
  { left: '8%', top: '15%', size: '8px', delay: 0.2 },
  { left: '20%', top: '78%', size: '9px', delay: 0.7 },
  { left: '78%', top: '22%', size: '7px', delay: 1.1 },
  { left: '74%', top: '78%', size: '10px', delay: 1.5 },
  { left: '54%', top: '30%', size: '6px', delay: 0.5 },
];

const FooterSection = () => {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_24%),linear-gradient(135deg,#160329_0%,#2b0a5a_45%,#0f0220_100%)] px-4 pb-8 pt-20 text-white sm:px-6 lg:px-8 lg:pt-24">
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[#ffd54a]/20 blur-[140px]" />
      <div className="absolute bottom-[-12%] right-[-8%] h-80 w-80 rounded-full bg-[#7b35ff]/30 blur-[150px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd54a]/80 to-transparent" />

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.95, 0.25] }}
          transition={{ duration: 5 + index, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
          className="absolute rounded-full bg-white/80"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[30px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Join the Movement</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to Shape Tomorrow?
              </h3>
              <p className="mt-4 text-lg leading-8 text-white/75">
                Join students, creators and innovators building the future with NIVOX.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.a
                href="#"
                whileHover={{ y: -2, scale: 1.02, boxShadow: '0 14px 40px rgba(255,213,74,0.24)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a]"
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur"
              >
                Become a Partner
              </motion.a>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a] shadow-[0_0_24px_rgba(255,213,74,0.18)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black tracking-[0.2em] text-white">NIVOX</p>
                <p className="text-sm text-[#ffe7a3]">Shaping Tomorrow, Today.</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/70">
              NIVOX is a modern student hub designed to provide technology, innovation and collaborative spaces for the next generation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href="#"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 16px rgba(255,213,74,0.22)' }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#ffd54a] backdrop-blur"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {quickLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4, color: '#ffd54a' }}
                    className="transition-colors duration-200"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4, color: '#ffd54a' }}
                    className="transition-colors duration-200"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Partners</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {partnerLinks.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4, color: '#ffd54a' }}
                    className="transition-colors duration-200"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe7a3]">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd54a]" />
                <span>info@nivoxhub.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd54a]" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd54a]" />
                <span>Bayelsa State, Nigeria</span>
              </li>
            </ul>
            <div className="mt-6 rounded-[20px] border border-white/15 bg-white/10 p-4 text-sm text-white/70 backdrop-blur">
              <p className="font-semibold text-white">Opening Hours</p>
              <p className="mt-2">Monday – Saturday</p>
              <p>8:00 AM – 8:00 PM</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 NIVOX. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <span>Built with ❤️ in Nigeria.</span>
              <motion.a href="#" whileHover={{ color: '#ffd54a' }} className="transition-colors duration-200">
                Privacy Policy
              </motion.a>
              <motion.a href="#" whileHover={{ color: '#ffd54a' }} className="transition-colors duration-200">
                Terms of Use
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
