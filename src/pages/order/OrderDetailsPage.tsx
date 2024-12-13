
import { useParams, useLocation } from "react-router-dom";
import OrderDetails from "../../components/order/OrderDetails.tsx";

function OrderDetailsPage(): JSX.Element {
    // URL에서 orderId를 가져옴
    const { id } = useParams<{ id: string }>();
    // location.state를 통해 email 전달 (라우터 설정에서 넘겨줬다고 가정)
    const location = useLocation();
    const email = location.state?.email || "";

    if (!id || !email) {
        return <p>Error: Missing order ID or email.</p>;
    }

    return (
        <OrderDetails
            ono={parseInt(id, 10)} // 문자열을 숫자로 변환
            email={email} // email 전달
        />
    );
}

export default OrderDetailsPage;
