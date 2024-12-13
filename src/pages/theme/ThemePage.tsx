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
        <div
            className="font-roboto min-h-screen bg-gray-50 flex flex-col items-start px-6 space-y-6"
            style={{marginTop: "550px"}} // HeaderLayout의 높이만큼 여백 추가
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
                <h1 className="text-3xl font-nanum-gothic font-bold text-gray-800 mb-4">
                    어떤 여행을 원하시나요?
                </h1>
                <p className="text-lg font-nanum-gothic text-gray-500 mt-2 break-words">
                    다양한 여행 테마 중 하나를<br/>선택하시면 맞춤 상품을 추천드릴게요.
                </p>
            </div>


            {/* 테마 카드 그리드 */}
            <div className="w-full space-y-2 pb-8">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => handleThemeClick(theme.id)}
                        className="relative overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full text-left"
                    >
                    <img
                        src={theme.image}
                        alt={theme.name}
                        className="w-full h-48 object-cover"
                    />
                    </button>
                ))}
            </div>

            {/* 테마 선택 건너뛰기 버튼 */}
            <button
                onClick={handleSkipClick}
                className="fixed bottom-6 right-6 text-lg text-white font-semibold rounded-lg px-4 py-2 transition duration-300"
            >
                Skip &#62;
            </button>
        </div>
    );
}

export default ThemePage;
