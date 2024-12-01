import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header({ toggleSidebar, cart }) {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      {/* Burger icon for small screens */}
      <div className="flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 p-2 border-2 border-gray-800 rounded-md hover:text-gray-950"
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
      </div>

      {/* Logo section */}
      <div className="flex items-center">
        <p className="text-white mt-2 ml-3">BuyIt</p>
      </div>

      {/* Links section */}
      <ul className="flex justify-center space-x-4 flex-1 mx-auto">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-400">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>
        </li>
      </ul>

      {/* Cart Icon */}
      <div className="relative">
        <Link to="/cart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-white text-xl hover:text-gray-400"
          />
          {/* Display cart item count */}
          <span className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
            {cart.length} {/* Show the number of items in the cart */}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
