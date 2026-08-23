import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';
import { FREE_SHIPPING_THRESHOLD } from '../data/shipping';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedVariant?: string, quantity?: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  totalCount: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'athletic_you_cart_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (product: Product, selectedVariant?: string, quantity = 1) => {
    const variant = selectedVariant || (product.variants ? product.variants[0] : 'Standard');
    
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedVariant: variant, quantity }];
      }
    });

    showToast(`Added "${product.name}" to your bag.`);
  };

  const removeFromCart = (productId: string, variant: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant === variant)
      )
    );
  };

  const updateQuantity = (productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant === variant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.selectedVariant && item.selectedVariant.includes('+₦')) {
      const match = item.selectedVariant.match(/\+₦([\d,]+)/);
      if (match) {
        const extra = parseInt(match[1].replace(/,/g, ''), 10);
        itemPrice += extra;
      }
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        totalCount,
        freeShippingRemaining,
        freeShippingProgress,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
