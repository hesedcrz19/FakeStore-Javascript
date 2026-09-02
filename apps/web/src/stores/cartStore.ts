import type { Cart } from '@/types/cartTypes';
import type { FormattedProduct } from '@/types/formattedProduct';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  cart: Cart;
  cartProducts: FormattedProduct[];
  addItem: (productsId: string) => void;
  removeItem: (productsId: string) => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: {},
      cartProducts: [],
      addItem: (productId) =>
        set((store) => ({
          cart: {
            ...store.cart,
            [productId]: { quantity: (store.cart[productId]?.quantity ?? 0) + 1 },
          },
        })),
      removeItem: (productId) =>
        set((store) => {
          const newCart = { ...store.cart };
          delete newCart[productId];
          return { cart: newCart };
        }),
      increaseItem: (productId) =>
        set((store) => ({
          cart: {
            ...store.cart,
            [productId]: { quantity: (store.cart[productId]?.quantity ?? 0) + 1 },
          },
        })),
      decreaseItem: (productId) =>
        set((store) => {
          const productQuantity = store.cart[productId]?.quantity;
          const newCart = { ...store.cart };

          if (!productQuantity || productQuantity <= 1) {
            delete newCart[productId];
          } else {
            newCart[productId].quantity = productQuantity - 1;
          }
          return {
            cart: newCart,
          };
        }),
      clearCart: () => set(() => ({ cart: {} })),
    }),
    {
      name: 'cart-storage',
      version: 1,
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
