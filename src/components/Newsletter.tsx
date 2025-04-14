/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import React, { useState } from "react";

interface NewsletterSignupProps {}

const Newsletter: React.FC<NewsletterSignupProps> = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Subscribing with email:", email);
    setEmail("");
  };

  return (
    <div className="bg-blue-600 py-6 px-4 md:px-8 rounded-md shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-white text-center md:text-left">
        <h2 className="text-lg md:text-xl font-semibold">
          Sign-up for Newsletter
        </h2>
        <p className="text-sm">For our latest new deals</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-3"
      >
        <input
          type="email"
          className="bg-white text-gray-800 rounded-md py-2 px-4 w-full sm:w-64 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full sm:w-auto transition duration-300"
        >
          Subscribe Now
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
