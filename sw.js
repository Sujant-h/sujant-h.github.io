const CACHE_NAME = 'LyricCreatorCache'; // Cache name stays the same
const CACHE_VERSION = 'v3'; // Version used to compare with the version in version.json
const VERSION_URL = './version.json'; // URL to check the app version

// URLs to cache upfront
const urlsToCache = [
    '/',
    'index.html',
    'css/style.css',
    'css/pico.min.css',
    'js/index.js',
    'js/pptx.js',
    'js/pdf.js',
    'js/image.js',
    'libs/pptxgen.bundle.js',
    'libs/jspdf.umd.min.js',
    'libs/jszip.min.js',
    'data/data.json',
    'manifest.json',
    'images/vorlage1/image1.jpg',
    'images/vorlage1/image2.jpg',
    'images/vorlage1/image3.jpg',
    'images/vorlage2/image1.jpg',
    'images/vorlage2/image2.jpg',
    'images/vorlage2/image3.jpg',
    'images/vorlage3/image1.jpg',
    'images/vorlage3/image2.jpg',
    'images/vorlage3/image3.jpg',
    'images/logo1.png',
    'images/korinther.jpg',
    'images/text.png',
    'icons/icon-512x512.png',
    'icons/icon-192x192.png',
    'icons/favicon.png',
    'icons/plus.svg',
    'icons/shuffle.svg',
    'screenshots/desktop.png',
    'screenshots/mobile.png',
    'fonts/NotoSansTamil-Regular.ttf'
];

// Installing Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => fetch('./data/data.json'))
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
            return checkForUpdates().then(isNewVersion => {
                if (isNewVersion) {
                    // If a new version is detected, delete the old cache and reinstall the files
                    console.log('New version detected. Deleting old cache and updating cache...');
                    return caches.delete(CACHE_NAME); // Delete old cache
                }
                return Promise.resolve();
            });
        }).then(() => {
            // After deleting old caches, force the new service worker to activate
            self.skipWaiting(); // Forces the new service worker to activate immediately
        })
    );

    // Claim the clients to ensure the new service worker takes control immediately
    self.clients.claim();
});

// Fetching from Cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Check for updates
function checkForUpdates() {
    return fetch(VERSION_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch version information');
            }
            return response.json();
        })
        .then(versionData => {
            // Compare the version from version.json with the current CACHE_VERSION
            if (versionData.version !== CACHE_VERSION) {
                console.log('New version detected:', versionData.version);
                return true; // New version detected
            }
            return false; // No update needed
        })
        .catch(error => {
            console.error('Error checking for updates:', error);
            return false; // Return false if there was an error fetching version
        });
}
