import axios from "axios";

const host = 'http://localhost:8081/api/cart'
// const host = 'http://10.10.10.73:8080/api/cart'

export const getList = async (email: string) => {

    const res = await axios.get(`${host}/list`,{
        params: { email },
    })

    return res.data

}

// JH
export const addCart = async (pno: number, qty: number, email: string) => {

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
export const deleteCartItem = async (pno: number, email: string) => {
    const res = await axios.delete(`${host}/delete/${pno}`, {
        params: { email },
    });
    console.log("장바구니 상품 삭제 성공:", pno);
    return res.data;
};

// 장바구니 전체 삭제
export const clearCart = async (email: string) => {
    const res = await axios.delete(`${host}/delete/all`, {
        params: { email },
    });
    console.log("장바구니 전체 삭제 성공");
    return res.data;
};
