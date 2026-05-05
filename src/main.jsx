import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TestStripe from "./pages/TestStripe.jsx";
import { ToastContainer } from "react-toastify";
import HouseForm from "./HouseForm.jsx";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY); // Your Stripe public key

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
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>,
);

// # .env ihomes

// VITE_API_URL = "http://localhost:3000/api/"
// VITE_GOOGLE_MAPS_SECRET_KEY = "AIzaSyAWCKewC7vdKWUSiZq85---sDBK0LVAWRo"
// VITE_STRIPE_SECRET_KEY = "pk_test_8d1dup9d4LZOCQ8kuU5HS7Wm00XAXX9zO9"
