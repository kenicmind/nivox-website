import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { GlassCard } from '../../components/design/ui/Card';

const FAQS = [
  { q: 'How much does a workspace session cost?', a: 'All workspace sessions at NIVOX are priced at ₦300 for a 2-hour duration slot.' },
  { q: 'How do I check in at the NIVOX Hub?', a: 'Open "My Tickets" or your confirmation receipt and present your digital QR entry pass to the receptionist for check-in.' },
  { q: 'Can I choose my specific desk?', a: 'Yes! The booking system provides a visual seat map allowing you to select your exact seat number.' },
  { q: 'What is the cancellation policy?', a: 'You can cancel any upcoming reservation up to 1 hour before the session start time.' },
];

const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <HelpCircle className="h-3.5 w-3.5 text-[#FFD54A]" />
              Support & Help Vault
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Quick answers to workspace reservations, pricing, seat maps, and check-ins.
            </p>
          </div>
        </div>
      </section>

      <GlassCard className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="flex w-full items-center justify-between font-bold text-white text-sm text-left"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`h-4 w-4 text-[#FFD54A] transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <p className="mt-3 text-white/70 leading-relaxed border-t border-white/10 pt-3">{faq.a}</p>
            )}
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

export default FaqPage;
