import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Award, ExternalLink, Sparkles, Code, Cpu, MessageSquare, ShieldCheck, Flame, Star, Search, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';
import NivoxStudentIdBadge from '../../components/student/NivoxStudentIdBadge';

const MEMBERS = [
  { id: 1, name: 'Adaobi Okafor', role: 'Full-Stack Developer', school: 'Niger Delta University', track: 'Developers', projects: 5, focusHrs: 64 },
  { id: 2, name: 'Tariye Emmanuel', role: 'UI/UX Product Designer', school: 'Bayelsa Medical University', track: 'Designers', projects: 3, focusHrs: 52 },
  { id: 3, name: 'Kenechukwu Nnamdi', role: 'AI & Data Researcher', school: 'Federal University Otuoke', track: 'AI Researchers', projects: 4, focusHrs: 78 },
  { id: 4, name: 'Ebiye Peremobowei', role: 'Fintech Startup Founder', school: 'Niger Delta University', track: 'Founders', projects: 2, focusHrs: 45 },
];

const PROJECTS = [
  { id: 1, title: 'NIVOX Campus Pay', builder: 'Ebiye & Adaobi', category: 'Fintech', description: 'Contactless micro-payment wallet for campus transactions.' },
  { id: 2, title: 'AgroSense AI', builder: 'Kenechukwu N.', category: 'Artificial Intelligence', description: 'Soil quality predictor using IoT sensors and machine learning.' },
];

const MENTORS = [
  { id: 1, name: 'Dr. Tari Lawson', role: 'Senior AI Engineer @ Google', expertise: 'Machine Learning & Cloud' },
  { id: 2, name: 'Engr. Funke Bakare', role: 'Principal Architect @ Paystack', expertise: 'Full-Stack & Payment APIs' },
];

const CommunityPage = () => {
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isIdBadgeOpen, setIsIdBadgeOpen] = useState(false);

  const tracks = ['All', 'Developers', 'Designers', 'AI Researchers', 'Founders'];

  const filteredMembers = MEMBERS.filter((m) => {
    const matchTrack = selectedTrack === 'All' || m.track === selectedTrack;
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTrack && matchSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Users className="h-3.5 w-3.5 text-[#FFD54A]" />
              NIVOX Collective
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Innovators & Creator Network
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Connect with fellow students, showcase tech projects, and book mentor office hours.
            </p>
          </div>

          <Button
            onClick={() => setIsIdBadgeOpen(true)}
            variant="primary"
            className="gap-2 shadow-[0_12px_35px_rgba(255,213,74,0.25)] shrink-0"
          >
            <ShieldCheck className="h-4 w-4" />
            View My Permanent Digital ID
          </Button>
        </div>
      </section>

      {/* Member Directory */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h3 className="text-xl font-bold text-white">Student Member Directory</h3>
            <p className="text-xs text-white/60 mt-1">Verified student builders and innovators across Niger Delta universities</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrack(t)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedTrack === t
                    ? 'bg-[#FFD54A] text-[#140726] shadow-md'
                    : 'text-white/60 hover:text-white border border-white/10 bg-white/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMembers.map((m) => (
            <div key={m.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#FFD54A]/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A] mb-4">
                <User className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-white text-base truncate">{m.name}</h4>
              <p className="text-xs text-[#FFE7A3] font-semibold mt-0.5">{m.role}</p>
              <p className="text-xs text-white/60 mt-2">{m.school}</p>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px]">
                <span className="text-white/50">{m.projects} Projects</span>
                <span className="font-mono text-emerald-300 font-bold">{m.focusHrs} Focus Hrs</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Project Showcase & Mentor Directory Dual Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white">Student Project Showcase</h3>
            <Sparkles className="h-5 w-5 text-[#FFD54A]" />
          </div>

          <div className="mt-6 space-y-4">
            {PROJECTS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#FFD54A]/15 px-3 py-1 text-[10px] font-bold text-[#FFD54A] border border-[#FFD54A]/30">
                    {p.category}
                  </span>
                  <span className="text-xs text-white/50">By {p.builder}</span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-white">{p.title}</h4>
                <p className="mt-1 text-xs text-white/70">{p.description}</p>
                <Button onClick={() => toast.success(`Opening live demo for ${p.title}`)} variant="ghost" size="sm" className="mt-4 gap-1 border border-white/15 text-xs">
                  Live Demo <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white">Industry Mentors</h3>
            <Award className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="mt-6 space-y-4">
            {MENTORS.map((men) => (
              <div key={men.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{men.name}</h4>
                  <p className="text-xs text-emerald-300 font-semibold">{men.role}</p>
                  <p className="text-xs text-white/60 mt-1">Expertise: {men.expertise}</p>
                </div>
                <Button onClick={() => toast.success(`Office hours booking requested with ${men.name}`)} variant="primary" size="sm" className="text-xs">
                  Book Session
                </Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Permanent Student ID Modal */}
      <NivoxStudentIdBadge
        open={isIdBadgeOpen}
        onClose={() => setIsIdBadgeOpen(false)}
        userProfile={{
          fullName: 'Kenechukwu Nnamdi',
          school: 'Niger Delta University',
          course: 'Computer Science',
          level: '300L',
        }}
      />
    </div>
  );
};

export default CommunityPage;