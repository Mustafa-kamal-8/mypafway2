"use client";

import { useEffect, useState } from "react";
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
import { getCategories } from "../api/categories";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ITEMS_PER_PAGE = 10;

export function CategoriesList() {
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories({ search: "" });
        const cats = response.result || [];
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const currentItems = categories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Tabs
      defaultValue="categories"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <div className="text-lg font-semibold text-white">Categories</div>

      <TabsContent value="categories" className="space-y-4">
        {currentItems
          .filter((category) => category.parent_id === null)
          .map((category) => (
            <Card
              key={category.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center p-4 md:w-24">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Image
                        src={`${img}${category.image}`}
                        alt={category.name}
                        width={80}
                        height={80}
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
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-zinc-800 border-zinc-700 text-red-400 hover:bg-zinc-700 hover:text-red-300"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

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
