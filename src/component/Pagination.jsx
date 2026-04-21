import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, setCurrentPage, data, totalPerPage }) => {
  // Pagination calculations
  const totalPages = Math.ceil(data.length / totalPerPage);
  console.log(totalPages);

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Create an array of page numbers for pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section>
      <div className="flex justify-center mt-8 mb-4 text-gray-700">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowBack />
          <span>Previous</span>
        </button>

        {/* Page Number Buttons */}
        {currentPage > 3 && (
          <>
            <button onClick={() => goToPage(1)} className="px-4 py-2 ">
              1
            </button>
            <span className="text-lg">...</span>
          </>
        )}

        {pageNumbers.map((page) => {
          if (page >= currentPage - 2 && page <= currentPage + 2) {
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page ? " font-bold" : ""
                }`}
              >
                {page}
              </button>
            );
          }
          return null;
        })}

        {currentPage < totalPages - 2 && (
          <>
            <span className="text-lg">...</span>
            <button onClick={() => goToPage(totalPages)} className="px-4 py-2">
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
