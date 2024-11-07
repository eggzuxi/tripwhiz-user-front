import axios from "axios";
// import jwtAxios from "../util/jwtUtil.ts";

const host ='http://10.10.10.157:8080/api/v1/product';

// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }

export const getList = async (page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data
}

export const getOne = async () => {

    const pno = 1

    const res = await axios.get(`${host}/${pno}`)

    return res.data

}