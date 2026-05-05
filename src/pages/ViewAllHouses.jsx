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
  const propertyPerPage = 5;

  // Get the sample houses
  // const houses = sampleData.getSampleHouses();

  const [properties, setproperties] = useState([]);
  const [propertyFilePaths, setPropertyFilePaths] = useState([]);
  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}property/available`,
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

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filter properties by search term AND price range
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.property_title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMinPrice =
      !minPrice || property.monthly_price >= parseFloat(minPrice);
    const matchesMaxPrice =
      !maxPrice || property.monthly_price <= parseFloat(maxPrice);

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  // Paginate filtered results
  const paginatedData = filteredProperties.slice(
    (currentPage - 1) * propertyPerPage,
    currentPage * propertyPerPage,
  );

  // Highlight matching text
  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col p-12">
        {/* Search & Price Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 text-gray-700">
          <div className="flex-1 ">
            <input
              type="text"
              placeholder="Search by title or place..."
              className="flex-1 p-2 w-full border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on new search
              }}
            />
          </div>

          <div className="flex-1 flex gap-2">
            <input
              type="number"
              placeholder="Min price"
              className="w-32 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
            <input
              type="number"
              placeholder="Max price"
              className="w-32 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-gray-700">
          {paginatedData.length > 0 ? (
            paginatedData.map((property, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:3000/${
                    propertyFilePaths[index] && propertyFilePaths[index][0]
                  }`}
                  alt={property.property_title}
                  className="rounded-md h-50 w-80 cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  onClick={() => handlePropertyClick(property.id)}
                />
                <div className="mt-2">
                  <p className="text-md font-medium">
                    {highlightText(property.property_title, searchTerm)}
                  </p>
                  <p className="text-xs">
                    {highlightText(property.address, searchTerm)}
                  </p>
                  <p className="text-sm font-medium">
                    {toCurrency(property.monthly_price)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-4">
              No houses found matching your search.
            </p>
          )}
        </div>
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
