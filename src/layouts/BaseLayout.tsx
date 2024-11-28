import HeaderLayout from "./HeaderLayout.tsx";
import SampleChatUI from "../components/chatbot/SampleChatUI.tsx";
import { ReactNode } from "react";

function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white min-h-screen"> {/* 전체 배경을 흰색으로 설정 */}
            <HeaderLayout/>
            <SampleChatUI/>
            <main className="mt-4 border-t-4 border-gray-300">{children}</main> {/* mt-4로 16px 갭, border-top 추가 */}
            {/*<main style={{ marginTop: "150px" }}>{children}</main>*/}
        </div>
    );
}

export default BaseLayout;
