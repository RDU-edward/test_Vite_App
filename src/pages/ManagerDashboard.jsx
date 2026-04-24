import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import Footer from "../component/Footer";
import { FaBell, FaMessage, FaRegBell } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward, IoIosLogOut } from "react-icons/io";
import Pagination from "../component/Pagination";

function ManagerDashboard() {
  const [reservations, setReservations] = useState(
    sampleData.getSampleReservations(),
  );

  const [activeTab, setActiveTab] = useState("pending");
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 2;

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

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
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge badge-warning";
      case "approved":
        return "badge badge-success";
      case "rejected":
        return "badge badge-error";
      default:
        return "badge badge-ghost";
    }
  };

  const filteredReservations = getFilteredReservations();

  const paginatedData = filteredReservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage,
  );

  // console.log(filteredReservations);

  // Pagination calculations
  // const totalPages = Math.ceil(
  //   filteredReservations.length / reservationsPerPage,
  // );
  // const filteredReservations = filteredReservations.slice(
  //   (currentPage - 1) * reservationsPerPage,
  //   currentPage * reservationsPerPage,
  // );

  // // Handle page change
  // const goToPage = (page) => {
  //   if (page < 1 || page > totalPages) return;
  //   setCurrentPage(page);
  // };

  // // Create an array of page numbers for pagination buttons
  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  if (!loggedUser) {
    return null;
  }

  console.log(loggedUser);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm mb-8 text-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <div className="flex items-center gap-4">
              <button
                className="px-4 border py-2 text-sm text-gray-700  cursor-pointer hover:bg-gray-100"
                onClick={() => navigate("/manager/property_list")}
              >
                View Properties
              </button>
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
        {/* Statistics Cards */}
        <section>
          <div className="max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className={`${activeTab == "pending" ? "shadow-lg shadow-amber-600" : ""} card card-xs h-20 px-4 bg-warning text-error-content cursor-pointer  hover:scale-105 transition`}
                // `card card-xs h-20 px-4 bg-warning text-error-content cursor-pointer  hover:scale-105 transition`}
                onClick={() => setActiveTab("pending")}
              >
                <div className="card-body">
                  <h2 className="card-title text-3xl font-bold">
                    {reservations.filter((r) => r.status === "pending").length}
                  </h2>
                  <p className="text-sm">Pending Reservations</p>
                </div>
              </div>
              <div
                className={`${activeTab == "approved" ? "shadow-lg shadow-green-600" : ""} card card-xs h-20 px-4 bg-success text-success-content cursor-pointer shadow-lg hover:scale-105 transition`}
                onClick={() => setActiveTab("approved")}
              >
                <div className="card-body">
                  <h2 className="card-title text-3xl font-bold">
                    {reservations.filter((r) => r.status === "approved").length}
                  </h2>
                  <p className="text-sm">Approved Reservations</p>
                </div>
              </div>
              <div
                className={`${activeTab == "rejected" ? "shadow-lg shadow-red-600" : ""} card card-xs h-20 px-4 bg-error text-error-content cursor-pointer shadow-lg hover:scale-105 transition`}
                onClick={() => setActiveTab("rejected")}
              >
                <div className="card-body">
                  <h2 className="card-title text-3xl font-bold">
                    {reservations.filter((r) => r.status === "rejected").length}
                  </h2>
                  <p className="text-sm">Rejected Reservations</p>
                </div>
              </div>
              <div
                className={`${activeTab == "total" ? "shadow-lg shadow-blue-600" : ""} card card-xs h-20 px-4 bg-info text-info-content cursor-pointer shadow-lg hover:scale-105 transition`}
                onClick={() => setActiveTab("total")}
              >
                <div className="card-body">
                  <h2 className="card-title text-3xl font-bold">
                    {reservations.length}
                  </h2>
                  <p className="text-sm">Total Reservations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex-1">
          {/* Reservations List */}
          <div className="max-w-7xl mx-auto  ">
            {paginatedData.length > 0 ? (
              <div className="space-y-4 mb-12 ">
                {paginatedData.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="card card-xs bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer self-start"
                  >
                    {" "}
                    <div
                      className="card-body p-4"
                      onClick={() =>
                        setExpandedReservation(
                          expandedReservation === reservation.id
                            ? null
                            : reservation.id,
                        )
                      }
                    >
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div className="flex-1">
                          <h3 className="card-title text-lg mb-2">
                            {reservation.propertyTitle}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            Guest:{" "}
                            <span className="font-semibold">
                              {reservation.guestName}
                            </span>
                          </p>
                          <div className="flex gap-2 items-center flex-wrap text-xs text-gray-600">
                            <span>{reservation.checkInDate}</span>
                            <span>→</span>
                            <span>{reservation.checkOutDate}</span>
                            <span
                              className={
                                getStatusColor(reservation.status) + " text-xs"
                              }
                            >
                              {reservation.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            {reservation.totalPrice}
                          </p>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedReservation === reservation.id && (
                        <div className="divider my-2"></div>
                      )}
                      {expandedReservation === reservation.id && (
                        <div className="mt-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Property Type
                              </label>
                              <p className="text-gray-600">
                                {reservation.propertyType}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Guest Email
                              </label>
                              <p className="text-gray-600">
                                {reservation.guestEmail}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Guest Phone
                              </label>
                              <p className="text-gray-600">
                                {reservation.guestPhone}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Number of Guests
                              </label>
                              <p className="text-gray-600">
                                {reservation.numberOfGuests}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Check-in
                              </label>
                              <p className="text-gray-600">
                                {reservation.checkInDate}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Check-out
                              </label>
                              <p className="text-gray-600">
                                {reservation.checkOutDate}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Total Price
                              </label>
                              <p className="text-gray-600">
                                {reservation.totalPrice}
                              </p>
                            </div>
                            <div>
                              <label className="font-semibold text-sm text-gray-700">
                                Reservation Date
                              </label>
                              <p className="text-gray-600">
                                {reservation.createdAt}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-4 flex-wrap">
                            {reservation.status === "pending" && (
                              <>
                                <button
                                  className="btn btn-success flex-1 min-w-fit"
                                  onClick={() => handleApprove(reservation.id)}
                                >
                                  ✓ Approve
                                </button>
                                <button
                                  className="btn btn-error flex-1 min-w-fit"
                                  onClick={() => handleReject(reservation.id)}
                                >
                                  ✕ Reject
                                </button>
                              </>
                            )}

                            {reservation.status === "approved" && (
                              <>
                                <div className="alert alert-success flex-1">
                                  <span>✓ Approved</span>
                                </div>
                                <button
                                  className="btn btn-error"
                                  onClick={() => handleReject(reservation.id)}
                                >
                                  Change to Rejected
                                </button>
                              </>
                            )}

                            {reservation.status === "rejected" && (
                              <>
                                <div className="alert alert-error flex-1">
                                  <span>✕ Rejected</span>
                                </div>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleApprove(reservation.id)}
                                >
                                  Change to Approved
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
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
                <span>No {activeTab} reservations at the moment.</span>
              </div>
            )}

            {/* Pagination Controls */}
          </div>
        </section>

        {/* Pagination */}
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          data={filteredReservations}
          totalPerPage={reservationsPerPage}
        />

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
}

export default ManagerDashboard;
