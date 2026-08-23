import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const { navigateToHome } = useNavigation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 md:px-8 py-3 md:py-3.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? 'bg-onyx/90 backdrop-blur-2xl border-white/12 shadow-2xl shadow-black/80 py-2.5 md:py-3'
            : 'bg-onyx-light/80 backdrop-blur-xl border-white/10 shadow-xl shadow-black/50'
        }`}
      >
        {/* Brand */}
        <button
          onClick={navigateToHome}
          className="flex items-center gap-3 text-left cursor-pointer focus:outline-none group"
        >
          <img
            src="/assets/logo.png"
            alt="Athletic You Logo"
            className="h-6 md:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'assets/logo.png';
            }}
          />
          <span className="font-nav font-extrabold text-sm md:text-base tracking-[0.14em] text-white uppercase group-hover:text-brand-purple-light transition-colors">
            ATHLETIC YOU
          </span>
        </button>

        {/* Actions / Bag Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-100 active:scale-95 transition-all duration-200 cursor-pointer shadow-md font-nav font-bold text-xs uppercase tracking-wider"
          >
            <ShoppingBag className="w-4 h-4 text-black stroke-[2.2]" />
            <span>Bag</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-mono font-bold text-white bg-black rounded-full">
              {totalCount}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};
