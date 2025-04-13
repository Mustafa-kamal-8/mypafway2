import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set: any) => ({
  cart: [],
  addToCart: (product: Product) =>
    set((state: { cart: { id: number; quantity: number; }[]; }) => {
      const existingProduct = state.cart.find((item: { id: number; }) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item: { id: number; quantity: number; }) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id: number) =>
    set((state: { cart: any[]; }) => ({
      cart: state.cart.filter((product) => product.id !== id),
    })),
  updateQuantity: (id: number, quantity: number) =>
    set((state: { cart: { id: number; }[]; }) => ({
      cart: state.cart.map((product: { id: number; }) =>
        product.id === id ? { ...product, quantity } : product
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));
