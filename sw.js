// Service worker: เก็บไฟล์ไว้ในเครื่อง ใช้ออฟไลน์ได้หลังเปิดครั้งแรก
const CACHE = 'hatafuku-kawaii-v4';
const SCOPE = self.registration.scope;
const FILES = ["apple-touch-icon.png", "classic.html", "hatafuku/app.css", "hatafuku/app.js", "hatafuku/apple-touch-icon.png", "hatafuku/balloons.html", "hatafuku/code-runner.html", "hatafuku/codequest.html", "hatafuku/cozy-theme.css", "hatafuku/creator-studio.html", "hatafuku/crossword-studio.html", "hatafuku/dot-to-dot.html", "hatafuku/draw-studio.html", "hatafuku/draw.html", "hatafuku/extras.html", "hatafuku/favicon.png", "hatafuku/favicon.svg", "hatafuku/fx.js", "hatafuku/handwriting.html", "hatafuku/hatafuku-core.js", "hatafuku/hatafuku-palette.js", "hatafuku/hatafuku-theme.css", "hatafuku/html2canvas.min.js", "hatafuku/icon-192.png", "hatafuku/icon-512.png", "hatafuku/icon-maskable-512.png", "hatafuku/icon.svg", "hatafuku/index.html", "hatafuku/io.js", "hatafuku/jszip.min.js", "hatafuku/kawaii-theme.css", "hatafuku/lessons.html", "hatafuku/line-theme.html", "hatafuku/manifest.webmanifest", "hatafuku/math-worksheet.html", "hatafuku/maze-studio.html", "hatafuku/mini-booklet.html", "hatafuku/minigames.html", "hatafuku/mockup-3d.html", "hatafuku/qrcode.min.js", "hatafuku/screenshot-desktop.png", "hatafuku/screenshot-mobile.png", "hatafuku/standalone-index.html", "hatafuku/studio-ext.js", "hatafuku/studio-plus.js", "hatafuku/studio.html", "hatafuku/sw.js", "hatafuku/thai-practice.html", "hatafuku/theme.css", "hatafuku/typing.html", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "index.html", "kawaii-theme.css", "logistics.html", "manifest.webmanifest", "polyglot-5.html", "polyglot.html"];
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
