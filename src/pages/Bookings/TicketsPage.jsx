import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Sparkles, Plus } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';
import ReservationTicket from '../../components/booking/ReservationTicket';
import BookingModal from '../../components/booking/BookingModal';
import { getMockBookings } from '../../services/mockPaymentService';
import ErrorState from '../../app/components/common/ErrorState';

const TicketsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const fetchTickets = useCallback(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        setError('Please sign in to view your digital reservation passes.');
        return;
      }

      try {
        const qRes = query(
          collection(db, 'reservations'),
          where('uid', '==', currentUser.uid)
        );
        const snapRes = await getDocs(qRes);
        let resDocs = snapRes.docs.map((docSnap) => ({
          id: docSnap.id,
          sourceCollection: 'reservations',
          ...docSnap.data(),
        }));

        // Fallback to legacy bookings if reservations is empty
        if (resDocs.length === 0) {
          const qBook = query(
            collection(db, 'bookings'),
            where('uid', '==', currentUser.uid)
          );
          const snapBook = await getDocs(qBook);
          resDocs = snapBook.docs.map((docSnap) => ({
            id: docSnap.id,
            sourceCollection: 'bookings',
            ...docSnap.data(),
          }));
        }

        // Deduplicate strictly by paymentReference / ticketId / seat assignment
        const uniqueMap = new Map();
        resDocs.forEach((t) => {
          const uniqueKey = t.paymentReference || t.ticketId || `${t.workspaceId}-${t.date}-${t.timeSlot}-${t.seatId || t.seatNumber}`;
          if (!uniqueMap.has(uniqueKey)) {
            uniqueMap.set(uniqueKey, t);
          }
        });
        getMockBookings(currentUser.uid).forEach((ticket) => {
          if (!uniqueMap.has(ticket.paymentReference)) {
            uniqueMap.set(ticket.paymentReference, ticket);
          }
        });

        setTickets(
          Array.from(uniqueMap.values()).sort(
            (a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0),
          ),
        );
      } catch (err) {
        console.error('Error fetching reservation tickets:', err);
        setError('Unable to load digital passes from server.');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = fetchTickets();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [fetchTickets]);

  const filteredTickets = tickets.filter((t) => {
    const status = t.status || 'upcoming';
    if (activeTab === 'active') return ['approved', 'upcoming'].includes(status);
    if (activeTab === 'past') return !['approved', 'upcoming'].includes(status);
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6 py-8">
        <div className="h-36 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
        <div className="h-64 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
      </div>
    );
  }

  if (error && tickets.length === 0) {
    return <ErrorState title="Tickets Error" message={error} onRetry={fetchTickets} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Booking Modal */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={(newReservation) => {
          setTickets((prev) => [newReservation, ...prev]);
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
              Digital Entry Vault
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              My Reservation Passes
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Access your digital entry tickets, seat assignments, and payment receipts.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsBookingModalOpen(true)}
            className="gap-2 shadow-[0_12px_35px_rgba(255,213,74,0.25)] shrink-0"
          >
            <Plus className="h-4 w-4" />
            Book Workspace Session
          </Button>
        </div>
      </section>

      {/* Filter Tabs & Pass Gallery */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <h3 className="text-xl font-bold text-white">Digital Pass Gallery</h3>
            <p className="text-xs text-white/60 mt-1">Filter and view entry passes for NIVOX reception check-in</p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 self-start sm:self-auto">
            {[
              { key: 'all', label: 'All Passes' },
              { key: 'active', label: 'Active Passes' },
              { key: 'past', label: 'Past / Cancelled' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#FFD54A] text-[#140726] shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {filteredTickets.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
              >
                {filteredTickets.map((t) => (
                  <ReservationTicket key={t.id} ticket={t} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-[24px] border border-white/10 bg-white/5 py-12 px-6 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD54A]/15 text-[#FFD54A] mb-4">
                  <Ticket className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">No digital passes found</h3>
                <p className="mt-2 max-w-md text-sm text-white/60">
                  You currently have no reservation tickets matching this filter. Book a session to generate your entry pass!
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="mt-6 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Book Workspace Session (₦300)
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};

export default TicketsPage;
