import { twMerge } from 'tailwind-merge';

const Checkbox = ({ label, className = '', ...props }) => {
  return (
    <label className={twMerge('flex items-center gap-3 text-sm text-white/75', className)}>
      <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent accent-[#FFD54A]" {...props} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
