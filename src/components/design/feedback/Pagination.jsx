import { twMerge } from 'tailwind-merge';

const Pagination = ({ current, total, onPageChange, className = '' }) => {
  return (
    <div className={twMerge('flex items-center justify-center gap-2', className)}>
      {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={twMerge('h-10 w-10 rounded-full text-sm font-medium transition', current === page ? 'bg-[#FFD54A] text-[#2B0A5A]' : 'bg-white/10 text-white/80 hover:bg-white/20')}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
