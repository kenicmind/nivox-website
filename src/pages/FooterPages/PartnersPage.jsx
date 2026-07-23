import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, Handshake, Rocket, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/design/ui/Button';
import { GlassCard } from '../../components/design/ui/Card';

const pillars = [
  {
    title: 'Talent & Recruitment',
    description: 'Direct pipeline to skilled student developers, designers, product managers, and digital creators.',
    icon: Users,
    accent: 'from-[#FFD54A]/20 to-[#FFD54A]/5',
  },
  {
    title: 'Hub & Space Co-Branding',
    description: 'Sponsor dedicated learning zones, computer labs, or podcast studios with your brand presence.',
    icon: Building2,
    accent: 'from-purple-500/20 to-purple-500/5',
  },
  {
    title: 'Events & Hackathons',
    description: 'Host tech workshops, innovation sprints, and developer challenges with NIVOX student members.',
    icon: Rocket,
    accent: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    title: 'Equipment & Tech Support',
    description: 'Equip NIVOX labs with hardware, software licenses, or digital infrastructure for high impact.',
    icon: Handshake,
    accent: 'from-amber-500/20 to-amber-500/5',
  },
];

const PartnersPage = () => {
  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    toast.success('Partnership inquiry submitted successfully! Our team will contact you shortly.');
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
            <Sparkles className="h-4 w-4 text-[#FFD54A]" />
            NIVOX Partnerships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Partner With NIVOX.
            <br />
            Shape Tomorrow's Innovators.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Join visionary organizations, technology leaders, and academic institutions in building West Africa's premiere student innovation ecosystem.
          </motion.p>
        </div>
      </section>

      {/* PARTNERSHIP PILLARS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2B0A5A]">Partnership Models</p>
          <h2 className="mt-3 text-3xl font-black text-[#2B0A5A] sm:text-4xl">How We Collaborate</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-[28px] border border-[#2B0A5A]/10 bg-white p-6 shadow-md transition-all"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-[#2B0A5A]`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#2B0A5A]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[32px] border border-[#2B0A5A]/10 bg-[#faf8ff] p-8 shadow-lg sm:p-10">
            <h3 className="text-2xl font-black text-[#2B0A5A]">Become an Official NIVOX Partner</h3>
            <p className="mt-2 text-sm text-gray-600">Fill out your organization details and our partnership director will reach out within 24 hours.</p>

            <form onSubmit={handlePartnerSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Organization / Company Name</label>
                <input required type="text" placeholder="e.g. Acme Tech Solutions" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Contact Email</label>
                  <input required type="email" placeholder="partner@company.com" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Phone Number</label>
                  <input type="tel" placeholder="+234 801 234 5678" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Partnership Intent</label>
                <textarea rows={3} placeholder="Tell us how you would like to collaborate with NIVOX..." className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
              </div>
              <Button type="submit" variant="primary" className="w-full justify-center">
                Submit Partnership Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnersPage;
