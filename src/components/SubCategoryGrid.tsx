import React from 'react';
import { ChevronLeft, Coffee, CupSoda, IceCream, Droplets, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

import { CATEGORIES, SUB_CATEGORIES } from '../constants';

export default function SubCategoryGrid({ onBack, onSelect, categoryId }: { onBack: () => void, onSelect: (id: string) => void, categoryId: string | null }) {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryName = category ? category.name : 'Category';
  
  const filteredSubCategories = SUB_CATEGORIES.filter(sc => sc.categoryId === categoryId);

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <button onClick={onBack} className="flex items-center gap-2 text-primary mb-2 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-wide uppercase">Categories</span>
        </button>
        <h2 className="text-3xl font-extrabold font-headline tracking-tight">{categoryName}</h2>
        <p className="text-on-surface-variant text-sm">Select a type to view items</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredSubCategories.length > 0 ? (
          filteredSubCategories.map((subCat, index) => {
            // Alternate between Row and Card for visual variety
            const isRow = index % 3 === 0;
            const Icon = categoryId === 'frappes' || categoryId === 'smoothie' ? IceCream : Coffee;
            
            if (isRow) {
              return (
                <SubCatRow 
                  key={subCat.id}
                  icon={<Icon className="w-8 h-8 text-primary" />} 
                  title={subCat.name} 
                  description={subCat.description} 
                  onClick={() => onSelect(subCat.id)}
                />
              );
            }
            
            return (
              <SubCatCard 
                key={subCat.id}
                icon={<Icon className="w-6 h-6 text-secondary" />} 
                title={subCat.name} 
                description={subCat.description}
                color="bg-secondary/10"
                bgIcon={<Icon className="w-24 h-24 text-secondary/5" />}
                onClick={() => onSelect(subCat.id)}
              />
            );
          })
        ) : (
          <div className="col-span-2 py-20 text-center text-on-surface-variant opacity-50">
            <p>No sub-categories found for this category.</p>
          </div>
        )}

        <div className="col-span-2 mt-4 p-8 rounded-3xl bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-headline mb-2">Seasonal Specials</h3>
            <p className="text-white/80 text-sm max-w-[70%]">Try our new seasonal items available this month.</p>
            <button className="mt-4 px-6 py-2 bg-white text-primary font-bold rounded-full text-sm active:scale-95 transition-transform">
              Explore Specials
            </button>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
        </div>
      </div>
    </div>
  );
}

function SubCatRow({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick?: () => void, key?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="col-span-2 group relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm hover:translate-x-1 transition-transform duration-300 text-left"
    >
      <div className="flex items-center p-6 gap-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-low flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold font-headline">{title}</h3>
          <p className="text-sm text-on-surface-variant">{description}</p>
        </div>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <ChevronRight className="w-6 h-6 text-surface-variant group-hover:text-primary transition-colors" />
      </div>
    </motion.button>
  );
}

function SubCatCard({ icon, title, description, color, bgIcon, onClick }: { icon: React.ReactNode, title: string, description: string, color: string, bgIcon: React.ReactNode, onClick?: () => void, key?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="col-span-1 group relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-sm p-6 flex flex-col gap-4 aspect-square justify-between transition-all hover:shadow-md text-left"
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold font-headline leading-tight">{title}</h3>
        <p className="text-xs text-on-surface-variant mt-1">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {bgIcon}
      </div>
    </motion.button>
  );
}
