import { useNavigate } from 'react-router-dom';



const themes = [
    { id: 1, name: '휴양', image: '/images/theme/Healing.png' },
    { id: 2, name: '비즈니스', image: '/images/theme/Business.png' },
    { id: 3, name: '미식', image: '/images/theme/Eating.png' },
    { id: 4, name: '쇼핑', image: '/images/theme/Shopping.png' },
    { id: 5, name: '액티비티', image: '/images/theme/Activity.png' },
    { id: 6, name: '문화', image: '/images/theme/Culture.png' }
];

function ThemePage(): JSX.Element {
    const navigate = useNavigate();

    const handleThemeClick = (themeId: number) => {
        // 선택한 테마에 맞는 상품 리스트로 이동
        navigate(`/product/list?tno=${themeId}`);
    };

    const handleSkipClick = () => {
        // 테마 선택 건너뛰기 버튼 클릭 시 전체 상품 리스트로 이동
        navigate('/product/list');
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
            {/* 페이지 제목 */}
            <h2 className="text-2xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                이번 여행의 테마는 무엇인가요?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg text-center mb-8">
                다양한 테마 중 하나를 선택해보세요. 여행에 딱 맞는 추천 상품들을 소개해 드릴게요.
            </p>

            {/* 테마 카드 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
                {themes.map((theme) => (
                    <div
                        key={theme.id}
                        onClick={() => handleThemeClick(theme.id)}
                        className="relative cursor-pointer group focus-within:outline-none"
                    >
                        <div
                            className="overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                            <img
                                src={theme.image}
                                alt={theme.name}
                                className="w-full h-48 object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-semibold">{theme.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 테마 선택 건너뛰기 버튼 */}
            <button
                onClick={handleSkipClick}
                className="fixed bottom-4 right-4 bg-gray-400 text-white font-semibold rounded-full px-4 py-2 shadow-lg transition-colors duration-300 hover:bg-gray-500"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default ThemePage;
