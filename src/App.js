import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home, { productsLoader } from "./pages/Home"; // Your Home Component
import About from "./pages/About"; // Your About Component
import Contact from "./pages/Contact"; // Your Contact Component
import Cart from "./components/Cart"; // Your Cart Component
import Checkout from "./pages/Checkout"; // Your Checkout Component
import Headphone from "./pages/Headphone";
import Mice from "./pages/Mice";
import Keyboard from "./pages/Keyboard";
import PaymentPage from "./pages/PaymentPage";
import Login from "./components/LoginComponent";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

import RootLayout from "./layouts/RootLayout";
import { RouterProvider } from "react-router-dom";
import OrderHistory from "./pages/OrderHistory";
import ThanksPage from "./pages/ThanksPage";

const stripePromise = loadStripe(
  "pk_test_51QQBJ7DFsAtJprlufxmTo34xeSYff41lqSo9BJPNnfCiJHBjHyaok0VPnbsSxjaNj0m3w1neK81SMH6Kc1QGjtxo003bCrpMqO"
);

function App() {
  // State to toggle sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // State to manage the cart
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <RootLayout
            toggleSidebar={toggleSidebar}
            cart={cart}
            setCart={setCart}
          />
        }
      >
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route
          index
          element={
            <Home
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
              cart={cart}
              setCart={setCart}
            />
          }
          loader={productsLoader}
        />
        <Route
          path="/about"
          element={
            <About
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/products/headphones"
          element={
            <Headphone
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
              cart={cart}
              setCart={setCart}
            />
          }
          loader={productsLoader}
        />
        <Route
          path="/products/mice"
          element={
            <Mice
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
              cart={cart}
              setCart={setCart}
            />
          }
          loader={productsLoader}
        />
        <Route
          path="/products/keyboards"
          element={
            <Keyboard
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
              cart={cart}
              setCart={setCart}
            />
          }
          loader={productsLoader}
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoute>
              <OrderHistory
                cart={cart}
                setCart={setCart}
                isSidebarVisible={isSidebarVisible}
                toggleSidebar={toggleSidebar}
              />
            </ProtectedRoute>
          }
          // loader={usersData}
          // loader={orderLoader}
        />
        <Route path="/order-completion" element={<ThanksPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout cart={cart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentPage setCart={setCart} />
            </Elements>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
