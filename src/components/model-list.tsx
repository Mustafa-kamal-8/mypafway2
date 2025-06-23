"use client";

import { useEffect, useState } from "react";
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
import { getMake } from "../api/make";

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  parent_name: string | null;
}

const ITEMS_PER_PAGE = 10;

export function ModelList() {
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getMake({ search: "" });
        const cats = response.result || [];
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (cat) => cat.parent_name !== null
  );

  const filteredCount = filteredCategories.length;
  const totalPages = Math.ceil(filteredCount / ITEMS_PER_PAGE);

  const currentItems = filteredCategories.slice(
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
      <div className="text-lg font-semibold text-white mb-4">Models</div>

      <TabsContent value="categories" className="space-y-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-800 text-zinc-200">
                  <th className="py-3 px-4 border-b border-zinc-700">
                    Model Name
                  </th>
                  <th className="py-3 px-4 border-b border-zinc-700">
                    Make Name
                  </th>
                  <th className="py-3 px-4 border-b border-zinc-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center text-zinc-400 py-4 px-4"
                    >
                      No models found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-zinc-800 transition-colors"
                    >
                      <td className="py-3 px-4 border-b border-zinc-800 text-zinc-100">
                        {category.name}
                      </td>
                      <td className="py-3 px-4 border-b border-zinc-800 text-zinc-100">
                        {category.parent_name}
                      </td>
                      <td className="py-3 px-4 border-b border-zinc-800">
                        <div className="flex items-center space-x-2">
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

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
    </Tabs>
  );
}
