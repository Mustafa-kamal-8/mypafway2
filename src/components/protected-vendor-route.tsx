"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
      router.replace("/");
      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      if (currentUser.role !== "vendor") {
        router.replace("/");
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("Invalid user data in localStorage");
      router.replace("/");
    }
  }, [pathname, router]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
