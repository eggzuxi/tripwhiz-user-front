import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper as SwiperClass } from "swiper/types";

const MainCarouselComponent: React.FC = () => {
    const [slideIndex, setSlideIndex] = useState<number>(0);

    // 슬라이드 변경 시 현재 슬라이드 인덱스를 업데이트
    const handleSlideChange = (swiper: SwiperClass) => {
        setSlideIndex(swiper.realIndex);
    };

    return (
        <div className="relative z-30 bg-gray-200 h-[50vh]">
            <Swiper
                className="w-full h-full object-cover"
                onSlideChange={handleSlideChange}
                modules={[Pagination]}
                loop={true} // 루프 활성화
                pagination={{
                    el: ".swiper-pagination",
                    type: "custom",
                    renderCustom: (_, current, total) => {
                        // renderCustom에서 매개변수 '_', current, total 사용
                        return `<span class="block text-right mr-4 font-bold text-base text-white">${current} / ${total}</span>`;
                    },
                }}
            >
                <SwiperSlide>
                    <img
                        src="/images/main/m4.jpg"
                        alt="배너 이미지 1"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className={`absolute top-3/4 left-0 w-full text-left text-white transform transition-all duration-1000 ${
                            slideIndex === 0 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                        style={{ zIndex: 10 }}
                    >
                        <div className="pl-4">
                            <h1 className="text-3xl font-bold">BELLROY</h1>
                            <p className="mt-2 text-md">부드럽고 견고하며, 가볍지만 강한 벨로이</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="/images/main/m5.jpg"
                        alt="배너 이미지 2"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className={`absolute top-3/4 left-0 w-full text-left text-white transform transition-all duration-1000 ${
                            slideIndex === 1 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                        style={{ zIndex: 10 }}
                    >
                        <div className="pl-4">
                            <h1 className="text-3xl font-bold">BRAND NEW</h1>
                            <p className="mt-2 text-md">신제품 출시! 벨로이의 새로운 컬렉션</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="/images/main/m6.jpg"
                        alt="배너 이미지 3"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className={`absolute top-3/4 left-0 w-full text-left text-white transform transition-all duration-1000 ${
                            slideIndex === 2 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                        style={{ zIndex: 10 }}
                    >
                        <div className="pl-4">
                            <h1 className="text-3xl font-bold">TRAVEL IN STYLE</h1>
                            <p className="mt-2 text-lg">여행을 스타일리시하게, 벨로이와 함께</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="/images/main/m7.jpg"
                        alt="배너 이미지 4"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className={`absolute top-3/4 left-0 w-full text-left text-white transform transition-all duration-1000 ${
                            slideIndex === 3 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                        style={{ zIndex: 10 }}
                    >
                        <div className="pl-4">
                            <h1 className="text-3xl font-bold">DURABLE AND LIGHT</h1>
                            <p className="mt-2 text-lg">내구성이 뛰어난 동시에 가벼운 벨로이 백팩</p>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="/images/main/m8.jpg"
                        alt="배너 이미지 5"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className={`absolute top-3/4 left-0 w-full text-left text-white transform transition-all duration-1000 ${
                            slideIndex === 4 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                        }`}
                        style={{ zIndex: 10 }}
                    >
                        <div className="pl-4">
                            <h1 className="text-3xl font-bold">ECO FRIENDLY</h1>
                            <p className="mt-2 text-lg">친환경 소재로 제작된 벨로이 제품</p>
                        </div>
                    </div>
                </SwiperSlide>
                <div className="swiper-pagination"></div>
            </Swiper>
        </div>
    );
};

export default MainCarouselComponent;
