import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaWifi,
  FaCar,
  FaSwimmingPool,
  FaBath,
  FaTv,
  FaSnowflake,
  FaMobile,
  FaEnvelope,
  FaDotCircle,
  FaBed,
  FaToilet,
  FaChartArea,
  FaVectorSquare,
} from "react-icons/fa";
import { FaImages, FaLocationPin } from "react-icons/fa6";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toCurrency from "../utils/toCurrency";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import GoogleMaps from "../component/GoogleMaps";
import GetPropertyMapLocation from "../component/GetPropertyMapLocation";
import amenities from "../data/amenities";
import default_avatar from "../assets/ihomesLogo.png";
import Login from "../component/Login";
import ShowAllPhotos from "../component/ShowAllPhotos";

const ViewHouseDetails = () => {
  const { id } = useParams();
  // const stripe = useStripe();
  // const elements = useElements();

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [propertyFiles, setPropertyFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const toggleLoginModal = () => setOpenLoginModal(!openLoginModal);

  const [clientData, setclientData] = useState({
    property_id: id,
    manager_id: "",
    manager_email: "",
    tenant_id: loggedUser?.id,
    fullname: loggedUser?.firstname + " " + loggedUser?.lastname,
    contact_number: loggedUser?.contact_number,
    email: loggedUser?.email,
    movein_date: "",
    total_occupants: "",
    amount_paid: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}property/${id}`,
      );
      setDetails(res.data[0]);
      setPropertyFiles(JSON.parse(res.data[0].files));
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setclientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const monthlyPrice = details?.monthly_price; // e.g., $500
  const reservationAmount = monthlyPrice * 0.7; // 70% of the monthly price

  const insertReservation = async (e) => {
    e.preventDefault();
    console.log(clientData);

    await axios.post(
      `${import.meta.env.VITE_API_URL}reservation/create_reservation`,
      {
        ...clientData,
        amount_paid: reservationAmount,
        manager_id: details?.manager_id,
        manager_email: details?.owner_email,
      },
    );
  };

  const payInStripe = async (e) => {
    e.preventDefault();

    if (!loggedUser) {
      setOpenLoginModal(true);
    }

    setLoading(true);
    const { data } = await axios.post(
      "http://localhost:3000/create-payment-intent",
      { amount: reservationAmount * 100 }, // Stripe expects amount in cents
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      await insertReservation();

      setTimeout(() => {
        toast.success("Payment successful!");
        navigate("/user/dashboard");
      }, 3000);
    }
  };

  const selectedAmenities =
    details?.amenities.split(",").map((a) => a.trim()) || [];

  console.log(selectedAmenities); // ["Pool", "Wifi", "Parking"

  const filteredAmenities = amenities.filter((amenity) =>
    selectedAmenities.includes(amenity.name),
  );

  useEffect(() => {
    if (showAllPhotos) {
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
  }, [showAllPhotos]);

  console.log(details);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* TITLE */}
        <div className="text-xl font-semibold text-gray-700 mb-4">
          {details?.property_title}
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <img
            src={`http://localhost:3000/${propertyFiles[0]}`}
            className="w-full h-[420px] object-cover rounded-xl"
          />

          <div className="relative grid grid-cols-2 gap-3">
            <div
              className="absolute flex gap-2 right-20 bottom-5 py-2 px-2 bg-slate-50/90 text-xs cursor-pointer hover:bg-slate-50 hover:scale-110 "
              onClick={() => setShowAllPhotos(true)}
            >
              <FaImages className="text-xl" /> Show All Photos
            </div>
            {/* {propertyFiles.map((img, i) => ( */}
            {propertyFiles.slice(1, 5).map((img, i) => (
              <img
                key={i}
                src={`http://localhost:3000/${img}`}
                className="h-48 w-full object-cover rounded-2xl"
              />
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">
            {/* DESCRIPTION */}
            <div>
              <h2 className="text-lg text-gray-700 font-semibold mb-2">
                {details?.description}
              </h2>
              <div className="text-gray-500 grid grid-cols-2 text-sm">
                <span className="flex items-center space-x-2">
                  <FaBed />
                  <span>{details?.bedrooms} bedrooms</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FaToilet />
                  <span>{details?.bathrooms} bathrooms</span>
                </span>

                <span className="flex items-center space-x-2">
                  <FaChartArea />
                  <span>Floor Area: {details?.floor_area} sqm</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FaVectorSquare />
                  <span>Lot Size: {details?.lot_size} sqm</span>
                </span>
              </div>
            </div>

            {/* PERKS */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Features & Amenities
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border border-gray-500 rounded-2xl  p-6 mb-6">
                {filteredAmenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-indigo-500 text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* OWNER */}
            <div className="">
              <h3 className="font-semibold mb-4 text-center">Hosted by</h3>

              <div className="flex items-center justify-center gap-8">
                <img
                  src={details?.owner_photo || default_avatar}
                  alt={`${details?.owner_firstname} ${details?.owner_lastname}`}
                  className="h-20 w-20 rounded-full shadow-lg object-cover"
                />

                <div>
                  <div className="font-medium flex items-center gap-2">
                    {details?.owner_firstname} {details?.owner_lastname}
                    {details?.is_verified && (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 grid grid-cols-2 mt-2">
                    <div className="flex items-center gap-2">
                      <FaMobile />
                      <a
                        href={`tel:${details?.owner_mobile}`}
                        className="hover:underline"
                      >
                        {details?.owner_mobile}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope />
                      <a
                        href={`mailto:${details?.owner_email}`}
                        className="hover:underline"
                      >
                        {details?.owner_email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLocationPin />
                      <span>{details?.owner_address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider "></div>
          </div>

          {/* RIGHT SIDE (BOOKING CARD) */}
          <div>
            <form
              onSubmit={insertReservation}
              // onSubmit={payInStripe}
              className="bg-white p-6 rounded-xl text-gray-700 shadow-lg border border-gray-500 flex flex-col gap-8"
            >
              <div className="text-2xl  font-semibold">
                {toCurrency(details?.monthly_price)}
                <span className="text-sm text-gray-500"> / month</span>
                <div className="text-xs">
                  For reservation pay{" "}
                  <span className="font-bold text-red-500">70%</span> of the
                  monthly price
                </div>
              </div>
              <div>
                <label className="font-medium text-sm">
                  Select Move-in Date
                </label>
                <input
                  type="date"
                  name="movein_date"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-sm">
                  Number of Occupants
                </label>
                <input
                  type="number"
                  name="total_occupants"
                  placeholder="Number of occupants"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div className="p-3 border rounded-lg">
                {/* <CardElement /> */}
              </div>

              <button
                // disabled={!stripe}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
              >
                Reserve Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="px-12 mb-4">
        {/* Google Maps */}
        <div className="text-xl font-bold text-gray-500">
          You will enjoy living here!
        </div>
        <div className="mt-4 mb-2 italic font-medium text-gray-700 text-">
          {details?.address}
        </div>
        <GetPropertyMapLocation
          addressLat={details?.address_lat}
          addressLng={details?.address_long}
        />
      </div>

      <Footer />

      {/* Login Modal */}
      {openLoginModal && <Login toggleLoginModal={toggleLoginModal} />}

      {/* Show All Photo Modal */}

      {showAllPhotos && (
        <ShowAllPhotos
          images={details?.files}
          setShowAllPhotos={setShowAllPhotos}
        />
      )}
    </div>
  );
};

export default ViewHouseDetails;
