import { ReactElement } from "react";
import { cartStore } from "../../store/CartStore.ts";
import { useNavigate } from "react-router-dom";

function CartComponent(): ReactElement {
    const cartItems = cartStore((state) => state.cartItems);
    const changeQty = cartStore((state) => state.changeQty);
    const removeFromCart = cartStore((state) => state.removeFromCart);
    const clearCart = cartStore((state) => state.clearCart);
    const navigate = useNavigate();

    const handleCheckout = () => {
        // 결제 페이지로 이동하면서 cartItems를 state로 전달
        navigate("/payment", { state: { cartItems } });
    };

    const listLI = cartItems.map((item) => {
        const { product, qty } = item;

        return (
            <li
                key={product.pno}
                className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg mb-4"
            >
                {/* 제품 이미지 */}
                {product.fileName && (
                    <img
                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                        src={product.fileName}
                        alt={product.pname}
                    />
                )}

                {/* 제품 정보 */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                        {product.pname}
                    </h3>
                    <p className="text-sm text-gray-500">
                        가격: {(product.price * qty).toLocaleString()}원
                    </p>
                </div>

                {/* 수량 변경 버튼 */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => changeQty(product.pno, -1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                    >
                        -
                    </button>
                    <span className="text-gray-700 font-medium">{qty}</span>
                    <button
                        onClick={() => changeQty(product.pno, 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                    >
                        +
                    </button>
                </div>

                {/* 제거 버튼 */}
                <button
                    onClick={() => removeFromCart(product.pno)}
                    className="px-3 py-1 text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
            </li>
        );
    });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cart Component</h2>
            <h2 className="text-xl font-bold text-gray-800 mb-6">장바구니</h2>
            <ul className="space-y-4">{listLI}</ul>

            {cartItems.length > 0 && (
                <div className="mt-6 flex justify-center gap-4">
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
                        onClick={clearCart}
                        className="px-6 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
                    >
                        비우기
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartComponent;
