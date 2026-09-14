import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from './data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
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
  | { type: 'LOGOUT' };

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
