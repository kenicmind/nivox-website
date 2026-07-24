import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, QrCode, Sparkles, Building, GraduationCap, Download, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../design/feedback/Modal';
import Button from '../design/ui/Button';

const getStudentId = (profile) => {
  if (profile.studentId) return profile.studentId;
  const source = profile.uid || profile.email || profile.fullName || 'NIVOX-STUDENT';
  const checksum = [...source].reduce((total, character) => (
    ((total * 31) + character.charCodeAt(0)) % 100000
  ), 0);
  return `NIV-STU-${String(checksum).padStart(5, '0')}`;
};

const NivoxStudentIdBadge = ({ open, onClose, userProfile }) => {
  if (!open || !userProfile) return null;

  const studentIdNumber = getStudentId(userProfile);

  const handleDownloadId = () => {
    toast.success('Digital NIVOX Student ID downloaded to wallet');
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-md p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Permanent Digital Student ID</h3>
            <p className="text-xs text-[#FFE7A3] font-mono">NIVOX MEMBER VERIFIED</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-full p-1 text-white/50 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ID Card Display */}
      <div className="mt-6 overflow-hidden rounded-[28px] border-2 border-[#FFD54A]/40 bg-[linear-gradient(145deg,rgba(43,10,90,0.98),rgba(20,7,38,0.98))] p-6 shadow-[0_25px_80px_rgba(43,10,90,0.5)] backdrop-blur-2xl text-white relative">
        <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
          <Sparkles className="h-24 w-24 text-[#FFD54A]" />
        </div>

        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FFE7A3]">NIVOX INNOVATION HUB</span>
            <h4 className="font-mono text-sm font-bold text-white tracking-widest">{studentIdNumber}</h4>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
            Active Member
          </span>
        </div>

        <div className="my-5 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-[#FFD54A]/40 bg-[#FFD54A]/15 text-[#FFD54A] shadow-md">
            <User className="h-8 w-8" />
          </div>
          <div className="space-y-1 min-w-0">
            <h3 className="text-base font-bold text-white truncate">{userProfile.fullName || 'Student Member'}</h3>
            <p className="text-xs text-white/70 flex items-center gap-1 truncate">
              <Building className="h-3 w-3 text-[#FFD54A] shrink-0" /> {userProfile.school || 'Niger Delta University'}
            </p>
            <p className="text-xs text-[#FFE7A3] flex items-center gap-1 truncate font-semibold">
              <GraduationCap className="h-3 w-3 text-[#FFD54A] shrink-0" /> {userProfile.course || 'Computer Science'} ({userProfile.level || '300L'})
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/15 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-inner">
              <QrCode className="h-8 w-8 text-[#140726]" />
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/50">Issued Date</p>
              <p className="font-mono text-[10px] font-bold text-[#FFD54A]">JUL 2026</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-white/50">Access Level</p>
            <p className="font-bold text-emerald-300 text-xs">FULL LAB & STUDIO PASS</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleDownloadId} variant="primary" className="w-full justify-center gap-2 shadow-lg">
          <Download className="h-4 w-4" /> Save Digital ID to Wallet
        </Button>
      </div>
    </Modal>
  );
};

export default NivoxStudentIdBadge;
