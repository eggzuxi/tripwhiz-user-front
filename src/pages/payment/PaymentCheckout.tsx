
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
        value: cartItems.reduce((acc: number, item: { product: { price: number }; qty: number }) => acc + item.product.price * item.qty, 0),
    };

    // const orderName = cartItems.map((item: { product: { pname: string }; qty: number }) => `${item.product.pname} (${item.qty}개)`).join(", ");
    const orderName =
        cartItems.length > 0
            ? cartItems
                .map(
                    (item: { product: { pname: string }; qty: number }) =>
                        `${item.product.pname} (${item.qty}개)`
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
        <div className="flex flex-col items-center mb-6 w-full p-20 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-6">일반 결제</h2>  {/* mb-6 추가하여 간격 확장 */}
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
