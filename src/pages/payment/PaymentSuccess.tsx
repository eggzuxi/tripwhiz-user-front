import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";

function PaymentSuccess() {
    // const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [responseData,] = useState(null);

    // useEffect(() => {
    //     async function confirm() {
    //         const requestData = {
    //             orderId: searchParams.get("orderId"),
    //             amount: searchParams.get("amount"),
    //             paymentKey: searchParams.get("paymentKey"),
    //         };
    //
    //
    //         const response = await fetch("/api/confirm/payment", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(requestData),
    //         });
    //
    //         const json = await response.json();
    //
    //         if (!response.ok) {
    //             throw { message: json.message, code: json.code };
    //         }
    //
    //         return json;
    //     }
    //
    //     confirm()
    //         .then((data) => {
    //             setResponseData(data);
    //         })
    //         .catch((error) => {
    //             navigate(`/fail?code=${error.code}&message=${error.message}`);
    //         });
    // }, [searchParams]);

    useEffect(() => {
        async function confirm() {
            const requestData = {
                orderId: searchParams.get("orderId"),
                amount: searchParams.get("amount"),
                paymentKey: searchParams.get("paymentKey"),
            };

            try {
                // const response = await fetch("https://api.tosspayments.com/v1/verify-payment", {
                //우회1
                // const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.tosspayments.com/v1/verify-payment", {
                //우회2 but, 이거 배포할 때도 이렇게 해도 될까? ->강사님께 질문쓰
                // const response = await fetch("https://api.allorigins.win/raw?url=https://api.tosspayments.com/v1/verify-payment", {

    //             const response = await fetch('/api/verify-payment', {
    //                 method: "POST",
    //                 headers: {
    //                     // "Authorization": `Bearer test_sk_E92LAa5PVb95gnz64PbP37YmpXyJ`, // Toss Pay Secret Key
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(requestData),
    //             });
    //
    //             if (!response.ok) {
    //                 const errorText = await response.text();
    //                 console.error('Error Response:', errorText);
    //                 throw new Error('Received empty response from API');
    //             }
    //
    //             const json = await response.json();
    //             setResponseData(json);
    //         } catch (error) {
    //             console.error('Failed to parse JSON:', error);
    //             navigate(`/fail?code=ERROR&message=${encodeURIComponent(error.message)}`);
    //         }
    //     }
    //
    //     confirm();
    // }, [searchParams, navigate]);

                //last- 결제완료, console fail to fetch 에러
                const response = await fetch("http://localhost:4000/api/verify-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                // 응답 처리
                const result = await response.json();
                console.log(result);

                if (!response.ok) {
                    console.error("Payment verification failed:", result);
                } else {
                    console.log("Payment verified successfully:", result);
                }
            } catch (error) {
                console.error("Error during payment confirmation:", error);
            }
        }

        confirm();
    }, []);

    return (
        <>
            <div className="box_section" style={{width: "600px"}}>
                <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"/>
                <h2>결제를 완료했어요</h2>
                <div className="p-grid typography--p" style={{marginTop: "50px"}}>
                    <div className="p-grid-col text--left">
                        <b>결제금액</b>
                    </div>
                    <div className="p-grid-col text--right" id="amount">
                        {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{marginTop: "10px"}}>
                    <div className="p-grid-col text--left">
                        <b>주문번호</b>
                    </div>
                    <div className="p-grid-col text--right" id="orderId">
                        {`${searchParams.get("orderId")}`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{marginTop: "10px"}}>
                    <div className="p-grid-col text--left">
                        <b>paymentKey</b>
                    </div>
                    <div className="p-grid-col text--right" id="paymentKey"
                         style={{whiteSpace: "initial", width: "250px"}}>
                        {`${searchParams.get("paymentKey")}`}
                    </div>
                </div>
                <div className="p-grid-col">
                    <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
                        <button className="button p-grid-col5">연동 문서</button>
                    </Link>
                    <Link to="https://discord.gg/A4fRFXQhRu">
                        <button className="button p-grid-col5" style={{backgroundColor: "#e8f3ff", color: "#1b64da"}}>
                            실시간 문의
                        </button>
                    </Link>
                </div>
            </div>
            <div className="box_section" style={{width: "600px", textAlign: "left"}}>
                <b>Response Data :</b>
                <div id="response" style={{whiteSpace: "initial"}}>
                    {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
                </div>
            </div>
        </>
    );
}


export default PaymentSuccess;