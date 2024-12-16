import { useState, useEffect } from "react";

import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/AuthStore.ts";
import MainProductListComponent from "../components/main/MainProductListComponent.tsx";
import {getCategories} from "../api/categoryAPI.ts";
import MainCarouselComponent from "../components/main/MainCarouselComponent.tsx";
import MainServiceComponent from "../components/main/MainServiceComponent.tsx";
import SampleChatUI from "../components/chatbot/SampleChatUI.tsx";


interface Category {
    cno: number;
    cname: string;
}


const MainPage = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const { name } = useAuthStore(); // 로그인한 사용자 이름 가져오기
    const navigate = useNavigate();


    // 카테고리 데이터 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data: Category[] = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]); // 에러 시 빈 배열로 설정

            }
        };

        fetchCategories();
    }, []);




    return (
        <div className="flex flex-col bg-white h-screen">

            {/* 캐러셀 */}
            <MainCarouselComponent />

            {/* 서비스 한눈에 보기 */}
            <MainServiceComponent />

            {/* 강력추천 섹션 */}
            <div className="mt-6 px-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="flex items-center ml-2 text-lg font-bold text-gray-700">
                        {name ? `${name}님 위한 강력 추천 🎁` : "강력 추천 🎁"}
                    </h2>
                    <div
                        className="text-sm text-gray-500 cursor-pointer"
                        onClick={() => navigate("/product/list")}
                    >
                        전체보기 &gt;
                    </div>
                </div>


                {/* 상품 리스트 컴포넌트 */}
                <MainProductListComponent categories={categories} />

                {/*챗봇*/}
                <SampleChatUI/>

            </div>


        </div>
    );
};

export default MainPage;
