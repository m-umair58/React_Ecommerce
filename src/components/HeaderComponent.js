import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header({ toggleSidebar, cart }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label="Toggle sidebar"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Buy<span className="text-blue-500">It</span>
        </Link>
        </div>

        {/* Hamburger Menu Toggle */}
        {/* <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
          aria-label="Toggle navigation menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button> */}

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-900 md:static md:w-auto`}
        >
          <li>
            <Link
              to="/"
              className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Cart and User Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Link to="/cart" className="relative group">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-xl text-gray-300 hover:text-white"
              />
              <span
                className="absolute -top-2 -right-2 bg-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center text-white"
                title="Cart items"
              >
                {cart.length}
              </span>
            </Link>
          </div>
          <div>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-4 py-2 border border-gray-600 rounded-md"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white px-4 py-2 border border-gray-600 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
