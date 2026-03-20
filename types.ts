export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  stock: number;
  isNew?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type Category = "All" | "Laptops" | "Audio" | "Wearables" | "Smart Home";

export interface CartItem extends Product {
  quantity: number;
}

export enum View {
  HOME = "home",
  CHECKOUT = "checkout",
  CONFIRMATION = "confirmation",
  PRODUCT_DETAIL = "product_detail",
  TRACK_ORDER = "track_order",
  HELP_CENTER = "help_center",
}

export enum OrderStatus {
  PLACED = "Order Placed",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  email: string;
}

export type SortOption = "recommended" | "price_asc" | "price_desc" | "rating";

export enum CheckoutStep {
  INFO = 1,
  SHIPPING = 2,
  PAYMENT = 3,
}
