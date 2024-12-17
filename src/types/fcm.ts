export interface FCMRequestDTO {
    token: string; // FCM 토큰
    title: string; // 알림 제목
    body: string;  // 알림 내용
    data?: { [key: string]: string }; // 추가 데이터 (선택 사항)
}
