import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../layouts/SidebarLayout';

function HeaderLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <header className="fixed top-0 left-0 w-full h-[60px] bg-white shadow-md flex items-center justify-between px-4">
                <div className="text-yellow-500 text-2xl font-bold">
                    e<span className="text-gray-800">mart</span>24
                </div>
                <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 mr-2 text-xl" />
                    <FontAwesomeIcon icon={faBell} className="text-gray-700 mr-2 text-xl" />
                    <div className="text-yellow-500 text-3xl">&#9776;</div> {/* 햄버거 메뉴 아이콘 */}
                </div>
            </header>
            {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}
        </div>
    );
}

export default HeaderLayout;
