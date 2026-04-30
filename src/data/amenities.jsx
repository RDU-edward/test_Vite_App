// src/data/amenities.jsx
import React from "react";
import {
  FaSwimmingPool,
  FaDumbbell,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaDog,
  FaUtensils,
  FaSpa,
  FaWineGlass,
  FaTshirt,
} from "react-icons/fa";

const amenities = [
  { id: 1, name: "Pool", icon: <FaSwimmingPool /> },
  { id: 2, name: "Gym", icon: <FaDumbbell /> },
  { id: 3, name: "Wifi", icon: <FaWifi /> },
  { id: 4, name: "Parking", icon: <FaParking /> },
  { id: 5, name: "Air Conditioning", icon: <FaSnowflake /> },
  { id: 6, name: "Pet Friendly", icon: <FaDog /> },
  { id: 7, name: "Restaurant", icon: <FaUtensils /> },
  { id: 8, name: "Spa", icon: <FaSpa /> },
  { id: 9, name: "Bar", icon: <FaWineGlass /> },
  { id: 10, name: "Laundry", icon: <FaTshirt /> },
];

export default amenities;
