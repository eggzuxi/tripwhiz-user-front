import React from "react";
import { useNavigate } from "react-router-dom";
import { cartStore } from "../../store/CartStore";
import { createOrder } from "../../api/orderAPI";

const OrderInfo: React.FC = () => {
    const cartItems = cartStore((state) => state.cartItems);
    const spno = cartStore((state) => state.spno);
    const pickupdate = cartStore((state) => state.pickUpDate);
    const navigate = useNavigate();

    const formatDateForServer = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const pickUpDate = formatDateForServer(new Date(pickupdate));

    const handlePayment = async () => {
        if (!spno || !pickUpDate || cartItems.length === 0) {
            alert("지점, 픽업 날짜, 또는 장바구니 항목이 모두 있어야 결제를 진행할 수 있습니다.");
            return;
        }

        const email = cartItems[0]?.email;
        if (!email) {
            alert("이메일 정보가 누락되었습니다.");
            return;
        }

        try {
            console.log("주문 요청 데이터:", { email, spno, pickUpDate });

            const response = await createOrder(email, spno, pickUpDate);
            console.log("주문 생성 응답:", response);

            alert("결제가 완료되었습니다!");
            navigate("/payment");
        } catch (error) {
            console.error("결제 중 오류 발생:", error);
            alert("결제에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>주문 정보</h1>
            <p>지점 번호: {spno}</p>
            <p>픽업 날짜: {pickUpDate}</p>
            <button onClick={handlePayment}>결제하기</button>
        </div>
    );
};

export default OrderInfo;
