import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import AddPropertyForm from "../component/AddPropertyForm";
import toCurrency from "../utils/toCurrency";
import { useNavigate } from "react-router-dom";

const PropertyList = ({ properties, setProperties, setShowForm }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [editPreviews, setEditPreviews] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const navigate = useNavigate();

  const handlePropertyClick = (id) => {
    //Navigate to the house details page with the selected house ID
    navigate(`/viewHouseDetails/${id}`);
  };

  const [editingProperty, setEditingProperty] = useState(null);
  const [properties1, setProperties1] = useState([]);
  const [propertyFilePaths, setPropertyFilePaths] = useState([]);

  const getAllPropertyByManagerId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}property/manager/${loggedUser.id}`,
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
    getAllPropertyByManagerId();
  }, []);
  console.log(propertyFilePaths);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-700">
      {formOpen === true ? (
        <AddPropertyForm setShowForm={setFormOpen} property={editingProperty} />
      ) : (
        <main className="p-6 lg:p-10 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div className="flex font-bold text-xl items-end mb-4 md:mb-0">
              Property Dashboard
            </div>
            <div
              className="p-2 border text-sm text-gray-700  cursor-pointer hover:bg-gray-100"
              onClick={() => setShowForm(true)}
            >
              Add Properties
            </div>
          </div>

          <section className="flex-1 ">
            <div className="mt-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">
              {properties1.map((property, index) => (
                <div
                  className="border border-gray-300 p-2 shadow rounded-md "
                  key={property.id}
                >
                  <img
                    src={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`}
                    alt={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`}
                    // alt={property.property_title}
                    className=" rounded-md mx-auto h-50 w-80 cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                    onClick={() => handlePropertyClick(property.id)} // On click, navigate to the details page with the property id

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
                    <p className="text-md font-medium">
                      {property.property_title}
                    </p>
                    <p className="text-xs">{property.address}</p>
                    <p className="text-base font-medium mt-2">
                      {toCurrency(property.monthly_price)}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-between mt-4">
                    <div
                      className={`text-xs font-medium ${property?.availability == "available" ? "text-green-600" : "text-red-500"}  text-sm tracking-wider `}
                    >
                      {property.availability.toUpperCase()}
                    </div>

                    <div className="flex gap-2">
                      <div
                        className="text-sm cursor-pointer hover:font-medium"
                        onClick={() => {
                          setFormOpen(true);
                          setEditingProperty(property);
                        }}
                      >
                        Edit
                      </div>
                      <div className="text-red-500 text-sm hover:font-medium cursor-pointer">
                        Delete
                      </div>
                    </div>
                  </div>

                  {/* <FaEye className="text-blue-500 text-xl" />
                    <FaPen className="text-green-800 text-xl" />
                    <FaTrash className="text-red-500 text-xl" /> */}
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default PropertyList;
