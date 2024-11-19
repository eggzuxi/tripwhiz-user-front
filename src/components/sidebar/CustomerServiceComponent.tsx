function CustomerServiceComponent() {
    return (
        <div className="w-full h-full bg-white p-4 pt-20"> {/* 전체 배경 흰색 */}
            {/* 상단 헤더 */}
            <div className="text-center py-6">
                <h1 className="text-xl font-semibold text-gray-800">고객센터</h1>
                <p className="text-sm text-gray-600 mt-2">저희가 도와드리겠습니다.</p>
            </div>

            {/* 자주 묻는 질문 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">자주 묻는 질문</h2>
                <ul className="space-y-4">
                    <li className="text-gray-600">배송 관련 문의</li>
                    <li className="text-gray-600">주문 취소 및 변경</li>
                    <li className="text-gray-600">반품 및 환불 정책</li>
                    <li className="text-gray-600">기타 서비스 문의</li>
                </ul>
            </div>

            {/* 문의하기 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">문의하기</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-yellow-400 text-white py-2 px-4 rounded-lg font-medium text-sm">
                        전화 문의
                    </button>
                    <button className="border border-yellow-400 text-yellow-400 py-2 px-4 rounded-lg font-medium text-sm">
                        이메일 문의
                    </button>
                </div>
            </div>

            {/* 운영 시간 섹션 */}
            <div className="py-6">
                <h2 className="text-lg font-medium text-gray-700 mb-4">운영 시간</h2>
                <p className="text-sm text-gray-600">
                    월~금: 9:00 AM - 6:00 PM <br />
                    주말 및 공휴일: 휴무
                </p>
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

export default CustomerServiceComponent;
