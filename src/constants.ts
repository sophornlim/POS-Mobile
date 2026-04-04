import { Table, TableCategory, Category, Product, SubCategory } from './types';

export const TABLE_CATEGORIES: TableCategory[] = [
  { id: 'all', name: 'All' },
  { id: 'vip', name: 'VIP' },
  { id: 'terrest', name: 'Terrest' },
  { id: 'floor-b', name: 'Floor B' },
  { id: 'airecorn-a', name: 'Airecorn A' },
  { id: 'floor-a', name: 'Floor A' },
  { id: 'floor-d', name: 'Floor D' },
  { id: 'floor-c', name: 'Floor C' },
];

export const TABLES: Table[] = [
  { id: '1', number: '01', capacity: 4, status: 'available', categoryId: 'floor-a' },
  { id: '2', number: '02', capacity: 2, status: 'occupied', timeOccupied: '34M DEEP', categoryId: 'floor-a' },
  { id: '3', number: '03', capacity: 6, status: 'available', categoryId: 'floor-b' },
  { id: '4', number: '04', capacity: 2, status: 'occupied', timeOccupied: '12M DEEP', categoryId: 'floor-b' },
  { id: '5', number: '05', capacity: 4, status: 'available', categoryId: 'terrest' },
  { id: '6', number: '06', capacity: 8, status: 'available', categoryId: 'vip' },
  { id: '7', number: '07', capacity: 4, status: 'reserved', categoryId: 'airecorn-a' },
  { id: '8', number: '08', capacity: 2, status: 'inactive', categoryId: 'floor-c' },
  { id: '9', number: '09', capacity: 4, status: 'available', categoryId: 'floor-d' },
  { id: '10', number: '10', capacity: 4, status: 'available', categoryId: 'airecorn-a' },
];

export const CATEGORIES: Category[] = [
  { 
    id: 'frappes', 
    name: 'Frappes', 
    description: 'Ice Blended Drinks', 
    icon: 'ice-cream', 
    popular: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'coffee-chocolate', 
    name: 'Coffee & Chocolate', 
    description: 'Hot & Iced Brews', 
    icon: 'coffee', 
    popular: true,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
  },
  { id: 'smoothie', name: 'Smoothie', description: 'Fresh Fruit Blends', icon: 'cup-soda', color: 'tertiary' },
  { id: 'salad-appetizer', name: 'Salad & Appetizer', description: 'Fresh & Healthy', icon: 'utensils-cross-lines', color: 'tertiary' },
  { id: 'beer', name: 'Beer', description: 'Cold Drafts & Bottles', icon: 'cup-soda', color: 'primary' },
  { id: 'desert', name: 'Desert', description: 'Sweet Treats', icon: 'croissant', color: 'primary' },
  { id: 'vegetarian', name: 'Vegeterian', description: 'Plant-Based Meals', icon: 'utensils-cross-lines', color: 'tertiary' },
  { id: 'main', name: 'Main Course', description: 'Hearty Meals', icon: 'utensils-cross-lines', color: 'primary' },
  { id: 'light', name: 'Light Fare', description: 'Sandwiches & Wraps', icon: 'croissant', color: 'tertiary' },
];

export const SUB_CATEGORIES: SubCategory[] = [
  // SALAD & APPETIZER
  { id: 's1', name: 'Aovocado & Asparagus Salad', description: 'Mixed Green Lettuce Served with Pistachio Dressing', categoryId: 'salad-appetizer' },
  { id: 's2', name: 'Pomelo Salad with Poached River Shrimps & Smoked Fish', description: 'Local Herb', categoryId: 'salad-appetizer' },
  { id: 's3', name: 'Water Lily with Sauteed River Shrimp & Chicken', description: 'Carrot, Onion, Bell pepper & Local Herb', categoryId: 'salad-appetizer' },
  { id: 's4', name: 'Beef Salad with Long Bean', description: 'Dried Shrimps and Local Herbs', categoryId: 'salad-appetizer' },
  { id: 's5', name: 'Neary Khmer Salad', description: 'Shrimps, Tomato, Mixed Salad with Thousand Island Dressing', categoryId: 'salad-appetizer' },
  { id: 's6', name: 'LOtus Stem Salad with Chicken or Shrimps', description: 'Deep-fried Shallot, Herb and Sweet & Sour Sauce', categoryId: 'salad-appetizer' },
  { id: 's7', name: 'Khmer Mam Chov Pos Tann', description: 'Deep-fried Pork Belly, Boiled Intestine & Fish Paste Served with Fresh Vegetables', categoryId: 'salad-appetizer' },
  { id: 's8', name: 'Caesar Salad', description: 'Romain Lettuce, Bread Crouton, Bacon, Grilled Chicken and Parmesan Cheese', categoryId: 'salad-appetizer' },
  { id: 's9', name: 'Banana Blossom Salad with Chicken, Pork or Beef', description: 'Peanut, Herb, Sweet & Sour Sauce', categoryId: 'salad-appetizer' },
  { id: 's10', name: 'Fish Salad with Bitter Gourd', description: 'Peanut, Coconut Cream, Herb, Served with Khmer Dressing', categoryId: 'salad-appetizer' },
  { id: 's11', name: 'Mango Salad with Smoked Fish', description: 'Carrot, Peanut, and Khmer Chili Dressing', categoryId: 'salad-appetizer' },
  
  // FRAPPES
  { id: 's12', name: 'Coffee Frappe', description: 'Coffee Frappe Group', categoryId: 'frappes' },
  { id: 's13', name: 'Blueberry Frappe', description: 'Blueberry Frappe Group', categoryId: 'frappes' },
  { id: 's14', name: 'Chocolate Frappe', description: 'Chocolate Frappe', categoryId: 'frappes' },
  { id: 's15', name: 'Strawberry Frappe', description: 'Frappe Group', categoryId: 'frappes' },
  { id: 's16', name: 'Green Tea Frappe', description: 'Frappe Group', categoryId: 'frappes' },
  
  // COFFEE & CHOCOLATE
  { id: 's17', name: 'Americano', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's18', name: 'Caramel Cappuccino', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's19', name: 'Hot Chocolate', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's20', name: 'Cafe Latte', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's21', name: 'Cappuccino', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's22', name: 'Black Coffee', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's23', name: 'Espresso', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's24', name: 'Ice Caramel Cappuccino', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's25', name: 'Ice Cappuccino', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's26', name: 'Ice Coffee with Milk', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's27', name: 'Ice Latte', description: 'Coffee and Chocolate Group', categoryId: 'coffee-chocolate' },
  { id: 's28', name: 'Ice Espresso', description: 'Coffe & Chocolate Group', categoryId: 'coffee-chocolate' },
  
  // SMOOTHIE
  { id: 's29', name: 'Musk Melon Shake', description: 'Smoothie Shake', categoryId: 'smoothie' },
  { id: 's30', name: 'Watermelon Shake', description: 'Smoothie Shake', categoryId: 'smoothie' },
  { id: 's31', name: 'Mint Leaf Shake', description: 'Smoothie Shake', categoryId: 'smoothie' },
  { id: 's32', name: 'Fruits Punch', description: 'Smoothie Shake', categoryId: 'smoothie' },
  { id: 's33', name: 'Passion Shake', description: 'Smoothie Shake', categoryId: 'smoothie' },
  { id: 's34', name: 'Cashew nut Shake', description: 'Smoothie Shake', categoryId: 'smoothie' },
  { id: 's35', name: 'Coconut Shake', description: 'Smoothie Group', categoryId: 'smoothie' },
  { id: 's36', name: 'Carrot Shake', description: 'Smoothie Group', categoryId: 'smoothie' },
  { id: 's37', name: 'Banana Shake', description: 'Smoothie Group', categoryId: 'smoothie' },
  { id: 's38', name: 'Avocado Shake', description: 'Sweet mail and ice', categoryId: 'smoothie' },
  { id: 's39', name: 'Fruits Shake', description: 'Local Fresh Fruits, Sweet mail and ice', categoryId: 'smoothie' },
  { id: 's40', name: 'Mango Shake', description: 'Sugar, Ice, Sweet mail', categoryId: 'smoothie' },
  
  // BEER
  { id: 's41', name: 'Angkor (st)', description: 'Khmer Beer', categoryId: 'beer' },
];

export const PRODUCTS: Product[] = [
  // SALAD & APPETIZER
  { id: 'p1', name: 'Aovocado & Asparagus Salad', description: 'Mixed Green Lettuce Served with Pistachio Dressing', price: 12.50, category: 'salad-appetizer', subCategory: 's1', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', name: 'Pomelo Salad with Poached River Shrimps & Smoked Fish', description: 'Local Herb', price: 15.00, category: 'salad-appetizer', subCategory: 's2', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', name: 'Water Lily with Sauteed River Shrimp & Chicken', description: 'Carrot, Onion, Bell pepper & Local Herb', price: 13.50, category: 'salad-appetizer', subCategory: 's3', image: 'https://images.unsplash.com/photo-1547592110-803653f54358?auto=format&fit=crop&q=80&w=800' },
  { id: 'p4', name: 'Beef Salad with Long Bean', description: 'Dried Shrimps and Local Herbs', price: 14.00, category: 'salad-appetizer', subCategory: 's4', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
  { id: 'p5', name: 'Neary Khmer Salad', description: 'Shrimps, Tomato, Mixed Salad with Thousand Island Dressing', price: 11.50, category: 'salad-appetizer', subCategory: 's5', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', name: 'LOtus Stem Salad with Chicken or Shrimps', description: 'Deep-fried Shallot, Herb and Sweet & Sour Sauce', price: 12.00, category: 'salad-appetizer', subCategory: 's6', image: 'https://images.unsplash.com/photo-1547592110-803653f54358?auto=format&fit=crop&q=80&w=800' },
  { id: 'p7', name: 'Khmer Mam Chov Pos Tann', description: 'Deep-fried Pork Belly, Boiled Intestine & Fish Paste Served with Fresh Vegetables', price: 16.50, category: 'salad-appetizer', subCategory: 's7', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
  { id: 'p8', name: 'Caesar Salad', description: 'Romain Lettuce, Bread Crouton, Bacon, Grilled Chicken and Parmesan Cheese', price: 13.00, category: 'salad-appetizer', subCategory: 's8', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800' },
  { id: 'p9', name: 'Banana Blossom Salad with Chicken, Pork or Beef', description: 'Peanut, Herb, Sweet & Sour Sauce', price: 12.50, category: 'salad-appetizer', subCategory: 's9', image: 'https://images.unsplash.com/photo-1547592110-803653f54358?auto=format&fit=crop&q=80&w=800' },
  { id: 'p10', name: 'Fish Salad with Bitter Gourd', description: 'Peanut, Coconut Cream, Herb, Served with Khmer Dressing', price: 14.50, category: 'salad-appetizer', subCategory: 's10', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
  { id: 'p11', name: 'Mango Salad with Smoked Fish', description: 'Carrot, Peanut, and Khmer Chili Dressing', price: 11.00, category: 'salad-appetizer', subCategory: 's11', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800' },

  // FRAPPES
  { id: 'p12', name: 'Coffee Frappe', description: 'Rich coffee blended with ice', price: 4.50, category: 'frappes', subCategory: 's12', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },
  { id: 'p13', name: 'Blueberry Frappe', description: 'Fresh blueberries blended with ice', price: 4.75, category: 'frappes', subCategory: 's13', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },
  { id: 'p14', name: 'Chocolate Frappe', description: 'Creamy chocolate blended with ice', price: 4.50, category: 'frappes', subCategory: 's14', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },
  { id: 'p15', name: 'Strawberry Frappe', description: 'Sweet strawberries blended with ice', price: 4.75, category: 'frappes', subCategory: 's15', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },
  { id: 'p16', name: 'Green Tea Frappe', description: 'Premium matcha blended with ice', price: 5.00, category: 'frappes', subCategory: 's16', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },

  // COFFEE & CHOCOLATE
  { id: 'p17', name: 'Americano', description: 'Espresso with hot water', price: 3.00, category: 'coffee-chocolate', subCategory: 's17', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p18', name: 'Caramel Cappuccino', description: 'Espresso with steamed milk and caramel', price: 4.25, category: 'coffee-chocolate', subCategory: 's18', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p19', name: 'Hot Chocolate', description: 'Rich cocoa with steamed milk', price: 3.75, category: 'coffee-chocolate', subCategory: 's19', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p20', name: 'Cafe Latte', description: 'Espresso with steamed milk', price: 3.75, category: 'coffee-chocolate', subCategory: 's20', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p21', name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 3.75, category: 'coffee-chocolate', subCategory: 's21', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p22', name: 'Black Coffee', description: 'Pure brewed coffee', price: 2.50, category: 'coffee-chocolate', subCategory: 's22', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p23', name: 'Espresso', description: 'Concentrated coffee shot', price: 2.50, category: 'coffee-chocolate', subCategory: 's23', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p24', name: 'Ice Caramel Cappuccino', description: 'Iced espresso with caramel', price: 4.50, category: 'coffee-chocolate', subCategory: 's24', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p25', code: 'icc', name: 'Ice Cappuccino', nameKh: 'អាយកាប៉ូជីណី', description: 'Iced espresso with milk foam', price: 2.00, category: 'coffee-chocolate', subCategory: 's25', unit: 'Cup', ingredients: ['Milk (0.04g)', 'Sugar (0.03g)', 'Coffee (0.06g)'], image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p26', name: 'Ice Coffee with Milk', description: 'Iced coffee with condensed milk', price: 3.50, category: 'coffee-chocolate', subCategory: 's26', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p27', name: 'Ice Latte', description: 'Iced espresso with milk', price: 4.00, category: 'coffee-chocolate', subCategory: 's27', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
  { id: 'p28', code: 'IE01', name: 'Ice Espresso', nameKh: 'កាហ្វអេចប្រេស៊ូ', description: 'Iced concentrated coffee shot', price: 2.00, category: 'coffee-chocolate', subCategory: 's28', unit: 'Glass', ingredients: ['Ice (0.01g)', 'Sugar (0.01g)', 'Coffee (0.02g)'], image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },

  // SMOOTHIE
  { id: 'p29', name: 'Musk Melon Shake', description: 'Fresh musk melon blended with ice', price: 4.50, category: 'smoothie', subCategory: 's29', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p30', name: 'Watermelon Shake', description: 'Fresh watermelon blended with ice', price: 4.00, category: 'smoothie', subCategory: 's30', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p31', name: 'Mint Leaf Shake', description: 'Fresh mint blended with ice', price: 4.00, category: 'smoothie', subCategory: 's31', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p32', name: 'Fruits Punch', description: 'Mixed fruits blended with ice', price: 4.75, category: 'smoothie', subCategory: 's32', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p33', name: 'Passion Shake', description: 'Fresh passion fruit blended with ice', price: 4.50, category: 'smoothie', subCategory: 's33', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p34', name: 'Cashew nut Shake', description: 'Roasted cashews blended with ice', price: 5.00, category: 'smoothie', subCategory: 's34', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p35', name: 'Coconut Shake', description: 'Fresh coconut blended with ice', price: 4.50, category: 'smoothie', subCategory: 's35', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p36', name: 'Carrot Shake', description: 'Fresh carrots blended with ice', price: 4.00, category: 'smoothie', subCategory: 's36', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p37', name: 'Banana Shake', description: 'Fresh bananas blended with ice', price: 4.00, category: 'smoothie', subCategory: 's37', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p38', name: 'Avocado Shake', description: 'Fresh avocado blended with ice', price: 5.00, category: 'smoothie', subCategory: 's38', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p39', name: 'Fruits Shake', description: 'Seasonal fruits blended with ice', price: 4.75, category: 'smoothie', subCategory: 's39', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
  { id: 'p40', name: 'Mango Shake', description: 'Fresh mango blended with ice', price: 4.50, category: 'smoothie', subCategory: 's40', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },

  // BEER
  { id: 'p41', name: 'Angkor (st)', description: 'Classic Cambodian beer', price: 2.50, category: 'beer', subCategory: 's41', image: 'https://images.unsplash.com/photo-1523371054106-bbf80582c28f?auto=format&fit=crop&q=80&w=800' },
];
