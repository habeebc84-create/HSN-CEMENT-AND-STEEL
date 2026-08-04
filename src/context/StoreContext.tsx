import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Brand, NotificationItem, SiteContent, Order, ToastMessage, Banner, DeliveryLocation, Feedback } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS, INITIAL_NOTIFICATIONS, INITIAL_SITE_CONTENT, INITIAL_ORDERS, INITIAL_BANNERS } from '../data/seedData';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  notifications: NotificationItem[];
  siteContent: SiteContent;
  orders: Order[];
  banners: Banner[];
  cart: { product: Product; quantity: number; selectedSize?: string }[];
  isAdmin: boolean;
  isAuthLoading: boolean;
  toasts: ToastMessage[];
  
  // Actions
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  
  // Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  
  // Categories & Brands
  addCategory: (c: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBrand: (brand: Omit<Brand, 'id'>) => void;
  deleteBrand: (id: string) => void;
  
  // Orders Pipeline
  updateOrderStatus: (id: string, status: Order['orderStatus']) => void;
  deleteOrder: (id: string) => void;
  
  // Notifications
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  updateNotification: (id: string, notification: Partial<NotificationItem>) => void;
  deleteNotification: (id: string) => void;
  
  // Banners
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
  toggleBannerStatus: (id: string) => void;
  
  // Site Content
  updateSiteContent: (content: Partial<SiteContent>) => void;
  
  // Cart
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  
  // Order Placement
  placeOrder: (customerDetails: { name: string; mobile: string; address: string; landmark: string }, paymentMethod: 'Cash on Delivery' | 'Online Payment (UPI)', notes?: string, deliveryLocation?: string, deliveryCharge?: number, loadingCharge?: number) => Order;
  
  showToast: (msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  cartCount: number;
  cartTotal: number;
  customers: { mobileNumber: string; name: string; address: string; totalOrders: number; totalSpent: number; lastOrderDate: string; orders: Order[] }[];
  
  // Delivery Zones
  deliveryLocations: DeliveryLocation[];
  updateDeliveryLocations: (locations: DeliveryLocation[]) => void;
  
  // Feedback
  feedbacks: Feedback[];
  submitFeedback: (message: string) => void;
  deleteFeedback: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_DELIVERY_LOCATIONS: DeliveryLocation[] = [
  { name: 'Kalikiri Yard (Self Pick-up)', charge: 0 },
  { name: 'Kalikiri (Within Town)', charge: 500 },
  { name: 'Pileru', charge: 1000 },
  { name: 'Vayalpadu', charge: 1200 },
  { name: 'Valmikipuram', charge: 1500 },
  { name: 'Gurramkonda', charge: 1800 },
  { name: 'Madanapalle', charge: 2000 }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`localStorage save warning for ${key}:`, err);
    }
  };

  const [products, setProducts] = useState<Product[]>(() => getStored('windows_h_products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState<Category[]>(() => getStored('windows_h_categories', INITIAL_CATEGORIES));
  const [brands, setBrands] = useState<Brand[]>(() => getStored('windows_h_brands', INITIAL_BRANDS));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getStored('windows_h_notifications', INITIAL_NOTIFICATIONS));
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const stored = getStored<SiteContent>('windows_h_siteContent', INITIAL_SITE_CONTENT);
    return {
      ...INITIAL_SITE_CONTENT,
      ...stored
    };
  });
  const [orders, setOrders] = useState<Order[]>(() => getStored('windows_h_orders', INITIAL_ORDERS));
  const [banners, setBanners] = useState<Banner[]>(() => getStored('windows_h_banners', INITIAL_BANNERS));
  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedSize?: string }[]>(() => getStored('windows_h_cart', []));
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocation[]>(() => 
    getStored('windows_h_delivery_locations', DEFAULT_DELIVERY_LOCATIONS)
  );
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => getStored('windows_h_feedbacks', []));

  useEffect(() => { setStored('windows_h_products', products); }, [products]);
  useEffect(() => { setStored('windows_h_categories', categories); }, [categories]);
  useEffect(() => { setStored('windows_h_brands', brands); }, [brands]);
  useEffect(() => { setStored('windows_h_notifications', notifications); }, [notifications]);
  useEffect(() => { setStored('windows_h_siteContent', siteContent); }, [siteContent]);
  useEffect(() => { setStored('windows_h_orders', orders); }, [orders]);
  useEffect(() => { setStored('windows_h_banners', banners); }, [banners]);
  useEffect(() => { setStored('windows_h_cart', cart); }, [cart]);
  useEffect(() => { setStored('windows_h_delivery_locations', deliveryLocations); }, [deliveryLocations]);
  useEffect(() => { setStored('windows_h_feedbacks', feedbacks); }, [feedbacks]);

  // Local Auth Session Listener
  useEffect(() => {
    // FIX old localStorage holding WINDOWS H
    setSiteContent(prev => {
      if (prev.aboutStory?.includes('WINDOWS H') || prev.businessName?.includes('WINDOWS H')) {
        const updated = { 
          ...prev, 
          aboutStory: prev.aboutStory.replace(/WINDOWS H/g, 'HSN CEMENT AND STEEL'),
          businessName: prev.businessName.replace(/WINDOWS H/g, 'HSN CEMENT AND STEEL')
        };
        localStorage.setItem('windows_h_siteContent', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });

    const isLogged = localStorage.getItem('isAdminSessionActive') === 'true';
    if (isLogged) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsAuthLoading(false);
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message: msg, type }]);
    
    // Auto-dismiss after 2.5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    // Development Bypass for quick access without Firebase configured
    const devPass = localStorage.getItem('admin_dev_password') || 'admin123';
    if (email === import.meta.env.VITE_ADMIN_EMAIL && pass === devPass) {
      setIsAdmin(true);
      localStorage.setItem('isAdminSessionActive', 'true');
      showToast('Admin Authenticated successfully');
      return true;
    }
    showToast('Authentication failed. Invalid email or password.', 'error');
    return false;
  };

  const logoutAdmin = async () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdminSessionActive');
    showToast('Logged out of Admin Portal');
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const activePassword = localStorage.getItem('admin_dev_password') || 'admin123';
      if (currentPassword !== activePassword) {
        showToast('Incorrect previous password.', 'error');
        return false;
      }
      localStorage.setItem('admin_dev_password', newPassword);
      showToast('Password updated successfully!');
      return true;
    } catch (error: any) {
      console.error(error);
      showToast('Failed to update password.', 'error');
      return false;
    }
  };

  // Product CRUD
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...p, id: `p-${Date.now()}` };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added product "${p.name}"`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed');
  };

  const toggleProductStatus = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
    showToast('Product status updated');
  };

  // Category & Brand CRUD
  const addCategory = (c: Omit<Category, 'id'>) => {
    const newCat: Category = { ...c, id: `cat-${Date.now()}` };
    setCategories(prev => [...prev, newCat]);
    showToast(`Added category "${c.name}"`);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    showToast('Category updated successfully');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category removed');
  };

  const addBrand = (b: Omit<Brand, 'id'>) => {
    const newBrand: Brand = { ...b, id: `brand-${Date.now()}` };
    setBrands(prev => [...prev, newBrand]);
    showToast(`Added brand "${b.name}"`);
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
    showToast('Brand removed');
  };

  // Orders Pipeline
  const updateOrderStatus = (id: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, orderStatus: status } : o));
    showToast(`Order #${id} status updated to ${status}`);
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast(`Order #${id} removed`);
  };

  // Notifications CRUD
  const addNotification = (n: Omit<NotificationItem, 'id' | 'createdAt'>) => {
    const newNotif: NotificationItem = {
      ...n,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast('Notification published');
  };

  const updateNotification = (id: string, updated: Partial<NotificationItem>) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, ...updated } : n));
    showToast('Notification updated');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('Notification removed');
  };

  // Banners CRUD
  const addBanner = (b: Omit<Banner, 'id'>) => {
    if (banners.length >= 5) {
      showToast('Maximum 5 banners allowed. Delete one first.', 'error');
      return;
    }
    const newBanner: Banner = { ...b, id: `banner-${Date.now()}` };
    setBanners(prev => [...prev, newBanner]);
    showToast('Banner added');
  };

  const updateBanner = (id: string, updated: Partial<Banner>) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updated } : b));
    showToast('Banner updated');
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    showToast('Banner removed');
  };

  const toggleBannerStatus = (id: string) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
    showToast('Banner status updated');
  };

  // Site Content
  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...content }));
    showToast('Site content updated');
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === selectedSize);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedSize }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Placement
  const placeOrder = (
    customerDetails: { name: string; mobile: string; address: string; landmark: string },
    paymentMethod: 'Cash on Delivery' | 'Online Payment (UPI)',
    notes?: string,
    deliveryLocation?: string,
    deliveryCharge?: number,
    loadingCharge?: number
  ): Order => {
    const items = cart.map(item => {
      let unitPrice = item.product.price;
      if (item.selectedSize && item.product.sizes) {
        const sizeObj = item.product.sizes.find(s => s.size === item.selectedSize);
        if (sizeObj) unitPrice = sizeObj.price;
      }
      return {
        product: item.product,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        unitPrice,
        totalPrice: unitPrice * item.quantity
      };
    });

    const baseAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = baseAmount + (deliveryCharge || 0) + (loadingCharge || 0);

    const newOrder: Order = {
      id: `HSN Cement & Steel-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerDetails.name,
      mobileNumber: customerDetails.mobile,
      deliveryAddress: customerDetails.address,
      landmark: customerDetails.landmark,
      notes,
      items,
      totalQuantity,
      totalAmount,
      deliveryLocation,
      deliveryCharge,
      loadingCharge,
      paymentMethod,
      paymentStatus: paymentMethod === 'Online Payment (UPI)' ? 'Paid' : 'Pending',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: 'Same-day or next morning (Kalikiri zone)'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('Order placed successfully!');
    return newOrder;
  };

  // Derived Customers List from Orders
  const customersMap = new Map<string, { mobileNumber: string; name: string; address: string; totalOrders: number; totalSpent: number; lastOrderDate: string; orders: Order[] }>();
  orders.forEach(o => {
    const existing = customersMap.get(o.mobileNumber);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += o.totalAmount;
      existing.orders.push(o);
      if (o.createdAt > existing.lastOrderDate) existing.lastOrderDate = o.createdAt;
    } else {
      customersMap.set(o.mobileNumber, {
        mobileNumber: o.mobileNumber,
        name: o.customerName,
        address: o.deliveryAddress,
        totalOrders: 1,
        totalSpent: o.totalAmount,
        lastOrderDate: o.createdAt,
        orders: [o]
      });
    }
  });
  const customers = Array.from(customersMap.values());

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    let unitPrice = item.product.price;
    if (item.selectedSize && item.product.sizes) {
      const sizeObj = item.product.sizes.find(s => s.size === item.selectedSize);
      if (sizeObj) unitPrice = sizeObj.price;
    }
    return sum + (unitPrice * item.quantity);
  }, 0);

  const updateDeliveryLocations = (locations: DeliveryLocation[]) => {
    setDeliveryLocations(locations);
  };

  const submitFeedback = (message: string) => {
    const newFeedback: Feedback = {
      id: `fb-${Date.now()}`,
      message,
      createdAt: new Date().toISOString()
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
    showToast('Feedback submitted successfully. Thank you!');
  };

  const deleteFeedback = (id: string) => {
    setFeedbacks(prev => prev.filter(fb => fb.id !== id));
    showToast('Feedback deleted');
  };

  return (
    <StoreContext.Provider value={{
      products, categories, brands, notifications, siteContent, orders, banners, cart, isAdmin, isAuthLoading, toasts,
      loginWithEmail, logoutAdmin, changeAdminPassword,
      addProduct, updateProduct, deleteProduct, toggleProductStatus,
      addCategory, updateCategory, deleteCategory, addBrand, deleteBrand, updateOrderStatus, deleteOrder,
      addNotification, updateNotification, deleteNotification,
      addBanner, updateBanner, deleteBanner, toggleBannerStatus,
      updateSiteContent, addToCart, removeFromCart, updateCartQuantity, clearCart,
      placeOrder, showToast, cartCount, cartTotal, customers,
      deliveryLocations, updateDeliveryLocations,
      feedbacks, submitFeedback, deleteFeedback
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
