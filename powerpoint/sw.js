const CACHE_NAME = 'v1';

// URLs to cache upfront
const urlsToCache = [
    'index.html',
    'styles.css',
    'index.js',
    'data.json', // Include the JSON file itself in the cache
    '/images/vorlage/image1.jpg',
    '/images/vorlage/image2.jpg',
    '/images/vorlage/image3.jpg',
    '/images/vorlage/image4.jpg',

];

// Installing Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(urlsToCache)
                    .then(() => fetch('data.json')) // Fetch the JSON file
                    .then(response => response.json())
                    .then(items => {
                        const imageUrls = items.flatMap(item => {
                            return item.filename.filter(f => f).map(f => `images/slides/${f}.png`); // Filter out empty filenames and map to full paths
                        });
                        return cache.addAll(imageUrls); // Cache all non-empty image paths
                    });
            })
    );
});

// Fetching from Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if found, otherwise fetch from network
                return response || fetch(event.request);
            })
    );
});
