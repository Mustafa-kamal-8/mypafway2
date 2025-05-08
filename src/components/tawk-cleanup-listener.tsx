"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { cleanupTawkTo } from "./tawk-to-widget"

// This component can be added to your layout to ensure cleanup happens on navigation
export default function TawkCleanupListener() {
  const pathname = usePathname()

  useEffect(() => {
    // Define the paths where the widget should not be shown
    const excludedPaths = ["/dashboard", "/signin", "/login", "/signup", "/register", "/auth"]

    // Check if the current path should exclude the widget
    const shouldExclude = excludedPaths.some((path) => pathname.startsWith(path))

    if (shouldExclude) {
      // Run cleanup immediately
      cleanupTawkTo()

      // And again after a short delay to catch any late-loaded elements
      const cleanupTimeout = setTimeout(() => {
        cleanupTawkTo()
      }, 500)

      return () => clearTimeout(cleanupTimeout)
    }
  }, [pathname])

  return null
}
