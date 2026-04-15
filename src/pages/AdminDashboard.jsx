import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import Footer from "../component/Footer";

function AdminDashboard() {
  const [reservations, setReservations] = useState(
    sampleData.getSampleReservations(),
  );
  const [activeTab, setActiveTab] = useState("pending");
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 4;

  // Check if admin is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (!storedUser) {
      navigate("/");
    } else {
      setAdminUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Filter reservations by status
  const getFilteredReservations = () => {
    return reservations.filter((res) => res.status === activeTab);
  };

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
      localStorage.removeItem("adminUser");
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

  //pagination

  // Get the sample condos
  // Calculate the index range for current page
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;

  // Get the houses for the current page
  const currentReservations = filteredReservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation,
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(
    filteredReservations.length / reservationsPerPage,
  );

  if (!adminUser) {
    return null;
  }

  console.log(adminUser);

  return (
    <div className="min-h-screen bg-gray-50  ">
      {/* Header */}
      <header className="bg-white shadow-sm border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {adminUser.name[0]}
                  {adminUser.email[0]}
                </div>
              </button>
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{adminUser.name}</div>
                      <div className="text-gray-500">{adminUser.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="card card-xs h-20 px-4 bg-warning text-warning-content cursor-pointer shadow-lg hover:scale-105 transition"
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
            className="card card-xs h-20 px-4 bg-success text-success-content cursor-pointer shadow-lg hover:scale-105 transition"
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
            className="card card-xs h-20 px-4 bg-error text-error-content cursor-pointer shadow-lg hover:scale-105 transition"
            onClick={() => setActiveTab("rejected")}
          >
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold">
                {reservations.filter((r) => r.status === "rejected").length}
              </h2>
              <p className="text-sm">Rejected Reservations</p>
            </div>
          </div>
          <div className="card card-xs h-20 px-4 bg-info text-info-content cursor-pointer shadow-lg hover:scale-105 transition">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold">
                {reservations.length}
              </h2>
              <p className="text-sm">Total Reservations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="max-w-7xl mx-auto ">
        {currentReservations.length > 0 ? (
          <div className="space-y-4 mb-12 ">
            {currentReservations.map((reservation) => (
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
        <div className="flex justify-center mt-8 mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Number Display */}
          <span className="mx-4 text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
