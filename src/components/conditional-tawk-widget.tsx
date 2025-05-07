"use client";

import { usePathname } from "next/navigation";
import TawkToWidget from "./tawk-to-widget";

export default function ConditionalTawkWidget() {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return !isAdminRoute ? <TawkToWidget /> : null;
}
