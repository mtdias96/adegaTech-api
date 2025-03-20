export interface Category {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  adegaId: string;
}

export interface Product {
  category: Category;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  // Outras propriedades do pedido, se houver
  items: OrderItem[];
}
