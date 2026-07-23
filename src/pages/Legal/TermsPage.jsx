import React from 'react';
import { ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { GlassCard } from '../../components/design/ui/Card';

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFD54A]" />
              Legal & Platform Compliance
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Operating rules, workspace guidelines, and service agreements for NIVOX members.
            </p>
          </div>
        </div>
      </section>

      <GlassCard className="space-y-6 text-xs text-white/80 leading-relaxed">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">1. Workspace Access & Pricing</h3>
          <p>NIVOX workspace access is billed at ₦300 for a 2-hour session slot. All reservations must be confirmed and paid via Paystack before seat access is granted at the hub.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">2. Seat Assignment & Check-in</h3>
          <p>Reservations bind students to specific assigned desk and pod numbers. Members must present their digital entry pass QR code at the reception desk for check-in.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">3. Cancellation & Refund Policy</h3>
          <p>Eligible reservations may be cancelled up to 1 hour prior to session start. Credit refunds or reschedule passes are applied to the student's NIVOX wallet.</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default TermsPage;
