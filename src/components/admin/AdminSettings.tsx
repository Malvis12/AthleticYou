import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Building,
  MessageCircle,
  Type,
  Check,
  RotateCcw,
  Sparkles,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const {
    storeSettings,
    updateStoreSettings,
    resetToDefaults,
    isCloudConnected,
    cloudUrl,
    cloudKey,
    connectCloudDatabase,
  } = useStore();

  const [saved, setSaved] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState(cloudUrl || '');
  const [supabaseKey, setSupabaseKey] = useState(cloudKey || '');
  const [cloudConnecting, setCloudConnecting] = useState(false);
  const [cloudSuccess, setCloudSuccess] = useState<boolean | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
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

  const handleConnectCloud = async (e: React.FormEvent) => {
    e.preventDefault();
    setCloudConnecting(true);
    setCloudSuccess(null);

    const ok = await connectCloudDatabase(supabaseUrl, supabaseKey);
    setCloudConnecting(false);
    setCloudSuccess(ok);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 0. Cloud Database Connection (Supabase) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-brand-purple/10 to-onyx-surface/80 border border-brand-purple/30 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple-light">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-white">
                  CLOUD DATABASE SYNC (SUPABASE)
                </h3>
                {isCloudConnected ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>LIVE CLOUD SYNC ACTIVE</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-700/50 text-zinc-400 border border-white/10">
                    LOCAL BROWSER MODE
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Connect your free Supabase project so your product edits and prices sync across every phone and computer globally.
              </p>
            </div>
          </div>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs border border-white/10 transition-colors w-fit"
          >
            <span>Open Supabase</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <form onSubmit={handleConnectCloud} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Project URL (e.g. https://xyz.supabase.co)
              </label>
              <input
                type="url"
                required
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project-id.supabase.co"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:border-brand-purple font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                Anon Public Key
              </label>
              <input
                type="text"
                required
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOi..."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:border-brand-purple font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-zinc-400">
              💡 SQL setup file is ready in project root as <strong className="text-white">supabase_schema.sql</strong>.
            </div>

            <button
              type="submit"
              disabled={cloudConnecting}
              className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-purple/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Cloud className="w-4 h-4" />
              <span>{cloudConnecting ? 'Connecting...' : 'Save & Connect Cloud Sync'}</span>
            </button>
          </div>

          {cloudSuccess === true && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Connected successfully! Cloud synchronization is active.</span>
            </div>
          )}
        </form>
      </div>

      {/* Main Storefront Settings Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* Save action floating header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div>
            <h2 className="text-xl font-heading font-black text-white">STOREFRONT SETTINGS</h2>
            <p className="text-xs text-zinc-400">Configure bank accounts, WhatsApp channels, and hero copy in real time.</p>
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
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
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

        {/* Danger Zone: Factory Reset */}
        <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-red-400">Reset Storefront to Factory Defaults</h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Restores original catalog products, default bank info, and default Nigerian state shipping rates.
            </p>
          </div>
          <button
            type="button"
            onClick={resetToDefaults}
            className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-mono text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            Reset All Data
          </button>
        </div>
      </form>
    </div>
  );
};
