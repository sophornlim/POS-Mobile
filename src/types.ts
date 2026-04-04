export type TableStatus = 'available' | 'occupied' | 'reserved' | 'inactive';

export interface TableCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  timeOccupied?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount?: number;
  image?: string;
  icon: string;
  popular?: boolean;
  color?: string;
}

export interface Product {
  id: string;
  code?: string;
  name: string;
  nameKh?: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subCategory?: string;
  isVegetarian?: boolean;
  unit?: string;
  ingredients?: string[];
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  image?: string;
}

export interface OrderItem extends Product {
  quantity: number;
  notes?: string;
}
