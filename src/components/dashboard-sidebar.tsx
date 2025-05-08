"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Home,
  Layers,
  LogOut,
  Package,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

const allSidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Categories", href: "/dashboard/categories", icon: Grid },
  { name: "Sub Categories", href: "/dashboard/subcategories", icon: Layers },
  { name: "Products", href: "/dashboard/products", icon: Package },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export function DashboardSidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        try {
          const parsed = JSON.parse(currentUser);
          setRole(parsed.role);
        } catch (err) {
          console.error("Failed to parse currentUser from localStorage");
        }
      }
    }
  }, []);

  // Filter links based on role
  const sidebarLinks = allSidebarLinks.filter((item) => {
    if (role === "user") {
      return item.name === "Products"; // only show Products for "user"
    }
    return true; // show all for other roles
  });

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen bg-zinc-900 border-r border-zinc-800 transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-4 bg-zinc-900 border-b border-zinc-800 justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-yellow-400">Admin</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-zinc-400 hover:text-yellow-400"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {sidebarLinks.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-zinc-800 text-yellow-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-yellow-400",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  collapsed ? "justify-center" : ""
                )}
                title={collapsed ? item.name : ""}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-yellow-400"
                      : "text-zinc-400 group-hover:text-yellow-400",
                    "flex-shrink-0 h-5 w-5",
                    collapsed ? "" : "mr-3"
                  )}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex-shrink-0 flex border-t border-zinc-800 p-4">
        <Button
          variant="ghost"
          className={cn(
            "flex items-center text-zinc-400 hover:text-yellow-400 w-full",
            collapsed ? "justify-center" : "justify-start"
          )}
          onClick={() => (window.location.href = "/")}
          title={collapsed ? "Sign Out" : ""}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
