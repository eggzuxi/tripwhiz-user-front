// 특정 주문의 상세 정보를 표시하는 컴포넌트
import React, { useState, useEffect } from "react";
import { fetchOrderDetails, completeOrder } from "../../api/orderAPI";
import { OrderReadDTO } from "../../types/ordertype";

interface OrderDetailsProps {
    ono: number;
    email: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ ono, email }) => {
    const [order, setOrder] = useState<OrderReadDTO | null>(null);
    const [loading, setLoading] = useState(false);

    // 주문 상세 정보를 가져오는 함수
    const loadOrderDetails = async () => {
        setLoading(true);
        try {
            const data = await fetchOrderDetails(ono);
            setOrder(data);
        } catch (error) {
            console.error("Failed to fetch order details:", error);
        } finally {
            setLoading(false);
        }
    };

    // 주문 완료 버튼 클릭 시 호출되는 함수
    const handleCompleteOrder = async () => {
        if (!order) return;
        try {
            await completeOrder({
                ono: order.ono, // 주문 번호
                email, // 유저 이메일
                fcmToken: "USER_FCM_TOKEN_HERE", // 유저 FCM 토큰 (실제 값으로 교체)
            });
            alert("Order completed successfully! Notified the store owner.");
        } catch (error) {
            console.error("Failed to complete order:", error);
            alert("Failed to notify the store owner.");
        }
    };

    // 컴포넌트가 렌더링되었을 때 주문 정보를 불러옴
    useEffect(() => {
        loadOrderDetails();
    }, [ono, email]);

    if (loading) return <p>Loading...</p>;
    if (!order) return <p>No order found.</p>;

    return (
        <div>
            <h1>Order #{order.ono}</h1>
            <p>Status: {order.status}</p>
            <p>Total Price: {order.totalPrice} USD</p>
            <p>Pick Up Date: {order.pickUpDate}</p>
            <button onClick={handleCompleteOrder}>Complete Order</button>
        </div>
    );
};

export default OrderDetails;
