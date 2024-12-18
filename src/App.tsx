import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { messaging } from "./firebase/firebaseConfig";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./routes/mainRouter";

function App() {
    async function requestPermission() {
        // Requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            alert("Notification granted!");
            const token = await getToken(messaging, {
                vapidKey: 'BPBzQraHoZvc1D9vyZtyRSXLBRcWf3bhXCL3qgeMHcIfop5nQWFIkmpdPa0c2BzOW5JTXLICfd2SGxH1Or74Gxo',
            });

            // We can send the token to the server
            console.log("Token generated: ", token);

        } else if (permission === "denied") {
            // Notifications are blocked
            alert("You denied for the notification");
        }
    }

    useEffect(() => {
        requestPermission();

        // Message listener
        onMessage(messaging, (payload) => {
            console.log(payload);
            alert("On Message");
        });
    }, []);

    return (
        <>
            <RouterProvider router={mainRouter} />
        </>
    );
}

export default App;
