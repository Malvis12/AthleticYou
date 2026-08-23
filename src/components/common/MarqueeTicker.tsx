import React from 'react';
import { ShieldCheck, Zap, Truck, Dumbbell, Award, Flame } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MarqueeTicker: React.FC = () => {
  const { storeSettings } = useStore();

  const icons = [
    <Zap className="w-3.5 h-3.5 text-brand-purple-light" />,
    <Truck className="w-3.5 h-3.5 text-emerald-400" />,
    <Dumbbell className="w-3.5 h-3.5 text-brand-gold" />,
    <ShieldCheck className="w-3.5 h-3.5 text-brand-purple-light" />,
    <Award className="w-3.5 h-3.5 text-emerald-400" />,
    <Flame className="w-3.5 h-3.5 text-brand-gold" />,
  ];

  const items = storeSettings.marqueeTexts.map((text, idx) => ({
    icon: icons[idx % icons.length],
    text,
  }));

  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-onyx-light/40 py-3.5 backdrop-blur-sm">
      <div className="flex w-max animate-marquee space-x-10 text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 select-none">
            {item.icon}
            <span>{item.text}</span>
            <span className="text-zinc-700 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
