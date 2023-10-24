const CACHE_NAME = 'cache-notas';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/pwa/',
    '/pwa/index.html',
    '/pwa/style.css',
    '/pwa/app/app.js',
    '/pwa/app/notas.js',
    '/pwa/app/login.js',
]

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(PRECACHE_ASSETS);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// self.addEventListener('fetch', event => {
//   event.respondWith(async () => {
//       const cache = await caches.open(CACHE_NAME);
//       const cachedResponse = await cache.match(event.request);
//       if (cachedResponse !== undefined) {
//         return cachedResponse;
//       }
      
//       // Verifique se a requisição corresponde à sua API e é um GET
//       if (event.request.url.startsWith('https://fatecpp.edu.br/wp-json/fatec/notas') && event.request.method === 'GET') {
    
//         return fetch(event.request)
//           .then(async function(response) {
//             // Clone a resposta para armazenar no IndexedDB
//             var responseClone = response.clone();
//             const notas = new Notas();
//             notas.addNotas(responseClone);
//             return response;
//           })
//       } else {
//         return fetch(event.request)
//       };
//   });
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       console.log(event.request)
//       return response || fetch(event.request);
//     })
//   );
// });