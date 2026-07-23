import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Ticket, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SEARCH_ITEMS = [
  { id: '1', title: 'Learning Zone Studio', category: 'Space', route: '/spaces', type: 'Reservation' },
  { id: '2', title: 'Full-Stack Web Roadmap', category: 'Resource', route: '/resources', type: 'Guide' },
  { id: '3', title: 'AI & Robotics Hackathon 2026', category: 'Event', route: '/events', type: 'Workshop' },
  { id: '4', title: 'Computer Lab High-Perf PC', category: 'Space', route: '/spaces', type: 'Reservation' },
  { id: '5', title: 'UI/UX Design Systems Kit', category: 'Resource', route: '/resources', type: 'Figma Kit' },
  { id: '6', title: 'My Digital Entry Tickets', category: 'Tickets', route: '/tickets', type: 'Vault' },
];

const GlobalSearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!open) return null;

  const results = query.trim()
    ? SEARCH_ITEMS.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : SEARCH_ITEMS.slice(0, 4);

  const handleSelect = (route) => {
    onClose();
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-[#140726]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white"
      >
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search className="absolute left-3 h-5 w-5 text-[#FFD54A]" />
          <input
            type="text"
            autoFocus
            placeholder="Search NIVOX spaces, resources, tickets, events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-10 text-sm font-semibold text-white placeholder-white/50 focus:outline-none"
          />
          <button onClick={onClose} className="absolute right-2 rounded-full p-1 text-white/50 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.route)}
                className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left text-xs transition hover:border-[#FFD54A]/40 hover:bg-white/10 group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
                    {item.category === 'Space' && <Ticket className="h-4 w-4" />}
                    {item.category === 'Resource' && <BookOpen className="h-4 w-4" />}
                    {item.category === 'Event' && <Calendar className="h-4 w-4" />}
                    {item.category === 'Tickets' && <Ticket className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FFD54A] transition">{item.title}</h4>
                    <span className="text-[10px] text-white/50">{item.category} • {item.type}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-[#FFD54A] transition" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-white/50">No results matching "{query}"</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalSearchModal;
