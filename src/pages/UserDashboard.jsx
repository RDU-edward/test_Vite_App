import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Pagination from "../component/Pagination";

function UserDashboard() {
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 1;

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
  const paginatedData = filteredReservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage,
  );
  const toggleExpand = (id) => {
    setExpandedReservation(expandedReservation === id ? null : id);
  };

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 p-6">
          <div className="px-4 py-6 sm:px-0 ">
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
              {paginatedData.length === 0 ? (
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
                    {paginatedData.map((reservation) => (
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
                                className="btn btn-active btn-primary"
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

export default UserDashboard;
