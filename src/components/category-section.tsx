"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// Main categories data
const categories = [
  {
    id: 1,
    name: "Interior",
    image: "/interior.png?height=200&width=200",
    subcategories: [
      {
        id: 101,
        name: "Dash Kits",
        image: "/11-dash-covers.png?height=100&width=100",
      },
      {
        id: 102,
        name: "Custom Gauges",
        image: "/2-custom-gauges.png?height=100&width=100",
      },
      {
        id: 103,
        name: "Car Organizers",
        image: "3-car-organizers_FPTn6gT.png?height=100&width=100",
      },
      {
        id: 104,
        name: "Floor Mats",
        image: "4-floor-mats.png?height=100&width=100",
      },
      {
        id: 105,
        name: "Cargo Liners",
        image: "5-cargo-liners.png?height=100&width=100",
      },
      {
        id: 106,
        name: "Van Equipment",
        image: "6-van-equipment.png?height=100&width=100",
      },
      {
        id: 107,
        name: "Seat Covers",
        image: "7-seat-covers.png?height=100&width=100",
      },
      { id: 108, name: "Seats", image: "8-seats.png?height=100&width=100" },
      { id: 109, name: "Pedals", image: "9-pedals.png?height=100&width=100" },
    ],
  },
  {
    id: 2,
    name: "Exterior",
    image: "exterior.png?height=200&width=200",
    subcategories: [
      {
        id: 201,
        name: "Body Kits",
        image: "/exterior-1.png?height=100&width=100",
      },
      {
        id: 202,
        name: "Towing & Hitches",
        image: "/exterior-2.png?height=100&width=100",
      },
      {
        id: 203,
        name: "Headlights",
        image: "/exterior-3.png?height=100&width=100",
      },
      {
        id: 204,
        name: "Spoilers",
        image: "/exterior-4.png?height=100&width=100",
      },
      {
        id: 205,
        name: "Custom Hoods",
        image: "/exterior-5.png?height=100&width=100",
      },
      {
        id: 206,
        name: "Car Covers",
        image: "/exterior-6.png?height=100&width=100",
      },
    ],
  },
  {
    id: 3,
    name: "Performance",
    image: "/performance.png?height=200&width=200",
    subcategories: [
      {
        id: 301,
        name: "Exhaust Systems",
        image: "/perform-img1.png?height=100&width=100",
      },
      {
        id: 302,
        name: "Brakes & Rotors",
        image: "/perform-img2.png?height=100&width=100",
      },
      {
        id: 303,
        name: "Suspension Systems",
        image: "/perform-img3.png?height=100&width=100",
      },
      {
        id: 304,
        name: "Air Intake Systems",
        image: "/perform-img4.png?height=100&width=100",
      },
      {
        id: 305,
        name: "Performance Chips",
        image: "/perform-img5.png?height=100&width=100",
      },
      {
        id: 306,
        name: "Engine Components",
        image: "/perform-img6.png?height=100&width=100",
      },
      {
        id: 307,
        name: "Transmissions",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 308,
        name: "Cooling Systems",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 309,
        name: "Turbo & Superchargers",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 4,
    name: "Lighting",
    image: "/lighting.png?height=200&width=200",
    subcategories: [
      {
        id: 401,
        name: "Headlights",
        image: "/light-1.png?height=100&width=100",
      },
      {
        id: 402,
        name: "Tail Lights",
        image: "/light-2.png?height=100&width=100",
      },
      {
        id: 403,
        name: "LED Lighting",
        image: "/light-3.png?height=100&width=100",
      },
      {
        id: 404,
        name: "Light Bars",
        image: "/light-4.png?height=100&width=100",
      },
      {
        id: 405,
        name: "Fog Lights",
        image: "/light-5.png?height=100&width=100",
      },
    ],
  },
  {
    id: 5,
    name: "Wheel & Tires",
    image: "/wheels-and-tires.png?height=200&width=200",
    subcategories: [
      {
        id: 501,
        name: "Custom Wheels",
        image: "/wheel-1.png?height=100&width=100",
      },
      { id: 502, name: "Tires", image: "/wheel-2.png?height=100&width=100" },
      {
        id: 503,
        name: "Wheel Accessories",
        image: "/wheel-3.png?height=100&width=100",
      },
      {
        id: 504,
        name: "TPMS Sensors",
        image: "/wheel-4.png?height=100&width=100",
      },
      {
        id: 505,
        name: "Factory wheels",
        image: "/wheel-5.png?height=100&width=100",
      },
      {
        id: 506,
        name: "Wheels cover",
        image: "/wheel-6.png?height=100&width=100",
      },
    ],
  },
  {
    id: 6,
    name: "Repair Parts",
    image: "/repair-parts.png?height=200&width=200",
    subcategories: [
      {
        id: 601,
        name: "Suspension Parts",
        image: "/repair-1.png?height=100&width=100",
      },
      {
        id: 602,
        name: "Brake Parts",
        image: "/repair-1.png?height=100&width=100",
      },
      {
        id: 603,
        name: "Engine Parts",
        image: "/repair-1.png?height=100&width=100",
      },
      {
        id: 604,
        name: "Exhaust Parts",
        image: "/repair-1.png?height=100&width=100",
      },
      {
        id: 605,
        name: "Turbochargers & Superchargers",
        image: "/repair-1.png?height=100&width=100",
      },
      {
        id: 606,
        name: "Engine Cooling",
        image: "/repair-1.png?height=100&width=100",
      },
    ],
  },
  {
    id: 7,
    name: "Audio",
    image: "/audio.png?height=200&width=200",
    subcategories: [
      {
        id: 701,
        name: "Installation Parts ",
        image: "/audio-1.png?height=100&width=100",
      },
      { id: 702, name: "Stereos", image: "/audio-2.png?height=100&width=100" },
      { id: 703, name: "Speakers", image: "/audio-3.png?height=100&width=100" },
      {
        id: 704,
        name: "Amplifiers",
        image: "/audio-4.png?height=100&width=100",
      },
      {
        id: 705,
        name: "Subwoofers",
        image: "/audio-5.png?height=100&width=100",
      },
      {
        id: 706,
        name: "Equalizers & Processors",
        image: "/audio-5.png?height=100&width=100",
      },
    ],
  },
  {
    id: 8,
    name: "Automotive Tools",
    image: "/automotive-tools.png?height=200&width=200",
    subcategories: [
      {
        id: 801,
        name: "Oil Change Tools",
        image: "/auto-1.png?height=100&width=100",
      },
      {
        id: 802,
        name: "Spark Plug & Ignition Tools",
        image: "/auto-2.png?height=100&width=100",
      },
      {
        id: 803,
        name: "Wheel & Service Tools",
        image: "/auto-3.png?height=100&width=100",
      },
      {
        id: 804,
        name: "Battery Chargers & Jump Start",
        image: "/auto-4.png?height=100&width=100",
      },
      {
        id: 805,
        name: "Engine Service Tools",
        image: "/auto-5.png?height=100&width=100",
      },
      {
        id: 806,
        name: "Brake Service Tools",
        image: "/auto-6.png?height=100&width=100",
      },
    ],
  },
];

export default function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Find the selected category object
  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  // Handle category click
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-yellow-500 mb-12">
          Shop by Category
        </h2>

        {selectedCategory === null ? (
          // Main categories view
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28 mb-4 overflow-hidden border rounded-lg p-2 hover:shadow-md transition-shadow">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-xl font-medium text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-yellow-500">
                {currentCategory?.name}
              </h3>
              <Button
                onClick={handleBackClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory?.subcategories.map((subcat) => (
                <Link
                  href={`/search?category=${currentCategory.id}&subcategory=${subcat.id}`}
                  key={subcat.id}
                  className="group flex items-center space-x-4" // Added flex and spacing
                >
                  <div className="relative w-28 h-28 mb-4 overflow-hidden border rounded-lg p-2 hover:shadow-md transition-shadow">
                    <Image
                      src={subcat.image || "/placeholder.svg"}
                      alt={subcat.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <h4 className="text-lg font-medium transition-colors">
                    {subcat.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
