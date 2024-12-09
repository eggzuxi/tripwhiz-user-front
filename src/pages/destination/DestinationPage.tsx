import { useNavigate } from "react-router-dom";
import { useDestination } from "../../hooks/useDestination.ts";
import { useEffect, useState } from "react";

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

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 2초 후 로딩 상태 종료
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // 타이머 정리
    }, []);

    // 로딩 화면
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <h1 className="text-4xl font-bold text-gray-800 animate-pulse">
                    <img
                        src="/images/tripwhiz_logo.png"
                        alt="ewhiz"
                        className="w-32 h-18 mr-2"
                    />
                </h1>
            </div>
        );
    }

    const handleDestinationClick = async (destinationId: number) => {
        console.log("Destination ID:", destinationId);

        fetchDestination(destinationId) // 데이터 호출
            .then(() => console.log("After fetching destination:", fetchDestination))
            .catch((error) => console.error("Failed to fetch destination:", error));

        navigate("/theme"); // 테마 선택 페이지로 이동
    };

    const handleSkipClick = () => {
        // 목적지 선택 건너뛰기 버튼 클릭 시 전체 상품 리스트로 이동
        navigate("/product/list");
    };

    return (
        <div
            className="font-roboto min-h-screen bg-gray-50 flex flex-col items-start px-6 space-y-6"
            style={{marginTop: "500px"}} // HeaderLayout의 높이만큼 여백 추가
        >
            {/* Home 아이콘 */}
            <div
                className="w-full flex justify-end pt-6 pr-2"
                onClick={() => navigate("/main")}
            >
                <img
                    src="/images/home.png"
                    alt="Home Icon"
                    className="w-6 h-6 cursor-pointer"
                />
            </div>

            <div className="w-full text-center">
                <h1 className="text-3xl font-nanum-gothic font-bold text-gray-800 mb-2">
                    어디로 떠나시나요?
                </h1>
                <p className="text-lg font-nanum-gothic text-gray-500 mt-2">
                    다양한 여행지 중에 하나를 선택하세요.
                </p>
            </div>

            {/* 국가 카드 리스트 */}
            <div className="w-full space-y-2 pb-8">
                {destinations.map((destination) => (
                    <button
                        key={destination.id}
                        onClick={() => handleDestinationClick(destination.id)}
                        className="relative overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full text-left"
                    >
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-48 object-cover" // 고정된 높이 설정 (h-60)
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                            <h2 className="font-faculty-glyphic font-semibold text-white text-2xl opacity-95 pl-4 pb-2">
                                {destination.name}
                            </h2>
                        </div>
                    </button>
                ))}
            </div>


            <button
                onClick={handleSkipClick}
                className="fixed bottom-6 right-6 bg-gray-300 bg-opacity-80 text-white font-semibold rounded-lg px-4 py-2 shadow-md border border-gray-300 hover:bg-gray-100 transition duration-300"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default DestinationPage;
