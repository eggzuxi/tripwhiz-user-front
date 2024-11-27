import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../layouts/SidebarLayout';
import { useNavigate } from "react-router-dom";

function HeaderLayout() {

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const moveToHome = () => {
        navigate({
            pathname: `/`
        });
    };

    const moveToCart = () => {
        navigate({
            pathname: `/cart`,
        });
    };

    return (
        <div>
            <header
                className="fixed top-0 left-0 w-full h-[65px] bg-white shadow-md flex items-center justify-between px-4 z-50">
                <div className="cursor-pointer" onClick={moveToHome}>
                    {/* 로고 이미지 삽입 */}
                    <img
                        src="/public/images/tripwhiz logo.png" // 로고 이미지 경로 설정
                        alt="emart24 logo"
                        className="h-8" // Tailwind로 이미지 높이 설정
                    />
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        onClick={moveToCart}
                        className="text-gray-700 mr-4 text-xl cursor-pointer"
                    />
                    <FontAwesomeIcon
                        icon={faBell}
                        className="text-gray-700 mr-4 text-xl cursor-pointer"
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
