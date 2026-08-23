import { Product, CartItem } from './product';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'pending' | 'paid' | 'dispatched' | 'delivered' | 'cancelled';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  stateCode: string;
  stateName: string;
  deliveryNotes: string;
  paymentMethod: 'whatsapp' | 'transfer';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string;
  supportEmail: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroSubtitle: string;
  heroImageUrl: string;
  marqueeTexts: string[];
}

export interface NigerianStateSetting {
  code: string;
  name: string;
  fee: number;
  deliveryDays: string;
}
