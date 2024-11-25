import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeComponent from './components/qrcode/QRCodeComponent';
import BaseLayout from './layouts/BaseLayout';

function App() {
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
