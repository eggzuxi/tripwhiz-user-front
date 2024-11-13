import {ReactElement, useEffect, useState} from "react";
import {useCartStore} from "../../store/useCartStore.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ICartItems} from "../../types/cart.ts";
import {getList} from "../../api/cartAPI.ts";

const initialState:ICartItems[] = [

    {
        product: {
            cno: 0,
            pno: 0,
            category: "",
            pname: "",
            pdesc: "",
            price: 0,
            delflag: false,
        },
        qty: 0
    }

]

function CartComponent(): ReactElement {

    // const cartItems = useCartStore((state) => state.cartItems);
    const changeQty = useCartStore((state) => state.changeQty);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState(initialState);

    useEffect(() => {

        setTimeout(async () => {

            const data = await getList();
            setCartItems(data);

        }, 600);

    }, [])

    const handleCheckout = () => {
        // 결제 페이지로 이동하면서 cartItems를 state로 전달
        navigate("/payment", { state: { cartItems } });
    };

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
                    <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 ml-4">
                        Check Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartComponent;