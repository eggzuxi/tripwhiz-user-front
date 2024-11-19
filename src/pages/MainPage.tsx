import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "../firebase/firebaseConfig.ts";
import {
    faBagShopping,
    faCalendarCheck,
    faCalendarDay, faClipboardCheck, faClock,
    faGift,
    faTruck,
    faWineBottle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function MainPage() {

    async function requestPermission() {

        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {

            alert("Notification granted!")
            const token = await getToken(messaging, {

                vapidKey: 'BL6UBkkoPxHqNi2mejjnA0YUyS7vb_v8MTop2UxYOnZknlfy76wdE-GfGTBkaoAQOqWEH8woIM9OulqEeCW_ioc',

            });

            //We can send token to server
            console.log("Token generated : ", token);

        } else if (permission === "denied") {

            //notifications are blocked
            alert("You denied for the notification");

        }
    }

    useEffect(() => {

        requestPermission();

    }, []);

    onMessage(messaging, (payload) => {
        console.log(payload);
        alert("On Message ")
    });

    return (
        <div>
            {/* 메인 레이아웃 */}
            <div className="flex-1 overflow-y-auto mt-14 pt-10">
                {/* 메인 배너 */}
                <div className="px-4">
                    <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/800x150"
                            alt="광고 배너"
                            className="w-full h-[150px] object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm py-1 text-center">
                            체크의 풍미 가득 맥주
                        </div>
                    </div>
                </div>

                {/* 강력추천 섹션 */}
                <div className="mt-6 px-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">박신영님 위한 강력추천🎁</h2>
                        <div className="text-sm text-gray-500 cursor-pointer">전체보기 &gt;</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* 상품 카드 */}
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="상품 이미지"
                                        className="w-full h-[100px] object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                                        1+1
                                    </div>
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm text-gray-800 font-medium">상품 제목 {index + 1}</h3>
                                    <div className="text-xs text-gray-500">매장행사</div>
                                    <div className="text-base font-bold text-gray-800">2,800원</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 주요 서비스 섹션 */}
                <div className="mt-6 px-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">주요 서비스 😎</h2>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {[
                            { icon: faWineBottle, label: "보틀오더" },
                            { icon: faCalendarCheck, label: "예약픽업" },
                            { icon: faCalendarDay, label: "오늘픽업" },
                            { icon: faTruck, label: "바로배달" },
                            { icon: faGift, label: "이벤트" },
                            { icon: faBagShopping, label: "수화물보관" },
                            { icon: faClipboardCheck, label: "재고확인" },
                            { icon: faClock, label: "택배예약" },
                        ].map((service, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-white w-12 h-12 flex items-center justify-center rounded-full mb-2">
                                    <FontAwesomeIcon icon={service.icon} className="text-yellow-400 text-xl" />
                                </div>
                                <span className="text-sm text-gray-700">{service.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 하단 배너 */}
                <div className="relative bg-gray-200 overflow-hidden mt-6">
                    <img
                        src="https://via.placeholder.com/800x150"
                        alt="프로모션 배너"
                        className="w-full h-[150px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm py-1 text-center">
                        라면 유포면 오늘픽업 반값할인쿠폰 100% 증정
                    </div>
                </div>

                {/* 카테고리 선택 */}
                <div className="bg-white px-4 py-2">
                    <div className="flex space-x-4 overflow-x-auto">
                        {["간편식사", "과자", "생활용품", "아이스크림", "음료"].map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 ${
                                    index === 0 ? "border-b-2 border-black font-bold" : "text-gray-500"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 필터 버튼 */}
                <div className="flex justify-center bg-white py-2 space-x-4">
                    {["1+1", "2+1", "세일"].map((filter, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 border rounded-full ${
                                index === 0 ? "bg-black text-white" : "text-black border-black"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* 행사 상품 리스트 */}
                <div className="px-4">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                                <div className="relative">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt={`상품 ${index + 1}`}
                                        className="w-full h-[120px] object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
                                        1+1
                                    </div>
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm text-gray-800 font-medium">상품 이름 {index + 1}</h3>
                                    <div className="text-xs text-gray-500 line-through">3,200원</div>
                                    <div className="text-sm text-black font-bold">2,200원</div>
                                    <div className="text-xs text-green-600">매장행사</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MainPage;