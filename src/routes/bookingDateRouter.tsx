import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";

const Loading = <LoadingPage></LoadingPage>
const Booking = lazy(() => import("../pages/bookingDate/BookingDatePage"))


const bookingDateRouter = {

    path: "/booking",
    children: [

        {
            path: "",
            element: <Suspense fallback={Loading}><Booking/></Suspense>
        }
    ]
};

export default bookingDateRouter;