import { twMerge } from 'tailwind-merge';

const cardBase = 'rounded-[24px] border border-white/10 bg-white/10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150';

export const GlassCard = ({ children, className = '', padded = true, hover = false, as: Component = 'div', ...props }) => {
  return (
    <Component
      className={twMerge(
        cardBase,
        padded ? 'p-6 sm:p-8' : '',
        hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(20,7,38,0.35)]' : '',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const FeatureCard = ({ children, className = '', icon: Icon, title, description, ...props }) => {
  return (
    <GlassCard className={twMerge('group', className)} hover {...props}>
      {Icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
          <Icon className="h-5 w-5" />
        </div>
      )}
      {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
      {description && <p className="mt-3 text-sm leading-7 text-white/70">{description}</p>}
      {children}
    </GlassCard>
  );
};

export const StatisticCard = ({ value, label, className = '' }) => {
  return (
    <div className={twMerge('rounded-[24px] border border-white/15 bg-white/10 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl', className)}>
      <div className="text-3xl font-black text-white sm:text-4xl">{value}</div>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">{label}</p>
    </div>
  );
};

export const PricingCard = ({ title, price, description, features, featured = false, action, className = '' }) => {
  return (
    <GlassCard className={twMerge('relative', featured ? 'border-[#FFD54A]/35 bg-[#FFD54A]/10' : '', className)} hover>
      {featured && (
        <div className="absolute right-4 top-4 rounded-full bg-[#FFD54A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2B0A5A]">
          Popular
        </div>
      )}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/70">{description}</p>
      <div className="mt-6 text-4xl font-black text-white">{price}</div>
      <ul className="mt-6 space-y-3 text-sm text-white/70">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="text-[#FFD54A]">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {action && <div className="mt-8">{action}</div>}
    </GlassCard>
  );
};

export const PartnerCard = ({ name, subtitle, icon: Icon, className = '' }) => {
  return (
    <div className={twMerge('rounded-[20px] border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] p-5 text-center backdrop-blur', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD54A]/30 bg-[#FFD54A]/10 text-[#FFD54A]">
        {Icon ? <Icon className="h-6 w-6" /> : null}
      </div>
      <h4 className="mt-4 text-lg font-semibold text-white">{name}</h4>
      {subtitle && <p className="mt-2 text-sm text-white/60">{subtitle}</p>}
    </div>
  );
};

export default GlassCard;
