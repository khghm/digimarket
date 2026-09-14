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
      <div className="site-border">
        <div className="site-border-inner">
          <div className="min-h-screen bg-gradient-to-bl from-slate-50 via-gray-50 to-indigo-50">
            {/* Admin Top Bar */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-soft">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate('home')} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">DM</span>
                  </div>
                  <div className="hidden sm:block text-right">
                    <span className="font-bold gradient-text">دیجی‌مارکت</span>
                    <p className="text-[10px] text-gray-500 -mt-0.5">پنل مدیریت</p>
                  </div>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('home')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-soft">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">فروشگاه</span>
                </button>
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  A
                </div>
              </div>
            </header>
            {renderPage()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="site-border">
      <div className="site-border-inner">
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-soft">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-6">
              <button onClick={() => navigate('home')} className="flex items-center gap-2">
                <div className="w-11 h-11 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 ring-2 ring-orange-500/20">
                  <span className="text-white font-black text-lg">DM</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-black text-lg leading-tight bg-gradient-to-l from-slate-900 to-slate-700 bg-clip-text text-transparent">دیجی‌مارکت</h1>
                  <p className="text-[10px] text-slate-500 font-medium -mt-0.5">فروشگاه محصولات دیجیتال</p>
                </div>
              </button>
              {/* Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                <button onClick={() => navigate('home')} className={`px-4 py-2 rounded-xl text-sm transition-all ${state.currentPage === 'home' ? 'bg-slate-900 text-white font-medium shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
                  خانه
                </button>
                <button onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: '' }); navigate('products'); }} className={`px-4 py-2 rounded-xl text-sm transition-all ${state.currentPage === 'products' ? 'bg-slate-900 text-white font-medium shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}>
                  محصولات
                </button>
                <button onClick={() => navigate('admin')} className="px-4 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-1">
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
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Favorites */}
              <button
                onClick={() => navigate('favorites')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <Heart className="w-5 h-5 text-slate-700" />
                {state.favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/50">
                    {state.favorites.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <ShoppingCart className="w-5 h-5 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg shadow-orange-500/50">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              {state.user ? (
                <button onClick={() => navigate('dashboard')} className="hidden sm:flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {state.user.name[0]}
                  </div>
                  <span className="text-sm gradient-text font-medium">{state.user.name}</span>
                </button>
              ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-slate-900/20 transition-all transform hover:scale-105 border border-slate-700"
              >
                <LogIn className="w-4 h-4" />
                ورود / ثبت‌نام
              </button>              )}

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
          <div className="lg:hidden border-t border-gray-200 bg-white animate-fade-in">
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
                  className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400"
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
                <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="w-full text-right px-4 py-3 rounded-xl text-sm text-indigo-600 hover:bg-indigo-50 flex items-center gap-3 font-medium">
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
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-12 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-orange-500/30">
                  <span className="text-white font-black">DM</span>
                </div>
                <div>
                  <h3 className="font-black text-lg">دیجی‌مارکت</h3>
                  <p className="text-xs text-slate-400">فروشگاه محصولات دیجیتال</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                پلتفرم جامع فروش محصولات دیجیتال با ضمانت اصالت، قیمت شفاف و ارسال سریع به سراسر ایران.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('home')} className="text-slate-300 hover:text-orange-400 transition-colors">صفحه اصلی</button></li>
                <li><button onClick={() => navigate('products')} className="text-slate-300 hover:text-orange-400 transition-colors">محصولات</button></li>
                <li><button onClick={() => navigate('cart')} className="text-slate-300 hover:text-orange-400 transition-colors">سبد خرید</button></li>
                <li><button onClick={() => navigate('admin')} className="text-slate-300 hover:text-orange-400 transition-colors">پنل مدیریت</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">خدمات مشتریان</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-300 hover:text-orange-400 transition-colors cursor-pointer">پیگیری سفارش</span></li>
                <li><span className="text-slate-300 hover:text-orange-400 transition-colors cursor-pointer">شرایط بازگشت</span></li>
                <li><span className="text-slate-300 hover:text-orange-400 transition-colors cursor-pointer">گارانتی محصولات</span></li>
                <li><span className="text-slate-300 hover:text-orange-400 transition-colors cursor-pointer">سوالات متداول</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>تلفن: ۰۲۱-۹۱۰۰۹۱۰۰</li>
                <li>ایمیل: info@digimarket.ir</li>
                <li>پشتیبانی: ۲۴ ساعته، ۷ روز هفته</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">کليه حقوق اين سايت متعلق به دیجی‌مارکت می‌باشد. ۱۴۰۳</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">نماد اعتماد الکترونیکی</span>
              <span className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">ساماندهی</span>
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
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg ring-2 ring-orange-500/30">
                <span className="text-white font-black text-2xl">DM</span>
              </div>
              <h2 className="text-xl font-black bg-gradient-to-l from-slate-900 to-slate-700 bg-clip-text text-transparent">ورود به دیجی‌مارکت</h2>
              <p className="text-sm text-slate-500 mt-1">برای خرید و پیگیری سفارش‌ها وارد شوید</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">شماره موبایل</label>
                <input
                  type="tel"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!loginPhone || !loginName}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-slate-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 border border-slate-700"
              >
                دریافت کد تایید
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-xs text-gray-400">یا ورود با</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all">
                  گوگل
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all">
                  ایمیل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
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
