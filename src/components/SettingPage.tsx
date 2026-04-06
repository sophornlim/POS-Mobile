import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Wallet, TrendingUp, ChevronRight, Settings, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<'rate' | 'balance' | 'currency'>('rate');

  const renderContent = () => {
    switch (activeTab) {
      case 'rate':
        return <RateSettings />;
      case 'balance':
        return <BalanceSettings />;
      case 'currency':
        return <CurrencySettings />;
      default:
        return <RateSettings />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold font-headline tracking-tight">Settings</h2>
        <p className="text-on-surface-variant text-xs">Configure your application preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-container-low p-1 rounded-2xl gap-1">
        <TabButton 
          active={activeTab === 'rate'} 
          onClick={() => setActiveTab('rate')} 
          icon={<TrendingUp className="w-4 h-4" />}
          label="Rate"
        />
        <TabButton 
          active={activeTab === 'balance'} 
          onClick={() => setActiveTab('balance')} 
          icon={<Wallet className="w-4 h-4" />}
          label="Balance"
        />
        <TabButton 
          active={activeTab === 'currency'} 
          onClick={() => setActiveTab('currency')} 
          icon={<DollarSign className="w-4 h-4" />}
          label="Currency"
        />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
        active ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function RateSettings() {
  return (
    <div className="space-y-4">
      <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-container/50 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold font-headline">Exchange Rate</h3>
            <p className="text-xs text-on-surface-variant">Set the conversion rate for currencies</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Base Currency (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
              <input type="text" value="1.00" disabled className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-8 pr-4 text-sm font-bold opacity-60" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Target Currency (KHR)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">៛</span>
              <input type="number" defaultValue={4100} className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-8 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        <button className="w-full primary-gradient text-white py-4 rounded-2xl font-headline font-bold mt-8 shadow-lg shadow-primary/20">
          Save Rate
        </button>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          The exchange rate is used to calculate totals in both USD and KHR during checkout and in reports.
        </p>
      </div>
    </div>
  );
}

function BalanceSettings() {
  return (
    <div className="space-y-4">
      <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-container/50 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold font-headline">Beginning Balance</h3>
            <p className="text-xs text-on-surface-variant">Set initial cash for the session</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Initial Cash (USD)</label>
            <input type="number" placeholder="0.00" className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-secondary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Initial Cash (KHR)</label>
            <input type="number" placeholder="0" className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-secondary" />
          </div>
        </div>

        <button className="w-full bg-secondary text-white py-4 rounded-2xl font-headline font-bold mt-8 shadow-lg shadow-secondary/20">
          Set Balance
        </button>
      </div>
    </div>
  );
}

function CurrencySettings() {
  return (
    <div className="space-y-4">
      <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-container/50 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold font-headline">Currency Display</h3>
            <p className="text-xs text-on-surface-variant">Choose your preferred currency</p>
          </div>
        </div>

        <div className="space-y-3">
          <CurrencyOption label="US Dollar (USD)" symbol="$" active />
          <CurrencyOption label="Khmer Riel (KHR)" symbol="៛" />
          <CurrencyOption label="Dual Display (USD/KHR)" symbol="$/៛" />
        </div>

        <button className="w-full bg-tertiary text-white py-4 rounded-2xl font-headline font-bold mt-8 shadow-lg shadow-tertiary/20">
          Apply Changes
        </button>
      </div>
    </div>
  );
}

function CurrencyOption({ label, symbol, active }: { label: string, symbol: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
      active ? "bg-tertiary/5 border-tertiary" : "bg-surface-container-low border-transparent hover:border-surface-container-high"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center font-bold",
          active ? "bg-tertiary text-white" : "bg-surface-container-high text-on-surface-variant"
        )}>
          {symbol}
        </div>
        <span className={cn("text-sm font-bold", active ? "text-tertiary" : "text-on-surface")}>{label}</span>
      </div>
      {active && <div className="w-2 h-2 rounded-full bg-tertiary" />}
    </button>
  );
}
