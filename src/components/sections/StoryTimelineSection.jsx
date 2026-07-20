import { motion } from 'framer-motion';
import { BookOpen, Coffee, Cpu, HandHeart, Mic, Rocket, Sunrise, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    time: '8:00 AM',
    title: 'Arrive',
    description: 'Connect instantly to high-speed internet and settle into a comfortable workspace.',
    icon: Sunrise,
  },
  {
    time: '9:30 AM',
    title: 'Study Session',
    description: 'Access learning resources, research online and prepare for classes.',
    icon: BookOpen,
  },
  {
    time: '11:30 AM',
    title: 'Project Time',
    description: 'Use modern computers to design, code, edit or complete assignments.',
    icon: Cpu,
  },
  {
    time: '1:00 PM',
    title: 'Recharge',
    description: 'Take a short break, network with other students and exchange ideas.',
    icon: Coffee,
  },
  {
    time: '2:30 PM',
    title: 'Create',
    description: 'Record videos, podcasts or presentations inside the Creator Studio.',
    icon: Mic,
  },
  {
    time: '4:00 PM',
    title: 'Collaborate',
    description: 'Meet teammates and work together on projects or startup ideas.',
    icon: HandHeart,
  },
  {
    time: '6:00 PM',
    title: 'Grow',
    description: 'Attend workshops, mentorship sessions or innovation events.',
    icon: Rocket,
  },
];

const StoryTimelineSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f7fb] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(43,10,90,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,213,74,0.16),transparent_35%)]" />
      <div className="absolute left-[-4%] top-12 h-36 w-36 rounded-full bg-[#2B0A5A]/10 blur-3xl" />
      <div className="absolute bottom-[8%] right-[-3%] h-40 w-40 rounded-full bg-[#FFD54A]/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(43,10,90,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,10,90,0.6)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2B0A5A]/10 bg-white px-4 py-2 text-sm font-medium text-[#2B0A5A] shadow-sm">
            <Sparkles className="h-4 w-4 text-[#FFD54A]" />
            A Day at NIVOX
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#2B0A5A] sm:text-4xl lg:text-5xl">
            A Day at NIVOX
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Imagine spending your day in a space built to help you learn, create, collaborate and grow.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FFD54A] via-[#2B0A5A]/30 to-transparent lg:block" />

          <div className="space-y-8 lg:space-y-10">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isReversed = index % 2 === 1;

              return (
                <motion.div
                  key={event.time}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="relative lg:flex lg:items-center"
                >
                  <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#f8f7fb] bg-[#FFD54A] shadow-lg lg:block" />

                  <div className={`w-full lg:w-1/2 ${isReversed ? 'lg:pr-10 lg:text-right' : 'lg:pl-10'}`}>
                    <div className={`rounded-[24px] border border-[#2B0A5A]/10 bg-white/80 p-6 shadow-[0_18px_55px_rgba(43,10,90,0.09)] backdrop-blur-xl ${isReversed ? 'lg:ml-auto' : ''}`}>
                      <div className={`flex items-center gap-3 ${isReversed ? 'lg:justify-end' : ''}`}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#2B0A5A]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2B0A5A]/60">{event.time}</p>
                          <h3 className="text-xl font-semibold text-[#2B0A5A]">{event.title}</h3>
                        </div>
                      </div>
                      <p className={`mt-4 text-base leading-7 text-gray-600 ${isReversed ? 'lg:text-right' : ''}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 rounded-[32px] border border-[#2B0A5A]/10 bg-gradient-to-r from-[#2B0A5A] to-[#3a0d6a] p-8 text-center text-white shadow-[0_20px_60px_rgba(43,10,90,0.18)] sm:p-10"
        >
          <p className="text-xl font-medium italic leading-9 text-white/90 sm:text-2xl">
            “Every great idea begins with the right environment.”
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD54A]">— NIVOX</p>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryTimelineSection;
