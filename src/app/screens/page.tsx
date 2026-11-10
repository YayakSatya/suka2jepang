import Link from "next/link";
import { ArrowRight, FileText, Home } from "lucide-react";

export default function ScreensHubPage() {
  const screens = [
    {
      batch: "Landing Page",
      number: "00",
      title: "Landing Page Resmi (Homepage)",
      subtitle: "Hero Suka2Jepang, Pencarian Loker, Metrik, 8 Sektor, 5 Langkah & SSW Banner",
      route: "/",
      asset: "Homepage.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 1",
      number: "01",
      title: "Wizard Personalisasi",
      subtitle: "Langkah 3 dari 3: Tujuan Kerja di Jepang",
      route: "/job-apply/personalize",
      asset: "Personalize.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 1",
      number: "02",
      title: "Loker Untukmu",
      subtitle: "Matching Engine 100%, 75%, 67%, 33% & Widgets",
      route: "/job-apply/for-you",
      asset: "Personalize job list.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 1",
      number: "03",
      title: "Katalog Lowongan Kerja",
      subtitle: "Filter Bidang, Prefektur, Domisili, Fasilitas & 3x2 Grid",
      route: "/job-apply/jobs",
      asset: "Job Application List.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 1",
      number: "04",
      title: "Showroom 6 Status Kartu Loker",
      subtitle: "Default, Hampir Ditutup, Khusus Siswa, Sudah Dilamar, Domisili, Tutup",
      route: "/job-apply/components-preview",
      asset: "Card job status Variation.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 2",
      number: "05",
      title: "Detail Lowongan & Kalkulator Finansial",
      subtitle: "Bilingual View, Rincian Gaji Bersih ¥134.628, Shift & Syarat",
      route: "/job-apply/jobs/kg-096",
      asset: "Job Details.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 2",
      number: "06",
      title: "Profil & CV Rirekisho Generator",
      subtitle: "Data Pribadi, Checklist Fisik Industri, Live JIS PDF Preview",
      route: "/job-apply/profile",
      asset: "profile.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 3",
      number: "07",
      title: "Form Lamaran Multi-Step",
      subtitle: "Stepper 4 Tahap, Pre-fill Data, Upload CV, Sertifikat, Video",
      route: "/job-apply/apply/pm-012",
      asset: "Job Apply Stepper.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 3",
      number: "08",
      title: "Konfirmasi & Kepatuhan Syarat",
      subtitle: "Tinjauan Data, Evaluasi Syarat 5/5, 4 Komitmen Pelamar",
      route: "/job-apply/apply/pm-012/confirm",
      asset: "Job Apply Stepper-1.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 3",
      number: "09",
      title: "Halaman Sukses Registrasi",
      subtitle: "Nomor Registrasi APL-2610-0153, Timeline 4 Tahap & Reminder WA",
      route: "/job-apply/apply/pm-012/success",
      asset: "Job Apply status after send.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 4",
      number: "10",
      title: "Lamaran Saya (Tracking Dashboard)",
      subtitle: "Tab Aktif vs Selesai, 5-Stage Stepper, Evaluasi & Jadwal",
      route: "/job-apply/my-applications",
      asset: "Job Applied list.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 4",
      number: "11",
      title: "Persiapan Interview TSK & Rekam Audio",
      subtitle: "Waktu WITA/JST, 7 Soal Furigana, Web Audio Recorder 1 Menit",
      route: "/job-apply/interview-tsk/pm-012",
      asset: "Interview TSK.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 4",
      number: "12",
      title: "Hub Dokumen Naitei & Keberangkatan",
      subtitle: "Roadmap 7 Tahap, 9 Dokumen Wajib Verifikasi & PIC WA",
      route: "/job-apply/naitei/pm-012/documents",
      asset: "List Dokumen.jpg",
      status: "Ready",
    },
    {
      batch: "Batch 5",
      number: "13",
      title: "Sertifikat Hasil Job Matching Test",
      subtitle: "Skor Mock Test & Conversation Test, Siap Unduh PDF A4",
      route: "/certificate",
      asset: "Certificate.jpg",
      status: "Ready",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9E9E9] text-[#C12121] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C12121]" />
            Next.js App Router · Tailwind CSS v4 · shadcn/ui
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] tracking-tight">
            Suka2Jepang — Modul Penyaluran Kerja
          </h1>
          <p className="text-sm text-[#4A5565] leading-relaxed">
            Daftar 12 tampilan antarmuka modul penyaluran kerja resmi dan Homepage yang sudah di-slicing berdasarkan PRD, referensi visual, dan design tokens di DESIGN.md.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-[8px] bg-[#C12121] text-white text-sm font-semibold hover:bg-[#A31D1D] shadow-sm transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Lihat Homepage Baru</span>
          </Link>
          <Link
            href="/job-apply/jobs"
            className="px-5 py-2.5 rounded-[8px] bg-white border border-[#D1D5DC] text-[#1E2939] text-sm font-semibold hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2"
          >
            <span>Buka Katalog Lowongan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/job-apply/components-preview"
            className="px-5 py-2.5 rounded-[8px] bg-white border border-[#D1D5DC] text-[#1E2939] text-sm font-semibold hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#C12121]" />
            <span>Showroom 6 Status Kartu</span>
          </Link>
        </div>

        {/* Screens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {screens.map((item, idx) => (
            <Link
              key={idx}
              href={item.route}
              className="p-5 rounded-[16px] bg-white border border-[#E5E5E5] hover:border-[#C12121] hover:shadow-[0_8px_20px_-4px_rgba(193,33,33,0.08)] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#C12121]">
                    Screen {item.number}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "Ready"
                        ? "bg-[#ECFDF5] text-[#107C41]"
                        : item.status === "In Progress"
                        ? "bg-[#FEF3C7] text-[#92400E]"
                        : "bg-gray-100 text-[#6A7282]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0A0A0A] group-hover:text-[#C12121] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6A7282] mt-1.5 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#99A1AF] font-medium">
                <span className="truncate max-w-[200px]">{item.asset}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-[#C12121] transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
