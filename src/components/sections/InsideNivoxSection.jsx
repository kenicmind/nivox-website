import { useState } from "react";
import { motion } from "framer-motion";
import {
  Library,
  Laptop2,
  Headphones,
  Users,
  Rocket,
} from "lucide-react";

const spaces = [
  {
    title: "Study Zone",
    icon: Library,
    description:
      "A quiet environment with fast internet, comfortable seating, and digital resources for focused learning.",
    features: [
      "High-speed Wi-Fi",
      "Comfortable study desks",
      "Power outlets",
      "Research resources",
    ],
  },
  {
    title: "Tech Lab",
    icon: Laptop2,
    description:
      "Modern computers and software for coding, design, AI, and software development.",
    features: [
      "High-performance PCs",
      "Programming tools",
      "Design software",
      "AI workstations",
    ],
  },
  {
    title: "Creator Studio",
    icon: Headphones,
    description:
      "A professional space for content creators, podcasters, photographers, and video editors.",
    features: [
      "Podcast setup",
      "Video recording",
      "Photo studio",
      "Editing stations",
    ],
  },
  {
    title: "Collaboration Hub",
    icon: Users,
    description:
      "A flexible space where students collaborate on projects, hackathons, and workshops.",
    features: [
      "Meeting tables",
      "Brainstorming boards",
      "Project discussions",
      "Networking events",
    ],
  },
  {
    title: "Startup Corner",
    icon: Rocket,
    description:
      "Helping students transform innovative ideas into startups through mentorship and community.",
    features: [
      "Startup mentoring",
      "Pitch practice",
      "Innovation sessions",
      "Business support",
    ],
  },
];

const InsideNivoxSection = () => {
  const [selected, setSelected] = useState(spaces[0]);

  return (
    <section className="... py-28 lg:py-32 ...">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <h2 className="text-4xl font-black text-[#2B0A5A]">
            Inside NIVOX
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover the different spaces that make NIVOX the future student hub.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Left Side */}

          <div className="space-y-4">
            {spaces.map((space) => {
              const Icon = space.icon;

              return (
                <motion.button
                  key={space.title}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelected(space)}
                  className={`w-full rounded-3xl border p-6 text-left transition ${
                    selected.title === space.title
                      ? "border-[#FFD54A] bg-[#2B0A5A] text-white"
                      : "border-gray-200 bg-white hover:border-[#FFD54A]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-[#FFD54A]/20 p-3">
                      <Icon className="h-6 w-6 text-[#FFD54A]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {space.title}
                      </h3>

                      <p className="text-sm opacity-80">
                        {space.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Side */}

          <motion.div
            key={selected.title}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[32px] bg-[#2B0A5A] p-10 text-white"
          >
            <h3 className="text-3xl font-bold">
              {selected.title}
            </h3>

            <p className="mt-6 text-white/80 leading-8">
              {selected.description}
            </p>

            <div className="mt-8 space-y-4">
              {selected.features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/10 p-3"
                >
                  <div className="h-2 w-2 rounded-full bg-[#FFD54A]" />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default InsideNivoxSection;