import { useNavigate } from 'react-router-dom';
import { useDestination } from "../../hooks/useDestination.ts";

const destinations = [
    { id: 1, name: '캄보디아', image: '/images/Cambodia.png' },
    { id: 2, name: '말레이시아', image: '/images/Malaysia.png' },
    { id: 3, name: '일본', image: '/images/Japan.png' },
    { id: 4, name: '베트남', image: '/images/Vietnam.png' },
    { id: 5, name: '필리핀', image: '/images/Philippines.png' },
    { id: 6, name: '태국', image: '/images/Thailand.png' },
];

function DestinationPage(): JSX.Element {
    const navigate = useNavigate();
    const fetchDestination = useDestination((state) => state.fetchDestination);

    const handleDestinationClick = async (destinationId: number) => {

        console.log("Destination ID:", destinationId);  // 목적지 ID가 출력되는지 확인


        await fetchDestination(destinationId); // API를 통해 데이터 호출 및 전역 상태 저장

        console.log("After fetching destination:", fetchDestination); // 호출 후 상태 확인

        navigate('/theme'); // 테마 선택 페이지로 이동
    };

    const handleSkipClick = () => {
        // 목적지 선택 건너뛰기 버튼 클릭 시 전체 상품 리스트로 이동
        navigate('/theme');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4 pt-8">
            <h2 className="text-2xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                이번 여행의 목적지는 어디인가요?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg text-center mb-8">
                원하시는 여행지를 선택해보세요. 여행지에 딱 맞는 추천 상품들을 소개해 드릴게요.
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
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-95 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">{destination.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSkipClick}
                className="fixed bottom-4 right-4 bg-gray-400 text-white font-semibold rounded-full px-4 py-2 shadow-lg transition-colors duration-300 hover:bg-gray-500"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default DestinationPage;
