import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MembershipPage = () => {
  return (
    <main className="overflow-hidden bg-[#faf8ff]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2b0a5a_0%,#40107a_100%)]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFD54A,transparent_35%)] opacity-10" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54A]"
          >
            Membership
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-5xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Unlock Your
            <br />
            NIVOX Experience.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-3xl text-xl leading-9 text-white/80"
          >
            Join a community designed to help students learn, create,
            collaborate and innovate in a modern, future-ready environment.
          </motion.p>

          <motion.a
            href="#membership-benefits"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a]"
          >
            Explore Membership

            <ArrowRight size={20} />
          </motion.a>

        </div>

      </section>
    
    {/* ================= MEMBERSHIP BENEFITS ================= */}

    <section id="membership-benefits"
    className="mx-auto max-w-7xl px-6 py-24"
    >

    <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
        Membership Benefits
        </p>

        <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
        Everything You Need to Succeed
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
        As a NIVOX member, you'll gain access to resources, spaces and
        opportunities that support your academic, personal and professional growth.
        </p>

    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {[
          {
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
            title: "High-Speed Internet",
            text: "Reliable gigabit internet for studying, research and online learning."
          },
          {
            image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
            title: "Modern Workspaces",
            text: "Comfortable ergonomic spaces designed for deep focus and collaboration."
          },
          {
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
            title: "Exclusive Events",
            text: "Priority access to workshops, hackathons and founder talks."
          },
          {
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
            title: "Community Access",
            text: "Connect with ambitious students, mentors and startup founders."
          }

        ].map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.08
            }}
            whileHover={{
              y: -8,
              scale: 1.02
            }}
            className="overflow-hidden rounded-[30px] border border-[#ebe3ff] bg-white p-6 shadow-lg transition-all"
          >

            <div className="relative h-44 overflow-hidden rounded-[22px] mb-5">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b0a5a]/40 via-transparent to-transparent" />
            </div>

            <h3 className="text-2xl font-bold text-[#2b0a5a]">
              {item.title}
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              {item.text}
            </p>

          </motion.div>

        ))}

    </div>

    </section>

    {/* ================= HOW MEMBERSHIP WORKS ================= */}

    <section className="bg-white py-24">

    <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
            How It Works
        </p>

        <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
            Becoming a Member is Simple
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Join NIVOX in just a few easy steps and start enjoying a modern
            learning environment designed for your success.
        </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {[
            {
            number: "01",
            title: "Register",
            text: "Complete your membership application with your basic details."
            },
            {
            number: "02",
            title: "Verification",
            text: "Your application is reviewed to confirm your student information."
            },
            {
            number: "03",
            title: "Activate Membership",
            text: "Receive your membership approval and access to NIVOX."
            },
            {
            number: "04",
            title: "Start Exploring",
            text: "Enjoy our workspaces, events, community and future opportunities."
            }

        ].map((step, index) => (

            <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.08
            }}
            whileHover={{
                y: -10,
                scale: 1.03
            }}
            className="relative rounded-[30px] border border-[#ebe3ff] bg-[#faf8ff] p-8 shadow-lg"
            >

            <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD54A] text-lg font-black text-[#2b0a5a]">
                {step.number}
            </div>

            <h3 className="mt-8 text-2xl font-bold text-[#2b0a5a]">
                {step.title}
            </h3>

            <p className="mt-5 leading-8 text-gray-600">
                {step.text}
            </p>

            </motion.div>

        ))}

        </div>

    </div>

    </section>

    </main>
  );
};

export default MembershipPage;