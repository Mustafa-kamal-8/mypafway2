"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

// Sample data
const categories = [
  {
    id: 1,
    name: "Engine & Performance Parts",
    description:
      "Upgrade your vehicle with high-performance engine parts, including air filters, turbochargers, exhaust systems, and more. Boost your car's power and efficiency with our premium selection.",
    enabled: true,
  },
  {
    id: 2,
    name: "Brakes & Suspension",
    description:
      "Ensure safety and smooth driving with our range of high-quality brake pads, rotors, shock absorbers, and suspension kits. We provide durable parts for a better driving experience.",
    enabled: true,
  },
  {
    id: 3,
    name: "Electrical & Lighting",
    description:
      "Find the best automotive electrical components, including batteries, alternators, spark plugs, headlights, LED lights, and wiring harnesses, to keep your car running smoothly.",
    enabled: true,
  },
  {
    id: 4,
    name: "Body & Exterior Parts",
    description:
      "Enhance your vehicle's appearance and aerodynamics with our selection of bumpers, fenders, spoilers, side mirrors, and body kits. Improve both style and functionality.",
    enabled: true,
  },
  {
    id: 5,
    name: "Tires & Wheels",
    description:
      "Get the perfect grip on the road with our premium tires and alloy wheels. Choose from top brands to improve your car's performance, handling, and aesthetics.",
    enabled: true,
  },
];

export function CategoriesList() {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <Tabs
      defaultValue="categories"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <div className="text-lg font-semibold text-white">Categories</div>

      <TabsContent value="categories" className="space-y-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="bg-zinc-900 border-zinc-800 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center p-4 md:w-24">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={category.name}
                      width={40}
                      height={40}
                      className="text-black"
                    />
                  </div>
                </div>
                <div className="flex-1 p-4 border-l border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h3 className="text-lg font-semibold text-zinc-100">
                      {category.name}
                    </h3>
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
                    {category.description}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.enabled
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

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
              <PaginationLink
                href="#"
                className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
              >
                3
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
      </TabsContent>

      <TabsContent value="subcategories" className="space-y-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <p className="text-zinc-400">
              No subcategories found. Add a subcategory to get started.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
