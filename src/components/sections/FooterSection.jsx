import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
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
  Handshake,
  Award,
  GraduationCap,
  Building2,
  FileText,
  ChevronRight,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Spaces', to: '/spaces' },
  { label: 'Events', to: '/events' },
  { label: 'Community', to: '/community' },
  { label: 'Membership', to: '/membership' },
];

const exploreLinks = [
  { label: 'Learning Zone', to: '/spaces' },
  { label: 'Computer Lab', to: '/spaces' },
  { label: 'Creator Studio', to: '/spaces' },
  { label: 'Innovation Hub', to: '/spaces' },
  { label: 'Membership', to: '/membership' },
];

const partnerLinks = [
  {
    label: 'Become a Partner',
    to: '/partners',
    icon: Handshake,
  },
  {
    label: 'Sponsor NIVOX',
    to: '/sponsor',
    icon: Award,
  },
  {
    label: 'Universities',
    to: '/universities',
    icon: GraduationCap,
  },
  {
    label: 'Corporate Partners',
    to: '/corporate-partners',
    icon: Building2,
  },
  {
    label: 'Download Prospectus',
    to: '/prospectus',
    icon: FileText,
  },
];

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
              <Link to="/membership">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd54a] px-6 py-3.5 text-sm font-semibold text-[#2b0a5a]"
                >
                  Join the Waitlist
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link to="/community">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur"
                >
                  Become a Partner
                </motion.button>
              </Link>
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
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffd54a]/15 text-[#ffd54a] shadow-[0_0_24px_rgba(255,213,74,0.18)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black tracking-[0.2em] text-white">NIVOX</p>
                <p className="text-sm text-[#ffe7a3]">Shaping Tomorrow, Today.</p>
              </div>
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/70">
              NIVOX is a modern student hub designed to provide technology, innovation and collaborative spaces for the next generation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.button
                    key={social.label}
                    onClick={() => toast.success(`${social.label} channel link initialized`)}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#ffd54a] backdrop-blur"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.button>
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
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors duration-200 hover:text-[#ffd54a]">
                    {link.label}
                  </Link>
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
                <li key={link.label}>
                  <Link to={link.to} className="transition-colors duration-200 hover:text-[#ffd54a]">
                    {link.label}
                  </Link>
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
            <ul className="mt-4 space-y-1.5">
              {partnerLinks.map((link) => {
                const Icon = link.icon;
                const innerContent = (
                  <motion.div
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={link.action}
                    className="group flex min-h-[38px] cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-xs font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-[#ffd54a]"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#ffd54a] transition-colors group-hover:bg-[#ffd54a]/20">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="flex-1 leading-snug">{link.label}</span>
                    <ChevronRight className="h-3 w-3 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-[#ffd54a]" />
                  </motion.div>
                );

                return (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="block">
                        {innerContent}
                      </Link>
                    ) : (
                      innerContent
                    )}
                  </li>
                );
              })}
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
              <button onClick={() => toast.info('Privacy Policy & Data Security terms coming soon.')} className="transition-colors duration-200 hover:text-[#ffd54a]">
                Privacy Policy
              </button>
              <button onClick={() => toast.info('Terms of Use & Community Guidelines coming soon.')} className="transition-colors duration-200 hover:text-[#ffd54a]">
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
