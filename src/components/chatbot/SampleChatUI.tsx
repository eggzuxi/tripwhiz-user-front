import React, { useState } from 'react';
import { AiChat } from '@nlux/react';
import { useChatAdapter } from '@nlux/langchain-react'; // langchain-react에서 useChatAdapter 가져오기
import '@nlux/themes/nova.css'; // 테마 스타일 임포트

// 어댑터 옵션 설정 (API 엔드포인트 URL)
const adapterOptions = {
    url: "https://main-meet-robin.ngrok-free.app/llm/" // 실제 API 엔드포인트로 수정 필요
};

// SampleChatUI 컴포넌트
const SampleChatUI: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false); // 채팅 UI 열림/닫힘 상태 관리
    const langServeAdapter = useChatAdapter(adapterOptions); // useChatAdapter를 사용하여 어댑터 생성

    // 채팅 열기/닫기 함수
    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div>
            {/* 오른쪽 하단에 채팅 버튼 */}
            <button
                onClick={toggleChat}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#4A90E2',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    display: isChatOpen ? 'none' : 'block',
                    zIndex: 1000,
                }}
            >
                ✈️
            </button>

            {/* 채팅창 모달 */}
            {isChatOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        right: '0',
                        width: '100%',
                        height: '100%',
                        maxWidth: '600px',
                        borderRadius: '15px 15px 0 0',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 999,
                    }}
                >
                    {/* 채팅 헤더 */}
                    <div
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#FFEB8E',
                            color: 'gray',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        AI Assistant
                        <button
                            onClick={toggleChat}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '18px',
                                cursor: 'pointer',
                            }}
                        >
                            ✖
                        </button>
                    </div>

                    {/* AiChat 컴포넌트 - 어댑터 전달 */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        <AiChat
                            adapter={langServeAdapter}  // LangChain 어댑터 전달
                            displayOptions={{ colorScheme: 'light' }}  // 밝은 색상 테마
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SampleChatUI;
