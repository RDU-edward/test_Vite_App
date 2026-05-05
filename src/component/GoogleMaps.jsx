import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

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

  const { isLoaded, loadError } = useJsApiLoader(
    import.meta.env.VITE_GOOGLE_MAPS_SECRET_KEY,
  );

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

  if (loadError) return <p>Failed to load Google Maps</p>;
  if (!isLoaded) return <p>Loading Google Maps...</p>;
  if (!location) return <p>Location data not available</p>;
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
      </div>
    </div>
  );
};

export default GoogleMaps;
