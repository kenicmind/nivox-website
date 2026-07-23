import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { GlassCard } from '../../components/design/ui/Card';

const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Lock className="h-3.5 w-3.5 text-[#FFD54A]" />
              Data Privacy & Security
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-white/70">
              How NIVOX protects, encrypts, and handles your personal information.
            </p>
          </div>
        </div>
      </section>

      <GlassCard className="space-y-6 text-xs text-white/80 leading-relaxed">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">1. Personal Data Collection</h3>
          <p>We collect student full names, email addresses, phone numbers, and institutional details to manage hub reservations and generate digital entry passes.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">2. Payment Security</h3>
          <p>NIVOX does not store credit card details. All financial transactions are processed securely via Paystack API using industry-standard PCI-DSS encryption.</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default PrivacyPage;
