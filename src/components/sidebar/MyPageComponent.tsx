import useAuthStore from "../../store/AuthStore.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faGift, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function MyPageComponent() {
    const { name, email } = useAuthStore((state) => state);

    return (
        <div className="w-full h-full bg-white p-4"> {/* 전체 배경 흰색 */}
            {/* 상단 헤더 */}
            <div className="text-center py-6">
                <div className="text-xl font-semibold text-gray-800 mb-2">
                    {name ? `${name}님 환영합니다` : "환영합니다"}
                </div>
                <div className="text-sm text-gray-600">{email || "example@email.com"}</div>
                <button className="mt-4 px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 rounded-full">
                    내 정보
                </button>
            </div>

            {/* 장바구니 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">장바구니</h2>
                <ul className="grid grid-cols-3 gap-4 text-center">
                    <li className="text-gray-600">예약픽업</li>
                    <li className="text-gray-600">바로배달</li>
                    <li className="text-gray-600">오늘픽업</li>
                </ul>
            </div>

            {/* 주문내역 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">주문내역</h2>
                <ul className="grid grid-cols-2 gap-4 text-center">
                    <li className="text-gray-600">예약픽업</li>
                    <li className="text-gray-600">바로배달</li>
                    <li className="text-gray-600">오늘픽업</li>
                    <li className="text-gray-600">QR코드</li>
                </ul>
            </div>

            {/* 기타 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">기타</h2>
                <ul className="grid grid-cols-2 gap-4 text-center">
                    <li className="text-gray-600">회원정보수정</li>
                    <li className="text-gray-600">단골매장</li>
                </ul>
            </div>

            {/* 아이콘 메뉴 섹션 */}
            <div className="py-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-purple-500 text-2xl mb-2" />
                        <span className="text-sm text-gray-700">공지사항</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faGift} className="text-purple-500 text-2xl mb-2" />
                        <span className="text-sm text-gray-700">이벤트</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faUser} className="text-purple-500 text-2xl mb-2" />
                        <span className="text-sm text-gray-700">결제내역</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faBell} className="text-purple-500 text-2xl mb-2" />
                        <span className="text-sm text-gray-700">쿠폰북</span>
                    </div>
                </div>
            </div>

            {/* 예약 현황 */}
            <div className="py-6">
                <div className="text-sm text-gray-700 font-semibold mb-2">예약 현황</div>
                <div className="text-sm text-gray-600 flex justify-between">
                    <span>03/13 - 03/14 | 청담지점</span>
                    <span className="text-purple-500 font-medium">레인지로버 스포츠</span>
                </div>
            </div>

            {/* 마일리지 및 하단 메뉴 */}
            <div className="py-6">
                <div className="bg-purple-500 text-white text-center py-3 rounded-lg font-semibold text-lg">
                    마일리지 1,000원
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button className="border border-purple-500 text-purple-500 py-2 rounded-lg font-medium">
                        고객센터
                    </button>
                    <button className="border border-gray-300 text-gray-500 py-2 rounded-lg font-medium">
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPageComponent;
