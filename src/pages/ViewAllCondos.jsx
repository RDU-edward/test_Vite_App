import React, { useState } from "react";
import sampleData from "../data/sampleData";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const ViewAllCondos = () => {
  const navigate = useNavigate();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const condosPerPage = 10;

  // Get the sample condos
  const condos = sampleData.getSampleCondos();

  // Calculate the index range for current page
  const indexOfLastCondo = currentPage * condosPerPage;
  const indexOfFirstCondo = indexOfLastCondo - condosPerPage;

  // Get the houses for the current page
  const currentCondos = condos.slice(indexOfFirstCondo, indexOfLastCondo);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle house click (you can implement this function for routing or modal purposes)

  const handleCondoClick = (id) => {
    //Navigate to the condo details page with the selected condo ID
    navigate(`/viewCondoDetails/${id}`);
    console.log(id);
  };

  // Calculate total pages
  const totalPages = Math.ceil(condos.length / condosPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="p-12 mt-24 text-gray-700 h-full flex-grow">
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {currentCondos.map((condo) => (
            <div key={condo.id}>
              <img
                src={condo.image}
                alt={condo.title}
                className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                onClick={() => handleCondoClick(condo.id)}
              />
              <div className="mt-2">
                <p className="text-sm">{condo.title}</p>
                <p className="text-xs">{condo.location}</p>
                <p className="text-xs font-medium">{condo.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Number Display */}
        <span className="mx-4 text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewAllCondos;
