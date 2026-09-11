const welcome = document.querySelector('#welcome');
const scene = document.querySelector('#bookScene');
const openButton = document.querySelector('#openInvitation');
const book = document.querySelector('.book');
const guestName = document.querySelector('#guestName');

function showScene() {
  openButton.disabled = true;
  welcome.style.opacity = '0';
  welcome.style.transform = 'scale(.98)';
  setTimeout(() => {
    // Doğrudan görünür kılmak, farklı tarayıcılarda CSS geçişinin
    // davetiye sahnesini gizli bırakmasını engeller.
    // #welcome için tanımlı display:grid kuralı, tek başına `hidden`
    // özniteliğinin ekran alanını kaldırmasına izin vermiyordu.
    welcome.style.display = 'none';
    scene.style.display = 'block';
    scene.classList.add('visible');
    window.scrollTo({ top: 0, behavior: 'smooth' });


  }, 520);
}
openButton.addEventListener('click', showScene);

book.addEventListener('click', () => {
  if (book.classList.contains('open')) return;
  book.classList.add('open');
  book.setAttribute('aria-expanded', 'true');
  book.setAttribute('aria-label', 'Davetiyeniz açıldı');
  setTimeout(() => document.querySelector('#details').classList.add('show'), 650);
  setTimeout(() => document.querySelector('#temaSection').classList.add('show'), 1000);
  setTimeout(() => document.querySelector('#thanksSection').classList.add('show'), 1250);
});

const leafBox = document.querySelector('#backgroundLeaves');
const leafPaths = ['assets/leaves/leaf1.svg','assets/leaves/leaf2.svg','assets/leaves/leaf3.svg','assets/leaves/leaf4.svg'];
function addLeaf() {
  const leaf = document.createElement('span'); leaf.className = 'leaf';
  leaf.style.left = `${Math.random() * 100}%`; leaf.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
  const duration = 12 + Math.random() * 10; leaf.style.animationDuration = `${duration}s`;
  leaf.innerHTML = `<img src="${leafPaths[Math.floor(Math.random() * leafPaths.length)]}" alt="">`;
  leafBox.append(leaf); setTimeout(() => leaf.remove(), duration * 1000);
}
for (let i = 0; i < 9; i++) setTimeout(addLeaf, i * 900);
setInterval(addLeaf, 2600);

/* ===== Kına + düğün geri sayımları ===== */
(function () {
  const events = [
    {
      prefix: 'kina',
      target: '2026-09-19T18:00:00+03:00',
      message: 'Kına gecemiz başladı! ♥'
    },
    {
      prefix: 'dugun',
      target: '2026-09-26T18:00:00+03:00',
      message: 'Düğünümüz başladı! ♥'
    }
  ];

  const pad = n => String(n).padStart(2, '0');

  function updateCountdown(event) {
    const box = document.getElementById(event.prefix + 'Countdown');
    if (!box) return;

    const diff = new Date(event.target).getTime() - Date.now();

    if (diff <= 0) {
      box.innerHTML = `<div style="grid-column:1/-1;background:transparent;padding:12px 4px;font:600 1.05rem 'Lora',serif;color:var(--green)">${event.message}</div>`;
      return;
    }

    const total = Math.floor(diff / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    document.getElementById(event.prefix + 'Days').textContent = pad(days);
    document.getElementById(event.prefix + 'Hours').textContent = pad(hours);
    document.getElementById(event.prefix + 'Minutes').textContent = pad(minutes);
    document.getElementById(event.prefix + 'Seconds').textContent = pad(seconds);
  }

  function updateAll() {
    events.forEach(updateCountdown);
  }

  updateAll();
  setInterval(updateAll, 1000);
})();


// Etkinlik tarihi geçtiğinde sayaç yerine temiz bir durum mesajı göster.
function showEventCompleted(container, title) {
  if (!container) return;
  container.innerHTML = '<div class="event-completed"><strong>' + title + '</strong><span>Etkinlik gerçekleşti ❤️</span></div>';
  container.classList.add('is-completed');
}



const bookScene = document.querySelector('#bookScene');
const showBuildFooter = () => {
  if (buildFooter) buildFooter.classList.add('show');
};
if (bookScene) {
  const observer = new MutationObserver(showBuildFooter);
  observer.observe(bookScene, { attributes: true, attributeFilter: ['class'] });
}
