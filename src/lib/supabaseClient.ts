import { Product } from '../types/product';
import { CustomerOrder, OrderStatus, StoreSettings, NigerianStateSetting } from '../types/store';

// Reads from .env or localStorage (if configured via CMS Settings)
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const storedUrl = localStorage.getItem('ay_supabase_url') || '';
  const storedKey = localStorage.getItem('ay_supabase_key') || '';

  const url = (storedUrl || envUrl).trim().replace(/\/$/, '');
  const anonKey = (storedKey || envKey).trim();

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith('http')),
  };
};

export const setSupabaseConfig = (url: string, anonKey: string) => {
  localStorage.setItem('ay_supabase_url', url.trim());
  localStorage.setItem('ay_supabase_key', anonKey.trim());
};

const getHeaders = (anonKey: string) => ({
  apikey: anonKey,
  Authorization: `Bearer ${anonKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
});

export const SupabaseAPI = {
  // 1. PRODUCTS
  async getProducts(): Promise<Product[] | null> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return null;

    try {
      const res = await fetch(`${url}/rest/v1/products?select=*&order=created_at.desc`, {
        headers: getHeaders(anonKey),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        slug: row.slug || row.name.toLowerCase().replace(/\s+/g, '-'),
        category: row.category,
        subcategory: row.subcategory || 'Equipment',
        price: Number(row.price),
        images: {
          primary: row.image_url || '/Dumbbell.jpg',
          secondary: row.image_url || '/Dumbbell.jpg',
        },
        rating: 5.0,
        reviewCount: 1,
        badge: row.badge || undefined,
        description: row.description || '',
        shortDescription: row.short_description || row.description || '',
        features: [],
        specifications: {},
        includedItems: [],
        inStock: row.in_stock !== false,
      }));
    } catch (err) {
      console.warn('[Supabase] Failed to fetch products:', err);
      return null;
    }
  },

  async insertProduct(product: Product): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/products`, {
        method: 'POST',
        headers: getHeaders(anonKey),
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          subcategory: product.subcategory,
          price: product.price,
          image_url: product.images.primary,
          badge: product.badge || null,
          short_description: product.shortDescription,
          description: product.description,
          in_stock: product.inStock !== false,
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to insert product:', err);
      return false;
    }
  },

  async updateProduct(id: string, updates: Partial<Product> & { imageUrl?: string }): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    const payload: any = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.subcategory !== undefined) payload.subcategory = updates.subcategory;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
    if (updates.badge !== undefined) payload.badge = updates.badge;
    if (updates.shortDescription !== undefined) payload.short_description = updates.shortDescription;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.inStock !== undefined) payload.in_stock = updates.inStock;

    try {
      const res = await fetch(`${url}/rest/v1/products?id=eq.${id}`, {
        method: 'PATCH',
        headers: getHeaders(anonKey),
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to update product:', err);
      return false;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/products?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders(anonKey),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to delete product:', err);
      return false;
    }
  },

  // 2. ORDERS
  async getOrders(): Promise<CustomerOrder[] | null> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return null;

    try {
      const res = await fetch(`${url}/rest/v1/orders?select=*&order=created_at.desc`, {
        headers: getHeaders(anonKey),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map((row: any) => ({
        id: row.id,
        orderNumber: row.order_number,
        createdAt: row.created_at,
        status: row.status as OrderStatus,
        customerName: row.customer_name,
        phone: row.phone,
        email: row.email || '',
        address: row.address,
        city: row.city,
        stateCode: row.state_code,
        stateName: row.state_name,
        deliveryNotes: row.delivery_notes || '',
        paymentMethod: row.payment_method,
        items: row.items || [],
        subtotal: Number(row.subtotal),
        shippingFee: Number(row.shipping_fee),
        grandTotal: Number(row.grand_total),
      }));
    } catch (err) {
      console.warn('[Supabase] Failed to fetch orders:', err);
      return null;
    }
  },

  async insertOrder(order: CustomerOrder): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/orders`, {
        method: 'POST',
        headers: getHeaders(anonKey),
        body: JSON.stringify({
          id: order.id,
          order_number: order.orderNumber,
          customer_name: order.customerName,
          phone: order.phone,
          email: order.email,
          address: order.address,
          city: order.city,
          state_code: order.stateCode,
          state_name: order.stateName,
          delivery_notes: order.deliveryNotes,
          payment_method: order.paymentMethod,
          items: order.items,
          subtotal: order.subtotal,
          shipping_fee: order.shippingFee,
          grand_total: order.grandTotal,
          status: order.status,
          created_at: order.createdAt,
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to insert order:', err);
      return false;
    }
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/orders?id=eq.${id}`, {
        method: 'PATCH',
        headers: getHeaders(anonKey),
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to update order status:', err);
      return false;
    }
  },

  async deleteOrder(id: string): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/orders?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders(anonKey),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to delete order:', err);
      return false;
    }
  },

  // 3. SETTINGS
  async getSettings(): Promise<StoreSettings | null> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return null;

    try {
      const res = await fetch(`${url}/rest/v1/store_settings?select=*&limit=1`, {
        headers: getHeaders(anonKey),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || data.length === 0) return null;
      const row = data[0];
      return {
        storeName: row.store_name,
        tagline: row.tagline,
        whatsappNumber: row.whatsapp_number,
        supportEmail: row.support_email,
        bankName: row.bank_name,
        accountName: row.account_name,
        accountNumber: row.account_number,
        heroHeadline: row.hero_headline,
        heroSubheadline: row.hero_subheadline,
        heroSubtitle: row.hero_subtitle,
        heroImageUrl: row.hero_image_url || '/Dumbbell.jpg',
        marqueeTexts: row.marquee_texts || [],
      };
    } catch (err) {
      console.warn('[Supabase] Failed to fetch settings:', err);
      return null;
    }
  },

  async saveSettings(settings: StoreSettings): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/store_settings?id=eq.default`, {
        method: 'PATCH',
        headers: getHeaders(anonKey),
        body: JSON.stringify({
          store_name: settings.storeName,
          tagline: settings.tagline,
          whatsapp_number: settings.whatsappNumber,
          support_email: settings.supportEmail,
          bank_name: settings.bankName,
          account_name: settings.accountName,
          account_number: settings.accountNumber,
          hero_headline: settings.heroHeadline,
          hero_subheadline: settings.heroSubheadline,
          hero_subtitle: settings.heroSubtitle,
          hero_image_url: settings.heroImageUrl,
          marquee_texts: settings.marqueeTexts,
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to save settings:', err);
      return false;
    }
  },

  // 4. SHIPPING
  async getShipping(): Promise<NigerianStateSetting[] | null> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return null;

    try {
      const res = await fetch(`${url}/rest/v1/shipping_rates?select=*`, {
        headers: getHeaders(anonKey),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || data.length === 0) return null;
      return data.map((r: any) => ({
        code: r.code,
        name: r.name,
        fee: Number(r.fee),
        deliveryDays: r.delivery_days,
      }));
    } catch (err) {
      console.warn('[Supabase] Failed to fetch shipping:', err);
      return null;
    }
  },

  async updateShippingState(code: string, fee: number, deliveryDays: string): Promise<boolean> {
    const { url, anonKey, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return false;

    try {
      const res = await fetch(`${url}/rest/v1/shipping_rates?code=eq.${code}`, {
        method: 'PATCH',
        headers: getHeaders(anonKey),
        body: JSON.stringify({
          fee,
          delivery_days: deliveryDays,
        }),
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase] Failed to update shipping state:', err);
      return false;
    }
  },
};
