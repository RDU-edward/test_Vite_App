import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import TestProperty from "./TestProperty";

const TestDashboard = ({ properties, setProperties, setShowForm }) => {
  const [formOpen, setFormOpen] = useState(false);

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

  const [editingProperty, setEditingProperty] = useState(null);
  const [properties1, setProperties1] = useState([]);
  const [propertyFilePaths, setPropertyFilePaths] = useState([]);

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/property/all_property",
      );
      setProperties1(response.data);

      // Parse the file paths for each property and store them in an array
      const filePaths = response.data.map(
        (property) => JSON.parse(property.files), // Assuming `files` is a JSON string in the database
      );
      setPropertyFilePaths(filePaths); // Store the array of file paths
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProperty();
  }, []);
  console.log(propertyFilePaths);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-700">
      {formOpen === true ? (
        <TestProperty setShowForm={setFormOpen} property={editingProperty} />
      ) : (
        <main className="p-6 lg:p-10 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between py-4">
            <h2 className="text-xl font-bold mb-4 ">Property Dashboard</h2>

            <button
              className="w-32 border p-1 hover:bg-gray-100"
              onClick={() => setShowForm(true)}
            >
              Add Properties
            </button>
          </div>

          <section className="flex-1 ">
            <div className="mt-2 grid grid-cols-1  md:grid-cols-4 gap-4">
              {properties1.map((property, index) => (
                <div
                  className="px-6 py-2  border border-gray-200  shadow-md rounded-md hover:shadow-blue-700"
                  key={property.id}
                >
                  <div
                    className={`${property?.availability == "available" ? "text-green-600" : "text-red-500"} font-bold tracking-wider mb-2`}
                  >
                    {property.availability.toUpperCase()}
                  </div>
                  <img
                    src={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`}
                    alt={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`}
                    // alt={property.property_title}
                    className=" rounded-md h-44 w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                    // onClick={() => handleCondoClick(condo.id)}
                  />

                  {/* for multiple display of images */}
                  {/* {propertyFilePaths[index] &&
                 propertyFilePaths[index].map((filePath, i) => (
                   <img
                     key={i}
                     src={filePath}
                     alt={`${property.property_title} Image ${i + 1}`}
                     className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                   />
                 ))} */}
                  <div className="mt-2">
                    <p className="text-xl font-medium">
                      {property.property_title}
                    </p>
                    <p className="text-xs">{property.address}</p>
                    <p className="text-base text-blue-700 font-medium mt-2">
                      {property.monthly_price}
                    </p>
                  </div>
                  <div className="flex space-x-2 justify-end mt-4">
                    <button
                      className=" rounded bg-blue-500 text-white text-sm px-3 hover:bg-blue-700 cursor-pointer"
                      onClick={() => setFormOpen(true)}
                    >
                      View
                    </button>
                    <button
                      className="rounded bg-green-500 text-white text-sm px-3 hover:bg-green-700 cursor-pointer"
                      onClick={() => {
                        setFormOpen(true);
                        setEditingProperty(property);
                      }}
                    >
                      Edit
                    </button>
                    <button className=" rounded bg-red-500 text-white text-sm px-3 hover:bg-red-700 cursor-pointer">
                      Delete
                    </button>
                    {/* <FaEye className="text-blue-500 text-xl" />
                    <FaPen className="text-green-800 text-xl" />
                    <FaTrash className="text-red-500 text-xl" /> */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );

  // return (
  //   <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 text-gray-700">
  //     <section className="p-12 flex-1 ">
  //       <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
  //         {properties1.map((property, index) => (
  //           <div key={property.id}>
  //             <img
  //               src={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`} // Use the first file path for the image
  //               alt={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`} // Use the first file path for the image
  //               // alt={property.property_title}
  //               className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
  //               // onClick={() => handleCondoClick(condo.id)}
  //             />

  //             {/* for multiple display of images */}
  //             {/* {propertyFilePaths[index] &&
  //               propertyFilePaths[index].map((filePath, i) => (
  //                 <img
  //                   key={i}
  //                   src={filePath}
  //                   alt={`${property.property_title} Image ${i + 1}`}
  //                   className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
  //                 />
  //               ))} */}
  //             <div className="mt-2">
  //               <p className="text-sm">{property.property_title}</p>
  //               <p className="text-xs">{property.location}</p>
  //               <p className="text-xs font-medium">{property.monthly_price}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </section>

  //     <section className="p-12 flex-1 ">
  //       <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
  //         {filteredProperties.map((prop, index) => (
  //           <div key={index}>
  //             {prop.images && prop.images.length > 0 && (
  //               <img
  //                 src={URL.createObjectURL(prop.images[0])}
  //                 alt="Property"
  //                 className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
  //                 title="Photo 1"
  //               />
  //             )}
  //             {/* <img
  //               src={URL.createObjectURL(img)}
  //               alt={prop.title}
  //               className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
  //               // onClick={() => handlepropClick(prop.id)}
  //             /> */}
  //             <div className="mt-2">
  //               <p className="text-sm">{prop.title}</p>
  //               <p className="text-xs">{prop.type}</p>
  //               <p className="text-xs font-medium">{prop.price}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //     <div className="flex flex-row justify-between">
  //       <h2 className="text-2xl font-bold mb-4">Property Dashboard</h2>

  //       <button
  //         className="w-32 border rounded-md text-blue-500 font-medium hover:text-white hover:bg-blue-500 cursor-pointer"
  //         onClick={() => setShowForm(true)}
  //       >
  //         Add Properties
  //       </button>
  //     </div>

  //     {/* Filter */}
  //     <div className="flex gap-2 mb-4">
  //       {["all", "available", "unavailable"].map((f) => (
  //         <button
  //           key={f}
  //           className={`px-4 py-2 rounded ${
  //             filter === f ? "bg-blue-500" : "bg-gray-200"
  //           }`}
  //           onClick={() => setFilter(f)}
  //         >
  //           {f.charAt(0).toUpperCase() + f.slice(1)}
  //         </button>
  //       ))}
  //     </div>

  //     {/* Table */}

  //     <div className="overflow-x-auto">
  //       <table className="w-full border-collapse border border-gray-300">
  //         <thead className="bg-gray-100">
  //           <tr>
  //             <th className="border px-4 py-2">Title</th>
  //             <th className="border px-4 py-2">Type</th>
  //             <th className="border px-4 py-2">Price</th>
  //             <th className="border px-4 py-2">Status</th>
  //             <th className="border px-4 py-2">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filteredProperties.length === 0 ? (
  //             <tr>
  //               <td colSpan="6" className="text-center py-4">
  //                 No properties found.
  //               </td>
  //             </tr>
  //           ) : (
  //             filteredProperties.map((prop, index) => (
  //               <tr key={index} className="hover:bg-gray-50">
  //                 <td className="border px-4 py-2">{prop.title}</td>
  //                 <td className="border px-4 py-2">{prop.type}</td>
  //                 <td className="border px-4 py-2">{prop.monthlyPrice}</td>
  //                 <td
  //                   className={`border px-4 py-2 font-semibold ${
  //                     prop.availability === "available"
  //                       ? "text-green-600"
  //                       : "text-red-600"
  //                   }`}
  //                 >
  //                   {prop.availability}
  //                 </td>
  //                 {/* <td className="border px-4 py-2 flex gap-1">
  //                   {prop.images &&
  //                     prop.images.map((img, i) => (
  //                       <img
  //                         key={i}
  //                         src={URL.createObjectURL(img)}
  //                         alt="Property"
  //                         className="w-10 h-10 object-cover rounded cursor-pointer"
  //                         title={`Photo ${i + 1}`}
  //                       />
  //                     ))}
  //                 </td> */}
  //                 <td className="border px-4 py-2 flex gap-2">
  //                   <button
  //                     className="bg-yellow-400 px-2 py-1 rounded"
  //                     onClick={() => handleEdit(index)}
  //                   >
  //                     View
  //                   </button>
  //                   <button
  //                     className="bg-red-500 px-2 py-1 rounded"
  //                     onClick={() => handleDelete(index)}
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //                 {/* <td className="border px-4 py-2 flex gap-1">
  //                   {prop.images &&
  //                     prop.images.map((img, i) => (
  //                       <img
  //                         key={i}
  //                         src={URL.createObjectURL(img)}
  //                         alt="Property"
  //                         className="w-10 h-10 object-cover rounded cursor-pointer"
  //                         title={`Photo ${i + 1}`}
  //                       />
  //                     ))}
  //                 </td> */}
  //               </tr>
  //             ))
  //           )}
  //         </tbody>
  //       </table>
  //     </div>

  //     {/* Edit Modal */}
  //     {editingIndex !== null && (
  //       <div className="fixed inset-0 bg-taupe-800/50 flex justify-center items-center z-50">
  //         <div className="bg-white p-6 rounded-md w-96 max-h-[90vh] overflow-y-auto">
  //           <h3 className="text-xl font-bold mb-4">Edit Property</h3>

  //           <input
  //             type="text"
  //             placeholder="Title"
  //             className="w-full border px-3 py-2 mb-2 rounded"
  //             value={editData.title}
  //             onChange={(e) =>
  //               setEditData({ ...editData, title: e.target.value })
  //             }
  //           />
  //           <input
  //             type="text"
  //             placeholder="Price"
  //             className="w-full border px-3 py-2 mb-2 rounded"
  //             value={editData.monthlyPrice}
  //             onChange={(e) =>
  //               setEditData({ ...editData, monthlyPrice: e.target.value })
  //             }
  //           />
  //           <select
  //             className="w-full border px-3 py-2 mb-2 rounded"
  //             value={editData.availability}
  //             onChange={(e) =>
  //               setEditData({ ...editData, availability: e.target.value })
  //             }
  //           >
  //             <option value="available">Available</option>
  //             <option value="unavailable">Unavailable</option>
  //           </select>

  //           {/* Multi-photo upload */}
  //           <div
  //             className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors mb-2"
  //             onDrop={handleDropEdit}
  //             onDragOver={handleDragOverEdit}
  //             onClick={() => document.getElementById("editFileInput").click()}
  //           >
  //             <p className="text-gray-500 text-sm mt-12">
  //               Click or drag images to upload
  //             </p>
  //             <input
  //               type="file"
  //               id="editFileInput"
  //               multiple
  //               accept="image/*"
  //               onChange={handleEditFileChange}
  //               className="hidden"
  //             />
  //           </div>

  //           {/* Image previews */}
  //           <div className="flex flex-wrap gap-2 mb-2">
  //             {editPreviews.map((img, i) => (
  //               <div key={i} className="relative w-16 h-16">
  //                 <img
  //                   src={URL.createObjectURL(img)}
  //                   alt={`Preview ${i}`}
  //                   className="w-full h-full object-cover rounded"
  //                 />
  //                 <button
  //                   type="button"
  //                   onClick={() => removeEditImage(i)}
  //                   className="absolute top-0 right-0 bg-red-500  rounded-full w-5 h-5 flex items-center justify-center text-xs"
  //                 >
  //                   ×
  //                 </button>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="flex justify-end gap-2 mt-4">
  //             <button
  //               className="px-4 py-2 rounded bg-gray-300"
  //               onClick={() => setEditingIndex(null)}
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               className="px-4 py-2 rounded bg-blue-500 "
  //               onClick={saveEdit}
  //             >
  //               Save
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default TestDashboard;
