import React from "react";
import Link from "next/link";
import { Facebook, Twitter} from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaInstagram, FaPhone } from "react-icons/fa";
import Newsletter from "../Newsletter";

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Newsletter />
        </div>
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Brand & Socials */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl text-red-500">★</span>
              <span className="text-xl font-semibold">HKA</span>
            </div>
            <p className="text-gray-300 mb-4">
              For more information or inquiry, contact us on any of our social
              media handles.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-pink-600 w-10 h-10 rounded-full flex items-center justify-center"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-300">
              Henry King Autos
              <br />
              Satraco Gate
              <br />
              Gwarinpa, Abuja.
              <br />
              Nigeria.
            </p>
            <p className="text-gray-300 mt-2 flex items-center gap-2">
              <FaPhone /> Phone: +234 903-167-0254
            </p>
            <p className="text-gray-300 mt-1 flex items-center gap-2">
              <MdEmail /> Email: HenryKingAutos.com
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/rent" className="hover:underline">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/cars?type=sale" className="hover:underline">
                  Sell
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About us
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Socials</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Instagram</li>
              <li>Tiktok</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Henry King Autos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
