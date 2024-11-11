"use client";

import { useEffect, useState } from "react";

type CustomCode = {
  css: string;
  javascript: string;
};

export default function CustomCodeInjector() {
  const [customCode, setCustomCode] = useState<CustomCode | null>(null);

  useEffect(() => {
    async function fetchCustomCode() {
      const response = await fetch("/api/getCustomCode");
      if (response.ok) {
        const data = await response.json();
        setCustomCode(data);
      }
    }

    fetchCustomCode();
  }, []);

  useEffect(() => {
    if (customCode) {
      // Inject CSS
      const style = document.createElement("style");
      style.textContent = customCode.css;
      document.head.appendChild(style);

      // Inject JavaScript
      const script = document.createElement("script");
      script.textContent = customCode.javascript;
      document.body.appendChild(script);
    }
  }, [customCode]);

  return null; // This component doesn't render anything
}
