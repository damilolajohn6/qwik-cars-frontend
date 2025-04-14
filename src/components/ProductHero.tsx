"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductHero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // Clear search after submission
    }
  };
  return (
    <section className="relative h-[90vh] flex items-center px-12">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt="Blue BMW car"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="text-white max-w-4xl text-center px-4 relative">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          We Sell Best Car’s You’ll Fall in Love With—No Compromises.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          Your trusted partner in buying, selling, and renting quality vehicles.
        </p>

        <div className="mt-6">
          <Button size="lg" className="text-lg px-8 py-5 rounded-xl">
            Explore
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-10 flex items-center justify-center w-full max-w-3xl mx-auto bg-white rounded-full shadow-lg overflow-hidden">
          <form onSubmit={handleSearch} className="md:flex items-center w-full">
            <input
              type="text"
              placeholder="Search by Made, Model, Price"
              className="flex-1 px-6 py-4 text-gray-700 outline-none rounded-l-full"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-r-full">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
