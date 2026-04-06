import React, { useState } from 'react';
import { 
  X, Warehouse, Users, Truck, ShoppingCart, 
  Wallet, DollarSign, Table as TableIcon, Package, 
  ChevronDown, ChevronRight, Box, History, 
  ClipboardList, UserCheck, CreditCard, Layers, 
  Tag, Type, FlaskConical, BarChart3, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  subItems?: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Warehouse',
    icon: <Warehouse className="w-5 h-5" />,
    subItems: ['Product Master', 'Opening Stock', 'Transaction', 'Inventory Control']
  },
  {
    title: 'Customer',
    icon: <Users className="w-5 h-5" />
  },
  {
    title: 'Supplier',
    icon: <Truck className="w-5 h-5" />
  },
  {
    title: 'Purchase',
    icon: <ShoppingCart className="w-5 h-5" />,
    subItems: ['Purchase Order', 'Purchase Detail', 'Purchase Payment']
  },
  {
    title: 'Expense',
    icon: <Wallet className="w-5 h-5" />
  },
  {
    title: 'Income',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    title: 'Table',
    icon: <TableIcon className="w-5 h-5" />,
    subItems: ['Table', 'Category', 'Status']
  },
  {
    title: 'Product',
    icon: <Package className="w-5 h-5" />,
    subItems: ['Category', 'Sub Category', 'Type', 'Ingredient']
  }
];

export default function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] print:hidden"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-surface-container-lowest z-[70] shadow-2xl flex flex-col print:hidden"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-none">
              <div className="flex items-center gap-3">
                <Logo containerClassName="w-12 h-12" />
                <div>
                  <h2 className="text-lg font-black font-headline tracking-tight text-on-surface leading-none">Neary Khmer</h2>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Restaurant</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
              <div className="px-4 space-y-1">
                {MENU_ITEMS.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <button
                      onClick={() => item.subItems ? toggleExpand(item.title) : onClose()}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-2xl transition-all group",
                        expandedItems.includes(item.title) 
                          ? "bg-primary/5 text-primary" 
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                          expandedItems.includes(item.title) ? "bg-primary text-white" : "bg-surface-container-high group-hover:bg-surface-container-highest"
                        )}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold font-headline">{item.title}</span>
                      </div>
                      {item.subItems && (
                        expandedItems.includes(item.title) 
                          ? <ChevronDown className="w-4 h-4" /> 
                          : <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* Sub-menu */}
                    <AnimatePresence>
                      {item.subItems && expandedItems.includes(item.title) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-11 pr-2 space-y-1"
                        >
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem}
                              onClick={onClose}
                              className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all flex items-center gap-2"
                            >
                              <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                              {subItem}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-surface-container bg-surface-container-low/30">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black font-headline truncate leading-tight">Sophorn Lim</p>
                  <p className="text-[8px] text-on-surface-variant truncate leading-tight">Administrator</p>
                </div>
                <button 
                  onClick={() => {
                    onLogout?.();
                    onClose();
                  }}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all flex items-center justify-center"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
