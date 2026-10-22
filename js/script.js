// ===============================
// Menu navigasi
// ===============================
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('menu');
const subs   = document.querySelectorAll('.has-sub');

// Buka/tutup menu di HP
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Buka/tutup dropdown (kalau ada)
subs.forEach((item) => {
  const btn = item.querySelector('button');
  btn.addEventListener('click', () => {
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

// Klik di luar dropdown atau tekan Esc untuk menutup
function closeSubs() {
  subs.forEach((item) => {
    item.classList.remove('open');
    item.querySelector('button').setAttribute('aria-expanded', false);
  });
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-sub')) closeSubs();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSubs();
});

// ===============================
// Halaman Layanan: kartu yang membuka pop-up
// ===============================
(function () {
  const cards = document.querySelectorAll('.service');
  const modal = document.getElementById('serviceModal');
  if (!cards.length || !modal || typeof modal.showModal !== 'function') return;

  // Nomor WhatsApp Ruang Pintar (awali 62, tanpa +, spasi, atau 0 di depan)
  const WA_NUMBER = '6282319390293';

  document.documentElement.classList.add('js-modal');

  const body     = document.getElementById('modalBody');
  const waBtn    = document.getElementById('modalWa');
  const box      = modal.querySelector('.modal-box');
  const closeBtn = modal.querySelector('.modal-close');
  const qrWrap   = document.getElementById('modalQr');
  const qrBox    = document.getElementById('qrBox');

  // Tombol WhatsApp baru muncul kalau nomor sudah diisi dengan benar
  waBtn.hidden = !/^\d{8,15}$/.test(WA_NUMBER);

  // Pesan WhatsApp (dipakai oleh tombol DAN barcode, jadi selalu sama)
  const pesanUmum =
    'Halo Admin Ruang Pintar, saya ingin mendaftar bimbingan belajar.\n\n' +
    'Program (PAUD / TK / SD kelas 1-2 / SD kelas 3-6 / SMP / SMA / Intensif SNBT / Mengaji):\n' +
    'Nama anak:\n' +
    'Kelas/usia:\n' +
    'Pilihan layanan (Bimbel / Private / Private ke rumah):\n' +
    'Domisili:\n\n' +
    'Mohon info jadwal dan langkah pendaftarannya. Terima kasih.';
  const linkUmum = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(pesanUmum);

  // Membuat barcode dari teks (link WhatsApp)
  function renderQr(text) {
    if (typeof qrcode !== 'function') { qrWrap.hidden = true; return; }

    const qr = qrcode(0, 'L');
    qr.addData(text);
    qr.make();

    const n = qr.getModuleCount();
    const margin = 3;
    const size = n + margin * 2;
    let d = '';

    for (let r = 0; r < n; r++) {
      let c = 0;
      while (c < n) {
        if (qr.isDark(r, c)) {
          const start = c;
          while (c < n && qr.isDark(r, c)) c++;
          d += 'M' + (start + margin) + ' ' + (r + margin) + 'h' + (c - start) + 'v1h-' + (c - start) + 'z';
        } else {
          c++;
        }
      }
    }

    qrBox.innerHTML =
      '<svg class="qr-svg" viewBox="0 0 ' + size + ' ' + size + '" role="img" ' +
      'aria-label="Barcode WhatsApp pendaftaran" shape-rendering="crispEdges">' +
      '<rect width="' + size + '" height="' + size + '" fill="#fff"/>' +
      '<path fill="#14397A" d="' + d + '"/></svg>';
    qrWrap.hidden = false;
  }

  waBtn.href = linkUmum;   // tombol: pesan sama dengan barcode
  renderQr(linkUmum);      // barcode, dibuat sekali

  // Membuka pop-up detail program
  function openModal(card) {
    body.innerHTML = '';
    ['h2', '.desc', '.info', '.notes', '.prices', '.reg'].forEach((sel) => {
      const el = card.querySelector(sel);
      if (el) body.appendChild(el.cloneNode(true));
    });
    body.querySelector('h2').id = 'modalTitle';

    modal.showModal();
    box.scrollTop = 0;
  }

  // Ubah angka jadi singkatan: 300000 -> 300rb, 1200000 -> 1,2jt
  function singkat(n) {
    if (n >= 1000000) return (n / 1000000).toString().replace('.', ',') + 'jt';
    return (n / 1000) + 'rb';
  }

  // Kisaran harga dari semua pilihan di dalam kartu
  function kisaran(card) {
    const harga = Array.from(card.querySelectorAll('.prices dd'))
      .map((dd) => parseInt(dd.textContent.replace(/\D/g, ''), 10))
      .filter((n) => !isNaN(n));
    if (!harga.length) return '';
    const min = Math.min(...harga);
    const max = Math.max(...harga);
    return min === max
      ? 'Rp ' + singkat(min)
      : 'Rp ' + singkat(min) + ' \u2013 ' + singkat(max);
  }

  // Ringkasan di tiap kartu + aksi klik
  cards.forEach((card) => {
    const firstInfo = card.querySelector('.info li');

    const summary = document.createElement('div');
    summary.className = 'service-summary';
    summary.innerHTML =
      '<p class="subjects"></p>' +
      '<div class="from"><small>Kisaran biaya</small><strong></strong><span>untuk 8x pertemuan</span></div>' +
      '<span class="more">Lihat detail</span>';
    summary.querySelector('.subjects').textContent = firstInfo ? firstInfo.textContent : '';
    summary.querySelector('strong').textContent = kisaran(card);
    card.appendChild(summary);

    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');

    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Tutup: tombol X, klik di luar kotak, atau tekan Esc (bawaan browser)
  closeBtn.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // Link langsung, misalnya layanan.html#smp langsung membuka pop-up SMP
  const hashed = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  if (hashed && hashed.classList.contains('service')) openModal(hashed);
})();


// ===============================
// Efek interaktif (semua halaman)
// ===============================
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Tombol "Chat Admin" melayang (pesan bisa diubah di bawah)
  const pesanChat = 'Halo Admin Ruang Pintar, saya ingin bertanya tentang bimbingan belajar.';
  const wa = document.createElement('a');
  wa.className = 'wa-float';
  wa.href = 'https://wa.me/6282319390293?text=' + encodeURIComponent(pesanChat);
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Chat admin Ruang Pintar lewat WhatsApp');
  wa.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>' +
    '<span>Chat Admin</span>';
  document.body.appendChild(wa);

  // 2) Garis kemajuan scroll + bayangan navbar
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const nav = document.querySelector('.navbar');

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    if (nav) nav.classList.toggle('scrolled', h.scrollTop > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3) Muncul pelan saat di-scroll
  if (!reduce && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.feature, .why-item, .service, .person, .team-title, .stat, .cta-band > *, ' +
      '.section-head, .mode, .reason, .testi-card, .visit-info, .visit-map');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const urutan = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.transitionDelay = Math.min(urutan, 5) * 80 + 'ms';
        el.classList.add('in');
        // setelah selesai, lepas kelas supaya efek hover bawaan elemen kembali normal
        setTimeout(() => {
          el.classList.remove('reveal', 'in');
          el.style.transitionDelay = '';
        }, 1100);
      });
    }, { threshold: 0.15 });
    targets.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  // 4) Angka yang berhitung naik (Beranda)
  const nums = document.querySelectorAll('.stat-num[data-count]');
  function hitung(el) {
    const akhir = parseInt(el.dataset.count, 10);
    const akhiran = el.dataset.suffix || '';
    if (reduce) { el.textContent = akhir + akhiran; return; }
    const durasi = 1200;
    const mulai = performance.now();
    function langkah(now) {
      const t = Math.min((now - mulai) / durasi, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(akhir * ease) + akhiran;
      if (t < 1) requestAnimationFrame(langkah);
    }
    requestAnimationFrame(langkah);
  }
  if (nums.length && 'IntersectionObserver' in window) {
    const ioNum = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        ioNum.unobserve(entry.target);
        hitung(entry.target);
      });
    }, { threshold: 0.6 });
    nums.forEach((el) => ioNum.observe(el));
  }

  // 5) Hiasan hero ikut bergerak mengikuti kursor (hanya di perangkat dengan mouse)
  const hero = document.querySelector('.hero');
  const visual = document.querySelector('.hero-visual');
  if (hero && visual && !reduce && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      visual.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      visual.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener('mouseleave', () => {
      visual.style.setProperty('--px', 0);
      visual.style.setProperty('--py', 0);
    });
  }
})();


// ===============================
// Beranda: testimoni & jam buka
// ===============================
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Testimoni: tombol geser kiri/kanan
  const track = document.getElementById('testiTrack');
  if (track) {
    const geser = (arah) => {
      const kartu = track.querySelector('.testi-card');
      const jarak = parseFloat(getComputedStyle(track).columnGap) || 20;
      const lebar = kartu ? kartu.getBoundingClientRect().width + jarak : 320;
      track.scrollBy({ left: arah * lebar, behavior: reduce ? 'auto' : 'smooth' });
    };
    document.getElementById('testiPrev').addEventListener('click', () => geser(-1));
    document.getElementById('testiNext').addEventListener('click', () => geser(1));
  }

  // Jam buka: status "Buka sekarang / Tutup" menurut waktu Indonesia Barat (WIB)
  function statusBuka(sekarang) {
    const bagian = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(sekarang);
    const ambil = (tipe) => bagian.find((p) => p.type === tipe).value;

    const hari = ambil('weekday');
    const jam = parseInt(ambil('hour'), 10) + parseInt(ambil('minute'), 10) / 60;
    const akhirPekan = hari === 'Sat' || hari === 'Sun';
    const buka = 8;
    const tutup = akhirPekan ? 12 : 20;
    const kelompok = akhirPekan ? 'weekend' : 'weekday';
    const titik = '\u00b7';

    if (jam >= buka && jam < tutup) {
      return { terbuka: true, kelompok, teks: 'Buka sekarang ' + titik + ' tutup pukul ' + (akhirPekan ? '12.00' : '20.00') };
    }
    if (jam < buka) {
      return { terbuka: false, kelompok, teks: 'Tutup ' + titik + ' buka hari ini pukul 08.00' };
    }
    return { terbuka: false, kelompok, teks: 'Tutup ' + titik + ' buka kembali besok pukul 08.00' };
  }

  const badge = document.getElementById('openStatus');
  if (badge) {
    const s = statusBuka(new Date());
    badge.textContent = s.teks;
    badge.classList.add(s.terbuka ? 'open' : 'closed');
    badge.hidden = false;
    const baris = document.querySelector('[data-hari="' + s.kelompok + '"]');
    if (baris) baris.classList.add('today');
  }
})();