const CACHE_NAME = 'v1';

// URLs to cache upfront
const urlsToCache = [
    'index.html',
    'styles.css',
	'pptxgen.bundle.js',
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
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Fetch the JSON file and cache image URLs dynamically
                return fetch('data.json')
                    .then(response => response.json())
                    .then(items => {
                        const imageUrls = items.flatMap(item => {
                            return item.filename.filter(f => f).map(f => `images/slides/${f}.png`); // Filter out empty filenames and map to full paths
                        });
                        return caches.open(CACHE_NAME)
                            .then(cache => cache.addAll(imageUrls));
                    });
            })
            .catch(error => {
                console.error('Failed to install Service Worker: ', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetching from Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).then(fetchResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            }).catch(() => {
                // Fallback logic if the resource is not available in the cache or network
                return caches.match('offline.html'); // You can provide a fallback HTML file for offline usage
            })
    );
});
