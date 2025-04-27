"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getCategories } from "../api/categories";

interface AdvancedSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface categories {
  id: string;
  name: string;
  image: string;
  parent_id: number;
}

export default function AdvancedSearchModal({
  open,
  onOpenChange,
}: AdvancedSearchModalProps) {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [categoryId, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<categories[]>([]);

  const handleSearch = () => {
    if (year || make || model || categoryId) {
      // if at least one field is filled
      const queryParams = new URLSearchParams();

      if (year) queryParams.append("year", year);
      if (make) queryParams.append("make", make);
      if (model) queryParams.append("model", model);
      if (categoryId) queryParams.append("categoryId", categoryId);

      window.location.href = `/search?${queryParams.toString()}`;
      onOpenChange(false);
    }
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

  // Sample data for dropdowns
  const years = Array.from({ length: 30 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );
  const makes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "BMW",
    "Mercedes",
    "Audi",
    "Hyundai",
    "Kia",
    "Acura",
    "Nissan",
  ];
  const models = [
    "Corolla",
    "Civic",
    "F-150",
    "Silverado",
    "3 Series",
    "C-Class",
    "A4",
    "Altima",
    "Elantra",
    "Sportage",
    "RL",
    "NV200",
  ];
  // const categories = [
  //   "Engine",
  //   "Transmission",
  //   "Brakes",
  //   "Suspension",
  //   "Electrical",
  //   "Body Parts",
  //   "Interior",
  //   "Accessories",
  // ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-500">
            Advanced Search
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select value={year} onValueChange={setYear}>
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

          <Select value={make} onValueChange={setMake}>
            <SelectTrigger>
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryId} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories
                .filter((c) => c.parent_id === null) // show only categories with parentId = null
                .map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-semibold"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-black font-semibold"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
        <div className="bg-amber-100 p-3 text-center text-sm mt-4">
          Need help with the search? Check out our{" "}
          <Link href="/faq" className="text-blue-600 hover:underline">
            FAQ Page
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
