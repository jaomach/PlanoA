self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('').then((cache) => {
        return cache.addAll([
          '/static/images/plaquinha.png',
          '/static/images/LOGO.png',
          '/static/pgGame/style/host.css',
          '/static/images/logoAnimada.webm ',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          return caches.open('video-cache').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
  