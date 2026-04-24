import axios from "axios";
import React, { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

const TestProperty = ({ properties, setProperties, setShowForm, property }) => {
  const [formData, setFormData] = useState({
    manager_id: property?.manager_id || 1,
    property_title: property?.property_title || "",
    address: property?.address || "",
    property_type: property?.property_type || "",
    monthly_price: property?.monthly_price || "",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    description: property?.description || "",
    availability: property?.availability || "available",
    files: [],
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
    const { name, value, files } = e.target;
    if (files) {
      handleFiles(files);
    } else if (name === "monthly_price") {
      // Only allow numbers
      const validValue = value.replace(/[^0-9.]/g, "");
      setFormData({ ...formData, [name]: validValue });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "files") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const url = property
        ? `http://localhost:3000/api/property/update_property/${property.id}`
        : "http://localhost:3000/api/property/add_property";

      const response = await axios.post(url, formDataToSend);

      if (response.data.success) {
        alert(response.data.message);
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
          files: [],
        });
        setImagePreviews([]);
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   Object.keys(formData).forEach((key) => {
  //     if (key !== "files") {
  //       formDataToSend.append(key, formData[key]);
  //     }
  //   });

  //   console.log(formData.files);

  //   formData.files.forEach((file) => {
  //     formDataToSend.append("files", file);
  //   });

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/property/add_property",
  //       formDataToSend,
  //     );

  //     if (response.data.success === true) {
  //       alert(response.data.message);
  //       // Reset form
  //       setFormData({
  //         manager_id: "",
  //         property_title: "",
  //         address: "",
  //         property_type: "",
  //         monthly_price: "",
  //         bedrooms: "",
  //         bathrooms: "",
  //         description: "",
  //         availability: "",
  //         files: [],
  //       });
  //       setImagePreviews([]);
  //       setShowForm(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };
  return (
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
              <label className="block font-medium">Monthly Price ($)</label>
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
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block font-medium">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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

          <div>
            <label className="block font-medium">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Drag & Drop Image Upload */}
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
                <span className="font-semibold">Click to upload</span> or drag &
                drop
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
            className="w-full text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded mt-4"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestProperty;
