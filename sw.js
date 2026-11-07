// Service worker: เก็บไฟล์ไว้ในเครื่อง ใช้ออฟไลน์ได้หลังเปิดครั้งแรก
const CACHE = 'hatafuku-kawaii-v5';
const SCOPE = self.registration.scope;
const FILES = ["apple-touch-icon.png", "classic.html", "app.css", "app.js", "balloons.html", "code-runner.html", "codequest.html", "cozy-theme.css", "creator-studio.html", "crossword-studio.html", "dot-to-dot.html", "draw-studio.html", "draw.html", "extras.html", "favicon.png", "favicon.svg", "fx.js", "handwriting.html", "hatafuku-core.js", "hatafuku-palette.js", "hatafuku-theme.css", "html2canvas.min.js", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "icon.svg", "hf-index.html", "io.js", "jszip.min.js", "kawaii-theme.css", "lessons.html", "line-theme.html", "manifest.webmanifest", "math-worksheet.html", "maze-studio.html", "mini-booklet.html", "minigames.html", "mockup-3d.html", "qrcode.min.js", "standalone-index.html", "studio-ext.js", "studio-plus.js", "studio.html", "sw.js", "thai-practice.html", "theme.css", "typing.html", "index.html", "logistics.html", "polyglot-5.html", "polyglot.html", "favicon.ico"];
const EXTERNAL_OK = ['cdn.tailwindcss.com','cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(
    ['./'].concat(FILES).map((p) => c.add(new URL(p, SCOPE).href).catch(() => {}))
  )));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('hatafuku-kawaii-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !EXTERNAL_OK.includes(url.hostname)) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const net = fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached || (req.mode === 'navigate' ? caches.match(new URL('./index.html', SCOPE).href) : undefined));
      return cached || net;
    })
  );
});
