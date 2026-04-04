import { useState } from 'react';
import { Users, User, MapPin, CalendarClock, Ban } from 'lucide-react';
import { TABLES, TABLE_CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { TableStatus } from '../types';

interface TableGridProps {
  onSelect: (tableId: string) => void;
}

export default function TableGrid({ onSelect }: TableGridProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<TableStatus | 'all'>('all');

  const filteredTables = TABLES.filter(table => {
    const categoryMatch = selectedCategoryId === 'all' || table.categoryId === selectedCategoryId;
    const statusMatch = selectedStatus === 'all' || table.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold font-headline tracking-tight">Select Table</h2>
        
        {/* Table Categories Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-2 px-2 snap-x snap-mandatory">
          {TABLE_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[calc((100%-36px)/4)] aspect-square rounded-2xl transition-all duration-300 gap-1.5 shadow-sm snap-start shrink-0",
                selectedCategoryId === cat.id 
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20" 
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <MapPin className={cn("w-4 h-4", selectedCategoryId === cat.id ? "text-on-primary" : "text-primary")} />
              <span className="text-[9px] font-bold uppercase tracking-tight text-center px-1">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        <LegendItem 
          color="bg-emerald-500" 
          label="Available" 
          active={selectedStatus === 'available'}
          onClick={() => setSelectedStatus(selectedStatus === 'available' ? 'all' : 'available')}
        />
        <LegendItem 
          color="bg-blue-500" 
          label="Occupied" 
          active={selectedStatus === 'occupied'}
          onClick={() => setSelectedStatus(selectedStatus === 'occupied' ? 'all' : 'occupied')}
        />
        <LegendItem 
          color="bg-amber-500" 
          label="Reserved" 
          active={selectedStatus === 'reserved'}
          onClick={() => setSelectedStatus(selectedStatus === 'reserved' ? 'all' : 'reserved')}
        />
        <LegendItem 
          color="bg-slate-400" 
          label="Inactive" 
          active={selectedStatus === 'inactive'}
          onClick={() => setSelectedStatus(selectedStatus === 'inactive' ? 'all' : 'inactive')}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredTables.map((table) => (
          <motion.button
            key={table.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => table.status !== 'inactive' && onSelect(table.id)}
            className={cn(
              "aspect-square rounded-3xl p-6 flex flex-col justify-between items-start text-left relative overflow-hidden transition-colors",
              table.status === 'available' && "bg-surface-container-lowest hover:bg-emerald-50",
              table.status === 'occupied' && "bg-blue-50",
              table.status === 'reserved' && "bg-amber-50 hover:bg-amber-100/50",
              table.status === 'inactive' && "bg-surface-container-low opacity-60 grayscale"
            )}
          >
            <div className="absolute top-4 right-4">
              {table.status === 'available' && (
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
              )}
              {table.status === 'occupied' && (
                <User className="w-5 h-5 text-primary fill-current" />
              )}
              {table.status === 'reserved' && (
                <CalendarClock className="w-5 h-5 text-amber-600" />
              )}
              {table.status === 'inactive' && (
                <Ban className="w-5 h-5 text-slate-400" />
              )}
            </div>

            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              table.status === 'occupied' ? "text-primary" : 
              table.status === 'reserved' ? "text-amber-700" :
              "text-on-surface-variant"
            )}>
              Table
            </span>

            <div>
              <h3 className={cn(
                "text-4xl font-extrabold leading-none mb-1",
                table.status === 'occupied' ? "text-on-primary-container" : 
                table.status === 'reserved' ? "text-amber-900" :
                "text-on-surface",
                table.status === 'inactive' && "opacity-40"
              )}>
                {table.number}
              </h3>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Users className="w-3 h-3" />
                <span className="text-[10px] font-bold tracking-wide uppercase">CAP. {table.capacity}</span>
              </div>
            </div>

            {table.timeOccupied && (
              <div className="mt-2 py-1 px-3 bg-primary text-on-primary rounded-full text-[10px] font-bold tracking-widest uppercase">
                {table.timeOccupied}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <div className="p-6 bg-surface-container-lowest rounded-3xl shadow-sm space-y-4">
        <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Quick Stats</h4>
        <div className="grid grid-cols-3 gap-2">
          <StatBox value="12" label="Total" color="bg-surface-container-low" />
          <StatBox value="03" label="Free" color="bg-emerald-50" textColor="text-emerald-700" />
          <StatBox value="08" label="Busy" color="bg-blue-50" textColor="text-primary" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, active, onClick }: { color: string, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-full transition-all",
        active ? "bg-surface-container-high ring-1 ring-outline-variant" : "hover:bg-surface-container-low"
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full", color)} />
      <span className="text-[8px] font-bold uppercase tracking-tight text-on-surface-variant">{label}</span>
    </button>
  );
}

function StatBox({ value, label, color, textColor = "text-on-surface" }: { value: string, label: string, color: string, textColor?: string }) {
  return (
    <div className={cn("p-4 rounded-2xl", color)}>
      <div className={cn("text-lg font-bold", textColor)}>{value}</div>
      <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">{label}</div>
    </div>
  );
}
