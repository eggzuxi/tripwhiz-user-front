import { loadTossPayments, TossPayments } from "@tosspayments/tosspayments-sdk";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom"; // TossPayments 타입 import

function PaymentCheckout() {
    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
    const customerKey = generateRandomString();

    const location = useLocation();  // useLocation 사용하여 전달된 state 받기
    const cartItems = location.state?.cartItems || [];  // 전달된 장바구니 정보

    // const amount = {
    //     currency: "KRW",
    //     value: cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0), // 금액 계산
    // };

    const amount = {
        currency: "KRW",
        value: 500, // 금액 계산
    };

    const orderName =
        cartItems.length > 0
            ? cartItems.map(item => `${item.product.pname} (${item.qty}개)`).join(", ")
            : "기본 상품명";

    useEffect(() => {
        async function fetchPayment() {
            try {
                const tossPayments: TossPayments = await loadTossPayments(clientKey); // TossPayments 타입 지정

                const payment = tossPayments.payment({
                    customerKey,
                });

                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }
        fetchPayment();
    }, [clientKey]);

    const [payment, setPayment] = useState<TossPayments | null>(null); // TossPayments 타입 명시
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    function selectPaymentMethod(method: string) {
        console.log("Selected payment method:", method);
        setSelectedPaymentMethod(method);
    }

    async function requestPayment() {
        console.log("==============================3");

        if (!payment) {
            console.error("Payment object is not initialized.");
            return;  // payment 객체가 null일 경우 결제 요청을 중단
        }


        try {
            await payment.requestPayment({
                method: selectedPaymentMethod || "CARD",
                amount,
                orderId: generateRandomString(),
                orderName,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
            });
        } catch (error) {
            console.error("결제 요청 중 오류 발생:", error);
        }
    }

    return (
        <div className="flex flex-col items-center mb-6 w-full p-20 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-6">일반 결제</h2>
            <button
                className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`}
                onClick={() => selectPaymentMethod("CARD")}
            >
                카드
            </button>
            <button
                className={`button2 ${selectedPaymentMethod === "TRANSFER" ? "active" : ""}`}
                onClick={() => selectPaymentMethod("TRANSFER")}
            >
                계좌이체
            </button>
            <button
                className={`button2 ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "active" : ""}`}
                onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}
            >
                가상계좌
            </button>
            <button
                className={`button2 ${selectedPaymentMethod === "MOBILE_PHONE" ? "active" : ""}`}
                onClick={() => selectPaymentMethod("MOBILE_PHONE")}
            >
                휴대폰
            </button>
            <button
                className={`button2 ${selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? "active" : ""}`}
                onClick={() => selectPaymentMethod("CULTURE_GIFT_CERTIFICATE")}
            >
                문화상품권
            </button>
            <button
                className={`button2 ${selectedPaymentMethod === "FOREIGN_EASY_PAY" ? "active" : ""}`}
                onClick={() => selectPaymentMethod("FOREIGN_EASY_PAY")}
            >
                해외간편결제
            </button>
            <button
                className="w-full py-2 bg-blue-600 text-white text-md font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-6"
                onClick={() => requestPayment()}
            >
                결제하기
            </button>
        </div>
    );
}

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}

export default PaymentCheckout;
