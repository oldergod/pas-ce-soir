var CACHE_NAME = 'pasCeSoir';
var CACHE_VERSION = '0.0.1';

self.oninstall = function(event) {
  const urls = [
    '/',
    '/index.html',
    '/styles/pas-ce-soir.css',
    '/scripts/pas-ce-soir.js',
    '/assets/pas-ce-soir.mp3',
    '/assets/pas-maintenant.mp3',
    '/assets/pas-aujourdhui.mp3',
    '/assets/touche-pas.mp3',
    '/manifest.json',
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
