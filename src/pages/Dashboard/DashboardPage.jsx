import { motion } from 'framer-motion';
import { ArrowRight, BellRing, BookOpen, CalendarDays, Clock3, Cpu, Sparkles, Users, Zap } from 'lucide-react';
import PageHeader from '../../app/components/layout/PageHeader';
import Button from '../../components/design/ui/Button';
import { GlassCard, StatisticCard } from '../../components/design/ui/Card';

const quickActions = [
  { title: 'Book a Workspace', description: 'Reserve your next studio session', icon: Cpu },
  { title: 'Join an Event', description: 'Find the next community experience', icon: CalendarDays },
  { title: 'Access Resources', description: 'Open learning and creator tools', icon: BookOpen },
];

const upcomingEvents = [
  { title: 'AI Builders Lab', time: 'Today • 6:30 PM', location: 'Innovation Hub' },
  { title: 'Design Sprint Session', time: 'Tomorrow • 11:00 AM', location: 'Creator Studio' },
  { title: 'Founder Circle', time: 'Friday • 5:00 PM', location: 'Community Lounge' },
];

const notifications = [
  { title: 'Your workspace is confirmed', detail: 'Creator Studio • 10:00 AM', time: '10 min ago' },
  { title: 'New resource unlocked', detail: 'Figma + AI workflow kit', time: '1 hr ago' },
  { title: 'Partner event invite', detail: 'NIVOX + HP networking session', time: '3 hrs ago' },
];

const availability = [
  { label: 'Computer Lab', value: '12 open seats' },
  { label: 'Creator Studio', value: '3 rooms free' },
  { label: 'Innovation Hub', value: '2 pods available' },
];

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Amina"
        subtitle="Your NIVOX workspace is ready for focus, creation and connection."
        actions={
          <>
            <Button variant="primary">Book a Seat</Button>
            <Button variant="secondary">View Calendar</Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/20 bg-[#FFD54A]/10 px-3 py-2 text-sm font-medium text-[#FFE7A3]">
                <Sparkles className="h-4 w-4 text-[#FFD54A]" />
                Student Portal
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Your next breakthrough starts here.
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/75">
                Access premium spaces, join inspiring events and keep your momentum moving with the tools built for ambitious students.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/15 bg-[#140726]/60 p-4 text-center">
              <p className="text-sm text-white/60">Membership</p>
              <p className="mt-2 text-2xl font-black text-white">Pro Access</p>
              <p className="mt-2 text-sm text-[#FFE7A3]">Active • Expires in 24 days</p>
            </div>
          </div>
        </motion.section>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
          <GlassCard className="h-full">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Membership</p>
                <h3 className="text-xl font-semibold text-white">Premium Student Plan</h3>
              </div>
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#140726]/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Current Tier</span>
                <span className="rounded-full bg-[#FFD54A]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#FFD54A]">Active</span>
              </div>
              <p className="mt-4 text-3xl font-black text-white">₦3,500</p>
              <p className="mt-2 text-sm text-white/60">Monthly access to workstations, studios and events</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Workspace Availability</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Find the right space</h3>
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/70">Live</div>
            </div>
            <div className="mt-6 grid gap-3">
              {availability.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-sm text-white/60">{item.value}</p>
                  </div>
                  <Button variant="ghost" size="sm">Reserve</Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Upcoming Events</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">This week at NIVOX</h3>
              </div>
              <Button variant="ghost" size="sm">See All</Button>
            </div>
            <div className="mt-6 space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="rounded-[20px] border border-white/10 bg-white/10 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{event.title}</p>
                      <p className="mt-1 text-sm text-white/60">{event.location}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[#FFD54A]/10 px-3 py-1 text-xs font-medium text-[#FFD54A]">
                      <Clock3 className="h-3.5 w-3.5" />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Quick Actions</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Keep moving forward</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div key={action.title} className="rounded-[20px] border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{action.title}</p>
                        <p className="text-sm text-white/60">{action.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}>
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Recent Notifications</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Stay in the loop</h3>
              </div>
              <Button variant="ghost" size="sm">Mark All</Button>
            </div>
            <div className="mt-6 space-y-3">
              {notifications.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/10 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                    <BellRing className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-white">{item.title}</p>
                      <span className="text-xs text-white/50">{item.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/60">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
};

export default DashboardPage;
