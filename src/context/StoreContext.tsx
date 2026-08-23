import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { CustomerOrder, OrderStatus, StoreSettings, NigerianStateSetting } from '../types/store';
import { PRODUCTS } from '../data/products';
import { NIGERIAN_STATES } from '../data/shipping';
import { SupabaseAPI } from '../lib/supabaseClient';

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Athletic You',
  tagline: 'Workout Simplified',
  whatsappNumber: '2348126708708',
  supportEmail: 'support@athleticyou.com',
  bankName: 'Zenith Bank PLC',
  accountName: 'ATHLETIC YOU FITNESS NIG LTD',
  accountNumber: '1229048590',
  heroHeadline: 'ATHLETIC YOU',
  heroSubheadline: 'WORKOUT SIMPLIFIED.',
  heroSubtitle: 'Build a serious training environment anywhere. Premium fitness equipment designed for people who want effective training without building their lives around the gym.',
  heroImageUrl: '/Dumbbell.jpg',
  marqueeTexts: [
    'WORKOUT SIMPLIFIED',
    'FAST NATIONWIDE NIGERIAN DELIVERY',
    'SOLID CAST-IRON HARDWARE',
    'PREMIUM TRAINING SYSTEMS',
    'ZERO COMMUTE • TRAIN AT HOME',
    'ENGINEERED FOR REAL SPACES',
  ],
};

interface StoreContextType {
  products: Product[];
  orders: CustomerOrder[];
  storeSettings: StoreSettings;
  shippingStates: NigerianStateSetting[];
  isLoading: boolean;
  dbError: string | null;
  clearDbError: () => void;
  addProduct: (productData: Omit<Product, 'id' | 'slug' | 'images' | 'rating' | 'reviewCount' | 'features' | 'specifications' | 'includedItems'> & { imageUrl: string }) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product> & { imageUrl?: string }) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  toggleProductStock: (id: string) => Promise<boolean>;
  addOrder: (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => Promise<CustomerOrder>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<boolean>;
  deleteOrder: (orderId: string) => Promise<boolean>;
  updateStoreSettings: (settings: Partial<StoreSettings>) => Promise<boolean>;
  updateShippingState: (code: string, fee: number, deliveryDays: string) => Promise<boolean>;
  refreshFromSupabase: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [shippingStates, setShippingStates] = useState<NigerianStateSetting[]>(NIGERIAN_STATES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const clearDbError = () => setDbError(null);

  // Pure Supabase Sync on Mount
  const refreshFromSupabase = async () => {
    try {
      setIsLoading(true);
      const [cloudProducts, cloudOrders, cloudSettings, cloudShipping] = await Promise.all([
        SupabaseAPI.getProducts(),
        SupabaseAPI.getOrders(),
        SupabaseAPI.getSettings(),
        SupabaseAPI.getShipping(),
      ]);

      if (cloudProducts && cloudProducts.length > 0) {
        setProducts(cloudProducts);
      }
      if (cloudOrders) {
        setOrders(cloudOrders);
      }
      if (cloudSettings) {
        setStoreSettings(cloudSettings);
      }
      if (cloudShipping && cloudShipping.length > 0) {
        setShippingStates(cloudShipping);
      }
      setDbError(null);
    } catch (err: any) {
      console.error('[Supabase] Initial fetch error:', err);
      setDbError(`Failed to fetch from Supabase database: ${err?.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshFromSupabase();
  }, []);

  // 1. Product CRUD (Pure Supabase with Error Catching)
  const addProduct = async (
    productData: Omit<Product, 'id' | 'slug' | 'images' | 'rating' | 'reviewCount' | 'features' | 'specifications' | 'includedItems'> & { imageUrl: string }
  ): Promise<boolean> => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: productData.name,
      slug: slug || `product-${Date.now()}`,
      category: productData.category,
      subcategory: productData.subcategory || 'Equipment',
      price: Number(productData.price) || 0,
      images: {
        primary: productData.imageUrl || '/Dumbbell.jpg',
        secondary: productData.imageUrl || '/Dumbbell.jpg',
      },
      rating: 5.0,
      reviewCount: 1,
      badge: productData.badge || undefined,
      description: productData.description || '',
      shortDescription: productData.shortDescription || productData.description || '',
      features: [],
      specifications: {},
      includedItems: [],
      inStock: productData.inStock !== false,
    };

    const res = await SupabaseAPI.insertProduct(newProduct);
    if (!res.success) {
      setDbError(`Failed to insert product "${productData.name}": ${res.error}`);
      return false;
    }

    setProducts((prev) => [newProduct, ...prev]);
    setDbError(null);
    return true;
  };

  const updateProduct = async (id: string, updates: Partial<Product> & { imageUrl?: string }): Promise<boolean> => {
    const res = await SupabaseAPI.updateProduct(id, updates);
    if (!res.success) {
      setDbError(`Failed to update product (ID: ${id}): ${res.error}`);
      return false;
    }

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedImages = updates.imageUrl
            ? { primary: updates.imageUrl, secondary: updates.imageUrl }
            : p.images;

          return {
            ...p,
            ...updates,
            price: updates.price !== undefined ? Number(updates.price) : p.price,
            images: updatedImages,
          };
        }
        return p;
      })
    );
    setDbError(null);
    return true;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    const res = await SupabaseAPI.deleteProduct(id);
    if (!res.success) {
      setDbError(`Failed to delete product (ID: ${id}): ${res.error}`);
      return false;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDbError(null);
    return true;
  };

  const toggleProductStock = async (id: string): Promise<boolean> => {
    const target = products.find((p) => p.id === id);
    if (!target) return false;
    const newStock = target.inStock === false;

    const res = await SupabaseAPI.updateProduct(id, { inStock: newStock });
    if (!res.success) {
      setDbError(`Failed to toggle product stock (ID: ${id}): ${res.error}`);
      return false;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: newStock } : p))
    );
    setDbError(null);
    return true;
  };

  // 2. Orders Management (Pure Supabase with Error Catching)
  const addOrder = async (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>): Promise<CustomerOrder> => {
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    const res = await SupabaseAPI.insertOrder(newOrder);
    if (!res.success) {
      setDbError(`Failed to save customer order: ${res.error}`);
    } else {
      setDbError(null);
    }

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<boolean> => {
    const res = await SupabaseAPI.updateOrderStatus(orderId, status);
    if (!res.success) {
      setDbError(`Failed to update order status (Order: ${orderId}): ${res.error}`);
      return false;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o))
    );
    setDbError(null);
    return true;
  };

  const deleteOrder = async (orderId: string): Promise<boolean> => {
    const res = await SupabaseAPI.deleteOrder(orderId);
    if (!res.success) {
      setDbError(`Failed to delete order (Order: ${orderId}): ${res.error}`);
      return false;
    }

    setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    setDbError(null);
    return true;
  };

  // 3. Settings Management (Pure Supabase with Error Catching)
  const updateStoreSettings = async (newSettings: Partial<StoreSettings>): Promise<boolean> => {
    const updated = { ...storeSettings, ...newSettings };
    const res = await SupabaseAPI.saveSettings(updated);
    if (!res.success) {
      setDbError(`Failed to save store settings to Supabase: ${res.error}`);
      return false;
    }

    setStoreSettings(updated);
    setDbError(null);
    return true;
  };

  // 4. Shipping Rates Management (Pure Supabase with Error Catching)
  const updateShippingState = async (code: string, fee: number, deliveryDays: string): Promise<boolean> => {
    const res = await SupabaseAPI.updateShippingState(code, fee, deliveryDays);
    if (!res.success) {
      setDbError(`Failed to update shipping rate for state "${code}": ${res.error}`);
      return false;
    }

    setShippingStates((prev) =>
      prev.map((s) => (s.code === code ? { ...s, fee: Number(fee), deliveryDays } : s))
    );
    setDbError(null);
    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        storeSettings,
        shippingStates,
        isLoading,
        dbError,
        clearDbError,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateStoreSettings,
        updateShippingState,
        refreshFromSupabase,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
