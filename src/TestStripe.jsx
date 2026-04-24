// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";

// const TestStripe = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     // Call backend to create payment intent
//     const { data } = await axios.post(
//       "http://localhost:5000/create-payment-intent",
//       {
//         amount: 5000, // $50 in cents
//       },
//     );

//     const result = await stripe.confirmCardPayment(data.clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       setMessage(result.error.message);
//     } else {
//       if (result.paymentIntent.status === "succeeded") {
//         setMessage("Payment successful!");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay $50
//       </button>
//       <div>{message}</div>
//     </form>
//   );
// };

// export default TestStripe;
