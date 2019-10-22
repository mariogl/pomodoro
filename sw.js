importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute([
  {
    "url": "audio/alarma.mp3",
    "revision": "2e7966d46aa79577d46a198a4fcaecab"
  },
  {
    "url": "css/estilos.css",
    "revision": "26f0eb2186053f01cbc236b299aaac92"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "161ddc3397251810fe8e17b70d6533b9"
  },
  {
    "url": "img/mute.svg",
    "revision": "d86892db4ec95f4298582a03b705be91"
  },
  {
    "url": "img/pomodoro.svg",
    "revision": "5e8df436e386c667125899a2d5904e58"
  },
  {
    "url": "index.html",
    "revision": "f4edee226c5c27f0f05a482422aadf2f"
  },
  {
    "url": "js/scripts.js",
    "revision": "c535fe721fa62af2d236e9bd30858fd7"
  }
]);

workbox.routing.registerRoute(
  /.*/,
  new workbox.strategies.CacheFirst()
);
