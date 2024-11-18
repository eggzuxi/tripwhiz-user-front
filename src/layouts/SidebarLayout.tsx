import { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore.ts";

interface SidebarProps {
    onClose: () => void;
}

interface MenuItem {
    name: string;
    path: string;
}

function SidebarLayout({ onClose }: SidebarProps) {
    const { name, email, accessToken } = useAuthStore((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("1--------------------");
        console.log(name);
    }, [name, email, accessToken]);

    const menuItems: MenuItem[] = useMemo(
        () => [
            { name: '서비스', path: '/side/service' },
            { name: '마이페이지', path: '/side/mypage' },
            { name: '공지사항', path: '/side/notice' },
            { name: '고객센터', path: '/side/customerservice' },
        ],
        []
    );

    const handleMenuClick = (path: string) => {
        navigate(path);
        onClose(); // 사이드바 닫기
    };

    return (
        <div className="fixed top-0 right-0 w-[250px] h-full bg-white shadow-lg flex flex-col p-4 z-50">
            <div className="text-gray-800 font-semibold mb-6 flex items-center justify-between">
                {name ? `${name}님 환영합니다` : '환영합니다'}
                <FontAwesomeIcon icon={faUser} className="text-gray-700" />
            </div>

            <button className="self-end mb-6 text-gray-500" onClick={onClose}>
                X
            </button>

            <ul className="space-y-6 list-none p-0 text-left">
                {menuItems.map((menu) => (
                    <li
                        key={menu.name}
                        className="text-gray-800 cursor-pointer"
                        onClick={() => handleMenuClick(menu.path)}
                    >
                        <div className="flex items-center">
                            {menu.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SidebarLayout;
