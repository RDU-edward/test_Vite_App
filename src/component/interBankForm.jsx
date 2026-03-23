/****  Code History CRF
 * New = N001
 * Modify = M001
 * -------------------------------------------------------------
 * ID   |      Name         |    Date       |   Remarks
 * -------------------------------------------------------------
 * N001 |     Lavyn         |  3/23/2026    |  Start UI Coding
 ****/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faEnvelope,
  faMobileAlt,
  faPaperclip,
  faTimes,
  faSpinner,
  faPaperPlane,
  faCheckCircle,
  faExclamationCircle,
  faCloudUploadAlt,
  faFileImage,
  faCheck,
  faCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Wealthbank from "../assets/wb_logo.png";

const InterBankForm = () => {
  const [formData, setFormData] = useState({
    application_date: "",
    accnt_userid: "",
    accnt_mobilenum: "",
    accnt_email: "",
    accnt_firstname: "",
    accnt_middlename: "",
    accnt_lastname: "",
    accnt_number: "",
    trns_request: null,
    accnt_signature: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState({
    trns_start_date: "",
    trns_end_date: "",
    specify: "",
  });
  const [modalErrors, setModalErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const requestOptions = [
    "Termination",
    "Reset Password",
    "Re-assuance of Mobile OTP",
    "Change of Transfer Limit",
    "Other",
  ];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      application_date: today,
    }));
  }, [today]);

  const validations = {
    accnt_number: (val) => {
      if (!val) return "";
      if (val.length !== 12) return "Account number must be exactly 12 digits";
      return "";
    },
    accnt_userid: (val) => {
      if (!val) return "";
      if (val.length < 6 || val.length > 10)
        return "User ID must be 6-10 characters";
      if (!/^[a-zA-Z0-9]+$/.test(val))
        return "Only letters and numbers allowed";
      return "";
    },
    accnt_mobilenum: (val) => {
      if (!val) return "";
      if (val.length !== 11) return "Mobile number must be 11 digits";
      if (!/^\d+$/.test(val)) return "Numbers only";
      return "";
    },
    accnt_email: (val) => {
      if (!val) return "";
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(val)) return "Invalid email address";
      return "";
    },
    accnt_signature: (file) => {
      if (!file) return "Signature is required";
      const allowed = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowed.includes(file.type)) return "JPEG, JPG, or PNG only";
      if (file.size > 5 * 1024 * 1024) return "File must be less than 5MB";
      return "";
    },
  };

  // Validate single field
  const validate = (name, value) => {
    const error = validations[name]?.(value) || "";
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processed = value;

    if (name === "accnt_number")
      processed = value.replace(/\D/g, "").slice(0, 12);
    if (name === "accnt_userid")
      processed = value
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 10)
        .toUpperCase();
    if (name === "accnt_mobilenum")
      processed = value.replace(/\D/g, "").slice(0, 11);

    setFormData((prev) => ({ ...prev, [name]: processed }));
    if (validations[name]) validate(name, processed);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const error = validations.accnt_signature(file);

    if (error) {
      setErrors((prev) => ({ ...prev, accnt_signature: error }));
      setFormData((prev) => ({ ...prev, accnt_signature: null }));
      e.target.value = "";
    } else {
      setErrors((prev) => ({ ...prev, accnt_signature: "" }));
      setFormData((prev) => ({ ...prev, accnt_signature: file }));
    }
  };

  const removeSignature = () => {
    setFormData((prev) => ({ ...prev, accnt_signature: null }));
    const input = document.getElementById("signature-input");
    if (input) input.value = "";
    setErrors((prev) => ({
      ...prev,
      accnt_signature: validations.accnt_signature(null),
    }));
  };

  // Handle transaction request selection
  const selectRequest = (type) => {
    if (type === "Change of Transfer Limit") {
      setModalType("limit");
      setShowModal(true);
    } else if (type === "Other") {
      setModalType("other");
      setShowModal(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        trns_request: { type, trns_request: null },
      }));
      setErrors((prev) => ({ ...prev, trns_request: "" }));
    }
  };

  // Submit modal with validation
  const submitModal = () => {
    let isValid = true;
    const newModalErrors = {};

    if (modalType === "limit") {
      const { trns_start_date, trns_end_date } = modalData;

      if (!trns_start_date) {
        newModalErrors.trns_start_date = "Start date is required";
        isValid = false;
      }
      if (!trns_end_date) {
        newModalErrors.trns_end_date = "End date is required";
        isValid = false;
      }
      if (trns_start_date && trns_end_date && trns_start_date > trns_end_date) {
        newModalErrors.trns_dates = "Start date cannot be after end date";
        isValid = false;
      }

      if (isValid) {
        setFormData((prev) => ({
          ...prev,
          trns_request: {
            type: "Change of Transfer Limit",
            trns_request: { trns_start_date, trns_end_date },
          },
        }));
        closeModal();
      } else {
        setModalErrors(newModalErrors);
      }
    }

    if (modalType === "other") {
      if (!modalData.specify?.trim()) {
        newModalErrors.trns_request = "Please specify your request";
        isValid = false;
      }

      if (isValid) {
        setFormData((prev) => ({
          ...prev,
          trns_request: {
            type: "Other",
            trns_request: modalData.specify.trim(),
          },
        }));
        closeModal();
      } else {
        setModalErrors(newModalErrors);
      }
    }
  };

  // Close modal and clear errors
  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setModalData({ trns_start_date: "", trns_end_date: "", specify: "" });
    setModalErrors({});
  };

  // Validate entire form
  const isFormValid = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.trns_request)
      newErrors.trns_request = "Please select a transaction request";

    // Validate transaction request parameters
    if (formData.trns_request?.type === "Change of Transfer Limit") {
      const { trns_start_date, trns_end_date } =
        formData.trns_request.trns_request || {};
      if (!trns_start_date)
        newErrors.trns_start_date = "Start date is required";
      if (!trns_end_date) newErrors.trns_end_date = "End date is required";
      if (trns_start_date && trns_end_date && trns_start_date > trns_end_date) {
        newErrors.trns_dates = "Start date cannot be after end date";
      }
    }

    if (
      formData.trns_request?.type === "Other" &&
      (!formData.trns_request.trns_request ||
        !formData.trns_request.trns_request.trim())
    ) {
      newErrors.trns_request = "Please specify your request";
    }

    // Check other required fields
    if (!formData.accnt_number)
      newErrors.accnt_number = "Account number required";
    if (!formData.accnt_userid) newErrors.accnt_userid = "User ID required";
    if (!formData.accnt_mobilenum)
      newErrors.accnt_mobilenum = "Mobile number required";
    if (!formData.accnt_email) newErrors.accnt_email = "Email required";
    if (!formData.accnt_firstname)
      newErrors.accnt_firstname = "First name required";
    if (!formData.accnt_lastname)
      newErrors.accnt_lastname = "Last name required";
    if (!formData.accnt_signature)
      newErrors.accnt_signature = "Signature required";

    // Validate field formats
    if (formData.accnt_number) {
      const numError = validations.accnt_number(formData.accnt_number);
      if (numError) newErrors.accnt_number = numError;
    }
    if (formData.accnt_userid) {
      const idError = validations.accnt_userid(formData.accnt_userid);
      if (idError) newErrors.accnt_userid = idError;
    }
    if (formData.accnt_mobilenum) {
      const mobError = validations.accnt_mobilenum(formData.accnt_mobilenum);
      if (mobError) newErrors.accnt_mobilenum = mobError;
    }
    if (formData.accnt_email) {
      const emailError = validations.accnt_email(formData.accnt_email);
      if (emailError) newErrors.accnt_email = emailError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = buildFormData();
      const response = await submitForm(formDataToSend);

      if (response.data && response.data.retVal === "1") {
        handleSuccess();
      } else {
        const errorMessage = response.data?.rspmsg || "Submission failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions for form submission
  const buildFormData = () => {
    const formDataToSend = new FormData();
    const fields = getFormFields();

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    if (formData.accnt_signature) {
      formDataToSend.append("accnt_signature", formData.accnt_signature);
    }

    return formDataToSend;
  };

  const getFormFields = () => ({
    application_date: formData.application_date,
    accnt_userid: formData.accnt_userid,
    accnt_mobilenum: formData.accnt_mobilenum,
    accnt_email: formData.accnt_email,
    accnt_firstname: formData.accnt_firstname,
    accnt_middlename: formData.accnt_middlename,
    accnt_lastname: formData.accnt_lastname,
    accnt_number: formData.accnt_number,
    trns_request: getTrnsRequestValue(),
    trns_start_date: getTrnsStartDate(),
    trns_end_date: getTrnsEndDate(),
  });

  //transaction "Others"
  const getTrnsRequestValue = () => {
    const { type, trns_request } = formData.trns_request || {};
    if (type === "Other") {
      return trns_request || "";
    }
    return type || "";
  };

  const getTrnsStartDate = () => {
    const { type, trns_request } = formData.trns_request || {};
    return type === "Change of Transfer Limit"
      ? trns_request?.trns_start_date || ""
      : "";
  };

  const getTrnsEndDate = () => {
    const { type, trns_request } = formData.trns_request || {};
    return type === "Change of Transfer Limit"
      ? trns_request?.trns_end_date || ""
      : "";
  };

  const submitForm = (formDataToSend) => {
    return axios.post(
      "http://10.86.1.46:3000/account-request",
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      },
    );
  };

  const handleSuccess = () => {
    setSubmitSuccess(true);
    resetForm();
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleError = (error) => {
    const errorMessage = getErrorMessage(error);
    setErrors((prev) => ({ ...prev, submit: errorMessage }));
    setTimeout(() => setErrors((prev) => ({ ...prev, submit: "" })), 5000);
  };

  const getErrorMessage = (error) => {
    if (error.response) {
      if (error.response.data && error.response.data.rspmsg) {
        return error.response.data.rspmsg;
      }
      return (
        error.response.data?.message ||
        error.response.statusText ||
        `Server error: ${error.response.status}`
      );
    }
    if (error.request) {
      return "No response from server. Please check your connection.";
    }
    return error.message || "An unexpected error occurred";
  };

  const resetForm = () => {
    setFormData({
      application_date: today,
      accnt_userid: "",
      accnt_mobilenum: "",
      accnt_email: "",
      accnt_firstname: "",
      accnt_middlename: "",
      accnt_lastname: "",
      accnt_number: "",
      trns_request: null,
      accnt_signature: null,
    });

    const fileInput = document.getElementById("signature-input");
    if (fileInput) fileInput.value = "";

    setErrors({});
  };

  // Render helper functions
  const renderSelectedRequest = () => {
    const request = formData.trns_request;
    if (!request) return null;

    return (
      <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-orange-200 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700">
              Selected Request: {request.type}
            </p>
            {request.type === "Change of Transfer Limit" &&
              request.trns_request && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-[#fb6c04]">
                    <span className="font-medium">Start Date:</span>{" "}
                    {new Date(
                      request.trns_request.trns_start_date,
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-[#fb6c04]">
                    <span className="font-medium">End Date:</span>{" "}
                    {new Date(
                      request.trns_request.trns_end_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            {request.type === "Other" && (
              <p className="text-xs text-orange-700 mt-2">
                <span className="font-medium">Details:</span>{" "}
                {request.trns_request}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, trns_request: null }))
            }
            className="text-gray-400 hover:text-red-500 transition-colors"
            type="button"
            aria-label="Remove request"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
      </div>
    );
  };

  const renderAccountNumberProgress = () => {
    const length = formData.accnt_number?.length || 0;
    const percentage = (length / 12) * 100;

    return (
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs text-gray-500">{length}/12 digits</p>
          <p className="text-xs text-gray-400">
            12-digit account number required
          </p>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#fb6c04] transition-all duration-300 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const renderSignaturePreview = () => {
    if (!formData.accnt_signature) return null;

    return (
      <div className="mt-3 p-4 bg-orange-50 rounded-xl border border-orange-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shadow-sm">
              {formData.accnt_signature.type?.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(formData.accnt_signature)}
                  alt="Signature Preview"
                  className="w-full h-full object-cover rounded-xl"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faFileImage}
                  className="text-[#fb6c04] text-2xl"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">
                {formData.accnt_signature.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {(formData.accnt_signature.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeSignature}
            className="w-8 h-8 rounded-full bg-white hover:bg-orange-50 text-gray-400 hover:text-red-600 transition-all duration-200 flex items-center justify-center shadow-sm border border-gray-200 hover:border-orange-200"
            title="Remove signature"
            aria-label="Remove signature"
          >
            <FontAwesomeIcon icon={faTimes} className="text-sm" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/40 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="w-40 sm:w-48 lg:w-56 order-1 sm:order-1 flex justify-center sm:justify-start">
            <a
              href="https://wealthbank.com.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 ease-in-out hover:scale-105 inline-block"
            >
              <img
                src={Wealthbank}
                className="w-40 sm:w-48 lg:w-56 h-8 sm:h-10 lg:h-12 object-contain"
                alt="WealthBank"
              />
            </a>
          </div>

          <div className="order-2 sm:order-2 text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold lg:mt-6 bg-[#0066B3] bg-clip-text text-transparent whitespace-nowrap">
              INTERNETBANKING
            </h1>
            <span className="text-gray-500 text-base sm:text-lg">SERVICE</span>
          </div>

          <div className="hidden sm:block w-40 sm:w-48 lg:w-56 invisible order-3"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-4 lg:pt-8"></div>
      <div className="max-w-4xl mx-auto pt-4 lg:pt-8">
        {submitSuccess && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
            <div className="bg-[#fb6c04] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span className="font-medium">
                The request form has been successfully submitted!{" "}
              </span>
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span className="font-medium">{errors.submit}</span>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="relative bg-gradient-to-r from-[#0066B3] to-[#0088cc] px-6 py-6 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
            <h1 className="text-2xl font-bold text-white mb-2">Request Form</h1>
            <p className="text-blue-100 text-sm">
              Please complete all required fields marked with{" "}
              <span className="text-red-300">*</span>
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Date of Application <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="application_date"
                value={formData.application_date}
                onChange={handleChange}
                max={today}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] focus:border-transparent transition-all bg-gray-50"
                required
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="accnt_number"
                  placeholder="Enter 12-digit account number"
                  value={formData.accnt_number}
                  onChange={handleChange}
                  maxLength={12}
                  className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all font-mono tracking-wider ${
                    errors.accnt_number
                      ? "border-red-300 focus:ring-red-500 bg-red-50/30"
                      : formData.accnt_number?.length === 12
                        ? "border-[#fb6c04] focus:ring-[#fb6c04]"
                        : "border-gray-200 focus:ring-[#0066B3]"
                  }`}
                  required
                />
                {formData.accnt_number?.length === 12 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-[#fb6c04] text-lg"
                    />
                  </div>
                )}
              </div>
              {renderAccountNumberProgress()}
              {errors.accnt_number && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="text-xs"
                  />
                  {errors.accnt_number}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Account Name <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  name="accnt_firstname"
                  placeholder="First Name"
                  value={formData.accnt_firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] transition-all"
                  required
                />
                <input
                  type="text"
                  name="accnt_middlename"
                  placeholder="Middle Name"
                  value={formData.accnt_middlename}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] transition-all"
                />
                <input
                  type="text"
                  name="accnt_lastname"
                  placeholder="Last Name"
                  value={formData.accnt_lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] transition-all"
                  required
                />
              </div>
              {(errors.accnt_firstname || errors.accnt_lastname) && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.accnt_firstname || errors.accnt_lastname}
                </p>
              )}
            </div>

            <div className="border-t-2 border-gray-100 pt-4">
              <label className="block text-sm font-semibold text-gray-600 mb-3">
                Transaction Request <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requestOptions.map((request, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectRequest(request)}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 text-left ${
                      formData.trns_request?.type === request
                        ? "bg-orange-50 border border-[#fb6c04] shadow-md"
                        : "bg-gray-50 border border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                        formData.trns_request?.type === request
                          ? "border-[#fb6c04] bg-[#fb6c04]"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.trns_request?.type === request && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-white text-xs"
                        />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {request}
                    </span>
                  </button>
                ))}
              </div>

              {errors.trns_request && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.trns_request}
                </p>
              )}

              {renderSelectedRequest()}
            </div>

            <div className="border-t-2 border-gray-100 pt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  <FontAwesomeIcon
                    icon={faIdCard}
                    className="mr-2 text-[#0066B3]"
                  />
                  User ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="accnt_userid"
                    placeholder="e.g., SHARON31"
                    value={formData.accnt_userid}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all uppercase ${
                      errors.accnt_userid
                        ? "border-red-300 focus:ring-red-500"
                        : formData.accnt_userid?.length >= 6 &&
                            formData.accnt_userid?.length <= 10
                          ? "border-[#fb6c04] focus:ring-[#fb6c04]"
                          : "border-gray-200 focus:ring-[#0066B3]"
                    }`}
                    required
                  />
                  {formData.accnt_userid?.length >= 6 &&
                    formData.accnt_userid?.length <= 10 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-[#fb6c04]"
                        />
                      </div>
                    )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      formData.accnt_userid?.length >= 6 &&
                      formData.accnt_userid?.length <= 10
                        ? "bg-orange-100 text-[#fb6c04]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        formData.accnt_userid?.length >= 6 &&
                        formData.accnt_userid?.length <= 10
                          ? faCheckCircle
                          : faCircle
                      }
                      className="mr-1 text-xs"
                    />
                    6-10 characters
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      !formData.accnt_userid ||
                      /^[a-zA-Z0-9]+$/.test(formData.accnt_userid)
                        ? "bg-orange-100 text-[#fb6c04]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        !formData.accnt_userid ||
                        /^[a-zA-Z0-9]+$/.test(formData.accnt_userid)
                          ? faCheckCircle
                          : faExclamationCircle
                      }
                      className="mr-1 text-xs"
                    />
                    Letters & numbers only
                  </span>
                </div>
                {errors.accnt_userid && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {errors.accnt_userid}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 text-[#0066B3]"
                  />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="accnt_email"
                  placeholder="name@example.com"
                  value={formData.accnt_email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.accnt_email
                      ? "border-red-300 focus:ring-red-500"
                      : formData.accnt_email &&
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            formData.accnt_email,
                          )
                        ? "border-[#fb6c04] focus:ring-[#fb6c04]"
                        : "border-gray-200 focus:ring-[#0066B3]"
                  }`}
                  required
                />
                {errors.accnt_email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {errors.accnt_email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  <FontAwesomeIcon
                    icon={faMobileAlt}
                    className="mr-2 text-[#0066B3]"
                  />
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="accnt_mobilenum"
                  placeholder="xxxxxxxxxxx"
                  value={formData.accnt_mobilenum}
                  onChange={handleChange}
                  maxLength={11}
                  className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all font-mono ${
                    errors.accnt_mobilenum
                      ? "border-red-300 focus:ring-red-500"
                      : formData.accnt_mobilenum?.length === 11
                        ? "border-[#fb6c04] focus:ring-[#fb6c04]"
                        : "border-gray-200 focus:ring-[#0066B3]"
                  }`}
                  required
                />
                {formData.accnt_mobilenum?.length === 11 && (
                  <p className="text-xs text-[#fb6c04] mt-1 flex items-center gap-1">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Valid mobile number format
                  </p>
                )}
                {errors.accnt_mobilenum && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    {errors.accnt_mobilenum}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t-2 border-gray-100 pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FontAwesomeIcon
                  icon={faPaperclip}
                  className="mr-2 text-[#0066B3]"
                />
                Signature Attachment <span className="text-red-500">*</span>
              </label>

              <div>
                <input
                  id="signature-input"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="signature-input"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-orange-50 transition-all duration-200 border-gray-300 hover:border-[#fb6c04]"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className="text-3xl text-[#fb6c04] mb-2"
                      />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold text-[#fb6c04]">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (MAX. 5MB)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {errors.accnt_signature && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  {errors.accnt_signature}
                </p>
              )}

              {renderSignaturePreview()}
            </div>
          </div>

          <div className="px-6 pb-6 pt-3">
            <div className="w-56 mx-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#0066B3] hover:bg-[#005499] transition-all duration-200 text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold text-[#0066B3]">
                  {modalType === "limit"
                    ? "Change Transfer Limit"
                    : "Additional Details"}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="space-y-4">
                {modalType === "limit" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={modalData.trns_start_date}
                        onChange={(e) => {
                          setModalData({
                            ...modalData,
                            trns_start_date: e.target.value,
                          });
                          setModalErrors((prev) => ({
                            ...prev,
                            trns_start_date: "",
                            trns_dates: "",
                          }));
                        }}
                        min={today}
                        className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] ${
                          modalErrors.trns_start_date
                            ? "border-red-300"
                            : "border-gray-200"
                        }`}
                      />
                      {modalErrors.trns_start_date && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          {modalErrors.trns_start_date}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={modalData.trns_end_date}
                        onChange={(e) => {
                          setModalData({
                            ...modalData,
                            trns_end_date: e.target.value,
                          });
                          setModalErrors((prev) => ({
                            ...prev,
                            trns_end_date: "",
                            trns_dates: "",
                          }));
                        }}
                        min={modalData.trns_start_date || today}
                        className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] ${
                          modalErrors.trns_end_date
                            ? "border-red-300"
                            : "border-gray-200"
                        }`}
                      />
                      {modalErrors.trns_end_date && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          {modalErrors.trns_end_date}
                        </p>
                      )}
                    </div>
                    {modalErrors.trns_dates && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {modalErrors.trns_dates}
                      </p>
                    )}
                  </>
                )}

                {modalType === "other" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please specify your request{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={modalData.specify}
                      onChange={(e) => {
                        setModalData({ ...modalData, specify: e.target.value });
                        setModalErrors((prev) => ({
                          ...prev,
                          trns_request: "",
                        }));
                      }}
                      placeholder="Please specify your request details here..."
                      rows="4"
                      className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066B3] resize-none ${
                        modalErrors.trns_request
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {modalErrors.trns_request && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {modalErrors.trns_request}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitModal}
                  className="flex-1 px-4 py-3 bg-[#0066B3] text-white rounded-xl hover:bg-[#005499] transition-all duration-200 text-sm font-semibold shadow-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterBankForm;
