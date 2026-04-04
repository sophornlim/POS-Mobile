import React from 'react';
import { Utensils, Wine, Pizza, Banknote, Wallet, QrCode, Printer, Mail, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Checkout({ onBack }: { onBack: () => void }) {
  const handlePrint = () => {
    // Mock print functionality
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Invoice</title>');
      printWindow.document.write('<style>body { font-family: sans-serif; padding: 20px; text-align: center; } .logo { width: 80px; height: 80px; margin-bottom: 10px; } .header { margin-bottom: 30px; } .details { text-align: left; margin-bottom: 20px; } table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } th, td { text-align: left; padding: 8px; border-bottom: 1px solid #eee; } .total-section { text-align: right; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<div class="header">');
      printWindow.document.write('<img src="https://picsum.photos/seed/restaurant/200/200" class="logo" referrerPolicy="no-referrer" />');
      printWindow.document.write('<h1>Neary Khmer POS</h1>');
      printWindow.document.write('<p>#123, Street 456, Sangkat Boeung Keng Kang I,<br/>Khan Chamkarmon, Phnom Penh, Cambodia</p>');
      printWindow.document.write('<p>Contact: +855 12 345 678 / +855 98 765 432</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="details">');
      printWindow.document.write('<p><strong>Order #8829</strong></p>');
      printWindow.document.write('<p>Date: 04 Apr 2026, 07:43 AM</p>');
      printWindow.document.write('<p>Cashier: Sophorn Lim | Table: VIP-06</p>');
      printWindow.document.write('<p>Exchange Rate: ៛4,000 / $1</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('<table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody>');
      printWindow.document.write('<tr><td>Neary Khmer Salad</td><td>$11.50</td></tr>');
      printWindow.document.write('<tr><td>Ice Cappuccino (icc)</td><td>$2.00</td></tr>');
      printWindow.document.write('<tr><td>Ice Espresso (IE01)</td><td>$2.00</td></tr>');
      printWindow.document.write('</tbody></table>');
      printWindow.document.write('<div class="total-section">');
      printWindow.document.write('<p>Subtotal: $15.50</p>');
      printWindow.document.write('<p>Discount: -$1.50</p>');
      printWindow.document.write('<p>Tax: $1.32</p>');
      printWindow.document.write('<p>Commission: $0.50</p>');
      printWindow.document.write('<h3>Total: $15.82</h3>');
      printWindow.document.write('<h3>Total Riel: ៛64,862</h3>');
      printWindow.document.write('</div>');
      printWindow.document.write('<p style="margin-top: 40px; font-size: 12px; color: #666;">Thank you for dining with Neary Khmer!</p>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Printing initiated! (In a real app, this would open a print dialog)');
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-on-surface" />
        </button>
        <h2 className="text-2xl font-extrabold font-headline tracking-tight">Checkout</h2>
      </div>

      <section className="bg-surface-container-lowest rounded-3xl p-6 space-y-4 shadow-sm border border-surface-container/50">
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Invoice Date</span>
            <span className="font-bold">04 Apr 2026, 07:43 AM</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Exchange Rate</span>
            <span className="font-bold text-primary">៛4,000 / $1</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Cashier</span>
            <span className="font-bold">Sophorn Lim</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Table</span>
            <span className="font-bold">VIP-06</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Customer</span>
            <span className="font-bold">Walk-in Customer</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Warehouse</span>
            <span className="font-bold">Selling Store</span>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-3xl p-6 space-y-6 shadow-sm">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Order #8829</span>
        </div>

        <div className="space-y-4">
          <OrderItem icon={<Utensils />} title="Neary Khmer Salad" detail="Shrimps, Tomato" price={11.50} />
          <OrderItem icon={<Wine />} title="Ice Cappuccino" titleKh="អាយកាប៉ូជីណី" code="icc" detail="Cup, Milk (0.04g)" price={2.00} color="text-tertiary" bgColor="bg-tertiary/10" />
          <OrderItem icon={<Pizza />} title="Ice Espresso" titleKh="កាហ្វអេចប្រេស៊ូ" code="IE01" detail="Glass, Ice (0.01g)" price={2.00} />
        </div>

        <div className="pt-6 border-t border-surface-container space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-bold">$15.50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Discount</span>
            <span className="font-bold text-emerald-600">-$1.50</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Tax (8.5%)</span>
            <span className="font-bold">$1.32</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Commission</span>
            <span className="font-bold">$0.50</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold font-headline">Total</span>
            <span className="text-2xl font-extrabold font-headline text-primary">$15.82</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-surface-container/50">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Riel</span>
            <span className="text-lg font-bold text-secondary">៛64,862</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-2">Payment Method</h3>
        <div className="grid grid-cols-3 gap-4">
          <PaymentOption icon={<Banknote />} label="CASH" active />
          <PaymentOption icon={<Wallet />} label="BANK" />
          <PaymentOption icon={<QrCode />} label="QR PAY" />
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <button 
          onClick={handlePrint}
          className="w-full primary-gradient text-white h-16 rounded-3xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          <Printer className="w-6 h-6" />
          Print Invoice
        </button>
        <button className="w-full bg-surface-container-low text-on-surface h-14 rounded-3xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
          <Mail className="w-5 h-5" />
          Email Receipt
        </button>
      </section>
    </div>
  );
}

function OrderItem({ icon, title, titleKh, code, detail, price, color = "text-primary", bgColor = "bg-primary/10" }: { icon: React.ReactNode, title: string, titleKh?: string, code?: string, detail: string, price: number, color?: string, bgColor?: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", bgColor, color)}>
          {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
        </div>
        <div>
          <p className="font-bold text-sm">{title}</p>
          {titleKh && <p className="text-[10px] text-primary font-bold -mt-0.5">{titleKh}</p>}
          <div className="flex items-center gap-2">
            {code && <span className="text-[8px] text-on-surface-variant font-mono uppercase tracking-wider">#{code}</span>}
            <p className="text-[10px] text-on-surface-variant font-medium">{detail}</p>
          </div>
        </div>
      </div>
      <span className="font-bold text-sm">${price.toFixed(2)}</span>
    </div>
  );
}

function PaymentOption({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "rounded-3xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all h-24",
      active ? "bg-white border-2 border-primary" : "bg-surface-container-low"
    )}>
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("w-8 h-8", active ? "text-primary" : "text-on-surface-variant") 
      })}
      <span className={cn("text-[10px] font-bold uppercase tracking-wider", active ? "text-primary" : "text-on-surface-variant")}>
        {label}
      </span>
    </button>
  );
}
