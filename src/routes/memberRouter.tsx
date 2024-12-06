import {lazy, Suspense} from "react";


const LoadingPage = lazy(() => import("../pages/LoadingPage"))
const LoginPage = lazy(() => import("../pages/member/LoginPage"))
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))
const GoogleRedirect = lazy(() => import("../pages/member/GoogleRedirectPage"))

const Loading = <LoadingPage></LoadingPage>

const memberRouter = {
    path: "/member",
    children: [
        {
            path: "login",
            element: <Suspense fallback={Loading}><LoginPage/></Suspense>

        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
        },
        {
            path: "google",
            element: <Suspense fallback={Loading}><GoogleRedirect/></Suspense>

        }
    ]
}

export default memberRouter