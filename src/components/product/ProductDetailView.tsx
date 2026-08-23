import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Shield,
  Truck,
  CheckCircle2,
  Package,
  Check,
  Zap,
} from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { navigateToHome, navigateToProduct, navigateToCheckout } = useNavigation();

  const [selectedImage, setSelectedImage] = useState<'primary' | 'secondary'>('primary');
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants ? product.variants[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage('primary');
    setSelectedVariant(product.variants ? product.variants[0] : 'Standard');
    setQuantity(1);
  }, [product]);

  // Calculate variant-adjusted price
  let currentPrice = product.price;
  if (selectedVariant && selectedVariant.includes('+₦')) {
    const match = selectedVariant.match(/\+₦([\d,]+)/);
    if (match) {
      currentPrice += parseInt(match[1].replace(/,/g, ''), 10);
    }
  }

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleInstantBuy = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCartOpen(false);
    navigateToCheckout();
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="pt-28 pb-32 px-4 max-w-6xl mx-auto min-h-screen">
      {/* Breadcrumb / Back Button */}
      <button
        onClick={navigateToHome}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-zinc-400 hover:text-white mb-8 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>BACK TO HARDWARE CATALOG</span>
      </button>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Multi-Angle Image Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full h-80 sm:h-[480px] rounded-3xl bg-onyx-surface/80 border border-white/10 p-6 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage === 'primary' ? product.images.primary : product.images.secondary}
                alt={product.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                onError={(e) => {
                  if (selectedImage === 'secondary') {
                    (e.target as HTMLImageElement).src = product.images.primary;
                  }
                }}
              />
            </AnimatePresence>

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-brand-purple text-white shadow-md">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail View Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedImage('primary')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-wider cursor-pointer ${
                selectedImage === 'primary'
                  ? 'bg-white/15 border-brand-purple-light text-white shadow-md'
                  : 'bg-onyx-surface/60 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <span>Primary View</span>
            </button>
            <button
              onClick={() => setSelectedImage('secondary')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-wider cursor-pointer ${
                selectedImage === 'secondary'
                  ? 'bg-white/15 border-brand-purple-light text-white shadow-md'
                  : 'bg-onyx-surface/60 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              <span>Detail / Spec View</span>
            </button>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-8 p-6 rounded-3xl bg-onyx-surface/40 border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-4">
              TECHNICAL SPECIFICATIONS
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">{key}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mt-1">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Details, Variant Selector, Pricing & Cart */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-purple-light font-bold">
                {product.category} • {product.subcategory}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-500 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/8 flex items-baseline justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                ₦{currentPrice.toLocaleString()}
              </div>
              {product.compareAtPrice && (
                <span className="text-xs font-mono text-zinc-500 line-through">
                  Original ₦{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 block font-semibold">
                ✓ IN STOCK • NIGERIA
              </span>
            </div>
          </div>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-2">
                SELECT VARIANT / PACKAGE
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      selectedVariant === variant
                        ? 'bg-brand-purple text-white shadow-md border border-brand-purple-light'
                        : 'bg-onyx-surface border border-white/8 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity controls */}
              <div className="flex items-center bg-onyx-surface border border-white/10 rounded-2xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white text-lg font-bold rounded-xl active:bg-white/10 cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white text-lg font-bold rounded-xl active:bg-white/10 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-white hover:bg-zinc-100 text-black active:scale-[0.98]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Instant Checkout */}
            <button
              onClick={handleInstantBuy}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-brand-purple/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Instant Checkout</span>
            </button>
          </div>

          {/* Included in Box Checklist */}
          <div className="p-5 rounded-2xl bg-onyx-surface/40 border border-white/5 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-purple-light" />
              <span>WHAT'S IN THE BOX</span>
            </h4>
            <div className="space-y-2">
              {product.includedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Warranty Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-onyx-surface/40 border border-white/5 flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-brand-purple-light shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400">
                <span className="font-semibold text-white block">Fast Shipping</span>
                1-2 days in Lagos, 3-5 days other states
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-onyx-surface/40 border border-white/5 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400">
                <span className="font-semibold text-white block">1-Year Warranty</span>
                Structural guarantee against failure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Mobile Buy Dock */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-onyx/90 backdrop-blur-2xl border-t border-white/10 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-xs text-zinc-400 uppercase font-mono">Price</div>
          <div className="text-lg font-mono font-bold text-white">₦{currentPrice.toLocaleString()}</div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-5 rounded-xl bg-brand-purple text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/30 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* Related Equipment Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-white/8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
              COMPATIBLE HARDWARE
            </h3>
            <button
              onClick={navigateToHome}
              className="text-xs font-mono text-brand-purple-light hover:text-white font-bold uppercase tracking-wider cursor-pointer"
            >
              View Full Catalog →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateToProduct(rel)}
                className="p-4 rounded-2xl bg-onyx-surface/60 border border-white/6 hover:border-white/15 cursor-pointer transition-all group"
              >
                <div className="w-full h-40 rounded-xl bg-black/40 flex items-center justify-center p-3 mb-3">
                  <img
                    src={rel.images.primary}
                    alt={rel.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-heading font-bold text-white group-hover:text-brand-purple-light transition-colors">
                  {rel.name}
                </h4>
                <div className="text-xs font-mono font-bold text-zinc-300 mt-1">
                  ₦{rel.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
