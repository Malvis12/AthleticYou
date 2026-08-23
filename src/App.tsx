import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { PolicyView } from './components/policy/PolicyView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/cart/CartDrawer';
import { NotificationToast } from './components/common/NotificationToast';

const MainContent: React.FC = () => {
  const { currentView } = useNavigation();

  // Admin View: Dedicated clean CMS layout without storefront Navbar & Bag drawer
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-onyx text-white flex flex-col justify-between selection:bg-brand-purple selection:text-white">
        <div className="flex-1 w-full">
          <AdminDashboard />
        </div>
        <Footer />
      </div>
    );
  }

  // Storefront Views: Main Experience with ambient gradient animation & Navbar
  return (
    <div className="min-h-screen ambient-gradient-bg text-white flex flex-col justify-between selection:bg-brand-purple selection:text-white">
      <Navbar />

      {/* Main View Router */}
      <div className="flex-1 w-full">
        {currentView === 'home' && <HomeView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'policy' && <PolicyView />}
      </div>

      <Footer />
      <CartDrawer />
      <NotificationToast />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <NavigationProvider>
          <MainContent />
        </NavigationProvider>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
