import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Container style to make the map full screen
const containerStyle = {
  width: "100%", // 100% of the viewport width
  height: "400px", // 100% of the viewport height
};

const GetPropertyMapLocation = ({ addressLat, addressLng }) => {
  const [location, setLocation] = useState();

  useEffect(
    () => setLocation({ lat: addressLat, lng: addressLng }),
    [addressLat, addressLng],
  );

  // console.log(location);
  const geocodeLatLng = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);

    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            resolve(results[0].formatted_address); // Get the formatted address
          } else {
            reject("No address found");
          }
        });
      });
      setAddress(results);
    } catch (error) {
      console.error("Geocoding failed: ", error);
      setAddress("Unable to fetch address");
    }
  };

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

  // useEffect(
  //   () => setLocation({ lat: addressLat, lng: addressLng }),
  //   [addressLat, addressLng],
  // );

  // console.log(location);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAWCKewC7vdKWUSiZq85---sDBK0LVAWRo">
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={13}>
        <Marker
          position={location}
          draggable={false}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default GetPropertyMapLocation;
