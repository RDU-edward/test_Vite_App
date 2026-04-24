import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_8d1dup9d4LZOCQ8kuU5HS7Wm00XAXX9zO9"); // Your Stripe public key

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Elements stripe={stripePromise}>
      <TestStripe />
    </Elements> */}
    <App />
  </StrictMode>,
);
