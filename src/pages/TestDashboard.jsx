import React, { useState } from "react";

const TestDashboard = ({ properties, setProperties, setShowForm }) => {
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [editPreviews, setEditPreviews] = useState([]);

  const filteredProperties = properties.filter((prop) => {
    if (filter === "all") return true;
    return prop.availability === filter;
  });

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const newProps = [...properties];
      newProps.splice(index, 1);
      setProperties(newProps);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(properties[index]);
    setEditPreviews(properties[index].images || []);
  };

  const handleEditFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => file);
    setEditData({
      ...editData,
      images: [...(editData.images || []), ...files],
    });
    setEditPreviews([...editPreviews, ...files]);
  };

  const handleDropEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setEditData({
        ...editData,
        images: [...(editData.images || []), ...files],
      });
      setEditPreviews([...editPreviews, ...files]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOverEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeEditImage = (index) => {
    const updatedImages = editData.images.filter((_, i) => i !== index);
    const updatedPreviews = editPreviews.filter((_, i) => i !== index);
    setEditData({ ...editData, images: updatedImages });
    setEditPreviews(updatedPreviews);
  };

  const saveEdit = () => {
    const updatedProperties = [...properties];
    updatedProperties[editingIndex] = editData;
    setProperties(updatedProperties);
    setEditingIndex(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 text-gray-700">
      <section className="p-12 flex-1 ">
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {filteredProperties.map((prop, index) => (
            <div key={index}>
              {prop.images && prop.images.length > 0 && (
                <img
                  src={URL.createObjectURL(prop.images[0])}
                  alt="Property"
                  className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  title="Photo 1"
                />
              )}
              {/* <img
                src={URL.createObjectURL(img)}
                alt={prop.title}
                className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                // onClick={() => handlepropClick(prop.id)}
              /> */}
              <div className="mt-2">
                <p className="text-sm">{prop.title}</p>
                <p className="text-xs">{prop.type}</p>
                <p className="text-xs font-medium">{prop.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-4">Property Dashboard</h2>

        <button
          className="w-32 border rounded-md text-blue-500 font-medium hover:text-white hover:bg-blue-500 cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          Add Properties
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "available", "unavailable"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-500" : "bg-gray-200"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No properties found.
                </td>
              </tr>
            ) : (
              filteredProperties.map((prop, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{prop.title}</td>
                  <td className="border px-4 py-2">{prop.type}</td>
                  <td className="border px-4 py-2">{prop.monthlyPrice}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      prop.availability === "available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {prop.availability}
                  </td>
                  {/* <td className="border px-4 py-2 flex gap-1">
                    {prop.images &&
                      prop.images.map((img, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(img)}
                          alt="Property"
                          className="w-10 h-10 object-cover rounded cursor-pointer"
                          title={`Photo ${i + 1}`}
                        />
                      ))}
                  </td> */}
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded"
                      onClick={() => handleEdit(index)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 px-2 py-1 rounded"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* <td className="border px-4 py-2 flex gap-1">
                    {prop.images &&
                      prop.images.map((img, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(img)}
                          alt="Property"
                          className="w-10 h-10 object-cover rounded cursor-pointer"
                          title={`Photo ${i + 1}`}
                        />
                      ))}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-taupe-800/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Property</h3>

            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 mb-2 rounded"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Price"
              className="w-full border px-3 py-2 mb-2 rounded"
              value={editData.monthlyPrice}
              onChange={(e) =>
                setEditData({ ...editData, monthlyPrice: e.target.value })
              }
            />
            <select
              className="w-full border px-3 py-2 mb-2 rounded"
              value={editData.availability}
              onChange={(e) =>
                setEditData({ ...editData, availability: e.target.value })
              }
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            {/* Multi-photo upload */}
            <div
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors mb-2"
              onDrop={handleDropEdit}
              onDragOver={handleDragOverEdit}
              onClick={() => document.getElementById("editFileInput").click()}
            >
              <p className="text-gray-500 text-sm mt-12">
                Click or drag images to upload
              </p>
              <input
                type="file"
                id="editFileInput"
                multiple
                accept="image/*"
                onChange={handleEditFileChange}
                className="hidden"
              />
            </div>

            {/* Image previews */}
            <div className="flex flex-wrap gap-2 mb-2">
              {editPreviews.map((img, i) => (
                <div key={i} className="relative w-16 h-16">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${i}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeEditImage(i)}
                    className="absolute top-0 right-0 bg-red-500  rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setEditingIndex(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-500 "
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDashboard;
