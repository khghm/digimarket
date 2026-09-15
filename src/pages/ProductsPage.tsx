import { useState, useMemo } from 'react';
import { useApp } from '../store';
import { products, categories, brands, formatPrice, getDiscountPercent } from '../data/products';
import { Search, SlidersHorizontal, Star, ShoppingCart, Heart, Grid, List, ChevronDown, X, Filter } from 'lucide-react';

export default function ProductsPage() {
  const { state, dispatch } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (state.selectedCategory) {
      result = result.filter(p => p.category === state.selectedCategory);
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.includes(q) || p.brand.includes(q) || p.category.includes(q) || p.description.includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedStatus.length > 0) {
      result = result.filter(p => selectedStatus.includes(p.status));
    }

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (a.status === 'new' ? -1 : 1)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [state.selectedCategory, state.searchQuery, priceRange, selectedBrands, selectedStatus, minRating, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedStatus([]);
    setMinRating(0);
    setPriceRange([0, 200000000]);
    dispatch({ type: 'SET_CATEGORY', payload: '' });
    dispatch({ type: 'SET_SEARCH', payload: '' });
  };

  const activeFilterCount = selectedBrands.length + selectedStatus.length + (minRating > 0 ? 1 : 0) + (state.selectedCategory ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {state.selectedCategory
              ? categories.find(c => c.id === state.selectedCategory)?.name || 'محصولات'
              : 'همه محصولات'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} محصول یافت شد</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
          >
            <Filter className="w-4 h-4" />
            فیلتر
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
          {/* Sort */}
          <div className="relative flex-1 sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm focus:outline-none focus:border-blue-400 cursor-pointer"
            >
              <option value="popular">محبوب‌ترین</option>
              <option value="newest">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {/* View Mode */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                فیلترها
              </span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white rounded-2xl border border-gray-100 p-5 sticky top-24`}>
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                فیلترها
              </h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                فیلترها
              </h3>
            </div>
            <div className="flex items-center justify-between mb-4 hidden lg:flex">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                فیلترها
              </h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600">
                  حذف همه
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">دسته‌بندی</h4>
              <div className="space-y-2">
                <button
                  onClick={() => dispatch({ type: 'SET_CATEGORY', payload: '' })}
                  className={`block w-full text-right text-sm px-3 py-2 rounded-lg transition-colors ${!state.selectedCategory ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  همه دسته‌ها
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat.id })}
                    className={`block w-full text-right text-sm px-3 py-2 rounded-lg transition-colors ${state.selectedCategory === cat.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">برند</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">وضعیت</h4>
              <div className="space-y-2">
                {[
                  { value: 'new', label: 'نو' },
                  { value: 'stock', label: 'استوک' },
                  { value: 'refurbished', label: 'بازسازی‌شده' },
                  { value: 'preorder', label: 'پیش‌سفارش' },
                ].map(s => (
                  <label key={s.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(s.value)}
                      onChange={() => toggleStatus(s.value)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">حداقل امتیاز</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(r => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg w-full ${minRating === r ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span>و بالاتر</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">محدوده قیمت</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={200000000}
                  step={5000000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="mt-4 w-full text-xs text-red-500 hover:text-red-600 lg:hidden">
                حذف همه فیلترها
              </button>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg">محصولی با فیلترهای انتخاب‌شده یافت نشد.</p>
              <button onClick={clearFilters} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                حذف فیلترها
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative p-3 sm:p-4 cursor-pointer" onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}>
                    {product.badge && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-lg font-medium z-10">
                        {product.badge}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-lg font-medium z-10">
                        {getDiscountPercent(product.price, product.originalPrice)}%
                      </span>
                    )}
                    <img src={product.image} alt={product.name} className="w-full h-40 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-300" />
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id }); }}
                      className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`w-4 h-4 ${state.favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <div className="p-3 sm:p-4 pt-0">
                    <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                    <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 cursor-pointer hover:text-blue-600" onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-gray-500">{product.rating} ({product.reviewCount} نظر)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through block">{formatPrice(product.originalPrice)}</span>
                        )}
                        <span className="font-bold text-blue-700">{formatPrice(product.price)}</span>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product } })}
                        className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain cursor-pointer flex-shrink-0"
                    onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                    <h3 className="font-medium text-gray-800 cursor-pointer hover:text-blue-600 line-clamp-2" onClick={() => dispatch({ type: 'SET_PRODUCT', payload: product.id })}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 hidden sm:block">{product.description}</p>
                    <div className="flex items-center gap-3 mt-2 sm:mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-500">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400 hidden sm:inline">{product.warranty}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2 sm:mt-3">
                      <div>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                        <span className="font-bold text-blue-700">{formatPrice(product.price)}</span>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { product } })}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        افزودن به سبد
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
