import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mypafway is an Automotive Search Engine Portal",
  description:
    "Mypafway has distinctive services. Our services have distanced itself from our competitors in terms of our technology solutions. These solutions have given Mypafway a greater understanding of what it takes to be the leading tech firm in the automotive parts industry.",
  keywords:
    "automotive parts, automotive accessories, data feeds, marketplace for online distribution of automotive parts, automotive search engine portal",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
