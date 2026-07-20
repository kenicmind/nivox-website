import { twMerge } from 'tailwind-merge';

const PageHeader = ({ title, subtitle, actions, className = '' }) => {
  return (
    <div className={twMerge('mb-8 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
};

export default PageHeader;
