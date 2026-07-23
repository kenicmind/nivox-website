import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Cpu, LineChart, Sparkles, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/design/ui/Button';

const corporatePillars = [
  {
    title: 'Vetted Tech Talent Sourcing',
    description: 'Pre-screened software developers, UI/UX designers, data analysts, and digital creators ready for entry-level roles.',
  },
  {
    title: 'Corporate Innovation Sprints',
    description: 'Outsource real-world business challenges to student team hackathons for rapid prototyping & fresh solutions.',
  },
  {
    title: 'ESG & Youth Empowerment Impact',
    description: 'Fulfill corporate social responsibility metrics by funding digital skills & connectivity for Nigerian youth.',
  },
  {
    title: 'Product & SDK Adoption',
    description: 'Drive developer adoption for your API, cloud platform, or developer tools among student builders.',
  },
];

const CorporatePartnersPage = () => {
  const handleCorporateSubmit = (e) => {
    e.preventDefault();
    toast.success('Corporate partnership request received! Our corporate relations manager will contact you.');
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
            <Building2 className="h-4 w-4 text-[#FFD54A]" />
            Corporate Innovation Partnerships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Drive Corporate Innovation.
            <br />
            Access Tomorrow's Talent.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Partner with NIVOX to recruit top tech graduates, run sponsored hackathons, and position your brand at the center of youth innovation.
          </motion.p>
        </div>
      </section>

      {/* CORPORATE PILLARS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2B0A5A]">Corporate Value</p>
          <h2 className="mt-3 text-3xl font-black text-[#2B0A5A] sm:text-4xl">Why Corporations Partner With NIVOX</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {corporatePillars.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-[#2B0A5A]/10 bg-white p-6 shadow-md">
              <div className="flex items-center gap-3 text-[#2B0A5A]">
                <CheckCircle2 className="h-6 w-6 text-[#FFD54A]" />
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[32px] border border-[#2B0A5A]/10 bg-[#faf8ff] p-8 shadow-lg sm:p-10">
            <h3 className="text-2xl font-black text-[#2B0A5A]">Schedule a Corporate Consultation</h3>
            <p className="mt-2 text-sm text-gray-600">Discover tailored corporate partnership options for your brand and hiring goals.</p>

            <form onSubmit={handleCorporateSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Company Name</label>
                  <input required type="text" placeholder="e.g. Globacom / MTN / Paystack" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Work Email</label>
                  <input required type="email" placeholder="hr@corporate.com" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full justify-center">
                Request Corporate Meeting
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CorporatePartnersPage;
