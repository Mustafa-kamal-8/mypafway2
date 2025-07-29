import { Metadata } from "next";


export const metadata: Metadata = {
  title:"Automotive part clients can promote and sell their auto parts in the Search Engines",
  description:
   "Consumers can search and buy automotive parts using Mypafway's Search Engines.",
  keywords:
   "auto part manufacturers, auto part suppliers, comparison shopping engine, search engine auto part resellers"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
