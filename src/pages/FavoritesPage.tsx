import { useApp } from '../store';
import { products, formatPrice, getDiscountPercent } from '../data/products';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

export default function FavoritesPage() {
  const { state, dispatch } = useApp();
  const favoriteProducts = products.filter(p => state.favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-red-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">لیست علاقه‌مندی‌ها خالی است</h2>
        <p className="text-gray-500 mb-8">محصولات مورد علاقه خود را ذخیره کنید تا بعداً راحت‌تر پیدا کنید.</p>
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          مشاهده محصولات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">علاقه‌مندی‌ها</h1>
          <p className="text-gray-500 text-sm mt-1">{favoriteProducts.length} محصول</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteProducts.map(product => {
          const discount = getDiscountPercent(product.price, product.originalPrice);
          return (
            <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                <img src={product.image} alt={product.name} className="w-full h-44 object-contain group-hover:scale-105 transition-transform duration-300" />
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
                      <span className="text-xs text-gray-400 line-through block">{formatPrice(product.originalPrice)}</span>
                    )}
                    <span className="font-bold text-blue-700 text-sm">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id })}
                      className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product } })}
                      className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
