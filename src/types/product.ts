export interface IProduct {
    cno: number,
    pno: number,
    category: string,
    pname: string,
    pdesc: string,
    price: number,
    fileName?: string,
    delflag: boolean
}

export interface ICartItem {
    product: IProduct
    qty: number
}