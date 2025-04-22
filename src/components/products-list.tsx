"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit, Search, Trash } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { getProducts } from "../api/products";

// Sample data
const products = [
  {
    id: 1,
    name: "AC Service",
    category: "AC & Appliances Repair",
    subcategory: "AC Repair",
    price: 49.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    name: "Deep Home Cleaning",
    category: "Cleaning Services",
    subcategory: "Deep Cleaning",
    price: 99.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    name: "Electrical Wiring",
    category: "Electrician, Plumber, Carpenter & Painter",
    subcategory: "Electrical Repairs",
    price: 79.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 4,
    name: "Haircut & Styling",
    category: "Unisex Salon",
    subcategory: "Hair Services",
    price: 29.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 5,
    name: "Pest Control Treatment",
    category: "Pest Control Service",
    subcategory: "General Pest Control",
    price: 149.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  // Car-related products
  {
    id: 6,
    name: "Engine Overhaul Service",
    category: "Engine & Performance Parts",
    subcategory: "Engine Repair",
    price: 799.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 7,
    name: "Turbocharger Installation",
    category: "Engine & Performance Parts",
    subcategory: "Turbocharger Services",
    price: 499.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 8,
    name: "Brake Pad Replacement",
    category: "Brakes & Suspension",
    subcategory: "Brake Services",
    price: 149.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 9,
    name: "Suspension Upgrade",
    category: "Brakes & Suspension",
    subcategory: "Suspension Services",
    price: 399.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 10,
    name: "LED Headlight Installation",
    category: "Electrical & Lighting",
    subcategory: "Lighting Services",
    price: 149.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 11,
    name: "Battery Replacement",
    category: "Electrical & Lighting",
    subcategory: "Electrical Services",
    price: 129.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 12,
    name: "Alloy Wheels Installation",
    category: "Tires & Wheels",
    subcategory: "Wheels & Tires",
    price: 699.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 13,
    name: "Tire Replacement",
    category: "Tires & Wheels",
    subcategory: "Tires",
    price: 199.99,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
];

export function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");



  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">Products</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400 w-[80px]">Image</TableHead>
              <TableHead className="text-zinc-400">Name</TableHead>
              <TableHead className="text-zinc-400">Category</TableHead>
              <TableHead className="text-zinc-400 hidden md:table-cell">
                Subcategory
              </TableHead>
              <TableHead className="text-zinc-400 hidden md:table-cell">
                Price
              </TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50"
              >
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium text-zinc-200">
                  {product.name}
                </TableCell>
                <TableCell className="text-zinc-400">
                  {product.category}
                </TableCell>
                <TableCell className="text-zinc-400 hidden md:table-cell">
                  {product.subcategory}
                </TableCell>
                <TableCell className="text-zinc-400 hidden md:table-cell">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                </TableCell>
              </TableRow>
            ))}

            {filteredProducts.length === 0 && (
              <TableRow className="border-zinc-800 bg-zinc-900">
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-zinc-400"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
  );
}
