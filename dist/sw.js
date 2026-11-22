const cacheName = "secpath-v1";
const precache = [
  "./", "./index.html", "./styles.css", "./app.js", "./courses.js", "./config.js",
  "./manifest.webmanifest", "./assets/icon-192.png", "./assets/icon-512.png",
  "./assets/mascot.webp", "./manuals/cloud-deployment-exercise.pdf", "./manuals/snort-exercise.pdf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precache)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("secpath-") && name !== cacheName)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith(self.registration.scope)) return;
  if (request.headers.has("range")) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const url = new URL(request.url);
    const root = new URL(self.registration.scope).pathname;
    const appNavigation = request.mode === "navigate" && [root, `${root}index.html`].includes(url.pathname);
    const fallback = appNavigation ? "./index.html" : request;
    try {
      const response = await fetch(request);
      if (response.ok || response.type === "opaqueredirect") return response;
      if (response.status < 500) return response;
    } catch {
      // The precached copy is available after the first successful visit.
    }
    return (await cache.match(fallback)) || Response.error();
  })());
});
