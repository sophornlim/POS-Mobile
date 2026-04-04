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

      <div className="grid grid-cols-1 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-surface-container-lowest rounded-3xl p-4 flex flex-col gap-4 shadow-sm group">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary font-headline">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="px-2 pb-2">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-headline font-bold text-lg text-on-surface">{product.name}</h3>
                  {product.nameKh && <p className="text-primary font-bold text-sm -mt-1">{product.nameKh}</p>}
                  {product.code && <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider mt-1">Code: {product.code}</p>}
                </div>
                {product.isVegetarian && <Leaf className="w-5 h-5 text-emerald-500" />}
              </div>
              <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{product.description}</p>
              
              {product.id === 'p3' ? (
                <div className="flex gap-2">
                  <button className="flex-1 bg-surface-container-low text-primary py-3.5 rounded-xl font-headline font-bold flex items-center justify-center">
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex-[2] bg-surface-container-low flex items-center justify-center font-bold font-headline text-lg">1</div>
                  <button className="flex-1 primary-gradient text-white py-3.5 rounded-xl font-headline font-bold flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button className="w-full primary-gradient text-white py-3.5 rounded-xl font-headline font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <Plus className="w-5 h-5" />
                  Add to Order
                </button>
              )}
            </div>
          </div>
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
