import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();

    return (
        <div className="box_section" style={{ width: "600px", textAlign: "center" }}>
            <img
                width="100px"
                src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                alt="결제 성공 이미지"
            />
            <h2>결제를 완료했어요</h2>

            <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                <div className="p-grid-col text--left">
                    <b>결제금액</b>
                </div>
                <div className="p-grid-col text--right" id="amount">
                    {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                </div>
            </div>
            <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                <div className="p-grid-col text--left">
                    <b>주문번호</b>
                </div>
                <div className="p-grid-col text--right" id="orderId">
                    {searchParams.get("orderId")}
                </div>
            </div>
            <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                <div className="p-grid-col text--left">
                    <b>결제키</b>
                </div>
                <div className="p-grid-col text--right" id="paymentKey">
                    {searchParams.get("paymentKey")}
                </div>
            </div>

            <div className="p-grid-col" style={{ marginTop: "30px" }}>
                <button
                    className="button p-grid-col5"
                    onClick={() => (window.location.href = "/order/details/:id")}
                    style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}
                >
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
