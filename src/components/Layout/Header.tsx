"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  const { items } = useAppSelector((state) => state.cart); // Use 'items' instead of 'cart'
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // Clear search after submission
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
        <Link href="/" className="text-2xl font-bold text-blue-600">
          HenryKingsAutos
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/cars?type=sale"
            className="text-gray-600 hover:text-blue-600"
          >
            Buy Cars
          </Link>
          <Link
            href="/cars?type=rent"
            className="text-gray-600 hover:text-blue-600"
          >
            Rent Cars
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <Input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-40 lg:w-64"
          />
          <Button type="submit" variant="ghost">
            <Search className="w-5 h-5" />
          </Button>
        </form>

        {/* Cart and User */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <User className="w-6 h-6 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user ? (
                <>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/rentals">My Rentals</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
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
              href="/cars?type=sale"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Buy Cars
            </Link>
            <Link
              href="/cars?type=rent"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Rent Cars
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
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
