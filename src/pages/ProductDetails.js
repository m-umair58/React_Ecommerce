import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
export default function ProductDetail({
  isSidebarVisible,
  toggleSidebar,
  cart,
  setCart,
}) {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState(""); // Notification message

  useEffect(() => {
    const productId = location.state?.productId; // assuming product ID is passed
    const products = location.state?.products;
    // Fetch product details from your data (either local or from an API)
    const productData = products.find((p) => p.id === productId); // mock data or fetch logic
    setProduct(productData);
  }, [location.state]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex >= 0) {
      // If the product is already in the cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show notification
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-200">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-4 right-10 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-gray-200">
          {product.name}
        </h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-xs h-auto object-cover rounded-lg shadow-md mb-6"
        />
        <p className="text-lg text-gray-400 mb-4">{product.description}</p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">
            Specifications
          </h3>
          <ul className="list-disc pl-6 text-gray-400">
            {product.specifications.map((spec, idx) => (
              <li key={idx} className="mb-2">
                <strong className="font-medium">{spec.key}:</strong>{" "}
                {spec.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">Reviews</h3>
          {product.reviews.map((review, idx) => (
            <div key={idx} className="border-b pb-4 mb-4">
              <p className="font-semibold text-gray-200">{review.user}</p>
              <p className="text-gray-400">Rating: {review.rating} stars</p>
              <p className="text-gray-400">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-900">
            ${product.price}
          </p>
          <p className="text-lg text-gray-400">{product.availability}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
