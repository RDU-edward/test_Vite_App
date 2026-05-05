import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import Footer from "../component/Footer";
import { FaBell, FaMessage, FaRegBell } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoIosLogOut } from "react-icons/io";
import Pagination from "../component/Pagination";
import axios from "axios";
import toCurrency from "../utils/toCurrency";
import ReservationDetails from "../component/ReservationDetails";

function ManagerDashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationFilePaths, setReservationFilePaths] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // const [reservations, setReservations] = useState(
  //   sampleData.getSampleReservations(),
  // );

  const [activeTab, setActiveTab] = useState("pending");
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 2;

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const getReservations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}reservation/manager/${loggedUser.id}`,
      );

      setReservations(response.data);

      // Parse the file paths for each property and store them in an array
      const filePaths = response.data.map(
        (reservations) => JSON.parse(reservations.files), // Assuming `files` is a JSON string in the database
      );
      setReservationFilePaths(filePaths); // Store the array of file paths
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);
  console.log(reservations);

  // Filter reservations by status
  const getFilteredReservations = () => {
    if (activeTab === "total") return reservations;

    return reservations.filter(
      (res) => res.status?.toLowerCase() === activeTab.toLowerCase(),
    );
  };

  console.log(activeTab);

  // Approve reservation
  const handleApprove = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "approved" } : res,
      ),
    );
    setExpandedReservation(null);
    alert("Reservation approved successfully!");
  };

  // Reject reservation
  const handleReject = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "rejected" } : res,
      ),
    );
    setExpandedReservation(null);
    alert("Reservation rejected!");
  };

  // Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedInUser");
      navigate("/");
    }
  };

  // Get status badge color
  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "badge badge-warning";
  //     case "approved":
  //       return "badge badge-success";
  //     case "rejected":
  //       return "badge badge-error";
  //     default:
  //       return "badge badge-ghost";
  //   }
  // };

  // const filteredReservations = getFilteredReservations();

  const paginatedData = reservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage,
  );

  if (!loggedUser) {
    return null;
  }

  console.log(selectedReservation);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm text-gray-700 ">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-semibold text-gray-900 flex items-center">
              <a href="/" className="hover:text-blue-500 flex items-center">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
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

            <div className="flex items-center gap-2 md:gap-4">
              {/* Message Icon */}
              <div className="relative">
                <FiMessageSquare className="text-xl" />

                {/* Ping Dot */}
                <span className="absolute -top-1 -right-1 flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                </span>
              </div>{" "}
              {/* Bell Icon */}
              <div className="relative">
                <FaRegBell className="text-xl" />

                {/* Ping Dot */}
                <span className="absolute -top-1 -right-1 flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                </span>
              </div>
              <div>Hello, {loggedUser.firstname}</div>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full border flex items-center justify-center  font-medium">
                    {loggedUser.firstname[0]}
                    {loggedUser.lastname[0]}
                  </div>
                </button>
                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">
                          {loggedUser.firstname}
                        </div>
                        <div className="text-gray-500">{loggedUser.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-4 text-sm text-gray-700 cursor-pointer hover:text-blue-400 hover:font-medium hover:bg-gray-100"
                      >
                        <span>Sign out</span>
                        <IoIosLogOut className="ml-2 text-xl hover:text-blue-400 hover:font-medium" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex flex-col p-4 lg:p-6">
        <section className="flex-1">
          {/* Reservations List */}
          <div className="max-w-7xl mx-auto  ">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <div className="flex font-bold text-xl items-end mb-4 md:mb-0">
                Property Reservations
              </div>
              <div
                className="p-2 text-sm border  text-gray-700  cursor-pointer hover:bg-gray-100"
                onClick={() => navigate("/manager/property_list")}
              >
                View Properties
              </div>
            </div>
            {paginatedData.length > 0 ? (
              <div className="mt-2 grid grid-cols-1  md:grid-cols-4 lg:grid-cols-4 gap-4">
                {paginatedData.map((reservation, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 shadow rounded-md hover:shadow-lg"
                    onClick={() => setSelectedReservation(reservation)}
                  >
                    <img
                      src={`http://localhost:3000/${reservationFilePaths[index] && reservationFilePaths[index][0]}`}
                      alt={`http://localhost:3000/${reservationFilePaths[index] && reservationFilePaths[index][0]}`}
                      // alt={property.property_title}
                      className=" rounded-t-md mx-auto h-50 w-full"

                      // onClick={() => handleCondoClick(condo.id)}
                    />

                    <div className="mt-2 px-2">
                      <p className="text-md font-medium text-gray-700">
                        {reservation.property_title}
                      </p>
                      <p className="text-xs">{reservation.address}</p>
                      <div className="flex  justify-between mb-2">
                        <p className="text-sm text-gray-700 font-medium mt-2">
                          {toCurrency(reservation.monthly_price)}
                        </p>
                        <p className="text-sm font-medium text-green-500 mt-2">
                          {reservation.payment_status.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info" role="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>No reservations at the moment.</span>
              </div>
            )}

            {/* Pagination Controls */}
          </div>
        </section>
      </main>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        data={reservations}
        totalPerPage={reservationsPerPage}
      />
      {/* Pagination */}
      <footer>
        <Footer />
      </footer>

      {/* Reservation Details */}
      {selectedReservation && (
        <ReservationDetails
          selectedReservation={selectedReservation}
          setSelectedReservation={setSelectedReservation}
        />
      )}
    </div>
  );
}

export default ManagerDashboard;
