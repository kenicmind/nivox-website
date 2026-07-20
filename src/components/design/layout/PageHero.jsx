import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

const PageHero = ({ eyebrow, title, subtitle, actions, className = '' }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={twMerge('overflow-hidden rounded-[36px] border border-white/10 bg-white/10 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-10 lg:p-14', className)}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-[#FFE7A3]">
              <Sparkles className="h-4 w-4 text-[#FFD54A]" />
              {eyebrow}
            </div>
          )}
          {title && <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>}
          {subtitle && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </motion.header>
  );
};

export default PageHero;
