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
        className="relative w-full min-h-[550px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[550px] flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center py-12">
            {/* Text Content */}
            <div className="text-white space-y-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-300" />
                <span className="text-sm font-medium text-cyan-300">محصول ویژه</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {products[currentIndex]?.name}
              </h2>
              <p className="text-lg text-indigo-100">
                {products[currentIndex]?.description}
              </p>
              <div className="flex items-center gap-4">
                <div>
                  {products[currentIndex]?.originalPrice && (
                    <span className="text-sm text-indigo-200 line-through block">
                      {formatPrice(products[currentIndex].originalPrice)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(products[currentIndex]?.price || 0)}
                  </span>
                </div>
                {products[currentIndex]?.originalPrice && (
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                    {getDiscountPercent(products[currentIndex].price, products[currentIndex].originalPrice)}% تخفیف
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product: products[currentIndex] } })}
                  className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_PRODUCT', payload: products[currentIndex].id })}
                  className="px-8 py-3 border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  مشاهده جزئیات
                </button>
              </div>
            </div>

            {/* Product Image with 3D Effect */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Product Image */}
                <div 
                  key={currentIndex}
                  className="relative animate-slide-in-right"
                >
                  <img
                    src={products[currentIndex]?.image}
                    alt={products[currentIndex]?.name}
                    className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      filter: 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.3))',
                    }}
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${
                i === currentIndex 
                  ? 'w-12 h-2 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
              }`}
            />
          ))}
        </div>
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
        <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
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
              <span className="text-xs text-gray-400 line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_TO_CART', payload: { product } });
                }}
                className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all transform hover:scale-110"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
