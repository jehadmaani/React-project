// // src/components/MapComponent.js
// import React, { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import L from "leaflet";

// const MapComponent = ({ location, onLocationChange }) => {
//   const [markerPosition, setMarkerPosition] = useState(location);

//   const LocationMarker = () => {
//     const map = useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setMarkerPosition({ lat, lng });
//         onLocationChange({ lat, lng });
//       },
//     });

//     return markerPosition ? (
//       <Marker position={markerPosition}>
//         <Popup>موقع المزرعة هنا</Popup>
//       </Marker>
//     ) : null;
//   };

//   return (
//     <MapContainer
//       center={markerPosition}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <LocationMarker />
//     </MapContainer>
//   );
// };

// export default MapComponent;
