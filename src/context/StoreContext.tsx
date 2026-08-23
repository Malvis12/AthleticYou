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
  addProduct: (productData: Omit<Product, 'id' | 'slug' | 'images' | 'rating' | 'reviewCount' | 'features' | 'specifications' | 'includedItems'> & { imageUrl: string }) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product> & { imageUrl?: string }) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductStock: (id: string) => Promise<void>;
  addOrder: (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => Promise<CustomerOrder>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  updateStoreSettings: (settings: Partial<StoreSettings>) => Promise<void>;
  updateShippingState: (code: string, fee: number, deliveryDays: string) => Promise<void>;
  refreshFromSupabase: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [shippingStates, setShippingStates] = useState<NigerianStateSetting[]>(NIGERIAN_STATES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    } catch (err) {
      console.error('[Supabase] Initial fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshFromSupabase();
  }, []);

  // 1. Product CRUD (Pure Supabase)
  const addProduct = async (
    productData: Omit<Product, 'id' | 'slug' | 'images' | 'rating' | 'reviewCount' | 'features' | 'specifications' | 'includedItems'> & { imageUrl: string }
  ) => {
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

    setProducts((prev) => [newProduct, ...prev]);
    await SupabaseAPI.insertProduct(newProduct);
  };

  const updateProduct = async (id: string, updates: Partial<Product> & { imageUrl?: string }) => {
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
    await SupabaseAPI.updateProduct(id, updates);
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await SupabaseAPI.deleteProduct(id);
  };

  const toggleProductStock = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const newStock = target.inStock === false;

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: newStock } : p))
    );
    await SupabaseAPI.updateProduct(id, { inStock: newStock });
  };

  // 2. Orders Management (Pure Supabase)
  const addOrder = async (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>): Promise<CustomerOrder> => {
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    await SupabaseAPI.insertOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o))
    );
    await SupabaseAPI.updateOrderStatus(orderId, status);
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    await SupabaseAPI.deleteOrder(orderId);
  };

  // 3. Settings Management (Pure Supabase)
  const updateStoreSettings = async (newSettings: Partial<StoreSettings>) => {
    const updated = { ...storeSettings, ...newSettings };
    setStoreSettings(updated);
    await SupabaseAPI.saveSettings(updated);
  };

  // 4. Shipping Rates Management (Pure Supabase)
  const updateShippingState = async (code: string, fee: number, deliveryDays: string) => {
    setShippingStates((prev) =>
      prev.map((s) => (s.code === code ? { ...s, fee: Number(fee), deliveryDays } : s))
    );
    await SupabaseAPI.updateShippingState(code, fee, deliveryDays);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        storeSettings,
        shippingStates,
        isLoading,
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
