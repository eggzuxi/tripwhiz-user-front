import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeComponent from './components/qrcode/QRCodeComponent';
import BaseLayout from './layouts/BaseLayout';
import { useEffect, useState } from 'react';
import useFCM from './hooks/useFCM'; // FCM Hook 추가

function App() {
    // 알림 상태
    const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);

    // 유저 정보
    const email = "user@example.com";
    const isUser = true;

    // FCM Hook 사용
    const { notification: receivedNotification } = useFCM(email, isUser);

    // Foreground 알림 처리
    useEffect(() => {
        if (receivedNotification) {
            setNotification({
                title: receivedNotification.notification?.title || "알림",
                body: receivedNotification.notification?.body || "내용 없음",
            });
        }
    }, [receivedNotification]);

    // 알림이 발생하면 사용자에게 보여줍니다.
    useEffect(() => {
        if (notification) {
            alert(`알림이 도착했습니다:\n\n제목: ${notification.title}\n내용: ${notification.body}`);
        }
    }, [notification]);

    return (
        <Router>
            <BaseLayout>
                <Routes>
                    {/* QR 코드 페이지 */}
                    <Route path="/order/complete/:ono/:totalAmount" element={<QRCodeComponent />} />
                </Routes>
            </BaseLayout>
        </Router>
    );
}

export default App;
