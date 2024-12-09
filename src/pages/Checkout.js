import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Checkout({ cart }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    Phone_Number:"",
    city: "",
    postalCode: "",
  });

  console.log(cart)

  const navigate = useNavigate(); // Initialize useNavigate
  let totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = 20;
  if(totalAmount>0){
    totalAmount+=shippingFee;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProceedToPay = () => {
    console.log("Order Details:", { cart, formData });
    navigate("/payment", { state: { amount: totalAmount,cart,formData } }); // Navigate to /payments page
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Billing Form */}
          <form className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Billing Details
            </h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label
                htmlFor="Phone_Number"
                className="block text-sm font-medium mb-2"
              >
                Phone_Number
              </label>
              <input
                type="text"
                id="Phone_Number"
                name="Phone_Number"
                value={formData.Phone_Number}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+92 YXX-XXXXXX"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Address"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your City"
              />
            </div>

            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium mb-2"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Postal Code"
              />
            </div>

            <button
              type="button" // Change to button to prevent default form submission
              onClick={handleProceedToPay} // Call the navigate function
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
            >
              Proceed to Pay
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-4 bg-gray-800 p-6 rounded-md">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>
                    ${item.price * item.quantity.toFixed(2)}
                  </span>
                </div>
              ))}
              {totalAmount && <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span>${shippingFee}</span>
              </div>}
              <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
