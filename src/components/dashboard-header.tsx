import type React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { DashboardSidebar } from "@/src/components/dashboard-sidebar";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex h-16 items-center px-4 border-b border-zinc-800 bg-zinc-900 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden mr-2 bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 bg-zinc-900 border-r border-zinc-800"
        >
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="font-bold text-lg md:text-xl text-zinc-100">
            {heading}
          </h2>
          {text && <p className="text-sm text-zinc-400">{text}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
