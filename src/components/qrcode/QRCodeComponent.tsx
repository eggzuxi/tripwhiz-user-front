import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { completeOrder } from '../../api/qrcodeAPI';
import { IQRCode } from '../../types/qrcodetype.ts'; // IQRCode 인터페이스를 가져옵니다.

function QRCodeComponent() {
    // URL 파라미터에서 ono와 totalAmount를 가져옵니다.
    const { ono, totalAmount } = useParams<{ ono?: string; totalAmount?: string }>();

    // IQRCode 타입에 맞게 파라미터를 변환하여 parsedParams에 저장합니다.
    const parsedParams: IQRCode = {
        ono: parseInt(ono || '0', 10), // ono를 number로 변환
        totalAmount: parseInt(totalAmount || '0') // totalAmount를 number로 변환
    };

    const [qrCode, setQrCode] = useState<string | null>(null); // QR 코드 URL을 저장할 상태 변수 qrCode
    const [message, setMessage] = useState<string>('QR코드를 생성 중입니다...'); // 사용자에게 보여줄 메시지 상태 변수

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                // completeOrder에 parsedParams.ono와 parsedParams.totalAmount를 모두 string으로 변환하여 전달
                const response = await completeOrder(parsedParams.ono, parsedParams.totalAmount);
                setQrCode(response.qrCode); // 응답의 qrCode를 상태에 저장합니다.
                setMessage(response.message); // 응답의 message를 상태에 저장합니다.
            } catch (error) {
                console.error("Error creating QR Code:", error);
                setMessage('QR 코드 생성에 실패했습니다.');
            }
        };

        fetchQRCode(); // 컴포넌트가 처음 렌더링될 때 fetchQRCode 함수를 호출합니다.
    }, [parsedParams.ono, parsedParams.totalAmount]); // ono 또는 totalAmount가 변경될 때마다 useEffect 훅이 다시 실행됩니다.

    return (
        <div>
            <h2>{message}</h2>
            {qrCode ? (
                <img src={qrCode} alt="QR Code" />
            ) : (
                <p>QR 코드를 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default QRCodeComponent;
