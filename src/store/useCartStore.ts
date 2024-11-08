import {ICartItem, IProduct} from "../types/product.ts";
import {create} from "zustand";


interface CartStore {
    cartItems: ICartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (pno: number) => void;
    changeQty: (pno: number, qty: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cartItems: [],

    // 장바구니에 상품 추가 함수
    addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.product.pno === product.pno);
        if (existingItem) {
            existingItem.qty += 1;
            return { cartItems: [...state.cartItems] };
        } else {
            return { cartItems: [...state.cartItems, { product, qty: 1 }] };
        }
    }),

    // 장바구니에서 상품 제거 함수
    removeFromCart: (pno) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.product.pno !== pno)
    })),

    // 장바구니 상품 수량 변경 함수
    changeQty: (pno, qty) => set((state) => {
        const updatedCartItems = state.cartItems.map(item =>
            item.product.pno === pno ? { ...item, qty: item.qty + qty } : item
        ).filter(item => item.qty > 0); // 수량이 0 이하인 경우 목록에서 제거
        return { cartItems: updatedCartItems };
    }),

    // 장바구니 전체 비우기 함수
    clearCart: () => set({ cartItems: [] })
}));