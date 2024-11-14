import axios from "axios";

const host ='http://10.10.10.73:8080/api/product';
// const host ='http://localhost:8080/api/product';


// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }

export const getList = async (page:number) => {

    const res = await axios.get(`${host}/list?page=${page}`)

    console.log(res.data)

    return res.data.dtoList

};

export const getOne = async (pno: number) => {

    const res = await axios.get(`${host}/read/${pno}`)

    return res.data

}