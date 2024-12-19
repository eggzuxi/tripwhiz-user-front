import axios from "axios";

const host ='/api/product';
// const host ='http://localhost:8081/api/product';

// const header = {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 파일 전송 형식 지정
//     }
// }


//상품 목록 조회 API_SY
export const getList = async (page: number, tno: number | null , cno: number | null , scno: number | null ) => {

    // 입력된 파라미터를 확인
    console.log("API 호출 파라미터: ", { page, tno, cno, scno });

    // URLSearchParams 객체 생성
    const params = new URLSearchParams({
        page: page.toString(),
        ...(tno && { tno: tno.toString() }),
        ...(cno && { cno: cno.toString() }),
        ...(scno && { scno: scno.toString() })
    });

    console.log("생성된 URLSearchParams:", params.toString());

    try {
        // 요청 시작 시점에 로그 추가
        console.log(`GET 요청 URL: ${host}/list?${params.toString()}`);

        // API 요청
        const res = await axios.get(`${host}/list?${params.toString()}`);

        // 요청 성공 시 로그
        console.log("요청 성공: 응답 데이터:", res.data.dtoList);

        return res.data.dtoList;

    } catch (error) {
        // 오류 발생 시 로그
        console.error("API 요청 실패:", error);

        throw error;
    }
};



export const getOne = async (pno: number) => {
    console.log("API 호출 파라미터: ", { pno });

    try {
        // 요청 URL 확인 로그
        const requestUrl = `${host}/read/${pno}`;
        console.log("GET 요청 URL: ", requestUrl);

        // API 요청
        const res = await axios.get(requestUrl);

        // 요청 성공 시 응답 데이터 로그
        console.log("요청 성공: 응답 데이터:", res.data);

        // AttachFiles 확인 및 기본값 설정
        const productData = res.data;

        if (!productData.attachFiles || !Array.isArray(productData.attachFiles)) {
            console.warn("AttachFiles가 비어 있거나 유효하지 않습니다. 기본값으로 설정합니다.");
            productData.attachFiles = [];
        }

        // 응답 데이터 반환
        return productData;

    } catch (error) {
        // AxiosError 확인 및 상세 로그 출력
        if (axios.isAxiosError(error)) {
            console.error(
                "API 요청 실패 (AxiosError):",
                error.response?.data || error.message,
                "응답 상태:",
                error.response?.status
            );
        } else {
            console.error("API 요청 실패 (Unknown Error):", error);
        }

        // 오류를 호출자에게 전달
        throw error;
    }
};

