import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Modal from './Modal';
import Button from '../ui/Button';

const ConfirmModal = ({ open, onClose, onConfirm, title, message, confirmText = 'Confirm Action', loading = false }) => {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} className="max-w-md p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title || 'Confirm Action'}</h3>
            <p className="text-xs text-red-300 uppercase tracking-wider font-semibold">Destructive Action</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 text-xs text-white/80 leading-relaxed">
        {message || 'Are you sure you want to proceed with this action? This step cannot be undone.'}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
        <Button onClick={onClose} variant="secondary" disabled={loading} size="sm">
          Keep Reservation
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="ghost"
          size="sm"
          className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/40"
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
