import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import QRCodeComponent from './components/qrcode/QRCodeComponent';
// import BaseLayout from './layouts/BaseLayout';
import { useEffect } from 'react';

import {messaging} from "./firebase/firebaseConfig.ts";
import {getToken, onMessage} from "firebase/messaging"; // FCM Hook 추가


function App() {

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
        <>
            <h1>----</h1>
        </>
    )
}

export default App;
