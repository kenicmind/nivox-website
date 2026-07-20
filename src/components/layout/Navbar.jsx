import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/spaces', label: 'Spaces' },
  { to: '/events', label: 'Events' },
  { to: '/community', label: 'Community' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-6xl"
    >
      <nav className="flex items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 sm:px-6">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="NIVOX Logo"
              className="h-12 w-12 rounded-full object-cover shadow-md border-2 border-yellow-400"
            />

            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                NIVOX
              </h1>
              <p className="text-xs text-gray-300">
                Shaping Tomorrow, Today
              </p>
            </div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-medium text-white/80 transition-all duration-200 hover:text-white ${isActive ? 'text-white' : ''}`
              }
            >
              {({ isActive }) => (
                <span className="relative inline-flex items-center">
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#FACC15] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/20 hover:text-white"
            type="button"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#FACC15] px-4 py-2 text-sm font-semibold text-[#140726] shadow-[0_10px_35px_rgba(250,204,21,0.25)] transition hover:brightness-110"
            type="button"
          >
            Get Started
          </motion.button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-3 rounded-[24px] border border-white/15 bg-[#140726]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                  type="button"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-[#FACC15] px-4 py-2 text-sm font-semibold text-[#140726]"
                  type="button"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
