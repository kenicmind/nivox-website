import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EventsPage = () => {
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
            Events at NIVOX
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .1 }}
            className="mt-6 max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Learn.
            <br />
            Connect.
            <br />
            Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            className="mt-8 max-w-3xl text-xl leading-9 text-white/80"
          >
            Workshops, networking sessions, innovation challenges,
            career talks and community events designed to prepare
            students for the future.
          </motion.p>

          <motion.a
            href="#featured-events"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: .98 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a]"
          >
            Explore Events

            <ArrowRight size={20}/>
          </motion.a>

        </div>

      </section>

      {/* ================= FEATURED EVENTS ================= */}

      <section
        id="featured-events"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
            Featured Events
          </p>

          <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
            Experiences That Shape Futures
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Every event at NIVOX is designed to inspire learning, spark innovation,
            build meaningful connections and prepare students for real-world
            opportunities.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {[
            {
              emoji: "💼",
              title: "Career Development",
              description:
                "CV writing, interview preparation, personal branding and career guidance."
            },
            {
              emoji: "💡",
              title: "Innovation Workshops",
              description:
                "Hands-on sessions covering AI, design, technology, entrepreneurship and digital skills."
            },
            {
              emoji: "🤝",
              title: "Networking Events",
              description:
                "Meet professionals, founders, mentors and fellow students who share your passion."
            }
          ].map((event, index) => (

            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
              whileHover={{
                y: -10,
                scale: 1.03
              }}
              className="rounded-[30px] border border-[#ebe3ff] bg-white p-8 shadow-lg"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-4xl">
                {event.emoji}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#2b0a5a]">
                {event.title}
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                {event.description}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= THIS WEEK AT NIVOX ================= */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              This Week at NIVOX
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              A Week Full of Opportunities
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Every week brings new opportunities to learn, connect and grow.
            </p>

          </div>

          <div className="mt-20 space-y-6">

            {[
              {
                day: "Monday",
                title: "Design Thinking Workshop",
                time: "10:00 AM - 1:00 PM",
                color: "bg-[#FFD54A]"
              },
              {
                day: "Tuesday",
                title: "Coding & Tech Meetup",
                time: "2:00 PM - 5:00 PM",
                color: "bg-[#2b0a5a]"
              },
              {
                day: "Wednesday",
                title: "Career Development Session",
                time: "11:00 AM - 1:00 PM",
                color: "bg-[#FFD54A]"
              },
              {
                day: "Thursday",
                title: "Content Creation Masterclass",
                time: "1:00 PM - 4:00 PM",
                color: "bg-[#2b0a5a]"
              },
              {
                day: "Friday",
                title: "Startup Pitch Night",
                time: "3:00 PM - 6:00 PM",
                color: "bg-[#FFD54A]"
              }

            ].map((event, index) => (

              <motion.div
                key={event.day}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
                whileHover={{ scale: 1.01 }}
                className="flex flex-col gap-6 rounded-[28px] border border-[#ece6ff] bg-[#faf8ff] p-8 shadow-md lg:flex-row lg:items-center lg:justify-between"
              >

                <div className="flex items-center gap-6">

                  <div className={`h-16 w-3 rounded-full ${event.color}`}></div>

                  <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-[#6b4ca5]">
                      {event.day}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#2b0a5a]">
                      {event.title}
                    </h3>

                  </div>

                </div>

                <div className="rounded-full bg-[#2b0a5a]/5 px-6 py-3 font-semibold text-[#2b0a5a]">

                  {event.time}

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= INNOVATION CHALLENGES ================= */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Innovation Challenges
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Where Great Ideas Come to Life
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              NIVOX empowers students to solve real-world problems through exciting
              competitions, collaborative projects and innovation-driven experiences.
            </p>

          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                emoji: "💻",
                title: "Hackathons",
                text: "Build creative technology solutions within exciting time-based competitions."
              },
              {
                emoji: "🚀",
                title: "Startup Pitch",
                text: "Present innovative business ideas to mentors, investors and partners."
              },
              {
                emoji: "🎨",
                title: "Design Challenge",
                text: "Compete in branding, UI/UX, graphics and creative design competitions."
              },
              {
                emoji: "🧠",
                title: "Problem Solving",
                text: "Work in teams to tackle real community and industry challenges."
              }
            ].map((item, index) => (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03
                }}
                className="rounded-[30px] border border-[#ebe3ff] bg-white p-8 shadow-lg"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-4xl">
                  {item.emoji}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#2b0a5a]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {item.text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= UPCOMING EVENTS TIMELINE ================= */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Upcoming Events
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Mark Your Calendar
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Exciting opportunities are always around the corner. Here's what's coming next at NIVOX.
            </p>

          </div>

          <div className="relative mx-auto mt-20 max-w-5xl">

            <div className="absolute left-7 top-0 h-full w-1 rounded-full bg-[#FFD54A]/40"></div>

            {[
              {
                date: "12 AUG",
                title: "AI Bootcamp",
                desc: "Learn practical Artificial Intelligence tools for productivity and innovation."
              },
              {
                date: "18 AUG",
                title: "Photography Masterclass",
                desc: "Master composition, lighting and visual storytelling."
              },
              {
                date: "26 AUG",
                title: "Startup Pitch Night",
                desc: "Present your business idea and receive valuable feedback."
              },
              {
                date: "02 SEP",
                title: "Career Fair",
                desc: "Connect with companies, recruiters and industry professionals."
              }
            ].map((event, index) => (

              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="relative mb-12 flex items-start gap-8"
              >

                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD54A] font-black text-[#2b0a5a] shadow-lg">

                  •

                </div>

                <div className="flex-1 rounded-[28px] border border-[#ece6ff] bg-[#faf8ff] p-8 shadow-md">

                  <span className="rounded-full bg-[#2b0a5a]/10 px-4 py-2 text-sm font-bold text-[#2b0a5a]">
                    {event.date}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-[#2b0a5a]">
                    {event.title}
                  </h3>

                  <p className="mt-3 leading-8 text-gray-600">
                    {event.desc}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= HOST YOUR EVENT ================= */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto my-24 max-w-7xl rounded-[36px] bg-gradient-to-r from-[#2b0a5a] via-[#3b0f6e] to-[#2b0a5a] px-8 py-20 text-center text-white shadow-[0_25px_80px_rgba(43,10,90,0.18)]"
      >

        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54A]">
          Host With Us
        </p>

        <h2 className="mt-6 text-4xl font-black sm:text-5xl">
          Bring Your Event to NIVOX
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/80">
          Whether you're organizing a workshop, seminar, startup meetup,
          community gathering or innovation challenge, NIVOX provides the
          perfect environment to bring people together.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

          <button className="rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a] transition hover:scale-105">
            Book a Space
          </button>

          <button className="rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#2b0a5a]">
            Contact Our Team
          </button>

        </div>

      </motion.section>

      {/* ================= JOIN THE NEXT EVENT ================= */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="pb-24"
      >
        <div className="mx-auto max-w-5xl rounded-[36px] border border-[#e9e1ff] bg-white px-8 py-20 text-center shadow-[0_20px_60px_rgba(43,10,90,0.08)]">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#6b4ca5]">
            Join The Community
          </p>

          <h2 className="mt-6 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
            Don't Miss What's Next.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Every event at NIVOX is an opportunity to learn new skills, meet
            inspiring people, build meaningful projects and create lasting
            connections. Your next breakthrough could begin here.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <button className="rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a] transition duration-300 hover:scale-105">
              View Upcoming Events
            </button>

            <button className="rounded-full border border-[#2b0a5a] px-8 py-4 font-semibold text-[#2b0a5a] transition duration-300 hover:bg-[#2b0a5a] hover:text-white">
              Become a Member
            </button>

          </div>

        </div>
      </motion.section>

    </main>
  );
};

export default EventsPage;