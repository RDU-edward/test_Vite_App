import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sampleData from "../data/sampleData";
import {
  FaWifi,
  FaCar,
  FaSwimmingPool,
  FaBath,
  FaTv,
  FaSnowflake,
  FaMobile,
  FaVoicemail,
  FaEnvelope,
} from "react-icons/fa"; // Import icons
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import testimage from "../assets/ihomesLogo.png";
import { FaLocationPin } from "react-icons/fa6";

const ViewHouseDetails = () => {
  const { id } = useParams(); // Grab the house ID from the URL
  console.log(typeof id);

  // You can now fetch and display the details of the house using the `id`
  // const house = sampleData.getSampleHouses().find((h) => h.id == id);
  // console.log(house);

  console.log(id);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [guestData, setGuestData] = useState({
    property_id: id,
    fullname: loggedUser?.firstname + loggedUser?.lastname,
    contact_number: loggedUser?.contact_number,
    email: loggedUser?.email,
    movein_date: "",
    total_occupants: "",
  });

  const [details, setDetails] = useState();
  const [propertyFiles, setPropertyFiles] = useState([]);

  const getHouseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/property/${id}`,
      );
      console.log(response.data);
      setDetails(response.data[0]);
      const filePaths = response.data.map((files) => JSON.parse(files.files));
      setPropertyFiles(filePaths[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHouseDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reservation/create_reservation",
        guestData,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />

      <section className="mt-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {details ? details.property_title : "House Not Found"}
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-amber-700 flex-1">
              <img
                src={`http://localhost:3000/${propertyFiles[0]}`}
                alt={`http://localhost:3000/${propertyFiles[0]}`}
                className="w-full h-full object-cover  "
              />
            </div>
            <div className="flex-1">
              <div class="grid grid-cols-2 gap-2">
                {propertyFiles.map((item, index) => (
                  <img src={`http://localhost:3000/${item}`} alt={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-bold text-xl text-gray-700">
              {details?.description}
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <span>8 guests . </span>
              <span>3 bedrooms .</span>
              <span>4 beds .</span>
              <span>3 baths</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto  mt-6">
          <div className="flex-1 text-gray-700">
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
          <div className="flex-1 w-full mx-auto  ">
            <form
              action=""
              className=" shadow-md shadow-gray-700  rounded  mx-auto p-8 flex flex-col  justify-center"
              onSubmit={handleSubmit}
            >
              <div className="font-bold text-xl text-gray-700">
                Monthly Price 20, 000
              </div>
              <span className="text-red-500 text-sm font-medium mb-2">
                (10% Downpayment)
              </span>

              <div className="mb-4">
                <label htmlFor="">Move In Date</label>
                <input
                  type="date"
                  name="movein_date"
                  className="border w-full rounded block p-2"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="">Total Occupants</label>
                <input
                  type="text"
                  name="total_occupants"
                  className="border rounded w-full block p-2"
                  onChange={handleChange}
                />
              </div>

              <button className="w-full bg-red-500 text-white h-12">
                Reserved
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="py-10 ">
        <div className="flex flex-col md:flex-row gap-6 ">
          <div className="flex-1 w-full mx-auto px-6 ">
            <form
              action=""
              className=" shadow-md shadow-gray-700 rounded  p-8 flex flex-col  justify-center"
            >
              <div className="font-bold text-xl text-gray-700">
                Do you have any questions?
              </div>

              <div className="mb-4 mt-4">
                <textarea
                  name=""
                  id=""
                  cols="40"
                  className="border block w-full rounded-md  h-30 p-2 text-sm"
                ></textarea>
              </div>

              <button className="w-full rounded-2xl  bg-gray-500 text-white h-12">
                Message Owner
              </button>
            </form>
          </div>
          <div className="flex-1">
            <div className="text-xl font-medium mb-2 text-center">
              Owner Information
            </div>

            <div className="flex flex-row  justify-center space-x-6">
              <div className="">
                <img
                  src={testimage}
                  alt=""
                  srcset=""
                  className="h-40 max-w-40 rounded-full"
                />
                <div className="font-medium text-lg ml-10 mt-2 ">
                  {details?.owner_firstname} {details?.owner_firstname}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex space-x-1">
                  <FaMobile className="text-md mt-1 text-gray-500" />
                  <span>{details?.owner_mobile}</span>
                </div>
                <div className="flex space-x-1">
                  <FaEnvelope className="text-md mt-1 text-blue-400" />
                  <span>{details?.owner_email}</span>
                </div>
                <div className="flex space-x-1">
                  <FaLocationPin className="text-md mt-1 text-red-600" />
                  <span>{details?.owner_address}</span>
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
