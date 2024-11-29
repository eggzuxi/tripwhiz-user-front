import axios from "axios";

// const host ='http://10.10.10.73:8080/api/product';
const host ='http://localhost:8081/api/product';

// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }


//상품 목록 조회 API_SY
export const getList = async (page: number, tno: number | null , cno: number | null , scno: number | null ) => {

    console.log("tno: " + tno)
    console.log("cno: " + cno)
    console.log("scno: " + scno)

    // URLSearchParams 객체 생성
    const params = new URLSearchParams({
        page: page.toString(),
        ...(tno && { tno: tno.toString() }),
        ...(cno && { cno: cno.toString() }),
        ...(scno && { scno: scno.toString() })
    });


    try {
        const res = await axios.get(`${host}/list?${params.toString()}`);

        console.log("Filtered Products:", res.data.dtoList);

        return res.data.dtoList;
    } catch (error) {
        console.error("Error fetching product list:", error);
        throw error;
    }
};



export const getOne = async (pno: number) => {

    const res = await axios.get(`${host}/read/${pno}`)

    console.log(res.data)

    return res.data

}