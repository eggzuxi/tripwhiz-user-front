import HeaderLayout from "./HeaderLayout.tsx";
import {ReactNode, useEffect} from "react";
import {getToken, onMessage} from "firebase/messaging";
import {messaging} from "../firebase/firebaseConfig.ts";

function BaseLayout({ children }: { children: ReactNode }) {

    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {

            alert("Notification granted!")
            const token = await getToken(messaging, {

                vapidKey: 'BPBzQraHoZvc1D9vyZtyRSXLBRcWf3bhXCL3qgeMHcIfop5nQWFIkmpdPa0c2BzOW5JTXLICfd2SGxH1Or74Gxo',

            });

            //We can send token to server
            console.log("Token generated : ", token);

        } else if (permission === "denied") {

            //notifications are blocked
            alert("You denied for the notification");

        }
    }


    useEffect(() => {

        requestPermission();

    }, []);


    onMessage(messaging, (payload) => {
        console.log(payload);
        alert("On Message ")
    });

    return (
        <div className="bg-white min-h-screen"> {/* 전체 배경을 흰색으로 설정 */}
            <HeaderLayout/>
            <main style={{ marginTop: "130px" }}>{children}</main>
        </div>
    );
}

export default BaseLayout;
