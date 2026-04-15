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
import Navbar from "../component/Navbar";

const ViewCondoDetails = () => {
  const { id } = useParams(); // Grab the condo ID from the URL
  console.log(typeof id);

  // You can now fetch and display the details of the condo using the `id`
  const condo = sampleData.getSampleCondos().find((c) => c.id == id);
  console.log(condo);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />

      <section className="mt-2 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {condo ? condo.title : "Condo Not Found"}
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-amber-700 flex-1">
              <img
                src={condo?.image}
                alt={condo?.title}
                className="w-full h-full object-cover  "
              />
            </div>
            <div className="flex-1">
              <div class="grid grid-cols-2 gap-2">
                <img src={condo?.image} alt={condo?.title} />
                <img src={condo?.image} alt={condo?.title} />
                <img src={condo?.image} alt={condo?.title} />
                <img src={condo?.image} alt={condo?.title} />
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
                {condo.price} per night {/* Assuming house.price is a number */}
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

export default ViewCondoDetails;
