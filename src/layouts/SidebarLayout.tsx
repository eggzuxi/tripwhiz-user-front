import {startTransition, useEffect, useMemo} from 'react';
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
            { name: '마이페이지', path: '/side/mypage' },
            { name: '전체상품', path: '/product/list' },
            { name: '주문내역', path: '/side/myorder' },
            { name: 'My QR', path: '/side/myqr' },
            { name: '수화물 서비스', path: '/side/luggageservice' },
            { name: '고객센터', path: '/side/customerservice' }
        ],
        []
    );

    const handleMenuClick = (path: string) => {
        navigate(path);
        onClose(); // 사이드바 닫기
    };

    const handleLoginClick = () => {
        startTransition(() => {
            navigate("/member/login"); // 로그인 페이지로 이동
        });
        onClose(); // 사이드바 닫기
    };

    return (
        <div className="fixed top-0 right-0 w-[250px] h-full bg-white shadow-lg flex flex-col p-6 z-50">
            <div className="text-gray-800 font-semibold mb-6 flex items-center justify-between">
                {accessToken ? (
                    <>
                        <span className="mr-2">
                            {name ? `${name}님 환영합니다` : '환영합니다'}
                        </span>
                    </>
                ) : (
                    <span
                        className="text-black cursor-pointer"
                        onClick={handleLoginClick}
                    >
                        로그인
                    </span>
                )}
                {/* X 버튼을 오른쪽 끝으로 이동 */}
                <button
                    className="absolute top-6 right-6 text-gray-500"
                    onClick={onClose}
                >
                    X
                </button>
            </div>

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
