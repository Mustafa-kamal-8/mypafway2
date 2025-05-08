"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { cleanupTawkTo } from "./tawk-to-widget"

// Lazy load the Tawk widget only when needed
const TawkToWidget = dynamic(() => import("./tawk-to-widget"), {
  ssr: false,
  loading: () => null,
})

export default function ConditionalTawkWidget() {
  const pathname = usePathname()
  const [shouldShow, setShouldShow] = useState(false)
  const previousPathRef = useRef<string | null>(null)

  // Define the paths where the widget should not be shown
  const excludedPaths = ["/dashboard", "/signin", "/login", "/signup", "/register", "/auth"]

  // Check if the current path should exclude the widget
  const isExcludedPath = (path: string) => {
    return excludedPaths.some((excludedPath) => path.startsWith(excludedPath))
  }

  useEffect(() => {
    // Check if we're on an excluded page
    const shouldExclude = isExcludedPath(pathname)

    // If we're navigating to an excluded path, clean up the widget
    if (shouldExclude) {
      cleanupTawkTo()
      setShouldShow(false)
    } else {
      setShouldShow(true)
    }

    // Update previous path reference
    previousPathRef.current = pathname

    // Add a navigation event listener to clean up when navigating
    const handleRouteChange = () => {
      if (isExcludedPath(pathname)) {
        cleanupTawkTo()
      }
    }

    // Clean up on unmount
    return () => {
      if (shouldExclude) {
        cleanupTawkTo()
      }
    }
  }, [pathname])

  // Add a more aggressive cleanup approach with an interval
  useEffect(() => {
    if (!shouldShow) {
      // Run cleanup immediately
      cleanupTawkTo()

      // Then run it again after a short delay to catch any elements that might be added after initial cleanup
      const cleanupTimeout = setTimeout(() => {
        cleanupTawkTo()
      }, 500)

      return () => clearTimeout(cleanupTimeout)
    }
  }, [shouldShow])

  return shouldShow ? <TawkToWidget /> : null
}
