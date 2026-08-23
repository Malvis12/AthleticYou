import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

export type ViewType = 'home' | 'checkout' | 'policy' | 'admin';
export type PolicyTab = 'shipping' | 'returns' | 'contact';

interface NavigationContextType {
  currentView: ViewType;
  selectedProduct: Product | null;
  selectedPolicyTab: PolicyTab;
  navigateToHome: () => void;
  navigateToCheckout: () => void;
  navigateToPolicy: (tab: PolicyTab) => void;
  navigateToAdmin: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPolicyTab, setSelectedPolicyTab] = useState<PolicyTab>('shipping');

  const parseHash = () => {
    const hash = window.location.hash || '#/';
    
    if (hash === '#/admin') {
      setCurrentView('admin');
    } else if (hash === '#/checkout') {
      setCurrentView('checkout');
    } else if (hash === '#/shipping-delivery' || hash === '#/shipping') {
      setSelectedPolicyTab('shipping');
      setCurrentView('policy');
    } else if (hash === '#/returns') {
      setSelectedPolicyTab('returns');
      setCurrentView('policy');
    } else if (hash === '#/contact') {
      setSelectedPolicyTab('contact');
      setCurrentView('policy');
    } else if (hash === '#/story') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('story-narrative');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setCurrentView('home');
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const navigateToCheckout = () => {
    setCurrentView('checkout');
    window.location.hash = '#/checkout';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPolicy = (tab: PolicyTab) => {
    setSelectedPolicyTab(tab);
    setCurrentView('policy');
    const hashMapping: Record<PolicyTab, string> = {
      shipping: '#/shipping-delivery',
      returns: '#/returns',
      contact: '#/contact'
    };
    window.location.hash = hashMapping[tab];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    setCurrentView('admin');
    window.location.hash = '#/admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        selectedProduct,
        selectedPolicyTab,
        navigateToHome,
        navigateToCheckout,
        navigateToPolicy,
        navigateToAdmin,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
