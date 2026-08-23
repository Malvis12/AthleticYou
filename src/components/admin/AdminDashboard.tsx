import React, { useState, useEffect } from 'react';
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
  const { products, orders } = useStore();
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

      {/* CMS Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'products'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'text-zinc-400 hover:text-white bg-onyx-surface border border-white/5'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Hardware Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'text-zinc-400 hover:text-white bg-onyx-surface border border-white/5'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders</span>
          {pendingOrdersCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-mono font-bold">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'text-zinc-400 hover:text-white bg-onyx-surface border border-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Bank & Store Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'shipping'
              ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20'
              : 'text-zinc-400 hover:text-white bg-onyx-surface border border-white/5'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>State Shipping Rates</span>
        </button>
      </div>

      {/* Tab Panels */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'settings' && <AdminSettings />}
        {activeTab === 'shipping' && <AdminShipping />}
      </motion.div>
    </div>
  );
};
