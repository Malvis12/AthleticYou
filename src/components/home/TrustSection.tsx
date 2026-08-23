import React from 'react';
import { Truck, ShieldCheck, Lock, MessageCircle } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustCards = [
    {
      icon: <Truck className="w-6 h-6 text-brand-purple-light" />,
      title: "Nationwide Delivery",
      desc: "Lagos priority: 1-2 business days. Other Nigerian states (Abuja, Port Harcourt, Ibadan, etc.): 3-5 business days. Flat delivery rates apply.",
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-400" />,
      title: "Secure Payments",
      desc: "100% secure payment processing architecture. Support for Nigerian cards, USSD, and bank transfers via secure Paystack channels.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />,
      title: "1-Year Warranty",
      desc: "All structural metal and physical gym-grade hardware include an automatic 1-year product warranty. Buy with total confidence.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
      title: "Local Support",
      desc: "Need help deciding or tracking your order? Reach our team directly via local Nigerian WhatsApp or Email support channels.",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustCards.map((card, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-onyx-surface/50 border border-white/6 backdrop-blur-lg flex flex-col justify-between hover:border-white/15 transition-all group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h4 className="text-base font-heading font-bold text-white mb-2">
                {card.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
