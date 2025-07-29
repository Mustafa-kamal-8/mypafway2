import { Metadata } from "next";

export const metadata: Metadata = {
  title:"Buy automotive parts using Mypafway's Search Engines",
  description:
   "Consumers can search and buy automotive parts using Mypafway's Search Engines.",
  keywords: "automotive parts, automotive accessories, comparison shopping engine, search engine"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
