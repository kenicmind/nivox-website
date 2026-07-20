import { twMerge } from 'tailwind-merge';

const Select = ({ className = '', label, error, children, ...props }) => {
  return (
    <label className="block w-full">
      {label && <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>}
      <select
        className={twMerge(
          'w-full rounded-full border border-white/15 bg-[#13022B] px-4 py-3 text-sm text-white outline-none focus:border-[#FFD54A]/40',
          error ? 'border-red-400' : '',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </label>
  );
};

export default Select;
