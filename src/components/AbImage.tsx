/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import Image from "next/image";

interface HeroProps {}

const AbImage: React.FC<HeroProps> = () => {
  return (
    <div className="relative w-full  h-[200px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/cars.jpg"
          alt="Clean Cars"
          layout="fill"
          objectFit="cover"
          className=""
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex items-center  h-full text-center text-white px-6">
        <div className="w-1/3 ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            We sell Clean Cars <br className="hidden md:inline" /> for Everyone
          </h1>
        </div>
        <div className="w-2/3 flex flex-col items-center justify-center text-center">
          <p className="text-sm md:text-base lg:text-lg mb-6">
            Are you looking to buy, sell or rent? Discover the services we offer
            and be on your way to driving safely, smoothly and stylishly.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md text-sm md:text-base transition duration-300">
            Explore services
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbImage;
