"use client";

import { useState, useEffect } from "react";
import { X, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { useCartStore } from "@/src/store/cartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getProducts } from "@/src/api/products";

interface Product {
  id: number;
  name: string;
  category: string;
  sub_category: string;
  price: string;
  image?: string;
  program_name?: string;
  description?: string;
  details?: string;
  created_at?: string;
  updated_at?: string;
}

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts({ search: "" });
        console.log("Fetched products:", response);
        setProducts(response.result || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const productWithQuantity = {
      ...product,
      quantity: 1,
    };
    // addToCart(productWithQuantity);
  };

  // Toggle compare item
  const toggleCompareItem = (itemId: number) => {
    setCompareItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : compareItems.length < 4
        ? [...prev, itemId]
        : prev
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      <main className="flex-1 pt-64 md:pt-64 lg:pt-44 py-12">
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">
              Products
            </h2>

            {products.length === 0 ? (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
                <p className="text-gray-600">
                  No products are available at the moment.
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  Found {products.length} Results
                </h3>
              </div>
            )}

            <div className="flex flex-col gap-8">
              {/* Compare Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                  <h3 className="text-2xl font-bold text-yellow-500">
                    Compare
                  </h3>
                  <span className="text-gray-600">
                    {compareItems.length}/4 items
                  </span>
                </div>

                {compareItems.length === 0 ? (
                  <p className="text-gray-600 mb-4">
                    Add items to start comparing.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {compareItems.map((itemId) => {
                      const product = products.find((p) => p.id === itemId);
                      return product ? (
                        <div key={itemId} className="relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.program_name}
                            className="w-full h-20 object-cover rounded"
                          />
                          <button
                            onClick={() => toggleCompareItem(itemId)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-sm mt-1 truncate">
                            {product.name}
                          </p>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                      disabled={compareItems.length < 2}
                    >
                      Compare Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Product Comparison</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[70vh] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Feature</TableHead>
                            {compareItems.map((itemId) => {
                              const product = products.find(
                                (p) => p.id === itemId
                              );
                              return product ? (
                                <TableHead key={itemId}>
                                  {product.name}
                                </TableHead>
                              ) : null;
                            })}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Image</TableCell>
                            {compareItems.map((itemId) => {
                              const product = products.find(
                                (p) => p.id === itemId
                              );
                              return product ? (
                                <TableCell key={itemId}>
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded"
                                  />
                                </TableCell>
                              ) : null;
                            })}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Price</TableCell>
                            {compareItems.map((itemId) => {
                              const product = products.find(
                                (p) => p.id === itemId
                              );
                              return product ? (
                                <TableCell key={itemId}>
                                  ${product.price}
                                </TableCell>
                              ) : null;
                            })}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Category
                            </TableCell>
                            {compareItems.map((itemId) => {
                              const product = products.find(
                                (p) => p.id === itemId
                              );
                              return product ? (
                                <TableCell key={itemId}>
                                  {product.category}
                                </TableCell>
                              ) : null;
                            })}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Sub Category
                            </TableCell>
                            {compareItems.map((itemId) => {
                              const product = products.find(
                                (p) => p.id === itemId
                              );
                              return product ? (
                                <TableCell key={itemId}>
                                  {product.sub_category}
                                </TableCell>
                              ) : null;
                            })}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Details
                            </TableCell>
                            {compareItems.map((itemId) => {
                              const product = products.find(
                                (p) => p.id === itemId
                              );
                              return product ? (
                                <TableCell key={itemId}>
                                  {product.details || "N/A"}
                                </TableCell>
                              ) : null;
                            })}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Products Grid */}
              <div className="max-w-7xl mx-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
                    <span className="ml-2 text-xl font-medium">
                      Loading products...
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                      >
                        <div className="relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="text-sm text-gray-700 p-2">
                              Compare
                            </span>
                            <Checkbox
                              id={`compare-${product.id}`}
                              checked={compareItems.includes(product.id)}
                              onCheckedChange={() => {
                                if (
                                  compareItems.includes(product.id) ||
                                  compareItems.length < 4
                                ) {
                                  toggleCompareItem(product.id);
                                }
                              }}
                              disabled={
                                !compareItems.includes(product.id) &&
                                compareItems.length >= 4
                              }
                              className="bg-white"
                            />
                            <label
                              htmlFor={`compare-${product.id}`}
                              className="sr-only"
                            >
                              Add to compare
                            </label>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.program_name}
                          </h3>
                          <p className="text-gray-600 mt-1">${product.price}</p>
                          <div className="mt-4 flex space-x-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  onClick={() => setSelectedProduct(product)}
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
                                >
                                  Details
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    {selectedProduct?.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <img
                                      src={
                                        selectedProduct?.image ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                      }
                                      alt={selectedProduct?.program_name}
                                      className="w-full h-auto object-cover rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-2xl font-bold mb-2">
                                      ${selectedProduct?.price}
                                    </h3>
                                    <div className="space-y-2 mt-4">
                                      <div className="flex">
                                        <span className="font-medium w-1/3">
                                          Category:
                                        </span>
                                        <span className="w-2/3">
                                          {selectedProduct?.category}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <span className="font-medium w-1/3">
                                          Sub Category:
                                        </span>
                                        <span className="w-2/3">
                                          {selectedProduct?.sub_category}
                                        </span>
                                      </div>
                                      {selectedProduct?.details && (
                                        <div className="flex">
                                          <span className="font-medium w-1/3">
                                            Details:
                                          </span>
                                          <span className="w-2/3">
                                            {selectedProduct.details}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <Button
                                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                                      onClick={() => {
                                        handleAddToCart(selectedProduct!);
                                        document
                                          .querySelector(
                                            '[role="dialog"] button[data-state="open"]'
                                          )
                                          ?.click();
                                      }}
                                    >
                                      <ShoppingCart className="w-4 h-4 mr-2" />
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
