// src/components/HouseForm.jsx
import { useState } from "react";

export default function HouseForm() {
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "House",
    address: "",
    city: "",
    province: "",
    price: "",
    bedrooms: 1,
    bathrooms: 1,
    floorArea: "",
    lotSize: "",
    furnishingStatus: "Unfurnished",
    amenities: [],
    description: "",
    mainImage: null,
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const newAmenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value);
        return { ...prev, amenities: newAmenities };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, mainImage: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted! Check console for output.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add a New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option>House</option>
              <option>Apartment</option>
              <option>Condo</option>
              <option>Townhouse</option>
              <option>Villa</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Price (PHP)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min={1}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block font-medium">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min={1}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">City / Province</label>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Floor Area</label>
          <input
            type="text"
            name="floorArea"
            value={formData.floorArea}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Lot Size</label>
          <input
            type="text"
            name="lotSize"
            value={formData.lotSize}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Furnishing Status</label>
          <select
            name="furnishingStatus"
            value={formData.furnishingStatus}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option>Unfurnished</option>
            <option>Semi-furnished</option>
            <option>Furnished</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Amenities</label>
          <div className="flex flex-wrap gap-3 mt-1">
            {["Pool", "Garden", "Balcony", "Security", "Gym"].map((amenity) => (
              <label key={amenity} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  onChange={handleChange}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Main Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
