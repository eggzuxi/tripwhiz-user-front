import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {cartStore} from "../../store/CartStore.ts";

const CustomDatePicker = () => {
    const setPickUpDate = cartStore((state) => state.setPickUpDate); // Zustand의 setPickUpDate 함수 가져오기
    const [startDate, setStartDate] = useState<Date>(new Date()); // Date 타입만 허용
    const [errorMessage, setErrorMessage] = useState<string>(""); // 에러 메시지 상태
    const navigate = useNavigate();


    const handleChange = (date: Date | null) => {
        if (date) {
            setStartDate(date); // null이 아닌 경우만 상태를 업데이트
        }
    };

    const handleCheckout = () => {
        if (!startDate) {
            setErrorMessage("날짜를 선택해 주세요."); // 날짜 선택 안 됐을 때 경고 메시지
        } else {
            // 선택된 날짜를 ISO 8601 형식으로 변환 후 저장
            const formattedDate = startDate.toISOString();
            setPickUpDate(formattedDate);
            console.log(`PickUpDate 저장됨: ${formattedDate}`);
            navigate("/order/info"); // 주문 확인 페이지로 이동
        }
    };

    const handlePrev = () => {
        navigate(-1); // 브라우저의 이전 페이지로 이동
    };

    return (

        <div style={{textAlign: 'center'}}> {/* 전체를 가운데 정렬 */}
            <h1
                style={{
                    fontSize: '20px',        // 글자 크기
                    color: '#2C3E50',        // 글자 색상
                    fontFamily: "'Arial', sans-serif", // 글꼴
                    marginBottom: '10px',    // 글자 아래 여백
                }}
            >원하시는 픽업 일을 선택해 주세요.</h1>

            <div className="custom-datepicker-container">
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    dateFormat="yyyy.MM.dd"
                    inline
                    calendarClassName="custom-calendar"
                />
            </div>

            {/* 에러 메시지 표시 */}
            {errorMessage && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                    {errorMessage}
                </p>
            )}

            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={handlePrev}
                    className="px-6 py-2 bg-navy-light text-black rounded-md shadow "
                >
                    이전
                </button>
                <button
                    onClick={handleCheckout}
                    className="px-6 py-2 bg-navy-deep text-white rounded-md shadow "
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default CustomDatePicker;
