"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import AdvancedSearchModal from "./advance-search";
import Image from "next/image";
import Stores from "../store/stores";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { cartItems } = Stores();
  const router = useRouter();
  const cartCount = cartItems.length;

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error("Invalid user format in localStorage.");
      }
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push("/signin");
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top navbar */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 flex justify-end py-2">
          <div className="flex items-center space-x-4">
            {!currentUser ? (
              <>
                <Link href="/register" className="text-sm hover:underline">
                  Register
                </Link>
                <Link href="/signin" className="text-sm hover:underline">
                  Sign In
                </Link>
              </>
            ) : (
              <span className="text-sm">Welcome, {currentUser.name}</span>
            )}
            <Link href="/business">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-gray-100"
              >
                Business
              </Button>
            </Link>
            <Link href="/vendor-register">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black hover:bg-gray-100"
              >
                Sell With Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white/5 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between py-6">
          {/* Mobile Menu */}
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
                    <Link
                      href="/about"
                      className="text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                      ABOUT US
                    </Link>
                    <Link
                      href="/services"
                      className="text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                      SERVICES
                    </Link>
                    <Link
                      href="/blog"
                      className="text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                      BLOG
                    </Link>
                    <Link
                      href="/contact"
                      className="text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                      CONTACT US
                    </Link>
                  </div>

                  {/* Mobile Profile Section */}
                  {currentUser && (
                    <div className="border-t border-gray-600 pt-4 mt-4">
                      <div className="grid gap-3">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 text-lg font-medium hover:text-gray-300 transition-colors"
                        >
                          <Settings className="h-5 w-5" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/order-confirmation"
                          className="flex items-center space-x-3 text-lg font-medium hover:text-gray-300 transition-colors"
                        >
                          <Package className="h-5 w-5" />
                          <span>Your Orders</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 text-lg font-medium text-red-400 hover:text-red-300 transition-colors text-left"
                        >
                          <LogOut className="h-5 w-5" />

                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
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

          {/* Desktop Search */}
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
            <div className="text-xs text-right mt-1.5 -mb-1.5 h-0">
              <button
                onClick={() => setAdvancedSearchOpen(true)}
                className="text-white hover:underline"
              >
                Advanced Search
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
            >
              SERVICES
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
            >
              CONTACT US
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center space-x-2 h-10 px-3 hover:bg-white/10 text-white transition-colors">
                    <User className="h-5 w-5" />
                    {/* <span className="hidden sm:inline text-sm font-medium">{currentUser.name}</span> */}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border border-gray-200 shadow-lg"
                >
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 cursor-pointer px-3 py-2 hover:bg-gray-50"
                    >
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/orders"
                      className="flex items-center space-x-2 cursor-pointer px-3 py-2 hover:bg-gray-50"
                    >
                      <Package className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">Your Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 focus:text-red-600 cursor-pointer px-3 py-2 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 h-10 px-3 hover:bg-white/10 text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">Sign In</span>
                </Button>
              </Link>
            )}

            {/* Cart Icon */}
            <div className="relative ml-4">
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-black relative hover:!scale-110"
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
      </div>

      {/* Mobile Search */}
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
