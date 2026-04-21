import React, { useState, useEffect } from "react";
import bgimgage from "../assets/ihomesbg.jpg";
import condo1 from "../assets/condo1.jpg";
import house1 from "../assets/house1.jpg";
import Login from "./Login";
import Signup from "./Signup";
import sampleData from "../data/sampleData";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function LandingPage() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleHouseClick = (id) => {
    //Navigate to the house details page with the selected house ID
    navigate(`/viewHouseDetails/${id}`);
    console.log(id);
  };
  const handleCondoClick = (id) => {
    //Navigate to the condo details page with the selected condo ID
    navigate(`/viewCondoDetails/${id}`);
    console.log(id);
  };

  const images = [bgimgage, condo1, house1];

  // State to track the current background image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);

  const handleViewAllHouses = () => {
    if (loggedInUser) {
      navigate(`/viewAllHouses`);
    } else {
      setIsLoginModalOpen(true);
    }
  };
  const handleViewAllCondos = () => {
    if (loggedInUser) {
      navigate(`/viewAllCondos`);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full bg-cover bg-center h-96 flex items-center justify-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-lg mb-8">
            Explore a wide range of houses and condos available for rent or
            sale.
          </p>
        </div>
      </section>

      {/* Popular House */}
      <section className="p-12 text-gray-700 bg-gray-100">
        <div className="text-xl font-semibold flex items-center gap-2">
          Available Houses in Cebu City{" "}
          <span className="mt-2">
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {sampleData
            .getSampleHouses()
            .slice(0, 5)
            .map((house, index) => (
              <div key={index}>
                <img
                  src={house.image}
                  alt={house.title}
                  className="rounded-md w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  onClick={() => handleHouseClick(house.id)} // On click, navigate to the details page with the house id
                />
                <div className="mt-2">
                  <p className="text-sm">{house.title}</p>
                  <p className="text-xs">{house.location}</p>
                  <p className="text-xs font-medium">{house.price}</p>
                </div>
              </div>
            ))}
        </div>
        <button
          className="border border-gray-700  p-2 w-32 rounded mx-auto mt-6 block cursor-pointer hover:bg-gray-700  transition duration-300"
          onClick={handleViewAllHouses}
        >
          View More
        </button>
      </section>
      {/* Available Condos */}
      <section className="p-12 text-gray-700 bg-gray-100">
        <div className="text-xl font-semibold flex items-center gap-2">
          Available Houses in Cebu City{" "}
          <span className="mt-2">
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {sampleData
            .getSampleCondos()
            .slice(0, 5)
            .map((condo, index) => (
              <div key={index}>
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
        <button
          className="border border-gray-700 p-2 w-32 rounded mx-auto mt-6 block cursor-pointer hover:bg-gray-700  transition duration-300"
          onClick={handleViewAllCondos}
        >
          View More
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-gray-600">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why Choose iHomes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-md cursor-pointer border border-gray-400 hover:bg-gray-100">
              <h3 className="text-xl font-semibold">Easy Search</h3>
              <p className="mt-4">
                Find the best houses and condos quickly with our easy-to-use
                search filters.
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md cursor-pointer border border-gray-400 hover:bg-gray-100">
              <h3 className="text-xl font-semibold">Trusted Listings</h3>
              <p className="mt-4">
                Browse verified and updated listings for reliable information
                and images.
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md cursor-pointer border border-gray-400 hover:bg-gray-100">
              <h3 className="text-xl font-semibold">Affordable Prices</h3>
              <p className="mt-4">
                Explore a variety of properties at different price points that
                fit your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Log In Modal */}
      {isLoginModalOpen && <Login toggleLoginModal={toggleLoginModal} />}
    </div>
  );
}

export default LandingPage;
