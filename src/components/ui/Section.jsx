const Section = ({
  children,
  className = '',
  title,
  subtitle,
  centered = false,
  ...props
}) => {
  return (
    <section className={['py-16 sm:py-20', className].join(' ')} {...props}>
      {(title || subtitle) && (
        <div className={['mb-10', centered ? 'text-center' : ''].join(' ')}>
          {title && <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>}
          {subtitle && <p className="mt-3 max-w-2xl text-base text-white/70">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
