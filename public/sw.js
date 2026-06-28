const CACHE_NAME = 'bhavika-catering-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo_black.png',
  '/favicon.svg',
  '/assets/logo.png',
];

// Install Event - Pre-cache offline core pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching core offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Dynamic caching strategies
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and local/font assets
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Network-First, cache fallback for document navigations & unhashed bundle files (js, css)
  const isNetworkFirst = 
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.includes('/assets/index.js') ||
    url.pathname.includes('/assets/index.css');

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseCopy);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request) || caches.match('/index.html');
        })
    );
    return;
  }

  // 2. Cache-First (with background Stale-While-Revalidate refresh) for images, SVGs, and Google Fonts
  const isCacheFirstAsset = 
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.includes('/assets/') || // Note: JS and CSS are already handled above
    url.host.includes('fonts.googleapis.com') ||
    url.host.includes('fonts.gstatic.com');

  if (isCacheFirstAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // background fetch to refresh cache
          fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {/* Ignore background errors */});
          
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
          return networkResponse;
        }).catch(() => {
          return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
        });
      })
    );
  }
});
