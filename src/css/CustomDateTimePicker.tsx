import React, { useEffect, useRef } from "react";

const NumberPicker: React.FC<{
    range: number[];
    value: number;
    onChange: (value: number) => void;
}> = ({ range, value, onChange }) => {
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            e.preventDefault();
            const currentIndex = range.indexOf(value);

            if (e.deltaY > 0 && currentIndex < range.length - 1) {
                onChange(range[currentIndex + 1]);
            } else if (e.deltaY < 0 && currentIndex > 0) {
                onChange(range[currentIndex - 1]);
            }
        };

        const pickerElement = pickerRef.current;
        if (pickerElement) {
            pickerElement.addEventListener("wheel", handleScroll, { passive: false });
        }

        // Cleanup 이벤트 리스너
        return () => {
            if (pickerElement) {
                pickerElement.removeEventListener("wheel", handleScroll);
            }
        };
    }, [range, value, onChange]);

    return (
        <div
            ref={pickerRef}
            className="w-20 h-12 border rounded-md flex items-center justify-center text-xl font-bold"
            style={{ userSelect: "none", cursor: "pointer" }}
        >
            {value}
        </div>
    );
};

export default NumberPicker;
