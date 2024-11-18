export interface IProductImage {
    uploadFileNames: string; // 기존 파일명을 나타내는 문자열 타입
    ord: number; // 순서
}

export interface IProduct {
    pno: number, //상품 번호
    pname: string, //상품 이름
    price: number, //상품 가격
    pdesc: string, //상품 설명
    category: string, //상위 카테고리
    subcategory: string, //하위 카테고리
    themecategory: string, //테마 카테고리
    fileUrl?: string,
    delflag: boolean //삭제 플래그
    uploadFileNames: IProductImage[]; // 기존 IProductImage 객체 배열
}

export interface ICartItem {
    product: IProduct
    qty: number
}