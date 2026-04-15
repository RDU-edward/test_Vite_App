import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import Footer from "../component/Footer";

function UserDashboard() {
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 4;

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      navigate("/");
    } else {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Load user reservations
  useEffect(() => {
    if (loggedInUser) {
      const allReservations = sampleData.getSampleReservations();
      // For demo purposes, show all sample reservations
      // In a real app, filter by user email: allReservations.filter(res => res.guestEmail === loggedInUser.email)
      setReservations(allReservations);
    }
  }, [loggedInUser]);

  // Filter reservations by status
  const getFilteredReservations = () => {
    return reservations.filter((res) => res.status === activeTab);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // Pagination logic
  const filteredReservations = getFilteredReservations();
  const totalPages = Math.ceil(
    filteredReservations.length / reservationsPerPage,
  );
  const startIndex = (currentPage - 1) * reservationsPerPage;
  const endIndex = startIndex + reservationsPerPage;
  const currentReservations = filteredReservations.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleExpand = (id) => {
    setExpandedReservation(expandedReservation === id ? null : id);
  };

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                User Dashboard
              </h1>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {loggedInUser.firstName[0]}
                  {loggedInUser.lastName[0]}
                </div>
              </button>
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">
                        {loggedInUser.firstName} {loggedInUser.lastName}
                      </div>
                      <div className="text-gray-500">{loggedInUser.email}</div>
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

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["pending", "approved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Reservations
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-600">
                    {reservations.filter((res) => res.status === tab).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Reservations List */}
          <div className="mt-8">
            {currentReservations.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No {activeTab} reservations
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any {activeTab} reservations at the moment.
                </p>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {currentReservations.map((reservation) => (
                    <li key={reservation.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div
                                className={`h-3 w-3 rounded-full ${
                                  reservation.status === "approved"
                                    ? "bg-green-400"
                                    : reservation.status === "pending"
                                      ? "bg-yellow-400"
                                      : "bg-red-400"
                                }`}
                              ></div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {reservation.propertyTitle}
                              </div>
                              <div className="text-sm text-gray-500">
                                {reservation.checkInDate} -{" "}
                                {reservation.checkOutDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900 mr-4">
                              {reservation.totalPrice}
                            </div>
                            <button
                              onClick={() => toggleExpand(reservation.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              {expandedReservation === reservation.id
                                ? "Hide Details"
                                : "View Details"}
                            </button>
                          </div>
                        </div>
                        {expandedReservation === reservation.id && (
                          <div className="mt-4 border-t border-gray-200 pt-4">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Property Type
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {reservation.propertyType}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Number of Guests
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {reservation.numberOfGuests}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Check-in Date
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {reservation.checkInDate}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Check-out Date
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {reservation.checkOutDate}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Total Price
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {reservation.totalPrice}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">
                                  Status
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 capitalize">
                                  {reservation.status}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserDashboard;
