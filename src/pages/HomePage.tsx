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
      <section className="relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'ارسال سریع', desc: 'تحویل اکسپرس به سراسر کشور', color: 'from-cyan-500 to-blue-500' },
              { icon: Shield, title: 'ضمانت اصالت', desc: 'تمامی محصولات اورجینال', color: 'from-purple-500 to-pink-500' },
              { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی در خدمت شما', color: 'from-green-500 to-emerald-500' },
              { icon: Award, title: 'بهترین قیمت', desc: 'تضمین بهترین قیمت بازار', color: 'from-amber-500 to-orange-500' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-5 hover:scale-105 transition-all duration-300 group">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-2xl transition-all`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">دسته‌بندی محصولات</h2>
            <p className="text-gray-400">محصولات مورد نظر خود را پیدا کنید</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                dispatch({ type: 'SET_CATEGORY', payload: cat.id });
                dispatch({ type: 'SET_PAGE', payload: 'products' });
              }}
              className="group glass rounded-2xl p-4 text-center hover:scale-105 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all">
                <CategoryIcon name={cat.icon} />
              </div>
              <h3 className="text-xs font-medium text-white group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
              <p className="text-[10px] text-gray-500 mt-1">{cat.count} محصول</p>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Sale Carousel */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-orange-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                <h2 className="text-3xl font-bold text-white">پیشنهادات شگفت‌انگیز</h2>
              </div>
              <p className="text-gray-400">تخفیف‌های ویژه با زمان محدود</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-red-500/50">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">فعال</span>
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
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">محصولات ویژه</h2>
            <p className="text-gray-400">منتخب بهترین محصولات</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors"
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
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">موبایل و تبلت</h2>
              <p className="text-gray-400">جدیدترین گوشی‌ها و تبلت‌ها</p>
            </div>
            <button
              onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: 'mobile' }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }}
              className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors"
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
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">دنیای گیمینگ</h2>
            <p className="text-gray-400">کنسول، لوازم جانبی و بازی</p>
          </div>
          <button
            onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: 'gaming' }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }}
            className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors"
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
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-rose-900/20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">لپ‌تاپ و کامپیوتر</h2>
              <p className="text-gray-400">بهترین لپ‌تاپ‌ها برای هر نیاز</p>
            </div>
            <button
              onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: 'laptop' }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }}
              className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors"
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
            <h2 className="text-3xl font-bold text-white mb-2">همه محصولات</h2>
            <p className="text-gray-400">کاوش در میان تمام محصولات</p>
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
        <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">فروشگاه خود را بسازید</h2>
            <p className="text-gray-300 mb-6 max-w-lg">
              با پلتفرم دیجی‌مارکت، کسب‌وکار دیجیتال خود را بدون نیاز به دانش فنی راه‌اندازی کنید.
            </p>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'admin' })}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-violet-500/50 transition-all transform hover:scale-105"
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
  const iconClass = "w-7 h-7 text-cyan-400";
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
