import { twMerge } from 'tailwind-merge';

const Tooltip = ({ children, label, className = '' }) => {
  return (
    <div className="group relative inline-flex">
      {children}
      <span className={twMerge('pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-full bg-[#13022B] px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100', className)}>
        {label}
      </span>
    </div>
  );
};

export default Tooltip;
