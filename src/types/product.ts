export type Category = 'ALL' | 'FOUNDATION' | 'STRENGTH' | 'PERFORMANCE';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'FOUNDATION' | 'STRENGTH' | 'PERFORMANCE';
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  images: {
    primary: string;
    secondary: string;
  };
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  includedItems: string[];
  variants?: string[];
  inStock?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: string;
  quantity: number;
}

export interface ShippingZone {
  name: string;
  fee: number;
  estimatedDelivery: string;
}
