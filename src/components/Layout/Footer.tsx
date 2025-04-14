import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import Newsletter from "../Newsletter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Newsletter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* About */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 mb-4 inline-block"
            >
              HenryKingsAutos
            </Link>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted platform for buying and renting premium cars. Quality
              and convenience guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cars?type=sale"
                  className="text-gray-400 hover:text-white transition"
                >
                  Buy Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/cars?type=rent"
                  className="text-gray-400 hover:text-white transition"
                >
                  Rent Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="gap-3 space-y-3">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Address: Henry King Autos, Satraco Gate, Gwarinpa, Abuja, Nigeria.
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <MdEmail className="w-5 h-5" /> info@henrykingautos.com
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <FaPhone className="w-5 h-5" /> +234 903-167-0254
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} HenryKingsAutos. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
