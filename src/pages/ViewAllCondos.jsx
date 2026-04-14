import React, { useState } from "react";
import sampleData from "../data/sampleData";
import { useNavigate } from "react-router-dom";

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
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-semibold text-gray-900 flex items-center">
            <a href="/" className="hover:text-blue-500 flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </span>
              iHomes
            </a>
          </div>

          {/* Search Bar for Desktop */}
          <div className="hidden md:flex w-1/3 items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search for houses, condos, etc."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-900 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#signup" className="text-gray-700 hover:text-blue-500">
              Sign Up
            </a>
            <a href="#login" className="text-gray-700 hover:text-blue-500">
              Log In
            </a>
          </div>
        </div>
      </nav>

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
