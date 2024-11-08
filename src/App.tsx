import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeComponent from './components/QRCodeComponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/order/complete/:ono/:totalAmount" element={<QRCodeComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
