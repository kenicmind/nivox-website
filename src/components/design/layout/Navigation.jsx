import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/Button';

export const DesktopNavigation = ({ links = [], className = '' }) => {
  return (
    <nav className={twMerge('hidden items-center gap-2 lg:flex', className)}>
      {links.map((link) => (
        <a key={link.label} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white">
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export const MobileNavigation = ({ links = [], className = '' }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={twMerge('lg:hidden', className)}>
      <button onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/15 bg-white/10 p-2 text-white">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="mt-3 rounded-[24px] border border-white/15 bg-[#140726]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="rounded-full px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Breadcrumb = ({ items = [], className = '' }) => {
  return (
    <nav className={twMerge('flex flex-wrap items-center gap-2 text-sm text-white/70', className)}>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          <a href={item.href || '#'} className="transition hover:text-white">
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  );
};
