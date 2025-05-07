"use client"; // 👈 Required for client-side logic

import type React from "react";
import { useState } from "react";
import { DashboardSidebar } from "@/src/components/dashboard-sidebar";
import { ThemeProvider } from "@/src/components/theme-provider";
import { cn } from "@/src/lib/utils";
import ToasterProvider from "@/src/ToasterProvider"; // 👈 Import it here

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true); // Track sidebar state

  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <div className="flex bg-black">
        {/* Fixed Sidebar */}
        <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main Content Area */}
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
  );
}
