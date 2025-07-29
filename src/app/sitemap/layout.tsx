import { Metadata } from "next";

export const metadata: Metadata = {
  title:"Mypafway Site Map - Mypafway's Site Map scales out the entire company website.",
  description:
  "Mypafway's Site Map allows consumers and automotive part businesses to route out specific sections of the website. Thus, creating opportunities for automotive part companies and consumers alike to better understand how to navigate the website.",
  keywords: "site map, mypafway, auto part manufacturers, auto part suppliers"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
