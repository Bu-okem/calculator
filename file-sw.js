const staticBuokemsCalc = "dev-calculator-site-v1"
const assets = [
    "/",
    "/index.html",
    "/styles/style.css",
    "/js/calculator.js"
]

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticBuokemsCalc).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(response => {
            return response || fetch(fetchEvent.request);
        })
    );
});