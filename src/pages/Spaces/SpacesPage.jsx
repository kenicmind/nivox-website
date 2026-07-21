import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SpacesPage = () => {
  return (
    <main className="overflow-hidden bg-[#faf8ff]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2b0a5a_0%,#40107a_100%)]">

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,#ffd54a,transparent_35%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54A]"
          >
            Explore NIVOX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .1 }}
            className="mt-6 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Spaces Designed For
            <br />
            Innovation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="mt-8 max-w-3xl text-xl leading-9 text-white/80"
          >
            Every corner of NIVOX is intentionally designed to inspire
            learning, collaboration, creativity and innovation.
          </motion.p>

          <motion.a
            href="#digital-workspace"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a]"
          >
            Explore Our Spaces
            <ArrowRight size={20} />
          </motion.a>

        </div>

      </section>

      {/* ================= DIGITAL WORKSPACE ================= */}

      <section
        id="digital-workspace"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Featured Space
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Digital Workspace
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              The Digital Workspace is the heart of NIVOX. It provides students
              with a quiet, modern and technology-driven environment where ideas
              become projects and learning becomes practical.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "High-speed Internet",
                "Comfortable Workstations",
                "Power Backup",
                "Collaborative Environment",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54A]/20">
                    ✓
                  </div>

                  <span className="text-lg text-gray-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT IMAGE PLACEHOLDER */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2b0a5a] to-[#4b1688] p-12 shadow-[0_25px_80px_rgba(43,10,90,0.18)]"
          >

            <div className="flex aspect-[4/3] items-center justify-center rounded-[28px] border border-white/10 bg-white/5">

              <div className="flex h-full w-full flex-col items-center justify-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                  <span className="text-5xl">💻</span>
                </div>

                <h3 className="mt-8 text-4xl font-black text-white">
                  Digital Workspace
                </h3>

                <p className="mt-4 max-w-sm text-center text-lg leading-8 text-white/75">
                  A modern environment designed for focused learning,
                  collaboration and innovation.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>
      
      {/* ================= STUDY LOUNGE ================= */}

      <section className="bg-white py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#FFD54A] to-[#f5b700] p-12 shadow-[0_25px_80px_rgba(255,213,74,0.25)]"
          >

            <div className="flex aspect-[4/3] items-center justify-center rounded-[28px] border border-white/30 bg-white/20 backdrop-blur-xl">

              <div className="text-center">

                <div className="text-6xl">📚</div>

                <h3 className="mt-6 text-4xl font-black text-[#2b0a5a]">
                  Study Lounge
                </h3>

                <p className="mt-4 text-lg text-[#2b0a5a]/80">
                  Quiet • Comfortable • Productive
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Featured Space
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Study Lounge
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              A calm and inspiring environment where students can read, study,
              prepare for examinations and work on assignments without distractions.
            </p>

            <div className="mt-10 grid gap-5">

              {[
                "Comfortable Seating",
                "Reading Corners",
                "Charging Stations",
                "Quiet Learning Environment",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2b0a5a]/10 text-[#2b0a5a]">
                    ✓
                  </div>

                  <span className="text-lg text-gray-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= COLLABORATION HUB ================= */}

      <section className="py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Featured Space
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Collaboration Hub
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Great ideas rarely happen alone. The Collaboration Hub gives students
              a flexible environment to brainstorm, hold meetings, work on group
              projects and learn from one another.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "Group Work Tables",
                "Brainstorming Boards",
                "Team Meeting Areas",
                "Innovation Sessions",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD54A]/20 text-[#2b0a5a] font-bold">
                    ✓
                  </div>

                  <span className="text-lg text-gray-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT VISUAL */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2b0a5a] to-[#5b21b6] p-12 shadow-[0_25px_80px_rgba(43,10,90,0.18)]"
          >

            <div className="flex aspect-[4/3] items-center justify-center rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-xl">

              <div className="text-center">

                <div className="text-6xl">🤝</div>

                <h3 className="mt-6 text-4xl font-black text-white">
                  Collaboration Hub
                </h3>

                <p className="mt-4 text-lg text-white/75">
                  Connect • Collaborate • Create
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= CONTENT CREATION STUDIO ================= */}

      <section className="bg-white py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          {/* LEFT VISUAL */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#FFD54A] via-[#ffcb2f] to-[#f4b400] p-12 shadow-[0_25px_80px_rgba(255,213,74,0.25)]"
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-[28px] border border-white/30 bg-white/20 backdrop-blur-xl">

              <div className="text-center">

                <div className="text-6xl">🎥</div>

                <h3 className="mt-6 text-4xl font-black text-[#2b0a5a]">
                  Content Creation Studio
                </h3>

                <p className="mt-4 text-lg text-[#2b0a5a]/80">
                  Create • Capture • Inspire
                </p>

              </div>

            </div>
          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Featured Space
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Content Creation Studio
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Designed for the next generation of creators, this studio gives
              students the opportunity to produce high-quality digital content,
              develop creative skills and tell stories that inspire change.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "Photography Area",
                "Podcast Recording",
                "Video Production",
                "Editing Workstations",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2b0a5a]/10 text-[#2b0a5a] font-bold">
                    ✓
                  </div>

                  <span className="text-lg text-gray-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= EXPLORE MORE SPACES ================= */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              More Spaces
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Explore Every Corner of NIVOX
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Every space at NIVOX is intentionally designed to help students
              learn, collaborate, innovate and grow.
            </p>

          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                emoji: "🎤",
                title: "Event & Workshop Hall",
                description:
                  "A flexible venue for seminars, workshops, hackathons and networking events.",
              },
              {
                emoji: "☕",
                title: "Relaxation Lounge",
                description:
                  "Recharge, connect with friends or take a break between study sessions.",
              },
              {
                emoji: "🚀",
                title: "Innovation Lab",
                description:
                  "A place where ideas become prototypes, projects and startups.",
              },
              {
                emoji: "🧠",
                title: "Meeting Rooms",
                description:
                  "Private rooms for mentorship sessions, team meetings and project planning.",
              },
            ].map((space, index) => (

              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="rounded-[30px] border border-[#e9e1ff] bg-white p-8 shadow-lg transition-all"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-4xl">
                  {space.emoji}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#2b0a5a]">
                  {space.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {space.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= DESIGNED FOR YOUR FUTURE ================= */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto my-24 max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-r from-[#2b0a5a] via-[#3b0f6e] to-[#2b0a5a] px-8 py-20 text-white shadow-[0_25px_80px_rgba(43,10,90,0.18)] sm:px-12"
      >

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54A]">
            Designed For Your Future
          </p>

          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            Every Space Has A Purpose.
          </h2>

          <p className="mt-8 text-lg leading-9 text-white/80">
            NIVOX isn't simply a building with rooms. Every space has been
            intentionally designed to remove barriers, encourage collaboration,
            inspire creativity and help students develop the skills needed for the
            future.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-5xl">🎓</div>

              <h3 className="mt-5 text-2xl font-bold">
                Learn
              </h3>

              <p className="mt-4 text-white/75 leading-7">
                Build practical knowledge beyond the classroom.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-5xl">🤝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Collaborate
              </h3>

              <p className="mt-4 text-white/75 leading-7">
                Meet like-minded students and build together.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-5xl">🚀</div>

              <h3 className="mt-5 text-2xl font-bold">
                Innovate
              </h3>

              <p className="mt-4 text-white/75 leading-7">
                Transform ideas into meaningful projects and opportunities.
              </p>

            </div>

          </div>

        </div>

      </motion.section> 

      {/* ================= JOIN NIVOX ================= */}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="pb-24"
      >

        <div className="mx-auto max-w-5xl px-6 text-center">

          <h2 className="text-4xl font-black text-[#2b0a5a] sm:text-5xl">
            Ready to Experience NIVOX?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Whether you're looking for a place to study, create, collaborate or
            innovate, NIVOX is designed to help you unlock your full potential.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <button className="rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a] transition hover:scale-105">
              Become a Member
            </button>

            <button className="rounded-full border border-[#2b0a5a] px-8 py-4 font-semibold text-[#2b0a5a] transition hover:bg-[#2b0a5a] hover:text-white">
              Contact Us
            </button>

          </div>

        </div>

      </motion.section>     
    </main>
  );
};

export default SpacesPage;