import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../../types/product';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');

  const categories: { key: Category; label: string }[] = [
    { key: 'ALL', label: 'ALL HARDWARE' },
    { key: 'FOUNDATION', label: 'FOUNDATION' },
    { key: 'STRENGTH', label: 'STRENGTH' },
    { key: 'PERFORMANCE', label: 'PERFORMANCE' },
  ];

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="shop-goal">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-purple-light font-bold">
          TRAINING SYSTEMS
        </span>
        <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2 tracking-tight uppercase">
          SHOP BY TRAINING GOAL
        </h2>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto mt-3">
          Select a goal to discover tailored, modular physical hardware designed for your workout system.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white font-black'
                  : 'text-zinc-400 hover:text-white bg-onyx-surface/60 border border-white/5 hover:border-white/15'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-brand-purple rounded-full shadow-lg shadow-brand-purple/40 border border-brand-purple-light"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
