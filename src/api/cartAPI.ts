import axios from "axios";
import useAuthStore from "../store/AuthStore.ts";

const host = 'http://localhost:8081/api/cart'
// const host = 'http://10.10.10.73:8080/api/cart'

const getEmailFromAuthStore = () => {
    const email = useAuthStore.getState().email; // zustand의 email 값 가져오기
    if (!email) {
        throw new Error("Email not found in authStore");
    }

    console.log(email)

    return email;
};

export const getList = async () => {

    const email = getEmailFromAuthStore();

    const res = await axios.get(`${host}/list`,{
        headers: { email },
    })

    console.log(res.data)

    return res.data

}

// 수량 변경
// const changeQty = async (pno: number, qty: number) => {
//     try {
//         await axios.patch("/api/cart/changeQty", { pno, qty });
//     } catch (error) {
//         console.error("Failed to change quantity:", error);
//     }
// };

// JH
export const addCart = async (pno: number, qty: number) => {

    const email = getEmailFromAuthStore();

    // 요청 바디에 필요한 데이터 생성
    const cartListDTO = {
        pno, // 상품 번호
        qty, // 수량
        email
    };

    const res = await axios.post(`${host}/add`, cartListDTO);

    console.log("장바구니 추가 성공:", res.data);

    return res.data; // 서버 응답 반환

};

// 장바구니 항목 삭제 (상품 개별 삭제)
export const deleteCartItem = async (pno: number) => {

    const email = getEmailFromAuthStore();

    const res = await axios.delete(`${host}/delete/${pno}`, {
        headers: { email },
    });
    console.log("장바구니 상품 삭제 성공:", pno);
    return res.data;
};

// 장바구니 전체 삭제
export const clearCart = async () => {

    const email = getEmailFromAuthStore();

    const res = await axios.delete(`${host}/delete/all`, {
        headers: { email },
    });

    console.log("장바구니 전체 삭제 성공");
    return res.data;
};
