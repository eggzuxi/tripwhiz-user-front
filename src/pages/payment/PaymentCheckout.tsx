
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // useLocation을 추가

function PaymentCheckout() {

    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
    const customerKey = generateRandomString();
    const location = useLocation();  // useLocation 사용하여 전달된 state 받기
    const cartItems = location.state?.cartItems || [];  // 전달된 장바구니 정보

    const amount = {
        currency: "KRW",
        value: cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0), // 금액 계산
    };

    const orderName = cartItems.map(item => `${item.product.pname} (${item.qty}개)`).join(", ");  // 상품명과 수량을 결제명으로 생성

    useEffect(() => {
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

        fetchPayment();
    }, [clientKey]);


    const [payment, setPayment] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    function selectPaymentMethod(method) {

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + method)
        setSelectedPaymentMethod(method);
    }

    async function requestPayment() {


        console.log("==============================3");
        console.log(payment)

        payment.requestPayment({
            method: "CARD", // 카드 및 간편결제
            amount,
            orderId: generateRandomString(),
            orderName: orderName,  // 결제명
            successUrl: window.location.origin + "/payment/success",
            failUrl: window.location.origin + "/fail",
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
            // customerMobilePhone: "01012341234",
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        });
    }

    return (
        <div className="wrapper">
            <div className="box_section">
                <h1>일반 결제</h1>
                <div id="payment-method" style={{ display: "flex" }}>
                    <button id="CARD" className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`} onClick={() => selectPaymentMethod("CARD")}>
                        카드
                    </button>
                    <button id="TRANSFER" className={`button2 ${selectedPaymentMethod === "TRANSFER" ? "active" : ""}`} onClick={() => selectPaymentMethod("TRANSFER")}>
                        계좌이체
                    </button>
                    <button id="VIRTUAL_ACCOUNT" className={`button2 ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "active" : ""}`} onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}>
                        가상계좌
                    </button>
                    <button id="MOBILE_PHONE" className={`button2 ${selectedPaymentMethod === "MOBILE_PHONE" ? "active" : ""}`} onClick={() => selectPaymentMethod("MOBILE_PHONE")}>
                        휴대폰
                    </button>
                    <button
                        id="CULTURE_GIFT_CERTIFICATE"
                        className={`button2 ${selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? "active" : ""}`}
                        onClick={() => selectPaymentMethod("CULTURE_GIFT_CERTIFICATE")}
                    >
                        문화상품권
                    </button>
                    <button id="FOREIGN_EASY_PAY" className={`button2 ${selectedPaymentMethod === "FOREIGN_EASY_PAY" ? "active" : ""}`} onClick={() => selectPaymentMethod("FOREIGN_EASY_PAY")}>
                        해외간편결제
                    </button>
                </div>
                <button className="button" onClick={() => requestPayment()}>
                    결제하기
                </button>
            </div>
        </div>
    );
}

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}

export default PaymentCheckout;