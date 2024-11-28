import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>
const ProductList = lazy(() => import("../pages/products/ProductListPage"))
const ProductRead = lazy(() => import("../pages/products/ProductReadPage"))


const productRouter = {

    path: '/product',
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductList/></Suspense>
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        },
        {
            path: "read/:pno",
            element: <Suspense fallback={Loading}><ProductRead/></Suspense>
        }

    ]

};

export default productRouter
