import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Calendar, Clock, MapPin, Ticket, CreditCard, Eye, CheckCircle2, X } from 'lucide-react';
import Button from '../design/ui/Button';
import Modal from '../design/feedback/Modal';

const ReservationTicket = ({ ticket }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const navigate = useNavigate();

  if (!ticket) return null;

  const ticketId = ticket.ticketId || `TKT-NIV-${(ticket.id || '').substring(0, 6).toUpperCase() || '883920'}`;
  const isUpcoming = (ticket.status || 'upcoming') === 'upcoming';
  const paymentRef = ticket.paymentReference || 'PAY-NIV-PASS';

  return (
    <>
      <div className="flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#FFD54A]/30 bg-[linear-gradient(145deg,rgba(43,10,90,0.92),rgba(20,7,38,0.98))] p-6 shadow-[0_20px_60px_rgba(43,10,90,0.35)] backdrop-blur-xl text-white transition-all duration-300 hover:border-[#FFD54A] hover:shadow-[0_24px_70px_rgba(255,213,74,0.25)]">
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
              <Ticket className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFE7A3]">Entry Pass</span>
              <h4 className="font-mono text-xs font-bold text-white tracking-wide">{ticketId}</h4>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest ${
              isUpcoming
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/10 text-white/50 border border-white/10'
            }`}
          >
            {ticket.status || 'Upcoming'}
          </span>
        </div>

        {/* Ticket Body Details */}
        <div className="my-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Student</span>
              <p className="mt-0.5 font-bold text-white text-xs truncate">{ticket.userName || 'Student'}</p>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Assigned Seat</span>
              <p className="mt-0.5 font-extrabold text-[#FFD54A] text-xs">{ticket.seatNumber || 'Desk A-01'}</p>
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#FFD54A]" /> Space
              </span>
              <span className="font-semibold text-white truncate max-w-[140px] text-right">{ticket.workspaceName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#FFD54A]" /> Date
              </span>
              <span className="font-semibold text-[#FFE7A3]">{ticket.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#FFD54A]" /> Slot
              </span>
              <span className="font-semibold text-white">{ticket.timeSlot}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
              <span className="text-emerald-300 font-mono flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5" /> PAID • PAYSTACK
              </span>
              <span className="font-black text-[#FFD54A]">{ticket.priceFormatted || '₦300'}</span>
            </div>
          </div>
        </div>

        {/* Ticket Cutout Line */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute -left-9 h-5 w-5 rounded-full bg-[#140726]" />
          <div className="w-full border-t border-dashed border-white/15" />
          <div className="absolute -right-9 h-5 w-5 rounded-full bg-[#140726]" />
        </div>

        {/* QR Code Stub & Check-in note */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-inner">
                <QrCode className="h-10 w-10 text-[#140726]" />
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-white/50">Verification Ref</p>
                <p className="font-mono text-xs font-bold text-[#FFD54A]">{paymentRef}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate(`/student/reservations/${ticket.id}`)}
                variant="ghost"
                size="sm"
                className="border border-white/15 text-xs"
              >
                Open Record
              </Button>
              <Button onClick={() => setIsDetailOpen(true)} variant="ghost" size="sm" className="gap-1 border border-white/15 text-xs">
                <Eye className="h-3.5 w-3.5" />
                Details
              </Button>
            </div>
          </div>

          <p className="text-[10px] text-white/50 italic text-center border-t border-white/10 pt-2">
            Present this QR pass at the NIVOX reception desk for instant check-in.
          </p>
        </div>
      </div>

      {/* Detail Pass Modal */}
      <Modal open={isDetailOpen} onClose={() => setIsDetailOpen(false)} className="max-w-md p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
              <Ticket className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Entry Pass Details</h3>
              <p className="text-xs text-[#FFE7A3] font-mono">{ticketId}</p>
            </div>
          </div>
          <button onClick={() => setIsDetailOpen(false)} className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div className="flex justify-between"><span className="text-white/60">Location</span><span className="font-bold text-white">NIVOX Main Innovation Hub</span></div>
            <div className="flex justify-between"><span className="text-white/60">Space Name</span><span className="font-semibold text-[#FFE7A3]">{ticket.workspaceName}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Assigned Seat</span><span className="font-bold text-[#FFD54A]">{ticket.seatNumber || 'Desk A-01'}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Reservation Date</span><span className="font-semibold text-white">{ticket.date}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Time Slot</span><span className="font-semibold text-white">{ticket.timeSlot}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Payment Reference</span><span className="font-mono text-emerald-300 font-bold">{paymentRef}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Amount Paid</span><span className="font-black text-[#FFD54A]">{ticket.priceFormatted || '₦300'}</span></div>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-[11px] text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>High-speed Wi-Fi, power backup & desk access guaranteed.</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={() => setIsDetailOpen(false)} className="w-full justify-center">
            Close Entry Pass
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ReservationTicket;
