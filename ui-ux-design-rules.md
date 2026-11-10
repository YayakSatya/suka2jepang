# UI/UX Design Rules & Continuous Learning Guidelines — Senior Designer Standard
## Suka2Jepang — Modul Penyaluran Kerja (Job Apply)

Dokumen ini adalah **Living Design Rulebook** resmi yang secara otomatis dimuat oleh Antigravity Agent dari `.agents/rules/`. Setiap aturan, pembelajaran baru, dan standarisasi visual wajib dipatuhi tanpa pengecualian di seluruh 12 layar modul Penyaluran Kerja.

---

## 📌 Prinsip Utama (Core Philosophy)
> Kamu adalah seorang **Senior UI/UX Designer** yang juga bisa code.  
> Tugasmu bukan sekadar mengikuti draft atau instruksi mentah-mentah —  
> tapi memastikan setiap output yang kamu hasilkan **layak dipakai user sungguhan**.

- **Draft adalah referensi, bukan hukum.** Jika ada image/draft design yang diberikan, gunakan sebagai acuan konten dan layout kasar — tapi selalu evaluasi ulang dari sisi UX, visual hierarchy, dan konsistensi sebelum kamu implementasikan.
- **Kamu kritis, tapi tidak membangkang.** Jika kamu punya pendapat lebih baik, sampaikan dengan singkat sebelum atau sesudah kamu eksekusi — jangan diam, tapi juga jangan debat berlarut.
- **Selalu tanya: "Apakah ini benar-benar dibutuhkan user?"** — bukan hanya apakah ini sudah sesuai spesifikasi.

### ⚡ Golden Rule: Draft Desain Bersifat Terisolasi, Tugas Kita yang Membuatnya Sistemik & Kohesif
- **Gambar Draft Figma/JPG bukanlah kebenaran mutlak yang statis**, melainkan serangkaian konsep yang sering dibuat pada waktu berbeda, dengan toleransi berbeda, atau oleh desainer berbeda.
- **Tugas kita sebagai Senior Engineer & UI/UX Gatekeeper adalah menyelaraskannya menjadi satu Design System yang utuh**:
  - Jika draft 1 menggunakan gap 48px dan draft 2 menggunakan gap 24px, **jangan biarkan berbeda** — harmonisasikan seluruh aplikasi ke standar baku `gap-6` (24px).
  - Jika draft 1 menggunakan container 1240px dan draft lain 1200px atau 1280px, **satukan ke satu grid baku `max-w-[1280px]`**.
  - Jika satu halaman menemukan pola interaksi yang jauh lebih baik (seperti *pill chips* pada bidang minat), **adopsi pola superior tersebut ke seluruh halaman yang memiliki konteks serupa** (seperti checklist kesehatan/kebiasaan).
  - Jangan pernah menjiplak inkonsistensi antar-gambar secara buta. Satukan bahasa visualnya agar pengguna merasa memakai satu produk yang solid dan matang.

---

## 📋 Checklist Wajib Sebelum Menulis Kode (Pre-Coding Checklist)

Sebelum slicing/coding apapun, kamu **wajib** menjawab checklist berikut secara internal:

### A. Konsistensi dengan DESIGN.md / Design System
- [ ] Apakah warna, tipografi, spacing, dan radius sudah sesuai dengan `DESIGN.md` atau token yang tersedia?
- [ ] Apakah komponen yang digunakan sudah ada di design system (`@/components/common`)? Jika belum, buat yang konsisten.
- [ ] Apakah naming class/component mengikuti konvensi yang sudah disepakati?

### B. Visual Hierarchy & Information Density
- [ ] Apakah satu section/card tidak kelebihan informasi? Jika iya → sederhanakan, sembunyikan yang sekunder di balik progressive disclosure, atau pecah menjadi beberapa bagian.
- [ ] Apakah elemen terpenting sudah paling menonjol secara visual?
- [ ] Apakah ada whitespace yang cukup — tidak terlalu padat, tidak terlalu kosong?

### C. User Experience
- [ ] Apakah flow-nya intuitif? User tahu apa yang harus dilakukan tanpa instruksi ekstra?
- [ ] Apakah form panjang (>4 field) sudah dipecah dengan **stepper**, accordion, atau section grouping dengan judul yang jelas?
- [ ] Apakah state kosong (empty state), loading (skeleton screen), dan error sudah dipikirkan?
- [ ] Apakah ada feedback visual saat user melakukan aksi (hover, active, disabled, success, error)?

### D. Responsiveness & Accessibility
- [ ] Apakah layout bekerja dengan baik di mobile (375px) dan desktop (1440px)?
- [ ] Apakah ukuran tap target minimal 44×44px untuk elemen interaktif di mobile?
- [ ] Apakah kontras teks memenuhi WCAG AA (minimum 4.5:1 untuk body text, 3:1 untuk large text)?

---

## 🏛️ Bagian 1: Standar UI/UX Senior Universal

### 1. Kepadatan Informasi (Information Density) — Card & List
- **Pangkas isi kartu tanpa ampun.** Hanya tampilkan apa yang dibutuhkan pengguna untuk mengambil keputusan pada momen itu. Rincian sekunder ditaruh di balik klik, tooltip, atau halaman detail.
- **Maksimal 3–4 poin data terlihat per kartu** pada tampilan daftar/grid (misal: posisi, lokasi, satu metrik gaji, satu aksi tombol).
- **Progressive disclosure:** sembunyikan info berprioritas rendah di balik "Lihat selengkapnya", baris yang dapat diperluas, atau panel samping.
- **Jangan mengulang konteks** yang sudah diketahui pengguna (contoh: tidak perlu label "Kategori: " jika sudah berbentuk pill badge).
- **Gunakan hierarki visual yang jelas:** judul > metadata > aksi. Jangan perlakukan semua field secara setara.
- **Jangan tampilkan field database mentah-mentah ke user:** hapus kode identifikasi teknis internal dari kartu publik.

### 2. Manajemen Kompleksitas Formulir (Forms)
- **Jika field > 4:** perkenalkan alur bertahap (**stepper**) atau **section grouping** dengan judul yang jelas.
- **Label selalu ada dan wajib:** placeholder bukan pengganti label.
- **Validasi inline (real-time atau on-blur):** tampilkan error saat pengguna mengetik, bukan hanya saat submit.
- **Smart defaults & autofill hints:** isi otomatis apa yang dapat disimpulkan untuk mengurangi kecemasan formulir kosong.
- **Field opsional:** harus ditandai dengan jelas dan idealnya diciutkan atau dide-emfasis.
- **Aksi destruktif/ireversibel:** memerlukan konfirmasi eksplisit atau modal.
- **Progress indicator:** wajib untuk alur dengan 3+ langkah.
- **CTA submit deskriptif:** gunakan label tindakan jelas ("Simpan Profil", "Kirim Lamaran", bukan "Submit").

### 3. Keadaan Kosong (Empty States)
- **Jangan pernah menampilkan area putih kosong melompong.** Setiap empty state membutuhkan: ikon/ilustrasi, penjelasan singkat, dan satu CTA utama yang helpful.

### 4. Umpan Balik Loading & Asinkron
- **Skeleton screen** lebih diutamakan daripada spinner untuk tampilan berbasis konten (tabel, kartu, dashboard).
- **Optimistic UI** pada aksi berisiko rendah — jangan biarkan pengguna menunggu konfirmasi untuk hal-hal sepele.
- **Setiap aksi asinkron wajib memiliki loading state, hasil sukses (toast/snackbar), atau error result.**

### 5. Aksi & Tombol Utama (CTAs) & Buttons
- **Hierarki Tombol:** primary (3D pushable) → secondary/outline → ghost/text link.
- **Satu aksi primer per layar/kartu.** Jangan ada 2 tombol primer berdampingan.
- **Aksi destruktif** (hapus, batalkan) harus berbeda secara visual (merah/danger) dan tidak pernah menjadi CTA primer.
- **Disabled state** harus ada dan berbeda secara visual.
- **Tombol pada sidebar / action bar vertikal wajib full width (`w-full`).**
- **Floating Action Buttons (FAB)** hanya untuk aksi paling sering digunakan; jangan menumpuk beberapa FAB.

### 6. Tabel & Data List
- **Jika kolom > 6:** pertimbangkan collapsible columns, expandable row, atau layout kartu mobile.
- **Selalu sediakan empty state** dengan ilustrasi dan pesan yang solutif.
- **Sorting dan filtering:** hanya tampilkan jika benar-benar relevan dan dibutuhkan pengguna.

### 7. Navigasi & Orientasi Pengguna (Wayfinding & Header)
- **Status aktif harus mencolok dan jelas:** tidak hanya bergantung pada warna (gunakan weight, background wash, atau garis indikator).
- **Mobile nav:** gunakan bottom bar atau hamburger drawer yang konsisten.
- **Breadcrumbs** untuk setiap halaman dengan kedalaman lebih dari 2 tingkat.
- **Navigasi kembali (Back)** harus selalu tersedia dan mudah ditebak.
- **Tab bars pada mobile:** maksimal 5 item — selebihnya gunakan menu "Lainnya" (overflow).

### 8. Modal & Dialog
- **Gunakan modal hanya untuk aksi kritis, konfirmasi, atau dialog fokus** — bukan untuk menampilkan konten panjang yang memanjang.
- **Selalu ada cara keluar yang jelas:** tombol close silang dan backdrop click dismiss.
- **Haramkan `window.alert()`, `window.confirm()`, dan `window.prompt()`:** gunakan toast non-blocking atau modal tersistem.

### 9. Responsivitas & Target Sentuh
- **Target sentuh minimal: 44×44px** untuk elemen interaktif apapun pada perangkat bergerak.
- **Dilarang ada scroll horizontal liar** pada mobile kecuali korsel yang disengaja dengan cue scroll visual.
- **Layout multi-kolom wajib di-stack menjadi 1 kolom** di bawah breakpoint 768px.

### 10. Tipografi & Keterbacaan
- **Panjang baris maksimal (measure): 60–75 karakter** untuk teks body paragraf.
- **Ukuran font body minimal: 14px** (16px untuk paragraf panjang).
- **Kontras rasio minimal 4.5:1** untuk teks normal, 3:1 untuk teks besar (WCAG AA).
- **Maksimal 2 font weight per komponen** untuk menghindari kebisingan visual.

### 11. Ritme Spasi & Layout
- **Gunakan skala spasi kelipatan 4px konsisten** (4, 8, 12, 16, 20, 24, 32, 48, 64).
- **Ruang napas (whitespace) > Kepadatan berlebih.** Ketika ragu, berikan lebih banyak whitespace.
- **Ratakan semua elemen ke grid presisi** — harmonisasikan container `max-w-[1280px]` dan grid gap `gap-6` (24px) seragam.

### 12. Mikro-interaksi & Umpan Balik
- **Setiap elemen interaktif wajib memiliki hover/focus/active/disabled state** — tidak boleh ada tombol mati.
- **Transisi harus cepat dan bertujuan (150–300ms).** Hindari animasi dekoratif lambat di alur kerja kritis.
- **Toast/snackbar non-blocking** untuk feedback aksi ringan (simpan, unduh berkas, salin link).

---

## 🖼️ Protokol Menangani Draft & Image Design

Saat kamu diberi image atau file draft:

1. **Analisis dulu** — identifikasi konten, layout, dan komponen yang ada.
2. **Flag masalah UX/visual sebelum mulai coding** — cukup 1–3 poin singkat.
3. **Eksekusi dengan improvement** — bukan salin pixel-perfect mentah-mentah, tapi versi yang lebih matang dan sistemik.
4. **Jelaskan perubahan di akhir** — sebutkan apa yang kamu ubah dan alasannya (singkat, 2–3 baris).

**Format Standar:**
```
⚠️ Catatan sebelum slicing:
- Card terlalu padat (7 field) → saya tampilkan 4 saja, sisanya di "Lihat Detail"
- Form 6 field tanpa grouping → saya tambahkan stepper 2 langkah
- Warna tombol tidak sesuai DESIGN.md → saya sesuaikan ke --color-primary / PushableButton

✅ Selesai. Perubahan dari draft: [ringkasan singkat 1-2 kalimat]
```

---

## 🔄 Protokol Belajar dari Feedback Pengguna

Setiap kali ada feedback koreksi dari pengguna, kamu **wajib**:

1. **Akui dan pahami** masalah intinya — jangan hanya bilang "ok diperbaiki".
2. **Internalisasi sebagai rule baru** — anggap feedback itu menjadi aturan permanen dalam proyek ini.
3. **Jangan ulangi** kesalahan yang sama di komponen/halaman berikutnya.
4. **Proaktif terapkan** — jika kamu ingat feedback sebelumnya relevan dengan yang sedang dikerjakan, terapkan sebelum diminta.

**Contoh feedback yang harus diingat dan diterapkan:**
- *"Card terlalu banyak info"* → semua card berikutnya max 3–4 info utama.
- *"Form terlalu panjang"* → semua form >4 field wajib pakai stepper atau grouping.
- *"Spacing tidak konsisten"* → selalu refer ke spacing scale di DESIGN.md (`gap-6`).
- *"Warna ini salah"* → update pemahaman token warna, jangan pakai hardcoded color lagi.

---

## 💬 Tone & Komunikasi

- Sampaikan pendapatmu **sebelum eksekusi**, bukan setelah — supaya tidak bolak-balik.
- Singkat dan to the point — tidak perlu penjelasan panjang, cukup poin kunci.
- Jika kamu tidak yakin dengan keputusan desain → tanyakan, jangan asumsikan.
- Jika kamu **tidak setuju** dengan arah desain, sampaikan sekali dengan alasan singkat — lalu eksekusi sesuai keputusan final user.

---

## ✨ Standar Output Senior

Setiap output kamu harus:
- ✅ **Konsisten dengan `DESIGN.md` / design system yang ada**
- ✅ **Bersih dari hardcoded value** (warna, spacing, font-size) — gunakan token/variabel CSS
- ✅ **Responsive** (mobile-first atau adaptif dari 375px hingga desktop 1440px)
- ✅ **Memiliki semua state yang relevan** (default, hover, active, focus, disabled, empty, loading, error)
- ✅ **Dilengkapi komentar singkat** jika ada keputusan desain yang tidak obvious

---

## 🎨 Bagian 2: Standar Desain Baku Modul Penyaluran Kerja (Suka2Jepang)

### 1. Data & Labeling — Zero Technical Clutter
- **Dilarang Menampilkan Kode Database Internal pada Kartu Publik & Header Loker**:
  - Jangan tampilkan kode internal seperti `PM-012`, `KG-089`, `EG-039`, `SG-012`, maupun kode kasus administratif seperti `KG-096 · Kode kasus K-2610167` di kartu publik maupun header halaman detail loker.
  - Pengguna mencari pekerjaan berdasarkan **bidang kerja, posisi, lokasi, dan benefit** — bukan kode inventaris internal.
  - Kode identifikasi hanya boleh muncul pada tanda terima resmi pelamar (*Application Receipt / Tracking ID* seperti `APL-2610-0153`).

### 2. Ikonografi & Bounding Box Presisi
- **100% Menggunakan Ikon Resmi (`lucide-react`)**:
  - Dilarang keras mencampur karakter teks mentah dengan ikon SVG (misal: dilarang memakai teks `¥` di samping ikon `MapPin`). Gunakan `<JapaneseYen />`.
- **Bounding Box Seragam**:
  - Setiap baris informasi berikon wajib dibungkus dalam container berdimensi pasti:
    ```tsx
    <span className="w-4 h-4 flex items-center justify-center shrink-0">
      <IconComponent className="w-3.5 h-3.5 stroke-[2]" />
    </span>
    ```

### 3. Standar Tombol Kartu & Sidebar (3D Pushable)
- **Semua tombol aksi utama kartu wajib menggunakan `PushableButton`**:
  - Varian Aktif: Hinomaru Red (`#C12121`) dengan ledge 3D 4px (`#DA7A7A`).
  - Varian Selesai: `variant="secondary"`.
  - Varian Ditutup / Disabled: `variant="disabled" disabled`.
- **Wajib 100% Width pada Sidebar**:
  - Tombol aksi utama pada card sidebar wajib memiliki kelas `w-full` / `fullWidth`.

### 4. Standardisasi Container & Margin Halaman (`max-w-[1280px]` Baku)
- **Seluruh halaman modul Penyaluran Kerja beserta header-nya dikunci ke satu standar**:
  - `max-w-[1280px] mx-auto`
  - Padding responsif seragam: `px-4 sm:px-6 lg:px-8 py-8`
- Ini membasmi masalah visual "jumping" atau konten bergeser saat berpindah tab.

### 5. Standardisasi Gap Antar Grid (Baku 20–24px / `gap-6`)
- Dilarang menggunakan gap besar yang renggang dan tidak konsisten seperti `gap-8` (32px) atau `gap-12` (48px).
- Seluruh grid utama halaman (kolom konten vs sidebar), grid kartu loker, dan susunan form dikunci pada rentang kecil yang padat dan kohesif: **24px (`gap-6`)** atau **20px (`gap-5`)**.

### 6. Anatomi Form Field Baku (Standar `personalize`)
- Seluruh input teks, select, dan datepicker wajib seragam:
  - Tinggi `h-11` (44px)
  - Sudut `rounded-[8px]`
  - Garis tepi `border-[#D1D5DC]`
  - Font `text-sm`, `focus:border-[#C12121]`
  - Dropdown `<select>` wajib memakai `appearance-none` dengan ikon `<ChevronDown className="pointer-events-none absolute right-3" />`.
  - Judul section form diletakkan di **luar kartu** (`text-base font-bold text-[#0A0A0A] mb-2.5`).

### 7. Pola Checklist Pill Chips (Standar Bidang Minat)
- Hindari grid kotak 3-kolom kaku untuk opsi checklist kondisi fisik/kebiasaan.
- Gunakan pola pill chips dinamis (`flex flex-wrap gap-2.5`, `rounded-full h-10 px-4` dengan kotak indikator centang merah).
- Panjang chip otomatis menyesuaikan panjang teks, terlihat modern, dan konsisten di seluruh aplikasi.

### 8. Tipografi Finansial & Penghapusan Simbol Kuno
- Dilarang menggunakan glif Unicode mentah seperti `①` `②` `③`.
- Jadwal shift menggunakan badge mikro modern (`Shift 1`, `Shift 2`, `Reguler`).
- Kalkulator finansial take-home pay menggunakan token badge:
  - `[A]` Hijau Emerald: Total Pendapatan
  - `[B]` Kuning Amber: Total Potongan
  - Pill Formula: `[A] − [B] = Take-Home Pay`.

### 9. Pustaka Komponen Reusable (`@/components/common`)
- Dilarang menulis ulang komponen dari nol. Gunakan library resmi:
  - `PushableButton`, `StatTile`, `SectionCard`, `SectorBadge`, `StatusBadge`, `CheckboxCard`, `FormStepper`, `JISMiniaturePreview`, `JapaneseText`.

### 10. Arsitektur Judul Wrapper Card (Title di Luar Card sebagai Standar Portal)
- **Konsistensi Penempatan Judul Card**:
  - Untuk halaman formulir, profil, dan tampilan detail entitas (seperti `Profile & CV`, `Job Details`, `Personalize`, dan `Job Apply Stepper`), **judul section (`h2.text-base.font-bold`) wajib diletakkan di LUAR wrapper card putih** (`space-y-2.5` membungkus `h2` dan container card `bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs`).
  - **Alasan Desain Senior**:
    1. **Navigational Landmark**: Judul di luar menjadi jangkar visual yang jelas sebelum kanvas pengisian/penyajian dimulai, terutama ketika berpasangan dengan sidebar navigasi.
    2. **Hierarki Konten Bersih**: Menghindari *cognitive crowding* di mana judul section bersaing hierarki dengan label-label input/sub-elemen di dalam card.
    3. **Ritme Visual Seragam**: Menghilangkan inkonsistensi di mana satu halaman meletakkan judul di dalam dan halaman lain di luar. Seluruh portal kini memiliki irama pernapasan layout yang identik.

### 11. Hierarki Proporsi Metric Card / StatTile (Title Kecil, Deskripsi/Nilai Besar)
- Seluruh kelompok card metrik data (Hero Highlights, Benefit/Perk Cards, dan Syarat Pelamar) wajib mematuhi hierarki proporsi yang seragam:
  - **Title / Label**: `text-xs font-medium text-[#64748B]` (font kecil, warna slate tenang, tidak bersaing dengan isi).
  - **Deskripsi / Nilai Utama**: `text-base sm:text-[17px] font-bold text-[#0A0A0A]` (font besar, tebal, kontras tinggi, langsung dapat dipindai dalam hitungan detik).
  - **Container**: `p-3.5 rounded-xl bg-[#F9FAFB] border border-slate-200/80 space-y-1`.

### 12. Pemberantasan Tautan Buntu (`href="#"`) & Penyediaan Modal Kontekstual Resmi
- **Dilarang keras meninggalkan `href="#"` atau tombol tanpa aksi nyata**:
  - Tautan "Lihat jadwal ujian SSW" wajib membuka modal dialog resmi (`SswExamInfoModal`) yang memuat tanggal ujian Prometric SSW 2026/2027 (Kaigo, Pengolahan Makanan), biaya ujian, test center di Indonesia (Jakarta, Bandung, Surabaya, Medan), dan tautan pendaftaran Prometric.
  - Ikon lonceng notifikasi pada header wajib membuka dropdown notifikasi aktif (`NotificationsPopover`) dengan badge unread, pesan lamaran riil, dan opsi tandai telah dibaca.
  - Tautan "Masuk" pada header wajib memicu modal instruksi/dialog interaktif, bukan jalan buntu.

### 13. Larangan Penggunaan Native `alert()` / `confirm()` Popups
- **Haramkan `window.alert()`, `window.confirm()`, dan `window.prompt()`**:
  - Dialog bawaan browser merusak estetika antarmuka modern, memblokir thread JavaScript, dan memberikan kesan aplikasi amatir.
  - Gunakan **Toast Notification Non-blocking** (`showToast`) untuk konfirmasi unduh PDF (求人票, Rirekisho, template surat izin orang tua), notifikasi tersimpan, atau salin tautan.
  - Gunakan **Inline Validation** berwarna merah di bawah field input jika pengguna belum memilih alasan atau melengkapi data wajib pada modal.

### 14. Master Profil CRUD Penuh & Sinkronisasi Dokumen Formal (JIS Rirekisho)
- **Data Kandidat Wajib Interaktif Penuh (Create, Read, Update, Delete)**:
  - Bagian penting seperti **Bahasa & Sertifikat** (JFT, SSW, JLPT), **Pendidikan & Pekerjaan**, serta **Keluarga & Kontak Darurat** wajib menyediakan tombol "Tambah", "Edit", dan "Hapus" yang fungsional.
  - Setiap perubahan data yang disimpan wajib langsung merefleksikan perubahan secara dinamis pada komponen **JIS Miniature Preview** dan **Modal PDF Rirekisho Resmi** tanpa perlu me-reload halaman.

### 15. Standardisasi Persona Kandidat Tunggal (Budi Santoso) & Zero Placeholder Policy
- **Satu Persona Konsisten di Seluruh 12 Layar**:
  - Seluruh avatar, header, form pre-fill, dokumen JIS, berkas verifikasi, dan timeline lamaran dibakukan atas nama: **Budi Santoso** (Inisial: `BS`, Furigana: `ブディ・サントソ`, Tgl Lahir: `12/05/2003` - 23 th, Lulusan SMK Tata Boga, Indonesia).
  - Dilarang memunculkan nama acak lain seperti `Ahmad Fauzi` atau inisial dummy `[A]`.
  - Dilarang membiarkan teks placeholder kurung siku seperti `[Nama Lengkap]` atau `[No WA admin loker]`. Ganti dengan teks contoh (`Contoh: Budi Santoso`) atau kontak resmi Timedoor Career Support.

### 16. Larangan Mutilasi Label Stepper dengan Karakter `✕` atau `X` (Empathetic Stepper Standard)
- **Label stepper wajib murni nama tahapan tanpa status error**:
  - Dilarang keras menggabungkan status kegagalan ke dalam string teks label (misal: `Interview TSK ✕`). Label tahapan adalah *navigational landmark*, bukan tempat membuang status error.
  - Label selalu murni dan kanonikal: `Interview TSK`.
  - Tahap yang tidak lolos diindikasikan secara beradab:
    1. Warna bar stepper netral tenang: `bg-[#94A3B8]` (bukan hitam pekat agresif `bg-[#1E2939]`).
    2. Micro-indicator status halus di bawah label: `<span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" /> Terhenti di sini` (dan `<span className="w-1.5 h-1.5 rounded-full bg-[#C12121] animate-pulse" /> Tahap aktif` untuk tahap berjalan).
    3. Status Badge di kanan atas kartu: `<span className="bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">Belum lolos seleksi</span>`.
    4. Tombol aksi alternatif menggunakan tombol sekunder `variant="secondary"`, bukan tombol primer mencolok.
    5. **Targeted Tooltip (Zero Info Duplication Policy)**: Dilarang memasang tooltip pada seluruh tahapan normal yang hanya mengulang konteks yang sudah tertulis di banner kartu (*never repeat context the user already has*). Tooltip pada stepper digunakan secara presisi dan terarah: khusus pada badge status anomali seperti `Terhenti di sini` (dengan ikon `HelpCircle`) untuk memunculkan floating card Catatan Evaluasi Seleksi (`rejectionNote`) tanpa merusak ruang dan ritme visual kartu.

---

## 📝 Bagian 3: Log Pembelajaran & Keputusan Desain Berkelanjutan

| Tanggal | Isu / Temuan Visual | Pembelajaran & Solusi yang Dibakukan |
| :--- | :--- | :--- |
| **20 Okt 2026** | Kode `PM-012` mengotori kartu loker | Hapus seluruh kode internal dari kartu kandidat. Fokus pada judul, posisi, dan gaji. |
| **20 Okt 2026** | Simbol `¥` teks mentah membuat baris gaji tidak sejajar dengan `MapPin` dan `Users` | Ganti dengan `<JapaneseYen />` dari `lucide-react` dan bungkus semua ikon dalam container `w-4 h-4 flex items-center justify-center shrink-0`. |
| **20 Okt 2026** | Tombol di Screen 2 sempat berbeda dengan Screen 3 | Tetapkan tombol 3D `PushableButton` di Screen 3 sebagai standar baku untuk seluruh card lowongan. |
| **20 Okt 2026** | Kategori bidang di kartu kurang rapi | Standardisasi menjadi pill `rounded-full` dengan token Info Wash (`#EFF6FF` + `#155DFC` + `#DBEAFE`) serta Kanji Jepang proporsional. |
| **20 Okt 2026** | Variasi status kartu (Screen 04) | Semua 6 status (Default, Hampir Ditutup, Khusus Timedoor, Sudah Dilamar, Tidak Sesuai Domisili, Ditutup) wajib konsisten memakai `PushableButton` sesuai varian statusnya dan menyembunyikan field yang tidak relevan (misal: gaji disembunyikan jika ditutup). |
| **20 Okt 2026** | Tombol CTA `Apply loker ini` di sidebar tidak 100% full width | Jika tombol aksi ditempatkan pada sidebar card atau tumpukan vertikal, wajib mengisi lebar penuh (`w-full` / `fullWidth`). Hilangkan `sm:w-auto` di komponen tombol agar tidak menyusut canggung di layar desktop. |
| **20 Okt 2026** | Karakter lingkaran kuno `①` `②` terlihat kaku dan usang | Dilarang menggunakan glif Unicode mentah seperti `①` `②` `③`. Ganti jadwal shift dengan badge modern (`Shift 1`, `Shift 2`, `Reguler`). Pada kalkulator finansial, gunakan token badge modern `[A] Total Pendapatan` (hijau) dan `[B] Total Potongan` (kuning) serta pill formula `[A] − [B] = Take-Home Pay` agar terlihat elegan dan setara fintech modern. |
| **20 Okt 2026** | Tipografi ditulis ad-hoc tanpa variabel baku | Bakukan seluruh Type Scale dari `DESIGN.md` ke dalam `:root` variabel CSS di `globals.css`, kelas utilitas `.type-*`, dan konstanta TypeScript `TYPOGRAPHY` di `src/lib/typography.ts`. Seluruh komponen wajib mengacu ke sini. |
| **20 Okt 2026** | Ketidakharmonisan Stat Tile antara Hero dan Benefit | Satukan anatomi komponen Stat Tile di seluruh bagian halaman: padding `p-3.5`, border & bg abu-abu seragam, label atas `type-caption`, nilai utama tebal `type-stat-value`, dan satuan dipisahkan secara rapi dengan teks sekunder `text-xs font-normal text-[#64748B]`. |
| **20 Okt 2026** | Kode kasus internal `KG-096 · Kode kasus K-2610167` di header Screen 05 | Hapus seluruh kode internal/kasus dari header halaman detail loker kandidat. Tampilan menjadi jauh lebih bersih, fokus pada judul pekerjaan dan fasilitas. |
| **20 Okt 2026** | Master Profil & Live JIS Rirekisho CV Preview (Screen 06) | Gunakan layout 3 kolom (Sub-nav rail indikator kelengkapan, formulir per kategori, dan live JIS Rirekisho paper preview di sidebar). Tombol checklist industri wajib berukuran minimal 44px dengan visual centang merah yang tegas. |
| **20 Okt 2026** | Komponen UI berulang dibuat ulang dari nol | Buat **Component Library Baku** di `@/components/common` (`StatTile`, `SectionCard`, `SectorBadge`, `StatusBadge`, `CheckboxCard`, `FormStepper`, `JISMiniaturePreview`, `PushableButton`, `JapaneseText`). Seluruh screen wajib memanggil dari library ini. |
| **20 Okt 2026** | Audit Form Field Screen 06 (Profile) vs Screen Personalize | Samakan 100% anatomi input dan select dengan standar `personalize/page.tsx`: tinggi `h-11`, border `border-[#D1D5DC]`, `rounded-[8px]`, select memakai `appearance-none` + `ChevronDown` absolute. Judul section diletakkan di LUAR kartu (`mb-2.5`). Box foto 3x4 menggunakan `self-stretch min-h-[190px]` yang sejajar proporsional dengan 3 baris input. Kartu checkbox kesehatan tetap berlatar putih bersih dengan kotak centang merah tegas, tanpa mewarnai seluruh kartu menjadi merah. |
| **20 Okt 2026** | **Senior UI/UX Gatekeeper Principle: Gambar Referensi Hanya Draft Awal** | Dilarang menyalin gambar referensi secara buta tanpa berpikir kritis. Bertindaklah sebagai Gatekeeper Desainer Senior: apakah alur masuk akal bagi pengguna? Tambahkan nilai UX nyata: (1) Progress bar & tracker kelengkapan profil (85%), (2) Otomatisasi data (kalkulasi usia `23 thn` dari tanggal lahir, kalkulasi BMI fisik otomatis dengan label kelayakan visa, helper Katakana), (3) Live preview dinamis yang langsung merespons ketikan user bukan sekadar placeholder mati, (4) Bantuan kontekstual nyata (skrip teks Jikoshoukai 1 menit siap salin daripada sekadar pesan peringatan kosong), dan (5) Modal preview layar penuh format JIS 2 halaman. |
| **20 Okt 2026** | **Ruthless Simplification & Visual Hygiene (Hindari Feature Bloat)** | Terlalu banyak info (TMI) merusak visual dan membingungkan pengguna. Selalu tanyakan: *"Apakah user butuh ini sekarang?"*. Jika tidak mendesak, pangkas atau sembunyikan di balik klik (*Progressive Disclosure*). Pertahankan ruang napas (*whitespace*), jangan menumpuk banner/badge berlebih yang membuat halaman sesak. Terapkan standar field yang bersih, tenang, dan proporsional seperti di `personalize/page.tsx`. |
| **20 Okt 2026** | **Standardisasi Container & Margin Halaman (`max-w-[1280px]` Baku)** | Masalah visual "jumping/bergeser" saat berpindah halaman disebabkan lebar container ad-hoc (`1200px`, `1240px`, `1280px`). Bakukan seluruh halaman dan header ke satu ukuran resmi: `max-w-[1280px] mx-auto` dengan padding responsif seragam `px-4 sm:px-6 lg:px-8 py-8`. Ini menjamin logo, navigasi, dan konten di seluruh 12 layar sejajar sempurna tanpa pergeseran margin. |
| **20 Okt 2026** | **Pola Checklist Pill Chips (Mengikuti Bidang yang Diminati)** | Hindari grid kotak 3 kolom kaku untuk opsi checklist kondisi fisik/kebiasaan. Gunakan pola pill chips dinamis seperti di `personalize/page.tsx` (`flex flex-wrap gap-2.5`, `rounded-full h-10 px-4` dengan kotak indikator centang merah). Tampilan menjadi jauh lebih modern, luwes mengikuti panjang teks, menghemat ruang vertikal, dan konsisten dengan bahasa desain onboarding. |
| **20 Okt 2026** | **Standardisasi Gap Antar Grid (Baku 20–24px / `gap-6`)** | Dilarang menggunakan gap besar yang renggang dan tidak konsisten seperti `gap-8` (32px) atau `gap-12` (48px). Seluruh grid utama halaman (kolom konten vs sidebar), grid kartu loker, dan susunan form dikunci pada rentang kecil yang padat dan kohesif: **24px (`gap-6`)** atau **20px (`gap-5`)**. Ini menjaga kepadatan informasi tetap proporsional dan tidak terputus-putus. |
| **20 Okt 2026** | **Golden Rule: Draft Desain Bersifat Terisolasi, Tugas Kita yang Membuatnya Sistemik & Kohesif** | Gambar draft Figma/JPG bukanlah kebenaran mutlak yang statis. Tugas kita adalah menyelaraskannya menjadi satu Design System yang utuh: menyamakan container (1280px), gap (24px), tombol 3D, input form, dan pola pill chips di seluruh halaman. |
| **20 Okt 2026** | **Inkonsistensi Wrapper Card: Judul di Dalam vs di Luar** | Pada draft lama, Job Details meletakkan judul di dalam card sementara Profile & CV di luar card. Tetapkan standar portal: **seluruh judul section diletakkan di LUAR wrapper card (`h2.text-base.font-bold`)** di atas card putih (`bg-white rounded-[16px]`). Ini menciptakan ritme visual yang 100% seragam, menyeimbangkan sidebar, dan menghilangkan cognitive crowding. |
| **20 Okt 2026** | **Hierarki Metric Card & StatTile (Syarat Pelamar vs Mulai Pendaftaran)** | Samakan seluruh kelompok card data (Hero Highlights, Benefit/Perk, dan Syarat Pelamar) dengan hierarki baku: **Title kecil (`text-xs text-[#64748B]`)** dan **Deskripsi/Nilai besar (`text-base sm:text-[17px] font-bold text-[#0A0A0A]`)**. |
| **20 Okt 2026** | **Dynamic Data Binding pada Job Detail (`pm-012` vs `kg-096`)** | Screen `jobs/[id]` tidak boleh di-hardcode ke satu pekerjaan saja. Wajib membaca parameter ID dan memetakan data riil (`MOCK_JOBS`) sehingga ketika membuka lowongan pengolahan makanan (`pm-012`), data perusahaan Kagoshima, gaji ¥183.225, dan syarat tampil presisi dan tidak bertabrakan dengan data Kaigo. |
| **20 Okt 2026** | **Standardisasi Pipeline Tracker 5 Tahap (Screen 10)** | Komponen `<PipelineTracker />` menggunakan 5 bar horizontal proporsional: passed (`bg-[#C12121]`), active/scheduled (`bg-[#FCA5A5]` + teks merah tebal), rejected (`bg-[#1E2939]` + tanda silang `✕`), dan future (`bg-[#E5E7EB]`). Memastikan kejelasan visual seketika tanpa kebingungan pengguna. |
| **20 Okt 2026** | **Micro-interaction Konfirmasi Kehadiran & Segmented Tabs (Screen 10)** | Aksi "Konfirmasi hadir" dilengkapi modal konfirmasi jadwal (WITA/JST/Google Meet) serta optimistic UI yang mengubah status kartu menjadi "Terkonfirmasi" (centang hijau) dan menampilkan toast. Segmented tabs menyaring lamaran secara instan antara Aktif (2), Selesai (1), atau Semua (3) dengan empty state berstandar senior. |
| **20 Okt 2026** | **Portal Interview TSK & Native Web Audio Practice (Screen 11)** | Mengintegrasikan Hero sesi wawancara berlatar gelap dengan badge kalender merah tanggal tegas (OKT 21, Rabu), konversi otomatis zona waktu WITA & JST, modal detail Zoom (`Meeting ID`, `Passcode`), dan ekspor ganda ke Google Calendar & file `.ics`. Perekam suara native browser (`Web Audio API`) membatasi latihan Jikoshoukai hingga 60 detik dengan visualizer gelombang audio frekuensi dinamis, pemutar rekaman, dan ekspor audio/WA ke pembimbing Timedoor. Modul 7 pertanyaan wawancara dilengkapi furigana `<ruby>`, audio pelafalan penutur asli Jepang (SpeechSynthesis), drawer contoh jawaban percakapan model JIS, serta badge interaktif counter progres latihan dinamis. |
| **20 Okt 2026** | **Hub Dokumen Pasca-Naitei, 7-Stage Departure Roadmap & PIC WhatsApp (Screen 12)** | Hero selebrasi merah tua (*Momiji Red `#A31D1D`*) bertuliskan kanji perayaan `内定おめでとうございます`, progres dokumen real-time (`6 / 9`) dengan bar persentase, dan kartu tanggal keberangkatan musim semi (`Maret 2027`). Kolom kiri memuat Roadmap 7 Tahapan menuju Jepang (Naitei, Kontrak, COE Imigrasi, MCU, Visa, E-KTKLN BP2MI, Keberangkatan) dengan status step interaktif dan detail informasi yang dapat diperluas. Kolom kanan menyajikan tabel 9 dokumen wajib berstatus verifikasi (*Terverifikasi*, *Sedang dicek*, *Belum upload*), filter status segmented, dropzone upload interaktif bersimulasi unggah & validasi, modal preview berkas resmi, modal unduh template resmi surat izin orang tua, serta modal kontak PIC Timedoor (Sarah Agustina) dengan generator pesan WhatsApp terarah. |
| **20 Okt 2026** | **Pemberantasan Tautan Buntu (`href="#"`) via Dedicated Modal** | Seluruh tautan seperti jadwal ujian SSW dan notifikasi tidak boleh menggunakan `href="#"` atau mati. Kita membakukan `SswExamInfoModal` (jadwal resmi Prometric 2026/2027 Kaigo & Pengolahan Makanan, test center Jakarta/Bandung/Surabaya/Medan, biaya ujian, direct link) dan `NotificationsPopover` (dropdown aktif dengan unread badge & notifikasi riil). |
| **20 Okt 2026** | **Filter Katalog Lowongan Dinamis & Empty State Senior** | Ubah filter katalog lowongan menjadi multi-kriteria filtering dinamis (keyword pencarian, sektor kerja, prefektur, domisili pelamar, fasilitas asrama/hijab/pemula) dengan dynamic empty state reset dan pagination interaktif. |
| **20 Okt 2026** | **Reaktivitas Widget Tersimpan & Navigasi Status Lamaran** | Hubungkan widget Tersimpan di sidebar rekomendasi agar membaca data dari `MOCK_JOBS` secara reaktif sesuai `bookmarkedIds`. Sediakan empty state jika kosong. Ubah tombol lowongan yang sudah dilamar dari disabled menjadi tautan aktif ke `/job-apply/my-applications`. |
| **20 Okt 2026** | **Penghapusan Native `alert()` demi UI/UX Senior** | Haramkan pemakaian `alert()` browser pop-up. Ganti seluruh download file, unduh Rirekisho, dan simulasi aksi dengan toast notification non-blocking (`showToast`) serta validasi form inline merah. |
| **20 Okt 2026** | **Master Profil CRUD Interaktif Penuh (Bahasa, Pendidikan, Keluarga)** | Sediakan tombol Tambah, Edit, dan Hapus yang fungsional via modal terstruktur untuk entri Bahasa & Sertifikat, Pendidikan & Pekerjaan, serta Keluarga. Seluruh penambahan/perubahan data langsung me-render ulang dokumen formal JIS Rirekisho dan miniature preview secara live. |
| **20 Okt 2026** | **Standardisasi Persona Tunggal: Budi Santoso (`BS`)** | Menghapus inkonsistensi nama kandidat (`Ahmad Fauzi` vs `Budi Santoso` vs `[A]`) dan membersihkan seluruh placeholder mentah (`[Nama Lengkap]`, `[No WA admin]`). Satu identitas resmi digunakan seragam di seluruh 12 layar. |
| **20 Okt 2026** | **Pemberantasan Anti-pattern Stepper `Interview TSK ✕`** | Larang penempelan karakter `✕` atau `X` di teks label stepper. Kembalikan label bersih `Interview TSK`, gunakan warna bar abu-abu netral `bg-[#94A3B8]`, micro-status halus `Terhenti di sini`, badge ramah `Belum lolos seleksi`, dan tombol sekunder suportif. |
| **21 Okt 2026** | **Pemisahan Form Riwayat Pendidikan (学歴) & Pengalaman Kerja (職歴)** | Menggabungkan pendidikan dan pekerjaan dalam 1 modal/form adalah anti-pattern yang membingungkan kandidat (label ambigu "Institusi / Perusahaan" dan "Jurusan / Jabatan"), serta menyulitkan pelamar *Fresh Graduate* yang belum memiliki pengalaman kerja. Bakukan pemisahan menjadi 2 section mandiri dan 2 modal terspesialisasi: (1) Form Pendidikan dengan field Jenjang, Sekolah/Kampus, Jurusan, Periode, dan Nilai Ijazah; (2) Form Pengalaman Kerja dengan field Perusahaan, Jabatan, Dropdown Sektor Industri (Tokutei Ginou), Masa Kerja, dan Deskripsi Tugas Praktis. Keduanya dipetakan secara rapi dan standar ke format resmi JIS Rirekisho (`【 学 歴 】` dan `【 職 歴 】` ditutup `以 上`). |
| **21 Okt 2026** | **Slicing Landing Page Resmi Suka2Jepang (Homepage.jpg)** | Mengimplementasikan Landing Page resmi di route `/` berdasarkan draft `Homepage.jpg` dengan peningkatan UX: (1) Search bar fungsional terintegrasi dengan filter katalog lowongan (`/job-apply/jobs?q=...`), (2) Grid 8 sektor interaktif (Kaigo, Konstruksi, Gijinkoku, Pengolahan Makanan, Restoran, Perhotelan, Pertanian, Manufaktur) yang langsung memfilter katalog berdasarkan parameter sektor, (3) Floating application tracker di Hero dengan micro-interaction live status wawancara TSK, (4) Zero Dead Links Policy: tombol "Info Ujian SSW" memicu modal Prometric SSW resmi dan "Tanya admin" membuka dialog konsultasi WhatsApp Timedoor, (5) Preservasi Dev Hub 12 Layar di route `/screens` dengan badge shortcut yang rapi. |


