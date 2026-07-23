import { motion } from 'framer-motion';
import { Download, FileText, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/design/ui/Button';

const ProspectusPage = () => {
  const handleDownloadProspectus = () => {
    toast.success('NIVOX 2026 Partnership Prospectus download initialized!');
  };

  return (
    <main className="overflow-hidden bg-[#faf8ff]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2b0a5a_0%,#40107a_100%)] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFD54A,transparent_35%)] opacity-15" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD54A]"
          >
            <FileText className="h-4 w-4 text-[#FFD54A]" />
            Official Documentation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            NIVOX Partnership Prospectus 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            The comprehensive guide to NIVOX student innovation hubs, hub infrastructure, membership demographics, and partnership opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <Button onClick={handleDownloadProspectus} variant="primary" className="gap-2 shadow-lg">
              <Download className="h-4 w-4" />
              Download Prospectus PDF (5.2 MB)
            </Button>
          </motion.div>
        </div>
      </section>

      {/* PROSPECTUS OVERVIEW CARD */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#2B0A5A]/10 bg-white p-8 shadow-xl sm:p-12">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#2B0A5A]">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#2B0A5A]">What's Inside the Prospectus</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Edition 2.0 • 2026 Fiscal & Impact Overview</p>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm text-gray-700">
            {[
              'Executive Summary & Mission Roadmap',
              'Hub Space Specifications & Digital Equipment Audit',
              'Student Demographics across 20+ Nigerian Tertiary Institutions',
              'Partnership & Sponsorship Tier Breakdown (Platinum, Gold, Silver)',
              'Corporate Talent Pipeline & Internship Guarantee Framework',
              'Financial Projections & Social Impact Metrics',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#faf8ff] p-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#2B0A5A]" />
                <span className="font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <div className="text-xs text-gray-500">Official document verified by NIVOX Board of Directors.</div>
            <Button onClick={handleDownloadProspectus} variant="primary" className="gap-2">
              <Download className="h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProspectusPage;
