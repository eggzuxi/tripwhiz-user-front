export interface IProduct {
    pno: number;               // 상품 번호
    pname: string;             // 상품 이름
    pdesc: string;             // 상품 설명
    price: number;             // 상품 가격
    categoryCno?: number | null; // 상위 카테고리 번호 (선택적)
    subCategoryScno?: number | null; // 하위 카테고리 번호 (선택적)
    themeTno?: number | null;     // 테마 번호 (선택적)
    fileName?: string;
    delflag: false// 이미지 경로 (선택적)
}



export interface ICartItem {
    product: IProduct
    qty: number
}