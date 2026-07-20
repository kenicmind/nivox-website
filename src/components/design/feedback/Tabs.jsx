import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Tabs = ({ items, className = '' }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button key={item.label} onClick={() => setActive(index)} className={twMerge('rounded-full px-4 py-2 text-sm font-medium transition', active === index ? 'bg-[#FFD54A] text-[#2B0A5A]' : 'bg-white/10 text-white/75 hover:bg-white/20')}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-[24px] border border-white/15 bg-white/10 p-6 text-white/75 backdrop-blur-xl">
        {items[active]?.content}
      </div>
    </div>
  );
};

export default Tabs;
