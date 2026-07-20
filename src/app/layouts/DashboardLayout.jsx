import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BookOpen, Bell, UserCircle, Sparkles, LogOut } from 'lucide-react';

const studentLinks = [
  { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
  { label: 'My Membership', to: '/student/membership', icon: Sparkles },
  { label: 'Bookings', to: '/student/bookings', icon: CalendarDays },
  { label: 'Events', to: '/student/events', icon: CalendarDays },
  { label: 'Resources', to: '/student/resources', icon: BookOpen },
  { label: 'Notifications', to: '/student/notifications', icon: Bell },
  { label: 'Profile', to: '/student/profile', icon: UserCircle },
];

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_30%),linear-gradient(135deg,#140726_0%,#1e1038_100%)] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-[#140726]/80 px-4 py-5 backdrop-blur-xl lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xl font-black tracking-[0.24em]">NIVOX</p>
              <p className="mt-1 text-sm text-white/60">Student Portal</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {studentLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => [
                    'flex items-center gap-3 rounded-[16px] px-4 py-3 text-sm font-medium transition',
                    isActive ? 'bg-[#FFD54A] text-[#2B0A5A]' : 'text-white/75 hover:bg-white/10 hover:text-white',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <button className="mt-8 flex items-center gap-3 rounded-[16px] px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
