import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { storeSettings } = useStore();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase text-white mb-6"
        >
          <span>{storeSettings.heroHeadline}</span>
          <br />
          <span className="text-gradient-purple">{storeSettings.heroSubheadline}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10"
        >
          {storeSettings.heroSubtitle}
        </motion.p>

        {/* Hero Interactive Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full max-w-xl relative mb-10"
        >
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-onyx-surface/80 to-onyx-light/90 border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Product Image Viewer */}
            <div className="relative w-full h-64 sm:h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5 p-4">
              <img
                src={storeSettings.heroImageUrl || '/Dumbbell.jpg'}
                alt="Hero Showcase Equipment"
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/Dumbbell.jpg';
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a
            href="#shop-goal"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-white text-black font-heading font-black text-sm tracking-widest uppercase hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>SHOP EQUIPMENT</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
