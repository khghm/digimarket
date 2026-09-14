import { useApp } from '../store';
import { Package, Heart, MapPin, MessageSquare, Wallet, Shield, Settings, ChevronLeft, Star, Clock, CreditCard, Bell } from 'lucide-react';

export default function DashboardPage() {
  const { state, dispatch } = useApp();

  if (!state.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <p className="text-gray-500 text-lg">لطفاً ابتدا وارد حساب کاربری خود شوید.</p>
      </div>
    );
  }

  const menuItems = [
    { id: 'orders', label: 'سفارش‌های من', icon: Package, count: 5 },
    { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart, count: state.favorites.length },
    { id: 'addresses', label: 'آدرس‌ها', icon: MapPin, count: 2 },
    { id: 'wallet', label: 'کیف پول', icon: Wallet, count: null },
    { id: 'reviews', label: 'نظرات من', icon: MessageSquare, count: 3 },
    { id: 'warranty', label: 'گارانتی‌ها', icon: Shield, count: 4 },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell, count: 7 },
    { id: 'settings', label: 'تنظیمات حساب', icon: Settings, count: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* User Header */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
            {state.user.name[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">{state.user.name}</h1>
            <p className="text-sm text-gray-500">{state.user.phone}</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center px-4">
              <p className="text-lg font-bold text-blue-600">۵</p>
              <p className="text-xs text-gray-500">سفارش</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center px-4">
              <p className="text-lg font-bold text-green-600">۲,۵۰۰,۰۰۰</p>
              <p className="text-xs text-gray-500">موجودی کیف پول (تومان)</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="text-center px-4">
              <p className="text-lg font-bold text-amber-600">۱۲۰</p>
              <p className="text-xs text-gray-500">امتیاز باشگاه</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Menu */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <nav className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">{item.count}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">سفارش‌های اخیر</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                مشاهده همه
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { id: 'DM-A3F2K9', date: '۱۴۰۳/۰۹/۱۵', status: 'ارسال شده', statusColor: 'bg-blue-50 text-blue-700', total: '۸۹,۵۰۰,۰۰۰', items: 2 },
                { id: 'DM-B7G1L4', date: '۱۴۰۳/۰۹/۱۰', status: 'تحویل شده', statusColor: 'bg-green-50 text-green-700', total: '۱۴۵,۰۰۰,۰۰۰', items: 1 },
                { id: 'DM-C2H8M6', date: '۱۴۰۳/۰۸/۲۸', status: 'تحویل شده', statusColor: 'bg-green-50 text-green-700', total: '۳۲,۵۰۰,۰۰۰', items: 3 },
              ].map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-mono text-sm text-blue-600">{order.id}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {order.date} | {order.items} قلم
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 text-sm">{order.total} تومان</p>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${order.statusColor}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: CreditCard, label: 'آخرین پرداخت', value: '۸۹,۵۰۰,۰۰۰ ت', color: 'text-blue-600 bg-blue-50' },
              { icon: Star, label: 'امتیاز باشگاه', value: '۱۲۰', color: 'text-amber-600 bg-amber-50' },
              { icon: Shield, label: 'گارانتی فعال', value: '۴ محصول', color: 'text-green-600 bg-green-50' },
              { icon: Bell, label: 'اعلان جدید', value: '۷ مورد', color: 'text-purple-600 bg-purple-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="font-bold text-gray-800 text-sm mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4">اعلان‌های اخیر</h2>
            <div className="space-y-3">
              {[
                { text: 'سفارش DM-A3F2K9 شما ارسال شد', time: '۲ ساعت پیش', type: 'info' },
                { text: 'تخفیف ویژه روی محصولات مورد علاقه شما', time: '۵ ساعت پیش', type: 'offer' },
                { text: 'نظر شما برای محصول ایرپاد پرو تایید شد', time: '۱ روز پیش', type: 'success' },
                { text: 'کد تخفیف ۱۰٪ ویژه شما فعال شد', time: '۲ روز پیش', type: 'offer' },
              ].map((notif, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notif.type === 'info' ? 'bg-blue-500' : notif.type === 'offer' ? 'bg-amber-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notif.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
