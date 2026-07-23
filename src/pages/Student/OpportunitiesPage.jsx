import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, DollarSign, Sparkles, ExternalLink, ArrowRight, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';

const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Google Generation Tech Scholarship 2026',
    category: 'Scholarships',
    organization: 'Google International',
    deadline: 'Aug 15, 2026',
    grantAmount: '€7,000 / Student',
    description: 'Scholarship awarded to computer science and engineering students demonstrating leadership.',
    eligibility: 'Undergraduate Computer Science students (200L-400L)',
    icon: GraduationCap,
  },
  {
    id: 2,
    title: 'NIVOX Tech Startup Incubation Grant',
    category: 'Grants',
    organization: 'NIVOX Innovation Hub',
    deadline: 'Sept 01, 2026',
    grantAmount: '₦2,500,000 Equity-Free',
    description: 'Seed funding grant for student-led startups building solutions for energy, fintech, or education.',
    eligibility: 'Student founders with MVP or active prototype',
    icon: DollarSign,
  },
  {
    id: 3,
    title: 'Full-Stack Software Engineering Internship',
    category: 'Internships',
    organization: 'Paystack Nigeria',
    deadline: 'Aug 30, 2026',
    grantAmount: 'Stipend + Remote Work',
    description: '3-month paid summer internship working on payment infrastructure and developer APIs.',
    eligibility: 'Proficient in React, Node.js, and REST APIs',
    icon: Briefcase,
  },
  {
    id: 4,
    title: 'Pan-African AI Hackathons 2026',
    category: 'Competitions',
    organization: 'DeepMind & NIVOX',
    deadline: 'Aug 10, 2026',
    grantAmount: '$10,000 Prize Pool',
    description: '48-hour hackathon building artificial intelligence solutions for local healthcare challenges.',
    eligibility: 'Open to all registered NIVOX members',
    icon: Award,
  },
];

const OpportunitiesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Scholarships', 'Grants', 'Internships', 'Competitions'];

  const filteredItems = OPPORTUNITIES.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.organization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleApply = (item) => {
    toast.success(`Application portal opened for ${item.title}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
              Career & Growth Portal
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              NIVOX Opportunities Hub
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Discover verified scholarships, seed grants, internships, and global hackathons.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <GlassCard>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#FFD54A] text-[#140726] shadow-md'
                    : 'text-white/60 hover:text-white border border-white/10 bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/50 focus:border-[#FFD54A] focus:outline-none"
            />
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#FFD54A]/40 hover:bg-white/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[10px] font-black uppercase text-emerald-300">
                      {item.grantAmount}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white leading-snug">{item.title}</h3>
                  <p className="mt-1 text-xs text-[#FFE7A3] font-semibold">{item.organization}</p>
                  <p className="mt-3 text-xs text-white/70 leading-relaxed">{item.description}</p>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-[11px]">
                    <span className="text-white/50 block font-semibold uppercase tracking-wider text-[9px]">Eligibility</span>
                    <span className="text-white font-medium">{item.eligibility}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-white/50 text-[11px]">Deadline: <strong className="text-white">{item.deadline}</strong></span>
                  <Button onClick={() => handleApply(item)} variant="primary" size="sm" className="gap-1.5">
                    Apply Now <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default OpportunitiesPage;
