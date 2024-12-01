import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link, useLocation } from "react-router-dom";

const PaymentForm = ({ setCart }) => {
  const location = useLocation();
  const amount = location.state?.amount * 100 || 0;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create payment method with card details
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Send the paymentMethod and amount to the backend
      const response = await fetch("http://localhost:8000/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const paymentResult = await response.json();
      if (paymentResult.error) {
        setError(paymentResult.error);
      } else if (paymentResult) {
        setSuccess(true);
        setCart([]);
      }
    } catch (err) {
        console.log(err.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Secure Payment
        </h1>
        <p className="text-gray-300 text-center mb-4">
          Amount to Pay: <strong>${(amount / 100).toFixed(2)}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="card"
              className="block text-sm font-medium text-gray-400"
            >
              Card Details
            </label>
            <div className="p-3 border border-gray-600 rounded-lg shadow-sm bg-gray-700">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#ffffff",
                      "::placeholder": { color: "#b3b3b3" },
                    },
                    invalid: { color: "#ff726f" },
                  },
                }}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && (
            <div>
              <div className="text-green-400 text-sm">
                Payment Successful! Thank you for your order.
              </div>
              <Link to="/" className="text-white text-sm hover:underline">
                Home
              </Link>

            </div>
          )}
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;