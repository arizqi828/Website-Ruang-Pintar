# 🎓 Ruang Pintar — Website Company Profile

**Dikembangkan oleh Rizqi Akbar Maulana, S.Kel** · Web Developer

Website company profile untuk **Ruang Pintar Bimbingan Belajar** (Girimekar, Cilengkrang, Kabupaten Bandung), bimbel untuk jenjang **PAUD sampai SMA**, plus persiapan **SNBT** dan kelas **mengaji**. Dibuat dari nol dengan HTML, CSS, dan JavaScript murni, tanpa framework.

🌐 **Live Demo:** https://arizqi828.github.io/Website-Ruang-Pintar/

---

## 🎯 Latar Belakang

Bimbel ini butuh etalase online yang bisa menjawab pertanyaan paling umum dari orang tua: *program apa saja yang ada, berapa biayanya, di mana lokasinya, dan bagaimana cara daftar.* Website ini dibuat supaya semua jawabannya ada dalam satu tempat dan pendaftaran cukup satu klik lewat WhatsApp.

---

## 🛠️ Teknologi

`HTML5` · `CSS3` · `JavaScript (Vanilla)` · `GitHub Pages` · `Google Fonts` · `Google Maps Embed` · `qrcode-generator`

---

## 📂 Isi Website

### 🏠 Beranda
Pengenalan bimbel, tiga pilihan layanan (Bimbel, Private, Private ke rumah), enam alasan memilih Ruang Pintar, slider testimoni, dan lokasi lengkap dengan peta.

### 📚 Layanan
Delapan program belajar dari PAUD sampai SNBT dan mengaji. Tiap kartu menampilkan **kisaran biaya otomatis**, dan saat diklik membuka pop-up berisi detail program, ketentuan, harga per pilihan layanan, serta **tombol dan QR code pendaftaran via WhatsApp**.

### 🏆 Prestasi
Galeri murid berprestasi: peningkatan nilai rapot, juara cerdas cermat, dan murid dengan semangat belajar terbaik.

### 🏫 Fasilitas & Kegiatan
Dua slider foto (fasilitas dan dokumentasi kegiatan) dengan keterangan yang berganti otomatis.

### 👥 Tentang Kami
Profil, visi, dan misi Ruang Pintar.

---

## ✨ Fitur Unggulan

- 💬 **Pendaftaran satu klik** — pesan WhatsApp sudah terisi format pendaftaran (nama anak, kelas, pilihan layanan, domisili)
- 📲 **QR code dibuat langsung di browser** sebagai SVG, isinya selalu sama dengan tombol WhatsApp
- 🕒 **Status "Buka sekarang / Tutup" real-time** mengikuti waktu WIB, walau pengunjung berada di zona waktu lain
- 🔗 **Deep link ke program tertentu**, contoh: `layanan.html#smp` langsung membuka pop-up SMP
- 🖼️ **Slider foto** dengan geser otomatis, swipe di HP, dan kontrol keyboard
- 🎈 **Tombol Chat Admin melayang**, indikator progres scroll, dan animasi muncul saat di-scroll
- 📱 **Responsif** untuk desktop, tablet, dan HP
- ♿ **Aksesibel** dengan atribut ARIA, navigasi keyboard, dan dukungan `prefers-reduced-motion`

---

## 🧠 Yang Dipelajari dan Diterapkan

- Elemen **`<dialog>`** bawaan HTML5 untuk pop-up, tanpa library
- **`IntersectionObserver`** untuk animasi saat scroll dan angka berhitung naik
- **`Intl.DateTimeFormat`** dengan zona waktu `Asia/Jakarta` untuk logika jam buka
- **CSS custom properties** sebagai design tokens (warna dan font diubah di satu tempat)
- **CSS Grid dan Flexbox** untuk tata letak responsif
- Deploy statis dengan **GitHub Pages**

---

## 📁 Struktur Folder

```
.
├── index.html
├── tentang-kami.html
├── layanan.html
├── prestasi.html
├── fasilitas-kegiatan.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── image/
```

---

## 🚀 Menjalankan di Komputer

```bash
git clone https://github.com/arizqi828/Website-Ruang-Pintar.git
cd Website-Ruang-Pintar
```

Buka `index.html` di browser, atau pakai ekstensi **Live Server** di VS Code.

---

## 📬 Kontak

- GitHub: [@arizqi828](https://github.com/arizqi828)
- Portofolio lain: lihat repository saya yang lain di profil GitHub

---

<div align="center">

⭐ Kalau proyek ini bermanfaat, kasih bintang ya!

</div>
