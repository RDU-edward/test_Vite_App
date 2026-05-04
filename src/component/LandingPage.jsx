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
import axios from "axios";
import toCurrency from "../utils/toCurrency";

function LandingPage() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [properties, setproperties] = useState([]);
  const [propertyFilePaths, setPropertyFilePaths] = useState([]);

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);

  const handleHouseClick = (id) => {
    //Navigate to the house details page with the selected house ID
    navigate(`/viewHouseDetails/${id}`);
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

  const handleViewAllHouses = () => {
    if (loggedInUser) {
      navigate(`/viewAllHouses`);
    } else {
      setIsLoginModalOpen(true);
    }
  };

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

  // console.log(propertyFilePaths);

  useEffect(() => {
    if (isLoginModalOpen) {
      // If any modal is open, hide overflow
      document.body.style.overflow = "hidden";
    } else {
      // If no modal is open, allow scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginModalOpen]);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 ">
        {/* Navbar */}
        <div className="fixed w-full top-0 z-50">
          <Navbar />
        </div>

        {/* Hero Section */}
        <section
          className="relative w-full bg-cover bg-center h-96 flex items-center justify-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center pt-20 text-white">
            <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-lg mb-8">
              Explore a wide range of houses and condos available for rent or
              sale.
            </p>
          </div>
        </section>

        {/* Popular House */}
        <section className="p-12 text-gray-700 bg-gray-100  ">
          <div className="text-xl font-semibold flex items-center mb-6 gap-2">
            Available Houses for Lease
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
            {properties.slice(0, 5).map((property, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:3000/${propertyFilePaths[index] && propertyFilePaths[index][0]}`}
                  alt={property.property_title}
                  className="rounded-2xl h-44 w-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                  onClick={() => handleHouseClick(property.id)} // On click, navigate to the details page with the property id
                />
                <div className="mt-2">
                  <p className="text-md font-medium">
                    {property.property_title}
                  </p>
                  <p className="text-xs">{property.address}</p>
                  <p className="text-xs font-medium">
                    {toCurrency(property.monthly_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="border border-gray-700 p-2 w-32 rounded cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300"
              onClick={handleViewAllHouses}
            >
              View More
            </button>
          </div>
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
        {isLoginModalOpen && (
          <>
            <Login toggleLoginModal={toggleLoginModal} />
          </>
        )}
      </div>
    </>
  );
}

export default LandingPage;
