"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const SearchFilter = ({ label }: { label: string }) => (
  <div className="bg-white border border-gray-200 rounded-md px-4 py-2 flex items-center justify-between w-full min-w-[140px]">
    <span className="text-gray-600 text-sm">{label}</span>
    <ChevronDown className="h-5 w-5 text-gray-400" />
  </div>
);

export default function ProductHero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] sm:h-[90vh] flex items-center justify-center text-center px-4 sm:px-8">
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
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="text-white relative max-w-3xl mx-auto">
          <div className="">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Rent a vehicle
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-200">
              Find the best deals on high-quality vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="bg-gray-100 py-10 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center sm:text-left">
            Quick Search
          </h2>

          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <SearchFilter label="Make" />
            <SearchFilter label="Model" />
            <SearchFilter label="Body Type" />
            <SearchFilter label="Fuel Type" />
            <SearchFilter label="Price Range" />
            <SearchFilter label="Year Made" />

            <div className="sm:col-span-2 lg:col-span-3 flex justify-start">
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-10 rounded-md w-full sm:w-auto"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
