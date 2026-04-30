import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const Signup = ({ toggleSignUpModal }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    contact_number: "",
    address: "",
    files: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes
  const handleFileChange1 = (e) => {
    setFormData({ ...formData, files: [...e.target.files] }); // Update the files state with the selected files
  };

  const [loading, setLoading] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (
  //     !formData.firstname ||
  //     !formData.lastname ||
  //     !formData.email ||
  //     !formData.role ||
  //     !formData.password ||
  //     !formData.contact_number ||
  //     !formData.address
  //   ) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   // Check if email already exists
  //   const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  //   const emailExists = existingUsers.some(
  //     (user) => user.email === formData.email,
  //   );
  //   if (emailExists) {
  //     alert("An account with this email already exists.");
  //     return;
  //   }

  //   // Prepare user data (exclude file for now, as localStorage can't store files directly)
  //   const userData = {
  //     firstname: formData.firstname,
  //     lastname: formData.lastname,
  //     email: formData.email,
  //     role: formData.role,
  //     password: formData.password, // Note: In a real app, hash the password
  //     contact_number: formData.contact_number,
  //     address: formData.address,
  //     fileName: formData.file ? formData.file.name : null,
  //     status: formData.role === "manager" ? "Pending" : "Active",
  //   };

  //   // Save to localStorage
  //   existingUsers.push(userData);
  //   localStorage.setItem("users", JSON.stringify(existingUsers));

  //   alert("Signup successful!");
  //   toggleSignUpModal(); // Close the modal
  // };

  // console.log(formData.role);

  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "files") {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append each file to the FormData
    formData.files.forEach((file) => {
      formDataToSend.append("files", file); // 'files' is the name used for the input field
    });

    try {
      const response = await fetch("http://localhost:3000/api/user/create", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.success === true) {
        setTimeout(() => {
          toast.success(result.message);
          toggleSignUpModal();
        }, 3000);
      } else {
        setTimeout(() => {
          toast.error("Error Occurred");
          setLoading(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error uploading files:", err);
      setLoading(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex justify-center items-center p-4 z-50 ">
      {/* Loaders */}
      {loading && (
        <div className="z-70 bg-gray-800/50  absolute inset-0 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl w-full  md:w-1/2 overflow-auto h-full">
        <div className="flex justify-end">
          <button
            onClick={toggleSignUpModal}
            className="text-red-500 cursor-pointer hover:scale-150"
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

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="text-gray-800 h-auto"
        >
          <div className="md:flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
          <div className="md:flex gap-4">
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
                required
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
                required
              />
            </div>
          </div>
          <div className="md:flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your contact number"
                required
              />
            </div>
            {/* <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Attach ID
              </label>
              <input
                type="file"
                name="files"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div> */}
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 ">
                Attachment
              </label>

              <div className="flex items-center  border border-gray-300  rounded gap-4">
                {/* Hidden file input */}
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Styled button */}
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-gray-500 text-white  cursor-pointer hover:bg--700 transition"
                >
                  Choose File
                </label>

                {/* Display file name */}
                <span className="text-gray-700">{fileName}</span>
              </div>
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
          <div className="flex space-x-6 mb-4">
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
          <div className="mt-12">
            <button
              type="submit"
              className="w-full  bg-gray-700 text-white p-4 rounded hover:bg-gray-800"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
