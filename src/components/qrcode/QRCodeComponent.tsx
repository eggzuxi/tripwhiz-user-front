import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { completeOrder } from '../../api/qrcodeAPI';

interface RouteParams {
    ono: string; // 주문 번호 (Order Number) 파라미터
    totalAmount: string; // 총 금액 (Total Amount) 파라미터
}

function QRCodeComponent() {
    const { ono, totalAmount } = useParams<RouteParams>(); // URL 파라미터에서 ono와 totalAmount를 가져옵니다.
    const [qrCode, setQrCode] = useState<string | null>(null); // QR 코드 URL을 저장할 상태 변수 qrCode를 선언합니다.
    const [message, setMessage] = useState<string>('QR코드를 생성 중입니다...'); // 사용자에게 보여줄 메시지를 저장할 상태 변수 message를 선언합니다.

    useEffect(() => {
        // QR 코드를 생성하고 설정하는 비동기 함수
        const fetchQRCode = async () => {
            try {
                if (ono && totalAmount) { // ono와 totalAmount가 존재하는지 확인합니다.
                    const response = await completeOrder(ono, parseInt(totalAmount)); // completeOrder API 호출로 QR 코드 생성 요청을 보냅니다.
                    setQrCode(response.qrCode); // 응답의 qrCode를 상태에 저장합니다.
                    setMessage(response.message); // 응답의 message를 상태에 저장합니다.
                } else {
                    setMessage('주문 정보를 찾을 수 없습니다.'); // ono 또는 totalAmount가 없으면 에러 메시지 설정
                }
            } catch (error) {
                console.error("Error creating QR Code:", error); // 에러 로그를 콘솔에 출력
                setMessage('QR 코드 생성에 실패했습니다.'); // 에러 메시지 설정
            }
        };

        fetchQRCode(); // 컴포넌트가 처음 렌더링될 때 fetchQRCode 함수를 호출합니다.
    }, [ono, totalAmount]); // ono 또는 totalAmount가 변경될 때마다 useEffect 훅이 다시 실행됩니다.

    return (
        <div>
            <h2>{message}</h2> {/* 현재 상태의 message를 화면에 출력합니다. */}
            {qrCode ? (
                <img src={qrCode} alt="QR Code" /> // qrCode가 있으면 QR 코드 이미지를 표시합니다.
            ) : (
                <p>QR 코드를 불러오는 중입니다...</p> // qrCode가 없으면 로딩 메시지를 표시합니다.
            )}
        </div>
    );
}

export default QRCodeComponent; // QRCodeComponent 컴포넌트를 내보냅니다.
