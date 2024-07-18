const CACHE_NAME = 'v1';

// URLs to cache upfront
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'index.js',
    'pptxgen_bundle.js',
    'data.json',
    'sw.js',
    'manifest.json',
    'screenshots/desktop-wide.png',
    'screenshots/desktop.png',
    'screenshots/mobile.png',
    'images/vorlage1/image1.jpg',
    'images/vorlage1/image2.jpg',
    'images/vorlage1/image3.jpg',
    'images/vorlage1/image4.jpg',
    'images/vorlage2/image1.jpg',
    'images/vorlage2/image2.jpg',
    'images/vorlage2/image3.jpg',
    'images/vorlage3/image3.jpg', // Corrected duplicate and erroneous paths
    'images/logo1.png',
    'images/slides/1_slide_1.png',
    'images/slides/2_slide_1.png',
    'images/slides/3_slide_1.png',
    'images/slides/4_slide_1.png',
    'images/slides/5_slide_1.png'
];

// Installing Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => fetch('data.json'))
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(items => {
                        const imageUrls = items.flatMap(item => item.filename.filter(f => f).map(f => `images/slides/${f}.png`));
                        return cache.addAll(imageUrls);
                    })
                    .catch(error => {
                        console.error('Failed to fetch data.json or cache additional images:', error);
                    });
            })
    );
});

// Activating Service Worker and Cleaning Up Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                          .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Fetching from Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached response if found, otherwise fetch from network
                return response || fetch(event.request);
            })
            .catch(() => {
                // Optionally handle exceptions for fetch errors like showing an offline page
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            })
    );
});
