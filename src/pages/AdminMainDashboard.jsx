import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Pagination from "../component/Pagination";
import Footer from "../component/Footer";
import axios from "axios";

const AdminMainDashboard = () => {
  // const [managers, setManagers] = useState([
  //   {
  //     id: 1,
  //     firstName: "Lavyn",
  //     lastName: "Mary",
  //     email: "mary@mail.com",
  //     contactNumber: "09912732122",
  //     role: "manager",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john@mail.com",
  //     contactNumber: "09912732123",
  //     role: "manager",
  //     status: "Active",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Alice",
  //     lastName: "Smith",
  //     email: "alice@mail.com",
  //     contactNumber: "09912732124",
  //     role: "manager",
  //     status: "Pending",
  //   },
  //   {
  //     id: 4,
  //     firstName: "Bob",
  //     lastName: "Brown",
  //     email: "bob@mail.com",
  //     contactNumber: "09912732125",
  //     role: "Tenant",
  //     status: "Active",
  //   },
  //   {
  //     id: 5,
  //     firstName: "Eve",
  //     lastName: "Davis",
  //     email: "eve@mail.com",
  //     contactNumber: "09912732126",
  //     role: "manager",
  //     status: "Pending",
  //   },
  //   {
  //     id: 6,
  //     firstName: "Charlie",
  //     lastName: "Miller",
  //     email: "charlie@mail.com",
  //     contactNumber: "09912732127",
  //     role: "manager",
  //     status: "Active",
  //   },
  //   {
  //     id: 7,
  //     firstName: "Grace",
  //     lastName: "Wilson",
  //     email: "grace@mail.com",
  //     contactNumber: "09912732128",
  //     role: "manager",
  //     status: "Pending",
  //   },
  //   {
  //     id: 8,
  //     firstName: "Henry",
  //     lastName: "Moore",
  //     email: "henry@mail.com",
  //     contactNumber: "09912732129",
  //     role: "Tenant",
  //     status: "Active",
  //   },
  //   {
  //     id: 9,
  //     firstName: "Ivy",
  //     lastName: "Taylor",
  //     email: "ivy@mail.com",
  //     contactNumber: "09912732130",
  //     role: "Tenant",
  //     status: "Active",
  //   },
  //   {
  //     id: 10,
  //     firstName: "Jack",
  //     lastName: "Anderson",
  //     email: "jack@mail.com",
  //     contactNumber: "09912732131",
  //     role: "manager",
  //     status: "Inactive",
  //   },
  // ]);

  const [managers, setManager] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 5;

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/all-users",
      );
      setManager(response.data); // updates your state with the fetched users
      console.log(response); // logs the full response object
    } catch (error) {
      console.error("Failed to fetch users:", error); // it's important to handle errors
    }
  };

  useEffect(() => {
    getAllUsers(); // fetch users on component mount
  }, []);

  const handleDelete = (id) => {
    setManagers(managers.filter((manager) => manager.id !== id));
  };

  const handleView = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedManager(null), 300);
  };

  // Sorting function
  const sortedManagers = [...managers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue, bValue;
    if (sortConfig.key === "name") {
      aValue = `${a.firstname} ${a.lastmame}`.toLowerCase();
      bValue = `${b.firstname} ${b.lastmame}`.toLowerCase();
    } else if (sortConfig.key === "role") {
      const roleOrder = { manager: 1, tenant: 2 };
      aValue = roleOrder[a.role.toLowerCase()];
      bValue = roleOrder[b.role.toLowerCase()];
    } else if (sortConfig.key === "status") {
      const statusOrder = { Active: 1, Pending: 3, Inactive: 2 };
      aValue = statusOrder[a.status];
      bValue = statusOrder[b.status];
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredManagers = sortedManagers.filter(
    (manager) =>
      `${manager.firstName} ${manager.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const paginatedData = filteredManagers.slice(
    (currentPage - 1) * userPerPage,
    currentPage * userPerPage,
  );

  // Function to update manager status without closing the modal
  const updateManagerStatus = (id, newStatus) => {
    setManagers((prevManagers) =>
      prevManagers.map((manager) =>
        manager.id === id ? { ...manager, status: newStatus } : manager,
      ),
    );
    // No modal close here
  };

  // Function to export current table data
  const exportToExcel = () => {
    // Map filteredManagers to a simple array of objects
    const dataToExport = filteredManagers.map((manager) => ({
      Name: `${manager.firstname} ${manager.lastname}`,
      Email: manager.email,
      Contact: manager.contact_number,
      Role: manager.role,
      Status: manager.status,
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Managers");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save file
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Managers_List.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">List Of Users</h1>

        {/* Search Bar */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={exportToExcel}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Export to Excel
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Name {getSortIndicator("name")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => requestSort("role")}
                >
                  Role {getSortIndicator("role")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  Status {getSortIndicator("status")}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((manager, index) => (
                  <tr key={manager.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manager.firstname} {manager.lastname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manager.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manager.role.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          manager.status === "active"
                            ? "bg-green-100 text-green-800"
                            : manager.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {manager.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                      <button
                        onClick={() => handleView(manager)}
                        className="px-3 py-1 text-white bg-blue-500  rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(manager.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No managers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            data={filteredManagers}
            totalPerPage={userPerPage}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedManager && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center  bg-gray-800/50  transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`bg-white rounded-lg shadow-lg text-red w-96 p-6 relative transform transition-transform duration-300 ${
              isModalOpen ? "scale-100" : "scale-95"
            }`}
          >
            {/* Close button at top-right */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 text-red-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-4">Manager Details</h2>
            <p>
              <strong>Name:</strong> {selectedManager.firstName}{" "}
              {selectedManager.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedManager.email}
            </p>
            <p>
              <strong>Contact:</strong> {selectedManager.contactNumber}
            </p>
            <p>
              <strong>Role:</strong> {selectedManager.role}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedManager.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : selectedManager.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {selectedManager.status}
              </span>
            </p>

            {/* Approve / Reject buttons for pending status */}
            {selectedManager.status === "Pending" && (
              <div className="mt-4 flex  space-x-3">
                <button
                  onClick={() =>
                    updateManagerStatus(selectedManager.id, "Active")
                  }
                  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    updateManagerStatus(selectedManager.id, "Inactive")
                  }
                  className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdminMainDashboard;
