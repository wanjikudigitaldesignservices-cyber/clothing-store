import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  variant_id: string
  product_name: string
  size?: string
  color?: string
  price: number
  quantity: number
  image_url?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variant_id: string) => void
  updateQuantity: (variant_id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.variant_id === item.variant_id)
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.variant_id === item.variant_id 
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          }
        }
        return { items: [...state.items, item] }
      }),
      removeItem: (variant_id) => set((state) => ({
        items: state.items.filter(i => i.variant_id !== variant_id)
      })),
      updateQuantity: (variant_id, quantity) => set((state) => ({
        items: state.items.map(i => 
          i.variant_id === variant_id ? { ...i, quantity } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'clothing-store-cart',
    }
  )
)
