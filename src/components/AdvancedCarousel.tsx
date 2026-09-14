import { useState, useEffect, useRef } from 'react';
import { useApp } from '../store';
import { Product, formatPrice, getDiscountPercent } from '../data/products';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Zap, Sparkles } from 'lucide-react';

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
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (autoPlay && !isHovered && products.length > 1) {
      intervalRef.current = setInterval(() => {
        setDirection('right');
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, isHovered, products.length, interval]);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const goNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goPrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (variant === 'hero') {
    return (
      <div 
        className="relative w-full h-[500px] overflow-hidden rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-white space-y-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">محصول ویژه</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {products[currentIndex]?.name}
              </h2>
              <p className="text-lg text-gray-300">
                {products[currentIndex]?.description}
              </p>
              <div className="flex items-center gap-4">
                <div>
                  {products[currentIndex]?.originalPrice && (
                    <span className="text-sm text-gray-400 line-through block">
                      {formatPrice(products[currentIndex].originalPrice)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-cyan-400">
                    {formatPrice(products[currentIndex]?.price || 0)}
                  </span>
                </div>
                {products[currentIndex]?.originalPrice && (
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {getDiscountPercent(products[currentIndex].price, products[currentIndex].originalPrice)}% تخفیف
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product: products[currentIndex] } })}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_PRODUCT', payload: products[currentIndex].id })}
                  className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  مشاهده جزئیات
                </button>
              </div>
            </div>

            {/* Product Image with 3D Effect */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                
                {/* Product Image */}
                <div 
                  key={currentIndex}
                  className="relative animate-slide-in-right"
                  style={{
                    animation: 'slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <img
                    src={products[currentIndex]?.image}
                    alt={products[currentIndex]?.name}
                    className="w-full h-auto drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
                    style={{
                      filter: 'drop-shadow(0 20px 40px rgba(0, 200, 255, 0.3))',
                    }}
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
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
                  ? 'w-12 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full' 
                  : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
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
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all"
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
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

function ProductCard3D({ product }: { product: Product }) {
  const { dispatch, state } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const isFav = state.favorites.includes(product.id);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
    >
      {/* Card */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
        {/* Glow Effect on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
          
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
            style={{
              filter: isHovered ? 'drop-shadow(0 10px 20px rgba(0, 200, 255, 0.4))' : 'none',
            }}
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
            className="absolute bottom-3 left-3 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Brand */}
          <p className="text-xs text-cyan-400 font-medium">{product.brand}</p>
          
          {/* Name */}
          <h3 className="text-sm font-bold text-white line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-400">{product.rating} ({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {formatPrice(product.price)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'ADD_TO_CART', payload: { product } });
                }}
                className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-110"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
