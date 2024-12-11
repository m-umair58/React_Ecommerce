import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory({ isSidebarVisible, toggleSidebar, cart, setCart }) {
  const [orders, setOrders] = useState([]); // Store orders
  const [products, setProducts] = useState({}); // Store fetched product details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://nestecommerce-production.up.railway.app/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        // Fetch orders
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
        const productIds = [...new Set(ordersData.flatMap((order) => order.productId))];

        // Fetch products
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-white rounded-full animate-spin">|</div>
        <span className="text-white mt-4">Loading</span>
      </div>
    );
  }
  

  if (error) return <div className="text-white">Error: {error}</div>;

  const handleReorder = (order) => {
    const updatedCart = [...cart];

    order.productId.forEach((id, idx) => {
      const product = products[id];
      if (product) {
        const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (existingProductIndex >= 0) {
          updatedCart[existingProductIndex].quantity += order.productQuantity[idx];
        } else {
          updatedCart.push({ ...product, quantity: order.productQuantity[idx] });
        }
      } else {
        console.warn(`Product with ID ${id} not found.`);
      }
    });

    setCart(updatedCart);
  };

  const handleViewOrderDetails = (order) => {
    navigate(`/order-details`, { state: { order,products } });
  };

  return (
    <div className="min-h-screen p-16 bg-gray-900 text-white">
      <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      <div className="max-w-4xl mx-auto ">
        <h2 className="text-3xl font-bold mb-4">Order History</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="mb-6 bg-gray-800 p-4 rounded-lg shadow-md" onClick={() => handleViewOrderDetails(order)}>
              <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
              <p>Status: {order.status}</p>
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
                            <p className="text-gray-400">Quantity: {order.productQuantity[idx]}</p>
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
