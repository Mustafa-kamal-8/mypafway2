"use client";

import { useEffect, useRef } from "react";

const TawkToWidget = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (initialized.current) return;

    // Create the script element
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67eef57d0bf3eb1910cb00fe/1inumtsq7";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.id = "tawkto-script";
    document.body.appendChild(script);

    // Store reference to the script
    scriptRef.current = script;
    initialized.current = true;

    return () => {
      cleanupTawkTo();
    };
  }, []);

  return null;
};

// Export the cleanup function so it can be called from other components
export const cleanupTawkTo = () => {
  // Remove the script
  const script = document.getElementById("tawkto-script");
  if (script) script.remove();

  // Remove all iframes related to tawk.to
  const iframes = document.querySelectorAll("iframe[src*='tawk.to']");
  iframes.forEach((iframe) => {
    if (iframe.parentElement) {
      iframe.parentElement.remove();
    }
  });

  // Remove the widget container
  const widgetContainer = document.getElementById("tawk-root");
  if (widgetContainer) widgetContainer.remove();

  // Remove any elements with tawk classes
  const tawkElements = document.querySelectorAll("[class*='tawk-']");
  tawkElements.forEach((element) => {
    element.remove();
  });

  // Remove any elements with tawk IDs
  const tawkIdElements = document.querySelectorAll("[id*='tawk-']");
  tawkIdElements.forEach((element) => {
    element.remove();
  });

  // Clean up global variables
  if (typeof window !== "undefined") {
    delete (window as any).Tawk_API;
    delete (window as any).Tawk_LoadStart;
  }
};

export default TawkToWidget;
