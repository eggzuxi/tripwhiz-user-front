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
    { id: 4, name: "Vietnam", image: "/images/country/Vietnam.jpg" },
    { id: 5, name: "Philippines", image: "/images/country/Philippines.jpg" },
    { id: 6, name: "Thailand", image: "/images/country/Thailand.jpg" },
];

function DestinationPage(): JSX.Element {
    const navigate = useNavigate();
    const fetchDestination = useDestination((state) => state.fetchDestination);

    const [isLoading, setIsLoading] = useState(true);
    const [currentBackground, setCurrentBackground] = useState(destinations[0].image);
    const [cardPosition, setCardPosition] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white overflow-hidden">
                <img
                    src="/images/tripwhiz_logo.png"
                    alt="ewhiz"
                    className="animate-pulse w-40 h-15"
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
        navigate("/theme");
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        beforeChange: (_: number, next: number) => { // current 대신 _
            setCurrentBackground(destinations[next].image);
            setCardPosition(next);
        },
    };


    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden"
            style={{backgroundImage: `url(${currentBackground})`}}
        >
            <div
                className="w-full flex justify-end pt-6 pr-4" // 오른쪽 여백 pr-4 추가
                onClick={() => navigate("/main")}
            >
                <img
                    src="/images/home.png"
                    alt="Home Icon"
                    className="w-6 h-6 cursor-pointer"
                    style={{
                        filter: "brightness(0) invert(1)", // 이미지를 흰색으로 변환
                    }}
                />
            </div>

            <div className="text-center pt-20 pb-8">
                <h1 className="text-4xl font-bold text-white">어디로 떠나시나요?</h1>
                <p className="text-lg text-white mt-2">다양한 여행지 중에 하나를 선택하세요.</p>
            </div>

            <div
                className="flex justify-center items-center flex-1 pb-8"
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
                                    cardPosition === index ? "transform translate-y-[-40px]" : ""
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
                className="fixed bottom-6 right-6 text-lg text-white font-semibold rounded-lg px-4 py-2 transition duration-300"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default DestinationPage;
