"use client";

import type React from "react";
import { useState } from "react";
import { VendorSidebar } from "@/src/components/vendor-sidebar";
import { ThemeProvider } from "@/src/components/theme-provider";
import { cn } from "@/src/lib/utils";
import ToasterProvider from "@/src/ToasterProvider";
import { ProtectedRoute } from "@/src/components/protected-vendor-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ProtectedRoute>
      <ThemeProvider defaultTheme="dark" forcedTheme="dark">
        <div className="flex bg-black">
          <VendorSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

          <main
            className={cn(
              "flex-1 min-h-screen overflow-auto p-6 transition-all duration-300",
              collapsed ? "ml-16" : "ml-64"
            )}
          >
            {children}
          </main>
        </div>
        <ToasterProvider />
      </ThemeProvider>
    </ProtectedRoute>
  );
}
