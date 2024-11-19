import {Outlet} from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout.tsx";

function CartIndex() {
    return (
        <div>
            <BaseLayout>
                Cart Index
                <Outlet></Outlet>
            </BaseLayout>

        </div>
    );
}

export default CartIndex;