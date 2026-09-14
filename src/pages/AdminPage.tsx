import { useState } from 'react';
import { useApp } from '../store';
import { products as allProducts, categories, formatPrice, Product } from '../data/products';
import { BarChart3, Package, Users, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Settings, Bell, FileText, MessageSquare, Shield, Layers, Plus, Search, Eye, Edit, Trash2, Check, X, ChevronDown, ArrowUpRight, ArrowDownRight, Filter, RefreshCw, Send, Save, ChevronLeft, MapPin, CreditCard, Clock, Tag, Zap, Globe, Database, Lock, Activity } from 'lucide-react';

export default function AdminPage() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState(state.adminTab);
  const [showOrderDetail, setShowOrderDetail] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: BarChart3, badge: null },
    { id: 'products', label: 'محصولات', icon: Package, badge: allProducts.length.toString() },
    { id: 'orders', label: 'سفارش‌ها', icon: ShoppingCart, badge: state.orders.filter(o => o.status === 'pending').length.toString() },
    { id: 'users', label: 'کاربران', icon: Users, badge: null },
    { id: 'finance', label: 'مالی', icon: DollarSign, badge: null },
    { id: 'marketing', label: 'بازاریابی', icon: TrendingUp, badge: null },
    { id: 'support', label: 'پشتیبانی', icon: MessageSquare, badge: '۳' },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell, badge: state.notifications.filter(n => !n.read).length.toString() },
    { id: 'settings', label: 'تنظیمات', icon: Settings, badge: null },
  ];

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    dispatch({ type: 'SET_ADMIN_TAB', payload: id });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gradient-to-bl from-slate-50 via-gray-50 to-indigo-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-l border-gray-200 p-5 hidden lg:flex flex-col shadow-soft">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold gradient-text">پنل مدیریت</h2>
              <p className="text-[10px] text-gray-500">دیجی‌مارکت نسخه ۲.۰</p>
            </div>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-l from-indigo-600 to-purple-600 text-white shadow-lg font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4.5 h-4.5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  activeSection === item.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">A</div>
            <div>
              <p className="text-xs font-bold text-gray-800">ادمین سیستم</p>
              <p className="text-[10px] text-gray-500">admin@digimarket.ir</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Mobile Menu */}
        <div className="lg:hidden mb-6">
          <select
            value={activeSection}
            onChange={(e) => handleSectionChange(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm"
          >
            {menuItems.map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        {activeSection === 'dashboard' && <DashboardSection />}
        {activeSection === 'products' && <ProductsSection showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct} />}
        {activeSection === 'orders' && <OrdersSection showOrderDetail={showOrderDetail} setShowOrderDetail={setShowOrderDetail} />}
        {activeSection === 'users' && <UsersSection />}
        {activeSection === 'finance' && <FinanceSection />}
        {activeSection === 'marketing' && <MarketingSection />}
        {activeSection === 'support' && <SupportSection />}
        {activeSection === 'notifications' && <NotificationsSection showNotification={showNotification} setShowNotification={setShowNotification} />}
        {activeSection === 'settings' && <SettingsSection />}
      </main>
    </div>
  );
}

function DashboardSection() {
  const { state, dispatch } = useApp();

  const stats = [
    { label: 'فروش امروز', value: '۱۲۵,۴۰۰,۰۰۰', unit: 'تومان', change: '+۱۲%', up: true, icon: DollarSign, gradient: 'from-emerald-500 to-green-600' },
    { label: 'سفارش‌های جدید', value: '۴۸', unit: 'سفارش', change: '+۸%', up: true, icon: ShoppingCart, gradient: 'from-cyan-500 to-blue-600' },
    { label: 'کاربران فعال', value: '۲,۳۴۵', unit: 'نفر', change: '+۵%', up: true, icon: Users, gradient: 'from-violet-500 to-purple-600' },
    { label: 'نرخ تبدیل', value: '۳.۲', unit: 'درصد', change: '+۰.۴%', up: true, icon: TrendingUp, gradient: 'from-amber-500 to-orange-600' },
  ];

  const recentOrders = state.orders.slice(0, 5);

  const lowStockItems = allProducts.filter(p => p.stock < 15).slice(0, 5);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">داشبورد</h1>
          <p className="text-sm text-gray-500 mt-1">خلاصه وضعیت فروشگاه در لحظه</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-soft">
          <RefreshCw className="w-4 h-4 text-indigo-500" />
          بروزرسانی
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-soft hover:shadow-hover transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${stat.up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">نمودار فروش هفتگی</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">هفته جاری</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-end gap-4 h-52">
            {[
              { day: 'شنبه', value: 65, amount: '۸۵M' },
              { day: 'یکشنبه', value: 82, amount: '۱۰۵M' },
              { day: 'دوشنبه', value: 48, amount: '۶۲M' },
              { day: 'سه‌شنبه', value: 91, amount: '۱۱۸M' },
              { day: 'چهارشنبه', value: 73, amount: '۹۵M' },
              { day: 'پنجشنبه', value: 96, amount: '۱۲۵M' },
              { day: 'جمعه', value: 55, amount: '۷۲M' },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">{item.amount}</span>
                <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: `${item.value}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-xl group-hover:from-indigo-400 group-hover:to-purple-400 transition-all"></div>
                </div>
                <span className="text-[10px] text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
          <h3 className="font-bold text-gray-800 mb-6">سهم دسته‌بندی‌ها</h3>
          <div className="space-y-5">
            {[
              { name: 'موبایل و تبلت', percent: 35, color: 'from-blue-500 to-indigo-500' },
              { name: 'لپ‌تاپ', percent: 25, color: 'from-purple-500 to-pink-500' },
              { name: 'گیمینگ', percent: 20, color: 'from-green-500 to-emerald-500' },
              { name: 'لوازم جانبی', percent: 12, color: 'from-amber-500 to-orange-500' },
              { name: 'سایر', percent: 8, color: 'from-gray-400 to-gray-500' },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{cat.name}</span>
                  <span className="text-gray-800 font-bold">{cat.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-l ${cat.color} rounded-full transition-all duration-1000`} style={{ width: `${cat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">سفارش‌های اخیر</h3>
            <button onClick={() => dispatch({ type: 'SET_ADMIN_TAB', payload: 'orders' })} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                    order.status === 'processing' ? 'bg-amber-100 text-amber-600' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-indigo-600 font-medium">{order.id}</p>
                    <p className="text-sm text-gray-700">{order.customer}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-gray-800">{formatPrice(order.total)}</p>
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              هشدار موجودی
            </h3>
            <div className="space-y-3">
              {lowStockItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <span className="text-xs text-gray-600 truncate max-w-[140px]">{item.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${item.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.stock} عدد
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-2">عملکرد ماهانه</h3>
            <p className="text-3xl font-bold mb-1">۸۵۶M</p>
            <p className="text-xs text-indigo-100">تومان فروش این ماه</p>
            <div className="mt-4 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-xs">۲۳% نسبت به ماه قبل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsSection({ showAddProduct, setShowAddProduct }: { showAddProduct: boolean; setShowAddProduct: (v: boolean) => void }) {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = allProducts.filter(p => {
    const matchSearch = !searchQuery || p.name.includes(searchQuery) || p.brand.includes(searchQuery);
    const matchCategory = !filterCategory || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { id: Date.now().toString(), title: 'محصول حذف شد', message: 'محصول با موفقیت حذف شد', type: 'order', read: false, date: 'همین الان' } });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">مدیریت محصولات</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} محصول از {allProducts.length}</p>
        </div>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          افزودن محصول جدید
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-soft">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی نام محصول یا برند..."
              className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-soft' : 'text-gray-500'}`}
            >
              جدول
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-soft' : 'text-gray-500'}`}
            >
              شبکه
            </button>
          </div>
        </div>
      </div>

      {/* Products List */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-500">
                  <th className="text-right p-4 font-medium">محصول</th>
                  <th className="text-right p-4 font-medium">دسته‌بندی</th>
                  <th className="text-right p-4 font-medium">قیمت</th>
                  <th className="text-right p-4 font-medium">موجودی</th>
                  <th className="text-right p-4 font-medium">وضعیت</th>
                  <th className="text-right p-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-12 h-12 object-contain rounded-xl bg-gray-50 p-1" />
                        <div>
                          <p className="font-medium text-gray-800 text-xs">{product.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-xs">{product.subcategory}</td>
                    <td className="p-4 text-gray-700 text-xs font-medium">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${product.stock < 10 ? 'bg-red-50 text-red-600' : product.stock < 20 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                        {product.stock} عدد
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 font-medium">فعال</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => setEditingProduct(product)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(product.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-indigo-200 hover:shadow-hover transition-all group shadow-soft">
              <img src={product.image} alt="" className="w-full h-32 object-contain mb-3" />
              <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</p>
              <p className="text-[10px] text-gray-400 mb-2">{product.brand}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold gradient-text">{formatPrice(product.price)}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingProduct(product)} className="w-7 h-7 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(product.id)} className="w-7 h-7 flex items-center justify-center bg-red-50 text-red-600 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddProduct || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => { setShowAddProduct(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    price: product?.price?.toString() || '',
    stock: product?.stock?.toString() || '',
    category: product?.category || '',
    description: product?.description || '',
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-text">{product ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 mb-1 block">نام محصول</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">برند</label>
            <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">دسته‌بندی</label>
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
              <option value="">انتخاب کنید</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">قیمت (تومان)</label>
            <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">موجودی</label>
            <input type="text" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 mb-1 block">توضیحات</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none h-24" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600 mb-1 block">تصویر محصول</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">فایل را بکشید و رها کنید یا کلیک کنید</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG تا ۵ مگابایت</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">انصراف</button>
          <button onClick={onClose} className="px-6 py-2.5 bg-gradient-to-l from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg flex items-center gap-2">
            <Save className="w-4 h-4" />
            {product ? 'بروزرسانی' : 'ذخیره محصول'}
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersSection({ showOrderDetail, setShowOrderDetail }: { showOrderDetail: string | null; setShowOrderDetail: (v: string | null) => void }) {
  const { state, dispatch } = useApp();
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = state.orders.filter(o => {
    const matchStatus = !filterStatus || o.status === filterStatus;
    const matchSearch = !searchQuery || o.id.includes(searchQuery) || o.customer.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const statusCounts = {
    all: state.orders.length,
    pending: state.orders.filter(o => o.status === 'pending').length,
    processing: state.orders.filter(o => o.status === 'processing').length,
    shipped: state.orders.filter(o => o.status === 'shipped').length,
    delivered: state.orders.filter(o => o.status === 'delivered').length,
    cancelled: state.orders.filter(o => o.status === 'cancelled').length,
  };

  const selectedOrder = state.orders.find(o => o.id === showOrderDetail);

  const updateStatus = (id: string, status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">مدیریت سفارش‌ها</h1>
        <p className="text-sm text-gray-500 mt-1">مدیریت و پیگیری تمام سفارش‌ها</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'همه', value: statusCounts.all, color: 'border-gray-300', bg: 'bg-white' },
          { label: 'در انتظار', value: statusCounts.pending, color: 'border-amber-400', bg: 'bg-white' },
          { label: 'در حال پردازش', value: statusCounts.processing, color: 'border-blue-400', bg: 'bg-white' },
          { label: 'ارسال شده', value: statusCounts.shipped, color: 'border-indigo-400', bg: 'bg-white' },
          { label: 'تحویل شده', value: statusCounts.delivered, color: 'border-green-400', bg: 'bg-white' },
          { label: 'لغو شده', value: statusCounts.cancelled, color: 'border-red-400', bg: 'bg-white' },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => setFilterStatus(i === 0 ? '' : ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][i - 1])}
            className={`${item.bg} rounded-xl border-r-4 ${item.color} p-4 text-right hover:shadow-hover transition-all shadow-soft ${filterStatus === (i === 0 ? '' : ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][i - 1]) ? 'ring-2 ring-indigo-300' : ''}`}
          >
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-soft">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی کد سفارش یا نام مشتری..."
            className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500">
                <th className="text-right p-4 font-medium">کد سفارش</th>
                <th className="text-right p-4 font-medium">مشتری</th>
                <th className="text-right p-4 font-medium">مبلغ</th>
                <th className="text-right p-4 font-medium">تاریخ</th>
                <th className="text-right p-4 font-medium">وضعیت</th>
                <th className="text-right p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4 font-mono text-xs text-indigo-600 font-medium">{order.id}</td>
                  <td className="p-4">
                    <p className="text-gray-700 text-xs">{order.customer}</p>
                    <p className="text-[10px] text-gray-400">{order.phone}</p>
                  </td>
                  <td className="p-4 text-gray-700 text-xs font-medium">{formatPrice(order.total)}</td>
                  <td className="p-4 text-gray-500 text-xs">{order.date}</td>
                  <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setShowOrderDetail(order.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as any)}
                        className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-400"
                      >
                        <option value="pending">در انتظار</option>
                        <option value="processing">در حال پردازش</option>
                        <option value="shipped">ارسال شده</option>
                        <option value="delivered">تحویل شده</option>
                        <option value="cancelled">لغو شده</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowOrderDetail(null)}></div>
          <div className="relative bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">جزئیات سفارش</h2>
              <button onClick={() => setShowOrderDetail(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">کد سفارش</span>
                <span className="font-mono text-sm font-bold text-indigo-600">{selectedOrder.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">مشتری</p>
                  <p className="text-sm font-medium text-gray-800">{selectedOrder.customer}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">موبایل</p>
                  <p className="text-sm font-medium text-gray-800">{selectedOrder.phone}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">مبلغ</p>
                  <p className="text-sm font-bold text-gray-800">{formatPrice(selectedOrder.total)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">روش پرداخت</p>
                  <p className="text-sm font-medium text-gray-800">{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">آدرس</p>
                <p className="text-sm text-gray-700">{selectedOrder.address}</p>
              </div>
              {selectedOrder.trackingCode && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">کد رهگیری</p>
                  <p className="text-sm font-bold text-blue-700 font-mono">{selectedOrder.trackingCode}</p>
                </div>
              )}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">وضعیت</span>
                <OrderStatusBadge status={selectedOrder.status} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UsersSection() {
  const users = [
    { name: 'علی محمدی', email: 'ali@example.com', phone: '۰۹۱۲۳۴۵۶۷۸۹', role: 'مشتری', orders: 12, totalSpent: '۲۳۴,۵۰۰,۰۰۰', status: 'فعال', joinDate: '۱۴۰۳/۰۵/۱۲' },
    { name: 'سارا احمدی', email: 'sara@example.com', phone: '۰۹۱۳۴۵۶۷۸۹۰', role: 'مشتری VIP', orders: 28, totalSpent: '۵۶۷,۰۰۰,۰۰۰', status: 'فعال', joinDate: '۱۴۰۳/۰۳/۰۸' },
    { name: 'محمد رضایی', email: 'mohammad@example.com', phone: '۰۹۱۱۲۳۴۵۶۷۸', role: 'فروشنده', orders: 0, totalSpent: '۰', status: 'فعال', joinDate: '۱۴۰۳/۰۶/۲۰' },
    { name: 'فاطمه کریمی', email: 'fatemeh@example.com', phone: '۰۹۱۵۶۷۸۹۰۱۲', role: 'مشتری', orders: 5, totalSpent: '۴۵,۰۰۰,۰۰۰', status: 'غیرفعال', joinDate: '۱۴۰۳/۰۷/۱۵' },
    { name: 'حسین نوری', email: 'hossein@example.com', phone: '۰۹۱۶۷۸۹۰۱۲۳', role: 'مشتری', orders: 8, totalSpent: '۱۲۳,۰۰۰,۰۰۰', status: 'فعال', joinDate: '۱۴۰۳/۰۴/۰۱' },
    { name: 'مریم حسینی', email: 'maryam@example.com', phone: '۰۹۱۷۸۹۰۱۲۳۴', role: 'مشتری VIP', orders: 35, totalSpent: '۸۹۰,۰۰۰,۰۰۰', status: 'فعال', joinDate: '۱۴۰۳/۰۲/۱۰' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">مدیریت کاربران</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت مشتریان، فروشندگان و نقش‌ها</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          افزودن کاربر
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'کل کاربران', value: '۱۲,۴۵۶', icon: Users, color: 'from-blue-500 to-indigo-500' },
          { label: 'فعال امروز', value: '۲,۳۴۵', icon: Activity, color: 'from-green-500 to-emerald-500' },
          { label: 'فروشندگان', value: '۸۹', icon: Globe, color: 'from-violet-500 to-purple-500' },
          { label: 'VIP', value: '۲۳۴', icon: Award, color: 'from-amber-500 to-orange-500' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-soft">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="جستجوی کاربر..." className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-500">
                <th className="text-right p-4 font-medium">کاربر</th>
                <th className="text-right p-4 font-medium">نقش</th>
                <th className="text-right p-4 font-medium">سفارش‌ها</th>
                <th className="text-right p-4 font-medium">مجموع خرید</th>
                <th className="text-right p-4 font-medium">وضعیت</th>
                <th className="text-right p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-xs">{user.name}</p>
                        <p className="text-[10px] text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${user.role === 'فروشنده' ? 'bg-violet-50 text-violet-600' : user.role.includes('VIP') ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-xs">{user.orders}</td>
                  <td className="p-4 text-gray-700 text-xs font-medium">{user.totalSpent} ت</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${user.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FinanceSection() {
  const transactions = [
    { id: 'TXN-001', type: 'دریافت', amount: '۸۹,۵۰۰,۰۰۰', method: 'درگاه بانکی', date: '۱۴۰۳/۰۹/۱۵', status: 'موفق' },
    { id: 'TXN-002', type: 'دریافت', amount: '۱۴۵,۰۰۰,۰۰۰', method: 'درگاه بانکی', date: '۱۴۰۳/۰۹/۱۵', status: 'موفق' },
    { id: 'TXN-003', type: 'پرداخت', amount: '۱۲,۵۰۰,۰۰۰', method: 'تسویه فروشنده', date: '۱۴۰۳/۰۹/۱۴', status: 'موفق' },
    { id: 'TXN-004', type: 'دریافت', amount: '۳۲,۵۰۰,۰۰۰', method: 'کیف پول', date: '۱۴۰۳/۰۹/۱۴', status: 'موفق' },
    { id: 'TXN-005', type: 'بازپرداخت', amount: '۱۸,۵۰۰,۰۰۰', method: 'درگاه بانکی', date: '۱۴۰۳/۰۹/۱۳', status: 'در انتظار' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">مدیریت مالی</h1>
        <p className="text-sm text-gray-500 mt-1">تراکنش‌ها، تسویه‌ها و گزارش‌های مالی</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'درآمد کل ماه', value: '۸۵۶,۰۰۰,۰۰۰', change: '+۲۳%', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
          { label: 'تسویه در انتظار', value: '۱۲۵,۰۰۰,۰۰۰', change: '۵ فروشنده', icon: CreditCard, color: 'from-amber-500 to-orange-600' },
          { label: 'کمیسیون ماه', value: '۴۲,۸۰۰,۰۰۰', change: '۵%', icon: TrendingUp, color: 'from-violet-500 to-purple-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">{item.change}</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">تراکنش‌های اخیر</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">مشاهده همه</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-500">
                <th className="text-right p-4 font-medium">کد</th>
                <th className="text-right p-4 font-medium">نوع</th>
                <th className="text-right p-4 font-medium">مبلغ</th>
                <th className="text-right p-4 font-medium">روش</th>
                <th className="text-right p-4 font-medium">تاریخ</th>
                <th className="text-right p-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-indigo-50/30">
                  <td className="p-4 font-mono text-xs text-indigo-600">{tx.id}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${tx.type === 'دریافت' ? 'bg-green-50 text-green-600' : tx.type === 'پرداخت' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700 text-xs font-medium">{tx.amount} ت</td>
                  <td className="p-4 text-gray-500 text-xs">{tx.method}</td>
                  <td className="p-4 text-gray-500 text-xs">{tx.date}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${tx.status === 'موفق' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MarketingSection() {
  const coupons = [
    { code: 'WELCOME10', discount: '۱۰%', usage: '۱۲۳/۵۰۰', expiry: '۱۴۰۳/۱۰/۳۰', status: 'فعال' },
    { code: 'SUMMER20', discount: '۲۰%', usage: '۴۵/۱۰۰', expiry: '۱۴۰۳/۰۹/۳۱', status: 'فعال' },
    { code: 'VIP30', discount: '۳۰%', usage: '۸/۲۰', expiry: '۱۴۰۳/۱۲/۲۹', status: 'فعال' },
    { code: 'BLACKFRIDAY', discount: '۵۰%', usage: '۱۰۰۰/۱۰۰۰', expiry: '۱۴۰۳/۰۹/۰۵', status: 'منقضی' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">بازاریابی و محتوا</h1>
        <p className="text-sm text-gray-500 mt-1">مدیریت تخفیف‌ها، کمپین‌ها و محتوا</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'کد تخفیف فعال', value: '۱۲', icon: Tag, color: 'from-blue-500 to-indigo-500' },
          { label: 'کمپین فعال', value: '۳', icon: Send, color: 'from-violet-500 to-purple-500' },
          { label: 'بنر فعال', value: '۸', icon: Globe, color: 'from-emerald-500 to-green-500' },
          { label: 'ایمیل ارسال‌شده', value: '۵,۶۷۸', icon: Mail, color: 'from-amber-500 to-orange-500' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-soft">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">کدهای تخفیف</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-l from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-medium">
            <Plus className="w-3.5 h-3.5" />
            کد جدید
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-500">
                <th className="text-right p-4 font-medium">کد</th>
                <th className="text-right p-4 font-medium">تخفیف</th>
                <th className="text-right p-4 font-medium">استفاده</th>
                <th className="text-right p-4 font-medium">انقضا</th>
                <th className="text-right p-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-indigo-50/30">
                  <td className="p-4 font-mono text-xs text-indigo-600 font-bold">{coupon.code}</td>
                  <td className="p-4 text-gray-700 text-xs font-medium">{coupon.discount}</td>
                  <td className="p-4 text-gray-500 text-xs">{coupon.usage}</td>
                  <td className="p-4 text-gray-500 text-xs">{coupon.expiry}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${coupon.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SupportSection() {
  const tickets = [
    { id: 'TK-001', subject: 'مشکل در پرداخت', customer: 'علی محمدی', priority: 'بالا', status: 'باز', date: '۱۴۰۳/۰۹/۱۵' },
    { id: 'TK-002', subject: 'درخواست مرجوعی', customer: 'سارا احمدی', priority: 'متوسط', status: 'در حال بررسی', date: '۱۴۰۳/۰۹/۱۴' },
    { id: 'TK-003', subject: 'سوال درباره گارانتی', customer: 'محمد رضایی', priority: 'کم', status: 'پاسخ داده شده', date: '۱۴۰۳/۰۹/۱۳' },
    { id: 'TK-004', subject: 'تاخیر در ارسال', customer: 'فاطمه کریمی', priority: 'بالا', status: 'باز', date: '۱۴۰۳/۰۹/۱۳' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">پشتیبانی و ارتباطات</h1>
        <p className="text-sm text-gray-500 mt-1">مدیریت تیکت‌ها و چت زنده</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'تیکت‌های باز', value: '۱۲', icon: MessageSquare, color: 'from-red-500 to-pink-500' },
          { label: 'در حال بررسی', value: '۸', icon: Clock, color: 'from-amber-500 to-orange-500' },
          { label: 'پاسخ داده شده', value: '۱۵۶', icon: Check, color: 'from-green-500 to-emerald-500' },
          { label: 'چت آنلاین', value: '۳', icon: Send, color: 'from-blue-500 to-indigo-500' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-soft">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">تیکت‌های اخیر</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {tickets.map(ticket => (
            <div key={ticket.id} className="p-4 hover:bg-indigo-50/30 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${ticket.status === 'باز' ? 'bg-red-500' : ticket.status === 'در حال بررسی' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{ticket.subject}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ticket.customer} | {ticket.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-medium ${
                    ticket.priority === 'بالا' ? 'bg-red-50 text-red-600' : ticket.priority === 'متوسط' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                  }`}>{ticket.priority}</span>
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-medium ${
                    ticket.status === 'باز' ? 'bg-red-50 text-red-600' : ticket.status === 'در حال بررسی' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                  }`}>{ticket.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsSection({ showNotification, setShowNotification }: { showNotification: boolean; setShowNotification: (v: boolean) => void }) {
  const { state, dispatch } = useApp();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">اعلان‌ها</h1>
          <p className="text-sm text-gray-500 mt-1">{state.notifications.filter(n => !n.read).length} اعلان خوانده‌نشده</p>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">علامت‌گذاری همه به عنوان خوانده‌شده</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft">
        <div className="divide-y divide-gray-50">
          {state.notifications.map(notif => (
            <div
              key={notif.id}
              className={`p-4 hover:bg-indigo-50/30 transition-colors cursor-pointer ${!notif.read ? 'bg-indigo-50/20' : ''}`}
              onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notif.id })}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notif.type === 'order' ? 'bg-blue-100 text-blue-600' :
                  notif.type === 'stock' ? 'bg-red-100 text-red-600' :
                  notif.type === 'payment' ? 'bg-green-100 text-green-600' :
                  notif.type === 'review' ? 'bg-amber-100 text-amber-600' :
                  'bg-indigo-100 text-indigo-600'
                }`}>
                  {notif.type === 'order' && <ShoppingCart className="w-5 h-5" />}
                  {notif.type === 'stock' && <AlertTriangle className="w-5 h-5" />}
                  {notif.type === 'payment' && <DollarSign className="w-5 h-5" />}
                  {notif.type === 'review' && <MessageSquare className="w-5 h-5" />}
                  {notif.type === 'user' && <Users className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                    {!notif.read && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{notif.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text">تنظیمات سیستم</h1>
        <p className="text-sm text-gray-500 mt-1">پیکربندی فروشگاه و تنظیمات عمومی</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'general', label: 'عمومی', icon: Settings },
          { id: 'payment', label: 'درگاه پرداخت', icon: CreditCard },
          { id: 'shipping', label: 'حمل و نقل', icon: MapPin },
          { id: 'roles', label: 'نقش‌ها و دسترسی', icon: Lock },
          { id: 'backup', label: 'پشتیبان‌گیری', icon: Database },
          { id: 'api', label: 'API', icon: Globe },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSettingsTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
              activeSettingsTab === tab.id ? 'bg-gradient-to-l from-indigo-600 to-purple-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 shadow-soft'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
        {activeSettingsTab === 'general' && (
          <div className="space-y-6">
            <h3 className="font-bold text-gray-800 mb-4">تنظیمات عمومی فروشگاه</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">نام فروشگاه</label>
                <input type="text" defaultValue="دیجی‌مارکت" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">آدرس وبسایت</label>
                <input type="text" defaultValue="digimarket.ir" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">تلفن تماس</label>
                <input type="text" defaultValue="۰۲۱-۹۱۰۰۹۱۰۰" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">ایمیل</label>
                <input type="email" defaultValue="info@digimarket.ir" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 mb-1 block">توضیحات فروشگاه</label>
                <textarea defaultValue="بزرگ‌ترین فروشگاه آنلاین محصولات دیجیتال ایران" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none h-24" />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button className="px-6 py-2.5 bg-gradient-to-l from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg flex items-center gap-2">
                <Save className="w-4 h-4" />
                ذخیره تنظیمات
              </button>
            </div>
          </div>
        )}
        {activeSettingsTab === 'payment' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 mb-4">درگاه‌های پرداخت</h3>
            {[
              { name: 'زرین‌پال', status: 'فعال', desc: 'درگاه پرداخت اصلی' },
              { name: 'آی‌دی‌پی', status: 'فعال', desc: 'درگاه پرداخت جایگزین' },
              { name: 'پی‌پینگ', status: 'غیرفعال', desc: 'درگاه پرداخت ثانویه' },
            ].map((gateway, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{gateway.name}</p>
                  <p className="text-xs text-gray-400">{gateway.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${gateway.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {gateway.status}
                  </span>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">تنظیمات</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeSettingsTab === 'shipping' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 mb-4">روش‌های ارسال</h3>
            {[
              { name: 'پست پیشتاز', cost: '۵۰,۰۰۰ تومان', time: '۲-۳ روز کاری' },
              { name: 'ارسال اکسپرس', cost: '۱۲۰,۰۰۰ تومان', time: '۱ روز کاری' },
              { name: 'ارسال رایگان', cost: 'رایگان', time: '۳-۵ روز کاری (سفارش بالای ۵ میلیون)' },
            ].map((method, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{method.name}</p>
                  <p className="text-xs text-gray-400">{method.time}</p>
                </div>
                <span className="text-sm font-medium text-gray-700">{method.cost}</span>
              </div>
            ))}
          </div>
        )}
        {activeSettingsTab === 'roles' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 mb-4">نقش‌ها و سطوح دسترسی</h3>
            {[
              { name: 'مدیر کل', desc: 'دسترسی کامل به تمام بخش‌ها', users: 2 },
              { name: 'اپراتور', desc: 'مدیریت سفارش‌ها و پشتیبانی', users: 5 },
              { name: 'انباردار', desc: 'مدیریت موجودی و انبار', users: 3 },
              { name: 'فروشنده', desc: 'مدیریت محصولات و سفارش‌های خود', users: 89 },
            ].map((role, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{role.name}</p>
                  <p className="text-xs text-gray-400">{role.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{role.users} کاربر</span>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">ویرایش</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeSettingsTab === 'backup' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 mb-4">پشتیبان‌گیری و بازیابی</h3>
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">آخرین پشتیبان: ۱۴۰۳/۰۹/۱۵ - ساعت ۰۳:۰۰</p>
                  <p className="text-xs text-green-600">پشتیبان‌گیری خودکار هر روز ساعت ۳ بامداد</p>
                </div>
              </div>
            </div>
            <button className="w-full px-4 py-3 bg-gradient-to-l from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg flex items-center justify-center gap-2">
              <Database className="w-4 h-4" />
              ایجاد پشتیبان فوری
            </button>
          </div>
        )}
        {activeSettingsTab === 'api' && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 mb-4">تنظیمات API</h3>
            <div className="p-4 bg-gray-50 rounded-xl">
              <label className="text-xs text-gray-500 mb-1 block">کلید API</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white px-3 py-2 rounded-lg border border-gray-200 font-mono">dm_live_sk_•••••••••••••••••••</code>
                <button className="text-xs text-indigo-600 font-medium">کپی</button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <label className="text-xs text-gray-500 mb-1 block">Webhook URL</label>
              <input type="text" defaultValue="https://digimarket.ir/api/webhook" className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs font-mono focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: 'در انتظار پرداخت', className: 'bg-amber-50 text-amber-700' },
    processing: { label: 'در حال پردازش', className: 'bg-blue-50 text-blue-700' },
    shipped: { label: 'ارسال شده', className: 'bg-indigo-50 text-indigo-700' },
    delivered: { label: 'تحویل شده', className: 'bg-green-50 text-green-700' },
    cancelled: { label: 'لغو شده', className: 'bg-red-50 text-red-700' },
  };
  const { label, className } = config[status] || config.pending;
  return <span className={`text-[10px] px-2 py-1 rounded-lg font-medium ${className}`}>{label}</span>;
}

function Award({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3.5 2 1-4L6 10l4-.5L12 6l2 3.5 4 .5-3.5 3 1 4z" /></svg>;
}

function Mail({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}
