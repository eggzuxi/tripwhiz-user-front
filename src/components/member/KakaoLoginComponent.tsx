import {getKakaoLoginLink} from "../../api/kakaoAPI.ts";
import {Link} from "react-router-dom";
import kakaoLoginImage from '/static/kakao_login_medium_wide.png';

function KakaoLoginComponent() {

    const link = getKakaoLoginLink()

    return (
        <div className="flex flex-col">
            <div className="text-center text-blue-500">
                로그인 시에 자동 가입처리됩니다
            </div>
            <div className="flex justify-center  w-full">
                <Link to={link} className="flex justify-center w-3/4 m-6">
                    <img
                        src={kakaoLoginImage}
                    />
                </Link>
            </div>
        </div>
    );
}

export default KakaoLoginComponent;