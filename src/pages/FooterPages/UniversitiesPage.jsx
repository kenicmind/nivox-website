import { motion } from 'framer-motion';
import { BookOpen, Building, CheckCircle2, GraduationCap, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/design/ui/Button';

const universityBenefits = [
  {
    title: 'Curriculum & Practical Skill Synergy',
    description: 'Complements theoretical classroom lectures with hands-on coding, design, and hardware project building.',
  },
  {
    title: 'Campus Co-Working Space',
    description: 'Establishes high-tech co-working hubs adjacent to university campuses for convenient student access.',
  },
  {
    title: 'Graduate Employability & Internships',
    description: 'Prepares students for corporate internships and tech employment before graduation.',
  },
  {
    title: 'Joint Academic Research & Events',
    description: 'Collaborates with faculty on research initiatives, student hackathons, and technology symposiums.',
  },
];

const UniversitiesPage = () => {
  const handleUniversitySubmit = (e) => {
    e.preventDefault();
    toast.success('University Partnership application submitted! Our institutional team will reach out shortly.');
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
            <GraduationCap className="h-4 w-4 text-[#FFD54A]" />
            Academic & University Partnerships
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Empowering Nigerian Universities
            <br />
            with Modern Innovation Infrastructure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            NIVOX collaborates with Universities, Polytechnics, and Colleges of Education to give students access to 24/7 internet, workstations, and industry mentorship.
          </motion.p>
        </div>
      </section>

      {/* SYNERGY BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2B0A5A]">Academic Synergy</p>
          <h2 className="mt-3 text-3xl font-black text-[#2B0A5A] sm:text-4xl">Why Partner with NIVOX?</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {universityBenefits.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-[#2B0A5A]/10 bg-white p-6 shadow-md">
              <div className="flex items-center gap-3 text-[#2B0A5A]">
                <BookOpen className="h-6 w-6 text-[#FFD54A]" />
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTITUTIONAL APPLICATION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[32px] border border-[#2B0A5A]/10 bg-[#faf8ff] p-8 shadow-lg sm:p-10">
            <h3 className="text-2xl font-black text-[#2B0A5A]">Register Your Institution</h3>
            <p className="mt-2 text-sm text-gray-600">Connect your Vice Chancellor / Dean office with NIVOX for institutional campus partnership.</p>

            <form onSubmit={handleUniversitySubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Institution Name</label>
                <input required type="text" placeholder="e.g. Niger Delta University" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Representative Name & Title</label>
                  <input required type="text" placeholder="Dr. John Doe (Dean of Student Affairs)" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">Official Email</label>
                  <input required type="email" placeholder="dean@edu.ng" className="mt-1.5 w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-[#2B0A5A] focus:outline-none" />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full justify-center">
                Submit Institutional Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UniversitiesPage;
