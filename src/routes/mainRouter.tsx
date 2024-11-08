import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import memberRouter from "./memberRouter.tsx";

import PaymentCheckout from "../pages/payment/PaymentCheckout.tsx";
import PaymentSuccess from "../pages/payment/PaymentSuccess.tsx";
import PaymentFail from "../pages/payment/PaymentFail.tsx";
import productRouter from "./productRouter.tsx";
import cartRouter from "./cartRouter.tsx";
import PickupPage from "../pages/pickup/PickupPage.tsx";


const MainPage = lazy(() => import("../pages/MainPage"))
const LoadingPage = lazy(() => import("../pages/LoadingPage"))

export const Loading = <LoadingPage/>


const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    {
        path: "/payment",
        element: <Suspense fallback={Loading}><PaymentCheckout /></Suspense>
    },
    {
        path: "/payment/success",
        element: <Suspense fallback={Loading}><PaymentSuccess /></Suspense>  // 결제 성공 시 표시할 페이지
    },
    {
        path: "/fail",
        element: <Suspense fallback={Loading}><PaymentFail /></Suspense>  // 결제 실패 시 표시할 페이지
    },
    {
        path: "/pickup",
        element: <Suspense fallback={Loading}><PickupPage /></Suspense>
    },


    productRouter,
    memberRouter,
    cartRouter,
])

export default mainRouter