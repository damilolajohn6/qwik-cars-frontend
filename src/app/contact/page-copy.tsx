"use client";

import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="bg-gray-50">
      <section className="relative h-[300px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/cohero.jpg"
          alt="Contact Us"
          layout="fill"
          objectFit="cover"
          className="object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-heading2-bold font-bold">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-200">Home / Contact Us</p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Get in Touch with Us!</h2>
          <p className="text-gray-600 mt-2">
            Questions? Feedback? We&apos;re here to assist you with all your fashion
            needs.
          </p>
          <a
            href="/contact"
            className="text-blue-600 font-medium mt-2 inline-block"
          >
            Contact Us
          </a>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Call Us */}
          <div className="p-6 border rounded-lg shadow-md flex flex-col items-start transition-transform hover:scale-105">
            <Phone className="text-gray-700 w-6 h-6 mb-2" />
            <h3 className="text-lg font-semibold">Call Us:</h3>
            <a
              href="tel:+2348079056834"
              className="text-blue-600 font-medium mt-1"
            >
              +234 807-905-6834
            </a>
            <p className="text-sm text-gray-500 mt-1">
              Available 9 AM - 6 PM (Mon-Sat)
            </p>
          </div>

          {/* Email Us */}
          <div className="p-6 border rounded-lg shadow-md flex flex-col items-start transition-transform hover:scale-105">
            <Mail className="text-gray-700 w-6 h-6 mb-2" />
            <h3 className="text-lg font-semibold">Email Us:</h3>
            <a
              href="mailto:support@justclothing.com"
              className="text-blue-600 font-medium mt-1"
            >
              Justclothing.com
            </a>
            <p className="text-sm text-gray-500 mt-1">
              Replies within 24 hours
            </p>
          </div>

          {/* Live Chat */}
          <div className="p-6 border rounded-lg shadow-md flex flex-col items-start transition-transform hover:scale-105">
            <MessageCircle className="text-gray-700 w-6 h-6 mb-2" />
            <h3 className="text-lg font-semibold">Live Chat:</h3>
            <p className="text-sm text-gray-500 mt-1">
              Available on our website (9 AM - 8 PM Daily)
            </p>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default ContactUs;
