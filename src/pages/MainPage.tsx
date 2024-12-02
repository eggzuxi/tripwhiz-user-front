import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // 돋보기 아이콘
import useAuthStore from "../store/AuthStore.ts";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categoryAPI.ts";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



interface Category {
    cno: number;
    cname: string;
}

function MainPage() {
    const { name } = useAuthStore(); // 로그인한 사용자 이름 가져오기
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<Category[]>([]); // 동적 데이터 상태
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`검색어: ${searchQuery}`);
        setSearchQuery(""); // 검색 후 입력창 초기화
    };

    // 카테고리 클릭 시 해당 경로로 이동
    const handleCategoryClick = (cno: number) => {
        navigate(`/product/list?cno=${cno}`);
    };

    // 백엔드에서 카테고리 데이터를 가져오는 함수
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(); // API 호출
                setCategories(data); // 카테고리 상태 업데이트
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col bg-white h-screen">
            <div className="flex-1 overflow-y-auto"> {/* 스크롤을 활성화 */}
                {/* 검색창 */}
                <div className="p-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="원하는 상품을 검색하세요"
                                className="w-full bg-gray-100 text-sm px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{
                                    color: "#1D2D5F",
                                    fontSize: "20px",
                                    position: "absolute",
                                    right: "20px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>
                    </form>
                </div>

                {/* 카테고리 선택 */}
                <div className="bg-white-200 px-4 py-2">
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.cno}
                                onClick={() => handleCategoryClick(category.cno)}
                                className="px-4 py-2 bg-white text-gray-500 rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center whitespace-nowrap border border-yellow-400 shadow-none"
                            >
                                {category.cname}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Swiper 페러셀 */}
                <div className="px-4 mt-6">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000 }}  // 자동으로 슬라이드가 넘어가도록 설정
                    >
                        {/* 첫 번째 슬라이드 */}
                        <SwiperSlide>
                            <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    className="w-full h-[200px] object-cover"
                                    src="https://www.youtube.com/embed/Yugl6jVtr54?autoplay=1&mute=1"  // 자동 재생, 음소거
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </SwiperSlide>

                        {/* 두 번째 슬라이드 */}
                        <SwiperSlide>
                            <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    className="w-full h-[200px] object-cover"
                                    src="https://www.youtube.com/embed/Hi1AjmGA9zA?autoplay=1&mute=1"  // 자동 재생, 음소거
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </SwiperSlide>

                        {/* 세 번째 슬라이드 */}
                        <SwiperSlide>
                            <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                                <iframe
                                    className="w-full h-[200px] object-cover"
                                    src="https://www.youtube.com/embed/Vgt_XZgnsdk?autoplay=1&mute=1"  // 자동 재생, 음소거
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </SwiperSlide>
                    </Swiper>
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
                                        src="/public/images/product/m2.jpg"
                                        alt="상품 이미지"
                                        className="w-full h-[100px] object-cover"
                                    />
                                    <div
                                        className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
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
            </div>
        </div>
    );
}

export default MainPage;
