
import {loadTossPayments, TossPaymentsPayment} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import {cartStore} from "../../store/CartStore.ts";  // useLocation을 추가

function PaymentCheckout() {

    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
    const customerKey = generateRandomString();
    const cartItems = cartStore((state) => state.cartItems);

    console.log("Received cart items:", cartItems);

    const amount = {
        currency: "KRW",
        value: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    };

    // const orderName = cartItems.map((item: { product: { pname: string }; qty: number }) => `${item.product.pname} (${item.qty}개)`).join(", ");
    const orderName =
        cartItems.length > 0
            ? cartItems
                .map(
                    (item) => `${item.pname} (${item.qty}개)`
                )
                .join(", ")
            : "기본 상품명"; // 비어 있을 경우 기본 상품명을 설정


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


    const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    function selectPaymentMethod(method: string) {

        console.log("선택된 결제 방법" + method)
        setSelectedPaymentMethod(method);
    }

    async function requestPayment() {


        console.log("==============================3");
        console.log(payment)

        if (!payment) {
            console.error("Payment is not initialized.");
            return;
        }

        payment.requestPayment({
            method: "CARD",
            amount,
            orderId: generateRandomString(),
            orderName: orderName,
            successUrl: window.location.origin + "/payment/success",
            failUrl: window.location.origin + "/fail",
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-6">일반 결제</h2>

            {/* 결제 방법 선택 버튼 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <button
                    className={`bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${selectedPaymentMethod === "CARD" ? "bg-gray-300 text-blue-500 border-blue-500" : ""}`}
                    onClick={() => selectPaymentMethod("CARD")}
                >
                    카드
                </button>
                <button
                    className={`bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${selectedPaymentMethod === "TRANSFER" ? "bg-gray-300 text-blue-500 border-blue-500" : ""}`}
                    onClick={() => selectPaymentMethod("TRANSFER")}
                >
                    계좌이체
                </button>
                <button
                    className={`bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "bg-gray-300 text-blue-500 border-blue-500" : ""}`}
                    onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}
                >
                    가상계좌
                </button>
                <button
                    className={`bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${selectedPaymentMethod === "MOBILE_PHONE" ? "bg-gray-300 text-blue-500 border-blue-500" : ""}`}
                    onClick={() => selectPaymentMethod("MOBILE_PHONE")}
                >
                    휴대폰
                </button>
                <button
                    className={`bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? "bg-gray-300 text-blue-500 border-blue-500" : ""}`}
                    onClick={() => selectPaymentMethod("CULTURE_GIFT_CERTIFICATE")}
                >
                    문화상품권
                </button>
                <button
                    className={`bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out ${selectedPaymentMethod === "FOREIGN_EASY_PAY" ? "bg-gray-300 text-blue-500 border-blue-500" : ""}`}
                    onClick={() => selectPaymentMethod("FOREIGN_EASY_PAY")}
                >
                    해외간편결제
                </button>
            </div>

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