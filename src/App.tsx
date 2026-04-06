import { useState } from 'react';
import Layout from './components/Layout';
import TableGrid from './components/TableGrid';
import CategoryGrid from './components/CategoryGrid';
import ProductList from './components/ProductList';
import SubCategoryGrid from './components/SubCategoryGrid';
import Checkout from './components/Checkout';
import SalesPage from './components/SalesPage';
import InventoryPage from './components/InventoryPage';
import ReportPage from './components/ReportPage';
import SettingPage from './components/SettingPage';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import PendingOrders from './components/PendingOrders';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { cn } from './lib/utils';

type Screen = 'tables' | 'categories' | 'products' | 'subcategories' | 'checkout' | 'sale' | 'inventory' | 'report' | 'setting' | 'placeholder';

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('pos');
  const [currentScreen, setCurrentScreen] = useState<Screen>('tables');
  const [placeholderTitle, setPlaceholderTitle] = useState('');

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [carts, setCarts] = useState<Record<string, Record<string, number>>>({});
  const [showPendingOrders, setShowPendingOrders] = useState(false);

  const cart = selectedTableId ? (carts[selectedTableId] || {}) : {};

  const updateQuantity = (productId: string, delta: number) => {
    if (!selectedTableId) return;
    setCarts(prev => {
      const tableCart = prev[selectedTableId] || {};
      const currentQty = tableCart[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      let updatedTableCart;
      if (newQty === 0) {
        const { [productId]: _, ...rest } = tableCart;
        updatedTableCart = rest;
      } else {
        updatedTableCart = { ...tableCart, [productId]: newQty };
      }

      return { ...prev, [selectedTableId]: updatedTableCart };
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'pos') {
      setCurrentScreen('tables');
    } else if (tab === 'sale') {
      setCurrentScreen('sale');
    } else if (tab === 'inventory') {
      setCurrentScreen('inventory');
    } else if (tab === 'report') {
      setCurrentScreen('report');
    } else if (tab === 'setting') {
      setCurrentScreen('setting');
    } else {
      setCurrentScreen('placeholder');
      setPlaceholderTitle(tab.charAt(0).toUpperCase() + tab.slice(1));
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'tables':
        return <TableGrid 
          carts={carts}
          onSelect={(id) => {
            setSelectedTableId(id);
            setCurrentScreen('categories');
          }} 
        />;
      case 'categories':
        return <CategoryGrid onSelect={(id) => {
          setSelectedCategoryId(id);
          setCurrentScreen('subcategories');
        }} />;
      case 'products':
        return <ProductList 
          subCategoryId={selectedSubCategoryId}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onBack={() => setCurrentScreen('subcategories')}
          onCheckout={() => setCurrentScreen('checkout')} 
        />;
      case 'subcategories':
        return <SubCategoryGrid 
          categoryId={selectedCategoryId}
          onBack={() => setCurrentScreen('categories')} 
          onSelect={(id) => {
            setSelectedSubCategoryId(id);
            setCurrentScreen('products');
          }}
        />;
      case 'checkout':
        return <Checkout 
          cart={cart}
          tableId={selectedTableId}
          onBack={() => setCurrentScreen('products')} 
          onClearCart={() => {
            if (selectedTableId) {
              setCarts(prev => {
                const { [selectedTableId]: _, ...rest } = prev;
                return rest;
              });
              setCurrentScreen('tables');
            }
          }}
        />;
      case 'sale':
        return <SalesPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'report':
        return <ReportPage />;
      case 'setting':
        return <SettingPage />;
      case 'placeholder':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-on-surface-variant opacity-50">
            <div className="text-4xl font-bold mb-2">{placeholderTitle}</div>
            <p>Feature coming soon...</p>
          </div>
        );
      default:
        return <TableGrid 
          carts={carts}
          onSelect={(id) => {
            setSelectedTableId(id);
            setCurrentScreen('categories');
          }} 
        />;
    }
  };

  const getTitle = () => {
    if (currentScreen === 'checkout') return "Checkout";
    if (currentScreen === 'sale') return "Sales History";
    if (currentScreen === 'inventory') return "Inventory";
    if (currentScreen === 'report') return "Total Sale Report";
    if (currentScreen === 'setting') return "Settings";
    if (currentScreen === 'products') return "Select Products";
    return "Neary Khmer";
  };

  const getRightElement = () => {
    const pendingCount = Object.values(carts).filter(c => Object.keys(c).length > 0).length;
    
    return (
      <button 
        onClick={() => setShowPendingOrders(true)}
        className="relative p-2 hover:bg-surface-container rounded-full transition-colors"
      >
        <ShoppingCart className="w-6 h-6 text-on-surface" />
        {pendingCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-on-primary text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-surface shadow-lg">
            {pendingCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <AnimatePresence>
        {!isSplashDone && (
          <SplashScreen onComplete={() => setIsSplashDone(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPendingOrders && (
          <PendingOrders 
            carts={carts} 
            onClose={() => setShowPendingOrders(false)}
            onSelectTable={(tableId) => {
              setSelectedTableId(tableId);
              setShowPendingOrders(false);
              setCurrentScreen('checkout');
            }}
          />
        )}
      </AnimatePresence>

      {!isAuthenticated ? (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Layout 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          title={getTitle()}
          rightElement={getRightElement()}
          onLogout={() => setIsAuthenticated(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
}
