const prefix = 'sillacoach-' + self.registration.scope + '-';
const version = prefix + '25';
const files = ['./index.html', './score.js', './coach.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(version).then(cache => cache.addAll(files.map(file => new Request(file, {cache: "reload"})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(prefix) && key !== version).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const scope = self.registration.scope;
  if (request.mode === 'navigate' && [scope, new URL('./index.html', scope).href].includes(request.url.split('?')[0])) {
    event.respondWith(caches.open(version).then(cache => cache.match(new URL('./index.html', scope).href)));
    return;
  }
  if (files.some(file => new URL(file, scope).href === request.url)) {
    event.respondWith(caches.open(version).then(async cache => (await cache.match(request)) || fetch(request)));
  }
});

