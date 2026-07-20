export const DisplayHeading = ({ children, className = '' }) => <h1 className={['text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white', className].join(' ')}>{children}</h1>;

export const PageHeading = ({ children, className = '' }) => <h2 className={['text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white', className].join(' ')}>{children}</h2>;

export const SectionHeading = ({ children, className = '' }) => <h3 className={['text-2xl sm:text-3xl font-semibold tracking-tight text-white', className].join(' ')}>{children}</h3>;

export const BodyText = ({ children, className = '' }) => <p className={['text-base leading-7 text-white/75', className].join(' ')}>{children}</p>;

export const SmallText = ({ children, className = '' }) => <p className={['text-sm leading-6 text-white/70', className].join(' ')}>{children}</p>;

export const Caption = ({ children, className = '' }) => <p className={['text-xs uppercase tracking-[0.28em] font-semibold text-[#FFD54A]', className].join(' ')}>{children}</p>;
