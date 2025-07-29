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
import Head from "next/head";
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
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || !user.id) {
      console.log("User not found in localStorage");
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
        console.log("Error fetching subcategories:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <>
      {/* <Head>
        <title>Find Quality Auto Parts at Competitive Prices at Mypafway</title>
        <meta
          name="title"
          content="Quality Auto Parts at Competitive Prices at Mypafway"
        />
        <meta
          name="keywords"
          content="automotive parts, automotive accessories, automotive parts search engine, comparison shopping engine, marketplace for online distribution of automotive parts, Peer-Peer"
        />
        <meta
          name="description"
          content="Mypafway is an automotive search engine that consists of OEM and aftermarket automotive parts. Mypafway's search engine enables consumers the ability to find automotive parts from many different car manufacturers from around the globe."
        />
        <meta
          name="description"
          content="Mypafway's Search Portal has integrated automotive technology solutions that will enable auto part companies to take grasp at our syndicated data feed, order management and inventory management solutions. In addition, Mypafway's Services has distanced itself from our competitors in terms of our technology solutions. These solutions have given Mypafway a greater understanding of what it takes to be the leading tech firm in the automotive parts industry."
        />
      </Head> */}
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
          <div className="absolute inset-0 bg-black/50 z-5" />
          <div className="relative z-10 container px-6 md:px-12 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
                Your One-Stop Shop for Quality Auto Parts
              </h1>
              <p className="text-white text-lg md:text-xl mb-6">
                Fast Delivery & Trusted Brands – Find the right parts at the
                right price.
              </p>

              <Button
                onClick={handleClick}
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
              >
                Learn more
              </Button>
            </div>
          </div>
        </section>
        {/* Shop by Category */}
        <CategorySection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
