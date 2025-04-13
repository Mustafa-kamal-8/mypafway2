"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

// Sample data
const subcategories = [
  {
    id: 1,
    name: "Engine Overhaul",
    categoryName: "Engine & Performance Parts",
    description:
      "Complete engine rebuilds and performance upgrades for enhanced power and efficiency.",
    enabled: true,
  },
  {
    id: 2,
    name: "Turbocharger Installation",
    categoryName: "Engine & Performance Parts",
    description:
      "Install high-performance turbochargers for a significant boost in your car's engine power.",
    enabled: true,
  },
  {
    id: 3,
    name: "Brake Pad Replacement",
    categoryName: "Brakes & Suspension",
    description:
      "High-quality brake pads replacement to ensure the safety and efficiency of your braking system.",
    enabled: true,
  },
  {
    id: 4,
    name: "Suspension Upgrade",
    categoryName: "Brakes & Suspension",
    description:
      "Upgrade your suspension system for better handling, stability, and comfort on the road.",
    enabled: true,
  },
  {
    id: 5,
    name: "LED Headlight Installation",
    categoryName: "Electrical & Lighting",
    description:
      "Install bright and energy-efficient LED headlights for improved night visibility and style.",
    enabled: true,
  },
  {
    id: 6,
    name: "Battery Replacement",
    categoryName: "Electrical & Lighting",
    description:
      "Replace old or faulty car batteries to ensure reliable engine starts and optimal electrical system performance.",
    enabled: true,
  },
  {
    id: 7,
    name: "Custom Body Kits",
    categoryName: "Body & Exterior Parts",
    description:
      "Install custom body kits for enhanced aesthetics and aerodynamics for your car.",
    enabled: true,
  },
  {
    id: 8,
    name: "Alloy Wheels Installation",
    categoryName: "Tires & Wheels",
    description:
      "Upgrade to stylish alloy wheels that improve your car's performance, handling, and looks.",
    enabled: true,
  },
  {
    id: 9,
    name: "Tire Replacement",
    categoryName: "Tires & Wheels",
    description:
      "Get high-quality tires for better grip, safety, and longevity on the road.",
    enabled: true,
  },
];

export function SubcategoriesList() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSubcategories =
    selectedCategory === "all"
      ? subcategories
      : subcategories.filter(
          (subcat) => subcat.categoryName === selectedCategory
        );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">Subcategories</h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700 text-zinc-200">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="AC & Appliances Repair">
              AC & Appliances Repair
            </SelectItem>
            <SelectItem value="Cleaning Services">Cleaning Services</SelectItem>
            <SelectItem value="Electrician, Plumber, Carpenter & Painter">
              Electrician, Plumber, Carpenter & Painter
            </SelectItem>
            <SelectItem value="Unisex Salon">Unisex Salon</SelectItem>
            <SelectItem value="Pest Control Service">
              Pest Control Service
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredSubcategories.map((subcategory) => (
          <Card
            key={subcategory.id}
            className="bg-zinc-900 border-zinc-800 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center p-4 md:w-24">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={subcategory.name}
                      width={40}
                      height={40}
                      className="text-black"
                    />
                  </div>
                </div>
                <div className="flex-1 p-4 border-l border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">
                        {subcategory.name}
                      </h3>
                      <p className="text-sm text-yellow-400">
                        Category: {subcategory.categoryName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-zinc-800 border-zinc-700 text-red-400 hover:bg-zinc-700 hover:text-red-300"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">
                    {subcategory.description}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subcategory.enabled
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subcategory.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredSubcategories.length === 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <p className="text-zinc-400">
                No subcategories found for the selected category.
              </p>
            </CardContent>
          </Card>
        )}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
