import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Signup = ({ toggleSignUpModal }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    contactNumber: "",
    address: "",
    file: null,
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.role ||
      !formData.password ||
      !formData.contactNumber ||
      !formData.address
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some(
      (user) => user.email === formData.email,
    );
    if (emailExists) {
      alert("An account with this email already exists.");
      return;
    }

    // Prepare user data (exclude file for now, as localStorage can't store files directly)
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      password: formData.password, // Note: In a real app, hash the password
      contactNumber: formData.contactNumber,
      address: formData.address,
      fileName: formData.file ? formData.file.name : null,
      status: formData.role === "manager" ? "Pending" : "Active",
    };

    // Save to localStorage
    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Signup successful!");
    toggleSignUpModal(); // Close the modal
  };

  // console.log(formData.role);

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-1/2">
        <div className="flex justify-end">
          <button
            onClick={toggleSignUpModal}
            className="text-gray-700 text-2xl"
          >
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
        <h2 className="text-md text-gray-700 font-semibold mb-4 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="text-gray-800">
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your contact number"
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Attach File
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your address"
              rows="3"
            />
          </div>
          <div className="flex space-x-2 mb-2">
            <label
              className="relative flex items-center text-sm w-28 text-gray-700 border justify-center rounded-md cursor-pointer hover:bg-blue-200 transition-all p-2"
              htmlFor="role-manager"
            >
              <input
                type="checkbox"
                id="role-manager"
                name="role"
                className="hidden"
                value="manager"
                onChange={handleInputChange}
                checked={formData.role === "manager"}
              />
              <span className="font-semibold">Manager</span>
              {formData.role === "manager" && (
                <FaCheckCircle className="text-green-700 absolute top-1 right-1" />
              )}
            </label>

            <label
              className="relative flex items-center text-sm w-28 text-gray-700 border justify-center rounded-md cursor-pointer hover:bg-blue-200 transition-all p-2"
              htmlFor="role-tenant"
            >
              <input
                type="checkbox"
                id="role-tenant"
                name="role"
                className="hidden"
                value="tenant"
                onChange={handleInputChange}
                checked={formData.role === "tenant"}
              />
              <span>Tenant</span>
              {formData.role === "tenant" && (
                <FaCheckCircle className="text-green-700 absolute top-1 right-1" />
              )}
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 p-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
