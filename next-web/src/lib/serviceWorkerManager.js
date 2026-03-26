/**
 * Service Worker Manager
 * Handles registration and updates of the Service Worker for offline support
 */

import { logger } from "@/lib/logger";

const swLogger = logger; // Reuse existing logger

export async function registerServiceWorker() {
  // Only register in browser environment
  if (typeof window === "undefined") return;

  // Check if Service Workers are supported
  if (!("serviceWorker" in navigator)) {
    swLogger.warn("Service Workers are not supported in this browser");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    swLogger.info("Service Worker registered successfully", {
      scope: registration.scope,
    });

    // Listen for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;

      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          // New update available - notify user
          swLogger.info("Service Worker update available");
          // Optionally dispatch event for UI to show update notification
          window.dispatchEvent(new Event("sw-update-available"));
        }
      });
    });

    return registration;
  } catch (error) {
    swLogger.error("Service Worker registration failed", error);
  }
}

export function unregisterServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        swLogger.info("Service Worker unregistered");
      });
    })
    .catch((error) => {
      swLogger.error("Failed to unregister Service Worker", error);
    });
}

/**
 * Listen for Service Worker updates and provide UI feedback
 */
export function onServiceWorkerUpdate(callback) {
  if (typeof window === "undefined") return;

  window.addEventListener("sw-update-available", () => {
    callback();
  });
}
