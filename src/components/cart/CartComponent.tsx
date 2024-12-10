import { useEffect, useState } from "react";
import { getList, addCart, deleteCartItem, clearCart } from "../../api/cartAPI";
import { ICartItems } from "../../types/cart.ts";
import {useNavigate} from "react-router-dom";
// import {cartStore} from "../../store/CartStore.ts";

const initialState: ICartItems[] = [
    {
        email: "",
        bno: 0,
        pno: 0,
        pname: "",
        price: 0,
        qty: 0,
        delFlag: false,
    },
];

const CartComponent = () => {
    const [cartItems, setCartItems] = useState<ICartItems[]>(initialState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        setLoading(true);
        try {
            const items = await getList();
            setCartItems(items);
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (pno: number) => {
        try {
            await deleteCartItem(pno);
            setCartItems((prevItems) => prevItems.filter((item) => item.pno !== pno));
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            setCartItems([]);
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    // const handleCheckout = () => {
    //     // 결제 페이지로 이동하면서 cartItems를 state로 전달
    //     navigate("/maps", { state: { cartItems } });
    // };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            console.warn("Cart is empty. Cannot proceed to checkout.");
            return;
        }
        console.log("Navigating to checkout with cart items:", cartItems);
        // cartStore.setState({ cartItems });
        navigate("/maps");
    };

    // const handleIncreaseQty = async (pno: number) => {
    //     const item = cartItems.find((item) => item.pno === pno);
    //     if (item) {
    //         const newQty = item.qty + 1;
    //         try {
    //             await addCart(pno, newQty);
    //             setCartItems((prevItems) =>
    //                 prevItems.map((item) =>
    //                     item.pno === pno ? { ...item, qty: newQty } : item
    //                 )
    //             );
    //         } catch (error) {
    //             console.error("Failed to increase quantity:", error);
    //         }
    //     }
    // };
    //
    // const handleDecreaseQty = async (pno: number) => {
    //     const item = cartItems.find((item) => item.pno === pno);
    //     if (item && item.qty > 1) {
    //         const newQty = item.qty - 1;
    //         try {
    //             await addCart(pno, newQty);
    //             setCartItems((prevItems) =>
    //                 prevItems.map((item) =>
    //                     item.pno === pno ? { ...item, qty: newQty } : item
    //                 )
    //             );
    //         } catch (error) {
    //             console.error("Failed to decrease quantity:", error);
    //         }
    //     }
    // };

    const handleUpdateQty = async (pno: number, isIncrease: boolean) => {
        const item = cartItems.find((item) => item.pno === pno);

        if (item) {
            const newQty = isIncrease ? item.qty + 1 : item.qty - 1;

            // 수량이 1 미만이 되지 않도록 제한
            if (newQty < 1) {
                console.warn("Quantity cannot be less than 1.");
                return;
            }

            try {
                // addCart 호출 시 필요한 pname과 price를 함께 전달
                await addCart(pno, item.pname, item.price, newQty);

                // // 상태 업데이트
                // setCartItems((prevItems) =>
                //     prevItems.map((item) =>
                //         item.pno === pno ? { ...item, qty: newQty } : item
                //     )
                // );
                // 서버에서 최신 장바구니 데이터를 다시 가져옴
                await fetchCartItems();
            } catch (error) {
                console.error("Failed to update quantity:", error);
            }
        }
    };




    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-center mb-6">장바구니</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.pno}
                            className="flex justify-between items-center border p-4 rounded-md shadow-md bg-white"
                        >
                            {/* 상품 정보 */}
                            <div>
                                <h2 className="text-lg font-bold">상품명: {item.pname}</h2>
                                <p className="text-gray-500">가격: {(item.price * item.qty).toLocaleString()}원</p>
                            </div>

                            {/* 수량 조절 버튼 */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleUpdateQty(item.pno, false)} //수량 감소
                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                                >
                                    -
                                </button>
                                <span className="text-gray-700 font-medium">{item.qty}</span>
                                <button
                                    onClick={() => handleUpdateQty(item.pno, true)} //수량 증가
                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                                >
                                    +
                                </button>
                            </div>

                            {/* 삭제 버튼 */}
                            <button
                                onClick={() => handleDelete(item.pno)}
                                className="px-3 py-1 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* 하단 버튼들 */}
                    <div className="flex justify-between mt-6 gap-2">
                        <button
                            onClick={() => navigate("/product/list")}
                            className="px-6 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
                        >
                            목록
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                        >
                            결제
                        </button>
                        <button
                            onClick={handleClearCart}
                            className="px-6 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
                        >
                            비우기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartComponent;
