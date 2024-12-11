import React from "react";
import { useLocation } from "react-router-dom";

export default function OrderDetails() {
  const location = useLocation();

  // Check if location.state is available
  const { order, products } = location.state || {}; // Set default empty object if state is not available

  // If order data is not available, display an error message
  if (!order || !products) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Order details not found. Please go back to the order history.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-4xl font-semibold text-center mb-6">Order #{order.id}</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-4">Status: <span className="font-semibold">{order.status}</span></p>
          <p className="font-medium text-lg mb-4">Products:</p>
          <ul className="space-y-6">
            {order.productId.map((id, idx) => {
              const product = products[id];
              return (
                <li key={idx} className="flex items-start space-x-6 bg-gray-700 p-6 rounded-lg shadow-md">
                  {product ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="flex-1">
                        <p className="text-2xl font-semibold text-gray-100">{product.name}</p>
                        <p className="text-gray-400 mt-2">Quantity: {order.productQuantity[idx]}</p>
                        <p className="text-lg font-semibold mt-2">Price: ${product.price}</p>
                        <p className="text-gray-300 mt-2">{product.description}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-400">Product not found</p>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 text-right">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md"
              onClick={() => window.history.back()}
            >
              Go Back to Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
