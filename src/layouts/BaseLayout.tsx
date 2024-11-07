import HeaderLayout from "./HeaderLayout.tsx";
import SampleChatUI from "../components/chatbot/SampleChatUI.tsx";



function BaseLayout() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderLayout />
            <SampleChatUI />
        </div>


    )

}

export default BaseLayout;
