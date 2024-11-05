import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";


const MainPage = lazy(() => import("../pages/MainPage"))
const LoadingPage = lazy(() => import("../pages/LoadingPage"))

const LoginPage = lazy(() => import("../pages/member/LoginPage"))
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))


export const Loading = <LoadingPage/>



const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage/></Suspense> ,
    },
    {
        path: "/member/login",
        element: <Suspense fallback={Loading}><LoginPage/></Suspense>

    },
    {
        path: "/member/kakao",
        element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
    }
])

export default mainRouter