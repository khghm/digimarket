import { useApp } from '../store';
import { products, categories, formatPrice, getDiscountPercent } from '../data/products';
import AdvancedCarousel from '../components/AdvancedCarousel';
import { ShoppingCart, Heart, ChevronLeft, Star, Truck, Shield, Headphones, Award, Zap, Cpu, Smartphone, Laptop, Watch, Gamepad2, Headphones as HeadphonesIcon, Monitor, Keyboard } from 'lucide-react';

export default function HomePage() {
  const { dispatch } = useApp();

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel */}
      <section className="relative">
        <AdvancedCarousel 
          products={products.slice(0, 5)}
          variant="hero"
          autoPlay={true}
          interval={6000}
        />
      </section>

      {/* Trust Badges */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Truck, title: 'ارسال سریع', desc: 'تحویل اکسپرس به سراسر کشور', color: 'from-slate-900 to-slate-700' },
              { icon: Shield, title: 'ضمانت اصالت', desc: 'تمامی محصولات اورجینال', color: 'from-indigo-900 to-indigo-700' },
              { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی در خدمت شما', color: 'from-emerald-700 to-emerald-500' },
              { icon: Award, title: 'بهترین قیمت', desc: 'تضمین بهترین قیمت بازار', color: 'from-orange-600 to-orange-500' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 card-hover hover:border-slate-300 shadow-soft hover:shadow-hover group">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">دسته‌بندی محصولات</h2>
            <p className="text-gray-500">محصولات مورد نظر خود را پیدا کنید</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-700 transition-colors"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: cat.id });
                dispatch({ type: 'SET_PAGE', payload: 'products' });
              }}
              className="group bg-white rounded-2xl p-4 text-center border border-gray-100 card-hover hover:border-indigo-200 shadow-soft hover:shadow-hover"
            >
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center mb-3 group-hover:from-slate-200 group-hover:to-slate-100 transition-all">
                <CategoryIcon name={cat.icon} />
              </div>
              <h3 className="text-xs font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{cat.name}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{cat.count} محصول</p>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Sale Carousel */}
      <section className="relative py-10 sm:py-16 overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">پیشنهادات شگفت‌انگیز</h2>
              </div>
              <p className="text-gray-500">تخفیف‌های ویژه با زمان محدود</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-lg">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-bold">فعال</span>
            </div>
          </div>
          <AdvancedCarousel 
            products={products.filter(p => p.originalPrice)}
            variant="featured"
            autoPlay={true}
            interval={4000}
          />
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">محصولات ویژه</h2>
            <p className="text-gray-500">منتخب بهترین محصولات</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-700 transition-colors"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <AdvancedCarousel 
          products={products.filter(p => p.badge)}
          variant="featured"
          autoPlay={true}
          interval={5000}
        />
      </section>

      {/* Mobile & Tablet Carousel */}
      <section className="relative py-10 sm:py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-1/2 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">موبایل و تبلت</h2>
              <p className="text-gray-500">جدیدترین گوشی‌ها و تبلت‌ها</p>
            </div>
            <button
              onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: 'mobile' }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }}
              className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-700 transition-colors"
            >
              مشاهده همه
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <AdvancedCarousel 
            products={products.filter(p => p.category === 'mobile')}
            variant="featured"
            autoPlay={true}
            interval={5000}
          />
        </div>
      </section>

      {/* Gaming Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">دنیای گیمینگ</h2>
            <p className="text-gray-500">کنسول، لوازم جانبی و بازی</p>
          </div>
          <button
            onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: 'gaming' }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }}
            className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-700 transition-colors"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <AdvancedCarousel 
          products={products.filter(p => p.category === 'gaming')}
          variant="featured"
          autoPlay={true}
          interval={5000}
        />
      </section>

      {/* Laptop Carousel */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">لپ‌تاپ و کامپیوتر</h2>
              <p className="text-gray-500">بهترین لپ‌تاپ‌ها برای هر نیاز</p>
            </div>
            <button
              onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: 'laptop' }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }}
              className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-700 transition-colors"
            >
              مشاهده همه
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <AdvancedCarousel 
            products={products.filter(p => p.category === 'laptop')}
            variant="featured"
            autoPlay={true}
            interval={5000}
          />
        </div>
      </section>

      {/* All Products Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">همه محصولات</h2>
            <p className="text-gray-500">کاوش در میان تمام محصولات</p>
          </div>
        </div>
        <AdvancedCarousel 
          products={products}
          variant="compact"
          autoPlay={false}
        />
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">فروشگاه خود را بسازید</h2>
            <p className="text-slate-300 mb-6 max-w-lg">
              با پلتفرم دیجی‌مارکت، کسب‌وکار دیجیتال خود را بدون نیاز به دانش فنی راه‌اندازی کنید.
            </p>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'admin' })}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all shadow-lg transform hover:scale-105"
            >
              ورود به پنل مدیریت
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const iconClass = "w-7 h-7 text-slate-700";
  switch (name) {
    case 'smartphone': return <Smartphone className={iconClass} />;
    case 'laptop': return <Laptop className={iconClass} />;
    case 'cpu': return <Cpu className={iconClass} />;
    case 'watch': return <Watch className={iconClass} />;
    case 'gamepad': return <Gamepad2 className={iconClass} />;
    case 'headphones': return <HeadphonesIcon className={iconClass} />;
    case 'monitor': return <Monitor className={iconClass} />;
    case 'keyboard': return <Keyboard className={iconClass} />;
    default: return <Cpu className={iconClass} />;
  }
}
