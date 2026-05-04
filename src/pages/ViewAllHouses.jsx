import React, { useState, useEffect } from "react";
import sampleData from "../data/sampleData";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Pagination from "../component/Pagination";
import Footer from "../component/Footer";
import toCurrency from "../utils/toCurrency";
import axios from "axios";

const ViewAllHouses = () => {
  const navigate = useNavigate();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertyPerPage = 8;

  // Get the sample houses
  // const houses = sampleData.getSampleHouses();

  const [properties, setproperties] = useState([]);
  const [propertyFilePaths, setPropertyFilePaths] = useState([]);
  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/property/available",
      );
      setproperties(response.data);

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

  const handlePropertyClick = (id) => {
    //Navigate to the house details page with the selected house ID
    navigate(`/viewHouseDetails/${id}`);
    console.log(id);
  };

  const paginatedData = properties.slice(
    (currentPage - 1) * propertyPerPage,
    currentPage * propertyPerPage,
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="p-12 flex-1 ">
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-gray-700">
            {properties.map((property, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`}
                  alt={property.property_title}
                  className="rounded-md h-50 w-80 cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  onClick={() => handlePropertyClick(property.id)} // On click, navigate to the details page with the property id
                />
                <div className="mt-2">
                  <p className="text-md font-medium">
                    {property.property_title}
                  </p>
                  <p className="text-xs">{property.address}</p>
                  <p className="text-sm font-medium ">
                    {toCurrency(property.monthly_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination Controls */}
      </main>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        data={properties}
        totalPerPage={propertyPerPage}
      />

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ViewAllHouses;
