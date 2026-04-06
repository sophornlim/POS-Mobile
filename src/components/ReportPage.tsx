import React, { useState } from 'react';
import { Search, Filter, Calendar, ReceiptText, Warehouse, User, LayoutGrid, Package, Tag, DollarSign, CreditCard, ChevronRight, BarChart3, TrendingUp, ShoppingBag, Wallet, AlertCircle, Printer } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { APP_LOGO } from '../constants';
import Logo from './Logo';

type ReportType = 'sale' | 'product' | 'income' | 'profit';

interface SaleReportItem {
  id: string;
  date: string;
  invoiceNo: string;
  warehouse: string;
  customer: string;
  table: string;
  product: string;
  category: string;
  unit: string;
  qty: number;
  price: string;
  total: string;
  payment: string;
}

interface ProductSoldReportItem {
  id: string;
  code: string;
  productName: string;
  category: string;
  unit: string;
  opening: number;
  issued: number;
  returned: number;
  adjustment: number;
  sold: number;
  closing: number;
  price: string;
  totalValue: string;
  location: string;
  status: 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK';
}

interface IncomeReportItem {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
  paymentMethod: string;
  reference: string;
}

interface ProfitReportItem {
  id: string;
  product: string;
  category: string;
  qtySold: number;
  price: string;
  cost: string;
  revenue: string;
  totalCost: string;
  profit: string;
  margin: string;
}

const MOCK_SALE_DATA: SaleReportItem[] = [
  {
    id: '1',
    date: '3/25/2026',
    invoiceNo: 'INV-1774439360057',
    warehouse: 'Stoeng Trorcheak Restaurant',
    customer: 'Walkin',
    table: 'FD-06',
    product: '-',
    category: '-',
    unit: '-',
    qty: 2,
    price: '$3.00',
    total: '$6.00',
    payment: 'Cash'
  },
  {
    id: '2',
    date: '3/25/2026',
    invoiceNo: 'INV-1774439360057',
    warehouse: 'Stoeng Trorcheak Restaurant',
    customer: 'Walkin',
    table: 'FD-06',
    product: 'Ice Espresso',
    category: 'COFFEE & CHOCOLATE',
    unit: 'Glass',
    qty: 2,
    price: '$2.00',
    total: '$4.00',
    payment: 'Cash'
  },
  {
    id: '3',
    date: '3/25/2026',
    invoiceNo: 'INV-1774439314459',
    warehouse: 'Stoeng Trorcheak Restaurant',
    customer: 'Walkin',
    table: 'FD-08',
    product: '-',
    category: '-',
    unit: '-',
    qty: 1,
    price: '$3.00',
    total: '$3.00',
    payment: 'Cash'
  }
];

const MOCK_PRODUCT_SOLD_DATA: ProductSoldReportItem[] = [
  {
    id: '1',
    code: 'IE01',
    productName: 'Ice Espresso',
    category: 'COFFEE & CHOCOLATE',
    unit: 'Glass',
    opening: 0,
    issued: 0,
    returned: 0,
    adjustment: 0,
    sold: 2,
    closing: -2,
    price: '$2.00',
    totalValue: '$-4.00',
    location: 'ALL LOCATIONS',
    status: 'OUT OF STOCK'
  },
  {
    id: '2',
    code: 'icc',
    productName: 'Ice Cappuccino',
    category: 'COFFEE & CHOCOLATE',
    unit: 'Cup',
    opening: 0,
    issued: 0,
    returned: 0,
    adjustment: 0,
    sold: 0,
    closing: 0,
    price: '$2.00',
    totalValue: '$0.00',
    location: 'ALL LOCATIONS',
    status: 'OUT OF STOCK'
  }
];

const MOCK_INCOME_DATA: IncomeReportItem[] = [
  {
    id: '1',
    date: '3/25/2026',
    category: 'Sales',
    description: 'Daily Sales Revenue',
    amount: '$13.00',
    paymentMethod: 'Cash',
    reference: 'REF-001'
  },
  {
    id: '2',
    date: '3/24/2026',
    category: 'Service',
    description: 'Catering Service Fee',
    amount: '$150.00',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-002'
  }
];

const MOCK_PROFIT_DATA: ProfitReportItem[] = [
  {
    id: '1',
    product: 'Ice Cappuccino',
    category: 'COFFEE & CHOCOLATE',
    qtySold: 0,
    price: '$0.00',
    cost: '$0.00',
    revenue: '$0.00',
    totalCost: '$0.00',
    profit: '$0.00',
    margin: '0.00%'
  },
  {
    id: '2',
    product: 'Ice Espresso',
    category: 'COFFEE & CHOCOLATE',
    qtySold: 2,
    price: '$2.00',
    cost: '$0.00',
    revenue: '$4.00',
    totalCost: '$0.00',
    profit: '$4.00',
    margin: '100.00%'
  }
];

export default function ReportPage() {
  const [activeReport, setActiveReport] = useState<ReportType | 'menu'>('menu');
  const [searchQuery, setSearchQuery] = useState('');

  const renderReportContent = () => {
    switch (activeReport) {
      case 'sale':
        return <TotalSaleReport searchQuery={searchQuery} onBack={() => setActiveReport('menu')} />;
      case 'product':
        return <TotalProductSoldReport searchQuery={searchQuery} onBack={() => setActiveReport('menu')} />;
      case 'income':
        return <TotalIncomeReport searchQuery={searchQuery} onBack={() => setActiveReport('menu')} />;
      case 'profit':
        return <ProfitLossReport searchQuery={searchQuery} onBack={() => setActiveReport('menu')} />;
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MenuCard 
              title="Total Sale" 
              description="View all sales transactions and summaries"
              icon={<TrendingUp className="w-8 h-8" />}
              color="bg-primary"
              onClick={() => setActiveReport('sale')}
            />
            <MenuCard 
              title="Product Sold" 
              description="Track product movement and stock levels"
              icon={<ShoppingBag className="w-8 h-8" />}
              color="bg-secondary"
              onClick={() => setActiveReport('product')}
            />
            <MenuCard 
              title="Total Income" 
              description="Income summary with opening/closing balance"
              icon={<Wallet className="w-8 h-8" />}
              color="bg-tertiary"
              onClick={() => setActiveReport('income')}
            />
            <MenuCard 
              title="Loss & Profit" 
              description="Analyze revenue, costs, and profitability"
              icon={<BarChart3 className="w-8 h-8" />}
              color="bg-rose-500"
              onClick={() => setActiveReport('profit')}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div className="flex items-center gap-4">
          {activeReport !== 'menu' && (
            <button 
              onClick={() => setActiveReport('menu')}
              className="p-2 hover:bg-surface-container rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
          )}
          <h2 className="text-2xl font-extrabold font-headline tracking-tight">
            {activeReport === 'menu' ? 'Reports Menu' : 
             activeReport === 'sale' ? 'Total Sale Report' :
             activeReport === 'product' ? 'Product Sold Report' : 
             activeReport === 'profit' ? 'Profit & Loss Report' : 'Total Income Report'}
          </h2>
        </div>
        {activeReport !== 'menu' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="text" 
                placeholder="Search report..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="p-2 bg-surface-container-low rounded-full hover:bg-surface-container transition-colors">
              <Filter className="w-5 h-5 text-on-surface" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeReport}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="scrollbar-hide"
        >
          {renderReportContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MenuCard({ title, description, icon, color, onClick }: { title: string, description: string, icon: React.ReactNode, color: string, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-surface-container/50 text-left flex flex-col gap-6 group transition-all hover:shadow-xl hover:shadow-surface-container/20"
    >
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg", color)}>
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold font-headline tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
        Open Report <ChevronRight className="w-4 h-4" />
      </div>
    </motion.button>
  );
}

function ProfitLossReport({ searchQuery, onBack }: { searchQuery: string, onBack: () => void }) {
  const [startDate, setStartDate] = useState('mm/dd/yyyy');
  const [endDate, setEndDate] = useState('mm/dd/yyyy');
  const [category, setCategory] = useState('All Categories');
  const [product, setProduct] = useState('All Products');

  const filteredData = MOCK_PROFIT_DATA.filter(item =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const summary = {
    revenue: 13.00,
    purchase: 0.00,
    grossProfit: 13.00,
    margin: '100.00%',
    otherIncome: 0.00,
    otherExpense: 0.00,
    netProfit: 13.00
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold font-headline tracking-tight">Profit & Loss Report</h3>
            <p className="text-sm text-on-surface-variant">Analyze revenue, costs, and profitability</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton icon={<Logo containerClassName="w-4 h-4" />} label="Print" onClick={() => window.print()} />
            <ExportButton icon={<BarChart3 className="w-4 h-4" />} label="Excel" />
            <ExportButton icon={<ReceiptText className="w-4 h-4" />} label="PDF" />
            <ExportButton icon={<LayoutGrid className="w-4 h-4" />} label="Word" />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-surface-container print:hidden">
          <FilterSelect label="Category" value={category} onChange={setCategory} options={['All Categories', 'COFFEE & CHOCOLATE', 'FOOD']} icon={<Tag className="w-3 h-3" />} />
          <FilterSelect label="Product" value={product} onChange={setProduct} options={['All Products', 'Ice Espresso', 'Ice Cappuccino']} icon={<Package className="w-3 h-3" />} />
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Start Date
            </label>
            <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> End Date
            </label>
            <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium" />
          </div>
        </div>

        {/* Quick Date Selectors */}
        <div className="grid grid-cols-3 gap-2 mt-4 print:hidden">
          {['Today', 'This Month', 'This Quarter', 'This Semester', 'This Year'].map(label => (
            <button key={label} className="px-3 py-2 bg-surface-container-low hover:bg-primary/10 hover:text-primary rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">
              {label}
            </button>
          ))}
          <button className="px-3 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">Clear</button>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
        <SummaryCard label="Total Revenue" value={`$${summary.revenue.toFixed(2)}`} icon={<DollarSign className="w-6 h-6" />} color="bg-blue-500" />
        <SummaryCard label="Total Purchase" value={`$${summary.purchase.toFixed(2)}`} icon={<ShoppingBag className="w-6 h-6" />} color="bg-amber-500" />
        <div className="bg-emerald-500 text-white rounded-3xl p-6 shadow-lg shadow-emerald-500/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Gross Profit</p>
            <TrendingUp className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-3xl font-extrabold font-headline tracking-tight">${summary.grossProfit.toFixed(2)}</p>
          <p className="text-[10px] font-bold mt-2 bg-white/20 inline-block px-2 py-0.5 rounded-full">Margin: {summary.margin}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-container/50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Other Income</p>
          <p className="text-2xl font-extrabold text-on-surface">${summary.otherIncome.toFixed(2)}</p>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-surface-container/50">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Other Expense</p>
          <p className="text-2xl font-extrabold text-on-surface">${summary.otherExpense.toFixed(2)}</p>
        </div>
        <div className="bg-primary text-white rounded-3xl p-6 shadow-lg shadow-primary/20">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Net Profit</p>
          <p className="text-2xl font-extrabold">${summary.netProfit.toFixed(2)}</p>
          <p className="text-[8px] font-medium mt-1 opacity-70 italic">Gross Profit + Other Income - Other Expense</p>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="space-y-4 print:hidden">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-sm font-bold font-headline uppercase tracking-widest text-on-surface-variant">Product-wise Profit Breakdown</h4>
          <span className="text-[10px] font-bold bg-surface-container px-2 py-1 rounded-full">{filteredData.length} Items</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map((item) => (
            <div key={item.id}>
              <ProfitCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Print Template */}
      <ProfitLossPrintTemplate data={filteredData} summary={summary} />
    </div>
  );
}

function ProfitCard({ item }: { item: ProfitReportItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-on-surface leading-tight">{item.product}</h4>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.category}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Profit</span>
          <p className="text-lg font-extrabold text-emerald-600">{item.profit}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-container/50">
        <div className="space-y-0.5">
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Qty Sold</span>
          <p className="text-xs font-bold text-on-surface">{item.qtySold}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Price</span>
          <p className="text-xs font-bold text-on-surface">{item.price}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Cost</span>
          <p className="text-xs font-bold text-on-surface">{item.cost}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Revenue</span>
          <p className="text-xs font-bold text-on-surface">{item.revenue}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Total Cost</span>
          <p className="text-xs font-bold text-on-surface">{item.totalCost}</p>
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Margin %</span>
          <p className="text-xs font-bold text-emerald-600">{item.margin}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProfitLossPrintTemplate({ data, summary }: { data: ProfitReportItem[], summary: any }) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans text-[10px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <Logo containerClassName="w-12 h-12" />
          <div>
            <h1 className="text-lg font-extrabold uppercase leading-none mb-1">Profit & Loss Report</h1>
            <p className="text-[8px] text-gray-600">Angkor Wat, Siem Reap - 012969798</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">Neary Khmer</p>
          <p className="text-[8px] text-gray-600">Generated: {formattedDate} at {formattedTime}</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-4 mb-8 border border-gray-300 p-4 rounded bg-gray-50">
        <div>
          <p className="text-[8px] font-bold uppercase text-gray-500">Total Revenue</p>
          <p className="text-base font-extrabold">${summary.revenue.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[8px] font-bold uppercase text-gray-500">Total Purchase</p>
          <p className="text-base font-extrabold">${summary.purchase.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[8px] font-bold uppercase text-gray-500">Gross Profit</p>
          <p className="text-base font-extrabold">${summary.grossProfit.toFixed(2)}</p>
          <p className="text-[7px] font-bold">Margin: {summary.margin}</p>
        </div>
        <div>
          <p className="text-[8px] font-bold uppercase text-gray-500">Other Income</p>
          <p className="text-base font-extrabold">${summary.otherIncome.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[8px] font-bold uppercase text-gray-500">Other Expense</p>
          <p className="text-base font-extrabold">${summary.otherExpense.toFixed(2)}</p>
        </div>
        <div className="bg-gray-200 p-2 rounded">
          <p className="text-[8px] font-bold uppercase text-gray-500">Net Profit</p>
          <p className="text-base font-extrabold">${summary.netProfit.toFixed(2)}</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Product</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Category</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Qty Sold</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Price</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Cost</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Revenue</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Total Cost</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Profit</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Margin %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-1 font-bold">{item.product}</td>
              <td className="border border-gray-300 p-1">{item.category}</td>
              <td className="border border-gray-300 p-1 text-center">{item.qtySold}</td>
              <td className="border border-gray-300 p-1 text-right">{item.price}</td>
              <td className="border border-gray-300 p-1 text-right">{item.cost}</td>
              <td className="border border-gray-300 p-1 text-right">{item.revenue}</td>
              <td className="border border-gray-300 p-1 text-right">{item.totalCost}</td>
              <td className="border border-gray-300 p-1 text-right font-bold">{item.profit}</td>
              <td className="border border-gray-300 p-1 text-right font-bold text-emerald-700">{item.margin}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between mt-16 px-4">
        <div className="text-center">
          <p className="mb-12 font-bold">Verified and Check By: ___________________</p>
        </div>
        <div className="text-center">
          <p className="mb-12 font-bold">Prepared By: ___________________</p>
        </div>
      </div>
      <div className="text-right mt-8 text-[8px] text-gray-500">
        <p>Page: 1</p>
      </div>
    </div>
  );
}

function TotalSaleReport({ searchQuery, onBack }: { searchQuery: string, onBack: () => void }) {
  const [startDate, setStartDate] = useState('mm/dd/yyyy');
  const [endDate, setEndDate] = useState('mm/dd/yyyy');
  const [warehouse, setWarehouse] = useState('All Warehouses');
  const [customer, setCustomer] = useState('All Customers');
  const [user, setUser] = useState('All Users');
  const [product, setProduct] = useState('All Products');
  const [category, setCategory] = useState('All Categories');
  const [unit, setUnit] = useState('All Units');

  const filteredData = MOCK_SALE_DATA.filter(item => 
    item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.warehouse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = 13.00;
  const totalRiel = 52000;

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold font-headline tracking-tight">Total Sale Report</h3>
            <p className="text-sm text-on-surface-variant">View all sales transactions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton icon={<Logo containerClassName="w-4 h-4" />} label="Print" />
            <ExportButton icon={<BarChart3 className="w-4 h-4" />} label="Excel" />
            <ExportButton icon={<ReceiptText className="w-4 h-4" />} label="PDF" />
            <ExportButton icon={<LayoutGrid className="w-4 h-4" />} label="Word" />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 border-t border-surface-container">
          <FilterSelect label="Warehouse" value={warehouse} onChange={setWarehouse} options={['All Warehouses', 'Main', 'Store']} icon={<Warehouse className="w-3 h-3" />} />
          <FilterSelect label="Customer" value={customer} onChange={setCustomer} options={['All Customers', 'Walkin', 'VIP']} icon={<User className="w-3 h-3" />} />
          <FilterSelect label="User" value={user} onChange={setUser} options={['All Users', 'Admin', 'Cashier']} icon={<User className="w-3 h-3" />} />
          <FilterSelect label="Product" value={product} onChange={setProduct} options={['All Products', 'Ice Espresso', 'Americano']} icon={<Package className="w-3 h-3" />} />
          <FilterSelect label="Category" value={category} onChange={setCategory} options={['All Categories', 'Coffee', 'Food']} icon={<Tag className="w-3 h-3" />} />
          <FilterSelect label="Unit" value={unit} onChange={setUnit} options={['All Units', 'Glass', 'Cup']} icon={<Package className="w-3 h-3" />} />
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Start Date
            </label>
            <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> End Date
            </label>
            <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium" />
          </div>
        </div>

        {/* Quick Date Selectors */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {['Today', 'This Month', 'This Quarter', 'This Semester', 'This Year'].map(label => (
            <button key={label} className="px-3 py-2 bg-surface-container-low hover:bg-primary/10 hover:text-primary rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">
              {label}
            </button>
          ))}
          <button className="px-3 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">Clear</button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-primary text-white rounded-3xl p-6 shadow-lg shadow-primary/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Total Sales</p>
            <p className="text-3xl font-extrabold font-headline tracking-tight">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-secondary text-white rounded-3xl p-6 shadow-lg shadow-secondary/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Total Riel</p>
            <p className="text-3xl font-extrabold font-headline tracking-tight">៛{totalRiel.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-sm font-bold font-headline uppercase tracking-widest text-on-surface-variant">Transactions</h4>
          <span className="text-[10px] font-bold bg-surface-container px-2 py-1 rounded-full">{filteredData.length} Results</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map((item) => (
            <div key={item.id}>
              <SaleReportCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, icon }: { label: string, value: string, onChange: (v: string) => void, options: string[], icon: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium appearance-none"
      >
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TotalProductSoldReport({ searchQuery, onBack }: { searchQuery: string, onBack: () => void }) {
  const [fromDate, setFromDate] = useState('04/04/2026');
  const [toDate, setToDate] = useState('04/04/2026');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const filteredData = MOCK_PRODUCT_SOLD_DATA.filter(item => 
    (item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'All Categories' || item.category === selectedCategory) &&
    (selectedLocation === 'All Locations' || item.location === selectedLocation)
  );

  const summary = {
    opening: 0,
    issued: 0,
    returned: 0,
    adjustment: 0,
    sold: 2,
    closing: -2,
    value: -4.00,
    lowStock: 2
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold font-headline tracking-tight">Total Product Report</h3>
            <p className="text-sm text-on-surface-variant">View all products with details</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton icon={<Logo containerClassName="w-4 h-4" />} label="Print" onClick={() => window.print()} />
            <ExportButton icon={<BarChart3 className="w-4 h-4" />} label="Excel" />
            <ExportButton icon={<ReceiptText className="w-4 h-4" />} label="PDF" />
            <ExportButton icon={<LayoutGrid className="w-4 h-4" />} label="Word" />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-surface-container print:hidden">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> From Date
            </label>
            <input type="text" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> To Date
            </label>
            <input type="text" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs border-none focus:ring-2 focus:ring-primary/20 font-medium" />
          </div>
          <FilterSelect label="Category" value={selectedCategory} onChange={setSelectedCategory} options={['All Categories', 'COFFEE & CHOCOLATE', 'FOOD']} icon={<Tag className="w-3 h-3" />} />
          <FilterSelect label="Stock Location" value={selectedLocation} onChange={setSelectedLocation} options={['All Locations', 'ALL LOCATIONS', 'MAIN']} icon={<Warehouse className="w-3 h-3" />} />
        </div>

        {/* Quick Date Selectors */}
        <div className="grid grid-cols-3 gap-2 mt-4 print:hidden">
          {['Today', 'This Month', 'This Quarter', 'This Semester', 'This Year'].map(label => (
            <button key={label} className="px-3 py-2 bg-surface-container-low hover:bg-primary/10 hover:text-primary rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">
              {label}
            </button>
          ))}
          <button className="px-3 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">Clear</button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 print:hidden">
        <MiniStat label="Opening" value={summary.opening} color="bg-blue-50 text-blue-600" />
        <MiniStat label="Issued" value={summary.issued} color="bg-purple-50 text-purple-600" />
        <MiniStat label="Returned" value={summary.returned} color="bg-emerald-50 text-emerald-600" />
        <MiniStat label="Adjustment" value={summary.adjustment} color="bg-amber-50 text-amber-600" />
        <MiniStat label="Sold Today" value={summary.sold} color="bg-rose-50 text-rose-600" />
        <MiniStat label="Closing" value={summary.closing} color="bg-slate-50 text-slate-600" />
        <MiniStat label="Stock Value" value={`$${summary.value.toFixed(2)}`} color="bg-primary/10 text-primary" />
        <MiniStat label="Low Stock" value={summary.lowStock} color="bg-red-50 text-red-600" isAlert />
      </div>

      {/* Product List */}
      <div className="space-y-4 print:hidden">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-sm font-bold font-headline uppercase tracking-widest text-on-surface-variant">Product Details</h4>
          <span className="text-[10px] font-bold bg-surface-container px-2 py-1 rounded-full">{filteredData.length} Products</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map((item) => (
            <div key={item.id}>
              <ProductSoldCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Print Template */}
      <ProductStockPrintTemplate data={filteredData} />
    </div>
  );
}

function ProductStockPrintTemplate({ data }: { data: ProductSoldReportItem[] }) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans text-[10px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <Logo containerClassName="w-12 h-12" />
          <div>
            <h1 className="text-lg font-extrabold uppercase leading-none mb-1">Product Stock Report</h1>
            <p className="text-[8px] text-gray-600">Angkor Wat, Siem Reap - 012969798</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">Neary Khmer</p>
          <p className="text-[8px] text-gray-600">Generated: {formattedDate} at {formattedTime}</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Date</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Code</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Product Name</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Category</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Unit</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Opening</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Issued</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Returned</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Adjustment</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Sold</th>
            <th className="border border-gray-300 p-1 text-center text-[8px] font-bold uppercase">Closing</th>
            <th className="border border-gray-300 p-1 text-right text-[8px] font-bold uppercase">Price</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Location</th>
            <th className="border border-gray-300 p-1 text-left text-[8px] font-bold uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-1 whitespace-nowrap">2026-04-04</td>
              <td className="border border-gray-300 p-1 font-mono">{item.code}</td>
              <td className="border border-gray-300 p-1 font-bold">{item.productName}</td>
              <td className="border border-gray-300 p-1">{item.category}</td>
              <td className="border border-gray-300 p-1">{item.unit}</td>
              <td className="border border-gray-300 p-1 text-center">{item.opening}</td>
              <td className="border border-gray-300 p-1 text-center">{item.issued}</td>
              <td className="border border-gray-300 p-1 text-center">{item.returned}</td>
              <td className="border border-gray-300 p-1 text-center">{item.adjustment}</td>
              <td className="border border-gray-300 p-1 text-center">{item.sold}</td>
              <td className="border border-gray-300 p-1 text-center font-bold">{item.closing}</td>
              <td className="border border-gray-300 p-1 text-right">{item.price}</td>
              <td className="border border-gray-300 p-1">{item.location}</td>
              <td className="border border-gray-300 p-1 text-[7px] font-bold">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between mt-16 px-4">
        <div className="text-center">
          <p className="mb-12 font-bold">Verified and Check By:</p>
          <div className="border-t border-black w-48 mx-auto"></div>
        </div>
        <div className="text-center">
          <p className="mb-12 font-bold">Prepared By:</p>
          <div className="border-t border-black w-48 mx-auto"></div>
        </div>
      </div>
      <div className="text-right mt-8 text-[8px] text-gray-500">
        <p>Page: 1</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color, isAlert = false }: { label: string, value: string | number, color: string, isAlert?: boolean }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm border border-surface-container/50 flex flex-col items-center text-center gap-1">
      <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter leading-tight">{label}</span>
      <p className={cn("text-sm font-extrabold", color, isAlert && "animate-pulse")}>{value}</p>
    </div>
  );
}

function TotalIncomeReport({ searchQuery, onBack }: { searchQuery: string, onBack: () => void }) {
  const [startDate, setStartDate] = useState('04/04/2026');
  const [endDate, setEndDate] = useState('04/04/2026');
  const [selectedUser, setSelectedUser] = useState('All Users');

  const summaryData = {
    openingCash: 0,
    totalSalePayments: 0,
    otherIncome: 0,
    closingCash: 0
  };

  return (
    <div className="space-y-6">
      {/* Header & Description */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-container/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold font-headline tracking-tight">Total Income Report</h3>
            <p className="text-sm text-on-surface-variant">Income summary with opening and closing balance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton icon={<Logo containerClassName="w-4 h-4" />} label="Print" />
            <ExportButton icon={<BarChart3 className="w-4 h-4" />} label="Excel" />
            <ExportButton icon={<ReceiptText className="w-4 h-4" />} label="PDF" />
            <ExportButton icon={<LayoutGrid className="w-4 h-4" />} label="Word" />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-surface-container">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Start Date
            </label>
            <input 
              type="text" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-surface-container-low rounded-xl text-sm border-none focus:ring-2 focus:ring-primary/20 font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> End Date
            </label>
            <input 
              type="text" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 bg-surface-container-low rounded-xl text-sm border-none focus:ring-2 focus:ring-primary/20 font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> User
            </label>
            <select 
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-2 bg-surface-container-low rounded-xl text-sm border-none focus:ring-2 focus:ring-primary/20 font-medium appearance-none"
            >
              <option>All Users</option>
              <option>Admin</option>
              <option>Cashier 1</option>
            </select>
          </div>
        </div>

        {/* Quick Date Selectors */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {['Today', 'This Month', 'This Quarter', 'This Semester', 'This Year'].map(label => (
            <button key={label} className="px-3 py-2 bg-surface-container-low hover:bg-primary/10 hover:text-primary rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">
              {label}
            </button>
          ))}
          <button className="px-3 py-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-center">Clear</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Opening Cash" value={`$${summaryData.openingCash.toFixed(2)}`} icon={<Wallet className="w-5 h-5" />} color="bg-blue-50 text-blue-600" />
        <SummaryCard label="Total Sale Payments" value={`$${summaryData.totalSalePayments.toFixed(2)}`} icon={<TrendingUp className="w-5 h-5" />} color="bg-emerald-50 text-emerald-600" />
        <SummaryCard label="Other Income" value={`$${summaryData.otherIncome.toFixed(2)}`} icon={<DollarSign className="w-5 h-5" />} color="bg-amber-50 text-amber-600" />
        <SummaryCard label="Closing Cash" value={`$${summaryData.closingCash.toFixed(2)}`} icon={<BarChart3 className="w-5 h-5" />} color="bg-primary/10 text-primary" />
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-surface-container/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Description</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            <BreakdownRow label="Opening Cash" value={`$${summaryData.openingCash.toFixed(2)}`} />
            <tr className="bg-surface-container-low/30">
              <td colSpan={2} className="px-6 py-2 text-[10px] font-bold text-primary uppercase tracking-widest">Sale Payments</td>
            </tr>
            <BreakdownRow label="Total Sale Payments" value={`+$${summaryData.totalSalePayments.toFixed(2)}`} isPositive />
            <BreakdownRow label="Other Income" value={`+$${summaryData.otherIncome.toFixed(2)}`} isPositive />
            <tr className="bg-primary/5">
              <td className="px-6 py-4 text-sm font-bold text-on-surface">Closing Cash (Expected in Drawer)</td>
              <td className="px-6 py-4 text-sm font-extrabold text-primary text-right">$${summaryData.closingCash.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExportButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors text-on-surface-variant"
    >
      {icon}
      {label}
    </button>
  );
}

function SummaryCard({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 space-y-3">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-tight mb-1">{label}</p>
        <p className="text-xl font-extrabold text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function BreakdownRow({ label, value, isPositive }: { label: string, value: string, isPositive?: boolean }) {
  return (
    <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">{label}</td>
      <td className={cn(
        "px-6 py-4 text-sm font-bold text-right",
        isPositive ? "text-emerald-600" : "text-on-surface"
      )}>{value}</td>
    </tr>
  );
}

function SaleReportCard({ item }: { item: SaleReportItem }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 space-y-4 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ReceiptText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-primary">{item.invoiceNo}</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-on-surface-variant" />
              <span className="text-[10px] font-bold text-on-surface-variant">{item.date}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total</span>
          <p className="text-lg font-extrabold text-on-surface">{item.total}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-surface-container/50">
        <InfoItem icon={<Warehouse />} label="Warehouse" value={item.warehouse} />
        <InfoItem icon={<User />} label="Customer" value={item.customer} />
        <InfoItem icon={<LayoutGrid />} label="Table" value={item.table} />
        <InfoItem icon={<CreditCard />} label="Payment" value={item.payment} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-4">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Product</span>
            <p className="text-xs font-bold text-on-surface">{item.product}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Category</span>
            <p className="text-xs font-bold text-on-surface-variant">{item.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Qty</span>
            <p className="text-xs font-extrabold">{item.qty} {item.unit !== '-' ? item.unit : ''}</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Unit Price</span>
            <p className="text-xs font-extrabold text-primary">{item.price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductSoldCard({ item }: { item: ProductSoldReportItem }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 space-y-4 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-secondary uppercase">{item.code}</p>
            <h4 className="text-base font-bold text-on-surface leading-tight">{item.productName}</h4>
          </div>
        </div>
        <div className={cn(
          "px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1",
          item.status === 'IN STOCK' ? "bg-emerald-100 text-emerald-700" :
          item.status === 'LOW STOCK' ? "bg-amber-100 text-amber-700" :
          "bg-red-100 text-red-700"
        )}>
          <AlertCircle className="w-3 h-3" />
          {item.status}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-y border-surface-container/50">
        <InfoItem icon={<Tag />} label="Category" value={item.category} />
        <InfoItem icon={<Warehouse />} label="Location" value={item.location} />
        <InfoItem icon={<Package />} label="Unit" value={item.unit} />
        <InfoItem icon={<DollarSign />} label="Unit Price" value={item.price} />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
        <StatItem label="Opening" value={item.opening} />
        <StatItem label="Issued" value={item.issued} />
        <StatItem label="Returned" value={item.returned} prefix="+" color="text-emerald-600" />
        <StatItem label="Adjustment" value={item.adjustment} prefix="±" />
        <StatItem label="Sold" value={item.sold} color="text-red-500" />
        <StatItem label="Closing" value={item.closing} isHighlight />
      </div>

      <div className="pt-2 flex justify-end">
        <div className="text-right">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">Total Value</span>
          <p className="text-lg font-extrabold text-secondary">{item.totalValue}</p>
        </div>
      </div>
    </motion.div>
  );
}

function IncomeReportCard({ item }: { item: IncomeReportItem }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container/50 space-y-4 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-tertiary">{item.reference}</p>
            <h4 className="text-base font-bold text-on-surface leading-tight">{item.category}</h4>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Amount</span>
          <p className="text-lg font-extrabold text-tertiary">{item.amount}</p>
        </div>
      </div>

      <p className="text-sm text-on-surface-variant">{item.description}</p>

      <div className="flex items-center justify-between pt-2 border-t border-surface-container/50">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3 text-on-surface-variant" />
          <span className="text-[10px] font-bold text-on-surface-variant">{item.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-3 h-3 text-on-surface-variant" />
          <span className="text-[10px] font-bold text-on-surface-variant">{item.paymentMethod}</span>
        </div>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <div className="text-on-surface-variant">
          {React.cloneElement(icon as React.ReactElement, { className: "w-3 h-3" })}
        </div>
        <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-xs font-bold text-on-surface truncate">{value}</p>
    </div>
  );
}

function StatItem({ label, value, prefix = "", color = "text-on-surface", isHighlight = false }: { label: string, value: number, prefix?: string, color?: string, isHighlight?: boolean }) {
  return (
    <div className={cn(
      "p-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5",
      isHighlight ? "bg-secondary text-white" : "bg-surface-container-low"
    )}>
      <span className={cn(
        "text-[7px] font-bold uppercase tracking-tighter",
        isHighlight ? "text-white/70" : "text-on-surface-variant"
      )}>{label}</span>
      <span className={cn(
        "text-[10px] font-extrabold",
        isHighlight ? "text-white" : color
      )}>
        {prefix}{value}
      </span>
    </div>
  );
}
