// 주문 관련 데이터 타입 정의

// 주문 목록을 나타내는 DTO
export interface OrderListDTO {
    ono: number; // 주문 번호
    email: string; // 주문한 유저의 이메일
    spno: number; // 주문한 지점 번호
    totalAmount: number; // 주문된 상품의 총 수량
    totalPrice: number; // 주문의 총 가격
    createTime: string; // 주문 생성 시간
    pickUpDate: string; // 픽업 예정 시간
    status: string; // 주문 상태
}

// 특정 주문의 상품 정보를 나타내는 DTO
export interface OrderProductDTO {
    pno: number; // 상품 번호
    amount: number; // 주문된 상품 수량
    price: number; // 해당 상품의 총 가격
}

// 특정 주문의 상세 정보를 나타내는 DTO
export interface OrderReadDTO {
    ono: number; // 주문 번호
    products: OrderProductDTO[]; // 주문된 상품 목록
    totalPrice: number; // 주문의 총 가격
    status: string; // 주문 상태
    pickUpDate: string; // 픽업 예정 시간
    spno: number; // 지점 번호
    qrCodePath?: string; // QR 코드 경로 (선택적)
}

// 주문 완료 요청을 서버로 보낼 때 사용하는 타입
export interface CompleteOrderRequest {
    ono: number; // 주문 ID
    email: string; // 유저 이메일
    fcmToken: string; // 유저의 FCM 토큰
}
