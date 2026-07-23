import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, CheckCheck, X, Sparkles, AlertCircle, Info } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../firebase/firebase';
import { fetchUserNotifications, markNotificationAsRead } from '../../services/notificationService';
import Button from '../design/ui/Button';

const NotificationCenter = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setNotifications([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchUserNotifications(currentUser.uid);
        setNotifications(data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [open]);

  const handleMarkAllRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.read);
      await Promise.all(unread.map((n) => markNotificationAsRead(n.id)));
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Error marking notifications read:', err);
    }
  };

  if (!open) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.96 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-full max-w-md rounded-[28px] border border-white/15 bg-[#140726]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white mt-16"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
              <BellRing className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Notification Center</h3>
              <p className="text-[11px] text-white/60">{unreadCount} unread updates</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-[#FFD54A] hover:underline"
              >
                Mark Read
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 max-h-[360px] overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-8 text-center text-xs text-white/50 animate-pulse">Loading updates...</div>
          ) : notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 rounded-2xl border p-3.5 backdrop-blur transition ${
                  item.read
                    ? 'border-white/5 bg-white/5 opacity-70'
                    : 'border-[#FFD54A]/30 bg-[#FFD54A]/10 text-white'
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white text-xs">{item.title}</p>
                    <span className="text-[10px] text-white/40">{item.time || 'Just now'}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/70 leading-relaxed">{item.detail || item.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-white/50">No notifications in your inbox yet.</div>
          )}
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-center">
          <Button variant="ghost" size="sm" onClick={onClose} className="w-full justify-center text-xs">
            Close Center
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationCenter;
