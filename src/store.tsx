import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from './data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  paymentMethod: string;
  trackingCode?: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'user' | 'stock' | 'payment' | 'review';
  read: boolean;
  date: string;
}

interface AppState {
  cart: CartItem[];
  favorites: string[];
  compareList: string[];
  recentlyViewed: string[];
  user: { name: string; phone: string; email: string } | null;
  currentPage: string;
  selectedProductId: string | null;
  searchQuery: string;
  selectedCategory: string;
  adminTab: string;
  orders: Order[];
  notifications: AdminNotification[];
  adminProducts: Product[];
  showAddProductModal: boolean;
  editingProductId: string | null;
  adminSearchQuery: string;
  adminFilterCategory: string;
  adminFilterStatus: string;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: { product: Product; color?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'TOGGLE_COMPARE'; payload: string }
  | { type: 'ADD_RECENTLY_VIEWED'; payload: string }
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_PRODUCT'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_ADMIN_TAB'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN'; payload: { name: string; phone: string; email: string } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'DELETE_ORDER'; payload: string }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: AdminNotification }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'SET_SHOW_ADD_PRODUCT'; payload: boolean }
  | { type: 'SET_EDITING_PRODUCT'; payload: string | null }
  | { type: 'SET_ADMIN_SEARCH'; payload: string }
  | { type: 'SET_ADMIN_FILTER_CATEGORY'; payload: string }
  | { type: 'SET_ADMIN_FILTER_STATUS'; payload: string };

const initialOrders: Order[] = [
  { id: 'DM-A3F2K9', customer: 'علی محمدی', phone: '۰۹۱۲۳۴۵۶۷۸۹', items: [], total: 89500000, status: 'shipped', date: '۱۴۰۳/۰۹/۱۵', address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳', paymentMethod: 'آنلاین', trackingCode: 'TRK-987654321' },
  { id: 'DM-B7G1L4', customer: 'سارا احمدی', phone: '۰۹۱۳۴۵۶۷۸۹۰', items: [], total: 145000000, status: 'processing', date: '۱۴۰۳/۰۹/۱۵', address: 'اصفهان، خیابان چهارباغ، پلاک ۴۵', paymentMethod: 'آنلاین' },
  { id: 'DM-C2H8M6', customer: 'محمد رضایی', phone: '۰۹۱۱۲۳۴۵۶۷۸', items: [], total: 32500000, status: 'delivered', date: '۱۴۰۳/۰۹/۱۴', address: 'شیراز، بلوار زند، پلاک ۷۸', paymentMethod: 'کیف پول', trackingCode: 'TRK-123456789' },
  { id: 'DM-D5J3N8', customer: 'فاطمه کریمی', phone: '۰۹۱۵۶۷۸۹۰۱۲', items: [], total: 18500000, status: 'pending', date: '۱۴۰۳/۰۹/۱۴', address: 'مشهد، بلوار وکیل‌آباد، پلاک ۲۱', paymentMethod: 'آنلاین' },
  { id: 'DM-E9K6P1', customer: 'حسین نوری', phone: '۰۹۱۶۷۸۹۰۱۲۳', items: [], total: 48500000, status: 'shipped', date: '۱۴۰۳/۰۹/۱۳', address: 'تبریز، خیابان امام، پلاک ۵۶', paymentMethod: 'آنلاین', trackingCode: 'TRK-456789123' },
  { id: 'DM-F1L8Q4', customer: 'مریم حسینی', phone: '۰۹۱۷۸۹۰۱۲۳۴', items: [], total: 78000000, status: 'delivered', date: '۱۴۰۳/۰۹/۱۲', address: 'اهواز، کیانپارس، پلاک ۳۴', paymentMethod: 'آنلاین', trackingCode: 'TRK-789123456' },
  { id: 'DM-G4M2R7', customer: 'رضا عباسی', phone: '۰۹۱۸۹۰۱۲۳۴۵', items: [], total: 12500000, status: 'cancelled', date: '۱۴۰۳/۰۹/۱۱', address: 'کرج، مهرشهر، پلاک ۸۹', paymentMethod: 'آنلاین' },
  { id: 'DM-H7N5S3', customer: 'زهرا موسوی', phone: '۰۹۱۹۰۱۲۳۴۵۶', items: [], total: 95000000, status: 'processing', date: '۱۴۰۳/۰۹/۱۰', address: 'قم، بلوار امین، پلاک ۱۲', paymentMethod: 'کیف پول' },
];

const initialNotifications: AdminNotification[] = [
  { id: '1', title: 'سفارش جدید', message: 'سفارش DM-H7N5S3 توسط زهرا موسوی ثبت شد', type: 'order', read: false, date: '۵ دقیقه پیش' },
  { id: '2', title: 'موجودی کم', message: 'موجودی کارت گرافیک RTX 4090 به ۵ عدد رسید', type: 'stock', read: false, date: '۱ ساعت پیش' },
  { id: '3', title: 'پرداخت تایید شد', message: 'پرداخت سفارش DM-A3F2K9 تایید شد', type: 'payment', read: false, date: '۲ ساعت پیش' },
  { id: '4', title: 'نظر جدید', message: 'نظر جدید برای آیفون ۱۵ پرو مکس ثبت شد', type: 'review', read: true, date: '۳ ساعت پیش' },
  { id: '5', title: 'کاربر جدید', message: 'کاربر جدید با شماره ۰۹۱۲۰۰۰۰۰۰۰ ثبت‌نام کرد', type: 'user', read: true, date: '۵ ساعت پیش' },
];

const initialState: AppState = {
  cart: [],
  favorites: [],
  compareList: [],
  recentlyViewed: [],
  user: null,
  currentPage: 'home',
  selectedProductId: null,
  searchQuery: '',
  selectedCategory: '',
  adminTab: 'dashboard',
  orders: initialOrders,
  notifications: initialNotifications,
  adminProducts: [],
  showAddProductModal: false,
  editingProductId: null,
  adminSearchQuery: '',
  adminFilterCategory: '',
  adminFilterStatus: '',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.product.id === action.payload.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload.product, quantity: 1, selectedColor: action.payload.color }],
      };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    case 'TOGGLE_COMPARE':
      return {
        ...state,
        compareList: state.compareList.includes(action.payload)
          ? state.compareList.filter(id => id !== action.payload)
          : [...state.compareList, action.payload],
      };
    case 'ADD_RECENTLY_VIEWED':
      return {
        ...state,
        recentlyViewed: [action.payload, ...state.recentlyViewed.filter(id => id !== action.payload)].slice(0, 10),
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_PRODUCT':
      return { ...state, selectedProductId: action.payload, currentPage: 'product' };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_ADMIN_TAB':
      return { ...state, adminTab: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(o => o.id === action.payload.id ? { ...o, status: action.payload.status } : o),
      };
    case 'DELETE_ORDER':
      return { ...state, orders: state.orders.filter(o => o.id !== action.payload) };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n),
      };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'DELETE_PRODUCT':
      return { ...state, orders: state.orders };
    case 'UPDATE_PRODUCT':
      return { ...state };
    case 'ADD_PRODUCT':
      return { ...state };
    case 'SET_SHOW_ADD_PRODUCT':
      return { ...state, showAddProductModal: action.payload };
    case 'SET_EDITING_PRODUCT':
      return { ...state, editingProductId: action.payload };
    case 'SET_ADMIN_SEARCH':
      return { ...state, adminSearchQuery: action.payload };
    case 'SET_ADMIN_FILTER_CATEGORY':
      return { ...state, adminFilterCategory: action.payload };
    case 'SET_ADMIN_FILTER_STATUS':
      return { ...state, adminFilterStatus: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
