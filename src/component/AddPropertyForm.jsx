import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import Pin from "../assets/pin.wine.svg";
import GoogleMaps from "./GoogleMaps";
import amenities from "../data/amenities";

const AddPropertyForm = ({
  properties,
  setProperties,
  setShowForm,
  property,
}) => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [loading, setLoading] = useState(false);
  const [openGoogleMaps, setOpenGoogleMaps] = useState(false);

  const [formData, setFormData] = useState({
    manager_id: property?.manager_id || loggedUser?.id,
    property_title: property?.property_title || "",
    address: property?.address || "",
    property_type: property?.property_type || "",
    monthly_price: property?.monthly_price || "",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    description: property?.description || "",
    availability: property?.availability || "available",
    floor_area: "",
    lot_size: "",
    year_built: "",
    amenities: "",
    files: [],
    address_lat: "",
    address_long: "",
  });

  const [imagePreviews, setImagePreviews] = useState(
    property?.existingFiles || [], // For edit, show current images
  );

  // const [imagePreviews, setImagePreviews] = useState([]);
  // awiheyqwoieioqweio
  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (files) {
      handleFiles(files);
    } else if (
      name === "monthly_price" ||
      name === "bathrooms" ||
      name === "bedrooms" ||
      name === "year_built"
    ) {
      // Only allow numbers
      const validValue = value.replace(/[^0-9.]/g, "");
      setFormData({ ...formData, [name]: validValue });
    } else if (type === "checkbox") {
      setFormData((prev) => {
        const newAmenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value);
        return { ...prev, amenities: newAmenities };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (openGoogleMaps) {
      // If any modal is open, hide overflow
      document.body.style.overflow = "hidden";
    } else {
      // If no modal is open, allow scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openGoogleMaps]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional for smooth scrolling
    });

    if (formData.files.length !== 5) {
      toast.error("Please upload exactly 5 images.");
      return;
    }
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "files") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    if (formData.address_lat === "" || formData.address_long === "") {
      toast.error("Google Map Pin Location is required!");
      return;
    }

    try {
      setLoading(true);
      const url = property
        ? `http://localhost:3000/api/property/update_property/${property.id}`
        : "http://localhost:3000/api/property/add_property";

      const response = await axios.post(url, formDataToSend);

      if (response.data.success) {
        setTimeout(() => {
          toast.success(response.data.message);
          setFormData({
            manager_id: 1,
            property_title: "",
            address: "",
            property_type: "",
            monthly_price: "",
            bedrooms: "",
            bathrooms: "",
            description: "",
            availability: "",
            floor_area: "",
            lot_size: "",
            year_built: "",
            amenities: "",
            files: [],
            address_lat: "",
            address_long: "",
          });
          setImagePreviews([]);
          setShowForm(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      console.log(error);

      toast.error("Failed to add property.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      // If any modal is open, hide overflow
      document.body.style.overflow = "hidden";
    } else {
      // If no modal is open, allow scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="z-50 absolute bg-gray-500/50 inset-0 flex justify-center ">
          <Loader />
        </div>
      )}
      <div className="px-4 md:px-30">
        <div className="p-8 bg-white shadow-md rounded-md mt-6 mb-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Add New Property
            </h2>
            <FaCircleXmark
              className="text-red-500 text-2xl hover:scale-120 cursor-pointer"
              onClick={() => setShowForm(false)}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
            <div>
              <label className="block font-medium">Property Title</label>
              <input
                type="text"
                name="property_title"
                value={formData.property_title}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Property Type</label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Monthly Price</label>
                <input
                  type="text"
                  name="monthly_price"
                  value={formData.monthly_price}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., 1200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Bedrooms</label>
                <input
                  type="text"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium">Bathrooms</label>
                <input
                  type="text"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Floor Area</label>
                <input
                  type="text"
                  name="floor_area"
                  value={formData.floor_area}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="xxx.sqm"
                />
              </div>

              <div>
                <label className="block font-medium">Lot Size</label>
                <input
                  type="text"
                  name="lot_size"
                  value={formData.lot_size}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Year Built</label>
                <input
                  type="text"
                  name="year_built"
                  value={formData.year_built}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Pin Location</label>
                <div
                  className="flex justify-center items-center w-full border  bg-slate-100 rounded "
                  onClick={() => setOpenGoogleMaps(true)}
                >
                  <div>Open Google Map</div>
                  <img src={Pin} className="h-9" alt="" srcset="" />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-1 border border-gray-500 p-4  rounded-md">
                {amenities.map((amenity) => (
                  <label key={amenity.id} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="amenities"
                      value={amenity.name}
                      onChange={handleChange}
                    />
                    <span> {amenity.icon} </span> {amenity.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="" className="block font-medium">
                Property Attachment
              </label>
              <div
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0l-4 4m4-4l4 4m6 12v-4m0 0l4 4m-4-4l-4 4"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag & drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, or GIF (max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  name="files"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </div>
            {/* Drag & Drop Image Upload */}

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500  rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white bg-gray-500 hover:bg-gray-600 font-semibold py-3 px-4 rounded mt-4"
            >
              Add Property
            </button>
          </form>
        </div>
        {openGoogleMaps && (
          <GoogleMaps
            setOpenGoogleMaps={setOpenGoogleMaps}
            setFormData={setFormData}
            formData={formData}
          />
        )}
      </div>
    </>
  );
};

export default AddPropertyForm;
