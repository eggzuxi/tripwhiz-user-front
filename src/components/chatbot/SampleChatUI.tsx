import { useState } from 'react';
import { AiChat, useAsStreamAdapter } from '@nlux/react'; // 필요한 컴포넌트 및 훅 임포트
import '@nlux/themes/nova.css'; // 테마 스타일 임포트

// 스트리밍 어댑터 설정 (API 엔드포인트 URL)
const adapterOptions = {
    url: "https://main-meet-robin.ngrok-free.app/llm/" // 실제 API 엔드포인트로 수정 필요
};

// SampleChatUI 컴포넌트
const SampleChatUI = () => {
    const [isChatOpen, setIsChatOpen] = useState(false); // 채팅 UI 열림/닫힘 상태 관리

    // 스트리밍 어댑터 사용
    const adapter = useAsStreamAdapter((message, observer) => {
        fetch(adapterOptions.url, {
            method: 'POST',
            body: JSON.stringify({ message }), // 메시지를 API로 전송
        })
            .then((response) => response.json())
            .then((data) => {
                observer.next(data.chunk);  // 데이터가 스트리밍될 때마다 호출
                observer.complete();         // 데이터 스트리밍 완료 호출
            })
            .catch((error) => {
                observer.error(error);  // 에러 발생 시 호출
            });
    });

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
                            color: 'white',
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

                    {/* AiChat 컴포넌트 - 스트리밍 어댑터 사용 */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        <AiChat
                            adapter={adapter}  // 스트리밍 어댑터 전달
                            displayOptions={{ colorScheme: 'light' }}  // 밝은 색상 테마
                        />
                    </div>

                    {/* 메시지 입력 필드 및 전송 버튼 */}
                    <div style={{ padding: '10px', borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="무엇을 도와 드릴까요?"
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '20px',
                                border: '1px solid #ddd',
                                outline: 'none',
                                fontSize: '16px',
                            }}
                        />
                        <button
                            style={{
                                marginLeft: '10px',
                                backgroundColor: '#f5deb3',
                                color: 'black',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            💬
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SampleChatUI;
