import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // 돋보기 아이콘
import useAuthStore from "../store/AuthStore.ts";
// import { useNavigate } from "react-router-dom";

function MainPage() {
    const { name } = useAuthStore(); // 로그인한 사용자 이름 가져오기
    const [searchQuery, setSearchQuery] = useState("");
    // const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`검색어: ${searchQuery}`);
        setSearchQuery(""); // 검색 후 입력창 초기화
    };

    return (
        <div className="flex flex-col bg-white h-screen"> {/* 전체 배경 흰색 */}
            {/* 스크롤 가능한 메인 콘텐츠 */}
            <div className="flex-1 overflow-y-auto">
                {/* 검색창 */}
                <div className="p-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <div className="relative flex-1">
                            {/* 검색 입력창 크기 확대 */}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="원하는 상품을 검색하세요"
                                className="w-full bg-gray-100 text-sm px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* 돋보기 아이콘 */}
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{
                                    color: "#1D2D5F",
                                    fontSize: "20px",
                                    position: "absolute",
                                    right: "20px", // 오른쪽 끝에 배치
                                    top: "50%",
                                    transform: "translateY(-50%)", // 세로 중앙 맞춤
                                }}
                            />
                        </div>
                    </form>
                </div>

                {/* 카테고리 선택 */}
                <div className="bg-white px-4 py-2">
                    <div className="flex flex-row space-x-4 overflow-x-auto">
                        {["수납/편의", "의류", "안전/위생", "악세사리", "액티비티 용품"].map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 whitespace-nowrap ${
                                    index === 0 ? "border-b-2 border-black font-bold" : "text-gray-500"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 메인 배너 */}
                <div className="px-4">
                    <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/800x150"
                            alt="광고 배너"
                            className="w-full h-[150px] object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm py-1 text-center">
                            체크의 풍미 가득 맥주
                        </div>
                    </div>
                </div>

                {/* 강력추천 섹션 */}
                <div className="mt-6 px-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">
                            {name ? `${name}님 위한 강력추천 🎁` : "강력추천 🎁"}
                        </h2>
                        <div className="text-sm text-gray-500 cursor-pointer">전체보기 &gt;</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="상품 이미지"
                                        className="w-full h-[100px] object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                                        1+1
                                    </div>
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm text-gray-800 font-medium">상품 제목 {index + 1}</h3>
                                    <div className="text-xs text-gray-500">매장행사</div>
                                    <div className="text-base font-bold text-gray-800">2,800원</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 주요 서비스 섹션 */}
                <div className="mt-6 px-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">주요 서비스 🛒</h2>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {[
                            { icon: "🍷", label: "보틀오더" },
                            { icon: "📆", label: "예약픽업" },
                            { icon: "⏰", label: "오늘픽업" },
                            { icon: "🚚", label: "바로배달" },
                            { icon: "🎁", label: "이벤트" },
                            { icon: "🛍️", label: "수화물보관" },
                            { icon: "📋", label: "재고확인" },
                            { icon: "📦", label: "택배예약" }
                        ].map((service, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full mb-2">
                                    <span className="text-2xl">{service.icon}</span>
                                </div>
                                <span className="text-sm text-gray-700">{service.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 하단 배너 */}
                <div className="relative bg-gray-200 overflow-hidden mt-6">
                    <img
                        src="https://via.placeholder.com/800x150"
                        alt="프로모션 배너"
                        className="w-full h-[150px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm py-1 text-center">
                        라면 유포면 오늘픽업 반값할인쿠폰 100% 증정
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
