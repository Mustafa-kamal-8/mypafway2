import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mypafway's Blog is a promotional tool for automotive part industry.",
  description:
    "Mypafway's blog is a marketing strategy used to promote the auto part industry.",
  keywords:
    "Mypafway, blog, auto part resellers, auto part manufacturers, auto part suppliers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
