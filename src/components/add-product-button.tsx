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
import { uploadProducts } from "../api/products";
import toast from "react-hot-toast";
import { compressImage, uploadImage } from "../lib/image";

interface categories {
  id: number;
  name: string;
  image: string;
}
interface subcategories {
  id: number;
  name: string;
  image: string;
}

export function AddProductButton() {
  const [open, setOpen] = useState(false);

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
  const [price, setPrice] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] =
    useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

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
          setCrop((prev) => ({ ...prev, aspect: 16 / 9 })); // Rectangle aspect ratio for banners
        } else if (file.name.includes("thumbnail")) {
          setCrop((prev) => ({ ...prev, aspect: 1 })); // Square aspect ratio for thumbnails
        } else {
          setCrop((prev) => ({ ...prev, aspect: 4 / 3 })); // Default product image ratio
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

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        // Create a new URL for the cropped image
        const croppedImageUrl = URL.createObjectURL(blob);
        setCroppedImageUrl(croppedImageUrl);

        // Create a new File object from the blob for form submission
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
    // Use the original image file without cropping
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

  // Sample subcategories data
  const subcategoriesByCategory = {
    "ac-repair": [
      { value: "ac-service", label: "AC Service" },
      { value: "ac-installation", label: "AC Installation" },
      { value: "ac-repair", label: "AC Repair" },
    ],
    cleaning: [
      { value: "deep-cleaning", label: "Deep Cleaning" },
      { value: "carpet-cleaning", label: "Carpet Cleaning" },
      { value: "bathroom-cleaning", label: "Bathroom Cleaning" },
    ],
    handyman: [
      { value: "electrical-repairs", label: "Electrical Repairs" },
      { value: "plumbing", label: "Plumbing" },
      { value: "carpentry", label: "Carpentry" },
    ],
    salon: [
      { value: "haircut", label: "Haircut" },
      { value: "styling", label: "Styling" },
      { value: "coloring", label: "Coloring" },
    ],
    "pest-control": [
      { value: "general-pest-control", label: "General Pest Control" },
      { value: "termite-control", label: "Termite Control" },
      { value: "rodent-control", label: "Rodent Control" },
    ],
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
        const response = await getSubCategories({
          search: `parent_id:${selectedCategory}`,
        });
        console.log("Fetched subcategories:", response);
        setSubCategories(response.result || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  console.log("subCategories are ", subCategories);

  console.log(selectedSubCategoryId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Image file not found");
      return;
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
      const compressedImage = await compressImage(imageFile);
      const url = await uploadImage(compressedImage, "categories");
      const formData = {
        category: selectedCategory,
        sub_category: selectedSubCategoryId, //name, description, color, category, sub_category, details, make, model, year, price, quantity, image_url, website_url, seller_id, seller_name
        name,
        price,
        description,
        image_url: url,
        color,
        make,
        model,
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
      await uploadProducts(formData);
      toast.success("Products submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit Products. Please try again.");
    } finally {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-zinc-900 border-zinc-800 text-zinc-100 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Add New Product</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new product or service. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category" className="text-zinc-200">
                Category
              </Label>
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger
                  id="category"
                  className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subCategory" className="text-zinc-200">
                Sub Category
              </Label>
              <Select onValueChange={setSelectedSubCategoryId}>
                <SelectTrigger
                  id="subCategory"
                  className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                >
                  <SelectValue placeholder="Select a Sub Category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  {subCategories.length > 0 ? (
                    subCategories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
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

            <div className="grid gap-2">
              <Label htmlFor="color" className="text-zinc-200">
                Color
              </Label>
              <Textarea
                id="color"
                placeholder="Product Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="make" className="text-zinc-200">
                Make
              </Label>
              <Textarea
                id="make"
                placeholder="Product Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model" className="text-zinc-200">
                Model
              </Label>
              <Textarea
                id="model"
                placeholder="Product Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year" className="text-zinc-200">
                Year
              </Label>
              <Textarea
                id="year"
                placeholder="Product Model"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brand" className="text-zinc-200">
                Brand
              </Label>
              <Textarea
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
              <Textarea
                id="quantity"
                placeholder="Product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="websiteurl" className="text-zinc-200">
                Website URL
              </Label>
              <Textarea
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
              <Textarea
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
              <Textarea
                id="weight"
                placeholder="Product Height"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>

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
                    Cropped Image
                  </h4>
                  <div className="relative">
                    <img
                      src={croppedImageUrl || "/placeholder.svg"}
                      alt="Cropped preview"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="grid gap-2">
                <Label htmlFor="status" className="text-zinc-200">
                  Status
                </Label>
                <Select>
                  <SelectTrigger
                    id="status"
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 focus:ring-yellow-400"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              {/* <div className="grid gap-2">
                <Label htmlFor="sku" className="text-zinc-200">
                  SKU
                </Label>
                <Input
                  id="sku"
                  placeholder="Stock Keeping Unit"
                  className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
                />
              </div> */}
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 pt-2 pb-2 bg-zinc-900">
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Save Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
