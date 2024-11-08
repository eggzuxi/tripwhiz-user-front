export interface IProduct {
    cno: number,
    dno: number,
    pno: number,
    cname: string,
    dname: string,
    pname: string,
    pdesc: string,
    price: number,
    img?: string,
    delflag: boolean
}