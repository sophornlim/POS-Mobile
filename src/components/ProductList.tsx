import { Search, Leaf, Plus, Minus, ShoppingBasket, ArrowRight, ChevronLeft } from 'lucide-react';
import { PRODUCTS, SUB_CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function ProductList({ onCheckout, subCategoryId, onBack }: { onCheckout: () => void, subCategoryId: string | null, onBack?: () => void }) {
  const subCategory = SUB_CATEGORIES.find(sc => sc.id === subCategoryId);
  const filteredProducts = PRODUCTS.filter(p => p.subCategory === subCategoryId);

  return (
    <div className="space-y-6 pb-28 scrollbar-hide">
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold font-headline tracking-tight">{subCategory?.name || 'Products'}</h2>
          <p className="text-on-surface-variant text-xs">{filteredProducts.length} items available</p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <FilterChip label="All Items" active />
        <FilterChip label="Main Course" />
        <FilterChip label="Beverages" />
        <FilterChip label="Desserts" />
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/60" />
        <input 
          type="text" 
          placeholder="Search menu items..."
          className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary text-on-surface placeholder-on-surface-variant/50 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <motion.button 
            key={product.id} 
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Logic to add to cart would go here
              console.log(`Added ${product.name} to cart`);
            }}
            className="bg-surface-container-lowest rounded-3xl p-3 flex flex-col gap-3 shadow-sm group text-left border border-transparent hover:border-primary/20 transition-all"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-primary font-headline shadow-sm">
                ${product.price.toFixed(2)}
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center">
                <div className="bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
            <div className="px-1">
              <div className="flex justify-between items-start mb-0.5">
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-bold text-sm text-on-surface truncate">{product.name}</h3>
                  {product.nameKh && <p className="text-primary font-bold text-[10px] -mt-0.5 truncate">{product.nameKh}</p>}
                </div>
                {product.isVegetarian && <Leaf className="w-3 h-3 text-emerald-500 shrink-0 ml-1" />}
              </div>
              {product.code && <p className="text-[8px] text-on-surface-variant font-mono uppercase tracking-wider">Code: {product.code}</p>}
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button className="w-6 h-6 rounded-lg bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold font-headline">0</span>
                  <button className="w-6 h-6 rounded-lg primary-gradient flex items-center justify-center text-white">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Floating Cart Summary */}
      <div className="fixed bottom-20 left-0 right-0 px-6 z-40">
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-5 px-8 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <ShoppingBasket className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-[9px] uppercase tracking-widest font-bold opacity-80 leading-none mb-1">Items in Cart</p>
              <p className="font-headline font-extrabold text-lg leading-none">3 Products Selected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xl font-black font-headline">$55.50</p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={cn(
      "px-6 py-2.5 rounded-full font-headline font-semibold text-sm whitespace-nowrap transition-all",
      active ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"
    )}>
      {label}
    </button>
  );
}
