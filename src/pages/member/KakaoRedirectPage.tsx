import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {getAccessToken, getMemberWithAccessToken} from "../../api/kakaoAPI.ts";


function KakaoRedirectPage() {

    // URL의 쿼리 파라미터를 읽기 위한 React Router 훅
    const [searchParams] = useSearchParams()

    // URL의 "code" 파라미터 (카카오 인증 코드)를 가져옴
    const authCode:string|null = searchParams.get("code")

    // authCode가 변경될 때마다 액세스 토큰 요청 및 사용자 정보 요청을 실행
    useEffect(() => {

        if(authCode != null){

        // 인증 코드를 이용해 액세스 토큰을 요청
        getAccessToken(authCode).then(accessToken => {

            console.log(accessToken)
            // 액세스 토큰을 사용해 사용자 정보를 가져옴
            getMemberWithAccessToken(accessToken).then(result => {
                console.log("======================")
                console.log(result)
            })
        })
      }//end if

    },[authCode]) // authCode가 변경될 때마다 실행


    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    );
}

export default KakaoRedirectPage;