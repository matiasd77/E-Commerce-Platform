import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../services/productService';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CartState {
  items: CartItem[];
  shippingAddress?: ShippingAddress;
}

const loadCart = (): CartState => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveCart = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState: CartState = loadCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      saveCart(state);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      saveCart(state);
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.product.id !== action.payload.productId);
        }
      }
      saveCart(state);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state);
    },
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setShippingAddress } = cartSlice.actions;
export default cartSlice.reducer; 