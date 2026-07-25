// ===========================================================
// ELEVATE ASANSÖR — site interactions
// ===========================================================

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.cssText += 'flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#14181D;padding:20px 24px;border-bottom:1px solid #2A2F36;';
});

/* ---------- Hero shaft floor counter (decorative) ---------- */
const shaftFloor = document.getElementById('shaftFloor');
if (shaftFloor) {
  const floors = ['B1', '02', '05', '08', '12', '15'];
  let fi = 0;
  setInterval(() => {
    fi = (fi + 1) % floors.length;
    shaftFloor.textContent = floors[fi];
  }, 1400);
}

/* ---------- Stat counters (animate on scroll into view) ---------- */
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.closest('.stat').dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + suffix;
    }, 30);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

/* ---------- Reference map: pins + filters + detail panel ---------- */
const projects = [
  { id: 1, city: 'İstanbul', type: 'konut', label: 'Konut', name: 'Levent Rezidans', capacity: '8 Kişi / 630 kg', stops: 24, year: 2023, x: 27, y: 22 },
  { id: 2, city: 'İstanbul', type: 'avm', label: 'AVM', name: 'Marina AVM', capacity: '13 Kişi / 1000 kg', stops: 6, year: 2022, x: 24, y: 30 },
  { id: 3, city: 'Ankara', type: 'hastane', label: 'Hastane', name: 'Başkent Şehir Hastanesi', capacity: '21 Kişi / 1600 kg', stops: 9, year: 2021, x: 48, y: 34 },
  { id: 4, city: 'Antalya', type: 'otel', label: 'Otel', name: 'Grand Otel Kule', capacity: '10 Kişi / 800 kg', stops: 32, year: 2023, x: 38, y: 74 },
  { id: 5, city: 'Kocaeli', type: 'fabrika', label: 'Fabrika', name: 'Anadolu Fabrika Kompleksi', capacity: 'Yük Asansörü / 2000 kg', stops: 4, year: 2020, x: 32, y: 24 },
  { id: 6, city: 'İzmir', type: 'konut', label: 'Konut', name: 'Alsancak Panorama', capacity: '6 Kişi / 450 kg', stops: 16, year: 2024, x: 12, y: 46 },
  { id: 7, city: 'Bursa', type: 'avm', label: 'AVM', name: 'Nilüfer Park AVM', capacity: '13 Kişi / 1000 kg', stops: 5, year: 2022, x: 22, y: 32 },
  { id: 8, city: 'Trabzon', type: 'hastane', label: 'Hastane', name: 'Karadeniz Devlet Hastanesi', capacity: '21 Kişi / 1600 kg', stops: 7, year: 2021, x: 78, y: 20 },
];

const mapPanel = document.getElementById('mapPanel');
const mapDetail = document.getElementById('mapDetail');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderPins() {
  mapPanel.innerHTML = '';
  projects.forEach(p => {
    const pin = document.createElement('div');
    pin.className = 'map-pin';
    pin.style.left = p.x + '%';
    pin.style.top = p.y + '%';
    pin.dataset.type = p.type;
    pin.dataset.id = p.id;
    pin.innerHTML = `<span class="map-pin-label">${p.city}</span>`;
    pin.addEventListener('click', () => showDetail(p, pin));
    mapPanel.appendChild(pin);
  });
}

function showDetail(p, pinEl) {
  document.querySelectorAll('.map-pin').forEach(el => el.classList.remove('active'));
  pinEl.classList.add('active');
  mapDetail.innerHTML = `
    <div class="map-detail-card">
      <span class="map-detail-tag">${p.label}</span>
      <h4>${p.name}</h4>
      <div class="map-detail-row"><span>Şehir</span><span>${p.city}</span></div>
      <div class="map-detail-row"><span>Kapasite</span><span>${p.capacity}</span></div>
      <div class="map-detail-row"><span>Durak Sayısı</span><span>${p.stops}</span></div>
      <div class="map-detail-row"><span>Tamamlanma Yılı</span><span>${p.year}</span></div>
    </div>`;
}

function applyFilter(filter) {
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.classList.toggle('hidden', filter !== 'all' && pin.dataset.type !== filter);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

renderPins();

/* ---------- Before / After compare slider ---------- */
const compareRange = document.getElementById('compareRange');
const compareAfter = document.getElementById('compareAfter');
const compareHandle = document.getElementById('compareHandle');

function updateCompare(val) {
  compareAfter.style.width = val + '%';
  compareHandle.style.left = val + '%';
}
compareRange?.addEventListener('input', (e) => updateCompare(e.target.value));

/* ---------- Quote form (front-end only; wire to your backend / email API) ---------- */
const quoteForm = document.getElementById('quoteForm');
const formNote = document.getElementById('formNote');
quoteForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Talebiniz alındı — ekibimiz en kısa sürede sizinle iletişime geçecek.';
  quoteForm.reset();
});

/* ---------- Reveal sections on scroll ---------- */
const revealTargets = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(24px)';
  sec.style.transition = 'opacity .6s ease, transform .6s ease';
  revealObserver.observe(sec);
});
// Hero is visible immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'none';
