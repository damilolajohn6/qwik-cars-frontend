"use client";

import Image from "next/image";
import Link from "next/link";

export default function CtaFeatureSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px] bg-white">
      {/* Left Image */}
      <div className="relative w-full h-80 sm:h-96 lg:h-auto">
        <Image
          src="/cta.jpg"
          alt="Salesman handing car key"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center px-6 py-10 md:px-12 lg:px-16 bg-gray-100 text-black">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
          Get a Fair Price at Rental cars <br />
          From us Today!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="font-semibold">Transparent pricing</div>
          <div>No Hidden Fees, Just Clear Deals!</div>

          <div className="font-semibold">Transparent pricing</div>
          <div>No Hidden Fees, Just Clear Deals!</div>

          <div className="font-semibold">Flexible rental terms</div>
          <div>
            Enjoy the Flexibility You Need with Stress-free Rental Term. Rent
            the Way You Want, When You Want!
          </div>

          <div className="font-semibold">Flexible rental terms</div>
          <div>
            Enjoy the Flexibility You Need with Stress-free Rental Term. Rent
            the Way You Want, When You Want!
          </div>

          <div className="font-semibold">Flexible rental terms</div>
          <div>
            Enjoy the Flexibility You Need with Stress-free Rental Term. Rent
            the Way You Want, When You Want!
          </div>
        </div>

        <Link
          href="/contact"
          className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white text-base font-semibold py-3 px-6 rounded-md w-fit transition"
        >
          Call us Today!
        </Link>
      </div>
    </section>
  );
}
