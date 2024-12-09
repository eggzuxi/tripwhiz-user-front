import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

// 로딩 컴포넌트
const Loading = <LoadingPage></LoadingPage>;

// Order 관련 페이지 컴포넌트 로드
const OrderList = lazy(() => import("../pages/order/OrderListPage")); // 주문 목록 페이지
const OrderDetails = lazy(() => import("../pages/order/OrderDetailsPage")); // 주문 상세 페이지
const Spot = lazy(() => import("../pages/map/GoogleMapsPage")); // 지점 선택 페이지
const BookingDate = lazy(() => import("../pages/order/BookingDatePage")); // 픽업일 지정 페이지
const OrderInfo = lazy(() => import("../pages/order/OrderInfoPage")); // 주문 확인 페이지

const orderRouter = {
    path: "/order",
    children: [
        {
            path: "spot",
            element: <Suspense fallback={Loading}><Spot/></Suspense>
        },
        {
            path: "pickup",
            element: <Suspense fallback={Loading}><BookingDate/></Suspense>
        },
        {
            path: "info",
            element: <Suspense fallback={Loading}><OrderInfo/></Suspense>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderList /></Suspense>, // 주문 목록 페이지
        },
        {
            path: "details/:id", // 특정 주문 상세 페이지 (id를 동적으로 받음)
            element: <Suspense fallback={Loading}><OrderDetails /></Suspense>,
        },
        {
            path: "",
            element: <Navigate to="list" replace={true}></Navigate>, // 기본 경로를 주문 목록으로 리다이렉트
        },
    ],
};

export default orderRouter;
