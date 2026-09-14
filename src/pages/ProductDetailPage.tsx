import { useState, useEffect } from 'react';
import { useApp } from '../store';
import { products, formatPrice, getDiscountPercent } from '../data/products';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronLeft, Minus, Plus, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const { state, dispatch } = useApp();
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === state.selectedProductId);

  useEffect(() => {
    if (product) {
      dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: product.id });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">محصول موردنظر یافت نشد.</p>
        <button onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })} className="mt-4 text-blue-600 hover:text-blue-700">
          بازگشت به محصولات
        </button>
      </div>
    );
  }

  const discount = getDiscountPercent(product.price, product.originalPrice);
  const isFav = state.favorites.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })} className="hover:text-blue-600">خانه</button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <button onClick={() => { dispatch({ type: 'SET_CATEGORY', payload: product.category }); dispatch({ type: 'SET_PAGE', payload: 'products' }); }} className="hover:text-blue-600">
          {product.category === 'mobile' ? 'موبایل و تبلت' : product.category === 'laptop' ? 'لپ‌تاپ' : product.category}
        </button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-gray-800">{product.name}</span>
      </nav>

      {/* Product Main */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Image Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
          <div className="relative">
            {product.badge && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-lg font-medium z-10">
                {product.badge}
              </span>
            )}
            <img src={product.image} alt={product.name} className="w-full h-80 md:h-96 object-contain" />
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            {product.images.map((img, i) => (
              <div key={i} className="w-16 h-16 border-2 border-blue-500 rounded-xl overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-contain" />
              </div>
            ))}
            <div className="w-16 h-16 border-2 border-gray-200 rounded-xl overflow-hidden flex items-center justify-center text-gray-400 text-xs">
              +{product.images.length}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div>
          <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-600 font-medium mb-1">{product.brand}</p>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{product.name}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id })}
                  className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
                <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                ))}
                <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-400">({product.reviewCount} نظر)</span>
              <span className="text-sm text-green-600 font-medium">موجود در انبار ({product.stock} عدد)</span>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">رنگ: <span className="text-blue-600">{product.colors[selectedColor]}</span></p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`px-4 py-2 rounded-xl text-sm border transition-all ${i === selectedColor ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="border-t border-gray-100 pt-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg font-medium">{discount}% تخفیف</span>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{formatPrice(product.price)}</span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    dispatch({ type: 'ADD_TO_CART', payload: { product, color: product.colors?.[selectedColor] } });
                  }
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                افزودن به سبد خرید
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: `ارسال ${product.deliveryDays} روز کاری` },
                { icon: Shield, text: product.warranty },
                { icon: RotateCcw, text: '۷ روز ضمانت بازگشت' },
                { icon: Check, text: 'ضمانت اصالت کالا' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                  <item.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Seller Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">فروشنده</p>
                  <p className="font-medium text-gray-800">{product.seller}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600">فروشنده معتبر</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-12">
        <div className="flex border-b">
          {[
            { id: 'specs', label: 'مشخصات فنی' },
            { id: 'reviews', label: `نظرات (${product.reviewCount})` },
            { id: 'qa', label: 'پرسش و پاسخ' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'specs' && (
            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-sm text-gray-500">{key}</span>
                  <span className="text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {[
                { name: 'علی محمدی', rating: 5, date: '۱۴۰۳/۰۹/۱۵', text: 'محصول عالی بود. کیفیت ساخت فوق‌العاده و ارسال سریع. کاملاً راضی هستم.' },
                { name: 'سارا احمدی', rating: 4, date: '۱۴۰۳/۰۹/۱۰', text: 'کیفیت خوب و قیمت مناسب. فقط بسته‌بندی می‌تونست بهتر باشه.' },
                { name: 'محمد رضایی', rating: 5, date: '۱۴۰۳/۰۸/۲۸', text: 'بهترین خریدی که تا الان داشتم. حتماً پیشنهاد می‌کنم.' },
              ].map((review, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'qa' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-800 mb-2">آیا این محصول گارانتی بین‌المللی دارد؟</p>
                <p className="text-sm text-gray-600">بله، این محصول دارای گارانتی رسمی ۱۸ ماهه است و خدمات پس از فروش فعال دارد.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-800 mb-2">امکان خرید اقساطی وجود دارد؟</p>
                <p className="text-sm text-gray-600">بله، امکان خرید اقساطی از طریق چک و کارت اعتباری فراهم است.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => dispatch({ type: 'SET_PRODUCT', payload: p.id })}>
                <img src={p.image} alt={p.name} className="w-full h-32 object-contain mb-3" />
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{p.name}</h3>
                <span className="font-bold text-blue-700 text-sm">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
