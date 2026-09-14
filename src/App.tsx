import { useState } from 'react';
import { AppProvider, useApp } from './store';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import FavoritesPage from './pages/FavoritesPage';
import DashboardPage from './pages/DashboardPage';
import { ShoppingCart, Heart, Search, Menu, X, Home, Package, LayoutDashboard, LogIn } from 'lucide-react';

function AppContent() {
  const { state, dispatch } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginName, setLoginName] = useState('');

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = () => {
    if (loginPhone && loginName) {
      dispatch({ type: 'LOGIN', payload: { name: loginName, phone: loginPhone, email: '' } });
      setShowLoginModal(false);
      setLoginPhone('');
      setLoginName('');
    }
  };

  const navigate = (page: string) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home': return <HomePage />;
      case 'products': return <ProductsPage />;
      case 'product': return <ProductDetailPage />;
      case 'cart': return <CartPage />;
      case 'admin': return <AdminPage />;
      case 'favorites': return <FavoritesPage />;
      case 'dashboard': return <DashboardPage />;
      default: return <HomePage />;
    }
  };

  if (state.currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-slate-50 via-blue-50/30 to-indigo-50/20">
        {/* Admin Top Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('home')} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
                <span className="text-white font-bold">DM</span>
              </div>
              <div className="hidden sm:block text-right">
                <span className="font-bold bg-gradient-to-l from-violet-700 to-indigo-600 bg-clip-text text-transparent">دیجی‌مارکت</span>
                <p className="text-[10px] text-gray-400 -mt-0.5">پنل مدیریت</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('home')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-violet-200 shadow-sm">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">فروشگاه</span>
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-200">
              A
            </div>
          </div>
        </header>
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('home')} className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <span className="text-white font-bold text-lg">DM</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-gray-800 text-lg leading-tight">دیجی‌مارکت</h1>
                  <p className="text-[10px] text-gray-400 -mt-0.5">فروشگاه محصولات دیجیتال</p>
                </div>
              </button>

              {/* Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                <button onClick={() => navigate('home')} className={`px-4 py-2 rounded-xl text-sm transition-colors ${state.currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  خانه
                </button>
                <button onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: '' }); navigate('products'); }} className={`px-4 py-2 rounded-xl text-sm transition-colors ${state.currentPage === 'products' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  محصولات
                </button>
                <button onClick={() => navigate('admin')} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1">
                  <LayoutDashboard className="w-4 h-4" />
                  پنل مدیریت
                </button>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                  value={state.searchQuery}
                  onChange={(e) => {
                    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
                    if (state.currentPage !== 'products') navigate('products');
                  }}
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Favorites */}
              <button
                onClick={() => navigate('favorites')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-500" />
                {state.favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {state.favorites.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-500" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              {state.user ? (
                <button onClick={() => navigate('dashboard')} className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {state.user.name[0]}
                  </div>
                  <span className="text-sm text-blue-700 font-medium">{state.user.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  ورود / ثبت‌نام
                </button>
              )}

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <div className="relative mb-4">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={state.searchQuery}
                  onChange={(e) => {
                    dispatch({ type: 'SET_SEARCH', payload: e.target.value });
                    navigate('products');
                  }}
                  className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>
              <button onClick={() => navigate('home')} className="w-full text-right px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <Home className="w-4 h-4" /> خانه
              </button>
              <button onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: '' }); navigate('products'); }} className="w-full text-right px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <Package className="w-4 h-4" /> محصولات
              </button>
              <button onClick={() => navigate('favorites')} className="w-full text-right px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <Heart className="w-4 h-4" /> علاقه‌مندی‌ها ({state.favorites.length})
              </button>
              <button onClick={() => navigate('cart')} className="w-full text-right px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <ShoppingCart className="w-4 h-4" /> سبد خرید ({cartCount})
              </button>
              <button onClick={() => navigate('admin')} className="w-full text-right px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" /> پنل مدیریت
              </button>
              {!state.user && (
                <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="w-full text-right px-4 py-3 rounded-xl text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-3 font-medium">
                  <LogIn className="w-4 h-4" /> ورود / ثبت‌نام
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">DM</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">دیجی‌مارکت</h3>
                  <p className="text-xs text-gray-500">فروشگاه محصولات دیجیتال</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                پلتفرم جامع فروش محصولات دیجیتال با ضمانت اصالت، قیمت شفاف و ارسال سریع به سراسر ایران.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('home')} className="hover:text-white transition-colors">صفحه اصلی</button></li>
                <li><button onClick={() => navigate('products')} className="hover:text-white transition-colors">محصولات</button></li>
                <li><button onClick={() => navigate('cart')} className="hover:text-white transition-colors">سبد خرید</button></li>
                <li><button onClick={() => navigate('admin')} className="hover:text-white transition-colors">پنل مدیریت</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">خدمات مشتریان</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-white transition-colors cursor-pointer">پیگیری سفارش</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">شرایط بازگشت</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">گارانتی محصولات</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">سوالات متداول</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-sm">
                <li>تلفن: ۰۲۱-۹۱۰۰۹۱۰۰</li>
                <li>ایمیل: info@digimarket.ir</li>
                <li>پشتیبانی: ۲۴ ساعته، ۷ روز هفته</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">کليه حقوق اين سايت متعلق به دیجی‌مارکت می‌باشد. ۱۴۰۳</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg">نماد اعتماد الکترونیکی</span>
              <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg">ساماندهی</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md animate-fade-in shadow-2xl">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                <span className="text-white font-bold text-2xl">DM</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">ورود به دیجی‌مارکت</h2>
              <p className="text-sm text-gray-500 mt-1">برای خرید و پیگیری سفارش‌ها وارد شوید</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">شماره موبایل</label>
                <input
                  type="tel"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!loginPhone || !loginName}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                دریافت کد تایید
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">یا ورود با</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  گوگل
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  ایمیل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
