import {Outlet} from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout.tsx";

function ProductIndex() {
    return (
        <div>
            <BaseLayout></BaseLayout>
            Product Index
            <Outlet></Outlet>
        </div>
    );
}

export default ProductIndex;