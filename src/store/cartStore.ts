// import { create } from 'zustand';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartState {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   setCartData: (products: any[]) => void; 
// }

// export const useCartStore = create<CartState>((set) => ({
//   cart: [],
//   addToCart: (product: Product) =>
//     set((state) => {
//       const existingProduct = state.cart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return {
//           cart: state.cart.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         };
//       }
//       return { cart: [...state.cart, { ...product, quantity: 1 }] };
//     }),
//   removeFromCart: (id: number) =>
//     set((state) => ({
//       cart: state.cart.filter((product) => product.id !== id),
//     })),
//   updateQuantity: (id: number, quantity: number) =>
//     set((state) => ({
//       cart: state.cart.map((product) =>
//         product.id === id ? { ...product, quantity } : product
//       ),
//     })),
//   clearCart: () => set({ cart: [] }),
  
  
//   setCartData: (products: any[]) =>
//     set(() => ({
//       cart: products.map((item) => ({
//         id: item.product.id,
//         name: item.product.name,
//         price: parseFloat(item.product.price),
//         image: item.product.image_link,
//         quantity: parseInt(item.quantity),
//       })),
//     })),
// }));
