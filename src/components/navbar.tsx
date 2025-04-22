"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import AdvancedSearchModal from "./advance-search";
import Image from "next/image";
import { useCartStore } from "@/src/store/cartStore";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const { cart } = useCartStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top navbar (Sign In / Register) - Stays with background */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 flex justify-end py-2">
          <div className="flex items-center space-x-4">
            <Link href="/register" className="text-sm hover:underline">
              Register
            </Link>
            <Link href="/signin" className="text-sm hover:underline">
              Sign In
            </Link>
            <Link href="/business">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-gray-100"
              >
                Business
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar - Fully Transparent */}
      <div className="bg-white/5  shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-800 text-white">
                <div className="grid gap-6 py-6">
                  <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="Logo" width={150} height={40} />
                  </Link>
                  <div className="grid gap-3">
                    <Link href="/about" className="text-lg font-medium">
                      ABOUT US
                    </Link>
                    <Link href="/services" className="text-lg font-medium">
                      SERVICES
                    </Link>
                    <Link href="/blog" className="text-lg font-medium">
                      BLOG
                    </Link>
                    <Link href="/contact" className="text-lg font-medium">
                      CONTACT US
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
          {/* Search bar */}
          <div className="hidden md:flex flex-col flex-1 max-w-xl mx-4">
  <div className="relative w-full">
    <Input
      type="search"
      placeholder="Auto Parts Keyword Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      className="w-full bg-white text-black pr-10"
    />
    <div className="absolute inset-y-0 right-0 flex items-center">
      <Button
        type="button"
        onClick={handleSearch}
        variant="ghost"
        className="h-full px-3 bg-gray-200 rounded-l-none"
      >
        <Search className="h-6 w-6 text-gray-600" />
      </Button>
    </div>
  </div>
  <div className="text-xs text-right mt-1">
    <button
      onClick={() => setAdvancedSearchOpen(true)}
      className="text-white hover:underline"
    >
      Advanced Search
    </button>
  </div>
</div>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              ABOUT US
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              SERVICES
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-white hover:text-gray-300"
            >
              CONTACT US
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="relative ml-4">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-white relative"
              >
                <ShoppingCart className="h-20 w-20" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-green-500 text-lg font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-transparent pb-4 px-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Auto Parts Keyword Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white text-black pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              type="button"
              onClick={handleSearch}
              variant="ghost"
              className="h-full px-3 bg-gray-200 rounded-l-none"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-right mt-1">
          <button
            onClick={() => setAdvancedSearchOpen(true)}
            className="text-white hover:underline"
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        open={advancedSearchOpen}
        onOpenChange={setAdvancedSearchOpen}
      />
    </header>
  );
}
