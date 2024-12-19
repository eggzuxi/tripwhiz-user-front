import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { AiChat } from "@nlux/react";
import { useChatAdapter } from "@nlux/langchain-react";
import "@nlux/themes/nova.css";

const adapterOptions = {
    url: "https://main-meet-robin.ngrok-free.app/rag/",
};

const SampleChatUI: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const langServeAdapter = useChatAdapter(adapterOptions);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleResize = () => {
            setPosition({
                x: window.innerWidth - 80,
                y: window.innerHeight - 80,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const clientX = (e as React.MouseEvent).clientX || (e as React.TouchEvent).touches[0].clientX;
        const clientY = (e as React.MouseEvent).clientY || (e as React.TouchEvent).touches[0].clientY;
        setIsDragging(true);
        setStartOffset({ x: clientX - position.x, y: clientY - position.y });
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                e.preventDefault();
                const clientX = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
                const clientY = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
                setPosition({ x: clientX - startOffset.x, y: clientY - startOffset.y });
            }
        },
        [isDragging, startOffset]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove, { passive: false });
            window.addEventListener("touchmove", handleMouseMove, { passive: false });
            window.addEventListener("mouseup", handleMouseUp, { passive: false });
            window.addEventListener("touchend", handleMouseUp, { passive: false });
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchend", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div>
            {!isChatOpen && ( // 아이콘은 챗봇 창이 닫혀 있을 때만 렌더링
                <div
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onClick={() => {
                        if (!isDragging) toggleChat();
                    }}
                    style={{
                        position: "fixed",
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%", // 동그라미 모양
                        backgroundColor: "white", // 흰색 배경
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // 약간의 검은 그림자
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        zIndex: 1000,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faPlane}
                        style={{
                            fontSize: "24px", // 아이콘 크기
                            color: "#1D2D5F", // 아이콘 색상
                            transform: "rotate(-45deg)", // 45도 회전
                        }}
                    />
                </div>
            )}

            {isChatOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "0",
                        right: "0",
                        width: "100%",
                        height: "80%", // 화면 하단의 80% 차지
                        borderRadius: "15px 15px 0 0",
                        backgroundColor: "#F3F4F6",
                        boxShadow: "0px -4px 16px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 999,
                        animation: "slide-up 0.3s ease-out", // 슬라이드 업 애니메이션
                    }}
                >
                    <div
                        style={{
                            padding: "10px 15px",
                            backgroundColor: "#1D2D5F",
                            color: "white",
                            fontSize: "18px",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        ChatBot
                        <button
                            onClick={toggleChat}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: "18px",
                                cursor: "pointer",
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                        <AiChat adapter={langServeAdapter} displayOptions={{ colorScheme: "light" }} />
                    </div>
                </div>
            )}

            <style>
                {`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default SampleChatUI;
