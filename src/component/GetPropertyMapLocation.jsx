import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GetPropertyMapLocation = ({ addressLat, addressLng }) => {
  // Load the Google Maps API once
  const { isLoaded, loadError } = useJsApiLoader(
    import.meta.env.VITE_GOOGLE_MAPS_SECRET_KEY,
  );
  // const { isLoaded, loadError } = useJsApiLoader({
  // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

  // });

  // Validate coordinates
  const location =
    addressLat != null && addressLng != null
      ? { lat: Number(addressLat), lng: Number(addressLng) }
      : null;

  // Handle API loading errors
  if (loadError) return <p>Failed to load Google Maps</p>;
  if (!isLoaded) return <p>Loading Google Maps...</p>;
  if (!location) return <p>Location data not available</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={13}>
      <Marker position={location} />
    </GoogleMap>
  );
};

export default GetPropertyMapLocation;
