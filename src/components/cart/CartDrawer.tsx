import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  const { navigateToCheckout, navigateToHome } = useNavigation();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateToCheckout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-onyx-surface border-l border-white/10 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/8 flex items-center justify-between bg-onyx-light/50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-brand-purple-light" />
                <h3 className="font-heading font-black text-lg text-white">YOUR BAG</h3>
                <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded-full text-zinc-300">
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-lg">Your bag is empty</h4>
                  <p className="text-xs text-zinc-400 max-w-xs">
                    Explore our modular hardware systems to build your home training setup.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateToHome();
                    }}
                    className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    Explore Hardware
                  </button>
                </div>
              ) : (
                items.map((item, idx) => {
                  const itemPrice = item.product.price;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedVariant}-${idx}`}
                      className="p-3.5 rounded-2xl bg-onyx-light/60 border border-white/6 flex gap-3.5 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-black/50 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={item.product.images.primary}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-heading font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-sm font-price font-bold text-white mt-1 tracking-tight">
                          ₦{(itemPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity + Delete */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-white/10 rounded-lg bg-black/40 text-xs">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedVariant,
                                item.quantity - 1
                              )
                            }
                            className="px-2 py-0.5 text-zinc-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-1.5 font-price text-white font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedVariant,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-0.5 text-zinc-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/8 bg-onyx-light/80 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span className="font-price text-white font-bold text-sm">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Estimated Shipping:</span>
                    <span className="text-zinc-400 text-xs">Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                    <span>Total:</span>
                    <span className="font-price font-extrabold text-xl text-white tracking-tight">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-brand-purple/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Secure 256-bit Encrypted Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
