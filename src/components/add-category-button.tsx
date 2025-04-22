"use client";

import type React from "react";

import { useRef, useState } from "react";
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
import { Textarea } from "@/src/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { uploadCategories } from "../api/categories";
import toast from "react-hot-toast";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  imageUrl: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function AddCategoryButton() {
  const [open, setOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [folderName, setFolderName] = useState("categories");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

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

  const onSubmit = async (data: CategoryFormValues) => {
    console.log("Form data:", data);

    const payload = {
      name: data.name,
      image: croppedImageUrl || data.imageUrl, // Use cropped image if available
      description: data.description,
    };

    try {
      console.log("Sending payload to backend:", payload);
      await uploadCategories(payload);
      toast.success("Categories submitted successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to submit category. Please try again.");
    } finally {
      setOpen(false); // Close the dialog
    }
  };

  const compressImage = async (file: File): Promise<File> => {
    // Simple pass-through for now - implement actual compression if needed
    return file;
  };

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    // Placeholder for actual upload implementation
    return URL.createObjectURL(file);
  };

  const onUpload = (url: string) => {
    // Handle successful upload
    console.log("Image uploaded:", url);
  };

  const resetState = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImageFile(null);
    setImagePreviewUrl(null);
    setCroppedImageUrl(null);
  };

  const handleUpload = async () => {
    if (imageFile) {
      setIsUploading(true);
      try {
        const compressedFile = await compressImage(imageFile);

        const url = await uploadImage(compressedFile, folderName);

        if (url) {
          form.setValue("imageUrl", url);
          onUpload(url);
          resetState();
        }
      } catch (error) {
        toast.error("Could not upload file!");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-zinc-900 border-zinc-800 text-zinc-100 overflow-y-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100">
              Add New Category
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new service category. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className="text-zinc-200">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Category name"
                        className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className="text-zinc-200">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Category description"
                        className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
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
            </Form>

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
          <DialogFooter>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
