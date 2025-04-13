"use client";

import { useState } from "react";
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

interface AdvancedSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdvancedSearchModal({
  open,
  onOpenChange,
}: AdvancedSearchModalProps) {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSearch = () => {
    // Implement search functionality here
    console.log({ year, make, model, category });
    onOpenChange(false);
  };

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
    "Nissan",
    "Hyundai",
    "Kia",
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
  ];
  const categories = [
    "Engine",
    "Transmission",
    "Brakes",
    "Suspension",
    "Electrical",
    "Body Parts",
    "Interior",
    "Accessories",
  ];

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

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
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
