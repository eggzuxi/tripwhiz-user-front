import { Link, useSearchParams } from "react-router-dom";


function PaymentFail() {
    const [searchParams] = useSearchParams();

    // URL 파라미터로 받은 message와 code를 처리
    const errorMessage = searchParams.get("message") || "알 수 없는 오류가 발생했습니다";
    const errorCode = searchParams.get("code") || "알 수 없는 코드";

    return (
        <div id="info" className="box_section" style={{ width: "600px" }}>
            <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="에러 이미지" />
            <h2>결제를 실패했어요</h2>

            <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                <div className="p-grid-col text--left">
                    <b>에러메시지</b>
                </div>
                <div className="p-grid-col text--right" id="message">{errorMessage}</div>
            </div>
            <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                <div className="p-grid-col text--left">
                    <b>에러코드</b>
                </div>
                <div className="p-grid-col text--right" id="code">{errorCode}</div>
            </div>

            <div className="p-grid-col">
                <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
                    <button className="button p-grid-col5">연동 문서</button>
                </Link>
                <Link to="https://discord.gg/A4fRFXQhRu">
                    <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
                        실시간 문의
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default PaymentFail;