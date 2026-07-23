import { motion } from 'framer-motion';
import { Award, CheckCircle2, Crown, Sparkles, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/design/ui/Button';

const tiers = [
  {
    name: 'Platinum Sponsor',
    price: '₦2,500,000 / yr',
    icon: Crown,
    popular: true,
    accent: 'border-[#FFD54A] bg-[#2B0A5A] text-white',
    benefits: [
      'Naming rights for NIVOX Innovation Lab',
      'VIP keynote speaking at all NIVOX Hackathons',
      'Exclusive recruitment access to top 5% student talent',
      'Prominent logo placement across all hub spaces & media',
    ],
  },
  {
    name: 'Gold Sponsor',
    price: '₦1,000,000 / yr',
    icon: Award,
    popular: false,
    accent: 'border-[#2B0A5A]/15 bg-white text-[#2B0A5A]',
    benefits: [
      'Sponsor dedicated workstation pod',
      'Host quarterly tech workshops & challenges',
      'Direct email newsletter reach to 1,200+ students',
      'Logo on website & event banners',
    ],
  },
  {
    name: 'Silver Sponsor',
    price: '₦500,000 / yr',
    icon: Star,
    popular: false,
    accent: 'border-[#2B0A5A]/15 bg-white text-[#2B0A5A]',
    benefits: [
      'Sponsor student access scholarships',
      'Access to student project showcase gallery',
      'Logo on partner wall in hub lounge',
      'Social media highlight feature',
    ],
  },
];

const SponsorPage = () => {
  const handleSponsorClick = (tierName) => {
    toast.success(`${tierName} sponsorship request initiated! We will email you the official package.`);
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
            Sponsor NIVOX
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Empower Student Innovators.
            <br />
            Sponsor NIVOX Programs.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Your sponsorship directly funds high-speed internet access, hardware workstations, digital skills training, and hackathons for ambitious tertiary students.
          </motion.p>
        </div>
      </section>

      {/* SPONSORSHIP TIERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2B0A5A]">Sponsorship Packages</p>
          <h2 className="mt-3 text-3xl font-black text-[#2B0A5A] sm:text-4xl">Choose Your Impact Level</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex flex-col justify-between rounded-[32px] border p-8 shadow-lg transition-all duration-300 hover:border-[#FFD54A] hover:shadow-[0_25px_65px_rgba(255,213,74,0.3)] ${tier.accent}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#FFD54A]/40 bg-[#FFD54A] px-4 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[#140726] shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.25em]">{tier.name}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#FFD54A] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-3xl font-black tracking-tight">{tier.price}</h3>

                  <ul className="mt-6 space-y-3.5 text-sm opacity-90">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FFD54A] transition-transform duration-200 group-hover:scale-110" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleSponsorClick(tier.name)}
                  variant="primary"
                  className="mt-8 w-full justify-center shadow-md transition-shadow duration-300 group-hover:shadow-[0_10px_25px_rgba(255,213,74,0.35)]"
                >
                  Select {tier.name}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default SponsorPage;
