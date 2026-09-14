import { useState } from 'react';
import { useApp } from '../store';
import { products, formatPrice } from '../data/products';
import { BarChart3, Package, Users, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Settings, Bell, FileText, MessageSquare, Shield, Layers, Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState(state.adminTab);

  const stats = [
    { label: 'فروش امروز', value: '۱۲۵,۴۰۰,۰۰۰', unit: 'تومان', change: '+۱۲%', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'سفارش‌های جدید', value: '۴۸', unit: 'سفارش', change: '+۸%', icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { label: 'کاربران فعال', value: '۲,۳۴۵', unit: 'نفر', change: '+۵%', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'نرخ تبدیل', value: '۳.۲', unit: 'درصد', change: '+۰.۴%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
  ];

  const recentOrders = [
    { id: 'DM-A3F2K9', customer: 'علی محمدی', amount: '۸۹,۵۰۰,۰۰۰', status: 'ارسال شده', date: '۱۴۰۳/۰۹/۱۵', items: 2 },
    { id: 'DM-B7G1L4', customer: 'سارا احمدی', amount: '۱۴۵,۰۰۰,۰۰۰', status: 'در حال پردازش', date: '۱۴۰۳/۰۹/۱۵', items: 1 },
    { id: 'DM-C2H8M6', customer: 'محمد رضایی', amount: '۳۲,۵۰۰,۰۰۰', status: 'تحویل شده', date: '۱۴۰۳/۰۹/۱۴', items: 3 },
    { id: 'DM-D5J3N8', customer: 'فاطمه کریمی', amount: '۱۸,۵۰۰,۰۰۰', status: 'در انتظار پرداخت', date: '۱۴۰۳/۰۹/۱۴', items: 1 },
    { id: 'DM-E9K6P1', customer: 'حسین نوری', amount: '۴۸,۵۰۰,۰۰۰', status: 'ارسال شده', date: '۱۴۰۳/۰۹/۱۳', items: 2 },
  ];

  const lowStockItems = [
    { name: 'کارت گرافیک RTX 4090', stock: 5, threshold: 10 },
    { name: 'مک‌بوک پرو ۱۶ اینچ', stock: 8, threshold: 15 },
    { name: 'آیپد پرو M2', stock: 12, threshold: 20 },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: BarChart3 },
    { id: 'products', label: 'مدیریت محصولات', icon: Package },
    { id: 'orders', label: 'سفارش‌ها', icon: ShoppingCart },
    { id: 'users', label: 'کاربران', icon: Users },
    { id: 'finance', label: 'مالی و تسویه', icon: DollarSign },
    { id: 'marketing', label: 'بازاریابی', icon: TrendingUp },
    { id: 'support', label: 'پشتیبانی', icon: MessageSquare },
    { id: 'reports', label: 'گزارش‌ها', icon: FileText },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-100 p-4 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800">پنل مدیریت</h2>
          <p className="text-xs text-gray-400">دیجی‌مارکت</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                activeSection === item.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Mobile Menu */}
        <div className="lg:hidden mb-6">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm"
          >
            {menuItems.map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        {activeSection === 'dashboard' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">داشبورد</h1>
                <p className="text-sm text-gray-500 mt-1">خلاصه وضعیت فروشگاه</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">۳</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label} ({stat.unit})</p>
                </div>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">نمودار فروش هفتگی</h3>
                <div className="flex items-end gap-3 h-48">
                  {['شنبه', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه'].map((day, i) => {
                    const heights = [60, 80, 45, 90, 70, 95, 50];
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-blue-100 rounded-t-lg relative" style={{ height: `${heights[i]}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"></div>
                        </div>
                        <span className="text-[10px] text-gray-500">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">دسته‌بندی فروش</h3>
                <div className="space-y-4">
                  {[
                    { name: 'موبایل و تبلت', percent: 35, color: 'bg-blue-500' },
                    { name: 'لپ‌تاپ و کامپیوتر', percent: 25, color: 'bg-purple-500' },
                    { name: 'گیمینگ', percent: 20, color: 'bg-green-500' },
                    { name: 'لوازم جانبی', percent: 12, color: 'bg-amber-500' },
                    { name: 'سایر', percent: 8, color: 'bg-gray-400' },
                  ].map((cat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{cat.name}</span>
                        <span className="text-gray-800 font-medium">{cat.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders & Alerts */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">سفارش‌های اخیر</h3>
                  <button onClick={() => setActiveSection('orders')} className="text-sm text-blue-600 hover:text-blue-700">مشاهده همه</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 border-b">
                        <th className="text-right pb-3 font-medium">کد سفارش</th>
                        <th className="text-right pb-3 font-medium">مشتری</th>
                        <th className="text-right pb-3 font-medium">مبلغ</th>
                        <th className="text-right pb-3 font-medium">وضعیت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 font-mono text-xs text-blue-600">{order.id}</td>
                          <td className="py-3 text-gray-700">{order.customer}</td>
                          <td className="py-3 text-gray-700">{order.amount} تومان</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                              order.status === 'تحویل شده' ? 'bg-green-50 text-green-700' :
                              order.status === 'ارسال شده' ? 'bg-blue-50 text-blue-700' :
                              order.status === 'در حال پردازش' ? 'bg-amber-50 text-amber-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    هشدار موجودی
                  </h3>
                  <div className="space-y-3">
                    {lowStockItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-lg">{item.stock} عدد</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-800 mb-4">فعالیت اخیر</h3>
                  <div className="space-y-3">
                    {[
                      { text: 'سفارش جدید DM-A3F2K9 ثبت شد', time: '۵ دقیقه پیش' },
                      { text: 'محصول جدید اضافه شد', time: '۱ ساعت پیش' },
                      { text: 'پرداخت تایید شد', time: '۲ ساعت پیش' },
                      { text: 'نظر جدید ثبت شد', time: '۳ ساعت پیش' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-700">{activity.text}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'products' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">مدیریت محصولات</h1>
              <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                افزودن محصول
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="جستجوی محصول..." className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm">
                  <option>همه دسته‌ها</option>
                  <option>موبایل و تبلت</option>
                  <option>لپ‌تاپ</option>
                  <option>گیمینگ</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
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
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt="" className="w-10 h-10 object-contain rounded-lg" />
                            <div>
                              <p className="font-medium text-gray-800 text-xs">{product.name}</p>
                              <p className="text-xs text-gray-400">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 text-xs">{product.subcategory}</td>
                        <td className="p-4 text-gray-700 text-xs">{formatPrice(product.price)}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded-lg ${product.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {product.stock} عدد
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600">{product.status === 'new' ? 'فعال' : product.status}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">مدیریت سفارش‌ها</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'همه سفارش‌ها', value: '۱,۲۳۴', color: 'border-gray-200' },
                { label: 'در انتظار پرداخت', value: '۲۳', color: 'border-amber-300' },
                { label: 'در حال ارسال', value: '۴۵', color: 'border-blue-300' },
                { label: 'تحویل شده', value: '۱,۱۶۶', color: 'border-green-300' },
              ].map((item, i) => (
                <div key={i} className={`bg-white rounded-xl border-r-4 ${item.color} p-4`}>
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-500">
                      <th className="text-right p-4 font-medium">کد سفارش</th>
                      <th className="text-right p-4 font-medium">مشتری</th>
                      <th className="text-right p-4 font-medium">تعداد اقلام</th>
                      <th className="text-right p-4 font-medium">مبلغ</th>
                      <th className="text-right p-4 font-medium">تاریخ</th>
                      <th className="text-right p-4 font-medium">وضعیت</th>
                      <th className="text-right p-4 font-medium">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-4 font-mono text-xs text-blue-600">{order.id}</td>
                        <td className="p-4 text-gray-700">{order.customer}</td>
                        <td className="p-4 text-gray-600">{order.items} قلم</td>
                        <td className="p-4 text-gray-700">{order.amount} تومان</td>
                        <td className="p-4 text-gray-500 text-xs">{order.date}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                            order.status === 'تحویل شده' ? 'bg-green-50 text-green-700' :
                            order.status === 'ارسال شده' ? 'bg-blue-50 text-blue-700' :
                            order.status === 'در حال پردازش' ? 'bg-amber-50 text-amber-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'users' && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">مدیریت کاربران</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'کل کاربران', value: '۱۲,۴۵۶' },
                { label: 'فعال امروز', value: '۲,۳۴۵' },
                { label: 'فروشندگان', value: '۸۹' },
                { label: 'ادمین‌ها', value: '۵' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="جستجوی کاربر..." className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl text-sm" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm">
                  <option>همه نقش‌ها</option>
                  <option>مشتری</option>
                  <option>فروشنده</option>
                  <option>ادمین</option>
                </select>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'علی محمدی', email: 'ali@example.com', role: 'مشتری', orders: 12, status: 'فعال' },
                  { name: 'سارا احمدی', email: 'sara@example.com', role: 'مشتری VIP', orders: 28, status: 'فعال' },
                  { name: 'محمد رضایی', email: 'mohammad@example.com', role: 'فروشنده', orders: 0, status: 'فعال' },
                  { name: 'فاطمه کریمی', email: 'fatemeh@example.com', role: 'مشتری', orders: 5, status: 'غیرفعال' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-600">{user.role}</span>
                      <span className="text-xs text-gray-500">{user.orders} سفارش</span>
                      <span className={`text-xs px-2 py-1 rounded-lg ${user.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{user.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeSection === 'finance' || activeSection === 'marketing' || activeSection === 'support' || activeSection === 'reports' || activeSection === 'settings') && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {activeSection === 'finance' && 'مدیریت مالی و تسویه'}
              {activeSection === 'marketing' && 'بازاریابی و محتوا'}
              {activeSection === 'support' && 'پشتیبانی و ارتباطات'}
              {activeSection === 'reports' && 'گزارش‌های تحلیلی'}
              {activeSection === 'settings' && 'تنظیمات سیستم'}
            </h1>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Layers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">بخش {
                activeSection === 'finance' && 'مالی'
              }{activeSection === 'marketing' && 'بازاریابی'
              }{activeSection === 'support' && 'پشتیبانی'
              }{activeSection === 'reports' && 'گزارش‌ها'
              }{activeSection === 'settings' && 'تنظیمات'}</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                این بخش شامل امکانات جامع مدیریتی است. در نسخه کامل، تمامی عملیات مربوط به این بخش قابل دسترسی خواهد بود.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                {activeSection === 'finance' && ['تراکنش‌ها', 'تسویه فروشندگان', 'کمیسیون‌ها', 'مالیات', 'فاکتورها', 'گزارش مالی'].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">{item}</div>
                ))}
                {activeSection === 'marketing' && ['کد تخفیف', 'کمپین‌ها', 'بنرها', 'ایمیل مارکتینگ', 'باشگاه مشتریان', 'سئو'].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">{item}</div>
                ))}
                {activeSection === 'support' && ['تیکت‌ها', 'چت زنده', 'اعلان‌ها', 'قالب پیام', 'FAQ', 'بازخورد'].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">{item}</div>
                ))}
                {activeSection === 'reports' && ['فروش روزانه', 'نرخ تبدیل', 'محصولات پرفروش', 'تحلیل کاربران', 'درآمد', 'موجودی'].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">{item}</div>
                ))}
                {activeSection === 'settings' && ['فروشگاه', 'درگاه پرداخت', 'حمل و نقل', 'نقش‌ها و دسترسی', 'پشتیبان‌گیری', 'API'].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">{item}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
