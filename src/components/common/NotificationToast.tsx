import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { toastMessage, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl bg-onyx-surface/95 border border-brand-purple/40 text-white shadow-2xl backdrop-blur-2xl max-w-sm cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-white">{toastMessage}</div>
            <div className="text-zinc-400 text-[11px] flex items-center gap-1 mt-0.5">
              <span>Click to view your bag</span>
              <ShoppingBag className="w-3 h-3 text-brand-purple-light" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
