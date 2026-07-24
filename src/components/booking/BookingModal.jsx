import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Cpu,
  CreditCard,
  ShieldCheck,
  Users,
  X,
  ArrowRight,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { auth, db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import Modal from '../design/feedback/Modal';
import Button from '../design/ui/Button';
import ReservationTicket from './ReservationTicket';
import {
  completePaystackPayment,
  finalizePaidReservation,
  isPaystackConfigured,
} from '../../services/paymentService';
import { DEFAULT_SETTINGS, fetchSystemSettings } from '../../services/systemService';

const WORKSPACES = [
  {
    id: 'learning-zone',
    name: 'Learning Zone Desk',
    category: 'Study & Research',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Quiet desk with gigabit Wi-Fi, power outlet & study lamp.',
    accent: 'bg-[#FFD54A]/15 text-[#FFD54A] border-[#FFD54A]/30',
    seats: Array.from({ length: 12 }, (_, i) => ({
      id: `lz-desk-${i + 1}`,
      number: `Desk A-${(i + 1).toString().padStart(2, '0')}`,
      type: 'Individual Desk',
    })),
  },
  {
    id: 'computer-lab',
    name: 'Computer Lab Workstation',
    category: 'High-Performance PC',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description: 'Dual-monitor PC workstation with design & coding software.',
    accent: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    seats: Array.from({ length: 8 }, (_, i) => ({
      id: `pc-lab-${i + 1}`,
      number: `PC Station PC-0${i + 1}`,
      type: 'Core i9 Workstation',
    })),
  },
  {
    id: 'creator-studio',
    name: 'Creator Studio Pod',
    category: 'Media & Podcasting',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'Sound-isolated studio with 4K camera, mic & lighting.',
    accent: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    seats: [
      { id: 'pod-01', number: 'Pod POD-01 (Podcast)', type: 'Audio Studio' },
      { id: 'pod-02', number: 'Pod POD-02 (Video)', type: '4K Filming Studio' },
      { id: 'pod-03', number: 'Pod POD-03 (Editing)', type: 'Mac Studio Rig' },
      { id: 'pod-04', number: 'Pod POD-04 (Live stream)', type: 'Streaming Booth' },
    ],
  },
  {
    id: 'innovation-lounge',
    name: 'Innovation Lounge Desk',
    category: 'Team Collaboration',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'Collaborative desk with whiteboard access & meeting setup.',
    accent: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    seats: [
      { id: 't1-s1', number: 'Table 1 - Seat 1', group: 'Table 1 (Cap: 4)' },
      { id: 't1-s2', number: 'Table 1 - Seat 2', group: 'Table 1 (Cap: 4)' },
      { id: 't1-s3', number: 'Table 1 - Seat 3', group: 'Table 1 (Cap: 4)' },
      { id: 't1-s4', number: 'Table 1 - Seat 4', group: 'Table 1 (Cap: 4)' },
      { id: 't2-s1', number: 'Table 2 - Seat 1', group: 'Table 2 (Cap: 4)' },
      { id: 't2-s2', number: 'Table 2 - Seat 2', group: 'Table 2 (Cap: 4)' },
      { id: 't2-s3', number: 'Table 2 - Seat 3', group: 'Table 2 (Cap: 4)' },
      { id: 't2-s4', number: 'Table 2 - Seat 4', group: 'Table 2 (Cap: 4)' },
    ],
  },
];

const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

const BookingModal = ({ open, onClose, onBookingSuccess }) => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [occupiedSeatIds, setOccupiedSeatIds] = useState([]);
  const [isCheckingSeats, setIsCheckingSeats] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [paymentOutcome, setPaymentOutcome] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(DEFAULT_SETTINGS.pricing);

  useEffect(() => {
    if (!open) return;
    let active = true;
    fetchSystemSettings().then((settings) => {
      if (active) setBookingPrice(Number(settings.pricing) || DEFAULT_SETTINGS.pricing);
    });
    return () => {
      active = false;
    };
  }, [open]);

  // Fetch occupied seats for selected workspace, date, and time slot
  useEffect(() => {
    if (!open || !selectedWorkspace || !selectedDate || !selectedTimeSlot) return;

    const fetchOccupiedSeats = async () => {
      try {
        setIsCheckingSeats(true);
        const q = query(
          collection(db, 'seat_reservations'),
          where('workspaceId', '==', selectedWorkspace.id),
          where('date', '==', selectedDate),
          where('timeSlot', '==', selectedTimeSlot),
          where('status', 'in', ['upcoming', 'payment_pending'])
        );
        const snapshot = await getDocs(q);
        const now = Date.now();
        const occupiedIds = snapshot.docs
          .map((seatDocument) => seatDocument.data())
          .filter((seat) => (
            seat.status === 'upcoming'
            || seat.holdExpiresAt?.toMillis?.() > now
          ))
          .map((seat) => seat.seatId)
          .filter(Boolean);
        setOccupiedSeatIds(occupiedIds);
      } catch (err) {
        console.error('Error checking seat availability:', err);
        setOccupiedSeatIds([]);
      } finally {
        setIsCheckingSeats(false);
      }
    };

    fetchOccupiedSeats();
  }, [open, selectedWorkspace, selectedDate, selectedTimeSlot]);

  const selectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    setSelectedSeat(null);
    setSelectedTimeSlot('');
    setPaymentOutcome(null);
    setStep(2);
  };

  const selectTimeSlot = (slot) => {
    setSelectedTimeSlot(slot);
    setSelectedSeat(null);
    setStep(3);
  };

  const selectSeat = (seat) => {
    setSelectedSeat(seat);
    setPaymentOutcome(null);
    setStep(4);
  };

  const handleNextStep = () => setStep((currentStep) => currentStep + 1);

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handlePaymentAndConfirm = async (e) => {
    if (e) e.preventDefault();
    if (isProcessingPayment) return;
    if (!selectedWorkspace || !selectedDate || !selectedTimeSlot || !selectedSeat) {
      toast.error('Complete the booking details before continuing to payment.');
      setStep(1);
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error('You must be signed in to complete a reservation.');
      return;
    }

    try {
      setIsProcessingPayment(true);
      const payment = await completePaystackPayment({
        user,
        amount: bookingPrice,
        metadata: {
          workspaceId: selectedWorkspace.id,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          seatId: selectedSeat.id,
        },
      });

      const fullData = await finalizePaidReservation({
        user,
        payment,
      });

      toast.success(`Payment Confirmed! Seat ${selectedSeat.number} Reserved.`);
      setConfirmedReservation(fullData);

      if (onBookingSuccess) {
        onBookingSuccess(fullData);
      }

      // Advance to Step 5: Confirmation Pass
      setStep(5);
    } catch (err) {
      console.error('Error confirming reservation & payment:', err);
      const cancelled = err.code === 'cancelled';
      const message = err.message || 'Payment processing failed. Please try again.';
      setPaymentOutcome({
        type: cancelled ? 'cancelled' : 'failed',
        message,
        reference: err.reference || '',
      });
      setStep(6);
      toast.error(message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleFinishModal = () => {
    setStep(1);
    setSelectedWorkspace(null);
    setSelectedSeat(null);
    setSelectedTimeSlot('');
    setConfirmedReservation(null);
    setPaymentOutcome(null);
    onClose();
  };

  if (!open) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <Modal open={open} onClose={handleFinishModal} className="max-w-xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">NIVOX Reservation Module</h3>
            <p className="text-xs text-white/60">Official Rate: ₦300 for 2 Hours</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFinishModal}
          aria-label="Close booking"
          className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Indicator */}
      {step <= 4 && (
        <div className="mt-5 flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
          <span className={step >= 1 ? 'text-[#FFD54A]' : ''}>1. Space</span>
          <span className={step >= 2 ? 'text-[#FFD54A]' : ''}>2. Slot</span>
          <span className={step >= 3 ? 'text-[#FFD54A]' : ''}>3. Seat Map</span>
          <span className={step >= 4 ? 'text-[#FFD54A]' : ''}>4. Payment</span>
        </div>
      )}

      {/* Step Content */}
      <div className="mt-6 min-h-[310px]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
        {/* Step 1: Select Workspace */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Select Innovation Space</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {WORKSPACES.map((workspace) => {
                const Icon = workspace.icon;
                const isSelected = selectedWorkspace?.id === workspace.id;

                return (
                  <motion.button
                    key={workspace.id}
                    type="button"
                    onClick={() => selectWorkspace(workspace)}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    aria-label={`Select ${workspace.name}`}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-200 ${
                      isSelected
                        ? 'border-[#FFD54A] bg-[#FFD54A]/10 ring-2 ring-[#FFD54A]/50'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="h-24 w-full overflow-hidden rounded-xl mb-3">
                      <img
                        src={workspace.image}
                        alt={workspace.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${workspace.accent}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#FFD54A]" />}
                    </div>
                    <h4 className="mt-2 font-bold text-white text-sm">{workspace.name}</h4>
                    <p className="mt-1 text-xs text-white/60 leading-relaxed">{workspace.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Slot */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#FFD54A]/30 bg-[#FFD54A]/10 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FFD54A]" />
                <div>
                  <p className="text-sm font-bold text-white">{selectedWorkspace?.name}</p>
                  <p className="mt-1 text-xs text-white/65">{selectedWorkspace?.description}</p>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="booking-date" className="text-xs font-semibold uppercase tracking-wider text-white/60">
                1. Select Date
              </label>
              <input
                id="booking-date"
                type="date"
                min={todayStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/20 bg-[#140726] p-3 text-white focus:border-[#FFD54A] focus:outline-none"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">2. Select 2-Hour Time Slot</p>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => selectTimeSlot(slot)}
                      aria-pressed={isSelected}
                      className={`flex items-center justify-between rounded-xl border p-3 text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-[#FFD54A] bg-[#FFD54A]/15 text-[#FFD54A] ring-2 ring-[#FFD54A]/50'
                          : 'border-white/10 bg-white/5 text-white hover:border-[#FFD54A]/40'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {slot}
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#FFD54A]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Visual Seat Map */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Select Seat in {selectedWorkspace.name}
              </p>
              {isCheckingSeats && <span className="text-xs text-[#FFD54A]">Checking availability...</span>}
            </div>

            <div className="flex items-center gap-4 text-xs text-white/70 bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-white/10 border border-white/20" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-[#FFD54A]" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-red-500/40 border border-red-500/60" /> Reserved
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 max-h-[220px] overflow-y-auto pr-1">
              {selectedWorkspace.seats.map((seat) => {
                const isOccupied = occupiedSeatIds.includes(seat.id);
                const isSelected = selectedSeat?.id === seat.id;

                return (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={isOccupied}
                    onClick={() => selectSeat(seat)}
                    aria-pressed={isSelected}
                    className={`flex flex-col items-start justify-between rounded-xl border p-3 text-left transition-all ${
                      isOccupied
                        ? 'cursor-not-allowed border-red-500/30 bg-red-500/10 text-white/40'
                        : isSelected
                        ? 'border-[#FFD54A] bg-[#FFD54A] text-[#140726] shadow-lg font-bold'
                        : 'border-white/10 bg-white/5 text-white hover:border-[#FFD54A]/40'
                    }`}
                  >
                    <span className="text-xs font-bold">{seat.number}</span>
                    <span className="mt-1 text-[10px] opacity-80">{isOccupied ? 'Occupied' : seat.type || seat.group}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Paystack Secured Gateway */}
        {step === 4 && (
          <form onSubmit={handlePaymentAndConfirm} className="space-y-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-white/60">Workspace & Seat</span>
                <span className="font-bold text-white">{selectedWorkspace.name} ({selectedSeat?.number})</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-white/60">Date & Slot</span>
                <span className="font-semibold text-[#FFE7A3]">{selectedDate} ({selectedTimeSlot})</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="font-bold text-[#FFD54A]">Total Payable</span>
                <span className="text-2xl font-black text-[#FFD54A]">₦300</span>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-200 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Paystack Secured Gateway
                </span>
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
              </div>

              <p className="text-xs leading-6 text-white/70">
                Continue to Paystack's secure checkout to choose card, bank, transfer, or another available payment method.
                NIVOX never receives or stores your card details.
              </p>

              {!isPaystackConfigured && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                  Online checkout is awaiting production payment-server configuration.
                </div>
              )}
            </div>
          </form>
        )}

        {/* Step 5: Confirmation Pass Receipt */}
        {step === 5 && confirmedReservation && (
          <div className="space-y-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto">
              <Check className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-black text-white">Reservation Ticket Confirmed</h3>

            <ReservationTicket ticket={confirmedReservation} />
          </div>
        )}
        {step === 6 && paymentOutcome && (
          <div className="space-y-5 py-4 text-center" role="status" aria-live="polite">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-300">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">
                {paymentOutcome.type === 'cancelled' ? 'Payment Cancelled' : 'Payment Unsuccessful'}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/65">
                {paymentOutcome.message}
              </p>
              {paymentOutcome.reference && (
                <p className="mt-3 font-mono text-[11px] text-white/45">
                  Reference: {paymentOutcome.reference}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setPaymentOutcome(null);
                setStep(4);
              }}
              className="w-full justify-center"
            >
              Try Payment Again
            </Button>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className={`${step < 4 || step === 6 ? 'hidden' : 'flex'} mt-6 items-center justify-between border-t border-white/10 pt-4`}>
        {step > 1 && step < 5 ? (
          <Button type="button" variant="secondary" onClick={handlePrevStep} disabled={isProcessingPayment}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <Button type="button" variant="primary" onClick={handleNextStep} className="gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        ) : step === 4 ? (
          <Button
            type="button"
            variant="primary"
            onClick={handlePaymentAndConfirm}
            disabled={isProcessingPayment}
            className="gap-2 shadow-[0_10px_25px_rgba(255,213,74,0.3)]"
          >
            {isProcessingPayment ? 'Opening Paystack…' : 'Continue to Paystack • ₦300'}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              handleFinishModal();
              navigate('/tickets');
            }}
            className="w-full justify-center shadow-lg"
          >
            View All My Tickets
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default BookingModal;
