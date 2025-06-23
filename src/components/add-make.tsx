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

import toast from "react-hot-toast";
import { uploadMake } from "../api/make";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function AddMake() {
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [folderName, setFolderName] = useState("categories");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    console.log("Form data:", data);

    try {
      const payload = {
        name: data.name,
      };

      console.log("Sending payload to backend:", payload);
      await uploadMake(payload);
      toast.success("Makes submitted successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to submit category. Please try again.");
    } finally {
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> Add New Make
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-zinc-900 border-zinc-800 text-zinc-100 overflow-y-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Add New Make</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new service Make. Click save when you're done.
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
                        placeholder="Make name"
                        className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-yellow-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </Form>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Make"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
