import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';

export const BentoGrid: React.FC = () => {
  const cards = [
    {
      number: "01",
      title: "No Travel Time",
      desc: "No traffic, packing bags, or queuing. Your training ground is exactly 10 seconds away, removing the commute barrier to starting your workout.",
      badge: "ELIMINATE COMMUTE",
      spotlightColor: "rgba(123, 44, 191, 0.2)",
    },
    {
      number: "02",
      title: "Space Optimization",
      desc: "Gym-grade hardware designed to blend elegantly into your Nigerian home. Your living space remains a sanctuary, transforming only when you choose to train.",
      badge: "COMPACT STORAGE",
      spotlightColor: "rgba(226, 184, 116, 0.18)",
    },
    {
      number: "03",
      title: "Zero Friction",
      desc: "No check-ins, sign-ups, or crowding. Direct physical utility built for immediate training when a window in your schedule opens.",
      badge: "INSTANT ACCESS",
      spotlightColor: "rgba(16, 185, 129, 0.18)",
    },
    {
      number: "04",
      title: "Adapts To You",
      desc: "Whether you have a quick 15-minute conditioning window or a dedicated 90-minute heavy strength block, your home environment adapts to you.",
      badge: "24/7 FLEXIBILITY",
      spotlightColor: "rgba(59, 130, 246, 0.18)",
    },
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="bento">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-purple-light font-bold">
          EFFICIENCY FIRST
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2 tracking-tight uppercase">
          WHY ATHLETIC YOU?
        </h2>
      </motion.div>

      {/* 2x2 Bento Grid with Specular Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <SpotlightCard
              spotlightColor={card.spotlightColor}
              className="p-8 sm:p-10 min-h-[220px] flex flex-col justify-between group cursor-default"
            >
              {/* Giant Number in background with subtle glow */}
              <div className="absolute top-6 right-8 text-5xl sm:text-6xl font-heading font-black text-white/5 group-hover:text-white/10 transition-colors select-none">
                {card.number}
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-purple-light mb-2 block">
                  {card.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  {card.desc}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>ATHLETIC YOU SYSTEM</span>
                <span className="text-zinc-600 font-bold">● {card.number}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
