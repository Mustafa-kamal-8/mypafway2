"use client"; // Required for Next.js to use hooks in certain setups

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

import { useRouter } from "next/navigation";
import { getProducts } from "../api/products";
import CategorySection from "@/src/components/category-section";
import { getCartData } from "../api/cart";
// import { useCartStore } from "../store/cartStore";

export default function Home() {
  const [navbarBg, setNavbarBg] = useState("bg-gray-200/30");
  // const { setCartData } = useCartStore();

  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setNavbarBg(
        isScrolled ? "bg-gray-500/80 backdrop-blur-md" : "bg-gray-200/30"
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    router.push("/about");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({ search: "" });
        console.log("Fetched products:", response); // ✅ No `.data` here
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || !user.id) {
      console.error("User not found in localStorage");
      return;
    }

    const fetchCartData = async () => {
      try {
        const response = await getCartData({
          search: `user:${user.id}`,
        });
        console.log("Fetched subcategories:", response);
        // setCartData(response.result || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Dynamic Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300 ${navbarBg}`}
      >
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[1000px] md:h-[800px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/index_page2.jpeg?height=1000&width=1920"
            alt="Luxury car"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-5"></div>
        <div className="relative z-5 container px-6 md:px-12 h-full flex flex-col justify-center">
          <div className="max-w-sm">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-md mt-6">
              <span className="block mb-3">Compare auto part</span>
              <span className="block mb-3">prices right at your</span>
              <span className="block">fingertips.</span>
            </h1>

            <div className="mt-6">
              <Button
                onClick={handleClick}
                size="lg"
                className="bg-white text-black hover:bg-gray-100 mb-36"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <CategorySection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
