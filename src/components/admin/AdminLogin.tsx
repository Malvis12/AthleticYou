import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Dumbbell, AlertCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const { navigateToHome } = useNavigation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: admin123 (or customizable)
    if (pin === 'admin123' || pin === 'admin' || pin === 'athleticyou') {
      sessionStorage.setItem('ay_admin_authenticated', 'true');
      onLogin();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        <div className="p-8 sm:p-10 rounded-3xl bg-onyx-surface/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Brand & Icon */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 text-brand-purple-light mx-auto flex items-center justify-center mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-purple-light font-bold">
              PORTAL ACCESS
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              ATHLETIC YOU CMS
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Storefront Content & Hardware Management System
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Invalid password. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Admin Password / PIN
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors font-mono tracking-widest"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand-purple/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <button
              onClick={navigateToHome}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              ← Back to Storefront
            </button>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secure Session</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
