const radar = document.querySelector('.radar');
const blipsDiv = document.querySelector('.blips');

const N = 8;
const cheeses = [
  'icons/brie.png',
  'icons/gouda.png',
  'icons/minibabybel.png',
  'icons/parmesano.png'
];

const radarRect = radar.getBoundingClientRect();
const R = radarRect.width / 2;
const CX = radarRect.width / 2;
const CY = radarRect.height / 2;

// SONIDO RADAR
const pingSound = new Audio('sounds/ping.mp3');
pingSound.volume = 0.5;
function playPing() {
  const snd = pingSound.cloneNode();
  snd.play();
}

const blipsList = [];
for (let i = 0; i < N; i++) {
  const ang = Math.random() * 2 * Math.PI;
  const r = R * 0.7 + Math.random() * R * 0.2;
  const x = CX + r * Math.cos(ang);
  const y = CY + r * Math.sin(ang);

  const el = document.createElement('div');
  el.className = 'blip';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.opacity = '.15';

  const img = document.createElement('img');
  img.src = cheeses[Math.floor(Math.random() * cheeses.length)];
  el.appendChild(img);

  el.dataset.ang = ang;
  blipsDiv.appendChild(el);
  blipsList.push(el);
}

const BLIP_ANGLE = 0.5; // Más tiempo encendidos

let lastPing = Date.now();
const radarPeriod = 3000; // 3 segundos por vuelta

function highlightBlips() {
  const now = Date.now();
  const sweepAng = ((now / 1000) % 3) * (2 * Math.PI / 3);

  for (let blip of blipsList) {
    const ang = parseFloat(blip.dataset.ang);
    let d = Math.abs(sweepAng - ang);
    if (d > Math.PI) d = 2 * Math.PI - d;
    blip.style.opacity = d < BLIP_ANGLE ? 1 : .15;
  }

  // Reproduce el ping solamente cada vuelta del radar
  if (now - lastPing > radarPeriod - 200) { // margen para evitar múltiple triggers
    playPing();
    lastPing = now;
  }

  requestAnimationFrame(highlightBlips);
}
highlightBlips();
