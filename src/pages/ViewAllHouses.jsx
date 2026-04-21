import React, { useState } from "react";
import sampleData from "../data/sampleData";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Pagination from "../component/Pagination";
import Footer from "../component/Footer";

const ViewAllHouses = () => {
  const navigate = useNavigate();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 8;

  // Get the sample houses
  const houses = sampleData.getSampleHouses();

  const handleHouseClick = (id) => {
    //Navigate to the house details page with the selected house ID
    navigate(`/viewHouseDetails/${id}`);
    console.log(id);
  };

  const paginatedData = houses.slice(
    (currentPage - 1) * housesPerPage,
    currentPage * housesPerPage,
  );
  console.log(location.pathname);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="p-12 flex-1 ">
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-gray-700">
            {paginatedData.map((house) => (
              <div key={house.id}>
                <img
                  src={house.image}
                  alt={house.title}
                  className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  onClick={() => handleHouseClick(house.id)}
                />
                <div className="mt-2">
                  <p className="text-sm">{house.title}</p>
                  <p className="text-xs">{house.location}</p>
                  <p className="text-xs font-medium">{house.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination Controls */}

        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          data={houses}
          totalPerPage={housesPerPage}
        />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ViewAllHouses;
