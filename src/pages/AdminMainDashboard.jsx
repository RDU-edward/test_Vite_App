import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Pagination from "../component/Pagination";
import Footer from "../component/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const AdminMainDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 5;

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/all-users`,
      );
      setUsers(response.data); // updates your state with the fetched users
      console.log(response); // logs the full response object
    } catch (error) {
      console.error("Failed to fetch users:", error); // it's important to handle errors
    }
  };

  useEffect(() => {
    getAllUsers(); // fetch users on component mount
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  //Approved User

  // Sorting function
  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue, bValue;
    if (sortConfig.key === "name") {
      aValue = `${a.firstname} ${a.lastmame}`.toLowerCase();
      bValue = `${b.firstname} ${b.lastmame}`.toLowerCase();
    } else if (sortConfig.key === "role") {
      const roleOrder = { manager: 1, tenant: 2, admin: 3 };
      aValue = roleOrder[a.role.toLowerCase()];
      bValue = roleOrder[b.role.toLowerCase()];
    } else if (sortConfig.key === "status") {
      const statusOrder = { active: 1, pending: 2, rejected: 3 };
      aValue = statusOrder[a.status];
      bValue = statusOrder[b.status];
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log(filteredUsers);

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

  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * userPerPage,
    currentPage * userPerPage,
  );

  // Function to update manager status without closing the modal
  const updateUserStatus = async (id, newStatus) => {
    console.log(newStatus);

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}user/update/${id}`,
        { status: newStatus },
      );

      if (response.data.success === true) {
        setTimeout(() => {
          setLoading(false);
          toast.success(response.data.message);
          setIsModalOpen(false);
          //call getAllUser function to refresh the table
          getAllUsers();
        }, 3000);
      } else {
        setTimeout(() => {
          setLoading(false);
          toast.error(response.data.message);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // setUsers((prevUsers) =>
    //   prevUsers.map((user) =>
    //     user.id === id ? { ...user, status: newStatus } : user,
    //   ),
    // );
    // No modal close here
  };

  // Function to export current table data
  const exportToExcel = () => {
    // Map filteredManagers to a simple array of objects
    const dataToExport = filteredUsers.map((user) => ({
      Name: `${user.firstname} ${user.lastname}`,
      Email: user.email,
      Contact: user.contact_number,
      Role: user.role,
      Status: user.status,
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save file
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Users_List.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Loaders */}
      {loading && (
        <div className="z-70 bg-gray-800/50  absolute inset-0 flex justify-center items-center">
          <Loader />
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col ">
        <div className="px-8">
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
              className="px-4 py-2 text-white bg-blue-600  hover:bg-blue-700"
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
              <tbody className="bg-white divide-y text-sm divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((manager, index) => (
                    <tr key={manager.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
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
                      <td className=" whitespace-nowrap text-center space-x-4">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => handleView(manager)}
                            className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 "
                          >
                            View
                          </button>
                          {/* <button
                            onClick={() => handleDelete(manager.id)}
                            className="px-3 py-1 text-white bg-red-500  hover:bg-red-600"
                          >
                            Delete
                          </button> */}
                        </div>
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
          </div>
        </div>

        {/* Modal */}
        {selectedUser && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 transition-opacity duration-300 ${
              isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`bg-white rounded-lg shadow-2xl text-gray-800 w-96 p-6 relative transform transition-transform duration-300 ${
                isModalOpen ? "scale-100" : "scale-95"
              }`}
            >
              {/* Close button at top-right */}
              <div className="absolute right-2 top-2 flex justify-end">
                <div
                  onClick={closeModal}
                  className="text-red-500 text-xl cursor-pointer hover:scale-150"
                >
                  &times;
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                User Details
              </h2>

              <div className="space-y-4">
                <div className="text-sm">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    value={`${selectedUser.firstname} ${selectedUser.lastname}`}
                    readOnly
                    className="w-full  px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div className="text-sm">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    readOnly
                    className="w-full  px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div className="text-sm">
                  <label htmlFor="">Contact Number</label>
                  <input
                    type="text"
                    value={selectedUser.contact_number}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div className="text-sm">
                  <label htmlFor="">Role</label>
                  <input
                    type="text"
                    value={selectedUser.role}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div className="text-sm">
                  <label htmlFor="">Status</label>
                  <input
                    type="text"
                    value={selectedUser.status.toUpperCase()}
                    readOnly
                    className={`w-full px-3 py-2 text-xs font-semibold rounded-md ${
                      selectedUser.status === "active"
                        ? "bg-green-100 text-green-800"
                        : selectedUser.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  />
                </div>
              </div>
              {/* Approve / Reject buttons for pending status */}
              {selectedUser.status === "pending" && (
                <div className="mt-6 flex justify-between gap-1">
                  <button
                    onClick={() => updateUserStatus(selectedUser.id, "active")}
                    className="w-full py-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      updateUserStatus(selectedUser.id, "rejected")
                    }
                    className="w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        data={filteredUsers}
        totalPerPage={userPerPage}
      />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdminMainDashboard;
