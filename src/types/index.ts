export interface ProductSize {
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  type?: 'cement' | 'steel' | 'wire' | 'nails' | 'general';
  grade?: string; // e.g., OPC 53, PPC, Fe 550D
  sizes?: ProductSize[]; // for products with size variations like steel, nails
  selectedSize?: string;
  featured?: boolean;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon?: string;
  description?: string;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  active: boolean;
  linkUrl?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  categories: string[];
}

export interface CartItem {
  product: Product;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Out For Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  mobileNumber: string;
  deliveryAddress: string;
  landmark: string;
  mapLocation?: string;
  notes?: string;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  deliveryLocation?: string;
  deliveryCharge?: number;
  loadingCharge?: number;
  paymentMethod: 'Cash on Delivery' | 'Online Payment (UPI)';
  paymentStatus: 'Pending' | 'Paid';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Customer {
  mobileNumber: string;
  name: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  orders: Order[];
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: 'banner' | 'popup' | 'scrolling';
  active: boolean;
  createdAt: string;
  dateBadge?: string;
}

export interface SiteContent {
  businessName: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  splashImage?: string;
  heroImage?: string;
  logoUrl?: string;
  address: string;
  locationDetails: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  businessHours: string;
  googleMapsEmbed: string;
  aboutStory: string;
  aboutExperience: string;
  services: { id: string; title: string; desc: string; icon: string }[];
  galleryImages: { id: string; url: string; title: string; category: string }[];
  maintenanceMode?: boolean;
  maintenanceEndTime?: string;
  maintenanceAccessCode?: string;
  adminPhoto?: string;
  termsAndConditions?: { title: string; content: string }[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface DeliveryLocation {
  name: string;
  charge: number;
}

export interface Feedback {
  id: string;
  message: string;
  createdAt: string;
}
