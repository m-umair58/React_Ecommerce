// Sidebar.js
import { Link } from "react-router-dom";
import { useState } from "react";
function Sidebar({ isSidebarVisible, toggleSidebar }) {
  const [showCategories, setShowCategories] = useState(false);
  return (
    <aside
      className={`${
        isSidebarVisible ? "translate-x-0" : "-translate-x-full"
      } fixed inset-0 bg-gray-800 bg-opacity-90 w-1/5 p-6 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Close Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Sidebar Content */}
      <h2 className="text-3xl font-semibold text-white mb-8">Menu</h2>
      <ul className="space-y-6">
        {/* Main "Products" Button */}
        <li>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="text-gray-400 hover:text-white transition-colors duration-300 w-full text-left"
          >
            Products
          </button>
          {/* Product Categories Dropdown */}
          {showCategories && (
            <ul className="ml-4 space-y-4 mt-2">
              <li>
                <Link
                  to="/products/headphones"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  // onClick={toggleSidebar} 
                >Headphones
                </Link>
              </li>
              <li>
                <Link
                  to="/products/mice"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Mouse
                </Link>
              </li>
              <li>
                <Link
                  to="/products/keyboards"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Keyboards
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* "Order History" Button */}
        <li>
          <Link
            to="/order-history"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Order History
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
