import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { 
  LayoutDashboard, Package, Tag, ShoppingCart, Users, 
  LogOut, Save, ShieldCheck,
  TrendingUp, BarChart3, PieChart, Activity, CheckCircle2, ArrowUpRight,
  Plus, Edit, Trash2, Download, Check, Image as ImageIcon, Upload,
  Lock, Key, Eye, EyeOff, Bell, Truck, FileText
} from 'lucide-react';
import { exportOrdersToCSV, exportSalesReportPDF } from '../utils/exportUtils';

export const AdminDashboard: React.FC = () => {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, updateCategory, deleteCategory,
    orders, updateOrderStatus, deleteOrder,
    customers,
    notifications, addNotification, updateNotification, deleteNotification,
    siteContent, updateSiteContent, banners, addBanner, deleteBanner, toggleBannerStatus,
    logoutAdmin, showToast, changeAdminPassword,
    deliveryLocations, updateDeliveryLocations, feedbacks, deleteFeedback
  } = useStore();

  const handleMaintenanceToggle = (checked: boolean) => {
    if (checked) {
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      updateSiteContent({ maintenanceMode: true, maintenanceAccessCode: accessCode });
      showToast('Maintenance Mode Enabled. Access code generated.');
    } else {
      updateSiteContent({ maintenanceMode: false, maintenanceAccessCode: '', maintenanceEndTime: '' });
      showToast('Maintenance Mode Disabled.');
    }
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'products' | 'categories' | 'orders' | 'customers' | 'content' | 'security' | 'notifications' | 'transport' | 'terms'>('overview');

  // Terms & Conditions state
  const [termsItems, setTermsItems] = useState<{ title: string; content: string }[]>(
    siteContent.termsAndConditions || []
  );
  const [newTermTitle, setNewTermTitle] = useState('');
  const [newTermContent, setNewTermContent] = useState('');

  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previousPassword) {
      showToast('Previous password is required.', 'error');
      return;
    }
    if (!newPassword) {
      showToast('Password cannot be empty.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsChangingPass(true);
    const success = await changeAdminPassword(previousPassword, newPassword);
    setIsChangingPass(false);
    if (success) {
      setPreviousPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', category: '', brand: '', description: '', image: '', price: 0, stock: 0, type: 'general', enabled: true
  });

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm(prod);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.category || !productForm.price) {
      showToast('Name, Category, and Price are required.', 'error');
      return;
    }
    
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...editingProduct, ...productForm });
      showToast('Product updated successfully!');
    } else {
      addProduct({
        ...productForm,
        id: `prod-${Date.now()}`,
        enabled: productForm.enabled !== false
      } as Product);
      showToast('New product added successfully!');
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductForm({ name: '', category: '', brand: '', description: '', image: '', price: 0, stock: 0, type: 'general', enabled: true });
  };

  // Notification Management States
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any>(null);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    content: '',
    type: 'banner' as 'banner' | 'popup' | 'scrolling',
    active: true
  });

  const handleSaveNotification = () => {
    if (!notificationForm.title || !notificationForm.content) {
      showToast('Title and Content are required.', 'error');
      return;
    }

    if (editingNotification) {
      updateNotification(editingNotification.id, notificationForm);
      showToast('Notification updated successfully!');
    } else {
      addNotification(notificationForm);
      showToast('Notification created successfully!');
    }
    setIsNotificationModalOpen(false);
    setEditingNotification(null);
    setNotificationForm({ title: '', content: '', type: 'banner', active: true });
  };

  // Delivery Zones / Shipping Prices States
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneCharge, setNewZoneCharge] = useState<number>(0);
  const [editingZoneIndex, setEditingZoneIndex] = useState<number | null>(null);
  const [editingZoneName, setEditingZoneName] = useState('');
  const [editingZoneCharge, setEditingZoneCharge] = useState<number>(0);

  const handleAddZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName) {
      showToast('Destination Name is required.', 'error');
      return;
    }
    const alreadyExists = deliveryLocations.some(
      l => l.name.toLowerCase() === newZoneName.toLowerCase()
    );
    if (alreadyExists) {
      showToast('A transport zone with this name already exists.', 'error');
      return;
    }
    const updated = [...deliveryLocations, { name: newZoneName, charge: newZoneCharge }];
    updateDeliveryLocations(updated);
    setNewZoneName('');
    setNewZoneCharge(0);
    showToast('New delivery zone added!');
  };

  const handleUpdateZone = (index: number) => {
    if (!editingZoneName) {
      showToast('Destination Name cannot be empty.', 'error');
      return;
    }
    const updated = deliveryLocations.map((loc, idx) => {
      if (idx === index) {
        return { name: editingZoneName, charge: editingZoneCharge };
      }
      return loc;
    });
    updateDeliveryLocations(updated);
    setEditingZoneIndex(null);
    showToast('Delivery zone updated!');
  };

  const handleStartEditZone = (index: number, loc: { name: string, charge: number }) => {
    setEditingZoneIndex(index);
    setEditingZoneName(loc.name);
    setEditingZoneCharge(loc.charge);
  };

  const handleDeleteZone = (index: number) => {
    if (confirm('Are you sure you want to delete this delivery zone?')) {
      const updated = deliveryLocations.filter((_, idx) => idx !== index);
      updateDeliveryLocations(updated);
      showToast('Delivery zone deleted');
    }
  };

  // Global Save Handler
  const handleSaveAllChanges = () => {
    localStorage.setItem('windows_h_products', JSON.stringify(products));
    localStorage.setItem('windows_h_categories', JSON.stringify(categories));
    localStorage.setItem('windows_h_notifications', JSON.stringify(notifications));
    localStorage.setItem('windows_h_siteContent', JSON.stringify(siteContent));
    localStorage.setItem('windows_h_orders', JSON.stringify(orders));
    localStorage.setItem('windows_h_banners', JSON.stringify(banners));
    localStorage.setItem('windows_h_delivery_locations', JSON.stringify(deliveryLocations));
    showToast('✓ All Admin Changes Saved Successfully!');
  };

  // Overview metrics
  const totalOrders = orders.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(o => o.createdAt && o.createdAt.startsWith(todayStr)).length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Packed' || o.orderStatus === 'Out For Delivery').length;
  const deliveredOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
  const cancelledOrders = orders.filter(o => o.orderStatus === 'Cancelled').length;
  const totalRevenue = orders.filter(o => o.orderStatus !== 'Cancelled').reduce((sum, o) => sum + o.totalAmount, 0);

  // Analytics Data starting from 0
  const currentMonthIdx = new Date().getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenueData = months.slice(Math.max(0, currentMonthIdx - 6), currentMonthIdx + 1).map(month => ({
    month,
    revenue: month === months[currentMonthIdx] ? totalRevenue : 0,
    ordersCount: month === months[currentMonthIdx] ? totalOrders : 0
  }));

  const maxRevenue = Math.max(...monthlyRevenueData.map(d => d.revenue), 1000); // Minimum scale 1000

  // Calculate material share based on ACTUAL products in orders
  const materialSales: Record<string, { count: number, total: number }> = {};
  let totalItemsSold = 0;
  
  orders.forEach(o => {
    if (o.orderStatus !== 'Cancelled') {
      o.items.forEach(item => {
        const cat = item.product.category;
        if (!materialSales[cat]) materialSales[cat] = { count: 0, total: 0 };
        materialSales[cat].count += item.quantity;
        materialSales[cat].total += item.totalPrice;
        totalItemsSold += item.quantity;
      });
    }
  });

  const categoryShare = Object.entries(materialSales).map(([name, data]) => ({
    name,
    share: totalItemsSold > 0 ? Math.round((data.count / totalItemsSold) * 100) : 0,
    count: `${data.count} Units`,
    color: 'bg-pink-400'
  })).sort((a, b) => b.share - a.share).slice(0, 4);

  // Assign colors
  const colors = ['bg-blue-500', 'bg-pink-400', 'bg-sky-400', 'bg-purple-500'];
  categoryShare.forEach((c, i) => c.color = colors[i % colors.length]);

  return (
    <div className="flex h-screen font-sans relative overflow-hidden bg-slate-950 text-slate-300">
      
      {/* Blue & Pink Theme Background (matching main website) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
        <div className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] bg-pink-600/30 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[65vw] h-[65vw] bg-blue-600/30 blur-[100px] rounded-full"></div>
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-fuchsia-500/15 blur-[80px] rounded-full"></div>
        <div className="absolute top-[10%] right-[20%] w-[30vw] h-[30vw] bg-violet-600/15 blur-[90px] rounded-full"></div>
        {/* Subtle Glass Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[40px]"></div>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="w-64 flex-shrink-0 relative z-20 border-r border-white/10 bg-white/5 backdrop-blur-2xl hidden md:flex flex-col h-full shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        {/* Sidebar Header / Admin Info */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-white/15 shadow-inner shrink-0 overflow-hidden p-1">
              <img src="/windows-h-logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <div className="overflow-hidden">
              <div className="inline-flex items-center space-x-2 text-[9px] font-black text-pink-300 uppercase tracking-widest mb-0.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shrink-0"></span>
                <span className="truncate">Admin Portal</span>
              </div>
              <h1 className="text-sm font-black text-white tracking-tight truncate">
                HSN Command Center
              </h1>
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'orders', label: `Orders (${pendingOrders})`, icon: ShoppingCart },
            { id: 'customers', label: `Customers (${customers.length})`, icon: Users },
            { id: 'content', label: 'Content & Ads', icon: ImageIcon },
            { id: 'transport', label: 'Transport Fares', icon: Truck },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'security', label: 'Security & Settings', icon: Lock },
          ].map(tab => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-blue-500/20 text-white border border-pink-400/30 shadow-[0_0_20px_rgba(236,72,153,0.1)] font-black'
                    : 'text-slate-400 border border-transparent hover:bg-white/5 hover:text-white'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-pink-300' : 'text-slate-500'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logoutAdmin}
            className="w-full bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/50 font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition duration-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-700 pb-20 md:pb-0">
        
        {/* Header (Mobile & Desktop save button) */}
        <div className="sticky top-4 z-30 mx-4 sm:mx-6 md:mx-8 mt-4 mb-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-3 md:hidden">
             <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-black text-white">Admin</h1>
          </div>
          <h2 className="hidden md:block text-xl font-black text-white capitalize">
             {activeTab.replace('-', ' ')}
          </h2>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveAllChanges}
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-400 hover:to-blue-400 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/25 transition transform active:scale-95 cursor-pointer border border-pink-400/30"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Sync Database</span>
              <span className="sm:hidden">Save</span>
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center space-x-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white font-black text-xs shadow-lg">
                {siteContent.adminPhoto ? (
                  <img src={siteContent.adminPhoto} alt="Admin" className="w-full h-full rounded-full object-cover" />
                ) : (
                  'A'
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-white leading-tight">Admin</p>
                <p className="text-[9px] text-pink-300 font-bold leading-tight">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

        {/* ==================== TAB 1: OVERVIEW ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 hover:border-blue-500/30 transition duration-300 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Revenue</div>
                <div className="text-3xl font-black text-white mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-pink-400 font-bold mt-2 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Live Tracking
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 hover:border-sky-500/30 transition duration-300 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Orders</div>
                <div className="text-3xl font-black text-white mt-1">{totalOrders}</div>
                <div className="text-[10px] text-white font-bold mt-2">
                  {todayOrders} Orders Today
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 hover:border-rose-500/30 transition duration-300 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Clock className="w-5 h-5 text-rose-400" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pending Dispatch</div>
                <div className="text-3xl font-black text-white mt-1">{pendingOrders}</div>
                <div className="text-[10px] text-rose-400 font-bold mt-2">
                  Requires Immediate Action
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 hover:border-pink-500/30 transition duration-300 group shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <CheckCircle2 className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Successful Deliveries</div>
                <div className="text-3xl font-black text-white mt-1">{deliveredOrders}</div>
                <div className="text-[10px] text-pink-400 font-bold mt-2">
                  {cancelledOrders} Cancelled Returns
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== TAB 2: ANALYTICS ==================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 rounded-[2rem] shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800/50 pb-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Revenue Trajectory</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Real-time order volume and cashflow metrics</p>
                </div>
                {totalRevenue === 0 && (
                  <div className="text-xs text-white font-bold bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                    Awaiting first order
                  </div>
                )}
              </div>

              {/* Animated SVG Bar Chart */}
              <div className="pt-8">
                <div className="h-64 flex items-end justify-between space-x-2 sm:space-x-4 px-2 relative">
                  
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-t border-slate-600 w-full h-0"></div>
                    <div className="border-t border-slate-600 w-full h-0"></div>
                    <div className="border-t border-slate-600 w-full h-0"></div>
                    <div className="border-t border-slate-600 w-full h-0"></div>
                  </div>

                  {monthlyRevenueData.map((d, i) => {
                    const heightPercent = d.revenue > 0 ? Math.max(10, Math.round((d.revenue / maxRevenue) * 100)) : 2;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center group relative z-10 h-full justify-end">
                        <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-slate-950 text-[10px] font-black px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap pointer-events-none transform -translate-y-2 group-hover:translate-y-0">
                          ₹{d.revenue.toLocaleString('en-IN')}
                          <div className="text-[9px] text-slate-500">{d.ordersCount} Orders</div>
                        </div>

                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full max-w-[48px] bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-blue-600 group-hover:to-blue-400 rounded-t-xl transition-all duration-500 shadow-lg relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-3">{d.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Category Share */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-[2rem] shadow-xl">
                <h4 className="text-lg font-black text-white flex items-center space-x-2 mb-6">
                  <PieChart className="w-5 h-5 text-white" />
                  <span>Sales by Category</span>
                </h4>

                {categoryShare.length > 0 ? (
                  <div className="space-y-5">
                    {categoryShare.map((cat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm font-bold text-slate-200">
                          <span>{cat.name}</span>
                          <span className="text-white">{cat.share}% <span className="text-slate-500 text-xs font-normal">({cat.count})</span></span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                          <div className={`h-full ${cat.color} rounded-full relative overflow-hidden`} style={{ width: `${cat.share}%` }}>
                             <div className="absolute inset-0 bg-slate-900/20 w-full animate-[shimmer_2s_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500 text-sm font-bold">
                    No sales data yet to calculate category share.
                  </div>
                )}
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-[2rem] shadow-xl">
                <h4 className="text-lg font-black text-white flex items-center space-x-2 mb-6">
                  <Activity className="w-5 h-5 text-pink-400" />
                  <span>Recent System Logs</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex space-x-3 items-start opacity-50">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-pink-400 shrink-0"></div>
                    <div>
                      <div className="text-xs font-bold text-slate-300">System Reset Initiated</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Database tables cleared. Starting fresh at {new Date().toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-start">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-sky-400 shrink-0 animate-pulse"></div>
                    <div>
                      <div className="text-xs font-bold text-slate-300">Awaiting New Orders</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Storefront is live and ready to accept customer orders.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== TAB 3: PRODUCTS ==================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Package className="w-6 h-6 text-white" />
                <span>Product Catalog</span>
              </h2>
              <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', category: '', brand: '', description: '', image: '', price: 0, stock: 0, type: 'general', enabled: true }); setIsProductModalOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition">
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/60 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700/60">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category/Brand</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3 flex items-center space-x-3">
                        {p.image ? <img src={p.image} className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-slate-800" />}
                        <div>
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.type}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-200">{p.category}</div>
                        <div className="text-xs text-slate-400">{p.brand}</div>
                      </td>
                      <td className="px-4 py-3 font-bold text-white">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">{p.stock} Units</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${p.enabled ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {p.enabled ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => handleEditProduct(p)} className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => { if(confirm('Delete product?')) deleteProduct(p.id); }} className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500 font-bold">No products found. Add a product to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* PRODUCT MODAL */}
            {isProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h3 className="text-xl font-bold text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                    <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-white text-xl font-black">✕</button>
                  </div>
                  <div className="p-6 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Product Name *</label>
                        <input type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div className="col-span-full">
                        <label className="block text-xs font-bold text-slate-400 mb-1 flex items-center justify-between">
                          <span>Product Image (Upload from Device or Enter URL)</span>
                          <span className="text-[10px] text-white font-bold">PNG, JPG, WEBP Supported</span>
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                          <input 
                            type="file" 
                            id="product-image-device-upload"
                            accept="image/*"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                showToast('Processing photo from laptop...', 'info');
                                const compressed = await compressImageFile(file);
                                if (compressed) {
                                  setProductForm(prev => ({ ...prev, image: compressed }));
                                  showToast('Image inserted successfully!');
                                } else {
                                  showToast('Could not load image file.', 'error');
                                }
                                e.target.value = '';
                              }
                            }} 
                            className="hidden" 
                          />
                          <label 
                            htmlFor="product-image-device-upload" 
                            className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-md shrink-0"
                          >
                            <Upload className="w-4 h-4 text-white" />
                            <span>Select Image from Device</span>
                          </label>
                          <input 
                            type="text" 
                            value={productForm.image} 
                            onChange={e => setProductForm({...productForm, image: e.target.value})} 
                            className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500" 
                            placeholder="Or paste image URL (e.g. /my-photo.jpg)" 
                          />
                          {productForm.image && (
                            <img src={productForm.image} alt="Preview" className="w-10 h-10 rounded-xl object-cover border border-blue-500/50 shadow-md shrink-0" />
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Category *</label>
                        <input type="text" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} placeholder="e.g. Cement, Steel, Blades" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Brand</label>
                        <input type="text" value={productForm.brand} onChange={e => setProductForm({...productForm, brand: e.target.value})} placeholder="e.g. UltraTech, Tata Tiscon" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Price (₹) *</label>
                        <input type="number" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Stock Amount</label>
                        <input type="number" value={productForm.stock || ''} onChange={e => setProductForm({...productForm, stock: Number(e.target.value)})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Type/Unit</label>
                        <select value={productForm.type} onChange={e => setProductForm({...productForm, type: e.target.value as any})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                          <option value="cement">Cement (Bags)</option>
                          <option value="steel">Steel (Tons/Lengths)</option>
                          <option value="wire">Wire (Kg)</option>
                          <option value="nails">Nails (Kg)</option>
                          <option value="general">General (Units)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Status</label>
                        <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                          <input type="checkbox" checked={productForm.enabled} onChange={e => setProductForm({...productForm, enabled: e.target.checked})} className="w-5 h-5 rounded border-slate-700 bg-slate-800 accent-blue-500" />
                          <span className="text-sm font-bold text-white">Active in Storefront</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Description</label>
                      <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                  </div>
                  <div className="p-6 border-t border-slate-800 bg-slate-950 flex justify-end space-x-3">
                    <button onClick={() => setIsProductModalOpen(false)} className="px-6 py-2 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition">Cancel</button>
                    <button onClick={handleSaveProduct} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-blue-500/20">Save Product</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB: CATEGORIES & IMAGES ==================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Tag className="w-6 h-6 text-pink-400" />
                  <span>Category Images & Catalog ({categories.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Upload high-definition images for all store categories directly from your laptop or URL.</p>
              </div>
              <button 
                onClick={() => {
                  const name = prompt('Enter Category Name (e.g. Roof Sheets):');
                  if (name) {
                    addCategory({ name, image: '/cement_banner_new.png', description: `${name} products` });
                  }
                }} 
                className="bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(cat => (
                <div key={cat.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 hover:border-pink-500/40 transition duration-300 space-y-4 group shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-base">{cat.name}</h3>
                      <p className="text-[11px] text-slate-400">{products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length} Products Listed</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm(`Remove category "${cat.name}"?`)) {
                          deleteCategory(cat.id);
                        }
                      }}
                      className="p-1.5 bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 rounded-lg transition"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Category Image Card with Live Preview */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-3 text-[10px] font-black text-pink-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-pink-500/30">
                      Live Storefront Image
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div className="space-y-2 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={cat.image} 
                        onChange={e => updateCategory(cat.id, { image: e.target.value })}
                        placeholder="Image URL"
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    <label className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition shadow-sm">
                      <Upload className="w-3.5 h-3.5 text-white" />
                      <span>Upload Photo from Laptop</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            showToast(`Processing photo for ${cat.name}...`, 'info');
                            const res = await compressImageFile(file);
                            if (res) {
                              updateCategory(cat.id, { image: res });
                              showToast(`Updated image for ${cat.name}!`);
                            } else {
                              showToast('Failed to load image file.', 'error');
                            }
                            e.target.value = '';
                          }
                        }} 
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: ORDERS ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 gap-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6 text-white" />
                <span>Order History ({orders.length})</span>
              </h2>
              <div className="flex space-x-3">
                <button onClick={() => exportOrdersToCSV(orders)} className="bg-fuchsia-600/20 text-fuchsia-400 hover:bg-fuchsia-600/40 border border-fuchsia-500/30 px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition">
                  <Download className="w-4 h-4" />
                  <span>Excel (CSV)</span>
                </button>
                <button onClick={() => exportSalesReportPDF(orders)} className="bg-rose-600/20 text-rose-400 hover:bg-rose-600/40 border border-rose-500/30 px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition">
                  <Download className="w-4 h-4" />
                  <span>PDF Report</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/60 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300 min-w-[800px]">
                <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700/60">
                  <tr>
                    <th className="px-4 py-3">Order ID & Date</th>
                    <th className="px-4 py-3">Customer Info</th>
                    <th className="px-4 py-3">Total Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-slate-500 font-bold">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-800/30 transition">
                        <td className="px-4 py-4">
                          <div className="font-bold text-white">#{o.id}</div>
                          <div className="text-[10px] text-slate-500">{new Date(o.createdAt).toLocaleString('en-IN')}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-white">{o.customerName}</div>
                          <div className="text-xs text-slate-400">{o.mobileNumber}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[200px]" title={o.deliveryAddress}>{o.deliveryAddress}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-bold text-white text-base">₹{o.totalAmount.toLocaleString('en-IN')}</div>
                          <div className="text-xs text-slate-400">{o.totalQuantity} items</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                            o.orderStatus === 'Pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                            o.orderStatus === 'Delivered' ? 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30' :
                            o.orderStatus === 'Cancelled' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                            'bg-sky-500/20 text-white border-sky-500/30'
                          }`}>
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right space-x-2">
                          <button onClick={() => updateOrderStatus(o.id, 'Confirmed')} title="Accept Order" className="p-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/30 text-fuchsia-400 rounded-lg transition border border-fuchsia-500/20">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => updateOrderStatus(o.id, 'Delivered')} title="Mark Delivered" className="p-2 bg-sky-500/10 hover:bg-sky-500/30 text-white rounded-lg transition border border-sky-500/20">
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => {
                            if(confirm('Are you sure you want to completely delete this order? This cannot be undone.')) {
                              deleteOrder(o.id);
                            }
                          }} title="Delete Order" className="p-2 bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 rounded-lg transition border border-rose-500/20">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: CONTENT & ADS (BANNERS & WALLPAPERS) ==================== */}
        {activeTab === 'content' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* 1. WEBSITE BACKGROUND WALLPAPERS (DRONE MOTION) */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-black text-white uppercase tracking-widest mb-1">
                  <Upload className="w-4 h-4 text-white" />
                  <span>3D Drone Aerial Motion Wallpapers</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Customize Background Wallpapers
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Upload custom ultra HD wallpapers for before and after entering the website. Includes Apple macOS-style drone aerial motion.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Wallpaper 1: Before Entering Website (Splash Screen) */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 relative group">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-white" />
                        <span>1. Before Entering Website (Splash)</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">Main landing screen entry wallpaper.</p>
                    </div>
                  </div>

                  {/* Live Drone Motion Preview Card */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <img 
                      src={siteContent.splashImage || '/splash_bg_ultra_8k.png'} 
                      alt="Splash Preview" 
                      className="w-full h-full object-cover drone-wallpaper-motion"
                    />
                    <div className="absolute inset-0 bg-slate-950/40"></div>
                    <div className="absolute bottom-3 left-3 bg-slate-950/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-blue-500/30 backdrop-blur-md">
                      ✨ Live macOS Drone Motion Active
                    </div>
                  </div>

                  {/* Image URL Input & Upload Controls */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={siteContent.splashImage || ''}
                        onChange={(e) => updateSiteContent({ splashImage: e.target.value })}
                        placeholder="https://example.com/splash_bg.png"
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition shadow-md">
                        <Upload className="w-4 h-4" />
                        <span>Upload File from Device</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              showToast('Processing wallpaper from laptop...', 'info');
                              const res = await compressImageFile(file, 1920, 1080);
                              if (res) {
                                updateSiteContent({ splashImage: res });
                                showToast('Splash Screen Wallpaper Updated!');
                              } else {
                                showToast('Failed to load wallpaper file.', 'error');
                              }
                              e.target.value = '';
                            }
                          }} 
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          updateSiteContent({ splashImage: '/splash_bg_ultra_8k.png' });
                          showToast('Reset to default 8K Splash Wallpaper');
                        }}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold py-2.5 px-3 rounded-xl transition"
                      >
                        Reset 8K
                      </button>
                    </div>
                  </div>
                </div>

                {/* Wallpaper 2: After Entering Website (Home Hero) */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 relative group">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-pink-400" />
                        <span>2. After Entering Website (Hero)</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">Home page hero background wallpaper.</p>
                    </div>
                  </div>

                  {/* Live Drone Motion Preview Card */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <img 
                      src={siteContent.heroImage || '/hero_bg_ultra_8k.png'} 
                      alt="Hero Preview" 
                      className="w-full h-full object-cover drone-wallpaper-motion"
                    />
                    <div className="absolute inset-0 bg-slate-950/40"></div>
                    <div className="absolute bottom-3 left-3 bg-slate-950/90 text-pink-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-pink-500/30 backdrop-blur-md">
                      ✨ Live macOS Drone Motion Active
                    </div>
                  </div>

                  {/* Image URL Input & Upload Controls */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={siteContent.heroImage || ''}
                        onChange={(e) => updateSiteContent({ heroImage: e.target.value })}
                        placeholder="https://example.com/hero_bg.png"
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-pink-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="flex-1 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition shadow-md">
                        <Upload className="w-4 h-4" />
                        <span>Upload File from Laptop</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              showToast('Processing wallpaper from laptop...', 'info');
                              const res = await compressImageFile(file, 1920, 1080);
                              if (res) {
                                updateSiteContent({ heroImage: res });
                                showToast('Home Hero Wallpaper Updated!');
                              } else {
                                showToast('Failed to load wallpaper file.', 'error');
                              }
                              e.target.value = '';
                            }
                          }} 
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          updateSiteContent({ heroImage: '/hero_bg_ultra_8k.png' });
                          showToast('Reset to default 8K Hero Wallpaper');
                        }}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold py-2.5 px-3 rounded-xl transition"
                      >
                        Reset 8K
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. PROMOTIONAL BANNERS CAROUSEL */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <ImageIcon className="w-6 h-6 text-white" />
                    <span>Promotional Banners ({banners.length}/5)</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Manage the sliding image carousel on the home page.</p>
                </div>
                {banners.length < 5 && (
                  <div className="flex items-center space-x-2">
                    <label className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>Upload Banner Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            showToast('Processing banner photo from laptop...', 'info');
                            const res = await compressImageFile(file, 1920, 1080);
                            if (res) {
                              const title = prompt('Enter Banner Title (optional):') || 'Promo Banner';
                              addBanner({ imageUrl: res, title, active: true });
                              showToast('Promotional Banner added!');
                            } else {
                              showToast('Failed to process banner file.', 'error');
                            }
                            e.target.value = '';
                          }
                        }} 
                      />
                    </label>

                    <button 
                      onClick={() => {
                        const url = prompt('Enter Image URL:');
                        const title = prompt('Enter Banner Title (optional):');
                        if (url) {
                          addBanner({ imageUrl: url, title: title || 'Promo Banner', active: true });
                        }
                      }} 
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      <span>Enter URL</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {banners.map(b => (
                  <div key={b.id} className={`relative bg-slate-800/50 rounded-xl overflow-hidden border ${b.active ? 'border-blue-500/30' : 'border-slate-700'} group`}>
                    <img src={b.imageUrl} alt={b.title} className={`w-full h-40 object-cover ${!b.active && 'opacity-50 grayscale'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="font-bold text-white mb-2 truncate">{b.title}</div>
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => toggleBannerStatus(b.id)} 
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg ${b.active ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-slate-700 text-slate-300'}`}
                        >
                          {b.active ? 'Active' : 'Hidden'}
                        </button>
                        <button 
                          onClick={() => { if(confirm('Delete this banner?')) deleteBanner(b.id); }} 
                          className="bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 p-2 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {banners.length === 0 && (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-500">
                    No banners added. Add up to 5 images to display on the home page carousel.
                  </div>
                )}
              </div>
            </div>

            {/* 3. STORE INFORMATION & HEADING EDITORS */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Edit className="w-5 h-5 text-white" />
                  <span>Edit Store Info & Headings</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Modify the text, headings, and contacts shown on the landing page and footer.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={siteContent.businessName || ''}
                    onChange={e => updateSiteContent({ businessName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Tagline / Subtext</label>
                  <input
                    type="text"
                    value={siteContent.tagline || ''}
                    onChange={e => updateSiteContent({ tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Landing Page Main Heading</label>
                  <input
                    type="text"
                    value={siteContent.heroHeading || ''}
                    onChange={e => updateSiteContent({ heroHeading: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Landing Page Subheading</label>
                  <input
                    type="text"
                    value={siteContent.heroSubheading || ''}
                    onChange={e => updateSiteContent({ heroSubheading: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Store Yard Address</label>
                  <input
                    type="text"
                    value={siteContent.address || ''}
                    onChange={e => updateSiteContent({ address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Pincode</label>
                  <input
                    type="text"
                    value={siteContent.pincode || ''}
                    onChange={e => updateSiteContent({ pincode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Contact Phone Number</label>
                  <input
                    type="text"
                    value={siteContent.phone || ''}
                    onChange={e => updateSiteContent({ phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">WhatsApp Number</label>
                  <input
                    type="text"
                    value={siteContent.whatsapp || ''}
                    onChange={e => updateSiteContent({ whatsapp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Yard Business Hours</label>
                  <input
                    type="text"
                    value={siteContent.businessHours || ''}
                    onChange={e => updateSiteContent({ businessHours: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1.5">Google Maps Embed Link (Src URL Only)</label>
                  <input
                    type="text"
                    value={siteContent.googleMapsEmbed || ''}
                    onChange={e => updateSiteContent({ googleMapsEmbed: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-400 mb-1.5">About Yard Corporate Story</label>
                  <textarea
                    value={siteContent.aboutStory || ''}
                    onChange={e => updateSiteContent({ aboutStory: e.target.value })}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: TRANSPORT FARES ==================== */}
        {activeTab === 'transport' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 4. SHIPPING FARES & TRANSPORT ZONES MANAGER */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <span>Shipping Fares & Transport Zones</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Manage delivery locations and extra money charges for truck transport.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset delivery zones and shipping fares to yard defaults?')) {
                      updateDeliveryLocations([
                        { name: 'Kalikiri Yard (Self Pick-up)', charge: 0 },
                        { name: 'Kalikiri (Within Town)', charge: 500 },
                        { name: 'Pileru', charge: 1000 },
                        { name: 'Vayalpadu', charge: 1200 },
                        { name: 'Valmikipuram', charge: 1500 },
                        { name: 'Gurramkonda', charge: 1800 },
                        { name: 'Madanapalle', charge: 2000 }
                      ]);
                      showToast('Fares restored to default values');
                    }
                  }}
                  className="px-4 py-2 bg-slate-950 text-slate-350 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer border border-slate-800/80 hover:bg-slate-900"
                >
                  Reset Defaults
                </button>
              </div>

              {/* Add New Transport Zone Form */}
              <form onSubmit={handleAddZone} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 grid gap-4 sm:grid-cols-3 items-end text-xs">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Destination Name (Town/Mandal)</label>
                  <input
                    type="text"
                    value={newZoneName}
                    onChange={e => setNewZoneName(e.target.value)}
                    placeholder="e.g. Gurramkonda"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Transport Fare (₹)</label>
                  <input
                    type="number"
                    value={newZoneCharge}
                    onChange={e => setNewZoneCharge(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="e.g. 1800"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                    min="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-400 hover:to-blue-400 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer border border-blue-400/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Location</span>
                </button>
              </form>

              {/* Fares List Grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs">
                {deliveryLocations.map((loc, idx) => {
                  const isEditing = editingZoneIndex === idx;
                  return (
                    <div key={idx} className="bg-slate-950/40 p-4 rounded-2xl border border-slate-850 flex justify-between items-center transition hover:border-slate-800">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingZoneName}
                            onChange={e => setEditingZoneName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 text-xs"
                            required
                          />
                          <input
                            type="number"
                            value={editingZoneCharge}
                            onChange={e => setEditingZoneCharge(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 text-xs"
                            min="0"
                            required
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-extrabold text-white">{loc.name}</div>
                          <div className="text-white font-extrabold text-xs mt-1">
                            {loc.charge === 0 ? 'Self Pick-up (Yard)' : `₹${loc.charge.toLocaleString('en-IN')}`}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-1.5 shrink-0 ml-4">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleUpdateZone(idx)}
                              className="p-2 bg-fuchsia-500/10 hover:bg-fuchsia-500/30 text-fuchsia-400 rounded-lg transition cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingZoneIndex(null)}
                              className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-450 rounded-lg transition cursor-pointer border border-slate-800"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStartEditZone(idx, loc)}
                              className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition cursor-pointer border border-slate-800"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteZone(idx)}
                              disabled={loc.charge === 0}
                              className="p-2 bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: CUSTOMERS ==================== */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-slate-800 gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Users className="w-6 h-6 text-white" />
                  <span>Customer Directory ({customers.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">View list of all registered clients and their purchase history.</p>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/60 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300 min-w-[800px]">
                <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700/60">
                  <tr>
                    <th className="px-6 py-4">Customer Details</th>
                    <th className="px-6 py-4">Primary Address</th>
                    <th className="px-6 py-4">Total Orders</th>
                    <th className="px-6 py-4">Total Revenue</th>
                    <th className="px-6 py-4">Last Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-500 font-bold">No customers found yet.</td>
                    </tr>
                  ) : (
                    customers.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition">
                        <td className="px-6 py-4 flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{c.name}</div>
                            <div className="text-xs text-slate-400">{c.mobileNumber}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-slate-300 max-w-[250px] truncate" title={c.address}>{c.address}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                            {c.totalOrders} {c.totalOrders === 1 ? 'Order' : 'Orders'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-extrabold text-white text-sm">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {new Date(c.lastOrderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB: NOTIFICATIONS ==================== */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-slate-800 gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Bell className="w-6 h-6 text-amber-400 animate-pulse" />
                  <span>Announcements & Notifications ({notifications.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Broadcast popups or scrolling banner ticker notifications to yard visitors.</p>
              </div>
              <button
                onClick={() => {
                  setEditingNotification(null);
                  setNotificationForm({ title: '', content: '', type: 'banner', active: true });
                  setIsNotificationModalOpen(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-400 hover:to-blue-400 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-md cursor-pointer border border-blue-400/25"
              >
                <Plus className="w-4 h-4" />
                <span>Create Announcement</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {notifications.map(n => (
                <div key={n.id} className={`p-6 rounded-[2rem] border bg-slate-900/40 backdrop-blur-sm space-y-4 flex flex-col justify-between ${n.active ? 'border-amber-500/30' : 'border-slate-800/60'}`}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                        n.type === 'banner' 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                          : 'bg-blue-500/10 text-white border-blue-500/30'
                      }`}>
                        {n.type === 'banner' ? 'Top Banner Ticker' : 'Central Modal Popup'}
                      </span>
                      <button
                        onClick={() => {
                          updateNotification(n.id, { active: !n.active });
                          showToast(`Announcement ${!n.active ? 'Activated' : 'Paused'}`);
                        }}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition border cursor-pointer ${
                          n.active 
                            ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' 
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {n.active ? '● Active' : '○ Paused'}
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{n.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{n.content}</p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800/40">
                    <button
                      onClick={() => {
                        setEditingNotification(n);
                        setNotificationForm({
                          title: n.title,
                          content: n.content,
                          type: n.type,
                          active: n.active
                        });
                        setIsNotificationModalOpen(true);
                      }}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this announcement?')) {
                          deleteNotification(n.id);
                          showToast('Notification deleted');
                        }
                      }}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 bg-slate-900/10">
                  <Bell className="w-10 h-10 mx-auto mb-3 text-slate-650 opacity-60" />
                  <p className="text-sm font-bold">No announcements created yet</p>
                  <p className="text-xs text-slate-500 mt-1">Add banners or popups to notify buyers on site updates, price revisions, or office holidays.</p>
                </div>
              )}
            </div>

            {/* CREATE / EDIT NOTIFICATION MODAL */}
            {isNotificationModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {editingNotification ? 'Edit Announcement' : 'Create New Announcement'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Broadcast important information to yard visitors.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Announcement Title</label>
                      <input
                        type="text"
                        value={notificationForm.title}
                        onChange={e => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Price Revision, Holiday Notice"
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Announcement Content</label>
                      <textarea
                        value={notificationForm.content}
                        onChange={e => setNotificationForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Type the message detail here..."
                        rows={4}
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Broadcast Type</label>
                      <select
                        value={notificationForm.type}
                        onChange={e => setNotificationForm(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="banner">Scrolling Top Banner Ticker</option>
                        <option value="popup">Central Modal Popup (Large Alert)</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="notif-active"
                        checked={notificationForm.active}
                        onChange={e => setNotificationForm(prev => ({ ...prev, active: e.target.checked }))}
                        className="w-4 h-4 rounded border-slate-700 text-white focus:ring-0 focus:ring-offset-0 bg-slate-950 cursor-pointer"
                      />
                      <label htmlFor="notif-active" className="text-xs font-bold text-slate-300 cursor-pointer">
                        Display Announcement Immediately
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsNotificationModalOpen(false)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveNotification}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-400 hover:to-blue-400 text-white py-3 rounded-xl text-xs font-black transition shadow-lg cursor-pointer border border-blue-400/25"
                    >
                      {editingNotification ? 'Save Changes' : 'Publish Broadcast'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB: SECURITY & SETTINGS ==================== */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header Card */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Lock className="w-6 h-6 text-white" />
                <span>Security Settings</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Manage system password, credentials, and authentication preferences.</p>
            </div>

            {/* Current Auth Status Info */}
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800/80 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Authentication Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Authorized Email</span>
                  <span className="text-sm font-bold text-white">{import.meta.env.VITE_ADMIN_EMAIL || 'habeebc84@gmail.com'}</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Login Provider</span>
                  <span className="inline-flex items-center space-x-1 text-sm font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-1"></span>
                    Secure Local Mode
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Profile Photo */}
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                  <span>Admin Profile Photo</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Upload a photo to be displayed as your admin avatar on the dashboard.</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                  {siteContent.adminPhoto ? (
                    <img src={siteContent.adminPhoto} alt="Admin" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-slate-600">A</span>
                  )}
                </div>
                <div className="flex-1 w-full sm:w-1/2">
                  <label className="block w-full cursor-pointer bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl px-4 py-3 text-center transition">
                    <span className="text-sm font-bold text-white flex items-center justify-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Choose Photo from Laptop</span>
                    </span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              updateSiteContent({ adminPhoto: event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 mt-2 text-center">Recommended size: 256x256px (JPG, PNG)</p>
                </div>
              </div>
            </div>

            {/* Maintenance Mode Toggle */}
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-pink-400" />
                  <span>Maintenance Mode</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">When enabled, regular visitors will see a maintenance screen. You can still access the site as admin.</p>
              </div>
              
              <div className="flex flex-col space-y-4 bg-slate-950/60 border border-slate-700 p-6 rounded-xl">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={!!siteContent.maintenanceMode}
                      onChange={(e) => handleMaintenanceToggle(e.target.checked)}
                    />
                    <div className={`block w-14 h-8 rounded-full transition ${siteContent.maintenanceMode ? 'bg-pink-500' : 'bg-slate-700'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${siteContent.maintenanceMode ? 'translate-x-6' : ''}`}></div>
                  </div>
                  <div className="font-bold text-white text-lg">
                    {siteContent.maintenanceMode ? 'Maintenance Mode is ON' : 'Maintenance Mode is OFF'}
                  </div>
                </label>

                {siteContent.maintenanceMode && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Expected End Time (Displayed to Visitors)</label>
                      <input 
                        type="text" 
                        value={siteContent.maintenanceEndTime || ''} 
                        onChange={e => updateSiteContent({ maintenanceEndTime: e.target.value })}
                        placeholder="e.g. Today at 5:00 PM"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Secret Access Code</label>
                      <input 
                        type="text" 
                        value={siteContent.maintenanceAccessCode || ''} 
                        onChange={e => updateSiteContent({ maintenanceAccessCode: e.target.value })}
                        placeholder="e.g. 123456"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-pink-400 font-mono font-bold tracking-widest focus:outline-none focus:border-blue-500"
                      />
                      <div className="text-[10px] text-slate-500 mt-2">Click the logo 5 times on the maintenance screen and enter this code along with your admin email and password to bypass the lock.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Visitor Feedbacks */}
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-white" />
                  <span>Maintenance Feedback</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Messages submitted by visitors while the site was down.</p>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                {feedbacks.length === 0 ? (
                  <div className="text-sm font-bold text-slate-500 py-4 text-center">No feedback received yet.</div>
                ) : (
                  feedbacks.map(fb => (
                    <div key={fb.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative group">
                      <button 
                        onClick={() => { if(window.confirm('Delete this feedback?')) deleteFeedback(fb.id); }}
                        className="absolute top-3 right-3 text-slate-500 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition p-1 bg-slate-900 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="text-xs text-slate-100 font-bold mb-1 pr-8">{new Date(fb.createdAt).toLocaleString()}</div>
                      <div className="text-sm text-slate-300 pr-8">{fb.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Password Change Form */}
            <div className="bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Key className="w-5 h-5 text-white" />
                  <span>Update Password</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Change the password used for email/password authentication.</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Previous Password</label>
                  <input 
                    type={showPass ? "text" : "password"} 
                    value={previousPassword}
                    onChange={e => setPreviousPassword(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-400 mb-1">New Password</label>
                  <div className="relative">
                    <input 
                      type={showPass ? "text" : "password"} 
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-700 text-white rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Confirm New Password</label>
                  <input 
                    type={showPass ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                    placeholder="Repeat password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="w-full bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-400 hover:to-blue-500 text-white font-black py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2 text-sm transition transform active:scale-95 border border-pink-400/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChangingPass ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
            
          </div>
        )}

        {/* ═══ TERMS & CONDITIONS TAB ═══ */}
        {activeTab === 'terms' && (
          <div className="p-6 sm:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-white flex items-center space-x-3">
              <FileText className="w-6 h-6 text-white" />
              <span>Terms & Conditions Editor</span>
            </h2>
            <p className="text-xs text-slate-400">Add, edit, or remove terms sections that appear on the public Terms & Conditions page.</p>

            {/* Add New Term */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-white">Add New Section</h4>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Section Title *</label>
                <input
                  type="text"
                  value={newTermTitle}
                  onChange={e => setNewTermTitle(e.target.value)}
                  placeholder="e.g. Return Policy"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Section Content *</label>
                <textarea
                  value={newTermContent}
                  onChange={e => setNewTermContent(e.target.value)}
                  placeholder="Write the full terms text here..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <button
                onClick={() => {
                  if (!newTermTitle.trim() || !newTermContent.trim()) {
                    showToast('Both title and content are required.', 'error');
                    return;
                  }
                  const updated = [...termsItems, { title: newTermTitle.trim(), content: newTermContent.trim() }];
                  setTermsItems(updated);
                  updateSiteContent({ termsAndConditions: updated });
                  setNewTermTitle('');
                  setNewTermContent('');
                  showToast('Term section added!');
                }}
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-400 hover:to-pink-400 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section</span>
              </button>
            </div>

            {/* Existing Terms List */}
            <div className="space-y-4">
              {termsItems.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm">No terms sections added yet. Add your first section above.</div>
              )}
              {termsItems.map((term, idx) => (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl space-y-3 group relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-black shrink-0">{idx + 1}</div>
                      <h4 className="text-sm font-bold text-white">{term.title}</h4>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this terms section?')) {
                          const updated = termsItems.filter((_, i) => i !== idx);
                          setTermsItems(updated);
                          updateSiteContent({ termsAndConditions: updated });
                          showToast('Section removed.');
                        }
                      }}
                      className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg transition opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-11">{term.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        </div>
      </main>
    </div>
  );
};

// Re-usable icon mapping if needed
const Clock = ({className}: {className: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
