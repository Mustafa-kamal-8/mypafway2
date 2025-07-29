"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  return (
    <>
      {/* ✅ SEO Metadata */}

      <div className="flex min-h-screen flex-col">
        <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
          <Navbar />
        </div>
        <section className="relative bg-gray-700 text-white mt-52 lg:mt-32">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Services</h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 120"
              className="w-full"
            >
              <path
                fill="#FFC107"
                fillOpacity="1"
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              ></path>
            </svg>
          </div>
        </section>

        <main className="flex-1 bg-white">
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="mb-8">
              <p className="text-gray-600">
                <Link href="#" className="hover:underline">
                  Home
                </Link>{" "}
                &gt; Services: Consumers
              </p>
            </div>

            {/* Services heading */}
            <h2 className="text-5xl font-bold text-amber-400 mb-12">
              Services
            </h2>

            {/* Three column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* First column - Search Engine section */}
              <div className="lg:col-span-1">
                <img
                  src="out_plan.jpg.jpg"
                  alt="Placeholder"
                  className="bg-gray-300 rounded-lg h-64 w-full object-cover mb-8"
                />
                <div className="lg:col-span-1 mt-20 sm:mt-40">
                  <img
                    src="gear.jpg"
                    alt="Placeholder"
                    className="bg-gray-300 rounded-lg h-64 w-full object-cover mb-8"
                  />
                </div>
              </div>

              {/* Second column - Text content */}
              <div className="lg:col-span-1">
                <div className="mb-16">
                  <h3 className="text-4xl font-bold text-amber-400 mb-4">
                    Search Engine
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mypafway is an application, specializing in comparative
                    shopping for auto parts and accessories. The Search Engine
                    allows users the ability to search and buy automotive parts
                    online.
                  </p>
                  <Button
                    className="bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-full px-8"
                    onClick={() => router.push("/")}
                  >
                    Try it now!
                  </Button>
                </div>

                <div>
                  <h3 className="text-4xl font-bold lg:mt-52 text-amber-400 mb-4">
                    Mypafway Freemium
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mypafway's Freemium business model lets anyone (yes this is
                    open to the general public) promote and sell quality, name
                    brand items on Mypafway for FREE. While Mypafway takes care
                    of fulfilling the order. You stock the inventory, pack the
                    orders, and Mypafway will ship it to your customers.
                  </p>
                  <Button
                    className="bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-full px-8"
                    onClick={() => router.push("/")}
                  >
                    Try it now!
                  </Button>
                </div>
              </div>

              {/* Third column - Images */}
              <div className="col-span-1 flex flex-col space-y-4">
                {/* First Image - Full width, more height */}
                <div className="w-full">
                  {/* Image section */}
                  <div className="relative w-full h-[40rem]">
                    {/* Image */}
                    <Image
                      src="/brembo-logo.png" // Replace with actual path
                      alt="Brembo Logo"
                      width={350}
                      height={100}
                      className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10"
                    />
                    <Image
                      src="/hondacivicty-img.png"
                      alt="Privacy Illustration"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />

                    {/* Button inside image */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                      <Link href="/about">
                        <button className="w-[300px] lg:w-[360px] bg-yellow-400 text-gray-800 font-semibold py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Second Image - Full width, smaller height */}
                <div className="flex flex-col w-full h-[22rem] bg-black items-center p-20">
                  {/* Image */}
                  <Image
                    src="/logo2.png"
                    alt="Security Illustration"
                    width={200}
                    height={200}
                    className="object-cover rounded-lg shadow-md w-full"
                  />

                  {/* Button or content on top */}
                  <div className="mt-10">
                    <Link href="/register">
                      <button className="w-[300px] lg:w-[360px] bg-yellow-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
                        Register Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section - Takes first two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2">
                <div className="relative mb-8">
                  <div className="bg-amber-400 text-black font-bold text-2xl py-2 px-8 inline-block rounded-r-full">
                    Benefits
                  </div>
                  <div className="absolute top-1/2 left-[200px] right-0 h-1 bg-amber-400 -translate-y-1/2"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/cross-seeling-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Cross Selling</h3>
                    <p className="text-gray-600">
                      Reach a target audience missed by other media
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/lead-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Lead Generation</h3>
                    <p className="text-gray-600">
                      Generate leads, drive traffic and revenue online
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/leveraging-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Leveraging of Technology
                    </h3>
                    <p className="text-gray-600">
                      Leverage technology and lower operating costs
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="relative w-28 h-28 mx-auto mb-4">
                      <Image
                        src="/stremlining-img.svg"
                        alt="Privacy Illustration"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Streamlining Inventory
                    </h3>
                    <p className="text-gray-600">
                      Eliminate the traditional practice of selling through an
                      auto parts catalogue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
