import React from "react";
import { useParams } from "react-router-dom";
import sampleData from "../data/sampleData";
import {
  FaWifi,
  FaCar,
  FaSwimmingPool,
  FaBath,
  FaTv,
  FaSnowflake,
} from "react-icons/fa"; // Import icons
import Footer from "../component/Footer";

const ViewHouseDetails = () => {
  const { id } = useParams(); // Grab the house ID from the URL
  console.log(typeof id);

  // You can now fetch and display the details of the house using the `id`
  const house = sampleData.getSampleHouses().find((h) => h.id == id);
  console.log(house);

  return (
    <div className="min-h-screen bg-gray-50 ">
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
            <button
              // onClick={toggleMenu}
              className="text-gray-900 hover:text-blue-500"
            >
              {/* Hamburger icon */}
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
            <a
              href="#signup"
              className="text-gray-700 hover:text-blue-500"
              // onClick={toggleSignUpModal}
            >
              Sign Up
            </a>
            <a
              href="#login"
              className="text-gray-700 hover:text-blue-500"
              // onClick={toggleLoginModal}
            >
              Log In
            </a>
          </div>
        </div>
      </nav>

      <section className="mt-2 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {house ? house.title : "House Not Found"}
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-amber-700 flex-1">
              <img
                src={house?.image}
                alt={house?.title}
                className="w-full h-full object-cover  "
              />
            </div>
            <div className="flex-1">
              <div class="grid grid-cols-2 gap-2">
                <img src={house?.image} alt={house?.title} />
                <img src={house?.image} alt={house?.title} />
                <img src={house?.image} alt={house?.title} />
                <img src={house?.image} alt={house?.title} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-bold text-xl text-gray-700">
              Entire home in Tagaytay, Philippines
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <span>8 guests . </span>
              <span>3 bedrooms .</span>
              <span>4 beds .</span>
              <span>3 baths</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto px-6 mt-6">
          <div className="flex-1 rounded-2xl">
            <div className="bg-white rounded-2xl w-96 p-6 border border-gray-400 shadow-xl shadow-gray-400">
              <div className="text-2xl mt-2 text-gray-700 font-semibold mb-4 ">
                {house.price} per night {/* Assuming house.price is a number */}
              </div>
              <form className="p-4 text-gray-700 w-full s">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Check In
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Checkout
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-4 rounded-xl cursor-pointer hover:bg-blue-600 transition duration-300"
                >
                  Reserve
                </button>
                <div className="text-gray-700 text-sm mt-2 text-center">
                  You won't be charged yet
                </div>
              </form>
            </div>
          </div>
          <div className="text-gray-700 flex-1">
            {/* Changed "Amenities" to "Guest Perks" */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Guest Perks
              </h3>
              <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="flex items-center">
                  <FaWifi className="text-gray-600 text-lg" />
                  <span className="ml-2 text-lg">Free WiFi</span>
                </div>
                <div className="flex items-center">
                  <FaTv className="text-gray-600 text-lg" />
                  <span className="ml-2 text-lg">TV</span>
                </div>
                <div className="flex items-center">
                  <FaSnowflake className="text-gray-600 text-lg" />
                  <span className="ml-2 text-lg">Air Conditioning</span>
                </div>
                <div className="flex items-center">
                  <FaCar className="text-gray-600 text-lg" />
                  <span className="ml-2 text-lg">Free Parking</span>
                </div>
                <div className="flex items-center">
                  <FaSwimmingPool className="text-gray-600 text-lg" />
                  <span className="ml-2 text-lg">Relax by the Pool</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="text-gray-600 text-lg" />
                  <span className="ml-2 text-lg">Private Bathroom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewHouseDetails;
