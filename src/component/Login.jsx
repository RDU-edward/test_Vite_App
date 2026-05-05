import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleData from "../data/sampleData";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const Login = ({ toggleLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setIsLoading(true); // Start loading

    // Validate inputs
    // if (!email || !password) {
    //   setError("Please enter both email and password");
    //   setIsLoading(false); // Stop loading on error
    //   return;
    // }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/login`,
        {
          email,
          password,
        },
      );

      console.log(response.data);

      if (response.data.success === false) {
        setTimeout(() => {
          toast.error(response.data.message);
          setIsLoading(false);
        }, 3000);
      }
      const admin = response.data.user.role === "admin";
      const manager = response.data.user.role === "manager";
      const tenant = response.data.user.role === "tenant";

      if (admin) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user),
        );

        setTimeout(() => {
          setIsLoading(false); // Stop loading
          // Close modal and navigate to admin dashboard
          toggleLoginModal();
          navigate("/admin/dashboard_main");
          return;
        }, 3000);
      }

      if (manager) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user),
        );
        setTimeout(() => {
          setIsLoading(false); // Stop loading

          // Close modal and navigate to admin dashboard
          toggleLoginModal();
          navigate("/");
          return;
        }, 3000);
      }
      if (tenant) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user),
        );

        setTimeout(() => {
          setIsLoading(false); // Stop loading

          // Close modal and navigate to admin dashboard
          toggleLoginModal();
          navigate("/");
          return;
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50 px-4">
      {isLoading && (
        <div className="z-70 bg-gray-800/50  absolute inset-0 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl lg:w-1/3 w-full">
        <div className="flex justify-end">
          <button
            onClick={toggleLoginModal}
            className="text-red-500 cursor-pointer hover:scale-150"
          >
            &times;
          </button>
        </div>
        <div>
          {" "}
          {/* Logo */}
          <div className="text-2xl font-semibold text-gray-900  flex justify-center">
            <a href="/" className="hover:text-blue-500 flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
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
        </div>
        {/* <div className="text-md mt-2 text-gray-700 font-semibold mb-4 text-center">
          Admin Login
        </div> */}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
            {error}
          </div>
        )}

        {/* Sample Credentials Info
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded border border-blue-200 text-sm">
          <p className="font-semibold mb-2">Demo Admin Credentials:</p>
          <p>
            📧 Email: <strong>admin@ihomes.com</strong>
          </p>
          <p>
            🔑 Password: <strong>admin123</strong>
          </p>
        </div> */}

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded text-gray-700"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-gray-700"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
