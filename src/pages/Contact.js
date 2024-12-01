import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-gray-400 mb-6">
          We’re here to help! If you have any questions, concerns, or feedback,
          feel free to reach out to us. Fill out the form below, and we’ll get
          back to you as soon as possible.
        </p>

        {submitted ? (
          <div>
            <div className="bg-green-800 text-white p-4 rounded-md">
              Thank you for contacting us! We'll respond to your message
              shortly.
            </div>
            <div className="bg-gray-900 text-white py-4 rounded-md w-auto">
              <Link to="/">Home Page</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Other Ways to Contact Us
          </h2>
          <ul className="space-y-3 text-gray-400">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@ourstore.com"
                className="text-blue-500 hover:underline"
              >
                support@ourstore.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-blue-500 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li>
              <strong>Address:</strong> 123 Tech Street, Innovation City, TX
              75001
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
