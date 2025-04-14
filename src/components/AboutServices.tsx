/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";

interface ServiceItemProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-700 text-sm mb-4">{description}</p>
      <div className="mt-auto">
        {buttonLink ? (
          <a
            href={buttonLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            {buttonText}
          </a>
        ) : (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

interface OurServiceProps {}

const AboutService: React.FC<OurServiceProps> = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Service</h2>
          <p className="text-gray-600 text-sm">
            We offer a seamless car buying and rental experience, tailored to
            meet your needs - whether it&apos;s owning your dream car or renting for
            the road ahead.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceItem
            title="Car Rentals"
            description="Explore our extensive inventory of new and pre-owned vehicles, meticulously inspected and certified for quality and reliability. Whether you're searching for the latest models with cutting-edge features or a budget-friendly pre-owned car, we offer a diverse range of options to suit every lifestyle and need. Each vehicle undergoes a thorough multi-point inspection to ensure it's road-ready and meets the highest standards of safety and performance. With detailed vehicle histories and transparent pricing, you can shop confidently and drive away in a car you'll love."
            buttonText="See More"
            buttonLink="/"
          />
          <ServiceItem
            title="Car Sales"
            description="Discover our flexible car rental plans designed to fit your unique travel needs—whether you're looking for a short-term solution for a weekend getaway or a long-term rental for extended trips or business use. Choose from a diverse fleet of well-maintained vehicles, ranging from compact cars for city commutes to spacious SUVs for family adventures. With competitive pricing, straightforward contracts, and convenient pick-up and drop-off options, we make renting a car simple, reliable, and tailored to your schedule."
            buttonText="See More"
            buttonLink="/" 
          />
          <ServiceItem
            title="Financing & Trade-In"
            description="Take advantage of our competitive financing options designed to fit your budget, with flexible terms and low-interest rates that make owning your dream car easier than ever. If you're upgrading, trade in your old vehicle for a fair and transparent appraisal, and apply its value toward your new purchase. Our financing experts are here to guide you through every step, offering personalized plans and quick approvals, so you can drive away with confidence and peace of mind."
            buttonText="See More"
            buttonLink="/"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutService;
