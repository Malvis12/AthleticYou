import { Product } from '../types/product';
import { CustomerOrder, OrderStatus, StoreSettings, NigerianStateSetting } from '../types/store';

export const SUPABASE_URL = 'https://dfkcvrluvvuirwestatp.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRma2N2cmx1dnZ1aXJ3ZXN0YXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1MDQ0OTEsImV4cCI6MjEwMzA4MDQ5MX0.iZXXsgJp4vDlrJfvAEM9PvVqQMyyzH09H0lEbpbIdhs';

const getHeaders = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
});

export const SupabaseAPI = {
  // 1. PRODUCTS (Pure Supabase)
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.asc`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (!data || !Array.isArray(data)) return [];

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
      console.error('[Supabase] Error fetching products:', err);
      return [];
    }
  },

  async insertProduct(product: Product): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers: getHeaders(),
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
      console.error('[Supabase] Error inserting product:', err);
      return false;
    }
  },

  async updateProduct(id: string, updates: Partial<Product> & { imageUrl?: string }): Promise<boolean> {
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
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (err) {
      console.error('[Supabase] Error updating product:', err);
      return false;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return res.ok;
    } catch (err) {
      console.error('[Supabase] Error deleting product:', err);
      return false;
    }
  },

  // 2. ORDERS (Pure Supabase)
  async getOrders(): Promise<CustomerOrder[]> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (!data || !Array.isArray(data)) return [];

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
      console.error('[Supabase] Error fetching orders:', err);
      return [];
    }
  },

  async insertOrder(order: CustomerOrder): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: getHeaders(),
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
      console.error('[Supabase] Error inserting order:', err);
      return false;
    }
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch (err) {
      console.error('[Supabase] Error updating order status:', err);
      return false;
    }
  },

  async deleteOrder(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return res.ok;
    } catch (err) {
      console.error('[Supabase] Error deleting order:', err);
      return false;
    }
  },

  // 3. SETTINGS (Pure Supabase)
  async getSettings(): Promise<StoreSettings | null> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/store_settings?select=*&limit=1`, {
        headers: getHeaders(),
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
        marqueeTexts: Array.isArray(row.marquee_texts) ? row.marquee_texts : JSON.parse(row.marquee_texts || '[]'),
      };
    } catch (err) {
      console.error('[Supabase] Error fetching settings:', err);
      return null;
    }
  },

  async saveSettings(settings: StoreSettings): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/store_settings?id=eq.default`, {
        method: 'PATCH',
        headers: getHeaders(),
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
      console.error('[Supabase] Error saving settings:', err);
      return false;
    }
  },

  // 4. SHIPPING (Pure Supabase)
  async getShipping(): Promise<NigerianStateSetting[]> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/shipping_rates?select=*`, {
        headers: getHeaders(),
      });
      if (!res.ok) return [];
      const data = await res.json();
      if (!data || !Array.isArray(data)) return [];
      return data.map((r: any) => ({
        code: r.code,
        name: r.name,
        fee: Number(r.fee),
        deliveryDays: r.delivery_days,
      }));
    } catch (err) {
      console.error('[Supabase] Error fetching shipping rates:', err);
      return [];
    }
  },

  async updateShippingState(code: string, fee: number, deliveryDays: string): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/shipping_rates?code=eq.${code}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          fee,
          delivery_days: deliveryDays,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error('[Supabase] Error updating shipping rate:', err);
      return false;
    }
  },
};
