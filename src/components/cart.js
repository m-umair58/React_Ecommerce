import { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  // Function to remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Function to update quantity
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  return (
    <div className="w-full p-4 px-20 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">
          Your cart is empty.{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 py-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4 rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-white">{item.name}</h2>
                  <p className="text-gray-400">{item.description}</p>
                  <span className="text-blue-400">Price: ${item.price}</span>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className={`px-3 py-1 rounded-md ${
                    item.quantity === 1
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  -
                </button>
                <span className="mx-3 text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-600 rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between mt-8 font-semibold text-white">
            <span>Total Price:</span>
            <span>
              $
              {cart
                .reduce(
                  (total, item) =>
                    total +
                    item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <Link
            to="/checkout"
            className="mt-8 w-full block text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
