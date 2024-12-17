import {createBrowserRouter, Outlet} from "react-router-dom";
import {lazy, Suspense} from "react";
import BaseLayout from "../layouts/BaseLayout"; // BaseLayout 임포트
import memberRouter from "./memberRouter";
import productRouter from "./productRouter";
import cartRouter from "./cartRouter";
import paymentRouter from "./paymentRouter";
// import GoogleMapsPage from "../pages/map/GoogleMapsPage";
import sidebarRouter from "./sidebarRouter.tsx";
import OrderRouter from "./orderRouter.tsx";
import luggageRouter from "./luggageRouter.tsx";


const LoadingPage = lazy(() => import("../pages/LoadingPage"));
const PickupPage = lazy(() => import("../pages/pickup/PickupPage"));
const DestinationPage = lazy(() => import("../pages/destination/DestinationPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ThemePage = lazy(() => import("../pages/theme/ThemePage"));
// const HealthCheck = lazy(() => import("../pages/health/HealthCheckPage.tsx"));

const Loading = <LoadingPage/>;

const mainRouter = createBrowserRouter([
    {
        // 최상위 경로에 BaseLayout을 공통 레이아웃으로 추가
        element: (
            <BaseLayout>
                <Outlet/> {/* 자식 컴포넌트를 여기에 렌더링 */}
            </BaseLayout>
        ),
        children: [

            {
                path: "/main",
                element: <Suspense fallback={Loading}><MainPage/></Suspense>
            },
            {
                path: "/main",
                element: <Suspense fallback={Loading}><MainPage/></Suspense>
            },
            {
                path: "/pickup",
                element: <Suspense fallback={Loading}><PickupPage/></Suspense>
            },
            // {
            //     path: "/maps",
            //     element: <Suspense fallback={Loading}><GoogleMapsPage/></Suspense>
            // },
            productRouter,
            memberRouter,
            cartRouter,
            paymentRouter,
            sidebarRouter,
            OrderRouter,
            luggageRouter
        ],
    },
    {
        path: "/",
        element: <Suspense fallback={Loading}><DestinationPage/></Suspense>
    },
    {
        path: "/theme",
        element: <Suspense fallback={Loading}><ThemePage/></Suspense>
    },
]);

export default mainRouter;