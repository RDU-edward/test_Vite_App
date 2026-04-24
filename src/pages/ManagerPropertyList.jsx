import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaMessage, FaRegBell } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import Footer from "../component/Footer";
import TestProperty from "./TestProperty";
import TestDashboard from "./TestDashboard";
import { IoIosLogOut } from "react-icons/io";
function ManagerPropertyList() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [showForm, setShowForm] = useState(false);

  // Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedInUser");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <div className="relative">
                <MdOutlineDashboard
                  className="text-xl"
                  onClick={() => navigate("/manager/dashboard")}
                />
              </div>{" "}
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
                          {loggedUser.firstName}
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
      <main className="flex-1 flex flex-col">
        <section>
          {showForm === true ? (
            <TestProperty
              properties={properties}
              setProperties={setProperties}
              setShowForm={setShowForm}
            />
          ) : (
            <TestDashboard
              properties={properties}
              setProperties={setProperties}
              setShowForm={setShowForm}
            />
          )}
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
export default ManagerPropertyList;
