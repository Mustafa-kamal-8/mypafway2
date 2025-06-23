"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Check, Plus, X } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCategories, getSubCategories } from "../api/categories";
import { updateProducts, uploadProducts } from "../api/products";
import toast from "react-hot-toast";
import { compressImage, uploadImage } from "../lib/image";
import { getProducts } from "../api/products";
import { getMake, getModel } from "../api/make";

interface categories {
  id: number;
  name: string;
  image: string;
  parent_name: string;
}
interface subcategories {
  id: number;
  name: string;
  image: string;
  parent_name: string;
}

interface make {
  id: number;
  name: string;
  parent_name: string;
}

interface model {
  id: number;
  name: string;
  parent_name: string;
}

interface ProductFormButtonProps {
  productId?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProducts: () => Promise<void>;
}

export function ProductFormButton({
  productId,
  open,
  setOpen,
  fetchProducts,
}: ProductFormButtonProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
    aspect: 4 / 3,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<categories[]>([]);
  const [subCategories, setSubCategories] = useState<subcategories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [price, setPrice] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [make, setMake] = useState<make[]>([]);
  const [model, setModel] = useState<model[]>([]);
  const [year, setYear] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [quantity, setQuantity] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [categoryError, setCategoryError] = useState(false);

  const img = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setCroppedImageUrl(null); // Reset cropped image when new image is selected

        // Set appropriate aspect ratio based on file type/name
        if (file.name.includes("banner")) {
          setCrop((prev) => ({ ...prev, aspect: 16 / 9 }));
        } else if (file.name.includes("thumbnail")) {
          setCrop((prev) => ({ ...prev, aspect: 1 }));
        } else {
          setCrop((prev) => ({ ...prev, aspect: 4 / 3 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (crop: Crop) => {
    setCompletedCrop(crop);
  };

  const getCroppedImg = () => {
    if (!imageRef.current || !completedCrop) return;

    const image = imageRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const croppedImageUrl = URL.createObjectURL(blob);
        setCroppedImageUrl(croppedImageUrl);

        const croppedFile = new File(
          [blob],
          imageFile?.name || "cropped-image.jpg",
          {
            type: "image/jpeg",
            lastModified: Date.now(),
          }
        );

        setImageFile(croppedFile);
      },
      "image/jpeg",
      0.95
    );
  };

  const saveWithoutCrop = () => {
    setCroppedImageUrl(imagePreviewUrl);
  };

  const cancelCrop = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImageFile(null);
    setImagePreviewUrl(null);
    setCroppedImageUrl(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories({ search: "" });
        console.log("Fetched categories:", response);
        setCategories(response.result || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  console.log("categories are ", categories);

  useEffect(() => {
    if (!selectedCategory || typeof window === "undefined") return;

    const fetchSubCategories = async () => {
      try {
        const cleanedCategory = selectedCategory.trim();
        const response = await getSubCategories({
          search: `parent_name:${cleanedCategory}`,
        });
        console.log("Fetched subcategories:", response);
        setSubCategories(response.result || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  useEffect(() => {
    console.log("Make useEffect triggered");
    const fetchMake = async () => {
      try {
        const response = await getMake({ search: "" });
        console.log("Fetched make:", response);
        setMake(response.result || []);
      } catch (error) {
        console.error("Error fetching make:", error);
      }
    };

    fetchMake();
  }, []);

  console.log("makes are----------------------> ", make);

  useEffect(() => {
    if (!selectedMake || typeof window === "undefined") return;

    const fetchModel = async () => {
      try {
        const cleanedMake = selectedMake.trim();
        const response = await getModel({
          search: `parent_name:${cleanedMake}`,
        });
        console.log("Fetched Model:", response);
        setModel(response.result || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchModel();
  }, [selectedMake]);

  console.log("subCategories are ", subCategories);

  console.log(selectedSubCategoryId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          setIsEditMode(true);
          const response = await getProducts({ search: `id:${productId}` });
          console.log("Fetched products:", response);
          setProducts(response.result || []);

          if (response.result && response.result.length > 0) {
            const product = response.result[0];

            setName(product.name || "");
            setPrice(product.price || "");
            setSelectedCategory(product.category || "");
            setSelectedSubCategoryId(product.sub_category || "");
            setDescription(product.description || "");
            setColor(product.color || "");
            setSelectedMake(product.make || "");
            setSelectedModel(product.model || "");
            setYear(product.year || "");
            setBrand(product.brand || "");
            setQuantity(product.quantity || "");
            setWebsiteUrl(product.website_url || "");
            setWeight(product.details?.weight || "");
            setHeight(product.details?.heigth || "");

            if (product.image_url) {
              const imageUrl = !product.image_url
                ? "/placeholder.svg"
                : product.image_url.includes("https")
                ? product.image_url
                : `${img}${product.image_url}`;

              setImagePreviewUrl(imageUrl);
              setCroppedImageUrl(imageUrl);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching products under a id:", error);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setIsEditMode(false);

      setName("");
      setPrice("");
      setDescription("");
      setColor("");
      // setMake("");
      // setModel("");
      setSelectedMake("");
      setSelectedModel("");
      setSelectedSubCategoryId("");
      setSelectedCategory("");
      setYear("");
      setBrand("");
      setQuantity("");
      setWebsiteUrl("");
      setWeight("");
      setHeight("");
      setImagePreviewUrl(null);
      setCroppedImageUrl(null);
      setImageFile(null);
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      const seller_id = currentUser?.id;
      const seller_name = currentUser?.name;

      if (!seller_id || !seller_name) {
        toast.error("User information missing. Please login again.");
        return;
      }

      let url = croppedImageUrl;

      if (
        imageFile &&
        (!croppedImageUrl || !croppedImageUrl.includes("supabase"))
      ) {
        const compressedImage = await compressImage(imageFile);
        url = await uploadImage(compressedImage, "categories");
      }

      const formData = {
        id: isEditMode && products.length > 0 ? products[0].id : undefined,
        category: selectedCategory,
        sub_category: selectedSubCategoryId,
        name,
        price,
        description,
        image_url: url,
        color,
        make: selectedMake,
        model: selectedModel,
        year,
        quantity,
        website_url: websiteUrl,
        seller_id,
        seller_name,
        details: {
          weight: weight,
          heigth: height,
        },
      };

      console.log("Sending payload to backend:", formData);

      let response;

      if (isEditMode) {
        response = await updateProducts(formData);
      } else {
        response = await uploadProducts(formData);
      }

      console.log("API Response:", response);

      if (response?.err === false) {
        toast.success(
          isEditMode
            ? "Product updated successfully!"
            : "Product submitted successfully!"
        );
        await fetchProducts(); // Call fetchProducts first
        setOpen(false); // Then close the modal
      } else {
        toast.error(
          isEditMode
            ? "Failed to update Product. Please try again."
            : "Failed to submit Product. Please try again."
        );
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  };

  useEffect(() => {
    // When modal closes, reset form state if it was a successful submission
    if (!open) {
      if (!productId) {
        // Only reset if not in edit mode
        setName("");
        setPrice("");
        setSelectedCategory("");
        setSelectedSubCategoryId("");
        setDescription("");
        setColor("");
        // setMake("");
        // setModel("");
        setYear("");
        setBrand("");
        setQuantity("");
        setWebsiteUrl("");
        setWeight("");
        setHeight("");
        setImagePreviewUrl(null);
        setCroppedImageUrl(null);
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="mr-2 h-4 w-4" />{" "}
          {isEditMode ? "Edit Product" : "Add Product"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1100px] max-h-[90vh] bg-zinc-900 border-zinc-800 text-zinc-100 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              {isEditMode
                ? "Update your product details. Click save when you're done."
                : "Create a new product or service. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-zinc-200">
                  Category
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(val) => {
                    setSelectedCategory(val);
                    setCategoryError(false);
                  }}
                >
                  <SelectTrigger
                    id="category"
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                    {Array.isArray(categories) && categories.length > 0 ? (
                      categories
                        .filter((category) => category.parent_name === null)
                        .map((category) => (
                          <SelectItem
                            key={category.image}
                            value={category.name.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-yellow-400">
                        No categories found
                      </div>
                    )}
                  </SelectContent>
                </Select>
                {categoryError && (
                  <p className="text-red-500 text-sm">
                    Please select a category.
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="subCategory" className="text-zinc-200">
                  Sub Category
                </Label>
                <Select
                  value={selectedSubCategoryId}
                  onValueChange={setSelectedSubCategoryId}
                >
                  <SelectTrigger
                    id="subCategory"
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                  >
                    <SelectValue placeholder="Select a Sub Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                    {Array.isArray(subCategories) &&
                    subCategories.length > 0 ? (
                      subCategories
                        .filter((category) => category.parent_name !== null)
                        .map((category) => (
                          <SelectItem
                            key={category.image}
                            value={category.name.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-yellow-400">
                        No subcategories found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="make" className="text-zinc-200">
                  Make
                </Label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger
                    id="make"
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                  >
                    <SelectValue placeholder="Select a Make" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                    {Array.isArray(make) && make.length > 0 ? (
                      make
                        .filter((category) => category.parent_name === null)
                        .map((category) => (
                          <SelectItem
                            key={category.name}
                            value={category.name.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-yellow-400">
                        No make found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model" className="text-zinc-200">
                  Model
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger
                    id="model"
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                  >
                    <SelectValue placeholder="Select a Model" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                    {Array.isArray(model) && model.length > 0 ? (
                      model
                        .filter((category) => category.parent_name !== null)
                        .map((category) => (
                          <SelectItem
                            key={category.name}
                            value={category.name.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-yellow-400">
                        No model found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-200">
                Product Name
              </Label>
              <Input
                id="name"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-zinc-200">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color" className="text-zinc-200">
                Color
              </Label>
              <Input
                id="color"
                placeholder="Product Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="year" className="text-zinc-200">
                Year
              </Label>
              <Input
                id="year"
                placeholder="Product Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand" className="text-zinc-200">
                Brand
              </Label>
              <Input
                id="brand"
                placeholder="Product Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-zinc-200">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="websiteurl" className="text-zinc-200">
                Website URL
              </Label>
              <Input
                id="websiteurl"
                placeholder="Product Website URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height" className="text-zinc-200">
                Height
              </Label>
              <Input
                id="height"
                placeholder="Product Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight" className="text-zinc-200">
                Weight
              </Label>
              <Input
                id="weight"
                placeholder="Product Height"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="image" className="text-zinc-200">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 file:bg-zinc-700 file:text-zinc-200 file:border-0 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-zinc-200">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>

            {/* Image Preview and Cropping Area */}
            {imagePreviewUrl && !croppedImageUrl && (
              <div className="mt-4 space-y-4">
                <div className="border border-zinc-700 rounded-md p-4 bg-zinc-800">
                  <h4 className="text-zinc-200 mb-2 font-medium">Crop Image</h4>
                  <div className="max-h-[200px] overflow-auto">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={handleCropComplete}
                      aspect={crop.aspect}
                      className="max-w-full"
                    >
                      <img
                        ref={imageRef}
                        src={imagePreviewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full"
                      />
                    </ReactCrop>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={cancelCrop}
                      className="border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                    >
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={saveWithoutCrop}
                      className="border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                    >
                      Skip Crop
                    </Button>
                    <Button
                      type="button"
                      onClick={getCroppedImg}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      <Check className="mr-2 h-4 w-4" /> Apply Crop
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Cropped Image Preview */}
            {croppedImageUrl && (
              <div className="mt-4">
                <div className="border border-zinc-700 rounded-md p-4 bg-zinc-800">
                  <h4 className="text-zinc-200 mb-2 font-medium">
                    Product Image
                  </h4>
                  <div className="relative">
                    <img
                      src={croppedImageUrl || "/placeholder.svg"}
                      alt="Product preview"
                      className="max-w-full rounded-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={cancelCrop}
                      className="absolute top-2 right-2 bg-zinc-800/80 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          <DialogFooter className="sticky bottom-0 pt-2 pb-2 bg-zinc-900">
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isEditMode ? "Update Product" : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
