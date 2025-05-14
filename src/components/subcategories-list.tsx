"use client";

import { useEffect, useState } from "react";
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
import { getCategories } from "../api/categories";

interface subCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  parent_name: string;
  categoryName: string;
}

const ITEMS_PER_PAGE = 50;

export function SubcategoriesList() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [subCategories, setsubCategories] = useState<subCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getCategories({ search: "" });
        const cat = response.result || [];
        setsubCategories(cat);
      } catch (error) {
        console.log("error fetching sub Categories", error);
      }
    };
    fetchSubCategories();
  }, []);

  console.log("sub categories are", subCategories);

  const filteredCategories = subCategories.filter(
    (cat) => cat.parent_name !== null
  );
  const filteredCount = filteredCategories.length;

  const totalPages = Math.ceil(filteredCount / ITEMS_PER_PAGE);
  const currentItems = subCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        {currentItems
          .filter((subcategory) => subcategory.parent_name !== null)
          .map((subcategory) => (
            <Card
              key={subcategory.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center p-4 md:w-32">
                    <div className="w-20 h-20 flex items-center justify-center">
                      <Image
                        src={`${img}${subcategory.image}`}
                        alt={subcategory.name}
                        width={80}
                        height={80}
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
                          Sub Category: {subcategory.categoryName}
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
                    {/* <div className="mt-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subcategory.enabled
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subcategory.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {subCategories.length === 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <p className="text-zinc-400">
                No subcategories found for the selected category.
              </p>
            </CardContent>
          </Card>
        )}

        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center gap-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className="min-w-[80px] h-10 px-4 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 text-sm"
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                  className={`w-10 h-10 text-sm flex items-center justify-center rounded-md border ${
                    currentPage === index + 1
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className="min-w-[80px] h-10 px-4 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 text-sm"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
