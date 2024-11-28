function NoticeComponent() {
    return (
        <div className="h-screen bg-white overflow-y-auto p-4">
            {/* 상단 헤더 */}
            <div className="text-center py-6">
                <h1 className="text-xl font-semibold text-gray-800">공지사항</h1>
                <p className="text-sm text-gray-600 mt-2">최신 공지사항을 확인하세요.</p>
            </div>

            {/* 공지사항 리스트 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">최근 공지사항</h2>
                <ul className="space-y-4">
                    <li className="text-gray-600">
                        <span className="font-semibold text-gray-800">[이벤트]</span> 2024년 봄맞이 할인 이벤트 안내
                    </li>
                    <li className="text-gray-600">
                        <span className="font-semibold text-gray-800">[업데이트]</span> 신규 기능 추가 및 시스템 점검 일정
                    </li>
                    <li className="text-gray-600">
                        <span className="font-semibold text-gray-800">[공지]</span> 개인정보 처리방침 개정 안내
                    </li>
                    <li className="text-gray-600">
                        <span className="font-semibold text-gray-800">[알림]</span> 고객센터 운영시간 변경 안내
                    </li>
                </ul>
            </div>

            {/* FAQ & QnA 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">FAQ & QnA</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-yellow-400 text-white py-3 px-6 rounded-lg font-medium text-sm">
                        FAQ
                    </button>
                    <button className="border border-yellow-400 #2452a3 py-3 px-6 rounded-lg font-medium text-sm">
                        QnA
                    </button>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="py-6">
                <button className="bg-white border border-yellow-400 text-yellow-400 py-3 px-6 rounded-lg font-medium text-sm w-full">
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default NoticeComponent;
