import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../../firebase/firebase';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';
import ReservationTicket from '../../components/booking/ReservationTicket';
import ErrorState from '../../app/components/common/ErrorState';
import { cancelReservation } from '../../services/reservationService';

const ReservationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);

        // Check reservations collection
        let docRef = doc(db, 'reservations', id);
        let docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // Fallback to bookings collection
          docRef = doc(db, 'bookings', id);
          docSnap = await getDoc(docRef);
        }

        if (docSnap.exists()) {
          setReservation({
            id: docSnap.id,
            sourceCollection: docRef.parent.id,
            ...docSnap.data(),
          });
        } else {
          setError('Reservation record not found.');
        }
      } catch (err) {
        console.error('Error loading reservation details:', err);
        setError('Failed to load reservation details from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);

  const handleCancelReservation = async () => {
    if (!reservation) return;
    try {
      setIsCancelling(true);
      await cancelReservation(reservation);

      setReservation((prev) => ({ ...prev, status: 'cancelled' }));
      toast.success('Reservation cancelled successfully.');
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      toast.error('Failed to cancel reservation.');
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        <div className="h-40 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
        <div className="h-80 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ErrorState title="Reservation Not Found" message={error || 'The requested reservation ID could not be retrieved.'} />
        <div className="mt-6 flex justify-center">
          <Button onClick={() => navigate('/tickets')} variant="primary">
            Return to My Tickets
          </Button>
        </div>
      </div>
    );
  }

  const isUpcoming = (reservation.status || 'upcoming') === 'upcoming';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-[#FFD54A] transition mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Reservations
        </button>

        <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
                <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
                Reservation Details
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {reservation.workspaceName}
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Seat {reservation.seatNumber} • {reservation.date} ({reservation.timeSlot})
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest shrink-0 ${
                isUpcoming
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/10 text-white/50 border border-white/10'
              }`}
            >
              {reservation.status || 'Upcoming'}
            </span>
          </div>
        </section>
      </div>

      {/* Main Grid: Ticket Pass Left, Meta Details Right */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ReservationTicket ticket={reservation} />
        </div>

        <div className="lg:col-span-7">
          <GlassCard className="h-full space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Full Booking Summary</h3>
              <p className="text-xs text-white/60 mt-1">Verified Firestore transaction audit record</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Ticket ID</span>
                <span className="font-mono font-bold text-[#FFD54A]">{reservation.ticketId || reservation.id}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Hub Location</span>
                <span className="font-semibold text-white">NIVOX Main Innovation Hub</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Space & Category</span>
                <span className="font-semibold text-white">{reservation.workspaceName} ({reservation.workspaceCategory || 'Desk'})</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Assigned Seat</span>
                <span className="font-bold text-[#FFD54A] text-sm">{reservation.seatNumber || 'Desk A-01'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Date & Duration</span>
                <span className="font-semibold text-[#FFE7A3]">{reservation.date} • {reservation.duration || '2 Hours'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Time Slot</span>
                <span className="font-semibold text-white">{reservation.timeSlot}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Payment Reference</span>
                <span className="font-mono font-bold text-emerald-300">{reservation.paymentReference || 'PAY-NIV-PASS'}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-sm font-bold">
                <span className="text-white/70">Session Rate</span>
                <span className="text-2xl font-black text-[#FFD54A]">{reservation.priceFormatted || '₦300'}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-300 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>Gigabit Wi-Fi, power backup & desk equipment guaranteed for this session.</span>
            </div>

            {isUpcoming && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50">Cancel anytime 1+ hr before session start</span>
                <Button
                  onClick={handleCancelReservation}
                  disabled={isCancelling}
                  variant="ghost"
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-500/20 gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {isCancelling ? 'Cancelling...' : 'Cancel Reservation'}
                </Button>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsPage;
