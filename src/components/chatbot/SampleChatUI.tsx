import { useState } from "react"; // React의 useState 훅을 임포트하여 컴포넌트의 상태를 관리합니다.
import { AiChat, useAsStreamAdapter } from '@nlux/react'; // NLUX의 AI 채팅 컴포넌트를 임포트합니다.
import '@nlux/themes/nova.css'; // Nova 테마 스타일을 임포트합니다.

import '../../App.css'; // 전체 앱의 스타일을 지정한 CSS 파일을 임포트합니다.

import { send } from './send.ts'; // 실제 API 전송 로직이 구현된 파일을 임포트합니다.
import { personas } from './Personas.tsx'; // 사용자 및 AI의 아바타와 정보를 설정한 파일을 임포트합니다.

function SampleChatUI() {
    const [isChatOpen, setIsChatOpen] = useState(false); // 채팅창의 열림/닫힘 상태를 관리하는 상태 변수입니다.
    const adapter = useAsStreamAdapter(send, []); // 스트림 어댑터를 생성하여 채팅 메시지를 서버로 전송하고 응답을 받아옵니다.

    // 채팅창 열기/닫기 토글 함수
    const toggleChat = () => {
        setIsChatOpen(prev => !prev); // 현재 열림/닫힘 상태를 반대로 설정합니다.
    };

    return (
        <div>
            {/* 오른쪽 하단 고정된 동그란 버튼 */}
            <button
                onClick={toggleChat} // 버튼 클릭 시 toggleChat 함수가 호출되어 채팅창이 열리거나 닫힙니다.
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%', // 원형 버튼을 만들기 위해 border-radius를 50%로 설정합니다.
                    backgroundColor: '#4A90E2', // 파란색 배경색 설정
                    color: 'white', // 글자색을 흰색으로 설정
                    fontSize: '24px',
                    cursor: 'pointer', // 마우스 커서가 포인터로 변경됩니다.
                    border: 'none',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // 그림자 설정
                    display: isChatOpen ? 'none' : 'block', // 채팅창이 열릴 때 버튼이 숨겨집니다.
                    zIndex: 1000 // 다른 요소보다 위에 배치되도록 설정
                }}
            >
                ✈️ {/* 버튼에 비행기 이모지를 추가 */}
            </button>

            {/* 모달 형태의 채팅 UI */}
            {isChatOpen && ( // 채팅창이 열렸을 때만 렌더링합니다.
                <div
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        right: '0',
                        width: '100%',
                        height: '100%',
                        maxWidth: '600px', // 최대 너비 설정으로 모바일에서도 적절히 보이도록 합니다.
                        borderRadius: '15px 15px 0 0', // 모서리 윗부분만 둥글게 처리
                        backgroundColor: '#FFFFFF', // 흰색 배경 설정
                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', // 그림자 설정으로 부드러운 효과
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 999 // 다른 요소보다 위에 표시되도록 설정
                    }}
                >
                    {/* 채팅 헤더 */}
                    <div
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#FFEB8E', // 헤더 배경을 파스텔 톤의 노란색으로 설정
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between', // 양쪽 끝에 요소 배치
                            alignItems: 'center',
                        }}
                    >
                        AI Assistant {/* 헤더에 타이틀 표시 */}
                        <button
                            onClick={toggleChat} // 닫기 버튼을 클릭 시 채팅창이 닫힙니다.
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '18px',
                                cursor: 'pointer',
                            }}
                        >
                            ✖ {/* 닫기 이모지 */}
                        </button>
                    </div>

                    {/* AiChat 컴포넌트 */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        <AiChat
                            adapter={adapter} // 어댑터를 AiChat 컴포넌트에 전달하여 메시지를 주고받습니다.
                            personaOptions={personas} // 사용자 및 AI 아바타 설정을 전달합니다.
                            displayOptions={{ colorScheme: 'light' }} // 밝은 색상 테마를 사용합니다.
                        />
                    </div>

                    {/* 하단 입력 및 전송 버튼 */}
                    <div style={{
                        padding: '10px',
                        borderTop: '1px solid #ddd', // 상단에 얇은 경계선 추가
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            placeholder="무엇을 도와 드릴까요?" // 입력 필드의 플레이스홀더
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '20px', // 둥근 모서리를 위한 설정
                                border: '1px solid #ddd',
                                outline: 'none',
                                fontSize: '16px',
                            }}
                        />
                        <button
                            style={{
                                marginLeft: '10px',
                                backgroundColor: '#f5deb3', // 파스텔 톤 배경색 설정
                                color: 'black', // 글자 색상 설정
                                border: 'none',
                                borderRadius: '50%', // 원형 버튼으로 설정
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            💬 {/* 전송 버튼에 말풍선 이모지를 추가 */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SampleChatUI; // 컴포넌트를 기본 내보내기로 설정하여 다른 파일에서 사용할 수 있게 합니다.
