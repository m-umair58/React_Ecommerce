import Sidebar from "../components/Sidebar";
import React from "react";

function About({ isSidebarVisible, toggleSidebar}) {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8">
      <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
        <p className="text-gray-400 leading-relaxed mb-6">
          Welcome to <span className="text-blue-500">Buyit</span>, your one-stop destination for the latest and greatest in tech gadgets. We are dedicated to providing you with high-quality products, exceptional customer service, and an unparalleled shopping experience.
        </p>
        <h2 className="text-3xl font-semibold text-white mb-4">Our Mission</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          At <span className="text-blue-500">Buyit</span>, our mission is to bring the future of technology to your doorstep. We carefully curate our collection to include only the best gadgets and accessories that cater to your tech-savvy lifestyle. From cutting-edge headphones and keyboards to ergonomic mice, we've got you covered.
        </p>
        <h2 className="text-3xl font-semibold text-white mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Wide range of top-quality products</li>
          <li>Affordable pricing with regular discounts</li>
          <li>Fast and secure delivery</li>
          <li>Exceptional customer support</li>
          <li>Hassle-free returns</li>
        </ul>
        <h2 className="text-3xl font-semibold text-white mb-4">Our Vision</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          We aim to create a community of tech enthusiasts who rely on <span className="text-blue-500">Our Store</span> for all their tech needs. Whether you're a gamer, a professional, or someone who loves exploring new tech, we are here to make your journey seamless and exciting.
        </p>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400">
            Got questions? Need help with an order? We'd love to hear from you! Reach out to us at:{" "}
            <a href="mailto:support@ourstore.com" className="text-blue-500 hover:underline">
              support@buyit.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
