import React, { useState } from 'react';
import { Search, Filter, Eye, Printer, Trash2, X, Calendar, User, DollarSign, Percent, Briefcase, Activity, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface InvoiceItem {
  productName: string;
  quantity: number;
  price: string;
  discount: string;
  tax: string;
  subtotal: string;
}

interface SalePayment {
  invoiceCode: string;
  method: string;
  amount: string;
  totalRiel: string;
  status: string;
}

interface SaleRecord {
  invoiceCode: string;
  date: string;
  customer: string;
  exchangeRate: string;
  discount: string;
  tax: string;
  commission: string;
  totalAmount: string;
  totalRiel: string;
  status: 'Active' | 'Void' | 'Completed';
  items: InvoiceItem[];
  payments: SalePayment[];
}

const MOCK_SALES: SaleRecord[] = [
  {
    invoiceCode: 'INV-1774439360057',
    date: '3/25/2026',
    customer: 'Walkin',
    exchangeRate: '4,000',
    discount: '$0.00',
    tax: '$0.00',
    commission: '$0.00',
    totalAmount: '$10.00',
    totalRiel: '៛40,000',
    status: 'Active',
    items: [
      { productName: '-', quantity: 2, price: '$3.00', discount: '$0.00', tax: '$0.00', subtotal: '$6.00' },
      { productName: 'Ice Espresso', quantity: 2, price: '$2.00', discount: '$0.00', tax: '$0.00', subtotal: '$4.00' },
    ],
    payments: [
      { invoiceCode: 'INV-1774439360057', method: 'Cash', amount: '$10.00', totalRiel: '៛40000.00', status: 'Active' }
    ]
  },
  {
    invoiceCode: 'INV-1774439314459',
    date: '3/25/2026',
    customer: 'Walkin',
    exchangeRate: '4,000',
    discount: '$0.00',
    tax: '$0.00',
    commission: '$0.00',
    totalAmount: '$3.00',
    totalRiel: '៛12,000',
    status: 'Active',
    items: [
      { productName: '-', quantity: 1, price: '$3.00', discount: '$0.00', tax: '$0.00', subtotal: '$3.00' },
    ],
    payments: [
      { invoiceCode: 'INV-1774439314459', method: 'Cash', amount: '$3.00', totalRiel: '៛12000.00', status: 'Active' }
    ]
  },
];

export default function SalesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<SaleRecord | null>(null);

  if (selectedInvoice) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6 pb-8"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedInvoice(null)}
            className="p-2 hover:bg-surface-container rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-on-surface" />
          </button>
          <div>
            <h2 className="text-2xl font-extrabold font-headline tracking-tight">Invoice Details</h2>
            <p className="text-primary font-mono font-bold text-sm">{selectedInvoice.invoiceCode}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-surface-container-lowest rounded-3xl p-6 space-y-6 shadow-sm border border-surface-container/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">General Information</h3>
            <div className="space-y-4">
              <DetailRow icon={<Calendar />} label="Date" value={selectedInvoice.date} />
              <DetailRow icon={<User />} label="Customer" value={selectedInvoice.customer} />
              <DetailRow icon={<Activity />} label="Status" value={selectedInvoice.status} isStatus />
              <DetailRow icon={<Briefcase />} label="Exchange Rate" value={`៛${selectedInvoice.exchangeRate} / $1`} />
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-3xl p-6 space-y-6 shadow-sm border border-surface-container/50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Financial Summary</h3>
            <div className="space-y-4">
              <DetailRow icon={<Percent />} label="Discount" value={selectedInvoice.discount} color="text-emerald-600" />
              <DetailRow icon={<DollarSign />} label="Tax" value={selectedInvoice.tax} />
              <DetailRow icon={<DollarSign />} label="Commission" value={selectedInvoice.commission} />
              <div className="pt-4 border-t border-surface-container space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Total Amount</span>
                  <span className="text-xl font-extrabold text-primary">{selectedInvoice.totalAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Riel</span>
                  <span className="text-lg font-bold text-secondary">{selectedInvoice.totalRiel}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-surface-container/50">
          <div className="px-6 py-4 border-b border-surface-container">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Invoice Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Product Name</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Qty</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {selectedInvoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-on-surface">{item.productName}</td>
                    <td className="px-6 py-4 text-xs text-center font-medium">{item.quantity}</td>
                    <td className="px-6 py-4 text-xs text-right font-bold text-primary">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-surface-container/50">
          <div className="px-6 py-4 border-b border-surface-container">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Sale Payment</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Method</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Amount</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Total Riel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {selectedInvoice.payments.map((payment, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-medium">{payment.method}</td>
                    <td className="px-6 py-4 text-xs text-right font-bold text-on-surface">{payment.amount}</td>
                    <td className="px-6 py-4 text-xs text-right font-bold text-secondary">{payment.totalRiel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex gap-4">
          <button className="flex-1 primary-gradient text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-primary/20">
            <Printer className="w-5 h-5" />
            Print Invoice
          </button>
          <button className="px-6 bg-surface-container-low text-red-500 h-14 rounded-2xl font-bold flex items-center justify-center active:scale-95 transition-all">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-extrabold font-headline tracking-tight">Sales History</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container transition-colors">
            <Filter className="w-5 h-5 text-on-surface" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_SALES.map((sale) => (
          <motion.div 
            key={sale.invoiceCode}
            whileHover={{ y: -4 }}
            className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 space-y-4 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Invoice Code</span>
                <p className="text-sm font-mono font-bold text-primary">{sale.invoiceCode}</p>
              </div>
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                sale.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-surface-container text-on-surface-variant"
              )}>
                {sale.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Date</span>
                <p className="text-xs font-medium">{sale.date}</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Customer</span>
                <p className="text-xs font-medium">{sale.customer}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total ($)</span>
                <p className="text-lg font-extrabold text-on-surface">{sale.totalAmount}</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total (៛)</span>
                <p className="text-lg font-extrabold text-secondary">{sale.totalRiel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-surface-container/50">
              <button 
                onClick={() => setSelectedInvoice(sale)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all active:scale-95"
              >
                <Eye className="w-4 h-4" />
                View Detail
              </button>
              <button className="p-2.5 bg-surface-container-low text-on-surface-variant rounded-xl hover:bg-surface-container transition-all active:scale-95">
                <Printer className="w-4 h-4" />
              </button>
              <button className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all active:scale-95">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center px-4">
        <p className="text-xs text-on-surface-variant font-medium">Showing 2 of 24 invoices</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-low rounded-xl text-xs font-bold opacity-50 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 bg-surface-container-low rounded-xl text-xs font-bold hover:bg-surface-container">Next</button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value, isStatus, color = "text-on-surface" }: { icon: React.ReactNode, label: string, value: string, isStatus?: boolean, color?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant">
          {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
        </div>
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{label}</span>
      </div>
      {isStatus ? (
        <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
          {value}
        </span>
      ) : (
        <span className={cn("text-sm font-bold", color)}>{value}</span>
      )}
    </div>
  );
}
