import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Cpu,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertCircle,
  BookOpen,
  Camera,
  Users,
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { auth, db } from '../../firebase/firebase';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';
import BookingModal from '../../components/booking/BookingModal';
import ErrorState from '../../app/components/common/ErrorState';

const categoryIcons = {
  'learning-zone': BookOpen,
  'computer-lab': Cpu,
  'creator-studio': Camera,
  'innovation-lounge': Users,
};

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchUserBookings = useCallback(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        setError('Please sign in to view your workspace reservations.');
        return;
      }

      try {
        const qRes = query(
          collection(db, 'reservations'),
          where('uid', '==', currentUser.uid)
        );
        const snapshotRes = await getDocs(qRes);
        let resDocs = snapshotRes.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        if (resDocs.length === 0) {
          const qBook = query(
            collection(db, 'bookings'),
            where('uid', '==', currentUser.uid)
          );
          const snapshotBook = await getDocs(qBook);
          resDocs = snapshotBook.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
        }

        // Deduplicate strictly by unique paymentReference / ticketId / seat details
        const uniqueMap = new Map();
        resDocs.forEach((b) => {
          const uniqueKey = b.paymentReference || b.ticketId || `${b.workspaceId}-${b.date}-${b.timeSlot}-${b.seatId || b.seatNumber}`;
          if (!uniqueMap.has(uniqueKey)) {
            uniqueMap.set(uniqueKey, b);
          }
        });

        setBookings(Array.from(uniqueMap.values()));
      } catch (err) {
        console.error('Error fetching user reservations:', err);
        setError('Unable to load reservations from server.');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = fetchUserBookings();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [fetchUserBookings]);

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancellingId(bookingId);
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: 'cancelled' });

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
      );

      toast.success('Workspace booking cancelled.');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => (b.status || 'upcoming') === activeTab);

  if (loading) {
    return (
      <div className="space-y-6 py-8">
        <div className="h-40 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
        <div className="h-64 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
      </div>
    );
  }

  if (error && bookings.length === 0) {
    return <ErrorState title="Bookings Error" message={error} onRetry={fetchUserBookings} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Booking Modal Component */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={(newBooking) => {
          setBookings((prev) => [newBooking, ...prev]);
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
              Workspace Management
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              My Workspace Reservations
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Manage your reserved workspace desks, labs, and studio sessions at NIVOX.
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

      {/* Tabs & Content */}
      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            {['upcoming', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-[#FFD54A] text-[#140726] shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab} ({bookings.filter((b) => (b.status || 'upcoming') === tab).length})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {filteredBookings.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredBookings.map((item) => {
                  const Icon = categoryIcons[item.workspaceId] || Cpu;

                  return (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/5 p-5 backdrop-blur-md transition hover:border-[#FFD54A]/40 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-[#FFD54A]/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#FFD54A]">
                          {item.priceFormatted || '₦300'}
                        </span>
                      </div>

                      <h4 className="mt-4 font-bold text-white text-base">{item.workspaceName}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-[#FFE7A3] font-medium">{item.workspaceCategory || 'Workspace Desk'}</span>
                        {item.seatNumber && (
                          <span className="rounded-md bg-[#FFD54A]/20 px-2 py-0.5 text-[11px] font-bold text-[#FFD54A]">
                            {item.seatNumber}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 space-y-2 border-t border-white/10 pt-3 text-xs text-white/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-[#FFD54A]" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-[#FFD54A]" />
                          <span>{item.timeSlot} ({item.duration || '2 Hours'})</span>
                        </div>
                        {item.paymentReference && (
                          <div className="flex items-center justify-between text-[10px] text-emerald-300 font-mono bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 mt-2">
                            <span>PAYMENT: PAID</span>
                            <span>{item.paymentReference}</span>
                          </div>
                        )}
                      </div>

                      {activeTab === 'upcoming' && (
                        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-white/40">Policy: 1h cancellation window</span>
                          <button
                            onClick={() => handleCancelBooking(item.id)}
                            disabled={cancellingId === item.id}
                            className="inline-flex items-center gap-1.5 font-semibold text-red-400 hover:text-red-300 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {cancellingId === item.id ? 'Cancelling...' : 'Cancel Booking'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">No {activeTab} bookings found</h3>
                <p className="mt-2 max-w-md text-sm text-white/60">
                  {activeTab === 'upcoming'
                    ? 'You currently have no upcoming workspace reservations. Reserve a desk, computer lab workstation, or creator studio pod today!'
                    : `You have no ${activeTab} workspace bookings in your history.`}
                </p>

                {activeTab === 'upcoming' && (
                  <Button
                    variant="primary"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="mt-6 gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Book Your First Session (₦300)
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};

export default BookingsPage;
