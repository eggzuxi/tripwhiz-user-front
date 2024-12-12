import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";


const Loading = <LoadingPage></LoadingPage>
const Luggage = lazy(() => import("../pages/luggage/LuggagePage"))
const LuggageStorage = lazy(() => import("../pages/luggage/LuggageStoragePage"))
const LuggageMove = lazy(() => import("../pages/luggage/LuggageMovePage"))

const luggageRouter = {

    path: '/luggage',
    children: [
        {
            path: "",
            element: <Suspense fallback={Loading}><Luggage/></Suspense>
        },
        {
            path: "storage",
            element: <Suspense fallback={Loading}><LuggageStorage/></Suspense>
        },
        {
            path: "move",
            element: <Suspense fallback={Loading}><LuggageMove/></Suspense>
        }
    ]
}

export default luggageRouter