# Visual Slicing & Implementation Plan (Next.js Stack)
## Modul Penyaluran Kerja (Job Apply) — Suka2Jepang

Dokumen ini adalah rencana kerja teknis untuk tahap **Visual Slicing & Frontend Implementation** modul Job Apply Suka2Jepang menggunakan tech stack resmi sesuai [PRD.md](file:///Users/mac/Desktop/suka2jepang/PRD.md) dan acuan token desain pada [DESIGN.md](file:///Users/mac/Desktop/suka2jepang/DESIGN.md).

---

## 1. Tech Stack Standar Proyek (Sesuai PRD & DESIGN.md)

| Layer | Teknologi / Library | Catatan & Peran |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | Framework React full-stack untuk Portal Siswa Suka2Jepang. |
| **Language** | **TypeScript (`.tsx`, `.ts`)** | Static typing untuk validasi skema data loker, profil, & form. |
| **Styling** | **Tailwind CSS v4** (`@theme`) | Styling berbasis utility dengan custom token sesuai `DESIGN.md`. |
| **UI Primitives** | **shadcn/ui & Radix UI** | Dialog, Sheet, Popover, Dropdown Menu, Accordion, Tooltip. |
| **Iconography** | **Lucide React** | Ikon standar: 16px (tombol), 20px (nav & badge), 24px (tile). |
| **Typography** | **`next/font/google`** | **Onest** (`--font-sans`) untuk seluruh UI, **Noto Sans JP** (`--font-mono`) untuk kanji & furigana. |
| **Form & State** | **React Hook Form + Zod** | Validasi multi-step form lamaran & profil kandidat. |
| **Client Storage** | **Zustand / LocalStorage Hook** | Sinkronisasi auto-save draft lamaran, bookmark, & preferensi. |
| **Audio Rehearsal** | **HTML5 MediaRecorder API** | Fitur perekam suara native in-app untuk latihan *Jikoshoukai* 1 menit. |

---

## 2. Struktur Direktori & Rute Halaman (Next.js App Router)

Implementasi frontend akan ditempatkan di dalam struktur App Router Next.js:

```
src/ (atau app/)
├── app/
│   └── job-apply/
│       ├── layout.tsx                     # Shell layout: Student Header + Floating Nav
│       ├── page.tsx                       # Redirect / Hub Loker
│       │
│       ├── personalize/                   # FR-01: Wizard Personalisasi (Step 3/3)
│       │   └── page.tsx                   # (Personalize.jpg)
│       │
│       ├── for-you/                       # FR-02: Loker Untukmu (Matching Engine)
│       │   └── page.tsx                   # (Personalize job list.jpg)
│       │
│       ├── jobs/                          # FR-03: Katalog Lowongan & Multi-Filter
│       │   ├── page.tsx                   # (Job Application List.jpg)
│       │   └── [id]/                      # FR-05: Detail Loker & Kalkulator Bersih
│       │       └── page.tsx               # (Job Details.jpg)
│       │
│       ├── components-preview/            # FR-04: Showroom 6 Variasi Status Job Card
│       │   └── page.tsx                   # (Card job status Variation.jpg)
│       │
│       ├── profile/                       # FR-06: Profil Kandidat & Rirekisho CV
│       │   └── page.tsx                   # (profile.jpg)
│       │
│       ├── apply/                         # Alur Pendaftaran Lamaran
│       │   └── [id]/
│       │       ├── page.tsx               # FR-07: Stepper Form (Job Apply Stepper.jpg)
│       │       ├── confirm/
│       │       │   └── page.tsx           # FR-08: Konfirmasi (Job Apply Stepper-1.jpg)
│       │       └── success/
│       │           └── page.tsx           # FR-09: Sukses & No. APL (Job Apply status after send.jpg)
│       │
│       ├── my-applications/               # FR-10: Dashboard Lamaran Saya & Pipeline 5 Tahap
│       │   └── page.tsx                   # (Job Applied list.jpg)
│       │
│       ├── interview-tsk/                 # FR-11: Portal Persiapan Interview & Audio
│       │   └── [id]/
│       │       └── page.tsx               # (Interview TSK.jpg)
│       │
│       └── naitei/                        # FR-12: Hub Dokumen Pasca-Naitei & Keberangkatan
│           └── [id]/
│               └── documents/
│                   └── page.tsx           # (List Dokumen.jpg)
│
├── components/
│   ├── ui/                                # shadcn primitives (button, badge, dialog, tabs)
│   ├── common/
│   │   ├── pushable-button.tsx            # Tombol 3D Hinomaru Red & Secondary dengan ledge 5px
│   │   ├── japanese-text.tsx              # Wrapper Noto Sans JP dengan Furigana <ruby>
│   │   ├── student-header.tsx             # Header siswa dengan avatar & wordmark
│   │   └── floating-nav.tsx               # Bottom floating navigation pill
│   │
│   └── job-apply/
│       ├── job-card.tsx                   # Komponen .job-card dengan 6 state variasi
│       ├── match-score-badge.tsx          # Circular 100%, 75%, 67%, 33% indicator
│       ├── stepper-header.tsx             # Stepper horizontal alur pendaftaran
│       ├── salary-breakdown-card.tsx      # Kalkulator finansial 2 kolom & net take-home
│       ├── audio-recorder-modal.tsx       # Web Audio recorder dengan visualizer mic & timer 60s
│       ├── roadmap-tracker.tsx            # Pipeline 5-stage & roadmap 7-stage keberangkatan
│       ├── document-checklist-row.tsx     # Baris status verifikasi dokumen (9 dokumen wajib)
│       └── rirekisho-preview.tsx          # Live format JIS Rirekisho preview
│
├── types/
│   └── job-apply.ts                       # TypeScript interfaces: Job, Application, Profile, Interview
│
└── lib/
    ├── mock-data.ts                       # Data mockup 12 loker, rincian potongan, pertanyaan wawancara
    └── store/
        └── use-job-apply-store.ts         # Zustand store untuk sinkronisasi state
```

---

## 3. Komponen Inti & Penerapan Token Desain (`DESIGN.md`)

```
+----------------------------------------------------------------------------------------------------+
|                                  ARSITEKTUR KOMPONEN & TOKENS                                      |
+------------------------------+------------------------------------+--------------------------------+
| Komponen React               | Tailwind v4 Classes / Tokens       | Sumber Visual                  |
+------------------------------+------------------------------------+--------------------------------+
| `<PushableButton />`         | `bg-[#C12121] shadow-[0_5px_0_0_#DA7A7A] hover:translate-y-[-2px]` | DESIGN.md Line 186-198         |
| `<JobCard />`                | `bg-white border border-[#E5E5E5] rounded-[12px]`                  | Card job status Variation.jpg  |
| `<MatchScoreBadge />`        | `rounded-full text-white bg-[#C12121] / bg-[#FCF4F4]`              | Personalize job list.jpg       |
| `<JapaneseText />`           | `font-mono tracking-tight font-semibold` (<ruby>)                  | DESIGN.md Line 70-77           |
| `<SalaryBreakdownCard />`    | `grid grid-cols-2 gap-4 bg-white rounded-[16px]`                   | Job Details.jpg                |
| `<PipelineTracker />`        | 5-stage horizontal bar with active pulse state                     | Job Applied list.jpg           |
| `<AudioRecorder />`          | Native browser `navigator.mediaDevices.getUserMedia`               | Interview TSK.jpg              |
| `<DocumentChecklistRow />`   | Status badge: emerald (`Terverifikasi`), amber (`Sedang dicek`)    | List Dokumen.jpg               |
+------------------------------+------------------------------------+--------------------------------+
```

---

## 4. Rencana Pengerjaan Slicing Bertahap (4 Batch)

```mermaid
graph TD
    subgraph BATCH 1: Project Setup, Component Primitives & Catalog
        P0[Next.js App Setup & Tailwind v4 Theme] --> P1[Types & Mock Data]
        P1 --> C1[PushableButton, JapaneseText, JobCard Component]
        C1 --> S01[app/job-apply/personalize/page.tsx]
        S01 --> S02[app/job-apply/for-you/page.tsx]
        S02 --> S03[app/job-apply/jobs/page.tsx]
        S03 --> S04[app/job-apply/components-preview/page.tsx]
    end

    subgraph BATCH 2: Deep Detail & Master Profile
        S04 --> S05[app/job-apply/jobs/[id]/page.tsx]
        S05 --> S06[app/job-apply/profile/page.tsx]
    end

    subgraph BATCH 3: Application Stepper & Flow
        S06 --> S07[app/job-apply/apply/[id]/page.tsx]
        S07 --> S08[app/job-apply/apply/[id]/confirm/page.tsx]
        S08 --> S09[app/job-apply/apply/[id]/success/page.tsx]
    end

    subgraph BATCH 4: Application Tracking, Interview & Naitei
        S09 --> S10[app/job-apply/my-applications/page.tsx]
        S10 --> S11[app/job-apply/interview-tsk/[id]/page.tsx]
        S11 --> S12[app/job-apply/naitei/[id]/documents/page.tsx]
    end
```

---

## 4. Status Pelaksanaan & Rencana Pengerjaan (4 Batch)

### 📊 Ringkasan Status Progres Modul Job Apply (9 / 12 Screen Selesai — 75%)

| Batch | Layar & Rute | Status | Catatan Validasi & Fitur |
| :--- | :--- | :---: | :--- |
| **BATCH 1** | **S01** `personalize/page.tsx` | ✅ **SELESAI** | Wizard Step 3/3, radio card visa, pill chips minat bidang, dropdown bahasa, WA toggle |
| | **S02** `for-you/page.tsx` | ✅ **SELESAI** | Rekomendasi Loker Untukmu, match score badge, tag kualifikasi `[✓]` & `[✗]`, alert WA |
| | **S03** `jobs/page.tsx` | ✅ **SELESAI** | Katalog utama lowongan, multi-kriteria filter sidebar, responsive card grid, paginasi |
| | **S04** `components-preview/page.tsx` | ✅ **SELESAI** | Showroom 6 variasi status JobCard data-driven (Default, Hampir Tutup, Timedoor, dll.) |
| **BATCH 2** | **S05** `jobs/[id]/page.tsx` | ✅ **SELESAI** | Switcher bahasa, kalkulator gaji bersih 2 kolom, dynamic binding `pm-012`, CTA `size="lg"` |
| | **S06** `profile/page.tsx` | ✅ **SELESAI** | Master Profile kandidat, live JIS Rirekisho paper preview, parameter fisik/kebiasaan 44px |
| **BATCH 3** | **S07** `apply/[id]/page.tsx` | ✅ **SELESAI** | True Multi-Step Wizard (Data Diri $\rightarrow$ Kualifikasi $\rightarrow$ Dokumen), smart auto-fill, dropzones |
| | **S08** `apply/[id]/confirm/page.tsx` | ✅ **SELESAI** | Review data pelamar, tombol ubah step 1-3, validasi komitmen pelamar, PushableButton 48px |
| | **S09** `apply/[id]/success/page.tsx` | ✅ **SELESAI** | Hero registrasi nomor APL, 4-step timeline proses, status pill bar, PushableButton 48px |
| **BATCH 4** | **S10** `my-applications/page.tsx` | ✅ **SELESAI** | Dashboard "Lamaran Saya", tabs Aktif (2) / Selesai (1), pipeline tracker 5-stage, agenda |
| | **S11** `interview-tsk/[id]/page.tsx` | ✅ **SELESAI** | Portal persiapan interview TSK, jadwal Zoom/WITA, 7 modul Q&A, in-browser audio recorder |
| | **S12** `naitei/[id]/documents/page.tsx` | ✅ **SELESAI** | Hub dokumen pasca-Naitei, roadmap 7-stage keberangkatan, checklist 9 dokumen wajib, PIC WA |

---

### [x] BATCH 1: Fondasi Proyek, Komponen Dasar, & Ekosistem Loker (Selesai)
- [x] Inisialisasi struktur Next.js App Router dengan Tailwind CSS v4 dan TypeScript.
- [x] Konfigurasi `@theme` di CSS global sesuai token `DESIGN.md` (Hinomaru Red `#C12121`, Ledge `#DA7A7A`, Canvas Mist `#F9FAFB`, Sumi Navy `#2B323D`, Momiji Red `#A31D1D`, dll.).
- [x] Pembuatan komponen atomik: `<PushableButton />`, `<JapaneseText />`, `<JobCard />`, `<MatchScoreBadge />`.
- [x] **Slicing 4 Layar Pertama:**
  1. [x] `app/job-apply/personalize/page.tsx` (Wizard 3/3: Radio card visa, chips minat bidang, dropdown level bahasa, WA toggle).
  2. [x] `app/job-apply/for-you/page.tsx` (Rekomendasi "Loker Untukmu", tag kualifikasi `[✓]` & `[✗]`, sidebar tersimpan & alert WA).
  3. [x] `app/job-apply/jobs/page.tsx` (Katalog utama `求人`, filter sidebar multi-kriteria, 3x2 responsive card grid, paginasi).
  4. [x] `app/job-apply/components-preview/page.tsx` (Showroom galeri perbandingan 6 status kartu loker).

---

### [x] BATCH 2: Halaman Detail Finansial & Master Profil Rirekisho (Selesai)
- [x] **Slicing Screen 05 (`app/job-apply/jobs/[id]/page.tsx`):**
  - [x] Switcher bahasa interaktif (Indonesia / 日本語 / Dua bahasa).
  - [x] 4 kartu sorotan metrik (Gaji kotor, gaji bersih, kuota, tanggal) dengan hierarki title kecil - nilai besar.
  - [x] Kalkulator 2 kolom: Gaji pokok & tunjangan vs Potongan wajib (pajak, shakai hoken, asrama) $\rightarrow$ Banner gaji bersih.
  - [x] Dynamic data binding loker (`MOCK_JOBS`) membaca ID parameter (contoh: `pm-012` pengolahan makanan vs `kg-096` kaigo).
  - [x] Arsitektur Judul di LUAR wrapper card (`h2.text-base.font-bold`) dan CTA `<PushableButton size="lg" fullWidth>`.
- [x] **Slicing Screen 06 (`app/job-apply/profile/page.tsx`):**
  - [x] Sub-menu navigasi vertikal profil dengan status centang & progress tracker kelengkapan.
  - [x] Data diri, slot pas foto 3x4 latar putih, kalkulasi otomatis usia & BMI fisik.
  - [x] Parameter kesehatan fisik & kebiasaan industri Jepang dengan pill chips 44px dan centang merah.
  - [x] Manajemen sertifikat bahasa & SSW dengan badge status verifikasi.
  - [x] Miniatur live preview JIS CV Rirekisho (*履歴書*) dinamis dan modal ekspor PDF 2 halaman resmi.

---

### [x] BATCH 3: Alur Pendaftaran Lamaran Multi-Step (Selesai)
- [x] **Slicing Screen 07 (`app/job-apply/apply/[id]/page.tsx`):**
  - [x] True Multi-Step Wizard (Step 1: Data Diri $\rightarrow$ Step 2: Kualifikasi $\rightarrow$ Step 3: Dokumen) mencegah form fatigue.
  - [x] Subheader bar (`← Kembali ke loker` + `Draf tersimpan otomatis`), menjaga Global Header tetap 1 standar tunggal.
  - [x] Form pre-filled dari master profile kandidat (*smart defaults*).
  - [x] 3 slot dropzone interaktif (CV, Sertifikat SSW/JFT, Video Jikoshoukai) dengan state kosong (dashed) dan terpasang (kartu hijau).
  - [x] Tombol aksi terharmonisasi: `<PushableButton variant="secondary" size="md">` dan `<PushableButton size="md">` sama-sama 48px `rounded-[8px]`.
- [x] **Slicing Screen 08 (`app/job-apply/apply/[id]/confirm/page.tsx`):**
  - [x] Alert integritas data sebelum submit final.
  - [x] 3 kartu review (Data Diri, Kualifikasi, Dokumen) dengan tombol tautan "Ubah" langsung menuju step yang bersangkutan (`?step=1,2,3`).
  - [x] Kartu komparasi syarat loker dan 4 checkbox komitmen pelamar (termasuk kesiapan kuota batch mensetsu $\ge 12$).
  - [x] Bottom action buttons harmonis dengan PushableButton 48px `rounded-[8px]`.
- [x] **Slicing Screen 09 (`app/job-apply/apply/[id]/success/page.tsx`):**
  - [x] Hero checkmark sukses dengan nomor registrasi resmi `APL-2610-0153`.
  - [x] Timeline 4 langkah proses pasca-lamaran dengan penanda visual.
  - [x] CTAs seimbang: `<PushableButton>` ("Lihat status lamaran") dan `<PushableButton variant="secondary">` ("Latihan interview").

---

### [x] BATCH 4: Pelacakan Lamaran, Wawancara TSK, & Hub Dokumen Naitei (Semua Layar Selesai)
- [x] **Slicing Screen 10 (`app/job-apply/my-applications/page.tsx`):**
  - [x] Global header standar siswa dengan menu aktif "Lamaran Saya".
  - [x] Judul halaman `Lamaran saya` dengan filter tabs segmented: `Semua (3)`, `Aktif (2)` vs `Selesai (1)`.
  - [x] Kartu Lamaran 1 (PM-012): Lolos interview Timedoor, pipeline 5 tahap (Apply $\rightarrow$ Interview Timedoor $\rightarrow$ Interview TSK $\rightarrow$ Mensetsu $\rightarrow$ Naitei), alert jadwal interview TSK 21 Okt 10.00 WITA, tombol `Lihat jadwal`.
  - [x] Kartu Lamaran 2 (JS-003): Menunggu interview, pipeline active di step 2, alert konfirmasi kehadiran WA 22 Okt 14.00 WITA, tombol interaktif `Konfirmasi hadir` dengan modal dialog konfirmasi & feedback toast.
  - [x] Kartu Lamaran 3 (KG-086): Tidak lolos, pipeline dengan tanda silang di Interview TSK, catatan evaluasi percakapan, tombol `Cari loker Kaigo`.
  - [x] Sidebar Widget:
    1. Card Kelengkapan Profil (80% + link "Lengkapi video perkenalan").
    2. Card Hitam "Jadwal berikutnya" (OKT 21: Interview TSK, OKT 22: Interview Timedoor).
    3. Card Tips Persiapan Interview (3 poin kesiapan mental & jikoshoukai ber-kanji/furigana).
    4. Card Akses Cepat Hub Dokumen Naitei (Akses langsung ke Screen 12).
- [x] **Slicing Screen 11 (`app/job-apply/interview-tsk/[id]/page.tsx`) — SELESAI:**
  - [x] Hero card sesi interview dengan konversi waktu WITA & JST, tombol link Zoom, dan calendar invite.
  - [x] Modul 7 pertanyaan wawancara standar Jepang ber-furigana, terjemahan, dan tips strategi menjawab.
  - [x] Perekam audio native browser (Web Audio API) untuk latihan jikoshoukai 1 menit dengan tombol rekam, stop, dan playback.
  - [x] Checklist interaktif kesiapan hari H dan peringatan reschedule H-1.
- [x] **Slicing Screen 12 (`app/job-apply/naitei/[id]/documents/page.tsx`) — SELESAI (LAYAR TERAKHIR DARI 12 LAYAR):**
  - [x] Hero perayaan *内定おめでとうございます*, indikator progres dokumen (6/9), dan estimasi bulan berangkat (Maret 2027).
  - [x] Roadmap 7 tahapan keberangkatan Jepang dengan timeline vertikal interaktif (node selesai, aktif, dan mendatang serta catatan detail).
  - [x] Tabel 9 dokumen wajib (Paspor, KTP/KK, Ijazah, Sertifikat SSW, Pas Foto, Kontrak, Surat Izin, MCU, SKCK) dengan status verifikasi (*Terverifikasi*, *Sedang dicek*, *Belum upload*).
  - [x] Filter tab dokumen interaktif (*Semua 9*, *Perlu Upload 2*, *Terverifikasi 6*, *Sedang Dicek 1*).
  - [x] Modal interaktif: Modal Unggah Berkas dengan drag-and-drop & simulasi progres, Modal Preview Dokumen Resmi, Modal Unduh Template Surat Izin Orang Tua.
  - [x] Kotak PIC pendamping dokumen resmi Timedoor (Sarah Agustina) dengan modal konsultasi & tautan langsung WhatsApp.

---

## 5. Standar Kualitas Anti-Slop (Anti-Slop Guidelines Compliance)

1. **Accessibility (WCAG AA):**
   - Kontras teks $\ge 4.5:1$, border kontrol $\ge 3:1$.
   - Seluruh elemen interaktif memiliki tap target minimal $44 \times 44\text{ px}$.
   - Fokus keyboard menggunakan `:focus-visible` ring warna merah `#C12121`.
2. **Typography & Layout:**
   - Onest untuk teks UI latin dan Noto Sans JP untuk kanji dengan furigana (`<ruby>`).
   - Ukuran heading menggunakan `clamp()` agar responsif sempurna dari mobile (390px) hingga desktop (1440px).
3. **No Fake Placeholders:**
   - Menggunakan data realistis sesuai lowongan resmi Jepang (Kaigo Sapporo, PT Hatanaka Shokuhin Kagoshima, dll.).

---

## 6. Rencana Kerja Audit Ulang, Harmonisasi Sistemik, & Penyempurnaan Fungsional (Fase Remediasi & Polish)

Dokumen rencana kerja ini merinci 6 batch eksekusi sistemik untuk menyempurnakan seluruh modul Penyaluran Kerja, memperbaiki link buntu (`href="#"`), mengaktifkan filter dinamis, menghapus technical clutter, membakukan persona kandidat (Budi Santoso), dan menstandarisasi validasi form wajib vs opsional.

### 📋 Rincian 6 Batch Eksekusi:

1. **BATCH 1: Standardisasi Global Header & Navigasi Interaktif**
   - [x] Bangun komponen `SswExamInfoModal`: Modal informasi resmi jadwal ujian Prometric SSW 2026/2027 (Kaigo, Pengolahan Makanan, dll.), biaya, lokasi test center di Indonesia (Jakarta, Bandung, Surabaya, Medan), dan tautan pendaftaran resmi.
   - [x] Bangun komponen `NotificationsPopover`: Dropdown notifikasi aktif saat icon lonceng diklik dengan 3 notifikasi riil (jadwal interview TSK, konfirmasi interview Timedoor, paspor diverifikasi) + fitur tandai dibaca.
   - [x] Bakukan avatar header menjadi `BS` dan nama kandidat menjadi `Budi Santoso` (Certified).
   - [x] Pasang modal login / toast feedback ramah untuk tautan "Masuk" pada onboarding header.

2. **BATCH 2: Mesin Filter Dinamis, Sorting & Empty State Katalog (`jobs/page.tsx`)**
   - [x] Sambungkan logika filter dinamis untuk seluruh parameter sidebar (Bidang, Prefektur, Domisili, Fasilitas Asrama/Hijab/Tanpa Pengalaman).
   - [x] Hubungkan fitur pengurutan (Sort by: Gaji Tertinggi, Batas Waktu Terdekat, Terbaru).
   - [x] Bangun komponen **Empty State** elegan dengan icon pencarian, pesan informatif, dan tombol `PushableButton` "Reset Semua Filter".
   - [x] Aktifkan interaktivitas pagination (slice 6 lowongan per halaman).

3. **BATCH 3: Reaktivitas Rekomendasi & Sinkronisasi Widget Tersimpan (`for-you/page.tsx`)**
   - [x] Sinkronkan widget "Tersimpan" di sidebar kanan agar membaca data dari `MOCK_JOBS` berdasarkan state `bookmarkedIds` dinamis (bertambah/berkurang saat tombol bookmark pada kartu diklik).
   - [x] Sediakan tampilan empty state jika semua lowongan di-unbookmark.
   - [x] Sambungkan tombol "Lihat jadwal ujian" ke `SswExamInfoModal`.
   - [x] Perbaiki tombol loker PM-012 dari disabled menjadi tautan aktif `<PushableButton variant="secondary" href="/job-apply/my-applications">Lihat status</PushableButton>`.

4. **BATCH 4: Pembersihan Clutter Teknis & Standardisasi Formulir Multi-Step**
   - [x] `jobs/[id]`: Hapus `{job.jobCode}` dari header badge. Ganti `alert()` dokumen 求人票 dengan toast unduhan sukses.
   - [x] `apply/[id]`: Ubah judul menjadi `Formulir Pendaftaran · ${job.title}`. Hapus placeholder `[Nama Lengkap]`. Tambahkan indikator visual `(Opsional)` pada field opsional dan validasi inline pada field wajib.
   - [x] `apply/[id]/confirm`: Ubah judul menjadi `Konfirmasi Lamaran · ${job.title}`.
   - [x] `apply/[id]/success`: Bersihkan kode internal dari hero dan rekomendasi kartu mirip. Ganti `[No WA admin loker]` dengan nomor resmi Timedoor Career Support.
   - [x] `my-applications`: Ganti kicker merah kartu dari kode inventaris menjadi Nomor Registrasi Lamaran resmi (`APL-2610-0153`).

5. **BATCH 5: Master Profil CRUD Penuh, Modal Rekam Jikoshoukai & Konsistensi Naitei**
   - [x] **Interaktivitas CRUD Penuh `profile/page.tsx`**:
     - **Bahasa & Sertifikat (CRUD)**: Bisa ditambah via modal dialog (nama tes, skor/status, tanggal ujian, upload berkas), bisa diedit (update nilai/status), dan bisa dihapus dengan konfirmasi.
     - **Pendidikan & Pekerjaan (CRUD)**: Bisa ditambah via modal dialog (kategori sekolah/perusahaan, jurusan/jabatan, rentang tahun, deskripsi tugas), bisa diedit, dan bisa dihapus.
     - **Keluarga (CRUD)**: Bisa ditambah via modal dialog (nama anggota keluarga, hubungan: Ayah/Ibu/Saudara, usia, pekerjaan, kontak darurat Ya/Tidak, persetujuan kerja ke Jepang), bisa diedit, dan bisa dihapus.
     - **Rirekisho Dinamis**: Seluruh perubahan entri pendidikan, pekerjaan, dan keluarga langsung ter-render secara dinamis pada miniature preview dan modal PDF JIS Rirekisho resmi.
   - [x] Set default state nama **Budi Santoso**, Furigana **ブディ・サントソ**, dan tanggal lahir **12/05/2003** (kalkulasi otomatis 23 th).
   - [x] Aktifkan tombol "Rekam sekarang" dengan membuka modal instruksi perekam video / latihan jikoshoukai 1 menit.
   - [x] Hapus `alert()` pada download CV, ganti dengan simulasi unduh resmi.
   - [x] `interview-tsk`: Ganti `alert("Silakan pilih alasan...")` pada modal reschedule dengan pesan validasi inline berwarna merah.
   - [x] `naitei`: Selaraskan seluruh nama berkas kandidat dari `AhmadFauzi` menjadi `BudiSantoso` (`Paspor_RI_BudiSantoso.pdf`, `KTP_KK_BudiSantoso.pdf`).

6. **BATCH 6: Showcase Hub, Rulebook Update & Validasi Akhir**
   - [x] `src/app/page.tsx`: Ubah wrapper ke `max-w-[1280px]` baku, perbarui status Screen 05 menjadi `Selesai`, dan samakan seluruh badge status.
   - [x] Catat temuan dan pembelajaran baru ke dalam `ui-ux-design-rules.md`.
   - [x] Lakukan verifikasi build TypeScript & Next.js tanpa error.
