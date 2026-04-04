import React, { useState } from 'react';
import { Search, Filter, Package, ArrowUpRight, ArrowDownLeft, ShoppingCart, Tag, DollarSign, Layers, ChevronRight, Warehouse } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface InventoryItem {
  id: string;
  warehouse: string;
  category: string;
  productCode: string;
  productName: string;
  opening: number;
  purchase: number;
  issue: number;
  sold: number;
  returnIn: number;
  returnOut: number;
  adjustment: number;
  remaining: number;
  cost: string;
  price: string;
  value: string;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'IE01',
    productName: 'Ice Espresso',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '2',
    warehouse: 'MAIN',
    category: 'FOOD MENU',
    productCode: 'IE01',
    productName: 'Ice Espresso',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '3',
    warehouse: 'MAIN',
    category: 'Neary Khmer Group',
    productCode: 'IE01',
    productName: 'Ice Espresso',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '4',
    warehouse: 'MAIN',
    category: 'Stoeng Trorcheak Restaurant',
    productCode: 'IE01',
    productName: 'Ice Espresso',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '5',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'amer',
    productName: 'Americano',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '6',
    warehouse: 'MAIN',
    category: 'FOOD MENU',
    productCode: 'amer',
    productName: 'Americano',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '7',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'bbf',
    productName: 'bbf',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '8',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'bl',
    productName: 'Black Coffee',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '9',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'cap',
    productName: 'Cappuccino',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '10',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'ccap',
    productName: 'Caramel Cappuccino',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '11',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'cff',
    productName: 'Coffee Frappe',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '12',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'chlf',
    productName: 'Chocolate Frappe',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '13',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'ep',
    productName: 'Espresso',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '14',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'gtf',
    productName: 'Green Tea Freppe',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '15',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'hc',
    productName: 'Hot Chocolate',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  },
  {
    id: '16',
    warehouse: 'MAIN',
    category: 'DRINKS LIST',
    productCode: 'icc',
    productName: 'Ice Cappuccino',
    opening: 0, purchase: 0, issue: 0, sold: 0, returnIn: 0, returnOut: 0, adjustment: 0, remaining: 0,
    cost: '$0.00', price: '$0.00', value: '$0.00'
  }
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = MOCK_INVENTORY.filter(item => 
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by warehouse and calculate summaries
  const warehouseData = filteredInventory.reduce((acc, item) => {
    if (!acc[item.warehouse]) {
      acc[item.warehouse] = {
        items: [],
        totalValue: 0,
        totalRemaining: 0
      };
    }
    acc[item.warehouse].items.push(item);
    
    // Parse value string (e.g., "$10.00") to number
    const numericValue = parseFloat(item.value.replace(/[$,]/g, '')) || 0;
    acc[item.warehouse].totalValue += numericValue;
    acc[item.warehouse].totalRemaining += item.remaining;
    
    return acc;
  }, {} as Record<string, { items: InventoryItem[], totalValue: number, totalRemaining: number }>);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-extrabold font-headline tracking-tight">Inventory</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container transition-colors">
            <Filter className="w-5 h-5 text-on-surface" />
          </button>
        </div>
      </div>

      {Object.entries(warehouseData).map(([warehouse, data]) => (
        <section key={warehouse} className="space-y-4">
          <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-headline leading-tight">{warehouse} WAREHOUSE</h3>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{data.items.length} Products</p>
              </div>
            </div>
            <div className="flex gap-4 border-t sm:border-t-0 sm:border-l border-surface-container pt-4 sm:pt-0 sm:pl-6">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Stock</span>
                <p className="text-lg font-extrabold text-on-surface">{data.totalRemaining}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Value</span>
                <p className="text-lg font-extrabold text-secondary">${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((item) => (
              <div key={item.id}>
                <InventoryCard item={item} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {Object.keys(warehouseData).length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant opacity-50">
          <Package className="w-12 h-12 mb-4" />
          <p className="font-bold">No inventory items found</p>
        </div>
      )}
    </div>
  );
}

function InventoryCard({ item }: { item: InventoryItem }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 space-y-4 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.category}</span>
          <h4 className="text-base font-bold text-on-surface leading-tight">{item.productName}</h4>
          <p className="text-[10px] font-mono font-bold text-primary uppercase">{item.productCode}</p>
        </div>
        <div className="bg-primary/10 text-primary p-2 rounded-xl">
          <Package className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        <StatBox label="Opening" value={item.opening} />
        <StatBox label="Purchase" value={item.purchase} prefix="+" color="text-emerald-600" />
        <StatBox label="Issue" value={item.issue} />
        <StatBox label="Sold" value={item.sold} prefix="-" color="text-red-500" />
        <StatBox label="Return In" value={item.returnIn} prefix="+" color="text-emerald-600" />
        <StatBox label="Return Out" value={item.returnOut} prefix="-" color="text-red-500" />
        <StatBox label="Adjustment" value={item.adjustment} prefix="±" />
        <StatBox label="Remaining" value={item.remaining} isHighlight />
      </div>

      <div className="pt-4 border-t border-surface-container/50 grid grid-cols-3 gap-2">
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Cost</span>
          <p className="text-xs font-bold text-on-surface">{item.cost}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Price</span>
          <p className="text-xs font-bold text-primary">{item.price}</p>
        </div>
        <div className="space-y-0.5 text-right">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Value</span>
          <p className="text-xs font-bold text-secondary">{item.value}</p>
        </div>
      </div>

      <button className="w-full mt-2 py-2 bg-surface-container-low text-on-surface-variant rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-all flex items-center justify-center gap-2">
        View Movement History
        <ChevronRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

function StatBox({ label, value, prefix = "", color = "text-on-surface", isHighlight = false }: { label: string, value: number, prefix?: string, color?: string, isHighlight?: boolean }) {
  return (
    <div className={cn(
      "p-2 rounded-xl flex flex-col items-center justify-center gap-0.5",
      isHighlight ? "bg-primary text-white" : "bg-surface-container-low"
    )}>
      <span className={cn(
        "text-[8px] font-bold uppercase tracking-tighter",
        isHighlight ? "text-white/70" : "text-on-surface-variant"
      )}>{label}</span>
      <span className={cn(
        "text-xs font-extrabold",
        isHighlight ? "text-white" : color
      )}>
        {prefix}{value}
      </span>
    </div>
  );
}
