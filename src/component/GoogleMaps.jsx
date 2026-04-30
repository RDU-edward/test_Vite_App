// import React, { useState, useRef } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 14.5995, // Default center (Manila)
//   lng: 120.9842,
// };

// function TestMap() {
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const mapRef = useRef(null);

//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();

//     // Reverse Geocoding to get the address from the clicked location
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status === window.google.maps.GeocoderStatus.OK) {
//         if (results[0]) {
//           setSelectedAddress(results[0].formatted_address);
//           setSelectedLocation({ lat, lng });
//         } else {
//           alert("No address found for this location.");
//         }
//       } else {
//         alert("Geocoder failed due to: " + status);
//       }
//     });
//   };

//   return (
//     <div>
//       <div>
//         <strong>Selected Address:</strong> {selectedAddress || "None"}
//       </div>
//       <LoadScript googleMapsApiKey="AIzaSyAWCKewC7vdKWUSiZq85---sDBK0LVAWRo">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           onClick={handleMapClick}
//           onLoad={(map) => (mapRef.current = map)}
//         >
//           {selectedLocation && (
//             <Marker
//               position={selectedLocation}
//               icon={{
//                 url: "https://example.com/custom-marker.png", // Custom marker URL
//                 scaledSize: new window.google.maps.Size(40, 40), // Resize custom icon
//               }}
//             />
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// }

// export default TestMap;
// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 37.7749, // Default to San Francisco
//   lng: -122.4194,
// };

// const TestMap = () => {
//   const [location, setLocation] = useState(center);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lng: longitude });
//       });
//     }
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAWCKewC7vdKWUSiZq85---sDBK0LVAWRo">
//       <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12}>
//         <Marker position={location} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default TestMap;

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Container style to make the map full screen
const containerStyle = {
  width: "100vw", // 100% of the viewport width
  height: "100vh", // 100% of the viewport height
};

const center = {
  lat: 14.5995, // Default center (Manila)
  lng: 120.9842,
};

const GoogleMaps = ({ setOpenGoogleMaps, setFormData, formData }) => {
  const [location, setLocation] = useState(center);
  const [address, setAddress] = useState(""); // Store the address
  //   const geocodeLatLng = async (lat, lng) => {
  //     const geocoder = new window.google.maps.Geocoder();
  //     const latLng = new window.google.maps.LatLng(lat, lng);

  //     try {
  //       const results = await new Promise((resolve, reject) => {
  //         geocoder.geocode({ location: latLng }, (results, status) => {
  //           if (status === "OK" && results[0]) {
  //             resolve(results[0].formatted_address); // Get the formatted address
  //           } else {
  //             reject("No address found");
  //           }
  //         });
  //       });
  //       setAddress(results);
  //     } catch (error) {
  //       console.error("Geocoding failed: ", error);
  //       setAddress("Unable to fetch address");
  //     }
  //   };
  //   setFormData({ ...formData, address_lat: location.lat });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        // geocodeLatLng(latitude, longitude); // Get address on initial load
      });
    }
  }, []);

  const onMarkerDragEnd = useCallback((e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setLocation({ lat: newLat, lng: newLng });
    // geocodeLatLng(newLat, newLng); // Get address when marker is dragged
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      address_lat: location.lat,
      address_long: location.lng,
    });
  }, [location]);
  console.log(formData);

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center mx-auto items-center z-50 overflow-hidden">
      {/* Close Button */}
      <div className="w-full">
        <div className="flex justify-end mb-2">
          <button
            className="absolute w-32  left-2 top-5  bg-slate-400 text-white px-4 py-2 rounded z-50"
            onClick={() => setOpenGoogleMaps(false)}
          >
            Close
          </button>
        </div>

        <LoadScript googleMapsApiKey="AIzaSyAWCKewC7vdKWUSiZq85---sDBK0LVAWRo">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={13}
          >
            <Marker
              position={location}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default GoogleMaps;
