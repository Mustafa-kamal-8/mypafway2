"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit, Plus, Search, Trash } from "lucide-react";

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
import toast from "react-hot-toast";

import {
  deleteProducts,
  deleteProductsUpdates,
  getProducts,
} from "../api/products";
import { debounce } from "@/src/lib/utils";
import { ProductFormButton } from "../components/add-product-button";

export function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const itemsPerPage = 50;
  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  const fetchProducts = async (page = currentPage) => {
    setIsLoading(true);
    try {
      const searchParam = searchTerm
        ? `(name~*${searchTerm}*|description~*${searchTerm}*)`
        : "";
      const response = await getProducts({
        search: searchParam,
        page: `${page},${itemsPerPage}`,
      });
    

      const fetchedProducts = response.result || [];
      
      setProducts(fetchedProducts);
      setTotalItems(response.count || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const debouncedFetch = debounce(() => fetchProducts(1), 3000);
      debouncedFetch();
    } else {
      fetchProducts(1);
    }
  }, [searchTerm]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePaginationItems = () => {
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(maxPagesToShow - 1, totalPages - 1);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - maxPagesToShow + 2);
      }

      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const handleEditClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsFormOpen(true);
    // Trigger the dialog to open
    document.getElementById("edit-product-trigger")?.click();
  };

  const openDeleteModal = (productId: string) => {
    setSelectedProductId(productId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProductId(undefined);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProductId) return;

    try {
      setIsLoading(true);

      const formData = {
        is_deleted: 1,
        id: selectedProductId,
      };

      const response = await deleteProductsUpdates(formData);
      console.log("Deleted product response:", response);

      if (response?.err === false) {
        toast.success("Product Deleted successfully!");
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
      closeDeleteModal();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-100">Products</h2>
        <div className="items-center text-white">Total Item:{totalItems}</div>
        <div className="flex gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search products by name..."
              className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
            onClick={() => {
              setSelectedProductId(undefined);
              setIsFormOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
        <div className="hidden">
          <ProductFormButton
            productId={selectedProductId}
            open={isFormOpen}
            setOpen={setIsFormOpen}
            fetchProducts={() => fetchProducts(currentPage)}
          />
        </div>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Confirm Deletion
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium bg-zinc-200 dark:bg-zinc-700 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600"
                onClick={closeDeleteModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400 w-[80px]">Image</TableHead>
              <TableHead className="text-zinc-400">Name</TableHead>
              <TableHead className="text-zinc-400">Category</TableHead>
              <TableHead className="text-zinc-400 hidden md:table-cell">
                Model
              </TableHead>
              <TableHead className="text-zinc-400 hidden md:table-cell">
                Price
              </TableHead>
              <TableHead className="text-zinc-400 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-zinc-800 bg-zinc-900">
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-zinc-400"
                >
                  Loading products...
                </TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50"
                >
                  <TableCell>
                    <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
                      {product.image_url ? (
                        <Image
                          src={
                            !product?.image_url
                              ? "/placeholder.svg"
                              : product?.image_url?.includes("https")
                              ? product?.image_url
                              : `${img}${product?.image_url}`
                          }
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-500 text-center px-1">
                          {product.name}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium text-zinc-200 max-w-[200px] truncate">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {product.category || "N/A"}
                  </TableCell>
                  <TableCell className="text-zinc-400 hidden md:table-cell">
                    {product.model || "N/A"}
                  </TableCell>
                  <TableCell className="text-zinc-400 hidden md:table-cell">
                    {product.price || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
                        onClick={() => handleEditClick(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-zinc-800 border-zinc-700 text-red-400 hover:bg-zinc-700 hover:text-red-300"
                        onClick={() => openDeleteModal(product.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-zinc-800 bg-zinc-900">
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-zinc-400"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 0 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="overflow-x-auto flex-nowrap max-w-full">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  className={`bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 ${
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }`}
                />
              </PaginationItem>

              {generatePaginationItems().map((page, index) =>
                page === "ellipsis-start" || page === "ellipsis-end" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <span className="px-4 py-2 text-zinc-400">...</span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(page as number)}
                      isActive={currentPage === page}
                      className={
                        currentPage === page
                          ? "bg-yellow-500 text-black hover:bg-yellow-600 cursor-pointer"
                          : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 cursor-pointer"
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  className={`bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
