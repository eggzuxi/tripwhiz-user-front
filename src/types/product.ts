export interface IProductImage {
    ord: number; // 순서
    file_name: string; // 기존 파일명을 나타내는 문자열 타입
}

export interface IProduct {
    pno: number;               // 상품 번호
    pname: string;             // 상품 이름
    pdesc: string;             // 상품 설명
    price: number;             // 상품 가격
    cno?: number | null; // 상위 카테고리 번호 (선택적)
    scno?: number | null; // 하위 카테고리 번호 (선택적)
    tno?: number | null;     // 테마 번호 (선택적)
    delflag: false
    attachFiles: IProductImage[]; // 기존 IProductImage 객체 배열
}


// export interface ICartItem {
//     product: IProduct
//     qty: number
// }