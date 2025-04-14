import AbImage from "@/components/AbImage";
import AboutService from "@/components/AboutServices";
import HomeAboutUs from "@/components/HomeAboutUs";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <section className="relative h-[300px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/abhero.jpg"
          alt="About Us"
          layout="fill"
          objectFit="cover"
          className="object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-heading2-bold font-bold">About Company</h1>
          <p className="mt-2 text-lg text-gray-200">Home / About Us</p>
        </div>
      </section>
      <HomeAboutUs />
      <AbImage />
      <AboutService />
      <Testimonial />
    </div>
  );
};

export default AboutPage;
