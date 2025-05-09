"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { getCategories, getSubCategories } from "../api/categories";

interface Category {
  id: number;
  name: string;
  image: string;
  parent_name: string;
}

interface SubCategory {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export default function CategorySection() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [blobImages, setBlobImages] = useState<Record<string, string>>({});

  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories({ search: "" });
        console.log("Fetched categories:", response);

        // Process categories to handle blob URLs
        const cats = response.result || [];
        const newBlobImages = { ...blobImages };

        cats.forEach((cat: Category) => {
          if (cat.image && cat.image.startsWith("blob:")) {
            // Store blob URLs in state
            newBlobImages[`cat-${cat.id}`] = cat.image;
          }
        });

        setBlobImages(newBlobImages);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle back button click
  const handleBackClick = () => {
    setCategoryId(null);
    setSelectedCategoryName("");
  };

  const handleCategoryClick = (id: number, name: string) => {
    setCategoryId(name);
    setSelectedCategoryName(name);
  };

  useEffect(() => {
    if (!categoryId || typeof window === "undefined") return;

    const fetchSubCategories = async () => {
      try {
        const response = await getSubCategories({
          search: `parent_name:${categoryId}`,
        });
        console.log("Fetched subcategories:", response);

        // Process subcategories to handle blob URLs
        const subcats = response.result || [];
        const newBlobImages = { ...blobImages };

        subcats.forEach((subcat: SubCategory) => {
          if (subcat.image && subcat.image.startsWith("blob:")) {
            // Store blob URLs in state
            newBlobImages[`subcat-${subcat.id}`] = subcat.image;
          }
        });

        setBlobImages(newBlobImages);
        setSubCategories(subcats);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  // Handle image error
  const handleImageError = (id: string) => {
    console.log(`Image failed to load for ID: ${id}`);
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Render placeholder for missing or error images
  const renderPlaceholder = (name: string) => (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
      <span className="text-2xl font-semibold text-gray-500">
        {name.charAt(0)}
      </span>
    </div>
  );

  // Get appropriate image component based on URL type
  const renderImage = (image: string | null, name: string, id: string) => {
    // If image has already errored or is null/empty, show placeholder
    if (imageErrors[id] || !image) {
      return renderPlaceholder(name);
    }

    // Check if we have a blob URL stored for this ID
    const blobUrl = blobImages[id];

    // If we have a stored blob URL, use it
    if (blobUrl) {
      console.log(`Rendering blob image for ${id}:`, blobUrl);
      return (
        <img
          src={blobUrl || "/placeholder.svg"}
          alt={name}
          className="object-contain w-full h-full p-1"
          onError={() => handleImageError(id)}
        />
      );
    }

    // For regular image URLs
    if (image.startsWith("http") || image.startsWith("/")) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-contain p-1"
            onError={() => handleImageError(id)}
          />
        </div>
      );
    }

    // For empty or invalid URLs
    return renderPlaceholder(name);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-yellow-500 mb-12">
          Shop by Category
        </h2>

        {categoryId === null ? (
          // Main categories view
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories
              .filter((category) => category.parent_name === null)
              .map((category) => (
                <div
                  key={category.id}
                  className="group cursor-pointer"
                  onClick={() =>
                    handleCategoryClick(category.id, category.name)
                  }
                >
                  <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 mb-4 overflow-hidden border rounded-lg p-2 hover:shadow-md transition-shadow">
                      {renderImage(
                        `${img}${category.image}`,
                        category.name,
                        `cat-${category.id}`
                      )}
                    </div>

                    <h3 className="text-xl font-medium text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-yellow-500">
                {selectedCategoryName}
              </h3>
              <Button
                onClick={handleBackClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>

            {subCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subCategories.map((subcat) => (
                  <Link
                    href={`/search?category=${categoryId}&subcategory=${subcat.name}`}
                    key={subcat.id}
                    className="group flex items-center space-x-4"
                  >
                    <div className="relative w-28 h-28 overflow-hidden border rounded-lg p-2 hover:shadow-md transition-shadow">
                      {renderImage(
                        `${img}${subcat.image}`,
                        subcat.name,
                        `subcat-${subcat.id}`
                      )}
                    </div>
                    <h4 className="text-lg font-medium transition-colors">
                      {subcat.name}
                    </h4>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-500">
                  No subcategories found for this category
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
