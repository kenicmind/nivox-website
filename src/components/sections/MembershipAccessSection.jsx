import { motion } from 'framer-motion';
import { Laptop, Sparkles, Users, Wifi } from 'lucide-react';

const benefits = [
  {
    title: 'Always Connected',
    description: 'Reliable internet for research, classes and digital work.',
    icon: Wifi,
  },
  {
    title: 'Work Without Limits',
    description: 'Access modern technology and productivity tools.',
    icon: Laptop,
  },
  {
    title: 'Join a Community',
    description: 'Connect with students, creators and innovators.',
    icon: Users,
  },
];

const MembershipAccessSection = () => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_24%),linear-gradient(135deg,#fffdfd_0%,#f7f3ff_50%,#fbfbfe_100%)] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute left-[-4%] top-10 h-40 w-40 rounded-full bg-[#2b0a5a]/10 blur-3xl" />
      <div className="absolute bottom-[-3%] right-[-4%] h-44 w-44 rounded-full bg-[#ffd54a]/25 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(43,10,90,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,10,90,0.45)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2b0a5a]/10 bg-white/85 px-4 py-2 text-sm font-medium text-[#2b0a5a] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#ffd54a]" />
            NIVOX ACCESS
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#2b0a5a] sm:text-4xl lg:text-5xl">
            One Pass. A World of Possibilities.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Your NIVOX access gives you the environment, tools and community you need to study, create and build the future.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_70px_rgba(43,10,90,0.10)] backdrop-blur-xl sm:p-10"
          >
            <div className="rounded-[24px] border border-[#2b0a5a]/10 bg-gradient-to-br from-[#2b0a5a] to-[#3f0f73] p-8 text-white shadow-[0_20px_60px_rgba(43,10,90,0.2)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffd54a]">Daily Access</p>
                  <h3 className="mt-2 text-3xl font-black">₦300</h3>
                  <p className="mt-2 text-sm text-white/70">per day</p>
                </div>
                <div className="rounded-2xl bg-[#ffd54a]/15 p-3 text-[#ffd54a]">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 space-y-3 text-sm text-white/85">
                {[
                  'High-Speed Internet',
                  'Comfortable Workspace',
                  'Charging Stations',
                  'Digital Learning Resources',
                  'Access to Community Spaces',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <span className="text-[#ffd54a]">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm leading-7 text-white/70">
                Designed to keep the hub affordable and accessible for every student.
              </p>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="rounded-[28px] border border-[#2b0a5a]/10 bg-white/80 p-6 shadow-[0_18px_55px_rgba(43,10,90,0.08)] backdrop-blur-xl"
            >
              <h3 className="text-2xl font-semibold text-[#2b0a5a]">Why NIVOX Access?</h3>
              <p className="mt-3 text-base leading-7 text-gray-600">
                Unlock the full student experience with flexible access built for focus, connection and momentum.
              </p>
            </motion.div>

            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[24px] border border-[#2b0a5a]/10 bg-white/80 p-5 shadow-[0_16px_50px_rgba(43,10,90,0.08)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ffd54a]/20 text-[#2b0a5a]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#2b0a5a]">{benefit.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipAccessSection;
