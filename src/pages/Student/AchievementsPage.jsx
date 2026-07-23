import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Flame, ShieldCheck, CheckCircle2, Zap, Star } from 'lucide-react';
import { GlassCard } from '../../components/design/ui/Card';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'First Step to Greatness',
    description: 'Completed your first NIVOX workspace reservation.',
    icon: Sparkles,
    unlocked: true,
    date: 'Unlocked Jul 20, 2026',
    color: 'text-amber-400 bg-amber-400/15 border-amber-400/30',
  },
  {
    id: 2,
    title: 'Focus Marathoner',
    description: 'Logged 40+ focus hours in NIVOX learning zones.',
    icon: Flame,
    unlocked: true,
    date: 'Unlocked Jul 22, 2026',
    color: 'text-emerald-400 bg-emerald-400/15 border-emerald-400/30',
  },
  {
    id: 3,
    title: 'Lab Innovator',
    description: 'Reserved 5 studio sessions in Creator & Innovation Pods.',
    icon: Zap,
    unlocked: true,
    date: 'Unlocked Jul 23, 2026',
    color: 'text-purple-400 bg-purple-400/15 border-purple-400/30',
  },
  {
    id: 4,
    title: 'Community Pioneer',
    description: 'Attended 10+ NIVOX technical workshops and hackathons.',
    icon: Star,
    unlocked: false,
    date: 'Progress: 7/10 Workshops',
    color: 'text-white/40 bg-white/5 border-white/10',
  },
];

const AchievementsPage = () => {
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Award className="h-3.5 w-3.5 text-[#FFD54A]" />
              Milestone Vault
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Student Achievements
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Track your focus hours, lab badges, and workshop milestones.
            </p>
          </div>

          <div className="rounded-2xl border border-[#FFD54A]/30 bg-[#FFD54A]/10 p-4 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-[#FFE7A3] tracking-widest block">Unlocked Badges</span>
            <span className="text-3xl font-black text-[#FFD54A]">{unlockedCount} / {ACHIEVEMENTS.length}</span>
          </div>
        </div>
      </section>

      {/* Badges Grid */}
      <GlassCard>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {ACHIEVEMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-start gap-4 rounded-[28px] border p-6 backdrop-blur transition ${
                  item.unlocked
                    ? 'border-white/15 bg-white/10'
                    : 'border-white/5 bg-white/5 opacity-60'
                }`}
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${item.color}`}>
                  <Icon className="h-7 w-7" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                    {item.unlocked && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="mt-1 text-xs text-white/70 leading-relaxed">{item.description}</p>
                  <span className="mt-3 inline-block font-mono text-[11px] text-[#FFE7A3] font-semibold">
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default AchievementsPage;
