import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The FAQ page provides definitions for various keywords and provides in an depth analysis of how the search engine's work.",
  description:
    "The Frequently Ask Questions section allows consumers and automotive part businesses better understand how the Search Portals work",
  keywords: "faq, search engine, mypafway, peer to peer, comparison shopping engine"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
