import {startTransition, useState} from 'react';
import Sidebar from '../layouts/SidebarLayout';
import { useNavigate } from "react-router-dom";

function HeaderLayout() {

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const moveToHome = () => {
        startTransition(() => {
            navigate("/main"); // 메인 페이지로 이동
        });
    };

    const moveToCart  = () => {
        navigate({
            pathname: `/cart`,
        });
    };

    return (
        <div>
            <header
                className="fixed top-0 left-0 w-full h-[65px] bg-white flex items-center justify-between px-4 z-50">
                <div className="cursor-pointer" onClick={moveToHome}>
                    {/* 로고 이미지 삽입 */}
                    <img
                        src="/images/tripwhiz_logo.png" // 로고 이미지 경로 설정
                        alt="emart24 logo"
                        className="h-16" // Tailwind로 이미지 높이 설정
                    />
                </div>

                <div className="flex items-center">
                    {/* 검색 이미지 */}
                    <img
                        src="/images/header/free-icon-search-interface-symbol-54481.png" // 검색 아이콘 이미지 경로
                        alt="Notification Icon"
                        className="h-5 w-5 cursor-pointer mr-4"
                    />

                    {/* 장바구니 이미지 */}
                    <img
                        src="/images/header/shopping-cart.png" // 장바구니 아이콘 이미지 경로
                        alt="Cart Icon"
                        onClick={moveToCart}
                        className="h-5 w-5 cursor-pointer mr-4 mt-0.5"
                    />

                    <div
                        className="text-yellow-500 text-3xl cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        &#9776; {/* Hamburger menu icon */}
                    </div>
                </div>
            </header>
            {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
        </div>
    );
}

export default HeaderLayout;
