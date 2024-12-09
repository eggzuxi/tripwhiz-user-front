import { useNavigate } from "react-router-dom";
import { useDestination } from "../../hooks/useDestination.ts";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const destinations = [
    { id: 1, name: "Cambodia", image: "/images/country/Cambodia.jpg" },
    { id: 2, name: "Malaysia", image: "/images/country/Malaysia.png" },
    { id: 3, name: "Japan", image: "/images/country/Japan.jpg" },
    { id: 4, name: "Vietnam", image: "/images/country/Vietnam.png" },
    { id: 5, name: "Philippines", image: "/images/country/Philippines.png" },
    { id: 6, name: "Thailand", image: "/images/country/Thailand.png" },
];

function DestinationPage(): JSX.Element {
    const navigate = useNavigate();
    const fetchDestination = useDestination((state) => state.fetchDestination);

    const [isLoading, setIsLoading] = useState(true);
    const [currentBackground, setCurrentBackground] = useState(destinations[0].image);
    const [cardPosition, setCardPosition] = useState(0);

    useEffect(() => {
        // 2초 후 로딩 상태 종료
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // 로딩 화면
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <img
                    src="/images/tripwhiz logo.png"
                    alt="ewhiz"
                    className="animate-pulse w-40 h-40"
                />
            </div>
        );
    }

    const handleDestinationClick = async (destinationId: number) => {
        fetchDestination(destinationId)
            .then(() => console.log("Destination fetched:", fetchDestination))
            .catch((error) => console.error("Error fetching destination:", error));
        navigate("/theme");
    };

    const handleSkipClick = () => {
        // 목적지 선택 건너뛰기 버튼 클릭 시 전체 상품 리스트로 이동
        navigate("/product/list");
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        beforeChange: (current: number, next: number) => {
            setCurrentBackground(destinations[next].image); // 배경 이미지 동기화
            setCardPosition(next); // 카드 위치 추적
        },
    };

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col"
            style={{ backgroundImage: `url(${currentBackground})` }}
        >
            <div className="text-center pt-6 pb-4">
                <h1 className="text-3xl font-bold text-white">어디로 떠나시나요?</h1>
                <p className="text-lg text-white">다양한 여행지 중에 하나를 선택하세요.</p>
            </div>

            {/* 캐러셀 */}
            <div
                className="flex flex-col justify-center items-center flex-1 pb-4"
                style={{ minHeight: 'calc(100vh + 150px)' }} // 부모 컨테이너 높이 충분히 확보
            >
                <Slider
                    {...sliderSettings}
                    className="relative z-10 w-full max-w-md"
                >
                    {destinations.map((destination, index) => (
                        <div
                            key={destination.id}
                            className="relative flex justify-center items-center"
                            onClick={() => handleDestinationClick(destination.id)}
                        >
                            <div
                                className={`w-80 h-[500px] bg-white shadow-lg rounded-xl overflow-hidden relative flex items-center justify-center transition-transform duration-500 ${
                                    cardPosition === index ? 'transform translate-y-[-20px]' : '' // 중간 카드만 위로 조금 올라가게 애니메이션 적용
                                }`}
                            >
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="object-cover w-[calc(100%-30px)] h-[calc(100%-80px)] mt-32 mb-20 rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <button
                onClick={handleSkipClick}
                className="fixed bottom-6 right-6 text-lg text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-gray-100 transition duration-300"
            >
                Skip &#62;
            </button>

        </div>
    );
}

export default DestinationPage;
