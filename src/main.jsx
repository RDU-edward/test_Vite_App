import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import TestStripe from "./pages/TestStripe.jsx";
import { ToastContainer } from "react-toastify";
import HouseForm from "./HouseForm.jsx";
// const stripePromise = loadStripe("pk_test_8d1dup9d4LZOCQ8kuU5HS7Wm00XAXX9zO9"); // Your Stripe public key

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      closeOnClick={false}
      hideProgressBar={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="colored"
    />
    {/* <Elements stripe={stripePromise}> */}
    <App />
    {/* <HouseForm /> */}
    {/* </Elements> */}
  </StrictMode>,
);
