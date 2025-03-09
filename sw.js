const CACHE_NAME = "fireworks-cache-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", OFFLINE_URL]); // Cache homepage & offline page
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(OFFLINE_URL)) // Show offline page if no internet
  );
});
