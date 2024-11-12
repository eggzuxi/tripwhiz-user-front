import {ICartItem, IProduct} from "../types/product.ts";
import {create, StateCreator} from "zustand";
import {persist, PersistOptions} from "zustand/middleware";


interface CartStore {
    cartItems: ICartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (pno: number) => void;
    changeQty: (pno: number, qty: number) => void;
    clearCart: () => void;
}

type CartStorePersist = (
    config: StateCreator<CartStore>,
    options: PersistOptions<CartStore>
) => StateCreator<CartStore>;


// Custom storage for Zustand to handle JSON serialization
const customLocalStorage = {
    getItem: (name: string) => {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    },
    setItem: (name: string, value: any) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    }
};


export const cartStore = create<CartStore>(
    (persist as CartStorePersist)(
        (set) => ({
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
        }),
        {
            name: 'cart-storage', // localStorage에 저장될 키 이름
            storage: customLocalStorage, // 기본값이 localStorage
        }
    )
);