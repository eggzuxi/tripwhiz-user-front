import { useNavigate } from 'react-router-dom';


//SY 작품
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
        <div className="bg-white w-full min-h-screen"
        >
            {/* Home 아이콘 */}
            <div
                className="w-full flex justify-end pt-6 pr-4"
                onClick={() => navigate("/main")}
            >
                <img
                    src="/images/home.png"
                    alt="Home Icon"
                    className="w-6 h-6 cursor-pointer"
                />
            </div>

            <div className="w-full text-center pt-16 pb-8">
                <h1 className="text-3xl font-nanum-gothic font-bold text-gray-800 mb-4">
                    어떤 여행을 원하시나요?
                </h1>
                <p className="text-lg font-nanum-gothic text-gray-500 mt-2 break-words">
                    다양한 여행 테마 중 하나를<br/>선택하시면 맞춤 상품을 추천드릴게요.
                </p>
            </div>


            {/* 테마 카드 그리드 */}
            <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 w-full pt-2 pb-8">
                {themes.map((theme) => (
                    <div key={theme.id} className="flex flex-col items-center mb-2">
                        <button
                            onClick={() => handleThemeClick(theme.id)}
                            className="relative overflow-hidden rounded-full shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-40 h-40"
                        >
                            <img
                                src={theme.image}
                                alt={theme.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </button>
                    </div>
                ))}
            </div>


            {/* 테마 선택 건너뛰기 버튼 */}
            <button
                onClick={handleSkipClick}
                className="fixed bottom-6 right-6 text-lg text-gray-800 font-semibold rounded-lg px-4 py-2 transition duration-300"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default ThemePage;
