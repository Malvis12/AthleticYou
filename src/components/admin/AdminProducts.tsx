import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Package,
  Image as ImageIcon,
  Tag,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, Category } from '../../types/product';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStock } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'STRENGTH' as 'FOUNDATION' | 'STRENGTH' | 'PERFORMANCE',
    subcategory: 'Weights',
    price: '',
    badge: '',
    imageUrl: '',
    shortDescription: '',
    description: '',
    inStock: true,
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'STRENGTH',
      subcategory: 'Weights',
      price: '',
      badge: '',
      imageUrl: '/Dumbbell.jpg',
      shortDescription: '',
      description: '',
      inStock: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price.toString(),
      badge: product.badge || '',
      imageUrl: product.images.primary || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      inStock: product.inStock !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        badge: formData.badge || undefined,
        imageUrl: formData.imageUrl,
        shortDescription: formData.shortDescription,
        description: formData.description,
        inStock: formData.inStock,
      });
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        badge: formData.badge || undefined,
        imageUrl: formData.imageUrl,
        shortDescription: formData.shortDescription,
        description: formData.description,
        inStock: formData.inStock,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search equipment by name or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-onyx-surface border border-white/8 text-white placeholder-zinc-500 text-xs focus:border-brand-purple transition-colors"
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-purple/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hardware</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
        {(['ALL', 'FOUNDATION', 'STRENGTH', 'PERFORMANCE'] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black border-white shadow-sm'
                : 'bg-onyx-surface border-white/6 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Table / Cards */}
      <div className="rounded-2xl bg-onyx-surface/80 border border-white/8 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/50 border-b border-white/8 text-zinc-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">Product</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price (₦)</th>
                <th className="py-3.5 px-4 font-bold">Stock Status</th>
                <th className="py-3.5 px-4 font-bold">Badge</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Product & Image */}
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-black/50 p-1 border border-white/5 flex items-center justify-center shrink-0">
                        <img
                          src={product.images.primary}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/Dumbbell.jpg';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{product.name}</div>
                        <div className="text-zinc-500 text-[11px] truncate max-w-xs">
                          {product.shortDescription}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 font-mono text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-bold">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-price font-bold text-white text-sm">
                      ₦{product.price.toLocaleString()}
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleProductStock(product.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                          product.inStock !== false
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                        }`}
                      >
                        {product.inStock !== false ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Badge */}
                    <td className="py-3.5 px-4">
                      {product.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-purple/20 text-brand-purple-light border border-brand-purple/30">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-zinc-600 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Product"
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

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-onyx-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/8">
                <h3 className="font-heading font-black text-xl text-white">
                  {editingProduct ? 'EDIT HARDWARE ITEM' : 'ADD NEW HARDWARE'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Hexagon Dumbbells"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Price in Naira (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                      placeholder="e.g. 180000"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          category: e.target.value as 'FOUNDATION' | 'STRENGTH' | 'PERFORMANCE',
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors cursor-pointer"
                    >
                      <option value="FOUNDATION" className="bg-onyx text-white">FOUNDATION</option>
                      <option value="STRENGTH" className="bg-onyx text-white">STRENGTH</option>
                      <option value="PERFORMANCE" className="bg-onyx text-white">PERFORMANCE</option>
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Subcategory / Tag
                    </label>
                    <input
                      type="text"
                      value={formData.subcategory}
                      onChange={(e) => setFormData((p) => ({ ...p, subcategory: e.target.value }))}
                      placeholder="e.g. Weights, Accessories, Cardio"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Badge */}
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Badge / Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData((p) => ({ ...p, badge: e.target.value }))}
                      placeholder="e.g. Bestseller, High Demand, New"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                  </div>

                  {/* In Stock Toggle */}
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                      Stock Availability
                    </label>
                    <select
                      value={formData.inStock ? 'true' : 'false'}
                      onChange={(e) => setFormData((p) => ({ ...p, inStock: e.target.value === 'true' }))}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-brand-purple transition-colors cursor-pointer"
                    >
                      <option value="true" className="bg-onyx text-white">In Stock (Available for Purchase)</option>
                      <option value="false" className="bg-onyx text-white">Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                    Primary Image URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
                      placeholder="https://... or /Dumbbell.jpg"
                      className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors"
                    />
                    {formData.imageUrl && (
                      <div className="w-11 h-11 rounded-xl bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/Dumbbell.jpg';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5 font-bold">
                    Short Description / Summary
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData((p) => ({ ...p, shortDescription: e.target.value }))}
                    placeholder="Brief 1-sentence product summary displayed on cards..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:border-brand-purple transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-brand-purple hover:bg-brand-purple-light text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand-purple/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingProduct ? 'Save Changes' : 'Publish to Storefront'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
