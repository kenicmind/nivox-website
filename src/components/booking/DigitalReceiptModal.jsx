import React from 'react';
import { CreditCard, Printer, CheckCircle2, X } from 'lucide-react';
import Modal from '../design/feedback/Modal';
import Button from '../design/ui/Button';

const DigitalReceiptModal = ({ open, onClose, receipt }) => {
  if (!open || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-md p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <CreditCard className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Digital Payment Receipt</h3>
            <p className="text-xs text-emerald-300 font-mono">PAYSTACK SECURED TRANSACTION</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-white/50 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs text-white">
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Receipt Reference</span>
          <span className="font-mono font-bold text-[#FFD54A]">{receipt.paymentReference || 'PAY-NIV-982341'}</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Billed Student</span>
          <span className="font-semibold">{receipt.userName || 'Student'}</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Workspace Session</span>
          <span className="font-semibold">{receipt.workspaceName} ({receipt.seatNumber})</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Date & Slot</span>
          <span className="font-semibold text-[#FFE7A3]">{receipt.date} • {receipt.timeSlot}</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Subtotal (2 Hours)</span>
          <span className="font-semibold">₦300.00</span>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-white/60">Tax / VAT</span>
          <span className="font-semibold">₦0.00</span>
        </div>

        <div className="flex justify-between items-center pt-2 text-sm">
          <span className="font-bold text-white">Total Amount Paid</span>
          <span className="font-black text-[#FFD54A] text-xl">₦300.00</span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={handlePrint} variant="ghost" className="w-full justify-center gap-2 border border-white/15">
          <Printer className="h-4 w-4" /> Print / Save PDF
        </Button>
        <Button onClick={onClose} variant="primary" className="w-full justify-center">
          Done
        </Button>
      </div>
    </Modal>
  );
};

export default DigitalReceiptModal;
