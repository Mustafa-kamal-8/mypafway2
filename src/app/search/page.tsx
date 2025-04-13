"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Slider } from "@/src/components/ui/slider";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/cartStore";

// Sample data for dropdowns
const years = Array.from({ length: 30 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);
const makes = [
  "Acura",
  "Audi",
  "BMW",
  "Chevrolet",
  "Dodge",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
];
const models = [
  "Accord",
  "Camry",
  "Civic",
  "Corolla",
  "CR-V",
  "F-150",
  "Mustang",
  "RAV4",
  "Silverado",
  "Wrangler",
];

// Sample categories for filtering
const categories = [
  { id: 1, name: "Interior", count: 245 },
  { id: 2, name: "Exterior", count: 189 },
  { id: 3, name: "Performance", count: 312 },
  { id: 4, name: "Lighting", count: 156 },
  { id: 5, name: "Wheel & Tires", count: 203 },
  { id: 6, name: "Repair Parts", count: 278 },
  { id: 7, name: "Audio", count: 124 },
  { id: 8, name: "Automotive Tools", count: 167 },
];

// Sample brands for filtering
const brands = [
  { id: 1, name: "K&N", count: 87 },
  { id: 2, name: "Bosch", count: 124 },
  { id: 3, name: "Brembo", count: 56 },
  { id: 4, name: "Bilstein", count: 43 },
  { id: 5, name: "Magnaflow", count: 38 },
  { id: 6, name: "Edelbrock", count: 62 },
  { id: 7, name: "Flowmaster", count: 47 },
  { id: 8, name: "Meguiar's", count: 29 },
  { id: 9, name: "Optima", count: 34 },
  { id: 10, name: "Sparco", count: 41 },
];

// Sample products (empty for no results scenario)
const products = [
  {
    id: 1,
    name: "Product A",
    category: "electronics",
    subcategory: "mobile",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product B",
    category: "electronics",
    subcategory: "laptop",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product C",
    category: "fashion",
    subcategory: "shoes",
    image: "https://via.placeholder.com/150",
  },
];

interface Product {
  id: number;
  name: string;
  category: number;
  subcategory: number;
  price: number;
  image: string;
}

export default function SearchPage() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [compareItems, setCompareItems] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const { category, subcategory } = useParams();

  const { addToCart } = useCartStore();

  const handleAddToCart = (product: any) => {
    const productWithQuantity = {
      ...product,
      quantity: 1,
    };
    addToCart(productWithQuantity);
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Brake Pads",
      category: 1,
      subcategory: 101,
      price: 49.99,
      image: "/brake.jpg",
    },
    {
      id: 2,
      name: "Engine Oil",
      category: 1,
      subcategory: 101,
      price: 79.99,
      image: "/images/engine-oil.jpg",
    },
    {
      id: 3,
      name: "Air Filter",
      category: 1,
      subcategory: 101,
      price: 29.99,
      image: "/images/air-filter.jpg",
    },
    {
      id: 4,
      name: "Car Battery",
      category: 1,
      subcategory: 101,
      price: 129.99,
      image: "/battery.jpg",
    },
    {
      id: 5,
      name: "Spark Plug",
      category: 1,
      subcategory: 101,
      price: 14.99,
      image: "/images/spark-plug.jpg",
    },
    {
      id: 6,
      name: "Windshield Wipers",
      category: 1,
      subcategory: 101,
      price: 24.99,
      image: "/images/windshield-wipers.jpg",
    },
  ];

  console.log("Category:", category);
  console.log("Subcategory:", subcategory);

  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get("category");
      const subcategory = urlParams.get("subcategory");

      const categoryNum = category ? Number(category) : null;
      const subcategoryNum = subcategory ? Number(subcategory) : null;

      const results = products.filter((product) => {
        return (
          (categoryNum === null || product.category === categoryNum) &&
          (subcategoryNum === null || product.subcategory === subcategoryNum)
        );
      });

      setFilteredProducts(results);
    }
  }, [router]);

  // Check if we're on mobile for responsive design
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Toggle category selection
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle brand selection
  const toggleBrand = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
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
        {/* Vehicle Selector */}
        <section className="bg-gray-700 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-yellow-400 mb-6">
              Select Vehicle
            </h1>

            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full md:w-1/3">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-white h-12">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-1/3">
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger className="bg-white h-12">
                    <SelectValue placeholder="Select Make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-1/3">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-white h-12">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="h-12 w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">
              Search results
            </h2>

            {products.length === 0 ? (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">No Search Results</h3>
                <p className="text-gray-600">
                  Your search did not match any auto parts. Try again.
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  Found {products.length} Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Product cards would go here */}
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
              {/* Mobile Filter Toggle */}
              <div className="md:hidden w-full mb-4">
                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  {isFilterOpen ? (
                    <>
                      <X className="mr-2 h-4 w-4" /> Close Filters
                    </>
                  ) : (
                    <>
                      <Filter className="mr-2 h-4 w-4" /> Show Filters
                    </>
                  )}
                </Button>
              </div>

              {/* Filters Section */}
              <div
                className={`w-full md:w-1/4 ${
                  isMobile && !isFilterOpen ? "hidden" : "block"
                }`}
              >
                <div className="space-y-6">
                  {/* Categories Filter */}
                  <div>
                    <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                      <h3 className="text-2xl font-bold text-yellow-500">
                        Categories
                      </h3>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() =>
                                toggleCategory(category.id)
                              }
                              className="mr-2"
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                          <span className="text-xs text-gray-500">
                            ({category.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brands Filter */}
                  <div>
                    <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                      <h3 className="text-2xl font-bold text-yellow-500">
                        Brands
                      </h3>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div
                          key={brand.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Checkbox
                              id={`brand-${brand.id}`}
                              checked={selectedBrands.includes(brand.id)}
                              onCheckedChange={() => toggleBrand(brand.id)}
                              className="mr-2"
                            />
                            <label
                              htmlFor={`brand-${brand.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {brand.name}
                            </label>
                          </div>
                          <span className="text-xs text-gray-500">
                            ({brand.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                      <h3 className="text-2xl font-bold text-yellow-500">
                        Price Range
                      </h3>
                      <span className="text-gray-400">-</span>
                    </div>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                    Filter
                  </Button>
                </div>
              </div>

              {/* Results and Compare Section */}
              <div className="w-full md:w-3/4">
                {/* Compare Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <div className="flex justify-between items-center border-b border-yellow-400 pb-2 mb-4">
                    <h3 className="text-2xl font-bold text-yellow-500">
                      Compare
                    </h3>
                    <span className="text-gray-600">Up to 4 items</span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Add items to start comparing.
                  </p>

                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                    Compare Now
                  </Button>
                </div>
                <div className="max-w-7xl mx-auto p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Search Results
                  </h2>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              ${product.price.toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleAddToCart(product)} // Add product to cart on click using Zustand's store
                              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center mt-6 text-lg">
                      No products found.
                    </p>
                  )}
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
