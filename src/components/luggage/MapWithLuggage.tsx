// import React, { useEffect, useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { ref, onValue } from "firebase/database";
// import {secondaryDatabase} from "../../firebase/firebaseConfig.ts";
//
//
// const containerStyle = {
//     width: "100%",
//     height: "400px",
// };
//
// const MapWithLuggage: React.FC = () => {
//     const [position, setPosition] = useState({ lat: 3.139, lng: 101.6869 });
//
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || "",
//     });
//
//     useEffect(() => {
//         const locationRef = ref(secondaryDatabase, "luggage/location");
//
//         // Firebase에서 실시간 위치 데이터 수신
//         const unsubscribe = onValue(locationRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 setPosition({ lat: data.lat, lng: data.lng });
//                 console.log("Realtime location update:", data);
//             }
//         });
//
//         return () => unsubscribe();
//     }, []);
//
//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">Google Map with Luggage Tracking</h2>
//             {isLoaded ? (
//                 <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={12}>
//                     <Marker position={position} />
//                 </GoogleMap>
//             ) : (
//                 <p>Loading map...</p>
//             )}
//         </div>
//     );
// };
//
// export default MapWithLuggage;
