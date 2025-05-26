// Simple service worker to handle cleanup and prevent fetch errors
self.addEventListener('install', function(event) {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // Clean up old caches and unregister this service worker
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      // Unregister this service worker
      return self.registration.unregister();
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Don't handle any fetch events, let them go to the network
  return;
}); 