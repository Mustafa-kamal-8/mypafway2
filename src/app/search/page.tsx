"use client";

import { useState, useEffect } from "react";
import { X, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
// import { useCartStore } from "@/src/store/cartStore";
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
import { useSearchParams, useRouter } from "next/navigation";

import Stores from "@/src/store/stores";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getMake } from "@/src/api/make";

interface Product {
  id: number;
  name: string;
  category: string;
  sub_category: string;
  price: string;
  color: string;
  image_url?: string;
  program_name?: string;
  description?: string;
  details?: string;
  created_at?: string;
  updated_at?: string;
  website_url?: string;
  other_categories?: string;
  brand?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

interface makes {
  id: string;
  name: string;
  parent_name: string;
}

interface models {
  id: string;
  name: string;
  parent_name: string;
}

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { addToCart } = useCartStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cartItems, setCartItems } = Stores();

  const [makes, setMakes] = useState<makes[]>([]);
  const [models, setModels] = useState<models[]>([]);

  const [formMake, setMake] = useState<string>("");
  const [formModel, setModel] = useState<string>("");
  const [formYear, setYear] = useState<string>("");
  const [searchFormParams, setSearchParams] = useSearchParams();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subcategory");
  const query = searchParams.get("query");
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const category = searchParams.get("categoryId");

  const getColor = (color?: string) => {
    if (!color) return "transparent";

    const cleaned = color.replace(/[^a-zA-Z]/g, "").toLowerCase();

    const colorMap: Record<string, string> = {
      black: "#000000",
      red: "#FF0000",
      green: "#008000",
      blue: "#0000FF",
      white: "#FFFFFF",
      yellow: "#FFFF00",
      grey: "#808080",
      gray: "#808080",
    };

    return colorMap[cleaned] || "transparent";
  };

  const years = Array.from({ length: 30 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const searchConditions = [];

    if (subcategoryId) {
      searchConditions.push(`sub_category~*${subcategoryId}*`);
    }
    if (formYear) {
      searchConditions.push(`year~*${formYear}*`);
    }
    if (formMake) {
      searchConditions.push(`make~*${formMake}*`);
    }
    if (formModel) {
      searchConditions.push(`model~*${formModel}*`);
    }
    if (query) {
      searchConditions.push(`name~*${query}*`);
    }
    if (year) {
      searchConditions.push(`year:${year}`);
    }
    if (make) {
      searchConditions.push(`make~*${make}*`);
    }
    if (model) {
      searchConditions.push(`model~*${model}*`);
    }
    if (category) {
      searchConditions.push(`category~*${category}*`);
    }

    const searchString = searchConditions.join(",");

    try {
      const response = await getProducts({
        search: searchString,
      });

      console.log("Fetched products:", response);

      if (!response.err) {
        setProducts(response.result || []);
      } else {
        console.error("API Error:", response.result);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [subcategoryId, query, year, make, model, category]);

  useEffect(() => {
    const fetchMake = async () => {
      try {
        const response = await getMake({ search: "" });
        console.log("Fetched make:", response);
        setMakes(response.result || []);
      } catch (error) {
        console.error("Error fetching make:", error);
      }
    };

    fetchMake();
  }, []);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await getMake({ search: `parent_name:${formMake}` });
        console.log("Fetched make:", response);
        setModels(response.result || []);
      } catch (error) {
        console.error("Error fetching make:", error);
      }
    };

    fetchModel();
  }, [formMake]);

  const handleAddToCart = async (product: Product) => {
    if (product.website_url) {
      window.open(product.website_url, "_blank"); // open in new tab
      return;
    }
    const storedCart = localStorage.getItem("cartItems");
    const parsedCart: Product[] = storedCart ? JSON.parse(storedCart) : [];

    const isProductInCart = parsedCart.some((item) => item.id === product.id);

    if (isProductInCart) {
      toast.error("Item is already present in the cart");
      return;
    }
    const updatedCart = [...parsedCart, product];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.success("Product added to cart");
    console.log("Product added to cart:", product.id);
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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (formMake) params.set("make", formMake);
    else params.delete("make");

    if (formModel) params.set("model", formModel);
    else params.delete("model");

    if (formYear) params.set("year", formYear);
    else params.delete("year");

    router.push(`?${params.toString()}`);
    fetchProducts(); // 👈 Call fetch here too
  };

  const fetchProductsWithFilters = async (
    brands: string[],
    categories: string[]
  ) => {
    setIsLoading(true);
    const searchConditions: string[] = [];

    categories.forEach((cat) => {
      if (cat) searchConditions.push(`other_categories~*${cat}*`);
    });

    brands.forEach((brand) => {
      if (brand) searchConditions.push(`brand~*${brand}*`);
    });

    const searchString = searchConditions.join(",");

    try {
      const response = await getProducts({ search: searchString });

      if (!response.err) {
        setProducts(response.result || []);
      } else {
        console.error("API Error:", response.result);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-gray-500">
        <Navbar />
      </div>

      <main className="flex-1 pt-20 sm:pt-8 py-12 mt-36">
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-gray-600 p-10 mb-8 rounded-lg">
              <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                  Select Vehicle
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={formYear} onValueChange={setYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={formMake} onValueChange={setMake}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Make" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes
                        .filter((c) => c.parent_name === null)
                        .map((m) => (
                          <SelectItem key={m.id} value={m.name}>
                            {m.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select value={formModel} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Array.isArray(models) ? models : []).map((m) => (
                        <SelectItem key={m.id} value={m.name}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={handleSearch}
                    className="bg-yellow-400 text-white p-2 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">
              Search results
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
                  {products.length} Results
                </h3>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Categories and Brands */}
              <div className="lg:w-[20%] order-2 lg:order-1">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-44">
                  {/* Categories Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                      <h3 className="text-xl font-bold text-yellow-500">
                        Categories
                      </h3>
                      <span className="text-yellow-500">-</span>
                    </div>

                    <div className="max-h-28 overflow-auto pr-2 space-y-2">
                      {/* Extract unique categories from products */}
                      {Array.from(
                        new Set(
                          products
                            .map((product) => product.other_categories || "")
                            .filter((cat) => cat)
                            .flatMap((cat) => cat.split(","))
                        )
                      ).map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${index}`}
                            checked={selectedCategories.includes(
                              category.trim()
                            )}
                            onCheckedChange={() =>
                              handleCategoryChange(category.trim())
                            }
                          />
                          <label
                            htmlFor={`category-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.trim()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brands Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                      <h3 className="text-xl font-bold text-yellow-500">
                        Brands
                      </h3>
                      <span className="text-yellow-500">-</span>
                    </div>

                    {/* Add scrollable wrapper with fixed height */}
                    <div className="max-h-28 overflow-auto pr-2 space-y-2">
                      {Array.from(
                        new Set(products.map((product) => product.brand || ""))
                      )
                        .filter((brand) => brand)
                        .map((brand, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`brand-${index}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => handleBrandChange(brand)}
                            />
                            <label
                              htmlFor={`brand-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Filter Button */}
                  <Button
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={() =>
                      fetchProductsWithFilters(
                        selectedBrands,
                        selectedCategories
                      )
                    }
                  >
                    Filter
                  </Button>
                </div>
              </div>

              {/* Products Grid - Takes more space */}
              <div className="lg:w-[50%] order-1 lg:order-2">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
                    <span className="ml-2 text-xl font-medium">
                      Loading products...
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                      >
                        <div className="relative">
                          <img
                            // src={product.image_url || "/placeholder.svg"}
                            src={
                              !product.image_url
                                ? "/placeholder.svg"
                                : product.image_url?.includes("https")
                                ? product.image_url
                                : `${img}${product.image_url}`
                            }
                            alt={product.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute top-2 right-2">
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
                              className="bg-white size-6"
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
                            {product.name && product.name.length > 20
                              ? `${product.name.slice(0, 20)}...`
                              : product.name || "Unknown"}
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
                              <DialogContent className="w-full max-w-[100vw] md:max-w-[70vw]  h-[80vh] overflow-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    {selectedProduct?.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <img
                                      src={
                                        !selectedProduct?.image_url
                                          ? "/placeholder.svg"
                                          : selectedProduct?.image_url?.includes(
                                              "https"
                                            )
                                          ? selectedProduct?.image_url
                                          : `${img}${selectedProduct?.image_url}`
                                      }
                                      alt={selectedProduct?.name}
                                      className="w-full h-auto object-cover rounded-lg"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-2xl font-bold mb-2">
                                      ${selectedProduct?.price}
                                    </h3>
                                    {selectedProduct?.color ? (
                                      <div className="flex items-center gap-2 flex-wrap">
                                        {selectedProduct.color
                                          .split(",")
                                          .map((colorItem, index) => {
                                            const rawColor = colorItem.trim();
                                            const normalizedColor =
                                              rawColor.toLowerCase();
                                            return (
                                              <div
                                                key={index}
                                                className="flex items-center gap-1"
                                              >
                                                <div
                                                  className="w-6 h-6 rounded-full border"
                                                  style={{
                                                    backgroundColor:
                                                      getColor(normalizedColor),
                                                  }}
                                                  title={normalizedColor}
                                                />
                                                <span className="text-sm font-medium capitalize">
                                                  {normalizedColor}
                                                </span>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    ) : (
                                      <p className="text-gray-500 text-sm">
                                        No color available
                                      </p>
                                    )}

                                    <div className="space-y-2 mt-4">
                                      <div className="flex">
                                        <span className="font-medium w-1/3">
                                          Category:
                                        </span>
                                        <span className="w-2/3 ml-2">
                                          {selectedProduct?.category?.name}
                                        </span>
                                      </div>

                                      {selectedProduct?.description && (
                                        <div className="flex">
                                          <span className="font-medium w-1/3">
                                            Details:
                                          </span>
                                          <span className="w-2/3">
                                            {selectedProduct.description}
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

              {/* Compare Section - Right sidebar */}
              <div className="lg:w-[30%] order-3">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-44">
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
                    <div className="flex flex-col gap-4 mb-4">
                      {compareItems.map((itemId) => {
                        const product = products.find((p) => p.id === itemId);
                        return product ? (
                          <div
                            key={itemId}
                            className="relative flex items-center gap-2 p-2 border rounded"
                          >
                            <img
                              src={
                                !product?.image_url
                                  ? "/placeholder.svg"
                                  : product?.image_url?.includes("https")
                                  ? product?.image_url
                                  : `${img}${product?.image_url}`
                              }
                              alt={product.name || "placeholder"}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <p className="text-sm flex-1 truncate">
                              {product.name}
                            </p>
                            <button
                              onClick={() => toggleCompareItem(itemId)}
                              className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
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
                              <TableHead className="w-[200px]">
                                Feature
                              </TableHead>
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
                              <TableCell className="font-medium">
                                Image
                              </TableCell>
                              {compareItems.map((itemId) => {
                                const product = products.find(
                                  (p) => p.id === itemId
                                );
                                return product ? (
                                  <TableCell key={itemId}>
                                    <img
                                      src={
                                        !product?.image_url
                                          ? "/placeholder.svg"
                                          : product?.image_url?.includes(
                                              "https"
                                            )
                                          ? product?.image_url
                                          : `${img}${product?.image_url}`
                                      }
                                      alt={product.name || "placeholder"}
                                      className="w-24 h-24 object-cover rounded"
                                    />
                                  </TableCell>
                                ) : null;
                              })}
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Price
                              </TableCell>
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
                                    {product.category.name}
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
                                    {product.description || "N/A"}
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
