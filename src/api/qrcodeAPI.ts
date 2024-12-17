// /api/orderApi.ts
import axios from 'axios';

// const host = '/api/order';
const host = 'http://localhost:8081/api/order';


// 주문을 완료하고 QR 코드를 생성하는 함수
export const completeOrder = async (ono: number, totalAmount: number) => {
    try {
        const res = await axios.post(`${host}/complete`, {
            ono,
            totalAmount,
        }, {
            headers: {
                'Content-Type': 'application/json' // JSON 형식으로 전송
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error completing order:', error);
        throw error;
    }
};
