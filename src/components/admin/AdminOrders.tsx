import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  MessageCircle,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Trash2,
  Eye,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomerOrder, OrderStatus } from '../../types/store';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5 w-fit">
            <Clock className="w-3 h-3" />
            <span>PENDING</span>
          </span>
        );
      case 'paid':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 w-fit">
            <CheckCircle className="w-3 h-3" />
            <span>PAID / VERIFIED</span>
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5 w-fit">
            <Truck className="w-3 h-3" />
            <span>DISPATCHED</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-brand-purple-light border border-brand-purple/30 flex items-center gap-1.5 w-fit">
            <CheckCircle className="w-3 h-3" />
            <span>DELIVERED</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5 w-fit">
            <XCircle className="w-3 h-3" />
            <span>CANCELLED</span>
          </span>
        );
    }
  };

  const getCleanPhone = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '234' + clean.slice(1);
    }
    return clean;
  };

  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.grandTotal : sum), 0);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-onyx-surface border border-white/8 space-y-1">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold">Total Orders</span>
          <div className="text-2xl font-price font-extrabold text-white">{orders.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-onyx-surface border border-white/8 space-y-1">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold">Total Store Revenue</span>
          <div className="text-2xl font-price font-extrabold text-emerald-400">
            ₦{totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-onyx-surface border border-white/8 space-y-1">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold">Pending Orders</span>
          <div className="text-2xl font-price font-extrabold text-amber-400">
            {orders.filter((o) => o.status === 'pending').length}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-onyx-surface/80 border border-white/8 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/50 border-b border-white/8 text-zinc-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">Order ID</th>
                <th className="py-3.5 px-4 font-bold">Date</th>
                <th className="py-3.5 px-4 font-bold">Customer</th>
                <th className="py-3.5 px-4 font-bold">Destination</th>
                <th className="py-3.5 px-4 font-bold">Items</th>
                <th className="py-3.5 px-4 font-bold">Total Amount</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-zinc-500">
                    No orders placed yet. When customers complete checkout, orders will appear here automatically!
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Order ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {order.orderNumber}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{order.customerName}</div>
                      <div className="text-zinc-500 text-[11px] font-mono">{order.phone}</div>
                    </td>

                    {/* Destination */}
                    <td className="py-3.5 px-4">
                      <div className="text-white truncate max-w-[130px]">{order.city}</div>
                      <div className="text-zinc-500 text-[11px]">{order.stateName}</div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-zinc-300">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} items
                      </span>
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4 font-price font-bold text-white text-sm">
                      ₦{order.grandTotal.toLocaleString()}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-black/60 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-mono text-white focus:border-brand-purple cursor-pointer"
                      >
                        <option value="pending" className="bg-onyx text-white">Pending</option>
                        <option value="paid" className="bg-onyx text-white">Paid / Verified</option>
                        <option value="dispatched" className="bg-onyx text-white">Dispatched</option>
                        <option value="delivered" className="bg-onyx text-white">Delivered</option>
                        <option value="cancelled" className="bg-onyx text-white">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* WhatsApp Customer Action */}
                        <a
                          href={`https://wa.me/${getCleanPhone(order.phone)}?text=${encodeURIComponent(
                            `Hello ${order.customerName}, this is Athletic You regarding your order ${order.orderNumber}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] flex items-center justify-center transition-colors cursor-pointer"
                          title="Message Customer on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        {/* View Order Modal */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Order */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete order ${order.orderNumber}?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Order Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-onyx-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-purple-light font-bold">
                    ORDER DETAILS
                  </span>
                  <h3 className="font-heading font-black text-xl text-white">
                    {selectedOrder.orderNumber}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Order Status:</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              {/* Customer Info */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Customer:</span>
                  <span className="font-bold text-white">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Phone:</span>
                  <span className="font-mono text-white">{selectedOrder.phone}</span>
                </div>
                {selectedOrder.email && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Email:</span>
                    <span className="text-white">{selectedOrder.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-400">Delivery Address:</span>
                  <span className="text-white text-right max-w-[220px]">
                    {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.stateName}
                  </span>
                </div>
                {selectedOrder.deliveryNotes && (
                  <div className="flex justify-between pt-1 border-t border-white/5">
                    <span className="text-zinc-400">Notes:</span>
                    <span className="text-zinc-300 italic">{selectedOrder.deliveryNotes}</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-zinc-400 font-bold block">
                  Purchased Items:
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded bg-black object-contain"
                          />
                        )}
                        <div>
                          <div className="text-white font-bold">{item.name}</div>
                          <div className="text-zinc-500 font-mono">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <span className="font-price font-bold text-white">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="font-price font-bold text-white">₦{selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery ({selectedOrder.stateName}):</span>
                  <span className="font-price font-bold text-white">
                    {selectedOrder.shippingFee === 0 ? 'FREE' : `₦${selectedOrder.shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                  <span>Grand Total:</span>
                  <span className="font-price font-extrabold text-base text-white">
                    ₦{selectedOrder.grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/${getCleanPhone(selectedOrder.phone)}?text=${encodeURIComponent(
                    `Hello ${selectedOrder.customerName}, this is Athletic You regarding your order ${selectedOrder.orderNumber}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>WhatsApp Customer</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
