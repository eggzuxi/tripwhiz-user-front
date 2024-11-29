import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDestination } from "../../hooks/useDestination.ts";

const destinations = [
    { id: 1, name: "캄보디아", image: "/images/country/Cambodia.png" },
    { id: 2, name: "말레이시아", image: "/images/country/Malaysia.png" },
    { id: 3, name: "일본", image: "/images/country/Japan.png" },
    { id: 4, name: "베트남", image: "/images/country/Vietnam.png" },
    { id: 5, name: "필리핀", image: "/images/country/Philippines.png" },
    { id: 6, name: "태국", image: "/images/country/Thailand.png" },
];

function DestinationPage(): JSX.Element {
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();
    const fetchDestination = useDestination((state) => state.fetchDestination);

    useEffect(() => {
        // 2초 후 로딩 상태 종료
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // 타이머 정리
    }, []);

    const handleDestinationClick = async (destinationId: number) => {
        console.log("Destination ID:", destinationId);

        await fetchDestination(destinationId); // API를 통해 데이터 호출 및 전역 상태 저장
        console.log("After fetching destination:", fetchDestination);

        navigate("/theme"); // 테마 선택 페이지로 이동
    };

    const handleSkipClick = () => {
        // 목적지 선택 건너뛰기 버튼 클릭 시 전체 상품 리스트로 이동
        navigate("/theme");
    };

    // 로딩 화면
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <h1 className="text-4xl font-bold text-gray-800 animate-pulse">
                    <img
                        src="/images/tripwhiz logo.png"
                        alt="ewhiz"
                        className="w-32 h-18 mr-2"
                    />
                </h1>
            </div>
        );
    }


    return (
        <div className="font-roboto min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6 px-4 pt-8">
            <h2 className="text-2xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center tracking-tighter">
                이번 여행의 목적지는 어디인가요?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg text-center mb-8">
                원하시는 여행지를 선택해보세요.

            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
                {destinations.map((destination) => (
                    <div
                        key={destination.id}
                        onClick={() => handleDestinationClick(destination.id)}
                        className="relative cursor-pointer group focus-within:outline-none"
                    >
                        <div
                            className="overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                            <img
                                src={destination.image}
                                alt={destination.name}
                                className="w-full h-48 object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-navy-deep bg-opacity-20 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">{destination.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSkipClick}
                className="fixed bottom-6 right-6 bg-gray-300 text-white font-semibold rounded-full px-6 py-3 shadow-lg transition-colors duration-300 hover:bg-gray-400"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default DestinationPage;
