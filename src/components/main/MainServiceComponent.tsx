import {useNavigate} from "react-router-dom";

const MainServiceComponent: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex items-center ml-6 mt-8 text-lg font-bold text-gray-700 mb-2">
                <span>서비스 한눈에 보기</span>
                <img
                    src="/images/main/free-icon-eyes-7835667.png"
                    alt="Eye Icon"
                    className="w-5 h-5 ml-2"
                />
            </div>

            {/* 카드 버튼 섹션 */}
            <div className="flex justify-center mt-4 space-x-4">

                {/* 수화물 서비스 */}
                <div className="flex flex-col items-center justify-center cursor-pointer">

                    <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-lg">
                        {/* 이미지 */}
                        <img
                            src="/images/main/free-icon-luggage-5793226.png"
                            alt="수화물 서비스"
                            className="w-14 h-14 object-cover rounded-lg"
                            onClick={() => navigate("/luggage")}
                        />
                    </div>
                    <span className="text-sm text-gray-600 mt-2">수화물 서비스</span> {/* 텍스트 */}
                </div>

                {/* 지점 조회 */}
                <div className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-lg">
                        {/* 이미지 */}
                        <img
                            src="/images/main/free-icon-search-1916736.png"
                            alt="지점 조회"
                            className="w-10 h-10 object-cover rounded-lg"
                        />
                    </div>
                    <span className="text-sm text-gray-600 mt-2">지점 조회</span> {/* 텍스트 */}
                </div>
                {/*테마별 추천 */}
                <div className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-lg">
                        {/* 이미지 */}
                        <img
                            src="/images/main/free-icon-mountain-12136492.png"
                            alt="테마별 추천"
                            className="w-14 h-14 object-cover rounded-lg"
                            onClick={() => navigate("/theme")}
                        />
                    </div>
                    <span className="text-sm text-gray-600 mt-2">테마별 추천</span> {/* 텍스트 */}
                </div>
                {/* 전체 상품 */}
                <div className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-lg">
                        {/* 이미지 */}
                        <img
                            src="/images/main/free-icon-online-shopping-3081648.png"
                            alt="전체 상품"
                            className="w-12 h-12 object-cover rounded-lg"
                            onClick={() => navigate("/product/list")}
                        />
                    </div>
                    <span className="text-sm text-gray-600 mt-2">전체 상품</span> {/* 텍스트 */}
                </div>
            </div>
        </div>
    );
}

export default MainServiceComponent;