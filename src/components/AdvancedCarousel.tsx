import { useState, useEffect, useRef } from 'react';
import { useApp } from '../store';
import { Product, formatPrice, getDiscountPercent } from '../data/products';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Zap } from 'lucide-react';

interface AdvancedCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  variant?: 'hero' | 'featured' | 'compact';
  autoPlay?: boolean;
  interval?: number;
}

export default function AdvancedCarousel({ 
  products, 
  title, 
  subtitle, 
  variant = 'featured',
  autoPlay = true,
  interval = 5000 
}: AdvancedCarouselProps) {
  const { dispatch, state } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (autoPlay && !isHovered && products.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, isHovered, products.length, interval]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (variant === 'hero') {
    return (
      <div 
        className="relative w-full min-h-[600px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background with Particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-pink-600/40 animate-gradient"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full particle-animate"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl hero-animate-glow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl hero-animate-glow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl hero-animate-glow" style={{ animationDelay: '4s' }}></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[600px] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center py-16">
            {/* Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-cyan-300">محصول ویژه</span>
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block">{products[currentIndex]?.name}</span>
              </h2>

              {/* Description */}
              <p className="text-xl text-indigo-100 leading-relaxed max-w-lg">
                {products[currentIndex]?.description}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-6">
                <div>
                  {products[currentIndex]?.originalPrice && (
                    <span className="text-lg text-indigo-300 line-through block mb-1">
                      {formatPrice(products[currentIndex].originalPrice)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(products[currentIndex]?.price || 0)}
                    </span>
                  </div>
                </div>
                {products[currentIndex]?.originalPrice && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 blur-lg opacity-50"></div>
                    <span className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                      {getDiscountPercent(products[currentIndex].price, products[currentIndex].originalPrice)}% تخفیف
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product: products[currentIndex] } })}
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105 flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <ShoppingCart className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">افزودن به سبد</span>
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_PRODUCT', payload: products[currentIndex].id })}
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm hover:border-white/50"
                >
                  مشاهده جزئیات
                </button>
              </div>
            </div>

        {/* Product Image with Advanced Effects */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            {/* Multiple Glow Layers - Brand Colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-30 hero-animate-glow"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-20 hero-animate-glow" style={{ animationDelay: '1s' }}></div>
            
            {/* Product Image Container */}
            <div 
              key={currentIndex}
              className="relative hero-animate-float"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent hero-animate-shine"></div>
              </div>

              {/* Product Image */}
              <img
                src={products[currentIndex]?.image}
                alt={products[currentIndex]?.name}
                className="w-full h-auto relative z-10 transform hover:scale-110 transition-transform duration-700"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.2))',
                }}
              />
            </div>

            {/* Floating Decorative Elements - Brand Colors */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-40 hero-animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl blur-2xl opacity-40 hero-animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 -right-12 w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full blur-xl opacity-30 hero-animate-float" style={{ animationDelay: '2.5s' }}></div>
          </div>
        </div>          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all shadow-2xl"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
        <button
          onClick={goNext}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all shadow-2xl"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 relative ${
                i === currentIndex 
                  ? 'w-16 h-2' 
                  : 'w-2 h-2 hover:w-4'
              }`}
            >
              <div className={`absolute inset-0 rounded-full ${
                i === currentIndex 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/50' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}></div>
              {i === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 blur-md opacity-50"></div>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    );
  }

  // Featured/Compact Carousel
  return (
    <div className="relative">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-soft"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-soft"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(${currentIndex * (100 / getVisibleCount(variant))}%)`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / getVisibleCount(variant)}%` }}
            >
              <ProductCard3D product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-slate-900 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

function ProductCard3D({ product }: { product: Product }) {
  const { dispatch, state } = useApp();
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const isFav = state.favorites.includes(product.id);

  return (
    <div
      className="relative group cursor-pointer card-hover"
      onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
    >
      {/* Card */}
      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-hover hover:border-indigo-200">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          {product.badge && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
              {product.badge}
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
              {discount}%
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
            }}
            className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Brand */}
          <p className="text-xs text-indigo-600 font-medium">{product.brand}</p>
          
          {/* Name */}
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-500">{product.rating} ({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_TO_CART', payload: { product } });
                }}
                className="w-10 h-10 bg-gradient-to-r from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-slate-900/20 transition-all transform hover:scale-110"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 via-indigo-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}

function getVisibleCount(variant: string): number {
  switch (variant) {
    case 'compact': return 5;
    case 'featured': return 4;
    default: return 4;
  }
}
