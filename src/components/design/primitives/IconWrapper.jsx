import { twMerge } from 'tailwind-merge';

export const StandardIconWrapper = ({ children, className = '' }) => (
  <div className={twMerge('flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]', className)}>
    {children}
  </div>
);

export const LargeIconCard = ({ children, className = '' }) => (
  <div className={twMerge('flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#FFD54A]/15 text-[#FFD54A] shadow-[0_0_24px_rgba(255,213,74,0.18)]', className)}>
    {children}
  </div>
);

export const NavigationIcon = ({ children, className = '' }) => (
  <div className={twMerge('flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80', className)}>
    {children}
  </div>
);
