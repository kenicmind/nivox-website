const Container = ({ children, className = '', size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <div
      className={['mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size] || sizeClasses.default, className].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
