import React from 'react';

export const BrandStory: React.FC = () => {
  const pillars = [
    {
      title: "NO COMMUTE",
      desc: "Your workout starts where you live. Skip the Lagos traffic and start immediately.",
    },
    {
      title: "LESS SPACE",
      desc: "Build a capable training environment without sacrificing your living space.",
    },
    {
      title: "LESS FRICTION",
      desc: "Simple equipment. Simple setup. Serious physical utility.",
    },
    {
      title: "YOUR SCHEDULE",
      desc: "Train for 15 minutes or an hour. Your environment adapts directly to you.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-onyx-surface/40 to-transparent border-y border-white/5" id="story-narrative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Story Lead */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-purple-light font-bold">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
            Your training should fit your life.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We believe you shouldn't need a long traffic-filled commute, an overpriced gym subscription, or an entire room to train seriously. Athletic You designs premium home fitness equipment engineered for real spaces, busy schedules, and real progress.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Workout simplified. Build a serious home arena anywhere in Nigeria.
          </p>
        </div>

        {/* Story Pillars */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-onyx-light/60 border border-white/8 backdrop-blur-md hover:border-white/15 transition-all"
            >
              <h4 className="text-sm font-heading font-bold text-white tracking-widest uppercase mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
