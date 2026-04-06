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
import { AnimatePresence, motion } from 'motion/react';

type Screen = 'tables' | 'categories' | 'products' | 'subcategories' | 'checkout' | 'sale' | 'inventory' | 'report' | 'setting' | 'placeholder';

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('pos');
  const [currentScreen, setCurrentScreen] = useState<Screen>('tables');
  const [placeholderTitle, setPlaceholderTitle] = useState('');

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

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
        return <TableGrid onSelect={(id) => {
          setCurrentScreen('categories');
        }} />;
      case 'categories':
        return <CategoryGrid onSelect={(id) => {
          setSelectedCategoryId(id);
          setCurrentScreen('subcategories');
        }} />;
      case 'products':
        return <ProductList 
          subCategoryId={selectedSubCategoryId}
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
        return <Checkout onBack={() => setCurrentScreen('products')} />;
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
        return <TableGrid onSelect={() => setCurrentScreen('categories')} />;
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
    if (currentScreen === 'checkout') {
      return <span className="text-primary font-bold font-headline mr-2">Table 14</span>;
    }
    return null;
  };

  return (
    <>
      <AnimatePresence>
        {!isSplashDone && (
          <SplashScreen onComplete={() => setIsSplashDone(true)} />
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
