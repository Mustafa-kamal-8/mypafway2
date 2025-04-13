"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(5); // Default to showing "Are there any other charges?"

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border-l-4 border-amber-400">
          <div
            className={cn(
              "flex justify-between items-start p-4 cursor-pointer",
              activeIndex === index ? "bg-gray-50" : ""
            )}
            onClick={() => toggleItem(index)}
          >
            <div className="flex items-start">
              <span className="text-amber-500 font-medium mr-2">
                {index + 1}.
              </span>
              <h3 className="text-lg font-medium">{item.question}</h3>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-amber-500 transition-transform",
                activeIndex === index ? "transform rotate-180" : ""
              )}
            />
          </div>
          {activeIndex === index && (
            <div className="p-4 pt-0 pl-10 text-gray-600">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
