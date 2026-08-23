import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  ShoppingBag,
  Settings,
  Truck,
  LogOut,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  X,
  RotateCw,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useNavigation } from '../../context/NavigationContext';
import { AdminLogin } from './AdminLogin';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminSettings } from './AdminSettings';
import { AdminShipping } from './AdminShipping';

type AdminTab = 'products' | 'orders' | 'settings' | 'shipping';

export const AdminDashboard: React.FC = () => {
  const { products, orders, dbError, clearDbError, refreshFromSupabase, isLoading } = useStore();
  const { navigateToHome } = useNavigation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ay_admin_authenticated') === 'true';
  });

  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  const handleLogout = () => {
    sessionStorage.removeItem('ay_admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const outOfStockCount = products.filter((p) => p.inStock === false).length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-onyx text-white pt-10 sm:pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-purple-light uppercase tracking-widest font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Athletic You Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
            STORE CMS & ADMIN CONTROL
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={navigateToHome}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-xs font-bold flex items-center gap-1.5 border border-red-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Database Error Banner */}
      <AnimatePresence>
        {dbError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-red-500/15 border-2 border-red-500/40 text-red-300 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-red-400">
                  <span>Supabase Database Write/Sync Failure</span>
                </div>
                <p className="text-sm font-mono text-white mt-1 break-all bg-black/40 p-2.5 rounded-xl border border-red-500/20">
                  {dbError}
                </p>
                <p className="text-xs text-red-300/80 mt-1">
                  Please verify that table exists, RLS policies permit write access, and credentials are valid.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => refreshFromSupabase()}
                className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-red-500/30"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Retry Sync</span>
              </button>
              <button
                onClick={clearDbError}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-onyx-surface/60 border border-white/6">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
            Hardware Catalog
          </span>
          <div className="text-xl sm:text-2xl font-price font-extrabold text-white">
            {products.length} Items
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-onyx-surface/60 border border-white/6">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
            Active Orders
          </span>
          <div className="text-xl sm:text-2xl font-price font-extrabold text-white">
            {orders.length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-onyx-surface/60 border border-white/6">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
            Pending Processing
          </span>
          <div className={`text-xl sm:text-2xl font-price font-extrabold ${pendingOrdersCount > 0 ? 'text-amber-400' : 'text-white'}`}>
            {pendingOrdersCount}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-onyx-surface/60 border border-white/6">
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
            Out of Stock
          </span>
          <div className={`text-xl sm:text-2xl font-price font-extrabold ${outOfStockCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {outOfStockCount}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-white/8 scrollbar-none">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Hardware Inventory</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-[10px]">
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders</span>
          {pendingOrdersCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[10px]">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Bank & Store Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping Rates</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      <div>
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'settings' && <AdminSettings />}
        {activeTab === 'shipping' && <AdminShipping />}
      </div>
    </div>
  );
};
