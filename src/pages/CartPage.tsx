import { useState } from 'react';
import { useApp } from '../store';
import { formatPrice, getDiscountPercent } from '../data/products';
import { Trash2, Minus, Plus, ShoppingBag, CreditCard, Truck, Tag, Check, Shield, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { state, dispatch } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalTotal = state.cart.reduce((sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const discount = originalTotal - subtotal;
  const shippingCost = subtotal > 5000000 ? 0 : 50000;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal - promoDiscount + shippingCost;

  if (state.cart.length === 0 && step !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">سبد خرید شما خالی است</h2>
        <p className="text-gray-500 mb-8">محصولات مورد علاقه خود را به سبد خرید اضافه کنید.</p>
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          مشاهده محصولات
        </button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">سفارش شما با موفقیت ثبت شد</h2>
        <p className="text-gray-500 mb-2">کد پیگیری: <span className="font-mono font-bold text-blue-600">DM-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></p>
        <p className="text-gray-500 mb-8">اطلاعات سفارش و وضعیت ارسال از طریق پیامک به اطلاع شما خواهد رسید.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { dispatch({ type: 'SET_PAGE', payload: 'home' }); dispatch({ type: 'CLEAR_CART' }); }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
          <button
            onClick={() => { dispatch({ type: 'SET_PAGE', payload: 'products' }); dispatch({ type: 'CLEAR_CART' }); }}
            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            ادامه خرید
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {step === 'cart' ? 'سبد خرید' : 'تسویه حساب'}
      </h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        {['سبد خرید', 'تسویه حساب', 'تکمیل'].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              (i === 0 && step === 'cart') || (i === 1 && step === 'checkout')
                ? 'bg-blue-600 text-white'
                : i < (step === 'cart' ? 0 : 1)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {i < (step === 'cart' ? 0 : 1) ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm ${i <= (step === 'cart' ? 0 : 1) ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{s}</span>
            {i < 2 && <div className="w-12 h-px bg-gray-200 mx-2"></div>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items / Checkout Form */}
        <div className="lg:col-span-2">
          {step === 'cart' ? (
            <div className="space-y-4">
              {state.cart.map(item => (
                <div key={item.product.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-contain cursor-pointer"
                    onClick={() => dispatch({ type: 'SET_PRODUCT', payload: item.product.id })}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1">{item.product.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{item.product.brand} | {item.product.warranty}</p>
                    {item.selectedColor && <p className="text-xs text-blue-600 mb-2">رنگ: {item.selectedColor}</p>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity - 1 } })}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity + 1 } })}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-blue-700 text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through block">{formatPrice(item.product.originalPrice * item.quantity)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                    className="self-start w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-6">اطلاعات ارسال</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">نام و نام خانوادگی</label>
                  <input type="text" defaultValue={state.user?.name || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" placeholder="نام کامل" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">شماره موبایل</label>
                  <input type="tel" defaultValue={state.user?.phone || ''} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">استان</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400">
                    <option>تهران</option>
                    <option>اصفهان</option>
                    <option>فارس</option>
                    <option>خراسان رضوی</option>
                    <option>آذربایجان شرقی</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">شهر</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" placeholder="شهر" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">آدرس کامل</label>
                  <textarea className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 resize-none h-20" placeholder="آدرس دقیق پستی"></textarea>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">کد پستی</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" placeholder="کد پستی ۱۰ رقمی" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">پلاک</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400" placeholder="شماره پلاک" />
                </div>
              </div>

              <h3 className="font-bold text-gray-800 mb-4">روش پرداخت</h3>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'online', label: 'پرداخت آنلاین (درگاه بانکی)', icon: CreditCard },
                  { id: 'wallet', label: 'پرداخت از کیف پول', icon: ShoppingBag },
                ].map(method => (
                  <label key={method.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <input type="radio" name="payment" defaultChecked={method.id === 'online'} className="w-4 h-4 text-blue-600" />
                    <method.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>

              <h3 className="font-bold text-gray-800 mb-4">روش ارسال</h3>
              <div className="space-y-3">
                {[
                  { id: 'express', label: 'ارسال اکسپرس (۱-۲ روز کاری)', cost: '۵۰,۰۰۰ تومان' },
                  { id: 'normal', label: 'ارسال عادی (۳-۵ روز کاری)', cost: 'رایگان' },
                ].map(method => (
                  <label key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" defaultChecked={method.id === 'express'} className="w-4 h-4 text-blue-600" />
                      <Truck className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">{method.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{method.cost}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">خلاصه سفارش</h3>

            {/* Promo Code */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="کد تخفیف"
                  className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={() => { if (promoCode) setPromoApplied(true); }}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
              >
                اعمال
              </button>
            </div>
            {promoApplied && (
              <div className="flex items-center gap-2 text-green-600 text-sm mb-4 bg-green-50 p-3 rounded-xl">
                <Check className="w-4 h-4" />
                <span>کد تخفیف ۵٪ اعمال شد</span>
              </div>
            )}

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>جمع کالاها ({state.cart.length} کالا)</span>
                <span>{formatPrice(originalTotal)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>تخفیف کالاها</span>
                <span>-{formatPrice(discount)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>تخفیف کد تخفیف</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>هزینه ارسال</span>
                <span>{shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-base">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-blue-700">{formatPrice(total)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                ادامه و تسویه حساب
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <button
                onClick={() => setStep('success')}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                پرداخت و ثبت سفارش
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5" />
              <span>پرداخت امن با رمزنگاری SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
