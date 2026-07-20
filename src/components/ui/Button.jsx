import { forwardRef } from 'react';

const buttonVariants = {
  primary: 'bg-[#FACC15] text-[#140726] hover:bg-[#fcd34d] shadow-[0_10px_35px_rgba(250,204,21,0.25)]',
  secondary: 'bg-white/10 text-white border border-white/15 hover:bg-white/20',
  ghost: 'bg-transparent text-white/80 hover:bg-white/10 hover:text-white',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    as: Component = 'button',
    ...props
  },
  ref,
) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  return (
    <Component
      ref={ref}
      className={[
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/60 disabled:cursor-not-allowed disabled:opacity-60',
        sizeClasses[size],
        buttonVariants[variant] || buttonVariants.primary,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
