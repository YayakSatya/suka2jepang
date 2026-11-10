# Suka2Jepang — Style Reference

> Portal belajar bahasa Jepang dengan merah matahari terbit di atas kanvas abu-abu sangat terang. Kartu putih berborder tipis, tombol 3D yang "bisa ditekan", dan teks Jepang ber-furigana menjadi identitasnya.

**Theme:** light

Nilai diambil dari kode frontend per 20 Oktober 2026 (Next.js, Tailwind v4, shadcn/ui). Token yang di kode ditulis dalam oklch sudah dikonversi ke hex. Peran dan rekomendasi adalah interpretasi dari pola yang paling sering dipakai; aturan yang belum menjadi keputusan tim ditandai **(usulan)**. Contoh di Quick Start adalah rekonstruksi untuk prototyping, bukan salinan file kode. Dokumen ini fokus ke **Portal Siswa** (role `student`); kalau ada perbedaan dengan aplikasi yang berjalan, yang benar adalah aplikasinya.

Suka2Jepang adalah platform belajar dari LPK Timedoor untuk orang Indonesia yang bersiap mengikuti ujian JFT, JLPT, dan SSW untuk bekerja di Jepang. Portal Siswa memperlakukan setiap halaman sebagai meja belajar yang rapi: kanvas #F9FAFB, kartu putih dengan border 1px #E5E5E5 dan radius 12–16px, nyaris tanpa shadow. Merah Hinomaru #C12121 dipakai untuk aksi dan aksen. Blok merah tua #A31D1D dan navy #2B323D sesekali menjadi panggung, dihiasi sapuan kuas putih transparan. Tombol utama berbentuk 3D dengan ledge 5px sehingga terasa ringan dan main-main seperti aplikasi belajar. Teks Jepang muncul sebagai materi, selalu dengan furigana dan arti Indonesia dalam kurung. Siswa membuka aplikasi di HP dan laptop, jadi setiap pola punya bentuk mobile (carousel, menu popover) dan desktop (grid, nav pill mengambang).

## Tokens — Colors

Kolom Token berisi nama yang dipakai developer: variabel tema (`--primary`), nama palet Tailwind (`gray-50`), atau "hard-coded" kalau warnanya ditulis langsung di komponen.

| Name          | Value     | Token                                  | Role                                                                                      |
| ------------- | --------- | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Hinomaru Red  | `#C12121` | `--primary`                            | Tombol utama, link, ikon aktif, progress, chip level, top loader. Satu-satunya warna aksi |
| Ledge Red     | `#DA7A7A` | `primary/60`                           | Ledge (bagian bawah) tombol 3D utama                                                      |
| Blush         | `#F9E9E9` | `primary/10`                           | Latar chip level, bubble menu aktif                                                       |
| Blush Light   | `#FCF4F4` | `primary/5`                            | Latar radio card terpilih                                                                 |
| Sakura Wash   | `#FCEDED` | hard-coded                             | Tile riwayat skor di kartu ujian                                                          |
| Sakura Mist   | `#FDF2F2` | hard-coded                             | Track progress bar                                                                        |
| Momiji Red    | `#A31D1D` | hard-coded                             | Latar blok hero "Kursus Saya"                                                             |
| Hanko Red     | `#B92B27` | hard-coded                             | Tile ikon hiragana di kartu ujian                                                         |
| Score Red     | `#9E2724` | hard-coded                             | Angka skor di atas Sakura Wash                                                            |
| Sumi Navy     | `#2B323D` | hard-coded                             | Header gelap kartu profil; dekat dengan warna tulisan logo                                |
| Paper White   | `#FFFFFF` | `--background`                         | Permukaan kartu, dialog, input, header                                                    |
| Canvas Mist   | `#F9FAFB` | `gray-50`                              | Latar halaman Portal Siswa, strip header kartu                                            |
| Hairline      | `#E5E5E5` | `--border`                             | Border kartu dan divider default                                                          |
| Soft Gray     | `#E5E7EB` | `gray-200`                             | Skeleton, divider di dalam kartu, border empty state                                      |
| Input Gray    | `#D1D5DC` | `--secondary` / `--muted` (`gray-300`) | Border input, ledge tombol sekunder, track tab, tombol disabled                           |
| Pebble        | `#99A1AF` | `gray-400`                             | Ikon dan dekorasi saja; terlalu pucat untuk teks                                          |
| Stone         | `#6A7282` | `gray-500`                             | Placeholder, label statistik, teks sekunder kecil                                         |
| Muted Ink     | `#737373` | `--muted-foreground`                   | Caption, deskripsi, teks pendukung                                                        |
| Graphite      | `#4A5565` | `gray-600`                             | Paragraf deskripsi, arti Indonesia di kicker Jepang                                       |
| Charcoal      | `#1E2939` | `gray-800`                             | Judul hero, teks tombol sekunder, latar tab aktif                                         |
| Heading Ink   | `#171717` | `--secondary-foreground`               | Judul dan label form                                                                      |
| Ink           | `#0A0A0A` | `--foreground`                         | Teks utama                                                                                |
| Duo Green     | `#0FAF13` | `--primary-duo`                        | Bar pemutaran audio soal. Hijau dari logo LPK Timedoor; jangan untuk teks                 |
| Pass Green    | `#107C41` | hard-coded                             | Teks dan ikon status Lulus, skor lulus                                                    |
| Pass Wash     | `#ECFDF5` | `emerald-50`                           | Latar badge Lulus dan tint sukses                                                         |
| Present Green | `#00BC7D` | `emerald-500`                          | Sel kalender Hadir, bar sukses                                                            |
| Quota Green   | `#148842` | hard-coded                             | Teks chip "Sisa kesempatan" di atas `#EBFCF1`                                             |
| Fail Red      | `#BE2528` | hard-coded                             | Teks dan ikon status Belum lulus, skor gagal                                              |
| Fail Wash     | `#FFF1F2` | `rose-50`                              | Latar badge Belum lulus dan tint gagal                                                    |
| Error Red     | `#FB2C36` | `red-500`                              | Border dan pesan error form, tanda wajib `*`                                              |
| Destructive   | `#E7000B` | `--destructive` (`red-600`)            | Aksi berbahaya                                                                            |
| Warning Amber | `#FFB900` | `amber-400`                            | Sel kalender Terlambat, bar peringatan                                                    |
| Warning Ink   | `#973C00` | `amber-800`                            | Teks penanda "ragu-ragu" dan peringatan di atas `#FFFBEB`                                 |
| Info Blue     | `#155DFC` | `blue-600`                             | Ikon dan aksen info, chip "Powered by Timedoor AI"                                        |
| Info Wash     | `#EFF6FF` | `blue-50`                              | Latar pengumuman tipe info                                                                |
| Event Purple  | `#8200DB` | `purple-700`                           | Teks pengumuman tipe event di atas `#FAF5FF`                                              |
| Absent Gray   | `#6B7280` | hard-coded                             | Sel kalender Tidak hadir                                                                  |
| Blacklist Red | `#DC2626` | hard-coded                             | Sel kalender Blacklist                                                                    |

**Skala warna skor (usulan):** ≥ 80% Pass Green, 60–79% `amber-600` `#E17100`, < 60% Fail Red. Kartu ujian lama masih memakai skala empat tingkat (`green-400` / `yellow-400` / `orange-400` / `red-400`); jangan dipakai untuk desain baru.

## Tokens — Typography

### Onest — Seluruh UI: judul, body, label, tombol, angka. Judul memakai tracking rapat (-0.025em) supaya padat; micro label uppercase memakai tracking lebar (+0.05em) supaya tetap terbaca di 10px. · `--font-sans`

- **Substitute:** Segoe UI, Roboto, Helvetica Neue, sans-serif
- **Weights:** 400, 500, 600, 700 (800 hanya di judul halaman login)
- **Sizes:** 10px, 11px, 12px, 13px, 14px, 15px, 16px, 18px, 20px, 24px, 26px, 28px, 36px, 48px, 54px
- **Line height:** 1.00, 1.25, 1.33, 1.43, 1.50, 1.56, 1.625
- **Letter spacing:** -0.05em di judul kartu ujian 26px; -0.025em di judul halaman dan display; normal di body; +0.05em di micro label uppercase
- **OpenType features:** `"tnum"` untuk angka skor dan statistik
- **Role:** Seluruh UI: judul, body, label, tombol, angka. Judul memakai tracking rapat (-0.025em) supaya padat; micro label uppercase memakai tracking lebar (+0.05em) supaya tetap terbaca di 10px.

### Noto Sans JP — Teks Jepang: kanji, kana, furigana, dan salam Jepang di panel login. Di kode font ini dipetakan ke token `font-mono`, jadi teks Jepang otomatis memakai Noto Sans JP saat dibungkus komponen `JapaneseText`. · `--font-mono`

- **Substitute:** Hiragino Sans, Yu Gothic, sans-serif
- **Weights:** 600, 700 (furigana selalu 700)
- **Sizes:** 16px (kicker section), 48px (salam di panel login)
- **Line height:** 1.25, 1.50
- **Letter spacing:** -0.025em
- **Role:** Teks Jepang: kanji, kana, furigana, dan salam Jepang di panel login. Di kode font ini dipetakan ke token `font-mono`, jadi teks Jepang otomatis memakai Noto Sans JP saat dibungkus komponen `JapaneseText`.

### Type Scale

| Role          | Family       | Weight | Size               | Line Height | Letter Spacing | Token                                       |
| ------------- | ------------ | ------ | ------------------ | ----------- | -------------- | ------------------------------------------- |
| micro-label   | Onest        | 700    | 10px               | 1.5         | +0.05em        | `text-[10px] uppercase tracking-wider`      |
| nav-label     | Onest        | 500    | 11px               | 1.5         | normal         | `text-[11px]`                               |
| caption       | Onest        | 500    | 12px               | 1.33        | normal         | `text-xs`                                   |
| stat-label    | Onest        | 500    | 13px               | 1.5         | normal         | `text-[13px]`                               |
| body          | Onest        | 400    | 14px               | 1.43        | normal         | `text-sm`                                   |
| label         | Onest        | 600    | 14px               | 1           | normal         | `text-sm font-semibold`                     |
| button        | Onest        | 500    | 14px               | 1.43        | normal         | `text-sm font-medium`                       |
| description   | Onest        | 400    | 15px               | 1.5         | normal         | `text-[15px]`                               |
| input         | Onest        | 500    | 16px               | 1.5         | normal         | `text-base font-medium`                     |
| body-long     | Onest        | 400    | 16px               | 1.625       | normal         | `text-base leading-relaxed`                 |
| block-title   | Onest        | 700    | 18px               | 1.56        | normal         | `text-lg font-bold`                         |
| section-title | Onest        | 600    | 20px               | 1.4         | normal         | `text-xl font-semibold`                     |
| stat-value    | Onest        | 700    | 20px               | 1.25        | normal         | `text-xl font-bold leading-tight`           |
| page-title    | Onest        | 700    | 22–28px (fluid)    | 1.25        | normal         | `text-[clamp(1.375rem,1rem+1.6vw,1.75rem)]` |
| card-display  | Onest        | 700    | 26px               | 1.25        | -0.05em        | `text-[26px] tracking-tighter`              |
| hero-display  | Onest        | 700    | 36px → 48px → 54px | 1.11 → 1.00 | -0.025em       | `text-4xl md:text-5xl lg:text-[54px]`       |
| jp-kicker     | Noto Sans JP | 600    | 16px + furigana    | 1.5         | -0.025em       | `JapaneseText text-base font-semibold`      |
| jp-greeting   | Noto Sans JP | 700    | 48px               | 1.25        | -0.025em       | `text-5xl font-mono`                        |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable. Kartu siswa lega (padding 16–24px); tabel di dashboard staff lebih rapat.

### Spacing Scale

| Name | Value | Token      |
| ---- | ----- | ---------- |
| 1    | 4px   | `gap-1`    |
| 1.5  | 6px   | `gap-1.5`  |
| 2    | 8px   | `gap-2`    |
| 3    | 12px  | `gap-3`    |
| 4    | 16px  | `gap-4`    |
| 5    | 20px  | `p-5`      |
| 6    | 24px  | `gap-6`    |
| 8    | 32px  | `p-8`      |
| 10   | 40px  | `py-10`    |
| 12   | 48px  | `py-12`    |
| 24   | 96px  | `pb-24`    |
| 28   | 112px | `md:pb-28` |

### Border Radius

| Element                        | Value                 |
| ------------------------------ | --------------------- |
| buttons                        | 8px                   |
| inputs & selects               | 8px                   |
| tabs (track / tab)             | 8px / 6px             |
| item cards (ujian, radio card) | 12px                  |
| icon tiles 48px                | 12px                  |
| icon tile 56px                 | 14px                  |
| dropdown menus                 | 12px                  |
| empty states                   | 12px                  |
| section cards & widgets        | 16px                  |
| course cards                   | 16px                  |
| confirm dialogs                | 16px                  |
| floating navigation            | 16px                  |
| hero blocks                    | 20px (12px di mobile) |
| pills, badges, chips           | 9999px                |
| avatars & progress bars        | 9999px                |
| quota chip                     | 6px                   |

### Shadows

| Name       | Value                                                                        | Token                         |
| ---------- | ---------------------------------------------------------------------------- | ----------------------------- |
| ledge      | `0 5px 0 0 #DA7A7A` (setara visual; di kode dibuat dari wrapper berwarna)    | tombol 3D utama               |
| ledge-gray | `0 5px 0 0 #D1D5DC`                                                          | tombol 3D sekunder            |
| subtle     | `0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)`                | `shadow-sm`                   |
| soft-gray  | `0 4px 6px -1px #F3F4F6, 0 2px 4px -2px #F3F4F6`                             | `shadow-md shadow-gray-100`   |
| card-hover | `0 10px 15px -3px rgb(193 33 33 / .05), 0 4px 6px -4px rgb(193 33 33 / .05)` | `shadow-lg shadow-primary/5`  |
| floating   | `0 10px 15px -3px rgb(0 0 0 / .05), 0 4px 6px -4px rgb(0 0 0 / .05)`         | `shadow-lg shadow-black/5`    |
| red-glow   | `0 10px 15px -3px rgb(193 33 33 / .2), 0 4px 6px -4px rgb(193 33 33 / .2)`   | `shadow-lg shadow-primary/20` |
| modal      | `0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)`           | `shadow-lg`                   |

### Layout

- **Page gutter:** 16px di semua ukuran layar
- **Section gap:** 24px
- **Card padding:** 16px (mobile), 20–24px (desktop)
- **Element gap:** 8–12px
- **Right rail:** 416px, sticky 100px dari atas, mulai 1280px
- **Form/wizard max width:** 560px
- **Focus mode max width:** 1440px
- **Bottom clearance:** 96px (mobile) / 112px (≥768px) ditambah safe area iOS, untuk nav bawah
- **Breakpoints:** 640 / 768 / 1024 / 1280 / 1536px
- **Frames:** 390px dan 1440px, plus 1024px kalau layout berubah di antaranya

## Components

### Student Header

**Role:** Identitas portal dan akses profil

Bar sticky di atas, latar putih 95% dengan backdrop blur dan border bawah Hairline, padding 8px × 16px. Kiri: logo (48px, 75px mulai 768px), garis pemisah vertikal 40px (≥768px), tile ikon Hinomaru Red (32/40/48px, radius 8–12px, ikon topi wisuda putih, red-glow), judul "Portal Siswa" (14/18/24px, 700, tracking rapat), sapaan "Halo, {nama}! 👋" (10/12/14px, Muted Ink). Kanan: tanggal hari ini dan "Tahun Ajaran 2026/2027" (≥1024px saja), lalu avatar bulat 36px berborder `gray-200` yang membuka Profil. Tanpa lonceng notifikasi, toggle tema, atau pemilih bahasa.

### Floating Bottom Navigation

**Role:** Navigasi utama siswa (pengganti sidebar)

Desktop (≥768px): pill di tengah bawah, 24px dari tepi, radius 16px, latar putih 90% + blur, border `#E5E5E5` 70%, shadow floating, padding 8px. Item vertikal radius 12px, padding 8px × 16px: ikon Lucide 20px di atas label 11px/500. Aktif: teks Hinomaru Red di atas bubble Blush yang bergeser dengan spring; tidak aktif: `neutral-500`, hover `neutral-900`. Mobile (<768px): tombol "Menu" di kanan bawah (16px dari tepi), putih, radius 16px, padding 12px × 16px, shadow; membuka popover 256px radius 16px berisi item 14px radius 12px. Isi saat ini: Dashboard, Flashcards, Kursus & Materi, Scan Kehadiran, AI Interview Training.

### Pushable Button — Primary

**Role:** Aksi utama di setiap area

Muka Hinomaru Red, teks putih 14px/500, radius 8px, tinggi 44px (padding 16px) atau 48px untuk CTA (padding 32px, teks 16px). Muka melayang 5px di atas ledge Ledge Red; hover naik ke 7px, ditekan turun ke 0, transisi 200ms ease-in. Ikon 16px dengan gap 8px. Disabled: muka dan ledge Input Gray, tidak melayang, dan teks menyebutkan alasannya ("Kesempatan Habis"). Loading: spinner 16px + "Memproses...". Hanya satu tombol merah per area.

### Pushable Button — Secondary

**Role:** Aksi kedua: Batal, Kembali, Riwayat

Muka Paper White, teks Charcoal 14px/500, border 1px Input Gray, ledge Input Gray, ukuran dan perilaku sama dengan Primary. Dalam pasangan tombol, Secondary di kiri dan Primary di kanan; di mobile keduanya full width dan Primary di atas.

### Flat Button

**Role:** Toolbar, pagination, dropdown (khusus staff)

Tanpa efek 3D, tinggi 36px, radius 8px, outline 1px Hairline. Jangan dipakai di halaman siswa. Varian ghost (transparan, hover abu-abu) dan link (teks Hinomaru Red, underline saat hover) boleh dipakai di mana saja.

### Form Field

**Role:** Input teks, select, tanggal, textarea

Label 14px/600 Heading Ink, tanda wajib `*` Error Red, jarak 6px ke input. Input tinggi 48px, padding 12px, teks 16px/500, radius 8px, border 1px Input Gray, latar putih, placeholder Stone. Focus: border berubah Hinomaru Red, tanpa glow. Ikon opsional 18px Stone di kiri atau kanan (cari, X untuk menghapus). Error: border dan pesan 14px/600 Error Red di bawah field. Helper text 14px/500 Stone. Select memakai tinggi yang sama; menu dropdown radius 12px, opsi hover `gray-200`, terpilih `gray-300`. Tanggal dan waktu memakai input native. Textarea 4 baris, tidak bisa di-resize. Kalau validasi gagal, tampilkan alert "Ada N kolom yang perlu diperbaiki." di atas form.

### Radio Card

**Role:** Pilihan besar dengan judul dan deskripsi

Radius 12px, border 1.5px `gray-500`, padding 16px, tinggi minimal 72px, judul 14–16px/600 dan deskripsi 14px Muted Ink. Terpilih: border 2px Hinomaru Red dan latar Blush Light.

### Section Card

**Role:** Pembungkus konten utama di halaman hub

Paper White, border 1px Hairline, radius 16px, tanpa shadow. Header: padding 12px × 16px, border bawah, ikon 24px + judul 20px/600 di kiri; filter (input cari, select) atau tombol aksi di kanan, bertumpuk full width di mobile. Isi: padding 16px.

### Sidebar Widget

**Role:** Ringkasan di kolom kanan (pengumuman, kalender)

Paper White, border Hairline, radius 16px, padding 16px (24px di desktop). Judul widget: ikon 16px Hinomaru Red + teks 14px/500. Di mobile widget pindah ke atas atau bawah konten utama.

### Exam Card

**Role:** Item yang bisa dikerjakan (ujian, mock test)

Radius 12px, border Hairline, latar putih. Strip atas Canvas Mist (padding 12px × 20px, border bawah) berisi "Sisa kesempatan" dan chip kuota (Quota Green di atas `#EBFCF1`, radius 6px, 12px/700). Lalu judul 26px/700 tracking -0.05em (maks 2 baris, tooltip untuk teks penuh), chip level, dan tile Hanko Red 56px radius 14px dengan ikon hiragana putih 28px. Lalu skor terakhir ("180 / 250", 18px/700) dengan bar 8px dan tanggal, lalu riwayat skor dalam grid 4 kolom (tile Sakura Wash radius 8px, angka Score Red 18px/700). Footer: dua tombol berdampingan, gap 12px, padding 16px. Hover: naik 8px dengan shadow card-hover. Tanpa riwayat: kotak dashed `gray-300` di atas Canvas Mist bertuliskan "Belum ada riwayat".

### Course Card

**Role:** Kursus yang sedang berjalan

Paper White, radius 16px, border `gray-100`, shadow subtle. Strip atas `#FAFAFA` 12px ("Terakhir aktif" + tanggal), judul 18–24px/600 maks 2 baris dengan tile inisial Hinomaru Red 40–48px, progress (label 14px/600 + persen, bar 8px track Sakura Mist isi Hinomaru Red), lalu tombol Primary full width "Lanjut Belajar" / "Mulai Sekarang".

### Hero Block

**Role:** Panggung berwarna untuk konten unggulan

Latar Momiji Red, radius 20px (12px di mobile), tinggi minimal 300px, padding 16–24px. Dekorasi dua bentuk kuas putih (opacity 10% dan 20%) di pojok kiri atas dan kanan bawah. Judul putih 18px/600 dengan ikon 20px. Isinya carousel kartu putih; tombol panah kotak putih 40px radius 12px shadow subtle. Empty state di dalamnya: ikon dalam lingkaran putih 15%, teks putih dan putih 70%.

### Profile Summary Card

**Role:** Identitas siswa dan progres singkat

Header Sumi Navy setinggi 100px dengan dekorasi kuas (opacity 80%), avatar 48px bercincin putih, nama putih 16px/700, batch `gray-300` 14px/500. Badan padding 20px: judul "Progress Belajar" 18px/700, lalu grid 2 kolom Stat Tile, gap 16px.

### Stat Tile

**Role:** Satu angka statistik

Tile 48px radius 12px berlatar pastel dengan ikon Lucide 24px stroke 1.5, di sebelahnya label 13px/500 Stone dan angka 20px/700 `gray-900`. Pasangan pastel: merah `#FFF6F6` + `red-600`, hijau `#F2FBF5` + `green-600`, oranye `#FFF9F2` + `orange-500`, biru `#F4F8FF` + `blue-600`.

### Chips & Badges

**Role:** Label kecil: level, status, kesulitan

Dasar: pill 9999px, padding 4px × 10px, 12px/600. Chip level: Blush + Hinomaru Red. Badge Lulus / Belum lulus: pill berborder (`emerald-100` / `rose-100`) di atas Pass Wash / Fail Wash, ikon centang atau silang 12–14px stroke 3, teks 11–12px/600 Pass Green / Fail Red. Pill kesulitan: micro-label di atas tint emerald/amber/rose. Penanda ragu-ragu: `amber-100` + Warning Ink 10px/600 dengan ikon bendera 12px, radius 4px. Badge "BETA": Hinomaru Red, teks putih 10–12px.

### Progress Bar

**Role:** Progres belajar dan skor

Tinggi 8px, radius 9999px, track Sakura Mist, isi Hinomaru Red, animasi lebar 500ms ease-out. Untuk skor, warna isi mengikuti skala warna skor.

### Stepper

**Role:** Posisi di alur bertahap

Daftar horizontal kolom sama lebar. Lingkaran nomor 28px border 1.5px, angka 13px/600, label 13px di bawah, garis penghubung 2px. Aktif: lingkaran Hinomaru Red penuh, angka putih, label 600 Ink. Selesai: lingkaran putih, border dan angka Hinomaru Red, garis Hinomaru Red, bisa diklik untuk kembali. Belum: border dan teks `gray-500`, garis Hairline.

### Bilingual Kicker

**Role:** Judul section atau langkah dalam bahasa Jepang

Teks Jepang Noto Sans JP 16px/600 dengan furigana 700 di atasnya, lalu arti Indonesia dalam kurung 14px Graphite. Contoh: 試験 (Ujian), 会話テスト (Tes Kaiwa), 個人情報 (Data Diri), 確認 (Konfirmasi), 登録完了 (Pendaftaran selesai). Sediakan ruang vertikal sekitar 50% ukuran teks untuk furigana.

### Segmented Tabs

**Role:** Berpindah tampilan dalam satu halaman

Track Input Gray, tinggi 40px, radius 8px, padding 4px. Tab 14px/500 radius 6px, padding 6px × 12px. Aktif: pill Charcoal dengan teks putih dan shadow subtle, bukan merah.

### Confirm Dialog

**Role:** Konfirmasi aksi yang tidak bisa dibatalkan

Lebar maksimal 512px (90% di mobile), radius 16px, padding 24px, shadow modal, overlay hitam 80%, masuk dengan fade + zoom dari 95%. Judul 18px/600, deskripsi 14px Muted Ink, tombol X 16px di kanan atas. Footer: Secondary "Batal" + Primary aksi. Saat proses: "Memproses..." dan teks peringatan 12px Stone.

### Drawer & Sheet

**Role:** Panel tambahan

Drawer bawah (mobile): radius atas 10px, pegangan `gray-300` 100×8px di atas, padding 16px. Sheet samping (detail panjang seperti pengumuman): dari kanan, lebar 75% maksimal 384px, padding 24px, masuk 500ms dan keluar 300ms.

### Toast

**Role:** Umpan balik setelah aksi

Muncul di atas tengah, Paper White dengan border Hairline dan shadow, ikon 16px dan warna sesuai jenis (sukses, info, peringatan, error). Pesan error standar: "Terjadi kesalahan. Silakan coba lagi."

### Empty State

**Role:** Area tanpa data **(usulan: satu pola untuk semua)**

Border 2px dashed Soft Gray, radius 12px, latar Canvas Mist, padding vertikal 48px, isi di tengah: ikon Lucide 40px Pebble stroke 1.5, judul 16px/600 `gray-900`, deskripsi 14px Stone maksimal 320px, tombol Secondary opsional. Bedakan "Belum ada …" (belum ada data) dari "Tidak ada … yang cocok" (karena filter, dengan tombol "Hapus filter").

### Skeleton

**Role:** Status memuat

Blok Soft Gray dengan animasi pulse, meniru bentuk dan radius konten aslinya. Pola loading utama; spinner 32px hanya kalau skeleton tidak masuk akal.

### Inline Error Block

**Role:** Konten gagal dimuat

Di tempat konten: ikon peringatan 40px Error Red, judul 16px/600 `gray-800` ("PDF gagal dimuat"), teks bantuan 14px, lalu tombol "Coba lagi" putih berborder radius 8px dengan ikon refresh 16px.

### Attendance Calendar

**Role:** Kehadiran bulanan

Grid tanggal dengan sel berwarna penuh dan teks putih: Hadir Present Green, Terlambat Warning Amber, Tidak hadir Absent Gray, Blacklist Blacklist Red. Hari Minggu: latar `#F1F5F9` dengan teks pucat; header Minggu `red-400`. Legenda di bawah: kotak 12px radius 4px.

### Mobile Card Carousel

**Role:** Daftar kartu di layar kecil

Di bawah 1024px, grid kartu berubah menjadi carousel horizontal: lebar kartu 280px (320px mulai 640px, 340px mulai 768px), jarak 16px, scrollbar tipis di bawah. Mulai 1024px kembali menjadi grid.

### Feature Landing Hero

**Role:** Halaman pembuka sebuah fitur

Konten di tengah, tinggi minimal 80% layar, lebar teks maksimal 896px. Chip kecil di atas (Info Wash, border biru 20%, teks Info Blue 12–14px/500, ikon sparkles) dengan badge BETA opsional. Judul hero-display dua baris: baris pertama Charcoal, baris kedua Hinomaru Red. Paragraf 16–18px Muted Ink leading 1.625, maksimal 768px, kata kunci 700 dengan garis bawah Hinomaru Red 30%. Dua tombol 48px: Primary + Secondary (border 2px `gray-200`), bertumpuk full width di mobile dan berdampingan mulai 640px.

### Wizard Step Layout

**Role:** Alur bertahap (registrasi, persiapan)

Header sticky 56px dengan tombol kembali 44px (chevron 22px) dan logo. Konten maksimal 560px, padding 20px × 16px (28px × 32px di desktop), gap 24px: Stepper, Bilingual Kicker, page-title, deskripsi 15px Graphite, lalu form. Footer sticky dengan border atas: tombol 48px, Secondary sempit di kiri dan Primary lebar di kanan, membungkus terbalik di layar sempit. Langkah konfirmasi menampilkan kartu ringkasan read-only per kelompok data, masing-masing dengan tombol "Ubah".

### Focus Mode Bar

**Role:** Sesi berwaktu tanpa gangguan (ujian, AI Interview)

Header dan nav siswa disembunyikan. Bar atas fixed dengan border bawah: logo 48–64px, pemisah 28px `gray-300`, nama sesi 16–18px/700 tracking rapat `gray-800`. Sesi berwaktu menampilkan timer JJ:MM:DD 700 (saat habis: "Waktu Habis"). Konten maksimal 1440px. Keluar selalu lewat Confirm Dialog.

### Result Summary

**Role:** Halaman hasil ujian atau latihan

Tampilkan dulu state sedang diproses (contoh: "Menganalisis Jawaban…"). Lalu skor utama besar (700, angka tabular), badge Lulus / Belum lulus, rincian per aspek dalam kartu kecil berisi bar dan alasan, umpan balik teks, dan aksi: Primary "Kerjakan Lagi" / "Latihan Lagi" + Secondary "Lihat Riwayat" / "Kembali ke Dashboard".

## Do's and Don'ts

### Do

- Pakai Canvas Mist #F9FAFB sebagai latar halaman dan kartu Paper White berborder 1px Hairline #E5E5E5 di atasnya.
- Pakai Hinomaru Red #C12121 untuk satu aksi utama per area, link, dan indikator aktif.
- Pakai tombol 3D (Pushable Button) untuk semua tombol di halaman siswa, tinggi 44px atau 48px.
- Ikuti radius bertingkat: kontainer 16px, kartu di dalamnya 12px, kontrol 8px, pill 9999px.
- Tulis teks Jepang dengan furigana dan arti Indonesia dalam kurung, minimal 16px.
- Desain setiap halaman di 390px dan 1440px, lengkap dengan state loading (skeleton), kosong, error, dan disabled.
- Tampilkan alasan di setiap tombol yang tidak bisa dipakai.
- Sertakan ikon atau label teks di setiap status, bukan hanya warna.
- Pakai keluarga `gray` untuk netral, `emerald` + #107C41 untuk sukses, `rose` + #BE2528 untuk gagal **(usulan)**.
- Pakai ikon Lucide saja: 16px di tombol, 20px di nav dan judul, 24px di tile, 40px di empty state.
- Sisakan 96–112px di bawah konten untuk nav bawah.

### Don't

- Jangan desain dark mode, pemilih bahasa, toggle tema, atau lonceng notifikasi; semuanya dimatikan di kode.
- Jangan buat sidebar untuk siswa; navigasi siswa hanya nav bawah mengambang.
- Jangan buat merah baru di luar tabel warna; pakai turunan yang sudah ada.
- Jangan pakai Pebble #99A1AF atau Duo Green #0FAF13 untuk teks; kontrasnya 2,6:1 dan 2,9:1.
- Jangan taruh teks putih di atas Warning Amber #FFB900 untuk elemen baru; kontrasnya terlalu rendah.
- Jangan pakai Hinomaru Red untuk status gagal; pakai Fail Red di atas Fail Wash supaya tidak terbaca sebagai tombol.
- Jangan tambah shadow ke kartu biasa; elevasi hanya untuk hover kartu, elemen mengambang, dan dialog.
- Jangan pakai tombol flat di halaman siswa.
- Jangan campur `gray` dan `slate`, atau `green` dan `emerald`, dalam satu desain.
- Jangan pakai ukuran teks di luar Type Scale (9px, 11px di luar nav, dst.).
- Jangan campur sapaan "Anda" dan "kamu" dalam satu fitur.
- Jangan pakai lorem ipsum untuk teks Jepang; panjang dan kanji-nya menentukan layout.

## Surfaces

| Level | Name        | Value                         | Purpose                                                 |
| ----- | ----------- | ----------------------------- | ------------------------------------------------------- |
| 0     | Canvas Mist | `#F9FAFB`                     | Latar halaman Portal Siswa                              |
| 1     | Paper White | `#FFFFFF`                     | Kartu, widget, dialog, input, header                    |
| 2     | Strip Wash  | `#F9FAFB` / `#FAFAFA`         | Strip header di dalam kartu (ujian, kursus)             |
| 3     | Tint        | Blush, Sakura, Pass/Fail Wash | Chip, tile skor, badge status, pilihan terpilih         |
| 4     | Glass       | `#FFFFFF` 90–95% + blur       | Header sticky dan nav bawah mengambang                  |
| 5     | Stage       | Momiji Red / Sumi Navy        | Blok hero dan header kartu profil, dengan dekorasi kuas |
| 6     | Overlay     | `#000000` 80%                 | Latar di belakang dialog                                |

## Elevation

Portal Siswa pada dasarnya flat: kartu dipisahkan oleh border 1px Hairline dan kontras Paper White di atas Canvas Mist, bukan oleh shadow. Kedalaman muncul di empat tempat: ledge 5px di tombol 3D, shadow merah 5% saat kartu ujian di-hover (ditambah naik 8px), shadow 5% pada elemen kaca yang mengambang (header, nav bawah, popover), dan shadow-lg pada dialog di atas overlay hitam 80%. Tile ikon di header memakai glow merah 20%.

## Imagery

Logo Suka2Jepang (`public/images/suka-suka-jepang-dark.webp`): tulisan "SUKA 2 JEPANG" navy tebal dengan outline putih di atas lingkaran merah bergaya sapuan kuas, seperti matahari terbit. Belum ada versi putih atau monokrom; minta aset baru kalau perlu logo di atas latar gelap. Logo LPK Timedoor (navy + hijau, tagline 全ての挑戦者に機会を) ada di `public/images/lpk-timedoor.webp` tapi belum dipakai. Satu-satunya ilustrasi adalah lukisan pagoda dan Gunung Fuji dengan pohon musim gugur di panel kanan login dan registrasi, ditutup gradasi Hinomaru Red dari bawah; caption-nya di kode keliru ("Bali, Indonesia"), jadi jangan disalin. Dekorasi berupa bentuk sapuan kuas putih transparan di blok merah dan navy. Ikon dari Lucide (stroke 2, atau 1.5 untuk ikon besar), ditambah ikon khusus: hiragana, kuas, api (streak), bendera Indonesia dan Jepang. Tidak ada fotografi atau library ilustrasi; empty state memakai ikon. Ada satu animasi Lottie di layar tunggu ujian JLPT.

## Layout

Portal Siswa diawali header sticky putih ("Portal Siswa", sapaan, tanggal, avatar), lalu konten di atas Canvas Mist dengan gutter 16px, dan diakhiri nav bawah mengambang (pill di tengah pada desktop, tombol Menu di kanan bawah pada mobile). Tidak ada sidebar. Halaman hub seperti Dashboard dan Kursus memakai lebar penuh; mulai 1280px konten terbagi dua, area utama dan kolom kanan 416px yang sticky untuk kartu profil, pengumuman, dan kalender. Di dalam area utama, blok hero Momiji Red berisi carousel kursus, lalu Section Card berisi kartu ujian (carousel di bawah 1024px, grid 2 kolom mulai 1024px, 3 kolom mulai 1536px). Landing fitur memakai satu kolom di tengah. Alur bertahap memakai Wizard Step Layout selebar 560px dengan footer sticky. Sesi berwaktu dan hasilnya memakai mode fokus tanpa header dan nav, maksimal 1440px. Breakpoint: 640px (tombol berdampingan), 768px (nav bawah jadi pill), 1024px (grid kartu, tanggal di header), 1280px (dua kolom), 1536px (grid 3 kolom).

## Agent Prompt Guide

Quick Color Reference:

- Hinomaru Red: #C12121 — Tombol utama, link, indikator aktif, progress
- Ledge Red: #DA7A7A — Ledge tombol 3D utama
- Blush: #F9E9E9 — Chip level, bubble menu aktif
- Momiji Red: #A31D1D — Blok hero
- Hanko Red: #B92B27 — Tile ikon kartu ujian
- Sumi Navy: #2B323D — Header gelap kartu profil
- Canvas Mist: #F9FAFB — Latar halaman
- Paper White: #FFFFFF — Kartu dan dialog
- Hairline: #E5E5E5 — Border kartu
- Input Gray: #D1D5DC — Border input, tombol disabled, track tab
- Charcoal: #1E2939 — Judul hero, tab aktif
- Muted Ink: #737373 — Teks sekunder
- Pass Green: #107C41 on Pass Wash #ECFDF5 — Lulus
- Fail Red: #BE2528 on Fail Wash #FFF1F2 — Belum lulus
- Warning Amber: #FFB900 — Terlambat, peringatan
- Info Blue: #155DFC — Info

Buat halaman hub siswa dengan latar Canvas Mist (#F9FAFB), header sticky putih bertuliskan "Portal Siswa" dengan tile ikon Hinomaru Red (#C12121), dan nav bawah berbentuk pill putih 90% blur di tengah bawah. Isi dengan Section Card putih radius 16px berborder #E5E5E5 yang berjudul kicker 試験 (Ujian) dengan furigana, lalu grid kartu ujian radius 12px.

Buat kartu ujian putih radius 12px: strip atas #F9FAFB dengan chip kuota hijau #148842 di atas #EBFCF1, judul Onest 26px/700 tracking -0.05em, tile 56px #B92B27 radius 14px dengan ikon hiragana putih, bar skor 8px, grid 4 tile skor #FCEDED berangka #9E2724, dan dua tombol 3D di bawah: Secondary putih "Riwayat Tes" dan Primary #C12121 "Mulai Tes" dengan ledge #DA7A7A 5px.

Buat blok hero #A31D1D radius 20px dengan judul putih 18px/600 "Kursus Saya", dua bentuk sapuan kuas putih transparan di pojok, dan carousel kartu kursus putih berisi progress bar 8px (track #FDF2F2, isi #C12121) serta tombol 3D "Lanjut Belajar".

Buat landing fitur di tengah layar: chip "Powered by Timedoor AI" biru muda, judul Onest 54px/700 dua baris (baris pertama #1E2939, baris kedua #C12121), paragraf 18px #737373, dan dua tombol 3D 48px: Primary merah dan Secondary putih berborder.

Buat langkah wizard mobile 390px: header sticky 56px dengan chevron kembali dan logo, stepper tiga langkah (lingkaran 28px, aktif merah penuh), kicker 個人情報 (Data Diri) dengan furigana, judul 22px/700, field 48px radius 8px berborder #D1D5DC, dan footer sticky berisi tombol 3D "Kembali" dan "Lanjut".

## Similar Brands

- **Duolingo** — Tombol 3D dengan ledge, progres, dan streak yang membuat belajar terasa seperti permainan ringan.
- **LingoDeer** — Aplikasi belajar bahasa Jepang dengan kana, furigana, dan pelajaran berbentuk kartu.
- **Ruangguru** — Portal belajar siswa Indonesia dengan dashboard kartu dan bahasa yang santai.
- **Google Classroom** — Kartu kursus dan tugas yang sederhana di atas latar terang, dengan satu warna aksen.

## Quick Start

Nilai di bawah untuk prototyping dan alat desain berbasis AI. Sumber kebenaran di kode adalah `src/styles/globals.css`; nama yang belum ada di kode (misalnya `--color-momiji-red`) adalah nama referensi desain.

### CSS Custom Properties

```css
:root {
  /* Colors — tokens in code */
  --primary: #c12121;
  --primary-foreground: #fafafa;
  --primary-duo: #0faf13;
  --background: #ffffff;
  --foreground: #0a0a0a;
  --secondary: #d1d5dc;
  --secondary-foreground: #171717;
  --muted: #d1d5dc;
  --muted-foreground: #737373;
  --border: #e5e5e5;
  --input: #e5e5e5;
  --ring: #d4d4d4;
  --destructive: #e7000b;

  /* Colors — design reference names */
  --color-canvas-mist: #f9fafb;
  --color-ledge-red: #da7a7a;
  --color-blush: #f9e9e9;
  --color-blush-light: #fcf4f4;
  --color-sakura-wash: #fceded;
  --color-sakura-mist: #fdf2f2;
  --color-momiji-red: #a31d1d;
  --color-hanko-red: #b92b27;
  --color-score-red: #9e2724;
  --color-sumi-navy: #2b323d;
  --color-charcoal: #1e2939;
  --color-graphite: #4a5565;
  --color-stone: #6a7282;
  --color-pebble: #99a1af;
  --color-soft-gray: #e5e7eb;
  --color-pass-green: #107c41;
  --color-pass-wash: #ecfdf5;
  --color-present-green: #00bc7d;
  --color-quota-green: #148842;
  --color-quota-wash: #ebfcf1;
  --color-fail-red: #be2528;
  --color-fail-wash: #fff1f2;
  --color-error-red: #fb2c36;
  --color-warning-amber: #ffb900;
  --color-warning-ink: #973c00;
  --color-warning-wash: #fffbeb;
  --color-info-blue: #155dfc;
  --color-info-wash: #eff6ff;
  --color-event-purple: #8200db;
  --color-event-wash: #faf5ff;
  --color-absent-gray: #6b7280;
  --color-blacklist-red: #dc2626;

  /* Typography — Font Families */
  --font-sans: "Onest", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif;
  --font-mono: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif;

  /* Typography — Scale */
  --text-micro-label: 10px;
  --tracking-micro-label: 0.05em;
  --text-nav-label: 11px;
  --text-caption: 12px;
  --leading-caption: 1.33;
  --text-stat-label: 13px;
  --text-body: 14px;
  --leading-body: 1.43;
  --text-description: 15px;
  --text-input: 16px;
  --leading-input: 1.5;
  --leading-body-long: 1.625;
  --text-block-title: 18px;
  --text-section-title: 20px;
  --leading-section-title: 1.4;
  --text-page-title: clamp(1.375rem, 1rem + 1.6vw, 1.75rem);
  --leading-page-title: 1.25;
  --text-card-display: 26px;
  --tracking-card-display: -0.05em;
  --text-hero-display: 54px;
  --leading-hero-display: 1;
  --tracking-hero-display: -0.025em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --page-gutter: 16px;
  --section-gap: 24px;
  --card-padding: 16px;
  --card-padding-desktop: 24px;
  --element-gap: 8px;
  --right-rail: 416px;
  --form-max-width: 560px;
  --focus-max-width: 1440px;
  --bottom-clearance: 96px;
  --bottom-clearance-desktop: 112px;

  /* Border Radius */
  --radius: 10px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-hero: 20px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-ledge: 0 5px 0 0 #da7a7a;
  --shadow-ledge-gray: 0 5px 0 0 #d1d5dc;
  --shadow-subtle:
    0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-card-hover:
    0 10px 15px -3px rgb(193 33 33 / 0.05), 0 4px 6px -4px rgb(193 33 33 / 0.05);
  --shadow-floating:
    0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);
  --shadow-modal:
    0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* Surfaces */
  --surface-canvas: #f9fafb;
  --surface-paper: #ffffff;
  --surface-glass: rgb(255 255 255 / 0.9);
  --surface-overlay: rgb(0 0 0 / 0.8);
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-primary: #c12121;
  --color-primary-foreground: #fafafa;
  --color-primary-duo: #0faf13;
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-secondary: #d1d5dc;
  --color-secondary-foreground: #171717;
  --color-muted: #d1d5dc;
  --color-muted-foreground: #737373;
  --color-border: #e5e5e5;
  --color-input: #e5e5e5;
  --color-ring: #d4d4d4;
  --color-destructive: #e7000b;
  --color-momiji-red: #a31d1d;
  --color-hanko-red: #b92b27;
  --color-score-red: #9e2724;
  --color-sakura-wash: #fceded;
  --color-sakura-mist: #fdf2f2;
  --color-sumi-navy: #2b323d;
  --color-pass-green: #107c41;
  --color-fail-red: #be2528;
  --color-quota-green: #148842;
  --color-quota-wash: #ebfcf1;

  /* Typography */
  --font-sans: "Onest", sans-serif;
  --font-mono: "Noto Sans JP", monospace;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-hero: 20px;

  /* Shadows */
  --shadow-ledge: 0 5px 0 0 #da7a7a;
  --shadow-ledge-gray: 0 5px 0 0 #d1d5dc;
  --shadow-card-hover:
    0 10px 15px -3px rgb(193 33 33 / 0.05), 0 4px 6px -4px rgb(193 33 33 / 0.05);
  --shadow-floating:
    0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);
}
```

Font dimuat dari Google Fonts:

```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Onest:wght@100..900&display=swap");
```

## Content & Voice

- **Bahasa:** UI hanya Bahasa Indonesia. Bahasa Jepang (`jp`) sudah disiapkan di kode tapi belum aktif.
- **Sapaan (belum diputuskan):** sebagian besar halaman memakai "Anda" ("Silakan hubungi pengajar Anda."), halaman yang lebih baru memakai "kamu" / "-mu" ("Latih Kaiwamu Bareng AI", "Periksa lagi data dirimu"). Tanyakan ke tim sebelum menulis copy fitur baru.
- **CTA:** kata kerja di depan dan singkat: "Mulai Tes", "Kerjakan Lagi", "Lanjut Belajar", "Mulai Sekarang", "Lihat Riwayat", "Lihat semua", "Kembali", "Batal", "Ubah".
- **Empty state:** "Belum ada …". **Loading:** "Memproses...", "Memuat …". **Error:** "Terjadi kesalahan. Silakan coba lagi."
- **Tanggal:** "12 Oktober 2026", dengan jam "12 Oktober 2026, 14:30" (24 jam), ringkas "12/10/26".
- **Angka:** skor "180 / 250", persen "75%", kuota "3 Kuota".
- **Istilah Jepang:** teks Jepang + furigana + arti dalam kurung. Istilah yang sudah akrab boleh latin: Kaiwa, Sensei, Anki, Kana.

## Reference Screens

Lihat langsung di environment dev dengan akun siswa (minta akses ke tim FE).

| Area                     | Halaman                                                                                                 | Pola yang bisa dicontoh                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Login & registrasi       | `/login`, `/register`, `/register/mandiri`, `/register/lpk`                                             | Split layout dengan ilustrasi, Wizard Step Layout, Radio Card              |
| Dashboard                | `/dashboard`                                                                                            | Hub dua kolom, Profile Summary Card, Hero Block, Exam Card, Sidebar Widget |
| Kalender ujian           | `/dashboard/exam-schedules`                                                                             | Kalender event                                                             |
| Kursus & Materi          | `/dashboard/course` → `/course/[id]` → level → bab                                                      | Statistik, carousel, kalender streak, accordion bab, pemutar materi        |
| Flashcards (Anki & Kana) | `/dashboard/flashcards`, `/flashcards/[id]`                                                             | Daftar deck, viewer kartu, kuis                                            |
| Ujian / Mock test        | `/assessment/[id]/preparation` → attempt → result                                                       | Persiapan, Focus Mode Bar, Result Summary                                  |
| Laporan ujian            | `/dashboard/exam-report/[id]/history`                                                                   | Riwayat dan detail hasil                                                   |
| AI Interview (Kaiwa)     | `/dashboard/ai-interview-training` → device-check → camera-check → calibrate → start → session → result | Feature Landing Hero, cek perangkat, sesi suara, Result Summary per aspek  |
| Riwayat AI               | `/ai-interview-training/history`, `/history/[id]`                                                       | Daftar riwayat dengan pill kesulitan, detail percakapan                    |
| Scan Kehadiran           | `/dashboard/scan-attendance`                                                                            | Pemindai QR kamera, riwayat absensi                                        |
| Profil                   | `/dashboard/profile`                                                                                    | Info profil, ganti password, verifikasi email                              |

## Handoff Checklist

- [ ] Frame 390px dan 1440px (plus 1024px kalau layout berubah di antaranya).
- [ ] Posisi di shell: dengan header + nav bawah, atau mode fokus. Kalau fitur masuk menu utama, sertakan nav bawah yang diperbarui (6 item).
- [ ] State default, loading (skeleton), kosong, error, dan disabled beserta alasannya.
- [ ] Data ekstrem: nama sampai 80 karakter, judul 2+ baris, angka besar, daftar panjang, satu item saja.
- [ ] Teks Jepang final dengan furigana dan artinya; copy final Bahasa Indonesia.
- [ ] Interaksi: hover, tekan, transisi antar langkah, dan dialog konfirmasi untuk aksi yang tidak bisa dibatalkan.
- [ ] Warna dan ukuran memakai nama di dokumen ini.
- [ ] Komponen baru ditandai "komponen baru" dengan semua varian dan state-nya.
- [ ] Nama ikon Lucide yang dipakai.
- [ ] Catatan data: asal setiap angka/teks dan tampilan saat datanya belum ada.

## Glossary

| Istilah                | Arti                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Kaiwa** (会話)       | Percakapan. Nama fitur AI Interview Training: latihan ngobrol bahasa Jepang dengan AI, mode Interview (formal) atau Conversation (santai) |
| **Tes Kaiwa**          | Tes percakapan lewat fitur AI Interview, dipakai di alur registrasi                                                                       |
| **Anki & Kana**        | Fitur flashcard (kosakata, hiragana/katakana)                                                                                             |
| **Mock test**          | Simulasi ujian yang di-assign sensei ke siswa                                                                                             |
| **JFT / JLPT / SSW**   | Ujian bahasa Jepang (JFT-Basic, JLPT N5–N1) dan program visa kerja Specified Skilled Worker                                               |
| **Level**              | Jenis/tingkat ujian: SSW, JFT, JLPT N5–N1 (dan QUIZ). Kursus punya level sendiri                                                          |
| **Batch**              | Angkatan siswa                                                                                                                            |
| **Sensei**             | Pengajar (role `teacher`)                                                                                                                 |
| **LPK / LKP**          | Lembaga pelatihan kerja/kursus; bisa mendaftarkan beberapa kandidat sekaligus                                                             |
| **Mandiri**            | Kandidat yang mendaftar sendiri                                                                                                           |
| **Furigana**           | Bacaan hiragana kecil di atas kanji                                                                                                       |
| **Kuota / kesempatan** | Sisa berapa kali siswa boleh mengerjakan ujian                                                                                            |
| **Ragu-ragu**          | Soal yang ditandai siswa untuk dicek ulang                                                                                                |
| **Streak**             | Rangkaian hari belajar berturut-turut                                                                                                     |
