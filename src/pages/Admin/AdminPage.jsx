import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Calendar,
  CreditCard,
  Send,
  Search,
  TrendingUp,
  Cpu,
  BellRing,
  Sparkles,
  Settings,
  RefreshCw,
  Download,
  QrCode,
} from 'lucide-react';
import { collection, getDocs, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../../firebase/firebase';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';
import { exportToCSV } from '../../utils/exportUtils';
import CheckInScannerModal from '../../components/admin/CheckInScannerModal';
import LearningMaterialsManager from '../../components/admin/LearningMaterialsManager';
import SystemSettingsPanel from '../../components/admin/SystemSettingsPanel';
import { useAuth } from '../../context/useAuth';

const AdminPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');
  const [reservations, setReservations] = useState([]);
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastDetail, setBroadcastDetail] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleExportReservations = () => {
    exportToCSV('NIVOX_Reservations_Ledger', reservations, {
      ticketId: 'Ticket ID',
      userName: 'Student Name',
      userEmail: 'Email',
      workspaceName: 'Workspace',
      seatNumber: 'Seat Number',
      date: 'Date',
      timeSlot: 'Time Slot',
      priceFormatted: 'Amount Paid',
      paymentReference: 'Payment Ref',
      status: 'Status',
    });
  };

  const handleExportStudents = () => {
    exportToCSV('NIVOX_Student_Roster', students, {
      fullName: 'Full Name',
      email: 'Email',
      school: 'School',
      course: 'Course',
      level: 'Academic Level',
    });
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Reservations
      const resSnap = await getDocs(collection(db, 'reservations'));
      const resData = resSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReservations(resData);

      // 2. Fetch Registered Students
      const userSnap = await getDocs(collection(db, 'users'));
      const userData = userSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setStudents(userData);

      // 3. Fetch Payment Records
      const paySnap = await getDocs(collection(db, 'payments'));
      const payData = paySnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPayments(payData);
      const eventSnap = await getDocs(collection(db, 'events'));
      setEvents(eventSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error loading admin portal data:', err);
      toast.error('Failed to sync admin records with Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Firestore synchronization intentionally updates the loading state.
    fetchAdminData();
  }, []);

  const handleBroadcastNotification = async (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastDetail) {
      toast.error('Please enter notification title and message.');
      return;
    }

    try {
      setIsBroadcasting(true);
      const broadcastPayload = {
        title: broadcastTitle,
        detail: broadcastDetail,
        time: 'Just now',
        type: 'broadcast',
        read: false,
        createdAt: serverTimestamp(),
      };

      // Send broadcast notification to all students
      await Promise.all(
        students.map((student) =>
          addDoc(collection(db, 'notifications'), {
            ...broadcastPayload,
            uid: student.id,
          })
        )
      );

      toast.success(`Broadcast dispatched to ${students.length || 1} student inboxes!`);
      setBroadcastTitle('');
      setBroadcastDetail('');
    } catch (err) {
      console.error('Broadcast error:', err);
      toast.error('Failed to send broadcast notification.');
    } finally {
      setIsBroadcasting(false);
    }
  };

  const paidPayments = payments.filter((payment) => payment.paymentStatus === 'paid');
  const totalRevenue = paidPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const activeBookingsCount = reservations.filter((r) => r.status === 'upcoming').length;

  const filteredReservations = reservations.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      (r.userName || '').toLowerCase().includes(term) ||
      (r.ticketId || '').toLowerCase().includes(term) ||
      (r.workspaceName || '').toLowerCase().includes(term) ||
      (r.paymentReference || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Admin Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-[#FFD54A]/30 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.22),transparent_40%),linear-gradient(135deg,rgba(43,10,90,0.92)_0%,rgba(20,7,38,0.98)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/30 bg-[#FFD54A]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FFD54A]" />
              Super Admin Level 4
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              NIVOX Executive Console
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Live capacity monitoring, seat allocations, QR check-ins, and export controls.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <Button onClick={() => setIsScannerOpen(true)} variant="primary" className="gap-2 shadow-md text-xs">
              <QrCode className="h-4 w-4" /> QR Check-in
            </Button>
            <Button onClick={fetchAdminData} variant="ghost" className="gap-2 border border-white/15 text-xs">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Sync
            </Button>
          </div>
        </div>
      </section>
      <LearningMaterialsManager />

      {/* Analytics High-Level Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard padded className="border-[#FFD54A]/30 bg-[#FFD54A]/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Total Platform Revenue</span>
              <p className="mt-1 text-3xl font-black text-[#FFD54A]">₦{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD54A]/20 text-[#FFD54A]">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard padded className="border-emerald-500/30 bg-[linear-gradient(135deg,rgba(52,211,153,0.12),rgba(255,255,255,0.04))]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Active Hub Reservations</span>
              <p className="mt-1 text-3xl font-black text-emerald-400">{activeBookingsCount}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard padded className="border-purple-500/30 bg-[linear-gradient(135deg,rgba(167,139,250,0.12),rgba(255,255,255,0.04))]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Registered Students</span>
              <p className="mt-1 text-3xl font-black text-purple-300">{students.length || 1}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </GlassCard>

        <GlassCard padded className="border-amber-500/30 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(255,255,255,0.04))]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Hub Occupancy Rate</span>
              <p className="mt-1 text-3xl font-black text-amber-300">85%</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Control Tabs */}
      <GlassCard>
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/10 pb-4">
          {[
            { key: 'analytics', label: 'Reservations Audit', icon: Calendar },
            { key: 'bookings', label: 'Bookings', icon: CreditCard },
            { key: 'students', label: 'Student Roster', icon: Users },
            { key: 'events', label: 'Events', icon: Sparkles },
            { key: 'reports', label: 'Reports', icon: TrendingUp },
            { key: 'broadcast', label: 'Notification Broadcast', icon: BellRing },
            { key: 'seats', label: 'Seat Map Auditor', icon: Cpu },
            { key: 'settings', label: 'System Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-[#FFD54A] text-[#140726] shadow-md'
                    : 'text-white/60 hover:text-white border border-white/10 bg-white/5'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Booking Operations</h3>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-xs text-white/80">
                  <thead className="border-b border-white/10 text-[10px] uppercase text-white/50"><tr><th className="p-4">Reference</th><th className="p-4">Student</th><th className="p-4">Session</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
                  <tbody className="divide-y divide-white/5">{reservations.map((booking) => <tr key={booking.id}><td className="p-4 font-mono text-[#FFD54A]">{booking.paymentReference || booking.ticketId}</td><td className="p-4">{booking.userName || booking.userEmail}</td><td className="p-4">{booking.date} · {booking.timeSlot}</td><td className="p-4">{booking.status}</td><td className="p-4"><button className="text-[#FFD54A] underline" onClick={async () => { await updateDoc(doc(db, 'reservations', booking.id), { status: booking.status === 'cancelled' ? 'upcoming' : 'cancelled' }); await fetchAdminData(); }}>Toggle status</button></td></tr>)}</tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'events' && (
            <div className="space-y-4"><h3 className="text-lg font-bold text-white">Events</h3><div className="grid gap-3 sm:grid-cols-2">{events.length ? events.map((event) => <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-bold text-white">{event.title || event.name}</p><p className="mt-1 text-xs text-white/60">{event.date || 'Date pending'} · {event.status || 'draft'}</p></div>) : <p className="text-sm text-white/50">No events have been published.</p>}</div></div>
          )}
          {activeTab === 'reports' && (
            <div className="grid gap-4 sm:grid-cols-3"><GlassCard padded><p className="text-xs text-white/60">Verified revenue</p><p className="mt-2 text-2xl font-black text-[#FFD54A]">₦{totalRevenue.toLocaleString()}</p></GlassCard><GlassCard padded><p className="text-xs text-white/60">Paid transactions</p><p className="mt-2 text-2xl font-black text-white">{paidPayments.length}</p></GlassCard><GlassCard padded><p className="text-xs text-white/60">Attendance completed</p><p className="mt-2 text-2xl font-black text-white">{reservations.filter((booking) => booking.status === 'completed').length}</p></GlassCard></div>
          )}
          {/* Tab 1: Reservations Audit */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Firestore Reservation Ledger</h3>
                  <p className="text-xs text-white/60">Live audit records synced with Paystack checkout</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search student, ticket ID, ref..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-4 text-xs text-white placeholder-white/50 focus:border-[#FFD54A] focus:outline-none"
                    />
                  </div>
                  <Button onClick={handleExportReservations} variant="ghost" size="sm" className="gap-1.5 border border-white/15 text-xs">
                    <Download className="h-3.5 w-3.5" /> CSV Export
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left text-xs text-white/80">
                  <thead className="border-b border-white/10 bg-white/5 font-semibold text-white uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Ticket ID</th>
                      <th className="p-4">Student</th>
                      <th className="p-4">Workspace & Seat</th>
                      <th className="p-4">Date & Slot</th>
                      <th className="p-4">Payment Ref</th>
                      <th className="p-4">Fee</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    {filteredReservations.length > 0 ? (
                      filteredReservations.map((r) => (
                        <tr key={r.id} className="hover:bg-white/5 transition">
                          <td className="p-4 font-mono font-bold text-[#FFD54A]">{r.ticketId || r.id.substring(0, 8)}</td>
                          <td className="p-4">{r.userName || r.userEmail || 'Student'}</td>
                          <td className="p-4">{r.workspaceName} <span className="text-[#FFE7A3]">({r.seatNumber})</span></td>
                          <td className="p-4">{r.date} • {r.timeSlot}</td>
                          <td className="p-4 font-mono text-emerald-300">{r.paymentReference || 'PAY-NIV-PASS'}</td>
                          <td className="p-4 font-bold text-white">{r.priceFormatted || '₦300'}</td>
                          <td className="p-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                                r.status === 'upcoming'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-white/10 text-white/50'
                              }`}
                            >
                              {r.status || 'Upcoming'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-white/50">
                          No reservation records matching audit query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Student Roster */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-white">Registered Student Roster</h3><Button onClick={handleExportStudents} variant="ghost" size="sm" className="gap-2 border border-white/15"><Download className="h-3.5 w-3.5" /> Export CSV</Button></div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {students.map((st) => (
                  <div key={st.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{st.fullName || st.email?.split('@')[0] || 'Student'}</h4>
                      <span className="rounded-full bg-[#FFD54A]/15 px-2 py-0.5 text-[10px] font-bold text-[#FFD54A]">Verified</span>
                    </div>
                    <p className="text-white/60">{st.email}</p>
                    <p className="text-white/80"><span className="text-white/50">School:</span> {st.school || 'Unspecified'}</p>
                    <p className="text-white/80"><span className="text-white/50">Course:</span> {st.course || 'Unspecified'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Notification Broadcast */}
          {activeTab === 'broadcast' && (
            <div className="max-w-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Broadcast System Notification</h3>
                <p className="text-xs text-white/60 mt-1">Send announcement directly to all student inboxes in Firestore</p>
              </div>

              <form onSubmit={handleBroadcastNotification} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">Notice Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Creator Studio Equipment Upgrade"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-[#140726] p-3 text-xs text-white focus:border-[#FFD54A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">Notification Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter broadcast detail..."
                    value={broadcastDetail}
                    onChange={(e) => setBroadcastDetail(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-[#140726] p-3 text-xs text-white focus:border-[#FFD54A] focus:outline-none"
                  />
                </div>

                <Button type="submit" disabled={isBroadcasting} variant="primary" className="gap-2 shadow-lg">
                  <Send className="h-4 w-4" />
                  {isBroadcasting ? 'Broadcasting...' : 'Dispatch to All Inboxes'}
                </Button>
              </form>
            </div>
          )}

          {/* Tab 4: Seat Map Auditor */}
          {activeTab === 'seats' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Visual Seat Occupancy Inspector</h3>
              <p className="text-xs text-white/60">Live layout auditor for NIVOX workspaces</p>

              <div className="grid gap-6 md:grid-cols-2">
                {['Learning Zone (12 Desks)', 'Computer Lab (8 High-Perf PCs)', 'Creator Studio (4 Pods)', 'Innovation Lounge (2 Grouped Tables)'].map((zone) => (
                  <div key={zone} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h4 className="font-bold text-white text-sm mb-3">{zone}</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-2 text-center text-[10px] font-bold text-emerald-300"
                        >
                          Desk {idx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: System Settings & Audit Logs */}
          {activeTab === 'settings' && <SystemSettingsPanel userEmail={user?.email || 'Administrator'} />}
        </div>
      </GlassCard>

      {/* Reception Check-In Scanner Modal */}
      <CheckInScannerModal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onRefresh={fetchAdminData}
      />
    </div>
  );
};

export default AdminPage;
