// import {IProduct} from "../types/product.ts";
import {create, StateCreator} from "zustand";
import {persist, PersistOptions} from "zustand/middleware";
import {ICartItems} from "../types/cart.ts";


interface CartStore {
    cartItems: ICartItems[];
    spno: number | null; // 선택된 지점 번호
    pickUpDate: string; // 선택된 픽업 날짜
    addToCart: (item: ICartItems) => void;
    removeFromCart: (pno: number) => void;
    changeQty: (pno: number, qty: number) => void;
    clearCart: () => void;
    setSpno: (spno: number) => void; // 지점 번호 설정
    setPickUpDate: (date: string) => void; // 픽업 날짜 설정
}

type CartStorePersist = (
    config: StateCreator<CartStore>,
    options: PersistOptions<CartStore>
) => StateCreator<CartStore>;


// Custom storage for Zustand to handle JSON serialization
const customSessionStorage = {
    getItem: (name: string) => {
        const item = sessionStorage.getItem(name);
        return item ? JSON.parse(item) : null;
    },
    setItem: (name: string, value: any) => {
        sessionStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        sessionStorage.removeItem(name);
    }
};


export const cartStore = create<CartStore>(
    (persist as CartStorePersist)(
        (set) => ({
            cartItems: [],
            spno: null, // 초기 선택된 지점 번호
            pickUpDate: "", // 초기 선택된 픽업 날짜

            // 장바구니에 상품 추가 함수
            addToCart: (item) => set((state) => {
                const existingItem = state.cartItems.find((cartItem) => cartItem.pno === item.pno);
                if (existingItem) {
                    //이미 장바구니에 있는 경우 수량 증가
                    existingItem.qty += item.qty;
                    return { cartItems: [...state.cartItems] };
                } else {
                    //새로운 상품 추가
                    return { cartItems: [...state.cartItems, item] };
                }
            }),

            // 장바구니에서 상품 제거 함수
            removeFromCart: (pno) => set((state) => ({
                cartItems: state.cartItems.filter((cartItem) => cartItem.pno !== pno)
            })),

            // 장바구니 상품 수량 변경 함수
            changeQty: (pno, qty) => set((state) => {
                const updatedCartItems = state.cartItems.map((cartItem) =>
                    cartItem.pno === pno ? { ...cartItem, qty: qty } : cartItem
                ).filter((cartItem) => cartItem.qty > 0); // 수량이 0 이하인 경우 목록에서 제거
                return { cartItems: updatedCartItems };
            }),

            // 장바구니 전체 비우기 함수
            clearCart: () => set({ cartItems: [] }),

            // 지점 번호 설정 함수
            setSpno: (spno) => {
                console.log(`Setting spno: ${spno}`); // 로그 추가
                set({ spno });
            },

            // 픽업 날짜 설정 함수
            setPickUpDate: (date) => set({ pickUpDate: date }),

        }),
        {
            name: 'cart-storage', // 세션 스토리지에 저장될 키 이름
            storage: customSessionStorage, // 세션 스토리지 사용
        }
    )
);