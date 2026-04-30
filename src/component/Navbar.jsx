import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSignUpModal = () => setIsSignUpModalOpen(!isSignUpModalOpen);
  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setShowDropdown(false);
    navigate("/"); // redirect to home or login
  };

  const goToDashboard = () => {
    if (loggedInUser?.role === "admin") {
      navigate("/admin/dashboard_main");
    } else if (loggedInUser?.role === "manager") {
      navigate("/manager/dashboard");
    } else if (loggedInUser?.role === "tenant") {
      navigate("/user/dashboard");
    }
  };

  useEffect(() => {
    if (isLoginModalOpen || isSignUpModalOpen) {
      // If any modal is open, hide overflow
      document.body.style.overflow = "hidden";
    } else {
      // If no modal is open, allow scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginModalOpen, isSignUpModalOpen]);

  return (
    <nav className="relative bg-white shadow-md z-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold text-gray-900 flex">
          <a href="/" className="hover:text-blue-500 flex items-center">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                s
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

        {/* Search Bar for Desktop */}
        {/* <div className="hidden md:flex w-1/3 items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search for houses, condos, etc."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
        </div> */}

        {/* Desktop Navigation or User */}
        {loggedInUser ? (
          <div className="flex items-center text-gray-700 gap-2">
            {/* Message Icon */}
            <div className="relative">
              <MdOutlineDashboard className="text-xl" onClick={goToDashboard} />
            </div>{" "}
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
            <div>Hello, {loggedInUser.firstname}</div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full border flex items-center justify-center  font-medium">
                  {loggedInUser.firstname[0]}
                  {loggedInUser.lastname[0]}
                </div>
              </button>
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">
                        {loggedInUser.firstname}
                      </div>
                      <div className="text-gray-500">{loggedInUser.email}</div>
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
        ) : (
          <div className="hidden md:flex items-center gap-4 ">
            <button
              onClick={toggleSignUpModal}
              className="text-gray-700 hover:font-medium"
            >
              Sign Up
            </button>
            <button
              onClick={toggleLoginModal}
              className="text-gray-700  border  border-gray-700 px-3 py-1 rounded hover:bg-gray-700 hover:text-white  transition duration-300"
            >
              Log In
            </button>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        {!loggedInUser && (
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-0 left-0 right-0 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="text-red-500 cursor-pointer hover:scale-150"
            >
              &times;
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            {!loggedInUser && (
              <>
                <button
                  onClick={() => {
                    toggleSignUpModal();
                    toggleMenu();
                  }}
                  className="text-gray-700 p-1  w-18 hover:font-medium transition duration-300 "
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    toggleLoginModal();
                    toggleMenu();
                  }}
                  className="text-gray-700 p-1  border rounded w-18 hover:bg-gray-700 hover:text-white  transition duration-300 "
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignUpModalOpen && <Signup toggleSignUpModal={toggleSignUpModal} />}

      {/* Log In Modal */}
      {isLoginModalOpen && <Login toggleLoginModal={toggleLoginModal} />}
    </nav>
  );
};

export default Navbar;
