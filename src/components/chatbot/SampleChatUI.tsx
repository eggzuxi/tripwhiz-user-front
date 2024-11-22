import React, { useState, useEffect, useCallback } from 'react';
import { AiChat } from '@nlux/react';
import { useChatAdapter } from '@nlux/langchain-react';
import '@nlux/themes/nova.css';

// 어댑터 옵션 설정 (API 엔드포인트 URL)
const adapterOptions = {
    url: "https://main-meet-robin.ngrok-free.app/llm/"
};

const SampleChatUI: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const langServeAdapter = useChatAdapter(adapterOptions);

    const [isDragging, setIsDragging] = useState(false); // 드래그 상태
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 }); // 초기 위치: 우측 하단
    const [startOffset, setStartOffset] = useState({ x: 0, y: 0 }); // 드래그 시작 시 클릭 위치와 오프셋 저장

    // 창 크기 변경 시 버튼 위치 조정 (우측 하단 유지)
    useEffect(() => {
        const handleResize = () => {
            setPosition({
                x: window.innerWidth - 80,
                y: window.innerHeight - 80,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 드래그 시작 핸들러
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // 기본 동작 방지
        const clientX = (e as React.MouseEvent).clientX || (e as React.TouchEvent).touches[0].clientX;
        const clientY = (e as React.MouseEvent).clientY || (e as React.TouchEvent).touches[0].clientY;
        setIsDragging(true);
        setStartOffset({ x: clientX - position.x, y: clientY - position.y });
    };

    // 드래그 동작 핸들러
    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (isDragging) {
            e.preventDefault(); // 기본 동작 방지 (스크롤 방지)
            const clientX = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
            const clientY = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
            setPosition({ x: clientX - startOffset.x, y: clientY - startOffset.y });
        }
    }, [isDragging, startOffset]);

    // 드래그 종료 핸들러
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // 이벤트 등록 및 해제
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove, { passive: false });
            window.addEventListener('touchmove', handleMouseMove, { passive: false });
            window.addEventListener('mouseup', handleMouseUp, { passive: false });
            window.addEventListener('touchend', handleMouseUp, { passive: false });
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div>
            {/* 드래그 가능한 채팅 버튼 */}
            <button
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown} // 모바일 환경에서도 드래그 시작 가능
                onClick={() => {
                    if (!isDragging) toggleChat(); // 드래그 중에는 클릭 이벤트 발생 안 함
                }}
                style={{
                    position: 'fixed',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#4A90E2',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                }}
            >
                ✈️
            </button>

            {/* 채팅창 */}
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
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        <AiChat
                            adapter={langServeAdapter}
                            displayOptions={{ colorScheme: 'light' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SampleChatUI;
