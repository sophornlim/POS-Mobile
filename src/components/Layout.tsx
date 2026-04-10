import React, { useState } from 'react';
import { Menu, ShoppingCart, LayoutGrid, ReceiptText, Package, BarChart3, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import Sidebar from './Sidebar';
import Logo from './Logo';

import { APP_LOGO } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  title?: string;
  rightElement?: React.ReactNode;
  onLogout?: () => void;
}

export default function Layout({ children, activeTab, onTabChange, title = "Near Khmer", rightElement, onLogout }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col main-gradient pb-20 scrollbar-hide">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onLogout={onLogout} />

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center px-6 shadow-sm print:hidden">
        {/* Left: Sidebar Trigger */}
        <div className="flex items-center w-1/3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-surface-container rounded-full transition-all active:scale-95"
          >
            <Menu className="w-6 h-6 text-on-surface" />
          </button>
        </div>

        {/* Center: Title */}
        <div className="flex-1 flex justify-center overflow-hidden">
          <h1 className="text-lg font-black font-headline tracking-tight text-on-surface leading-none text-center truncate">
            {title}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end w-1/3">
          {rightElement}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 px-6 max-w-6xl mx-auto w-full scrollbar-hide">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 glass z-50 flex items-center justify-around px-2 rounded-t-2xl shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)] print:hidden">
        <NavItem 
          icon={<LayoutGrid />} 
          label="POS" 
          active={activeTab === 'pos'} 
          onClick={() => onTabChange('pos')} 
        />
        <NavItem 
          icon={<ReceiptText />} 
          label="Sale" 
          active={activeTab === 'sale'} 
          onClick={() => onTabChange('sale')} 
        />
        <NavItem 
          icon={<Package />} 
          label="Inventory" 
          active={activeTab === 'inventory'} 
          onClick={() => onTabChange('inventory')} 
        />
        <NavItem 
          icon={<BarChart3 />} 
          label="Report" 
          active={activeTab === 'report'} 
          onClick={() => onTabChange('report')} 
        />
        <NavItem 
          icon={<Settings />} 
          label="Setting" 
          active={activeTab === 'setting'} 
          onClick={() => onTabChange('setting')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-300",
        active ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:text-primary"
      )}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("w-4.5 h-4.5", active && "fill-current") 
      })}
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
