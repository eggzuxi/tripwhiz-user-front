import {Outlet} from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout.tsx";

function ProductIndex() {
    return (
            <BaseLayout>
                Product Index Page

                <div className='w-full'>
                    <Outlet></Outlet>
                </div>
            </BaseLayout>
    );
}

export default ProductIndex;