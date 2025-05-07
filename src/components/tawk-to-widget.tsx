"use client";

import { useEffect } from "react";

const TawkToWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67eef57d0bf3eb1910cb00fe/1inumtsq7"; // ✅ updated
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://embed.tawk.to/67eef57d0bf3eb1910cb00fe/1inumtsq7"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default TawkToWidget;
