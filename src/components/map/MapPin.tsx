import React, { forwardRef } from "react";

// props 타입 정의
interface MapPinProps {
    children: React.ReactNode;
    backgroundColor?: string;
    borderColor?: string;
}

const MapPin = forwardRef<HTMLDivElement, MapPinProps>(
    ({ children, backgroundColor = "#db4455", borderColor = "#881824" }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    backgroundColor,
                    borderColor,
                    borderRadius: "50%",
                    border: `2px solid ${borderColor}`,
                    color: "#fff",
                    padding: "10px",
                    textAlign: "center",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                }}
            >
                {children}
            </div>
        );
    }
);

export default MapPin;
