import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const Navbar = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

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

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
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

        {/* Search Bar for Desktop */}
        <div className="hidden md:flex w-1/3 items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search for houses, condos, etc."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Desktop Navigation or User */}
        {loggedInUser ? (
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
                <div className="py-1 px-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">
                      {loggedInUser.firstName} {loggedInUser.lastName}
                    </div>
                    <div className="text-gray-500">{loggedInUser.email}</div>
                  </div>
                  <button
                    onClick={() => navigate("/user/dashboard")}
                    className="block px-4 py-2 text-sm bg-blue-600 rounded-md mt-2 text-white hover:bg-blue-700 w-full text-left"
                  >
                    View Dashboard
                  </button>
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
        ) : (
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleSignUpModal}
              className="text-gray-700 hover:text-blue-500"
            >
              Sign Up
            </button>
            <button
              onClick={toggleLoginModal}
              className="text-gray-700 border border-gray-700 px-3 py-1 rounded hover:bg-gray-700 hover:text-white transition duration-300"
            >
              Log In
            </button>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
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
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-0 left-0 right-0 px-6 py-4">
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="text-gray-700 text-2xl">
              &times;
            </button>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            {!loggedInUser && (
              <>
                <button
                  onClick={() => {
                    toggleSignUpModal();
                    toggleMenu();
                  }}
                  className="text-gray-700 py-2 text-left"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    toggleLoginModal();
                    toggleMenu();
                  }}
                  className="text-gray-700 py-2 text-left"
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
