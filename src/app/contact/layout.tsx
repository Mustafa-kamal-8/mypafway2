import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Mypafway's support team if you have any questions.",
  description:
    "If you have any further questions regarding Mypafway's services please contact our support team at admin@mypafway.com.",
  keywords: "contact us, questions, support, mypafway",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
