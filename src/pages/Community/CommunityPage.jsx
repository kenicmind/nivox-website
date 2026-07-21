import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CommunityPage = () => {
  return (
    <main className="overflow-hidden bg-[#faf8ff]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2b0a5a_0%,#40107a_100%)]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#FFD54A,transparent_35%)] opacity-10"/>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

          <motion.p
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54A]"
          >
            Our Community
          </motion.p>

          <motion.h1
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            transition={{delay:.1}}
            className="mt-6 max-w-5xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Where
            <br/>
            Ideas Meet People.
          </motion.h1>

          <motion.p
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            transition={{delay:.2}}
            className="mt-8 max-w-3xl text-xl leading-9 text-white/80"
          >
            NIVOX is more than a place to study.
            It's a growing community of students,
            creators, innovators and future leaders
            building together.
          </motion.p>

          <motion.a
            href="#community-values"
            whileHover={{scale:1.04}}
            whileTap={{scale:.98}}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a]"
          >
            Discover Our Community

            <ArrowRight size={20}/>
          </motion.a>

        </div>

      </section>

      {/* ================= COMMUNITY VALUES ================= */}

      <section
        id="community-values"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
            Why Join NIVOX?
          </p>

          <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
            A Community That Helps You Grow
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Growth happens faster when you're surrounded by people who inspire,
            challenge and support you every step of the way.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {[
            {
              emoji:"🤝",
              title:"Collaboration",
              text:"Meet students who love building ideas together."
            },
            {
              emoji:"💡",
              title:"Innovation",
              text:"Learn by creating real projects and solving real problems."
            },
            {
              emoji:"🌍",
              title:"Networking",
              text:"Build relationships with students, mentors and professionals."
            },
            {
              emoji:"🚀",
              title:"Opportunity",
              text:"Discover internships, competitions and career opportunities."
            }

          ].map((item,index)=>(

            <motion.div

              key={item.title}

              initial={{opacity:0,y:30}}

              whileInView={{opacity:1,y:0}}

              viewport={{once:true}}

              transition={{
                duration:.6,
                delay:index*.08
              }}

              whileHover={{
                y:-10,
                scale:1.03
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

      </section>

      {/* ================= WHO YOU'LL MEET ================= */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Who You'll Meet
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Connect With People Who Inspire You
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Every day at NIVOX brings opportunities to meet people with different
              skills, ideas and ambitions.
            </p>

          </div>

          <div className="mt-20 space-y-16">

            {[
              {
                emoji: "🎓",
                title: "Students",
                text: "Ambitious learners looking to study smarter, collaborate and grow together.",
                reverse: false
              },
              {
                emoji: "🎨",
                title: "Creators",
                text: "Designers, photographers, video editors and digital storytellers bringing ideas to life.",
                reverse: true
              },
              {
                emoji: "🚀",
                title: "Entrepreneurs",
                text: "Future founders building startups, solving problems and creating impact.",
                reverse: false
              },
              {
                emoji: "👨‍🏫",
                title: "Mentors",
                text: "Professionals and industry experts ready to guide, inspire and support the next generation.",
                reverse: true
              }

            ].map((person, index) => (

              <motion.div
                key={person.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  person.reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >

                <div className="rounded-[32px] bg-gradient-to-br from-[#2b0a5a] to-[#4b1688] p-14 text-center text-white shadow-xl">

                  <div className="text-7xl">
                    {person.emoji}
                  </div>

                </div>

                <div>

                  <h3 className="text-4xl font-black text-[#2b0a5a]">
                    {person.title}
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-gray-600">
                    {person.text}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= COMMUNITY IMPACT ================= */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6b4ca5]">
              Our Impact
            </p>

            <h2 className="mt-5 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
              Building Tomorrow, Together
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Every initiative at NIVOX is designed to create lasting value for
              students, universities and the communities they will serve.
            </p>

          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {[
              {
                number: "22,000+",
                title: "Students to Reach",
                text: "Creating access to modern learning spaces and technology."
              },
              {
                number: "100%",
                title: "Future Focused",
                text: "Every program is designed to prepare students for tomorrow."
              },
              {
                number: "∞",
                title: "Opportunities",
                text: "Connecting students with mentors, ideas and possibilities."
              },
              {
                number: "1",
                title: "Growing Community",
                text: "One united ecosystem where everyone grows together."
              }

            ].map((item, index) => (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03
                }}
                className="rounded-[30px] border border-[#ebe3ff] bg-white p-8 text-center shadow-lg"
              >

                <div className="text-5xl font-black text-[#FFD54A]">
                  {item.number}
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

      {/* ================= THE FUTURE STARTS WITH YOU ================= */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto my-24 max-w-7xl rounded-[36px] bg-gradient-to-r from-[#2b0a5a] via-[#3b0f6e] to-[#2b0a5a] px-8 py-20 text-white shadow-[0_25px_80px_rgba(43,10,90,0.18)]"
      >

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD54A]">
            Your Journey Begins Here
          </p>

          <h2 className="mt-6 text-4xl font-black sm:text-5xl">
            The Future Starts With You
          </h2>

          <p className="mt-8 text-lg leading-9 text-white/80">
            Every successful journey begins with a single decision. At NIVOX,
            you'll find the environment, the people and the opportunities to
            learn, create, collaborate and grow into the future you envision.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-5xl">📚</div>

              <h3 className="mt-5 text-2xl font-bold">
                Learn
              </h3>

              <p className="mt-4 text-white/75 leading-7">
                Discover new skills and expand your knowledge every day.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-5xl">🤝</div>

              <h3 className="mt-5 text-2xl font-bold">
                Connect
              </h3>

              <p className="mt-4 text-white/75 leading-7">
                Build meaningful relationships with students, mentors and innovators.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="text-5xl">🚀</div>

              <h3 className="mt-5 text-2xl font-bold">
                Grow
              </h3>

              <p className="mt-4 text-white/75 leading-7">
                Turn your ideas into projects, opportunities and lasting impact.
              </p>

            </div>

          </div>

        </div>

      </motion.section>
      
      {/* ================= JOIN THE COMMUNITY ================= */}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="pb-24"
      >

        <div className="mx-auto max-w-5xl rounded-[36px] border border-[#e9e1ff] bg-white px-8 py-20 text-center shadow-[0_20px_60px_rgba(43,10,90,0.08)]">

          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#6b4ca5]">
            Join Our Community
          </p>

          <h2 className="mt-6 text-4xl font-black text-[#2b0a5a] sm:text-5xl">
            Be Part of the Next Generation of Innovators
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            NIVOX is more than a destination—it's a community where ideas are shared,
            friendships are formed and future leaders are empowered. We'd love to have
            you on this journey.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <button className="rounded-full bg-[#FFD54A] px-8 py-4 font-semibold text-[#2b0a5a] transition duration-300 hover:scale-105">
              Become a Member
            </button>

            <button className="rounded-full border border-[#2b0a5a] px-8 py-4 font-semibold text-[#2b0a5a] transition duration-300 hover:bg-[#2b0a5a] hover:text-white">
              Contact Us
            </button>

          </div>

        </div>

      </motion.section>

    </main>
  );
};

export default CommunityPage;