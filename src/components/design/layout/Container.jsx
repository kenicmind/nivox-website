import { twMerge } from 'tailwind-merge';

const sizes = {
  sm: 'max-w-4xl',
  default: 'max-w-6xl',
  lg: 'max-w-7xl',
  full: 'max-w-none',
};

const Container = ({ children, className = '', size = 'default', ...props }) => {
  return (
    <div className={twMerge('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size] || sizes.default, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
