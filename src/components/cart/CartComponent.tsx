import { useEffect, useState } from "react";
import { getList, deleteCartItem, clearCart, changeQty } from "../../api/cartAPI";
import { ICartItems } from "../../types/cart.ts";
import { useNavigate } from "react-router-dom";
import { cartStore } from "../../store/CartStore.ts";

const CartComponent = () => {
    const [cartItems, setCartItems] = useState<ICartItems[]>([]);
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

    const handleUpdateQty = async (pno: number, isIncrease: boolean) => {
        const item = cartItems.find((item) => item.pno === pno);

        if (item) {
            const newQty = isIncrease ? item.qty + 1 : item.qty - 1;
            if (newQty < 1) return;

            try {
                await changeQty(pno, newQty);
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.pno === pno ? { ...item, qty: newQty } : item
                    )
                );
            } catch (error) {
                console.error("Failed to update quantity:", error);
            }
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            console.warn("Cart is empty. Cannot proceed to checkout.");
            return;
        }
        cartStore.setState({ cartItems });
        navigate("/order/spot");
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">장바구니가 비어 있습니다.</p>
            ) : (
                <>
                    {/* 장바구니 아이템 리스트 */}
                    <div className="space-y-3 mb-24">
                        {cartItems.map((item) => (
                            <div
                                key={item.pno}
                                className="relative flex items-start gap-2 p-2 border rounded-xl bg-white"
                            >
                                {/* 삭제 버튼 (X 아이콘) */}
                                <button
                                    onClick={() => handleDelete(item.pno)}
                                    className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
                                >
                                    &times;
                                </button>

                                {/* 이미지 */}
                                <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0">
                                    <img
                                        src={`http://localhost:8081/uploads/${item.pno}.jpg`}
                                        alt={item.pname}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>

                                {/* 상품 정보 */}
                                <div className="flex-1 mt-2">
                                    {/* 상품명 */}
                                    <h2 className="text-sm text-left text-gray-500 font-bold mb-1">{item.pname}</h2>

                                    {/* 가격과 수량 조절 */}
                                    <div className="flex justify-between items-center mt-4">
                                        {/* 가격 */}
                                        <p className="text-gray-500 font-semibold text-[15px]">
                                            {(item.price * item.qty).toLocaleString()}원
                                        </p>

                                        {/* 수량 조절 */}
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleUpdateQty(item.pno, false)}
                                                className="px-2 py-1 border border-gray-200 text-gray-700 rounded-md bg-transparent hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-medium">{item.qty}</span>
                                            <button
                                                onClick={() => handleUpdateQty(item.pno, true)}
                                                className="px-2 py-1 border border-gray-200 text-gray-700 rounded-md bg-transparent hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 총 금액 및 하단 버튼 */}
                    <div className="fixed bottom-2 left-0 w-full bg-white px-4 py-3">
                        <div className="flex justify-between items-center text-lg font-semibold mb-3">
                            <span>총 금액:</span>
                            <span>
                                {totalAmount.toLocaleString()}원
                            </span>
                        </div>
                        <div className="flex justify-between items-center gap-4 px-4">
                            {/* 결제하기 버튼: 흰 배경, 테두리 색상 #1D2D5F */}
                            <button
                                onClick={handleCheckout}
                                className="w-full px-6 py-2 text-[#1D2D5F] rounded-md border"
                                style={{borderColor: "#1D2D5F", backgroundColor: "white"}}
                            >
                                결제하기
                            </button>

                            {/* 비우기 버튼: 배경색 #1D2D5F, 흰 텍스트 */}
                            <button
                                onClick={clearCart}
                                className="w-full px-6 py-2 text-white rounded-md"
                                style={{backgroundColor: "#1D2D5F"}}
                            >
                                비우기
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartComponent;
