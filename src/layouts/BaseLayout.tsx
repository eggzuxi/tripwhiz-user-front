import HeaderLayout from "./HeaderLayout.tsx";
import SampleChatUI from "../components/chatbot/SampleChatUI.tsx";
import { ReactNode } from "react";

function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <HeaderLayout/>
            <SampleChatUI/>
            <main style={{ marginTop: "150px" }}>{children}</main>
        </div>
    );
}

export default BaseLayout;
