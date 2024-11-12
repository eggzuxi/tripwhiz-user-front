import {ReactElement} from "react";
import {cartStore} from "../../store/CartStore.ts";
import {useNavigate} from "react-router-dom";



function CartComponent(): ReactElement {

    const cartItems = cartStore((state) => state.cartItems);
    const changeQty = cartStore((state) => state.changeQty);
    const removeFromCart = cartStore((state) => state.removeFromCart);
    const clearCart = cartStore((state) => state.clearCart);
    const navigate = useNavigate();

    console.log(cartItems);

    const listLI = cartItems.map(item => {

        //아이템 객체에서 product와 qty 구조분해할당
        const { product, qty } = item;

        return (
            <li key={product.pno} className='flex flex-wrap border-2 gap-3'>
                {/* 제품 이미지가 있을 경우 표시합니다. */}
                {product.fileName && <img className='w-1/4' src={product.fileName}/>}
                {product.pname} - {product.price} - {qty} - {product.price * qty}
                <button onClick={() => changeQty(product.pno, 1)}> +</button>
                <button onClick={() => changeQty(product.pno, -1)}> -</button>
                <button onClick={() => removeFromCart(product.pno)}> Remove</button>
            </li>
        )
    })

    return (
        <div>
            <h2>Cart Component</h2>
            <ul>
                {listLI}
            </ul>
            {cartItems.length > 0 && (
                <div className="mt-4">
                    <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mr-2">
                        Clear Cart
                    </button>
                    <button onClick={() => navigate('/product/list')} className="bg-yellow-500 text-white px-4 py-2">
                        List
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartComponent;