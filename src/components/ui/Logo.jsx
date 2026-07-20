const Logo = ({
  className = '',
  textClassName = '',
  imageClassName = '',
  showText = true,
  src = '/images/logo.png',
  alt = 'NIVOX logo',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  return (
    <div className={['flex items-center gap-3', className].join(' ')}>
      <img
        src={src}
        alt={alt}
        className={['rounded-full object-contain shadow-[0_0_30px_rgba(250,204,21,0.15)]', sizeClasses[size] || sizeClasses.md, imageClassName].join(' ')}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={['text-lg font-semibold tracking-[0.25em] text-white', textClassName].join(' ')}>NIVOX</span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#FACC15]">Premium</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
