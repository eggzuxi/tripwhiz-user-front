import {ReactElement} from "react";
import {useCartStore} from "../../store/useCartStore.ts";



function CartComponent(): ReactElement {

    const cartItems = useCartStore((state) => state.cartItems);
    const changeQty = useCartStore((state) => state.changeQty);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);

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
                <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mt-4">
                    Clear Cart
                </button>
            )}
        </div>
    );
}

export default CartComponent;