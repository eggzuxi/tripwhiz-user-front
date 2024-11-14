import CartComponent from "../../components/cart/CartComponent.tsx";
import BaseLayout from "../../layouts/BaseLayout.tsx";


function CartPage() {




    return (
        <div>
            <BaseLayout>
                cart page
                <CartComponent/>
            </BaseLayout>
        </div>
    );
}

export default CartPage;