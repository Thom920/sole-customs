export interface OrderItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
  itemCount: number;
  total: number;
}
