import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>
const Checkout = lazy(() => import("../pages/payment/PaymentCheckout"))
const Success = lazy(() => import("../pages/payment/PaymentSuccess"))
const Fail = lazy(() => import("../pages/payment/PaymentFail"))

const paymentRouter = {

    path: "/payment",
    element: <Suspense fallback={Loading}><Checkout/></Suspense>,
    children: [

        {
            path: "/payment/success",
            element: <Suspense fallback={Loading}><Success/></Suspense>  // 결제 성공 시 표시할 페이지
        },
        {
            path: "/payment/fail",
            element: <Suspense fallback={Loading}><Fail/></Suspense>  // 결제 실패 시 표시할 페이지
        },

    ]

}

export default paymentRouter