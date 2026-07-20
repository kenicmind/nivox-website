import { twMerge } from 'tailwind-merge';

const SectionHeader = ({ title, subtitle, centered = false, eyebrow, className = '' }) => {
  return (
    <div className={twMerge('mb-10', centered ? 'text-center' : '', className)}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD54A]">{eyebrow}</p>}
      {title && <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>}
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-base text-white/70">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
