"use client";

import React, { useState } from "react";
import Link from "next/link";
//import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../redux/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Header() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      if (isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image
            src="/head.png"
            alt="HKA Logo"
            width={120}
            height={40}
            priority
          /> */}
          <span className="text-red-600 text-xl">★</span>
          <span className="text-blue-600 font-bold text-lg">HKA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/rent"
            className="text-gray-600 hover:text-blue-600"
          >
            Rent
          </Link>
          <Link
            href="/cars?type=sale"
            className="text-gray-600 hover:text-blue-600"
          >
            Sell
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About Us
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Link href="/contact" className="hidden md:block">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-md">
              Contact Us
            </Button>
          </Link>

          {/* Search, User, and Cart Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="w-6 h-6 text-gray-700" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-6 h-6 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/rentals">My Rentals</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/cars?type=rent"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Rent
            </Link>
            <Link
              href="/cars?type=sale"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Sell
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
            <hr />
            {/* User and Cart links for mobile */}
            <Link
              href="/profile"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Profile
            </Link>
            <Link
              href="/cart"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Cart
            </Link>
            <hr />
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <Button type="submit" variant="ghost">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </nav>
      )}
    </header>
  );
}
