
function HeaderLayout() {
    return (
        <header className="fixed top-0 left-0 w-full h-[60px] bg-white shadow-md flex items-center justify-between px-4">
            <div className="text-yellow-500 text-3xl">
                &#9776; {/* 햄버거 메뉴 아이콘 */}
            </div>
            <div className="text-yellow-500 text-2xl font-bold">
                e<span className="text-gray-800">mart</span>24
            </div>
        </header>
    );
}

export default HeaderLayout;
