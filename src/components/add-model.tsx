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
import { getMake, getModel, uploadMake, uploadModel } from "../api/make";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";

const categorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface make {
  id: number;
  name: string;
  parent_name: string;
}

export function AddModel() {
  const [open, setOpen] = useState(false);
  const [make, setMake] = useState<make[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [folderName, setFolderName] = useState("categories");
  const [selectedMake, setSelectedMake] = useState<string>("");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

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

  const onSubmit = async (data: CategoryFormValues) => {
    console.log("Form data:", data);

    try {
      const payload = {
        name: data.name,
        parent_name: selectedMake,
      };

      console.log("Sending payload to backend:", payload);
      await uploadModel(payload);
      toast.success("Models submitted successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to submit models. Please try again.");
    } finally {
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> Add New Model
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-zinc-900 border-zinc-800 text-zinc-100 overflow-y-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Add New Model</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new service Model. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
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
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel className="text-zinc-200">Model</FormLabel>
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
              {isUploading ? "Uploading..." : "Save Model"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
