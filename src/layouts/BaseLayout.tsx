import HeaderLayout from "./HeaderLayout.tsx";
import SampleChatUI from "../components/chatbot/SampleChatUI.tsx";
import { ReactNode } from "react";

function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white min-h-screen"> {/* 전체 배경을 흰색으로 설정 */}
            <HeaderLayout/>
            <SampleChatUI/>
            <main style={{ marginTop: "130px" }}>{children}</main>
        </div>
    );
}

export default BaseLayout;
