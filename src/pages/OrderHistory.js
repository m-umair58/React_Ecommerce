import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";

export default function OrderHistory({isSidebarVisible, toggleSidebar, cart, setCart }) {
  // console.log(userData)
  const [orders, setOrders] = useState([]); // Store orders
  const [products, setProducts] = useState({}); // Store fetched product details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://nestecommerce-production.up.railway.app/users/me", {
          method: "GET", // or POST, PUT, etc.
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        // console.log(data.id)

        // Fetch orders (this should include product IDs)
        const ordersResponse = await fetch(
          `https://nestecommerce-production.up.railway.app/orderdetails/${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        // Extract product IDs from orders
        const productIds = [
          ...new Set(ordersData.flatMap((order) => order.productId)),
        ];

        // Fetch products one by one
        const fetchedProducts = {};
        for (const productId of productIds) {
          const productResponse = await fetch(
            `https://nestecommerce-production.up.railway.app/products/${productId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!productResponse.ok) {
            throw new Error(`Failed to fetch product with ID ${productId}`);
          }

          const productData = await productResponse.json();
          console.log(productData);
          fetchedProducts[productId] = productData;

          // Update state as products are fetched
          setProducts((prevProducts) => ({
            ...prevProducts,
            [productId]: productData,
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  const handleReorder = (order) => {
    const updatedCart = [...cart]; // Start with the current cart
  
    order.productId.forEach((id, idx) => {
      const product = products[id]; // Get the product from the products list
      if (product) {
        const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
  
        if (existingProductIndex >= 0) {
          // If the product is already in the cart, update the quantity
          updatedCart[existingProductIndex].quantity += order.productQuantity[idx];
        } else {
          // Add the product with the original quantity from the order
          updatedCart.push({ ...product, quantity: order.productQuantity[idx] });
        }
      } else {
        console.warn(`Product with ID ${id} not found.`);
      }
    });
  
    setCart(updatedCart); // Update the cart once with all changes
  };
  
  
  return (
    <div className="min-h-screen p-16 bg-gray-900 text-white">
      <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      <div className="max-w-4xl mx-auto ">
        <h2 className="text-3xl font-bold mb-4">Order History</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
              <p>Status: {order.status}</p>
              {/* <p>User ID: {order.userId}</p> */}
              <p className="mt-2 font-medium">Products:</p>
              <ul className="mt-2">
                {order.productId.map((id, idx) => {
                  const product = products[id];
                  return (
                    <li key={idx} className="mt-2 flex items-center">
                      {product ? (
                        <>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <p className="font-bold">{product.name}</p>
                            <p className="text-gray-400">
                              Quantity: {order.productQuantity[idx]}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p>Product not found</p>
                      )}
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => handleReorder(order)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Add to Cart to Reorder
              </button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}
