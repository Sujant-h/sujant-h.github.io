const CACHE_VERSION = 'v3'; // Current cache version
const CACHE_NAME = `LyricCreatorCache-${CACHE_VERSION}`; // Include version in cache name
const VERSION_URL = './version.json'; // URL for checking app version

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

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            try {
                // Pre-cache static assets
                await cache.addAll(urlsToCache);

                // Fetch `data.json` for dynamic image URLs
                const response = await fetch('./data/data.json');
                if (!response.ok) throw new Error('Failed to fetch data.json');

                const items = await response.json();
                const imageUrls = items.flatMap(item =>
                    item.filename.filter(f => f).map(f => `images/slides/${f}.png`)
                );

                // Cache dynamic image URLs with resilience
                const results = await Promise.allSettled(
                    imageUrls.map(url => cache.add(url))
                );

                // Log any failures
                results.forEach((result, index) => {
                    if (result.status === 'rejected') {
                        console.warn(`Failed to cache: ${imageUrls[index]}`, result.reason);
                    }
                });
            } catch (error) {
                console.error('Error during installation:', error);
            }
        })()
    );
});


// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const isNewVersion = await checkForUpdates();
            const cacheNames = await caches.keys();

            // Delete old caches if a new version is detected
            if (isNewVersion) {
                console.log('New version detected. Updating cache...');
                await Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('LyricCreatorCache-') && name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                );
            }

            // Force activation of the new service worker
            await self.clients.claim();
        })()
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Check for Updates
async function checkForUpdates() {
    try {
        const response = await fetch(VERSION_URL);
        if (!response.ok) throw new Error('Failed to fetch version.json');

        const versionData = await response.json();
        if (versionData.version !== CACHE_VERSION) {
            console.log('New version detected:', versionData.version);
            return true;
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
    return false;
}
