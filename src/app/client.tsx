"use client";

import { useEffect, useState } from "react";

export default function Client({ children }: any) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // or loading spinner

  return children;
}
