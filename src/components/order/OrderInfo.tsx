import React from "react";
import { useNavigate } from "react-router-dom";
import { cartStore } from "../../store/CartStore";
import { createOrder } from "../../api/orderAPI.ts";

const OrderInfo: React.FC = () => {
    // Zustand 상태를 안전하게 읽기
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

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const pickUpDate = formatDateForServer(new Date(pickupdate));

    const handlePayment = async () => {
        if (!spno || !pickUpDate || cartItems.length === 0) {
            alert("지점, 픽업 날짜, 또는 장바구니 항목이 모두 있어야 결제를 진행할 수 있습니다.");
            return;
        }

        // 이메일을 cartItems에서 가져옴
        const email = cartItems[0]?.email;
        if (!email) {
            alert("이메일 정보가 누락되었습니다.");
            return;
        }

        console.log("결제 진행 중...");
        console.log("이메일:", email);
        console.log("지점 번호:", spno);
        console.log("픽업 날짜:", pickUpDate);
        console.log("상품:", cartItems);

        try {
            // 주문 생성 API 호출
            const response = await createOrder(email, spno, pickUpDate);
            console.log("주문 생성 응답:", response);

            alert("결제가 완료되었습니다!");
            navigate("/side/myorder"); // 주문 내역 페이지로 이동
        } catch (error) {
            console.error("결제 중 오류 발생:", error);
            alert("결제에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>주문 정보</h1>

            <div style={{ marginBottom: "20px" }}>
                <h2>지점 번호:</h2>
                <p>{spno ? spno : "지점이 선택되지 않았습니다."}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h2>픽업 날짜:</h2>
                <p>{pickUpDate ? pickUpDate : "픽업 날짜가 선택되지 않았습니다."}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h2>상품 목록:</h2>
                {cartItems.length > 0 ? (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {cartItems.map((item) => (
                            <li
                                key={item.pno}
                                style={{
                                    borderBottom: "1px solid #ccc",
                                    marginBottom: "10px",
                                    paddingBottom: "10px",
                                }}
                            >
                                <p>상품명: {item.pname}</p>
                                <p>수량: {item.qty}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>상품 목록이 비어 있습니다.</p>
                )}
            </div>

            <button
                onClick={handlePayment}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                결제하기
            </button>
        </div>
    );
};

export default OrderInfo;
