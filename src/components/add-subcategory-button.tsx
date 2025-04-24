"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Plus, X, Check } from "lucide-react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
import { getCategories, uploadSubCategories } from "../api/categories";
import toast from "react-hot-toast";
import { compressImage, uploadImage } from "../lib/image";

interface categories {
  id: number;
  name: string;
  image: string;
}

export function AddSubcategoryButton() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<categories[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
        } else {
          setCrop((prev) => ({ ...prev, aspect: 1 })); // Square aspect ratio for other images
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

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(Number(value));
    console.log("Selected category ID:", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Image file not found");
      return;
    }

    try {
      const compressedImage = await compressImage(imageFile);
      const url = await uploadImage(compressedImage, "categories");
      const formData = {
        parent_id: selectedCategoryId,
        name,
        description,
        image: url,
      };
      console.log("Sending payload to backend:", formData);
      await uploadSubCategories(formData);
      toast.success("Sub Categories submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit Sub Category. Please try again.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> Add Subcategory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-zinc-100">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100">
              Add New Subcategory
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new service subcategory. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-zinc-200">
                Parent Category
              </Label>
              <Select onValueChange={handleCategoryChange}>
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
              <Label htmlFor="name" className="text-zinc-200">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Subcategory name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-zinc-200">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Subcategory description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
          </div>
          <DialogFooter className="sticky bottom-0 pt-2 pb-2 bg-zinc-900">
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Save Subcategory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
