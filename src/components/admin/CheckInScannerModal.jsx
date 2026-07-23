import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Search, CheckCircle2, Clock, User, X, ShieldCheck } from 'lucide-react';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../../firebase/firebase';
import Modal from '../design/feedback/Modal';
import Button from '../design/ui/Button';

const CheckInScannerModal = ({ open, onClose, onRefresh }) => {
  const [queryInput, setQueryInput] = useState('');
  const [scannedReservation, setScannedReservation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!open) return null;

  const handleScanOrSearch = async (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    try {
      setIsSearching(true);
      setScannedReservation(null);

      const q = query(
        collection(db, 'reservations'),
        where('paymentReference', '==', queryInput.trim())
      );
      let snap = await getDocs(q);

      if (snap.empty) {
        const qTicket = query(
          collection(db, 'reservations'),
          where('ticketId', '==', queryInput.trim())
        );
        snap = await getDocs(qTicket);
      }

      if (!snap.empty) {
        const d = snap.docs[0];
        setScannedReservation({ id: d.id, ...d.data() });
        toast.success('Reservation ticket verified!');
      } else {
        toast.error('No matching reservation ticket found for check-in.');
      }
    } catch (err) {
      console.error('Error scanning QR ticket:', err);
      toast.error('Failed to verify ticket.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!scannedReservation) return;
    try {
      setIsUpdating(true);
      const ref = doc(db, 'reservations', scannedReservation.id);

      const updateData = { status: newStatus };
      if (newStatus === 'checked-in') updateData.checkInTime = serverTimestamp();
      if (newStatus === 'completed') updateData.checkOutTime = serverTimestamp();

      await updateDoc(ref, updateData);

      setScannedReservation((prev) => ({ ...prev, ...updateData, status: newStatus }));
      toast.success(`Student pass updated to ${newStatus}!`);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error updating attendance:', err);
      toast.error('Failed to update attendance status.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-md p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
            <QrCode className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Reception Check-in Scanner</h3>
            <p className="text-xs text-[#FFE7A3]">QR Code & Ticket Verification Gate</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-white/50 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleScanOrSearch} className="mt-5 space-y-3">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">Scan or Enter Ref</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. PAY-NIV-982341 or TKT-NIV-129481"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#140726] p-3 text-xs text-white placeholder-white/40 focus:border-[#FFD54A] focus:outline-none"
            />
            <Button type="submit" disabled={isSearching} size="sm" variant="primary" className="absolute right-1.5 top-1.5 text-xs">
              {isSearching ? 'Verifying...' : 'Verify Pass'}
            </Button>
          </div>
        </div>
      </form>

      {scannedReservation && (
        <div className="mt-5 space-y-4 rounded-2xl border border-[#FFD54A]/30 bg-[#FFD54A]/10 p-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#FFD54A]/20 pb-2">
            <span className="text-white/70">Student Name</span>
            <span className="font-bold text-white">{scannedReservation.userName}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#FFD54A]/20 pb-2">
            <span className="text-white/70">Workspace & Seat</span>
            <span className="font-extrabold text-[#FFD54A]">{scannedReservation.workspaceName} ({scannedReservation.seatNumber})</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#FFD54A]/20 pb-2">
            <span className="text-white/70">Session Date & Slot</span>
            <span className="font-semibold text-white">{scannedReservation.date} • {scannedReservation.timeSlot}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/70">Current Status</span>
            <span className="font-extrabold text-emerald-300 uppercase">{scannedReservation.status}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              onClick={() => handleUpdateStatus('checked-in')}
              disabled={isUpdating || scannedReservation.status === 'checked-in'}
              variant="primary"
              size="sm"
              className="justify-center text-xs"
            >
              Check-In Student
            </Button>
            <Button
              onClick={() => handleUpdateStatus('completed')}
              disabled={isUpdating || scannedReservation.status === 'completed'}
              variant="secondary"
              size="sm"
              className="justify-center text-xs"
            >
              Check-Out
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CheckInScannerModal;
