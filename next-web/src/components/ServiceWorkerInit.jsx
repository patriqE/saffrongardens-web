"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/serviceWorkerManager";

/**
 * Client-side component to initialize Service Worker
 * Must be a client component to use browser APIs
 */
export default function ServiceWorkerInit() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null; // This component doesn't render anything
}
