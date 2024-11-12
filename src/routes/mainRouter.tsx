import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import memberRouter from "./memberRouter.tsx";
import productRouter from "./productRouter.tsx";
import cartRouter from "./cartRouter.tsx";
import paymentRouter from "./paymentRouter.tsx";
import GoogleMapsPage from "../pages/map/GoogleMapsPage.tsx";

const MainPage = lazy(() => import("../pages/MainPage"))
const LoadingPage = lazy(() => import("../pages/LoadingPage"))
const PickupPage = lazy(() => import("../pages/pickup/PickupPage"))

export const Loading = <LoadingPage/>

const mainRouter = createBrowserRouter([

    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    {
        path: "/pickup",
        element: <Suspense fallback={Loading}><PickupPage/></Suspense>
    },
    {
        path: "/maps",
        element: <Suspense fallback={Loading}><GoogleMapsPage /></Suspense>
    },
    productRouter,
    memberRouter,
    cartRouter,
    paymentRouter

])

export default mainRouter