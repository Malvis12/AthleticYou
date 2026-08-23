import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateToHome, navigateToPolicy, navigateToAdmin } = useNavigation();
  const { storeSettings } = useStore();

  return (
    <footer className="w-full border-t border-white/8 bg-black/70 backdrop-blur-md pt-16 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <h4 className="font-heading font-black text-base tracking-widest text-white">
            {storeSettings.storeName.toUpperCase()}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
            Architecting the future of physical wellness. Space-efficient training equipment for high performance home arenas in Nigeria.
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <button
                onClick={navigateToHome}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Shop Hardware
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigateToHome();
                  setTimeout(() => {
                    document.getElementById('story-narrative')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
            Support & Policies
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <button
                onClick={() => navigateToPolicy('shipping')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Shipping & Delivery
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToPolicy('returns')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Returns & Refunds
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
            Contact Us
          </h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <a
                href={`https://wa.me/${storeSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-semibold hover:underline"
              >
                WhatsApp Support
              </a>
            </li>
            <li>
              <a
                href={`mailto:${storeSettings.supportEmail}`}
                className="hover:text-white transition-colors"
              >
                {storeSettings.supportEmail}
              </a>
            </li>
            <li>
              <button
                onClick={() => navigateToPolicy('contact')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Send a Message
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <p>&copy; 2026 {storeSettings.storeName} Nigeria. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button
            onClick={navigateToAdmin}
            className="text-zinc-600 hover:text-zinc-400 font-mono text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            title="Open Admin CMS Portal"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>
          <span className="text-zinc-400 font-heading font-bold">
            {storeSettings.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
};
