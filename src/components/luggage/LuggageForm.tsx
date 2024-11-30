import React from "react";
import { saveLuggage } from "../../api/luggageAPI"; // API 호출 함수


function LuggageForm({
                         startPoint,
                         endPoint,
                         setStartPoint,
                         setEndPoint,
                     }: {
    startPoint: { lat: number; lng: number } | null;
    endPoint: { lat: number; lng: number } | null;
    setStartPoint: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
    setEndPoint: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
}) {
    const handleSave = async () => {
        if (!startPoint || !endPoint) {
            alert("출발지와 도착지를 모두 선택해주세요.");
            return;
        }

        // 소수점 제한: 6자리로 포맷
        const formattedStartPoint = {
            lat: parseFloat(startPoint.lat.toFixed(6)),
            lng: parseFloat(startPoint.lng.toFixed(6)),
        };

        const formattedEndPoint = {
            lat: parseFloat(endPoint.lat.toFixed(6)),
            lng: parseFloat(endPoint.lng.toFixed(6)),
        };

        try {
            console.log("전송 데이터:", { startPoint: formattedStartPoint, endPoint: formattedEndPoint });

            // 백엔드 API 호출
            const response = await saveLuggage({
                startPoint: formattedStartPoint,
                endPoint: formattedEndPoint,
            });

            console.log("서버 응답:", response);
            alert("데이터가 성공적으로 저장되었습니다!");
        } catch (error) {
            console.error("저장 중 오류 발생:", error);
            alert("데이터 저장에 실패했습니다. 서버 상태를 확인하세요.");
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Save Luggage Points</h2>
            <form>
                <div>
                    <label>Start Point Latitude:</label>
                    <input
                        type="number"
                        value={startPoint?.lat || ""}
                        onChange={(e) =>
                            setStartPoint({
                                ...(startPoint || { lat: 0, lng: 0 }),
                                lat: parseFloat(e.target.value),
                            })
                        }
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label>Start Point Longitude:</label>
                    <input
                        type="number"
                        value={startPoint?.lng || ""}
                        onChange={(e) =>
                            setStartPoint({
                                ...(startPoint || { lat: 0, lng: 0 }),
                                lng: parseFloat(e.target.value),
                            })
                        }
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label>End Point Latitude:</label>
                    <input
                        type="number"
                        value={endPoint?.lat || ""}
                        onChange={(e) =>
                            setEndPoint({
                                ...(endPoint || { lat: 0, lng: 0 }),
                                lat: parseFloat(e.target.value),
                            })
                        }
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label>End Point Longitude:</label>
                    <input
                        type="number"
                        value={endPoint?.lng || ""}
                        onChange={(e) =>
                            setEndPoint({
                                ...(endPoint || { lat: 0, lng: 0 }),
                                lng: parseFloat(e.target.value),
                            })
                        }
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSave}
                    className="p-2 bg-blue-500 text-white rounded mt-4"
                >
                    Save Luggage
                </button>
            </form>
        </div>
    );
}

export default LuggageForm;
