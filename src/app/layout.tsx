import type React from "react";
import "@/src/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Client from "./client";
import StoreProvider from "../store/StoreProvider";
import ToasterProvider from "@/src/ToasterProvider";
import ConditionalTawkWidget from "@/src/components/conditional-tawk-widget";
import TawkCleanUpListener from "@/src/components/tawk-cleanup-listener";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quality Auto Parts at Competitive Prices at Mypafway",
  description:
    "Mypafway is an automotive search engine that consists of OEM and aftermarket automotive parts. Mypafway's search engine enables consumers the ability to find automotive parts from many different car manufacturers from around the globe.",
  keywords:
    "automotive parts, automotive accessories, automotive parts search engine, comparison shopping engine, marketplace for online distribution of automotive parts, Peer-Peer",
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
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ToasterProvider />
              <ConditionalTawkWidget />
              <TawkCleanUpListener />
            </ThemeProvider>
          </StoreProvider>
        </Client>
      </body>
    </html>
  );
}
