import type React from "react";
import "@/src/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Client from "./client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MYPAFWAY - Auto Parts",
  description: "Find the best auto parts for your vehicle",
  generator: "my_app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.jpeg" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Client>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" /> {/* 👈 add Toaster here */}
          </ThemeProvider>
        </Client>
      </body>
    </html>
  );
}
