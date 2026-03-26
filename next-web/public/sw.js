/**
 * Service Worker for Saffron Gardens
 * Provides offline support with stale-while-revalidate caching strategy
 */

const CACHE_NAME = "saffron-v1";
const STATIC_ASSETS = ["/", "/about-services", "/gallery", "/contact", "/chat"];

// Install event: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching static assets");
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("Service Worker: Some assets could not be cached", err);
      });
    }),
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event: stale-while-revalidate strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip API requests - network first with fallback to cache
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // For static assets and pages - cache first, fallback to network
  event.respondWith(cacheFirstStrategy(request));
});

/**
 * Stale-While-Revalidate: Return cached response immediately,
 * but also fetch from network to update cache
 */
function staleWhileRevalidate(request) {
  return caches.match(request).then((cachedResponse) => {
    const fetchPromise = fetch(request).then((response) => {
      // Don't cache non-successful responses
      if (!response || response.status !== 200 || response.type === "error") {
        return response;
      }

      // Clone and cache the response
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    });

    // Return cached response immediately, or wait for network if no cache
    return cachedResponse || fetchPromise;
  });
}

/**
 * Cache First: Return cached response if available, otherwise fetch from network
 */
function cacheFirstStrategy(request) {
  return caches.match(request).then((cachedResponse) => {
    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(request)
      .then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === "error") {
          return response;
        }

        // Clone and cache the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Return 404 page on network error and no cache
        return caches.match("/");
      });
  });
}

/**
 * Network First: Try to fetch from network, fallback to cache
 */
function networkFirstStrategy(request) {
  return fetch(request)
    .then((response) => {
      // Only cache successful responses
      if (response && response.status === 200) {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
      }
      return response;
    })
    .catch(() => {
      // Fall back to cache if network fails
      return caches.match(request);
    });
}
