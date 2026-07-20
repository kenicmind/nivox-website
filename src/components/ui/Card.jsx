const Card = ({
  children,
  className = '',
  padded = true,
  hover = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={[
        'rounded-[24px] border border-white/10 bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150',
        padded ? 'p-6 sm:p-8' : '',
        hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(20,7,38,0.35)]' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
