import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "../firebase/firebaseConfig.ts";
import BaseLayout from "../layouts/BaseLayout.tsx";

function MainPage() {

    async function requestPermission() {

        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {

            alert("Notification granted!")
            const token = await getToken(messaging, {

                vapidKey: 'BL6UBkkoPxHqNi2mejjnA0YUyS7vb_v8MTop2UxYOnZknlfy76wdE-GfGTBkaoAQOqWEH8woIM9OulqEeCW_ioc',

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
        <div>
            <BaseLayout>
                <div>Main Page</div>
            </BaseLayout>
        </div>
    );
}

export default MainPage;