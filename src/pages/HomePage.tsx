import { useApp } from '../store';
import { products, categories, formatPrice, getDiscountPercent } from '../data/products';
import { ShoppingCart, Heart, ChevronLeft, Star, Truck, Shield, Headphones } from 'lucide-react';

export default function HomePage() {
  const { dispatch } = useApp();

  const featuredProducts = products.filter(p => p.badge);
  const discountedProducts = products.filter(p => p.originalPrice);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6">
                بزرگ‌ترین فروشگاه محصولات دیجیتال ایران
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                تجربه خرید دیجیتال
                <br />
                <span className="text-blue-200">به سبک آینده</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                از موبایل و لپ‌تاپ تا قطعات سخت‌افزاری و لوازم گیمینگ، همه در یکجا با ضمانت اصالت، قیمت شفاف و ارسال سریع.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
                  className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  مشاهده محصولات
                </button>
                <button className="border-2 border-white/50 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                  پیشنهادهای ویژه
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://image.qwenlm.ai/generated-images/ba731b34-b2e7-4296-8ea1-78508b76ff59/_result.png"
                alt="محصول ویژه"
                className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'ارسال سریع', desc: 'تحویل اکسپرس به سراسر کشور' },
              { icon: Shield, title: 'ضمانت اصالت', desc: 'تمامی محصولات اورجینال و رسمی' },
              { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی در خدمت شما' },
              { icon: Star, title: 'بهترین قیمت', desc: 'تضمین بهترین قیمت بازار' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">دسته‌بندی محصولات</h2>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
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
              className="group bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center mb-3 group-hover:from-blue-100 group-hover:to-indigo-200 transition-all">
                <CategoryIcon name={cat.icon} />
              </div>
              <h3 className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
              <p className="text-[10px] text-gray-400 mt-1">{cat.count} محصول</p>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      {discountedProducts.length > 0 && (
        <section className="bg-gradient-to-l from-red-50 to-orange-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">پیشنهادات شگفت‌انگیز</h2>
                <p className="text-gray-500 text-sm mt-1">تخفیف‌های ویژه با زمان محدود</p>
              </div>
              <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium">فعال</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {discountedProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">محصولات ویژه</h2>
          <button
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
          >
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">جدیدترین محصولات</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-l from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">فروشگاه خود را بسازید</h2>
            <p className="text-indigo-100 mb-6 max-w-lg">
              با پلتفرم دیجی‌مارکت، کسب‌وکار دیجیتال خود را بدون نیاز به دانش فنی راه‌اندازی کنید.
            </p>
            <button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all">
              شروع رایگان
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, compact }: { product: typeof products[0]; compact?: boolean }) {
  const { dispatch, state } = useApp();
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const isFav = state.favorites.includes(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative p-4 cursor-pointer" onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}>
        {product.badge && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-lg font-medium z-10">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-lg font-medium z-10">
            {discount}% تخفیف
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-contain group-hover:scale-105 transition-transform duration-300 ${compact ? 'h-32' : 'h-44'}`}
        />
        <button
          onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id }); }}
          className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="p-4 pt-0">
        <h3
          className="font-medium text-gray-800 text-sm mb-1 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-bold text-blue-700 text-sm">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product } })}
            className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const iconClass = "w-7 h-7 text-blue-600";
  switch (name) {
    case 'smartphone': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case 'laptop': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'cpu': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
    case 'watch': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'gamepad': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;
    case 'headphones': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;
    case 'monitor': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'keyboard': return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    default: return <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
  }
}
