import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // For navigation after the order

const ThankYouPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId;
 

  const handleHomeRedirect = () => {
    navigate("/"); // Redirects to the home page after clicking the button
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-6 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h2>
        <p className="text-lg mb-6">
          Your payment has been successfully processed. We're processing your order, and you will receive a confirmation email shortly.
        </p>
        <p className="mb-6">
          Order #<strong>{orderId}</strong> has been confirmed. We appreciate your support!
        </p>
        <div className="mt-4">
          <button
            onClick={handleHomeRedirect}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
