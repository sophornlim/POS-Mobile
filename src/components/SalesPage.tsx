import React, { useState } from 'react';
import { Search, Filter, Eye, Printer, Trash2, X, Calendar, User, DollarSign, Percent, Briefcase, Activity, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { APP_LOGO } from '../constants';

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

  const handlePrint = (invoice: SaleRecord) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Invoice</title>');
      printWindow.document.write('<style>');
      printWindow.document.write('@page { margin: 0; }');
      printWindow.document.write('body { font-family: "Courier New", Courier, monospace; width: 80mm; padding: 4mm; margin: 0; font-size: 12px; line-height: 1.4; color: #000; }');
      printWindow.document.write('.logo { width: 35mm; height: auto; margin: 0 auto 4mm; display: block; object-fit: contain; mix-blend-mode: multiply; }');
      printWindow.document.write('.header { text-align: center; margin-bottom: 6mm; border-bottom: 1px dashed #000; padding-bottom: 4mm; }');
      printWindow.document.write('.header h1 { font-size: 18px; margin: 0 0 2mm; font-weight: bold; }');
      printWindow.document.write('.header p { font-size: 10px; margin: 1mm 0; line-height: 1.2; }');
      printWindow.document.write('.details { margin-bottom: 4mm; font-size: 11px; }');
      printWindow.document.write('.details p { margin: 1mm 0; display: flex; justify-content: space-between; }');
      printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-bottom: 4mm; }');
      printWindow.document.write('th { text-align: left; padding: 2mm 0; border-bottom: 1px solid #000; font-size: 11px; text-transform: uppercase; }');
      printWindow.document.write('td { text-align: left; padding: 2mm 0; border-bottom: 1px dashed #ccc; font-size: 11px; }');
      printWindow.document.write('.total-section { text-align: right; margin-top: 4mm; border-top: 1px solid #000; padding-top: 2mm; }');
      printWindow.document.write('.total-section p { margin: 1mm 0; font-size: 11px; display: flex; justify-content: space-between; }');
      printWindow.document.write('.total-section h3 { margin: 2mm 0; font-size: 15px; font-weight: bold; display: flex; justify-content: space-between; }');
      printWindow.document.write('.footer { text-align: center; margin-top: 8mm; font-size: 10px; border-top: 1px dashed #000; padding-top: 4mm; font-style: italic; }');
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<div class="header">');
      printWindow.document.write(`<img src="${APP_LOGO}" class="logo" referrerPolicy="no-referrer" />`);
      printWindow.document.write('<h1>Neary Khmer POS</h1>');
      printWindow.document.write('<p>#123, Street 456, Sangkat Boeung Keng Kang I,<br/>Khan Chamkarmon, Phnom Penh, Cambodia</p>');
      printWindow.document.write('<p>Contact: +855 12 345 678 / +855 98 765 432</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="details">');
      printWindow.document.write(`<p><span>Order:</span> <strong>${invoice.invoiceCode}</strong></p>`);
      printWindow.document.write(`<p><span>Date:</span> ${invoice.date}</p>`);
      printWindow.document.write(`<p><span>Customer:</span> ${invoice.customer}</p>`);
      printWindow.document.write(`<p><span>Rate:</span> ៛${invoice.exchangeRate} / $1</p>`);
      printWindow.document.write('</div>');
      printWindow.document.write('<table><thead><tr><th>Item</th><th style="text-align:right">Price</th></tr></thead><tbody>');
      invoice.items.forEach(item => {
        printWindow.document.write(`<tr><td>${item.productName} (x${item.quantity})</td><td style="text-align:right">${item.price}</td></tr>`);
      });
      printWindow.document.write('</tbody></table>');
      printWindow.document.write('<div class="total-section">');
      printWindow.document.write(`<p><span>Discount:</span> <span>${invoice.discount}</span></p>`);
      printWindow.document.write(`<p><span>Tax:</span> <span>${invoice.tax}</span></p>`);
      printWindow.document.write(`<p><span>Commission:</span> <span>${invoice.commission}</span></p>`);
      printWindow.document.write(`<h3><span>Total:</span> <span>${invoice.totalAmount}</span></h3>`);
      printWindow.document.write(`<h3><span>Total Riel:</span> <span>${invoice.totalRiel}</span></h3>`);
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="footer">');
      printWindow.document.write('<p>Thank you for dining with Neary Khmer!</p>');
      printWindow.document.write('<p>Please come again!</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

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
          <button 
            onClick={() => handlePrint(selectedInvoice)}
            className="flex-1 primary-gradient text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <Logo containerClassName="w-5 h-5" />
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
              <button 
                onClick={() => handlePrint(sale)}
                className="p-2.5 bg-surface-container-low text-on-surface-variant rounded-xl hover:bg-surface-container transition-all active:scale-95"
              >
                <Logo containerClassName="w-4 h-4" />
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
