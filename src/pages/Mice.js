import { Link ,useLoaderData} from "react-router-dom";
// import { products } from "../products";

function Home({ isSidebarVisible, toggleSidebar, cart, setCart }) {
  // Function to add product to cart
  const products = useLoaderData();

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
  };

  return (
    <div className="flex w-full bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 bg-gray-800 bg-opacity-90 w-1/5 p-6 h-full transition-transform duration-300 ease-in-out z-50`}
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
        <h2 className="text-3xl font-semibold text-white mb-8">Categories</h2>
        <ul className="space-y-6">
          <li>
            <Link
              to="/products/headphone"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Headphones
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
              to="/products/keyboard"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Keyboards
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 p-8 h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Our Products</h1>
          {/* Sidebar toggle button visible at all times */}
          {/* <button
            onClick={toggleSidebar}
            className="bg-gray-700 text-white p-3 rounded-xl focus:outline-none"
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(
            (product) =>
              product.category === "mice" && (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col h-full"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover rounded-t-xl"
                    />
                    {/* Optional "New" or "Sale" Badge */}
                    <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                      New
                    </span>
                  </div>

                  <div className="flex flex-col justify-between p-6 flex-grow">
                    <h2 className="text-2xl font-semibold text-white">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-400 my-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-blue-400">
                        {product.price}
                      </span>
                      {/* Star Rating */}
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                          >
                            <path
                              d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 9.91 8.65 3 9.24l5.46 4.73L5.82 21z"
                              className="fill-current"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;