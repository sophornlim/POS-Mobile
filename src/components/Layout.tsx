import React from 'react';
import { Menu, ShoppingCart, LayoutGrid, ReceiptText, Package, BarChart3, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  title?: string;
  rightElement?: React.ReactNode;
}

export default function Layout({ children, activeTab, onTabChange, title = "Neary Khmer", rightElement }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col main-gradient pb-20 scrollbar-hide">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-6 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <Menu className="w-6 h-6 text-on-surface" />
          </button>
          <h1 className="text-xl font-bold font-headline tracking-tight text-on-surface">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {rightElement}
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors relative">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-tertiary rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 px-6 max-w-md mx-auto w-full scrollbar-hide">
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
