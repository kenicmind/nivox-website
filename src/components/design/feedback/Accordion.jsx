import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Accordion = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={twMerge('space-y-3', className)}>
      {items.map((item, index) => (
        <div key={item.title} className="rounded-[20px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
          <button className="flex w-full items-center justify-between text-left" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
            <span className="text-sm font-semibold text-white">{item.title}</span>
            <ChevronDown className={['h-4 w-4 text-[#FFD54A] transition-transform duration-200', openIndex === index ? 'rotate-180' : ''].join(' ')} />
          </button>
          {openIndex === index && <p className="mt-3 text-sm leading-7 text-white/70">{item.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
