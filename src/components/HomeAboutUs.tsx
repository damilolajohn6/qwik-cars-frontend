"use client";

import Image from "next/image";

export default function HomeAboutUs() {
  return (
    <section className="py-16 px-4 md:px-12 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center justify-center">
        {/* Left Image */}
        <div className="bg-blue-700 p-2 rounded-2xl shadow-md">
          <Image
            src="/ab1.jpg"
            alt="Man with sports car"
            width={400}
            height={200}
            className="rounded-xl"
          />
        </div>

        {/* Center Text */}
        <div className="bg-[#F1F1FA] rounded-xl p-6 shadow-md text-left max-w-md mx-auto">
          <p className="text-gray-700 mb-4">
            Welcome to Henry King Autos, your trusted source for all things
            automotive. Whether you are a first-time buyer, looking to sell or
            someone just looking to rent a vehicle, we&apos;ve got you covered.
          </p>
          <p className="text-gray-700">
            At Henry King Autos, we are passionate about cars and our goal is to
            provide high-quality cars to ensure your automotive needs are met
            with ease and confidence.
          </p>
        </div>

        {/* Right Image */}
        <div className="bg-blue-700 p-2 rounded-2xl shadow-md">
          <Image
            src="/ab2.jpg"
            alt="Driver in car"
            width={400}
            height={400}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
