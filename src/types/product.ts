export interface IProduct {
    cno: number,
    pno: number,
    cname: string,
    pname: string,
    pdesc: string,
    price: number,
    img?: string,
    delflag: boolean
}

export interface ICartItem {
    product: IProduct
    qty: number
}