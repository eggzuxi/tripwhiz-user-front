import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>
const CustomerService = lazy(() => import("../pages/sidebar/CustomerServicePage.tsx"))
const MyPage = lazy(() => import("../pages/sidebar/MyPagePage.tsx"))
const Notice = lazy(() => import("../pages/sidebar/NoticePage.tsx"))
const Service = lazy(() => import("../pages/sidebar/ServicePage.tsx"))

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
            path: "service",
            element: <Suspense fallback={Loading}><Service/></Suspense>
        }

    ]

};

export default sidebarRouter
