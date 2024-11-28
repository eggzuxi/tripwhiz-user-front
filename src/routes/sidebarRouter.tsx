import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>
const CustomerService = lazy(() => import("../pages/sidebar/CustomerServicePage.tsx"))
const MyPage = lazy(() => import("../pages/sidebar/MyPagePage.tsx"))
const Notice = lazy(() => import("../pages/sidebar/NoticePage.tsx"))
const LuggageService = lazy(() => import("../pages/sidebar/LuggageServicePage.tsx"))
const MyOrder = lazy(() => import("../pages/sidebar/MyOrderPage.tsx"))
const MyQr = lazy(() => import("../pages/sidebar/MyQrPage.tsx"))
const TotalProduct = lazy(() => import("../pages/sidebar/TotalProductPage.tsx"))

const sidebarRouter = {

    path: '/side',
    children: [
        {
            path: "customerservice",
            element: <Suspense fallback={Loading}><CustomerService/></Suspense>
        },
        {
            path: "mypage",
            element: <Suspense fallback={Loading}><MyPage/></Suspense>
        },
        {
            path: "notice",
            element: <Suspense fallback={Loading}><Notice/></Suspense>
        },
        {
            path: "LuggageService",
            element: <Suspense fallback={Loading}><LuggageService/></Suspense>
        },
        {
            path: "MyOrder",
            element: <Suspense fallback={Loading}><MyOrder/></Suspense>
        },
        {
            path: "MyQr",
            element: <Suspense fallback={Loading}><MyQr/></Suspense>
        },
        {
            path: "TotalProduct",
            element: <Suspense fallback={Loading}><TotalProduct/></Suspense>
        }

    ]

};

export default sidebarRouter
