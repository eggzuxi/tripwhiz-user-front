function ServiceComponent() {
    return (
        <div className="w-full h-full bg-white p-4 pt-20"> {/* 전체 배경 흰색 */}
            {/* 상단 헤더 */}
            <div className="text-center py-6">
                <h1 className="text-xl font-semibold text-gray-800">서비스</h1>
                <p className="text-sm text-gray-600 mt-2">유용한 서비스를 확인하세요.</p>
            </div>

            {/* 서비스 리스트 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">서비스 목록</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                        <span className="text-gray-800 font-medium">수화물 서비스</span>
                    </li>
                    <li className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                        <span className="text-gray-800 font-medium">내 주변 매장 재고 확인</span>
                    </li>
                    <li className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                        <span className="text-gray-800 font-medium">매장 찾기</span>
                    </li>
                </ul>
            </div>

            {/* 하단 버튼 */}
            <div className="py-6">
                <button className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium text-sm w-full">
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default ServiceComponent;
