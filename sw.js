var CACHE_NAME = 'pasCeSoir';
var CACHE_VERSION = '0.0.1';

self.oninstall = function(event) {
  const urls = [
    '.',
    'index.html',
    'styles/pas-ce-soir.css',
    'scripts/pas-ce-soir.js',
    'assets/pas-ce-soir.mp3',
    'assets/pas-maintenant.mp3',
    'assets/pas-aujourdhui.mp3',
    'assets/touche-pas.mp3',
    'assets/icons/icon-72x72.png',
    'assets/icons/icon-96x96.png',
    'assets/icons/icon-128x128.png',
    'assets/icons/icon-144x144.png',
    'assets/icons/icon-152x152.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-384x384.png',
    'assets/icons/icon-512x512.png',
    'manifest.json',
  ];

  event.waitUntil(
    caches
    .open(CACHE_NAME + '-v' + CACHE_VERSION)
    .then(cache => cache.addAll(urls))
  );
};

self.onactivate = function(event) {
  const currentCacheName = CACHE_NAME + '-v' + CACHE_VERSION;
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.indexOf(CACHE_NAME) === -1) {
          return;
        }

        if (cacheName !== currentCacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  });
};

self.onfetch = function(event) {
  const request = event.request;
  event.respondWith(
    caches.match(request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(request);
    })
  );
};
