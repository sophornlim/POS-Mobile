import React from 'react';
import { Utensils, Wine, Pizza, Banknote, Wallet, QrCode, Printer, Mail, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { TABLES, APP_LOGO, PRODUCTS } from '../constants';

export default function Checkout({ onBack, cart, tableId, onClearCart }: { onBack: () => void, cart: Record<string, number>, tableId: string | null, onClearCart?: () => void }) {
  const table = TABLES.find(t => t.id === tableId);
  const tableNumber = table ? `Table ${table.number}` : 'Unknown Table';

  const [discount, setDiscount] = React.useState(0);
  const [taxRate, setTaxRate] = React.useState(10);
  const [commission, setCommission] = React.useState(0);

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return { ...product, quantity: qty };
  }).filter(item => item.id);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity as number), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal - discount + tax + commission;
  const totalRiel = Math.round(total * 4000);

  const handlePrint = () => {
    // Mock print functionality
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
      printWindow.document.write(`<img src="${APP_LOGO}" class="logo" referrerPolicy="no-referrer" crossorigin="anonymous" />`);
      printWindow.document.write('<h1>Neary Khmer POS</h1>');
      printWindow.document.write('<p>#123, Street 456, Sangkat Boeung Keng Kang I,<br/>Khan Chamkarmon, Phnom Penh, Cambodia</p>');
      printWindow.document.write('<p>Contact: +855 12 345 678 / +855 98 765 432</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="details">');
      printWindow.document.write('<p><span>Order:</span> <strong>#8829</strong></p>');
      printWindow.document.write('<p><span>Date:</span> ' + new Date().toLocaleString() + '</p>');
      printWindow.document.write('<p><span>Cashier:</span> Sophorn Lim</p>');
      printWindow.document.write('<p><span>Table:</span> ' + tableNumber + '</p>');
      printWindow.document.write('<p><span>Customer:</span> Walk-in Customer</p>');
      printWindow.document.write('<p><span>Warehouse:</span> Selling Store</p>');
      printWindow.document.write('<p><span>Rate:</span> ៛4,000 / $1</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('<table><thead><tr><th>Item</th><th style="text-align:right">Qty</th><th style="text-align:right">Price</th></tr></thead><tbody>');
      cartItems.forEach(item => {
        printWindow.document.write(`<tr><td>${item.name}</td><td style="text-align:right">${item.quantity}</td><td style="text-align:right">$${((item.price || 0) * (item.quantity as number)).toFixed(2)}</td></tr>`);
      });
      printWindow.document.write('</tbody></table>');
      printWindow.document.write('<div class="total-section">');
      printWindow.document.write(`<p><span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span></p>`);
      if (discount > 0) printWindow.document.write(`<p><span>Discount:</span> <span>-$${discount.toFixed(2)}</span></p>`);
      printWindow.document.write(`<p><span>Tax (${taxRate}%):</span> <span>$${tax.toFixed(2)}</span></p>`);
      if (commission > 0) printWindow.document.write(`<p><span>Commission:</span> <span>$${commission.toFixed(2)}</span></p>`);
      printWindow.document.write(`<h3><span>Total:</span> <span>$${total.toFixed(2)}</span></h3>`);
      printWindow.document.write(`<h3><span>Total Riel:</span> <span>៛${totalRiel.toLocaleString()}</span></h3>`);
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="footer">');
      printWindow.document.write('<p>Thank you for dining with Neary Khmer!</p>');
      printWindow.document.write('<p>Please come again!</p>');
      printWindow.document.write('</div>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      
      // Wait for images to load before printing
      const logoImg = printWindow.document.querySelector('.logo') as HTMLImageElement;
      const doPrint = () => {
        printWindow.print();
        if (onClearCart) onClearCart();
      };

      if (logoImg) {
        if (logoImg.complete) {
          setTimeout(doPrint, 500);
        } else {
          logoImg.onload = () => setTimeout(doPrint, 500);
          logoImg.onerror = () => {
            console.error("Logo failed to load in print window");
            doPrint();
          };
        }
      } else {
        doPrint();
      }
    }
  };

  return (
    <div className="space-y-8 pb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-on-surface" />
            </button>
            <h2 className="text-2xl font-extrabold font-headline tracking-tight">Checkout</h2>
          </div>
          <span className="text-primary font-bold font-headline text-lg">{tableNumber}</span>
        </div>

      <section className="bg-surface-container-lowest rounded-3xl p-6 space-y-4 shadow-sm border border-surface-container/50">
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Invoice Date</span>
            <span className="font-bold">{new Date().toLocaleString()}</span>
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
            <span className="font-bold">{table?.number || 'N/A'}</span>
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
          {cartItems.map(item => (
            <div key={item.id}>
              <OrderItem 
                icon={<Utensils />} 
                title={item.name || ''} 
                titleKh={item.nameKh}
                code={item.code}
                detail={`${item.quantity} x $${item.price?.toFixed(2)}`} 
                price={(item.price || 0) * (item.quantity as number)} 
              />
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-surface-container space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Discount ($)</span>
            <input 
              type="number" 
              value={discount} 
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-20 bg-surface-container-low border border-surface-container rounded px-2 py-1 text-right font-bold text-emerald-600"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Tax (%)</span>
            <input 
              type="number" 
              value={taxRate} 
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-20 bg-surface-container-low border border-surface-container rounded px-2 py-1 text-right font-bold"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Commission ($)</span>
            <input 
              type="number" 
              value={commission} 
              onChange={(e) => setCommission(Number(e.target.value))}
              className="w-20 bg-surface-container-low border border-surface-container rounded px-2 py-1 text-right font-bold"
            />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold font-headline">Total</span>
            <span className="text-2xl font-extrabold font-headline text-primary">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-surface-container/50">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Riel</span>
            <span className="text-lg font-bold text-secondary">៛{totalRiel.toLocaleString()}</span>
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
          className="w-full primary-gradient text-white h-14 rounded-3xl font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          <Printer className="w-5 h-5" />
          Print Invoice
        </button>
        <button className="w-full bg-surface-container-low text-on-surface h-12 rounded-3xl font-bold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
          <Mail className="w-4 h-4" />
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
      "rounded-3xl p-3 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all h-20",
      active ? "bg-white border-2 border-primary" : "bg-surface-container-low"
    )}>
      {React.cloneElement(icon as React.ReactElement, { 
        className: cn("w-6 h-6", active ? "text-primary" : "text-on-surface-variant") 
      })}
      <span className={cn("text-[10px] font-bold uppercase tracking-wider", active ? "text-primary" : "text-on-surface-variant")}>
        {label}
      </span>
    </button>
  );
}
