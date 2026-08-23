import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { CustomerOrder, OrderStatus, StoreSettings, NigerianStateSetting } from '../types/store';
import { PRODUCTS } from '../data/products';
import { NIGERIAN_STATES } from '../data/shipping';
import { SupabaseAPI, getSupabaseConfig, setSupabaseConfig } from '../lib/supabaseClient';

const STORAGE_KEYS = {
  PRODUCTS: 'ay_cms_products_v1',
  ORDERS: 'ay_cms_orders_v1',
  SETTINGS: 'ay_cms_settings_v1',
  SHIPPING: 'ay_cms_shipping_v1',
};

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
  isCloudConnected: boolean;
  cloudUrl: string;
  cloudKey: string;
  connectCloudDatabase: (url: string, key: string) => Promise<boolean>;
  addProduct: (productData: Omit<Product, 'id' | 'slug' | 'images' | 'rating' | 'reviewCount' | 'features' | 'specifications' | 'includedItems'> & { imageUrl: string }) => void;
  updateProduct: (id: string, updates: Partial<Product> & { imageUrl?: string }) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  addOrder: (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  updateShippingState: (code: string, fee: number, deliveryDays: string) => void;
  resetToDefaults: () => void;
  syncFromCloud: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialCloudConfig = getSupabaseConfig();
  const [isCloudConnected, setIsCloudConnected] = useState(initialCloudConfig.isConfigured);
  const [cloudUrl, setCloudUrl] = useState(initialCloudConfig.url);
  const [cloudKey, setCloudKey] = useState(initialCloudConfig.anonKey);

  // 1. Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // 2. Orders State
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Settings State
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // 4. Shipping States
  const [shippingStates, setShippingStates] = useState<NigerianStateSetting[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHIPPING);
      return saved ? JSON.parse(saved) : NIGERIAN_STATES;
    } catch {
      return NIGERIAN_STATES;
    }
  });

  // Fetch remote data on mount if Supabase is connected
  const syncFromCloud = async () => {
    const config = getSupabaseConfig();
    if (!config.isConfigured) return;

    try {
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
        setStoreSettings((prev) => ({ ...prev, ...cloudSettings }));
      }
      if (cloudShipping && cloudShipping.length > 0) {
        setShippingStates(cloudShipping);
      }
      setIsCloudConnected(true);
    } catch (err) {
      console.warn('Cloud sync error:', err);
    }
  };

  useEffect(() => {
    syncFromCloud();
  }, []);

  // Multi-tab listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.PRODUCTS && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
      if (e.key === STORAGE_KEYS.ORDERS && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      }
      if (e.key === STORAGE_KEYS.SETTINGS && e.newValue) {
        setStoreSettings(JSON.parse(e.newValue));
      }
      if (e.key === STORAGE_KEYS.SHIPPING && e.newValue) {
        setShippingStates(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Local storage persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
    } catch (e) {
      console.error(e);
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHIPPING, JSON.stringify(shippingStates));
    } catch (e) {
      console.error(e);
    }
  }, [shippingStates]);

  const connectCloudDatabase = async (url: string, key: string): Promise<boolean> => {
    setSupabaseConfig(url, key);
    setCloudUrl(url);
    setCloudKey(key);
    const config = getSupabaseConfig();
    setIsCloudConnected(config.isConfigured);
    if (config.isConfigured) {
      await syncFromCloud();
      return true;
    }
    return false;
  };

  // Product CRUD
  const addProduct = (
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
    SupabaseAPI.insertProduct(newProduct);
  };

  const updateProduct = (id: string, updates: Partial<Product> & { imageUrl?: string }) => {
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
    SupabaseAPI.updateProduct(id, updates);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    SupabaseAPI.deleteProduct(id);
  };

  const toggleProductStock = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const newStock = target.inStock === false;

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: newStock } : p))
    );
    SupabaseAPI.updateProduct(id, { inStock: newStock });
  };

  // Orders Management
  const addOrder = (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>): CustomerOrder => {
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    SupabaseAPI.insertOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o))
    );
    SupabaseAPI.updateOrderStatus(orderId, status);
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId && o.orderNumber !== orderId));
    SupabaseAPI.deleteOrder(orderId);
  };

  // Settings Management
  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    const updated = { ...storeSettings, ...newSettings };
    setStoreSettings(updated);
    SupabaseAPI.saveSettings(updated);
  };

  // Shipping Rates Management
  const updateShippingState = (code: string, fee: number, deliveryDays: string) => {
    setShippingStates((prev) =>
      prev.map((s) => (s.code === code ? { ...s, fee: Number(fee), deliveryDays } : s))
    );
    SupabaseAPI.updateShippingState(code, fee, deliveryDays);
  };

  // Reset to Factory Defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all products, shipping rates, and store settings to defaults? This will erase custom products and settings.')) {
      setProducts(PRODUCTS);
      setStoreSettings(DEFAULT_SETTINGS);
      setShippingStates(NIGERIAN_STATES);
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.SHIPPING);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        storeSettings,
        shippingStates,
        isCloudConnected,
        cloudUrl,
        cloudKey,
        connectCloudDatabase,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateStoreSettings,
        updateShippingState,
        resetToDefaults,
        syncFromCloud,
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
