import { twMerge } from 'tailwind-merge';

const Textarea = ({ className = '', label, error, ...props }) => {
  return (
    <label className="block w-full">
      {label && <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>}
      <textarea
        className={twMerge(
          'min-h-[120px] w-full rounded-[20px] border border-white/15 bg-[#13022B] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#FFD54A]/40',
          error ? 'border-red-400' : '',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </label>
  );
};

export default Textarea;
