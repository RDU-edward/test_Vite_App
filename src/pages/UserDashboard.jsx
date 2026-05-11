import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Pagination from "../component/Pagination";
import axios from "axios";
import toCurrency from "../utils/toCurrency";

function UserDashboard() {
  const [reservations, setReservations] = useState([]);
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 4;

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")); // // Load user reservations

  const getReservations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}reservation/${loggedUser.id}`,
      );
      setReservations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // Pagination logic
  // const filteredReservations = getFilteredReservations();
  const paginatedData = reservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage,
  );

  const toggleExpand = (id) => {
    setExpandedReservation(expandedReservation === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 p-6">
          <div className="px-4 py-6 sm:px-0 ">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
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
                    No reservations
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You don't have any reservations at the moment.
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
                                  {reservation.property_title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {reservation.address}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-900 mr-4">
                                {toCurrency(reservation.monthly_price)}
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
                                    {reservation.property_type}
                                  </dd>
                                </div>
                                <div>
                                  <dt className="text-sm font-medium text-gray-500">
                                    Number of Guests
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900">
                                    {reservation.total_occupants}
                                  </dd>
                                </div>
                                <div>
                                  <dt className="text-sm font-medium text-gray-500">
                                    Check-in Date
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900">
                                    {reservation.movein_date}
                                  </dd>
                                </div>
                                <div>
                                  <dt className="text-sm font-medium text-gray-500">
                                    Payment Status
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900">
                                    {reservation.payment_status}
                                  </dd>
                                </div>
                                <div>
                                  <dt className="text-sm font-medium text-gray-500">
                                    Amount Paid
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900">
                                    {toCurrency(reservation.amount_paid)}
                                  </dd>
                                </div>
                                <div>
                                  <dt className="text-sm font-medium text-gray-500">
                                    Status
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 capitalize">
                                    {reservation.availability}
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
      </main>
      {/* Pagination */}
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        data={reservations}
        totalPerPage={reservationsPerPage}
      />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default UserDashboard;
