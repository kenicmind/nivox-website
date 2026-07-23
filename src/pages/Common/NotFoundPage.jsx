import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Home, Sparkles } from 'lucide-react';
import Button from '../../components/design/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg overflow-hidden rounded-[32px] border border-[#FFD54A]/30 bg-[linear-gradient(145deg,rgba(43,10,90,0.92),rgba(20,7,38,0.98))] p-8 text-center shadow-[0_25px_80px_rgba(43,10,90,0.5)] backdrop-blur-2xl text-white sm:p-12"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD54A]/15 text-[#FFD54A] shadow-[0_0_40px_rgba(255,213,74,0.3)] mb-6">
          <AlertTriangle className="h-10 w-10 text-[#FFD54A]" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
          <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
          404 Error • Page Not Found
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Lost in Space?
        </h1>

        <p className="mt-3 text-sm text-white/70 leading-relaxed">
          The page or workspace URL you requested could not be located on the NIVOX network.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => navigate(-1)} variant="secondary" className="w-full sm:w-auto gap-2">
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
          <Button onClick={() => navigate('/dashboard')} variant="primary" className="w-full sm:w-auto gap-2 shadow-lg">
            <Home className="h-4 w-4" /> Return to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
