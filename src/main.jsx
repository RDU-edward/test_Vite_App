import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import TestStripe from "./pages/TestStripe.jsx";
import { ToastContainer } from "react-toastify";
import HouseForm from "./HouseForm.jsx";
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY); // Your Stripe public key

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
    {/* </Elements> */}
  </StrictMode>,
);

// # .env ihomes

// VITE_API_URL = "http://localhost:3000/api/"
// VITE_GOOGLE_MAPS_SECRET_KEY = "AIzaSyAWCKewC7vdKWUSiZq85---sDBK0LVAWRo"
// VITE_STRIPE_SECRET_KEY = "pk_test_8d1dup9d4LZOCQ8kuU5HS7Wm00XAXX9zO9"

// # DB_HOST=loacalhost
// # DB_USER=root
// # DB_PASS=root
// # DB_NAME=test

// # Node Mailer Credentials
// # EMAIL_USER = "edwardcatapan@gmail.com"
// # EMAIL_PASS = "scah xnqy fhcc retl",
// STRIPE_SECRET_KEY = sk_test_eqXnJVeXFUmkfE7b3FZkogGo00bG3wOC02;

// // utils/mailer.js
// require("dotenv").config();
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// async function sendEmail({ to, subject, text, html }) {
//   try {
//     const info = await transporter.sendMail({
//       from: "<noreply@gmail.com>",
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Email sent:", info.messageId);
//   } catch (err) {
//     console.error("Error sending email:", err);
//   }
// }

// module.exports = sendEmail;

// async function test() {
//   await sendEmail({
//     to: "jezmacoy1998@gmail.com",
//     subject: "New Manager Account Pending Approval",
//     text: `Hello Admin,

// A new Manager account has been registered and is pending your approval.

// Please review and approve the account at: https://www.ihomes.com/admin

// Thank you for your attention.

// Best regards,
// iHomes Team`,
//     html: `<h2>New Manager Account Pending For Approval</h2>
// <p>Hello Admin,</p>

// <p>A new Manager account has been registered and is <strong>pending for your approval</strong>.</p>

// <p>Please review and approve the account by clicking the link below:</p>

// <p><a href="https://www.ihomes.com/admin">Approve Account</a></p>

// <p>Thank you for your attention.</p>

// <p>Best regards,<br>
// <i>iHomes Team</i></p>`,
//   });
// }

// test();
