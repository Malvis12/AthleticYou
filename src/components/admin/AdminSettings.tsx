import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Building,
  MessageCircle,
  Type,
  Check,
  Sparkles,
  Database,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SUPABASE_URL } from '../../lib/supabaseClient';

export const AdminSettings: React.FC = () => {
  const { storeSettings, updateStoreSettings } = useStore();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    storeName: storeSettings.storeName,
    tagline: storeSettings.tagline,
    whatsappNumber: storeSettings.whatsappNumber,
    supportEmail: storeSettings.supportEmail,
    bankName: storeSettings.bankName,
    accountName: storeSettings.accountName,
    accountNumber: storeSettings.accountNumber,
    heroHeadline: storeSettings.heroHeadline,
    heroSubheadline: storeSettings.heroSubheadline,
    heroSubtitle: storeSettings.heroSubtitle,
    marqueeText1: storeSettings.marqueeTexts[0] || 'WORKOUT SIMPLIFIED',
    marqueeText2: storeSettings.marqueeTexts[1] || 'FAST NATIONWIDE NIGERIAN DELIVERY',
    marqueeText3: storeSettings.marqueeTexts[2] || 'SOLID CAST-IRON HARDWARE',
    marqueeText4: storeSettings.marqueeTexts[3] || 'PREMIUM TRAINING SYSTEMS',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStoreSettings({
      storeName: form.storeName,
      tagline: form.tagline,
      whatsappNumber: form.whatsappNumber,
      supportEmail: form.supportEmail,
      bankName: form.bankName,
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      heroHeadline: form.heroHeadline,
      heroSubheadline: form.heroSubheadline,
      heroSubtitle: form.heroSubtitle,
      marqueeTexts: [
        form.marqueeText1,
        form.marqueeText2,
        form.marqueeText3,
        form.marqueeText4,
        'ZERO COMMUTE • TRAIN AT HOME',
        'ENGINEERED FOR REAL SPACES',
      ],
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Supabase Cloud Live Status */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-brand-purple/15 to-onyx-surface/80 border border-brand-purple/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-base sm:text-lg text-white">
                SUPABASE CLOUD DATABASE
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>CONNECTED DIRECTLY</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              Endpoint: {SUPABASE_URL}
            </p>
          </div>
        </div>

        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs border border-white/10 transition-colors shrink-0 w-fit cursor-pointer"
        >
          <span>Supabase Dashboard</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Storefront Settings Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* Save action header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div>
            <h2 className="text-xl font-heading font-black text-white">STOREFRONT SETTINGS</h2>
            <p className="text-xs text-zinc-400">All updates write directly to Supabase cloud in real time.</p>
          </div>
          <button
            type="submit"
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 cursor-pointer ${
              saved
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-brand-purple hover:bg-brand-purple-light text-white shadow-brand-purple/30 active:scale-95'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Supabase!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save to Cloud</span>
              </>
            )}
          </button>
        </div>

        {/* 1. Official Bank Account Details */}
        <div className="p-6 rounded-3xl bg-onyx-surface/80 border border-white/8 space-y-4">
          <div className="flex items-center gap-2.5 text-brand-purple-light">
            <Building className="w-5 h-5" />
            <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">
              Official Nigerian Bank Account (For Transfers)
            </h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            These bank details are displayed automatically to customers selecting Direct Bank Transfer at checkout.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Bank Name *
              </label>
              <input
                type="text"
                required
                value={form.bankName}
                onChange={(e) => setForm((p) => ({ ...p, bankName: e.target.value }))}
                placeholder="e.g. Zenith Bank PLC"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Account Name *
              </label>
              <input
                type="text"
                required
                value={form.accountName}
                onChange={(e) => setForm((p) => ({ ...p, accountName: e.target.value }))}
                placeholder="e.g. ATHLETIC YOU FITNESS NIG LTD"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Account Number (10 Digits) *
              </label>
              <input
                type="text"
                required
                value={form.accountNumber}
                onChange={(e) => setForm((p) => ({ ...p, accountNumber: e.target.value }))}
                placeholder="e.g. 1229048590"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-mono tracking-wider"
              />
            </div>
          </div>
        </div>

        {/* 2. Official WhatsApp & Contact */}
        <div className="p-6 rounded-3xl bg-onyx-surface/80 border border-white/8 space-y-4">
          <div className="flex items-center gap-2.5 text-[#25D366]">
            <MessageCircle className="w-5 h-5" />
            <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">
              WhatsApp & Support Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                WhatsApp Phone Number (With Country Code) *
              </label>
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm((p) => ({ ...p, whatsappNumber: e.target.value }))}
                placeholder="e.g. 2348126708708"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-mono"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Format without + sign (e.g. 2348126708708) for direct WhatsApp API links.
              </span>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Official Support Email *
              </label>
              <input
                type="email"
                required
                value={form.supportEmail}
                onChange={(e) => setForm((p) => ({ ...p, supportEmail: e.target.value }))}
                placeholder="support@athleticyou.com"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 3. Hero Section Copy */}
        <div className="p-6 rounded-3xl bg-onyx-surface/80 border border-white/8 space-y-4">
          <div className="flex items-center gap-2.5 text-brand-purple-light">
            <Type className="w-5 h-5" />
            <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">
              Homepage Hero Headline & Copy
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Primary Brand Headline
              </label>
              <input
                type="text"
                value={form.heroHeadline}
                onChange={(e) => setForm((p) => ({ ...p, heroHeadline: e.target.value }))}
                placeholder="ATHLETIC YOU"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Gradient Subheadline
              </label>
              <input
                type="text"
                value={form.heroSubheadline}
                onChange={(e) => setForm((p) => ({ ...p, heroSubheadline: e.target.value }))}
                placeholder="WORKOUT SIMPLIFIED."
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
              Hero Paragraph Description
            </label>
            <textarea
              rows={3}
              value={form.heroSubtitle}
              onChange={(e) => setForm((p) => ({ ...p, heroSubtitle: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* 4. Marquee Ribbon Items */}
        <div className="p-6 rounded-3xl bg-onyx-surface/80 border border-white/8 space-y-4">
          <div className="flex items-center gap-2.5 text-brand-gold">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">
              Marquee Ticker Banner
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Ticker Message 1
              </label>
              <input
                type="text"
                value={form.marqueeText1}
                onChange={(e) => setForm((p) => ({ ...p, marqueeText1: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-mono text-xs uppercase font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Ticker Message 2
              </label>
              <input
                type="text"
                value={form.marqueeText2}
                onChange={(e) => setForm((p) => ({ ...p, marqueeText2: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-mono text-xs uppercase font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Ticker Message 3
              </label>
              <input
                type="text"
                value={form.marqueeText3}
                onChange={(e) => setForm((p) => ({ ...p, marqueeText3: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-mono text-xs uppercase font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Ticker Message 4
              </label>
              <input
                type="text"
                value={form.marqueeText4}
                onChange={(e) => setForm((p) => ({ ...p, marqueeText4: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors font-mono text-xs uppercase font-bold"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
