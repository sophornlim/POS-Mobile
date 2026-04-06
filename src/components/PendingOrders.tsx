import React from 'react';
import { ShoppingCart, ChevronRight, Utensils, X } from 'lucide-react';
import { TABLES, PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface PendingOrdersProps {
  carts: Record<string, Record<string, number>>;
  onSelectTable: (tableId: string) => void;
  onClose: () => void;
}

export default function PendingOrders({ carts, onSelectTable, onClose }: PendingOrdersProps) {
  const pendingTables = Object.entries(carts)
    .filter(([_, cart]) => Object.keys(cart).length > 0)
    .map(([tableId, cart]) => {
      const table = TABLES.find(t => t.id === tableId);
      const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
      const total = Object.entries(cart).reduce((sum, [productId, qty]) => {
        const product = PRODUCTS.find(p => p.id === productId);
        return sum + (product?.price || 0) * qty;
      }, 0);
      return { tableId, table, itemCount, total };
    });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-lg bg-surface-container-lowest rounded-t-[40px] rounded-b-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black font-headline tracking-tight">Pending Orders</h2>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                {pendingTables.length} Tables Active
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {pendingTables.length === 0 ? (
            <div className="py-20 text-center space-y-4 opacity-40">
              <Utensils className="w-16 h-16 mx-auto text-on-surface-variant" />
              <p className="font-bold text-lg">No pending orders</p>
            </div>
          ) : (
            pendingTables.map(({ tableId, table, itemCount, total }) => (
              <motion.button
                key={tableId}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTable(tableId)}
                className="w-full bg-surface-container-low hover:bg-surface-container rounded-3xl p-5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center border border-surface-container">
                    <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Table</span>
                    <span className="text-2xl font-black text-primary leading-none">{table?.number}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-headline font-bold text-on-surface">Order Summary</h3>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{itemCount} Items</span>
                      <div className="w-1 h-1 rounded-full bg-on-surface-variant/30" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">៛{(total * 4000).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-black font-headline text-primary">${total.toFixed(2)}</p>
                    <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Ready to Pay</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>

        <div className="p-6 bg-surface-container-low/50">
          <button 
            onClick={onClose}
            className="w-full bg-on-surface text-surface h-14 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all"
          >
            Close List
          </button>
        </div>
      </motion.div>
    </div>
  );
}
