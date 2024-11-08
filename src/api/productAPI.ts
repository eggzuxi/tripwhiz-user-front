import axios from "axios";
// import jwtAxios from "../util/jwtUtil.ts";

const host ='http://10.10.10.104:8080/api/v1/product';

// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }

export const getList = async (page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data
}

export const getOne = async (pno: number) => {

    const res = await axios.get(`${host}/read/${pno}`)

    return res.data

}