"use client";

import Image from "next/image";
import { FaCarSide } from "react-icons/fa";
import Link from "next/link";

export default function CtaCards() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-black text-white min-h-[500px]">
      {/* Left Image */}
      <div className="relative w-full h-[500px] lg:h-auto">
        <Image
          src="/cta.jpg"
          alt="Salesman with car key"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right CTAs */}
      <div className="flex flex-col justify-center gap-16 p-8 lg:p-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold flex items-center gap-3">
            <FaCarSide className="text-white text-2xl" />
            Are You Looking for a car?
          </h2>
          <Link
            href="/cars"
            className="inline-block mt-4 border border-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition"
          >
            See More
          </Link>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold flex items-center gap-3">
            <FaCarSide className="text-white text-2xl" />
            Do you want to Sell Car?
          </h2>
          <Link
            href="/sell"
            className="inline-block mt-4 border border-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition"
          >
            Sell Car?
          </Link>
        </div>
      </div>
    </section>
  );
}
