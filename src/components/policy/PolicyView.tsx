import React from 'react';
import { ArrowLeft, Truck, RotateCcw, MessageCircle, Mail } from 'lucide-react';
import { useNavigation, PolicyTab } from '../../context/NavigationContext';

export const PolicyView: React.FC = () => {
  const { selectedPolicyTab, navigateToPolicy, navigateToHome } = useNavigation();

  const tabs: { key: PolicyTab; label: string; icon: React.ReactNode }[] = [
    { key: 'shipping', label: 'Shipping & Delivery', icon: <Truck className="w-4 h-4" /> },
    { key: 'returns', label: 'Returns & Refunds', icon: <RotateCcw className="w-4 h-4" /> },
    { key: 'contact', label: 'Support & Contact', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-28 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
      {/* Return Button */}
      <button
        onClick={navigateToHome}
        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 hover:text-white mb-8 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>BACK TO STORE</span>
      </button>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-8 border-b border-white/10 pb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => navigateToPolicy(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedPolicyTab === t.key
                ? 'bg-brand-purple text-white shadow-md'
                : 'text-zinc-400 hover:text-white bg-onyx-surface border border-white/5'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content Panels */}
      <div className="p-6 sm:p-10 rounded-3xl bg-onyx-surface/80 border border-white/8 backdrop-blur-xl space-y-6 text-sm text-zinc-300 leading-relaxed">
        {selectedPolicyTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-black text-white">
              SHIPPING & DELIVERY POLICY
            </h2>
            <p>
              Athletic You operates nationwide distribution centers ensuring rapid delivery across all 36 states of Nigeria and the Federal Capital Territory (Abuja).
            </p>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <h4 className="font-bold text-white">Estimated Delivery Windows:</h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li><strong className="text-zinc-200">Lagos State:</strong> 1 - 2 business days (Same-day dispatch for orders placed before 12:00 PM).</li>
                <li><strong className="text-zinc-200">Abuja, Ogun, Oyo, Rivers, Edo:</strong> 2 - 4 business days.</li>
                <li><strong className="text-zinc-200">All Other States:</strong> 3 - 5 business days.</li>
              </ul>
            </div>
            <p>
              Free nationwide delivery is automatically applied on all qualifying bulk orders.
            </p>
          </div>
        )}

        {selectedPolicyTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-black text-white">
              RETURNS & REFUND POLICY
            </h2>
            <p>
              We stand behind the physical engineering of our equipment. If you receive an item with structural defects or damage incurred during transit, we provide a seamless <strong>7-Day Replacement Guarantee</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <h4 className="font-bold text-white">Return Conditions:</h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li>Items must be in original un-abused condition with all accessories, straps, and manuals included.</li>
                <li>Report transit damage within 48 hours of courier delivery.</li>
                <li>Replacements are dispatched free of delivery charge once confirmed.</li>
              </ul>
            </div>
          </div>
        )}

        {selectedPolicyTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-black text-white">
              CONTACT & CLIENT SUPPORT
            </h2>
            <p>
              Have questions regarding equipment dimensions, fitness setup advice, or bulk corporate gym inquiries? Reach our team directly:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/2348126708708"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 hover:bg-emerald-500/20 transition-all text-emerald-400"
              >
                <MessageCircle className="w-5 h-5" />
                <div>
                  <div className="text-xs uppercase font-mono font-bold text-emerald-300">WhatsApp Chat</div>
                  <div className="text-sm font-bold text-white">+234 812 670 8708</div>
                </div>
              </a>

              <a
                href="mailto:support@athleticyou.com"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all text-zinc-300"
              >
                <Mail className="w-5 h-5 text-brand-purple-light" />
                <div>
                  <div className="text-xs uppercase font-mono font-bold text-zinc-400">Email Support</div>
                  <div className="text-sm font-bold text-white">support@athleticyou.com</div>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
