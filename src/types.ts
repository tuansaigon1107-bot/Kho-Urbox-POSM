export interface Product {
  id: string;
  name: string;
  code: string;
  dimensions: string;
  quantity: number;
  position: string;
  notes: string;
  image?: string; // Icon or SVG identifier
  imageColor?: string; // Optional custom color for the placeholder
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'admin' | 'staff' | 'viewer';
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  type: 'import' | 'export' | 'update';
  quantityChange: number; // positive for import, negative for export
  prevQuantity: number;
  newQuantity: number;
  timestamp: string; // ISO String
  user: string; // Tên hiển thị người dùng
  notes: string;
}
