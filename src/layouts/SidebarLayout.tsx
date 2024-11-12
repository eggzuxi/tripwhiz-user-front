import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    onClose: () => void;
}

function SidebarLayout({ onClose }: SidebarProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const toggleDropdown = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const menuItems = [
        { name: 'Pickup', subItems: ['하위 메뉴', '하위 메뉴', '하위 메뉴'] },
        { name: '메뉴 2', subItems: ['하위 메뉴', '하위 메뉴', '하위 메뉴'] },
        { name: '메뉴 3', subItems: ['하위 메뉴', '하위 메뉴', '하위 메뉴'] },
        { name: '메뉴 4', subItems: ['하위 메뉴', '하위 메뉴', '하위 메뉴'] },
        { name: '메뉴 5', subItems: ['하위 메뉴', '하위 메뉴', '하위 메뉴'] },
    ];

    return (
        <div className="fixed top-0 right-0 w-[250px] h-full bg-white shadow-lg flex flex-col p-4 z-50">
            {/* 환영 메시지 */}
            <div className="text-gray-800 font-semibold mb-4 flex items-center justify-between">
                ㅇㅇㅇ님 환영합니다
                <FontAwesomeIcon icon={faUser} className="text-gray-700" />
            </div>

            {/* 닫기 버튼 */}
            <button className="self-end mb-4 text-gray-500" onClick={onClose}>X</button>

            <ul className="space-y-2 list-none p-0 text-left">
                {menuItems.map((menu) => (
                    <li key={menu.name} className="text-gray-800 cursor-pointer">
                        <div onClick={() => toggleDropdown(menu.name)} className="flex items-center justify-between">
                            {menu.name}
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className={`transition-transform text-[#FFD400] ${
                                    activeMenu === menu.name ? 'rotate-180' : ''
                                }`}
                            />
                        </div>
                        {activeMenu === menu.name && (
                            <ul className="space-y-1 list-none p-0">
                                {menu.subItems.map((subItem, index) => (
                                    <li key={index} className="text-gray-600 pl-0">{subItem}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SidebarLayout;
