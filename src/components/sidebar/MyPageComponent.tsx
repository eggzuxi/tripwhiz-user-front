import useAuthStore from "../../store/AuthStore.ts";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

const MyPageComponent = () => {
    const { name, email, logout } = useAuthStore(); // 사용자 정보 및 로그아웃 함수 가져오기
    const navigate = useNavigate();

    const handleLogout = (): void => {
        startTransition(() => {
            logout(); // 상태 초기화 및 세션 스토리지 초기화
            navigate("/main"); // 메인 페이지로 이동
        });
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center p-4 overflow-y-auto">
            {/* Profile Background Section */}
            <div
                className="w-full h-80 bg-gray-300 rounded-t-lg mb-6"
            ></div>

            {/* Profile Header Card */}
            <div className="w-full bg-white p-6 text-gray-900 flex flex-col items-center shadow-md rounded-lg -mt-16 mb-6">
                <h1 className="text-xl font-semibold text-gray-800">{name ? `${name}님 환영합니다` : "회원님 환영합니다"}</h1>
                <p className="text-sm text-gray-600 mt-1">{email || "example@email.com"}</p>
                <button className="mt-4 px-6 py-2 bg-purple-500 text-white text-sm font-medium rounded-full">
                    내 정보 보기
                </button>
            </div>

            {/* Two Cards per Row for Menu Items */}
            <div className="w-full bg-white grid grid-cols-2 gap-6 mt-6">
                {[
                    { label: "My Address", icon: "📍" },
                    { label: "Account", icon: "👤" },
                    { label: "Notifications", icon: "🔔" },
                    { label: "Devices", icon: "📱" },
                    { label: "Passwords", icon: "🔑" },
                    { label: "Language", icon: "🌍" }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/profile/${item.label.toLowerCase().replace(' ', '-')}`)}
                    >
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-lg font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className="text-gray-400">›</span>
                    </div>
                ))}
            </div>

            {/* Mileage and Logout Section */}
            <div className="w-full mt-8 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold text-gray-800">마일리지</div>
                    <div className="text-purple-500 text-lg font-bold">1,000원</div>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg">
                    고객센터
                </button>
                <button
                    onClick={handleLogout}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 text-gray-500 text-sm font-medium rounded-lg"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MyPageComponent;
