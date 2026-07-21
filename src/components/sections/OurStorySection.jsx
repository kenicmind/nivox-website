import { motion } from "framer-motion";
import { Lightbulb, Users, Rocket } from "lucide-react";

const storyPoints = [
  {
    icon: Lightbulb,
    title: "A Vision Was Born",
    text: "NIVOX began with one belief: talent is everywhere, but opportunity is not.",
  },
  {
    icon: Users,
    title: "Students Deserve Better",
    text: "Every student should have access to the right environment, technology, and community to unlock their full potential.",
  },
  {
    icon: Rocket,
    title: "Building the Future",
    text: "NIVOX exists to transform ideas into innovation, learning into opportunity, and ambition into impact.",
  },
];

export default function OurStorySection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FFD54A]">
            Our Story
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#2b0a5a] md:text-5xl">
            The Birth of NIVOX
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every great movement begins with a problem worth solving.
          </p>
        </motion.div>

        {/* Main Story */}
        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="mb-8 h-20 w-1 rounded-full bg-[#FFD54A]" />

            <div className="space-y-7 text-lg leading-9 text-gray-700">

              <p>
                Every generation is remembered by the people who choose to solve
                the problems others have learned to live with.
              </p>

              <p>
                Across many campuses, thousands of students carry brilliant
                ideas, bold ambitions, and the determination to create something
                meaningful. Yet too often, those dreams are limited by
                circumstances beyond their control.
              </p>

              <p>
                Unreliable internet, inconsistent electricity, limited access to
                technology, and the absence of inspiring collaborative spaces
                continue to prevent many students from reaching their full
                potential.
              </p>

              <p>
                NIVOX was created to rewrite that story.
              </p>

              <p>
                More than a workspace, NIVOX is a student innovation hub where
                creativity meets opportunity. A place where students can learn,
                collaborate, build projects, develop ideas, and prepare for the
                future with confidence.
              </p>

              <p>
                We believe innovation should never be limited by access. Every
                student deserves an environment that encourages curiosity,
                supports creativity, and transforms ambition into meaningful
                impact.
              </p>

              <p className="text-xl font-bold text-[#2b0a5a]">
                That belief became NIVOX.
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >

            {storyPoints.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD54A]/20">
                    <Icon className="h-7 w-7 text-[#2b0a5a]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#2b0a5a]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}