import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Ban } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { SpotlightCard } from '../ui/SpotlightCard';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.inStock === false;

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isOutOfStock ? 0.6 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={isOutOfStock ? {} : { y: -5 }}
      onClick={() => handleAdd()}
      className={`h-full ${isOutOfStock ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <SpotlightCard
        spotlightColor="rgba(123, 44, 191, 0.18)"
        className="p-5 flex flex-col justify-between h-full group"
      >
        {/* Top Badges */}
        <div>
          <div className="flex items-center justify-between mb-3 min-h-[22px]">
            {product.badge ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-purple/20 text-brand-purple-light border border-brand-purple/30">
                {product.badge}
              </span>
            ) : <span />}

            {isOutOfStock && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                <Ban className="w-3 h-3" />
                <span>Out of Stock</span>
              </span>
            )}
          </div>

          {/* Product Image Stage */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center p-3 overflow-hidden mb-4 group-hover:bg-black/60 transition-colors">
            <img
              src={product.images.primary}
              alt={product.name}
              className={`w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.75)] transition-transform duration-300 ${
                isOutOfStock ? 'grayscale opacity-50' : 'group-hover:scale-105'
              }`}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/Dumbbell.jpg';
              }}
            />
          </div>

          {/* Category & Title */}
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
            {product.category} • {product.subcategory}
          </span>
          <h3 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-brand-purple-light transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg sm:text-xl font-price font-extrabold text-white tracking-tight">
              ₦{product.price.toLocaleString()}
            </div>
          </div>

          {isOutOfStock ? (
            <button
              disabled
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/5 text-zinc-500 border border-white/5 cursor-not-allowed"
            >
              Sold Out
            </button>
          ) : (
            <button
              onClick={(e) => handleAdd(e)}
              aria-label={`Add ${product.name} to Bag`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                added
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white hover:bg-zinc-200 text-black active:scale-95 shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};
