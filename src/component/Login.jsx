import React from "react";

const Login = ({ toggleLoginModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-1/3">
        <div className="flex justify-end">
          <button onClick={toggleLoginModal} className="text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        <div>
          {" "}
          {/* Logo */}
          <div className="text-2xl font-semibold text-gray-900 mb-4 flex justify-center">
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
        <div className="text-md mt-2 text-gray-700 font-semibold mb-4 text-center">
          Login to Your Account
        </div>
        <form className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
