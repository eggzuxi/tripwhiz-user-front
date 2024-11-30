import React, { useState } from "react";
import { saveLuggage } from "../../api/luggageAPI";
import useAuthStore from "../../store/AuthStore"; // 이메일을 가져오기 위한 useAuthStore import
import { LuggageDTO } from "../../types/luggage.ts"; // 이메일을 가져오기 위해 useAuthStore를 임포트

const LuggageForm: React.FC = () => {
    const [startPoint, setStartPoint] = useState<{ lat: string; lng: string }>({ lat: "", lng: "" });
    const [endPoint, setEndPoint] = useState<{ lat: string; lng: string }>({ lat: "", lng: "" });
    const [message, setMessage] = useState<string>("");

    // useAuthStore에서 이메일 가져오기
    const email = useAuthStore(state => state.email); // 이메일을 직접 가져옴

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // LuggageDTO에 이메일과 출발지/도착지 정보를 포함
        const luggageData: LuggageDTO = {
            startPoint: { lat: parseFloat(startPoint.lat), lng: parseFloat(startPoint.lng) },
            endPoint: { lat: parseFloat(endPoint.lat), lng: parseFloat(endPoint.lng) },
            email: email || "", // 이메일을 DTO에 포함
        };

        // 데이터 저장 함수 호출
        try {
            const response = await saveLuggage(luggageData);
            console.log("Response from API:", response); // 응답 확인
            setMessage("출발지와 도착지가 저장되었습니다!"); // 성공 메시지
        } catch (error) {
            // 오류 처리 및 로그 출력
            console.error("Error saving luggage data:", error);
            setMessage("Failed to save luggage data. Please try again.");
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Save Luggage Points</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Start Point Latitude:</label>
                    <input
                        type="number"
                        value={startPoint.lat}
                        onChange={(e) => setStartPoint({ ...startPoint, lat: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Start Point Longitude:</label>
                    <input
                        type="number"
                        value={startPoint.lng}
                        onChange={(e) => setStartPoint({ ...startPoint, lng: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>End Point Latitude:</label>
                    <input
                        type="number"
                        value={endPoint.lat}
                        onChange={(e) => setEndPoint({ ...endPoint, lat: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>End Point Longitude:</label>
                    <input
                        type="number"
                        value={endPoint.lng}
                        onChange={(e) => setEndPoint({ ...endPoint, lng: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded mt-4">
                    Save Luggage
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default LuggageForm;
