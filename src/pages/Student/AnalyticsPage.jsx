import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Flame, Calendar, Cpu, Sparkles, Award } from 'lucide-react';
import { GlassCard } from '../../components/design/ui/Card';

const AnalyticsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <TrendingUp className="h-3.5 w-3.5 text-[#FFD54A]" />
              Engagement Metrics
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Student Analytics & Activity
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Overview of your study hours, hub attendance, and studio usage statistics.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Stat Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard padded className="border-emerald-500/30 bg-[linear-gradient(135deg,rgba(52,211,153,0.12),rgba(255,255,255,0.04))]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Total Focus</span>
              <p className="text-2xl font-black text-white">48 Hours</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard padded className="border-purple-500/30 bg-[linear-gradient(135deg,rgba(167,139,250,0.12),rgba(255,255,255,0.04))]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Sessions Completed</span>
              <p className="text-2xl font-black text-white">12 Sessions</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard padded className="border-amber-500/30 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(255,255,255,0.04))]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Top Space</span>
              <p className="text-xl font-bold text-white truncate">Learning Zone</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard padded className="border-[#FFD54A]/30 bg-[#FFD54A]/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#FFD54A]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">Check-in Rate</span>
              <p className="text-2xl font-black text-[#FFD54A]">100%</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Weekly Breakdown */}
      <GlassCard>
        <h3 className="text-xl font-bold text-white">Weekly Focus Hours Breakdown</h3>
        <p className="text-xs text-white/60 mt-1">Study time distribution over the last 7 days</p>

        <div className="mt-8 space-y-4">
          {[
            { day: 'Mon', hours: 6, max: 8 },
            { day: 'Tue', hours: 8, max: 8 },
            { day: 'Wed', hours: 4, max: 8 },
            { day: 'Thu', hours: 7, max: 8 },
            { day: 'Fri', hours: 6, max: 8 },
            { day: 'Sat', hours: 5, max: 8 },
            { day: 'Sun', hours: 2, max: 8 },
          ].map((item) => (
            <div key={item.day} className="space-y-1.5 text-xs">
              <div className="flex justify-between font-semibold">
                <span className="text-white">{item.day}</span>
                <span className="text-[#FFD54A] font-mono">{item.hours} hrs</span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2B0A5A] via-[#FFD54A] to-amber-300 transition-all duration-500"
                  style={{ width: `${(item.hours / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default AnalyticsPage;
