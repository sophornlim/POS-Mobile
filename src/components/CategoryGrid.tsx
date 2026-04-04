import { Search, Coffee, CupSoda, Croissant, Utensils, IceCream, PlusCircle } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ICON_MAP: Record<string, any> = {
  coffee: Coffee,
  'cup-soda': CupSoda,
  croissant: Croissant,
  'utensils-cross-lines': Utensils,
  'ice-cream': IceCream,
};

export default function CategoryGrid({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-primary font-bold tracking-widest text-[10px] uppercase">Inventory Shell</span>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight leading-tight">Categories</h2>
        </div>
        <button className="bg-surface-container-low p-2.5 rounded-2xl text-on-surface-variant">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || PlusCircle;
          
          if (cat.popular) {
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(cat.id)}
                className="col-span-2 relative h-48 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm group text-left"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <span className="bg-primary/20 backdrop-blur-md text-primary-container text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-tighter mb-2 inline-block">Popular</span>
                    <h3 className="text-white font-headline text-2xl font-bold">{cat.name}</h3>
                    <p className="text-white/70 text-xs font-medium">{cat.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(cat.id)}
              className="col-span-1 bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between items-start h-44 relative group overflow-hidden text-left"
            >
              <div className={cn(
                "absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 transition-all group-hover:scale-110 opacity-10",
                cat.color === 'tertiary' ? "bg-tertiary" : "bg-primary"
              )} />
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                cat.color === 'tertiary' ? "bg-tertiary/10 text-tertiary" : "bg-primary/10 text-primary"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold">{cat.name}</h3>
                <p className="text-on-surface-variant text-xs">{cat.description}</p>
              </div>
            </motion.button>
          );
        })}

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="col-span-1 bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-center items-center h-32 gap-3 border-2 border-dashed border-outline-variant/30"
        >
          <PlusCircle className="w-10 h-10 text-outline-variant" />
          <span className="font-headline font-bold text-sm text-on-surface-variant">Custom Item</span>
        </motion.button>
      </div>
    </div>
  );
}
