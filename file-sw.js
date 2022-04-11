const staticBuokemsCalc = "dev-calculator-site-v1";
const assets = [
  "./",
  "./index.html",
  "./styles/style.css",
  "./js/calculator.js",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
];

// install service worker
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticBuokemsCalc).then((cache) => {
      cache.addAll(assets);
    }),
  );
});

// activate service worker
self.addEventListener("activate", (activateEvent) => {
  // console.log('service worker activated', activateEvent);
  activateEvent.waitUntil(caches.keys().then((keys) => {}));
});

// fetch events
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((response) => {
      return response || fetch(fetchEvent.request);
    }),
  );
});
