import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Lock,
  Truck,
  Building,
  ShieldCheck,
  Check,
  ChevronRight,
  ShoppingBag,
  Copy,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { useStore } from '../../context/StoreContext';
import { FREE_SHIPPING_THRESHOLD } from '../../data/shipping';
import { CartItem } from '../../types/product';

interface CompletedOrderSnapshot {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  stateName: string;
  deliveryDays: string;
  deliveryNotes: string;
  paymentMethod: 'whatsapp' | 'transfer';
  waUrl: string;
}

export const CheckoutView: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { navigateToHome } = useNavigation();
  const { storeSettings, shippingStates, addOrder } = useStore();

  // Form State
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    stateCode: 'LA',
    deliveryNotes: '',
    paymentMethod: 'whatsapp' as 'whatsapp' | 'transfer',
  });

  const [completedOrder, setCompletedOrder] = useState<CompletedOrderSnapshot | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const selectedState =
    shippingStates.find((s) => s.code === formData.stateCode) || shippingStates[0];

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : selectedState.fee;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return false;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter your Nigerian phone number.');
      return false;
    }
    if (!formData.address.trim()) {
      setFormError('Please enter your street / delivery address.');
      return false;
    }
    if (!formData.city.trim()) {
      setFormError('Please enter your city / area.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buildWhatsAppMessage = (
    ref: string,
    orderItems: CartItem[],
    orderSubtotal: number,
    orderShipping: number,
    orderGrandTotal: number,
    isTransfer = false
  ) => {
    const itemsList = orderItems
      .map((item) => `• ${item.quantity}x ${item.product.name} (₦${(item.product.price * item.quantity).toLocaleString()})`)
      .join('\n');

    if (isTransfer) {
      return encodeURIComponent(
        `🏋️ *ATHLETIC YOU - PAYMENT PROOF*\n\n` +
        `*Order Reference:* ${ref}\n` +
        `*Customer:* ${formData.fullName}\n` +
        `*Phone:* ${formData.phone}\n` +
        `${formData.email ? `*Email:* ${formData.email}\n` : ''}` +
        `*Delivery Address:* ${formData.address}, ${formData.city}, ${selectedState.name}\n` +
        `${formData.deliveryNotes ? `*Notes:* ${formData.deliveryNotes}\n` : ''}\n` +
        `*Order Items:*\n${itemsList}\n\n` +
        `*Subtotal:* ₦${orderSubtotal.toLocaleString()}\n` +
        `*Delivery (${selectedState.name}):* ${orderShipping === 0 ? 'FREE' : `₦${orderShipping.toLocaleString()}`}\n` +
        `*Total Paid via Transfer:* ₦${orderGrandTotal.toLocaleString()}\n\n` +
        `I have transferred to ${storeSettings.bankName} (${storeSettings.accountNumber}). Here is my payment receipt/proof.`
      );
    }

    return encodeURIComponent(
      `🏋️ *NEW ORDER - ATHLETIC YOU*\n\n` +
      `*Order ID:* ${ref}\n` +
      `*Customer:* ${formData.fullName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `${formData.email ? `*Email:* ${formData.email}\n` : ''}` +
      `*Delivery Address:* ${formData.address}, ${formData.city}, ${selectedState.name}\n` +
      `${formData.deliveryNotes ? `*Notes:* ${formData.deliveryNotes}\n` : ''}\n` +
      `*Order Items:*\n${itemsList}\n\n` +
      `*Subtotal:* ₦${orderSubtotal.toLocaleString()}\n` +
      `*Delivery (${selectedState.name}):* ${orderShipping === 0 ? 'FREE' : `₦${orderShipping.toLocaleString()}`}\n` +
      `*Grand Total:* ₦${orderGrandTotal.toLocaleString()}\n\n` +
      `Please confirm my order and dispatch schedule!`
    );
  };

  const handleCompleteOrder = () => {
    const generatedOrder = `AY-${Math.floor(100000 + Math.random() * 900000)}`;
    const isTransfer = formData.paymentMethod === 'transfer';

    const orderItemsSnapshot = [...items];
    const subtotalSnapshot = subtotal;
    const shippingSnapshot = shippingFee;
    const grandTotalSnapshot = grandTotal;

    const waText = buildWhatsAppMessage(
      generatedOrder,
      orderItemsSnapshot,
      subtotalSnapshot,
      shippingSnapshot,
      grandTotalSnapshot,
      isTransfer
    );
    const waUrl = `https://wa.me/${storeSettings.whatsappNumber}?text=${waText}`;

    // Add to CMS store orders
    addOrder({
      orderNumber: generatedOrder,
      customerName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      stateCode: formData.stateCode,
      stateName: selectedState.name,
      deliveryNotes: formData.deliveryNotes,
      paymentMethod: formData.paymentMethod,
      items: orderItemsSnapshot.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images.primary,
      })),
      subtotal: subtotalSnapshot,
      shippingFee: shippingSnapshot,
      grandTotal: grandTotalSnapshot,
    });

    const snapshot: CompletedOrderSnapshot = {
      orderNumber: generatedOrder,
      items: orderItemsSnapshot,
      subtotal: subtotalSnapshot,
      shippingFee: shippingSnapshot,
      grandTotal: grandTotalSnapshot,
      customerName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      stateName: selectedState.name,
      deliveryDays: selectedState.deliveryDays,
      deliveryNotes: formData.deliveryNotes,
      paymentMethod: formData.paymentMethod,
      waUrl,
    };

    setCompletedOrder(snapshot);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Clear cart after snapshotting
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7B2CBF', '#9D4EDD', '#E2B874', '#10B981'],
      });
    } catch (err) {
      console.log('Confetti error', err);
    }
  };

  // Order Completed Confirmation Screen
  if (completedOrder) {
    const isTransfer = completedOrder.paymentMethod === 'transfer';

    return (
      <div className="pt-32 pb-24 px-4 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-10 rounded-3xl bg-onyx-surface/80 border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-6">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            {isTransfer ? 'TRANSFER INITIATED' : 'ORDER SENT'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1 mb-2">
            THANK YOU FOR YOUR ORDER!
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Your order reference is <strong className="text-white font-mono">{completedOrder.orderNumber}</strong>. We are in touch on WhatsApp to confirm delivery details.
          </p>

          <div className="p-5 rounded-2xl bg-black/50 border border-white/5 text-left mb-6 space-y-3">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Order Reference:</span>
              <span className="font-mono text-white font-bold">{completedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Customer:</span>
              <span className="text-white font-medium">{completedOrder.customerName} ({completedOrder.phone})</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Destination:</span>
              <span className="text-white font-medium">
                {completedOrder.address}, {completedOrder.city}, {completedOrder.stateName}
              </span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Estimated Delivery:</span>
              <span className="text-emerald-400 font-medium">
                {completedOrder.deliveryDays}
              </span>
            </div>

            {/* Itemized list */}
            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-zinc-500 block">Items Purchased:</span>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-zinc-300">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span className="font-price font-semibold text-white">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
              <span>Subtotal:</span>
              <span className="font-price font-semibold text-white">
                ₦{completedOrder.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Delivery:</span>
              <span className="font-price font-semibold text-white">
                {completedOrder.shippingFee === 0 ? <span className="text-emerald-400 uppercase">FREE</span> : `₦${completedOrder.shippingFee.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
              <span className="font-bold text-white">Total Amount:</span>
              <span className="font-price font-extrabold text-white text-base">
                ₦{completedOrder.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={navigateToHome}
              className="flex-1 py-3.5 px-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
            >
              Continue Shopping
            </button>
            <a
              href={completedOrder.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>{isTransfer ? 'Send Proof via WhatsApp' : 'Open WhatsApp Chat'}</span>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-zinc-500 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-heading font-black text-white">Your Bag is Empty</h2>
        <p className="text-sm text-zinc-400 mt-2 mb-6">
          Add hardware to your bag before proceeding to checkout.
        </p>
        <button
          onClick={navigateToHome}
          className="px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-4 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={navigateToHome}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO STORE</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-BIT SECURE CHECKOUT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Area */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-onyx-surface/60 border border-white/6 text-xs font-mono">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 font-bold cursor-pointer ${
                currentStep >= 1 ? 'text-brand-purple-light' : 'text-zinc-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Delivery Details</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <button
              onClick={() => {
                if (validateStep1()) setCurrentStep(2);
              }}
              className={`flex items-center gap-2 font-bold cursor-pointer ${
                currentStep === 2 ? 'text-brand-purple-light' : 'text-zinc-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Payment & Confirmation</span>
            </button>
          </div>

          {/* Error Banner */}
          {formError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Step 1: Customer Contact Details & Address */}
          {currentStep === 1 && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleProceedToPayment}
              className="p-6 sm:p-8 rounded-3xl bg-onyx-surface/80 border border-white/8 space-y-5"
            >
              <h3 className="font-heading font-black text-xl text-white">
                1. CONTACT & DELIVERY ADDRESS
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Nigerian Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="080 1234 5678"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="babatunde@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                    Street Address / House / Estate *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 15 Admiralty Way, Lekki Phase 1"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Lekki / Ikeja / Garki"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      State *
                    </label>
                    <select
                      name="stateCode"
                      value={formData.stateCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors cursor-pointer"
                    >
                      {shippingStates.map((st) => (
                        <option key={st.code} value={st.code} className="bg-onyx text-white">
                          {st.name} (₦{st.fee.toLocaleString()} delivery)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                    Delivery Notes / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="Gate code, closest bus stop, or delivery instructions..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                  />
                </div>
              </div>

              {/* Delivery rate preview */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>{selectedState.name} Delivery ({selectedState.deliveryDays})</span>
                </div>
                <span className="font-price font-bold text-white">
                  {shippingFee === 0 ? <span className="text-emerald-400 uppercase">FREE</span> : `₦${shippingFee.toLocaleString()}`}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand-purple/20 cursor-pointer"
              >
                Proceed to Payment Method →
              </button>
            </motion.form>
          )}

          {/* Step 2: Payment Method (WhatsApp Direct or Bank Transfer) */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-onyx-surface/80 border border-white/8 space-y-6"
            >
              <h3 className="font-heading font-black text-xl text-white">
                2. CHOOSE PAYMENT METHOD
              </h3>

              <div className="space-y-4">
                {/* Option 1: WhatsApp Direct Checkout */}
                <div
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'whatsapp' }))}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'whatsapp'
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-black/40 border-white/6 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>WhatsApp Direct Order</span>
                          <span className="text-[10px] font-mono font-bold bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full">
                            FASTEST
                          </span>
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Send complete order straight to our official WhatsApp for instant confirmation.
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        formData.paymentMethod === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-500 text-black'
                          : 'border-zinc-600'
                      }`}
                    >
                      {formData.paymentMethod === 'whatsapp' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Option 2: Direct Bank Transfer */}
                <div
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'transfer' }))}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'transfer'
                      ? 'bg-brand-purple/10 border-brand-purple text-white shadow-lg shadow-brand-purple/10'
                      : 'bg-black/40 border-white/6 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple-light">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Direct Nigerian Bank Transfer</h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Transfer directly to Athletic You {storeSettings.bankName} account and share your receipt.
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        formData.paymentMethod === 'transfer'
                          ? 'border-brand-purple bg-brand-purple text-white'
                          : 'border-zinc-600'
                      }`}
                    >
                      {formData.paymentMethod === 'transfer' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Expanded Bank Account Details Card */}
                  {formData.paymentMethod === 'transfer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-white/8 space-y-3"
                    >
                      <div className="p-4 rounded-xl bg-black/60 border border-white/8 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400 font-mono">Bank Name:</span>
                          <span className="text-white font-bold">{storeSettings.bankName}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400 font-mono">Account Name:</span>
                          <span className="text-white font-bold">{storeSettings.accountName}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-zinc-500 block">Account Number</span>
                            <span className="font-price font-extrabold text-lg text-white tracking-wider">
                              {storeSettings.accountNumber}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(storeSettings.accountNumber, 'account');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {copiedField === 'account' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        After transferring <strong>₦{grandTotal.toLocaleString()}</strong>, tap the button below to submit your order and send your proof of payment on WhatsApp.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-4 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  ← Back
                </button>

                {formData.paymentMethod === 'whatsapp' ? (
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="flex-1 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>Complete & Send on WhatsApp (₦{grandTotal.toLocaleString()})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="flex-1 py-4 rounded-xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand-purple/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>I Have Transferred / Confirm Order</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Order Summary Box */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-onyx-surface/90 border border-white/8 space-y-6">
          <h3 className="font-heading font-black text-lg text-white">ORDER SUMMARY</h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item, idx) => {
              const itemPrice = item.product.price;

              return (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images.primary}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg bg-black/50 p-1 object-contain shrink-0"
                    />
                    <div>
                      <div className="text-white font-bold truncate max-w-[170px]">
                        {item.product.name}
                      </div>
                      <div className="text-zinc-500 font-mono">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <span className="font-price font-bold text-white text-sm">
                    ₦{(itemPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 pt-4 border-t border-white/8 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="font-price font-bold text-white text-sm">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Delivery ({selectedState.name})</span>
              <span className="font-price font-bold text-white text-sm">
                {shippingFee === 0 ? (
                  <span className="text-emerald-400 uppercase">FREE</span>
                ) : (
                  `₦${shippingFee.toLocaleString()}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/8">
              <span>Grand Total</span>
              <span className="font-price font-extrabold text-2xl text-white tracking-tight">
                ₦{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Authentic Gym-Grade Hardware</span>
            </div>
            <div>Engineered for high performance and durability.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
