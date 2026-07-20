import { twMerge } from 'tailwind-merge';

const badgeBase = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]';

export const PrimaryBadge = ({ children, className = '' }) => <span className={twMerge(badgeBase, 'bg-[#FFD54A] text-[#2B0A5A]', className)}>{children}</span>;

export const SuccessBadge = ({ children, className = '' }) => <span className={twMerge(badgeBase, 'bg-emerald-500/15 text-emerald-300', className)}>{children}</span>;

export const WarningBadge = ({ children, className = '' }) => <span className={twMerge(badgeBase, 'bg-amber-500/15 text-amber-300', className)}>{children}</span>;

export const OutlineBadge = ({ children, className = '' }) => <span className={twMerge(badgeBase, 'border border-white/15 bg-white/10 text-white/80', className)}>{children}</span>;
