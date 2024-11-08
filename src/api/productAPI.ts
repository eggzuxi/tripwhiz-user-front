import axios from "axios";
import {IProduct} from "../types/product.ts";
// import jwtAxios from "../util/jwtUtil.ts";

const host ='http://localhost:8080/api/v1/product';

// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }


export const getList = (dno: number, page: number, size: number) => {
    return axios.get<{ dtoList: IProduct[], totalCount: number }>(`${host}/list/${dno}`, {
        params: { page, size },
    }).then(response => response.data);
};


export const getOne = async (pno: number) => {

    const res = await axios.get(`${host}/read/${pno}`)

    return res.data

}