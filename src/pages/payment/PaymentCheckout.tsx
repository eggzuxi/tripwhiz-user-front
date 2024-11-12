
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import axios from "axios"; // axios를 이용해 백엔드와 통신




function PaymentCheckout() {

    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
    const customerKey = generateRandomString();

    const [cartItems, setCartItems] = useState([]);
    const [payment, setPayment] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);



    useEffect(() => {

        // 장바구니 데이터 가져오기
        async function fetchCartItems() {
            try {
                const response = await axios.get("/api/cart"); // 백엔드에서 장바구니 데이터를 가져오는 API 엔드포인트
                setCartItems(response.data); // 장바구니 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        }

        // 결제 초기화
        async function fetchPayment() {
            try {
                const tossPayments = await loadTossPayments(clientKey);

                // 회원 결제
                // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
                const payment = tossPayments.payment({
                    customerKey,
                });
                // 비회원 결제
                // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }

        fetchCartItems();
        fetchPayment();
    }, [clientKey]);



    function selectPaymentMethod(method) {

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + method)
        setSelectedPaymentMethod(method);
    }


    async function requestPayment() {


        console.log("==============================3");
        console.log(payment)

        if (!payment) return;

        const orderId = generateRandomString();
        const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        payment.requestPayment({
            method: selectedPaymentMethod,
            amount,
            orderId,
            orderName: "주문 내역",
            successUrl: `${window.location.origin}/payment/success`,
            failUrl: `${window.location.origin}/payment/fail`,
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
        });
    }

    return (
        <div className="wrapper">
            <div className="box_section">

                <h1>장바구니 내역</h1>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.quantity}개 - {item.price}원
                        </li>
                    ))}
                </ul>
                <h2>총 결제 금액: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}원</h2>

                <h1>일반 결제</h1>
                <div id="payment-method" style={{display: "flex"}}>
                    <button id="CARD" className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`}
                            onClick={() => selectPaymentMethod("CARD")}>
                        카드
                    </button>
                    <button id="TRANSFER" className={`button2 ${selectedPaymentMethod === "TRANSFER" ? "active" : ""}`}
                            onClick={() => selectPaymentMethod("TRANSFER")}>
                        계좌이체
                    </button>
                    <button id="VIRTUAL_ACCOUNT"
                            className={`button2 ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "active" : ""}`}
                            onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}>
                        가상계좌
                    </button>
                    <button id="MOBILE_PHONE"
                            className={`button2 ${selectedPaymentMethod === "MOBILE_PHONE" ? "active" : ""}`}
                            onClick={() => selectPaymentMethod("MOBILE_PHONE")}>
                        휴대폰
                    </button>
                    <button
                        id="CULTURE_GIFT_CERTIFICATE"
                        className={`button2 ${selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? "active" : ""}`}
                        onClick={() => selectPaymentMethod("CULTURE_GIFT_CERTIFICATE")}
                    >
                        문화상품권
                    </button>
                    <button id="FOREIGN_EASY_PAY"
                            className={`button2 ${selectedPaymentMethod === "FOREIGN_EASY_PAY" ? "active" : ""}`}
                            onClick={() => selectPaymentMethod("FOREIGN_EASY_PAY")}>
                        해외간편결제
                    </button>
                </div>
                <button className="button" onClick={() => requestPayment()}>
                    결제하기
                </button>
            </div>
            <div className="box_section">
                <h1>정기 결제</h1>
                <button className="button" onClick={() => requestBillingAuth()}>
                    빌링키 발급하기
                </button>
            </div>
        </div>
    );
}

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}

export default PaymentCheckout;