import React, { useState } from "react";
import sampleData from "../data/sampleData";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Pagination from "../component/Pagination";
import Footer from "../component/Footer";

const ViewAllCondos = () => {
  const navigate = useNavigate();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const condosPerPage = 5;

  // Get the sample condos
  const condos = sampleData.getSampleCondos();

  const handleCondoClick = (id) => {
    //Navigate to the condo details page with the selected condo ID
    navigate(`/viewCondoDetails/${id}`);
    console.log(id);
  };
  const paginatedData = condos.slice(
    (currentPage - 1) * condosPerPage,
    currentPage * condosPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-700">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="p-12 flex-1 ">
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {paginatedData.map((condo) => (
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

        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          data={condos}
          totalPerPage={condosPerPage}
        />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ViewAllCondos;
