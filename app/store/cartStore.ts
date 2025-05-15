import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  total: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "CART_ITEMS";

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  total: 0,

  addToCart: (item) => {
    const existing = get().cart.find((i) => i.id === item.id);
    let updatedCart;
    if (existing) {
      if (existing.quantity >= 10) return; // Max 10 items
      updatedCart = get().cart.map((i) =>
        i.id === item.id
          ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
          : i
      );
    } else {
      updatedCart = [...get().cart, { ...item, quantity: 1 }];
    }
    set({ cart: updatedCart, total: calculateTotal(updatedCart) });
    persistCart(updatedCart);
  },

  increment: (id) => {
    const updatedCart = get().cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
        : item
    );
    set({ cart: updatedCart, total: calculateTotal(updatedCart) });
    persistCart(updatedCart);
  },

  decrement: (id) => {
    const updatedCart = get()
      .cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    set({ cart: updatedCart, total: calculateTotal(updatedCart) });
    persistCart(updatedCart);
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((item) => item.id !== id);
    set({ cart: updatedCart, total: calculateTotal(updatedCart) });
    persistCart(updatedCart);
  },

  clearCart: () => {
    set({ cart: [], total: 0 });
    persistCart([]);
  },
}));

const persistCart = async (cart: CartItem[]) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const loadCartFromStorage = async () => {
  try {
    const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      useCartStore.setState({
        cart: parsed,
        total: calculateTotal(parsed),
      });
    }
  } catch (error) {
    console.error("Error loading cart:", error);
  }
};

const calculateTotal = (cart: CartItem[]) =>
  cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
