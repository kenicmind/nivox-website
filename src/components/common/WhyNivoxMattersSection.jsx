import { motion } from "framer-motion";
import {
  Wifi,
  Lightbulb,
  Users,
  Briefcase,
  Camera,
  Rocket,
} from "lucide-react";

const items = [
  {
    icon: Wifi,
    title: "Digital Access",
    description:
      "Reliable internet, uninterrupted power, and modern technology that remove barriers to learning and innovation.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "A place where ideas become projects, projects become startups, and students become innovators.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Meet students from different disciplines, share ideas, and build meaningful connections that inspire growth.",
  },
  {
    icon: Briefcase,
    title: "Career Development",
    description:
      "Build practical skills, strengthen your portfolio, and prepare for internships, employment, and entrepreneurship.",
  },
  {
    icon: Camera,
    title: "Creative Studios",
    description:
      "Professional spaces for photography, videography, podcasting, graphic design, and digital content creation.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurship",
    description:
      "Turn innovative ideas into real businesses through mentorship, networking, and collaboration.",
  },
];

const WhyNivoxMattersSection = () => {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
            Why Choose NIVOX
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Why NIVOX Matters
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/70">
            More than a workspace, NIVOX is an ecosystem designed to empower
            students with technology, creativity, collaboration, and
            opportunities that prepare them for the future.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/15 text-yellow-400">
                  <Icon size={28} />
                </div>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="leading-8 text-white/70">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyNivoxMattersSection;