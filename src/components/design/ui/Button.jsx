import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-[#FFD54A] text-[#2B0A5A] hover:bg-[#ffe07d] shadow-[0_12px_35px_rgba(255,213,74,0.24)]',
  secondary: 'bg-white/10 text-white border border-white/15 hover:bg-white/20',
  outline: 'border border-[#2B0A5A]/15 bg-transparent text-[#2B0A5A] hover:bg-[#2B0A5A]/5',
  ghost: 'bg-transparent text-[#2B0A5A] hover:bg-[#2B0A5A]/5',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    className = '',
    as: Component = 'button',
    ...props
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={twMerge(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFD54A]/50 disabled:cursor-not-allowed disabled:opacity-60',
        sizes[size],
        variants[variant] || variants.primary,
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </span>
      ) : (
        children
      )}
    </Component>
  );
});

export default Button;
