import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import memberRouter from "./memberRouter.tsx";


const MainPage = lazy(() => import("../pages/MainPage"))
const LoadingPage = lazy(() => import("../pages/LoadingPage"))

export const Loading = <LoadingPage/>


const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    memberRouter
])

export default mainRouter