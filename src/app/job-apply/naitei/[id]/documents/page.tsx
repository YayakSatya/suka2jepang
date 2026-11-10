"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock,
  UploadCloud,
  Eye,
  Download,
  MessageCircle,
  Plane,
  Sparkles,
  ShieldCheck,
  X,
  Share2,
  AlertTriangle,
  FileCheck,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { MOCK_JOBS, MOCK_APPLICATIONS } from "@/lib/mock-data";
import { PushableButton } from "@/components/common/pushable-button";

// Interface for 9 mandatory documents
export interface NaiteiDocumentItem {
  id: string;
  name: string;
  requirement: string;
  status: "verified" | "review" | "pending";
  fileName?: string;
  fileSize?: string;
  updatedAt?: string;
  verifiedBy?: string;
  notes?: string;
  hasTemplate?: boolean;
}

// Interface for 7 roadmap stages
export interface DepartureRoadmapStage {
  id: number;
  title: string;
  japaneseTitle?: string;
  description: string;
  status: "completed" | "active" | "pending";
  dateEstimate: string;
  detailedNotes: string[];
  actionHint?: string;
}

export default function NaiteiDocumentsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-8 text-sm text-[#64748B]">
          Memuat hub dokumen Naitei...
        </div>
      }
    >
      <NaiteiDocumentsContent />
    </React.Suspense>
  );
}

function NaiteiDocumentsContent() {
  const params = useParams();
  const id = (params?.id as string) || "pm-012";

  // Match job
  const job =
    MOCK_JOBS.find((j) => j.id.toLowerCase() === id.toLowerCase()) ||
    MOCK_JOBS[0];

  // Match application
  const matchedApp =
    MOCK_APPLICATIONS.find(
      (app) => app.job.id.toLowerCase() === id.toLowerCase()
    ) || MOCK_APPLICATIONS[0];

  // 9 Mandatory Documents State
  const [documents, setDocuments] = useState<NaiteiDocumentItem[]>([
    {
      id: "doc-paspor",
      name: "Paspor",
      requirement: "Masa berlaku minimal 18 bulan",
      status: "verified",
      fileName: "Paspor_RI_BudiSantoso.pdf",
      fileSize: "2.4 MB",
      updatedAt: "19 Okt 2026",
      verifiedBy: "Sarah Agustina (Timedoor Career Support)",
      notes: "Masa berlaku sampai 28 Agustus 2031 (valid & memenuhi syarat)",
    },
    {
      id: "doc-ktp-kk",
      name: "KTP & Kartu Keluarga",
      requirement: "E-KTP & KK terbaru (jelas, tidak buram)",
      status: "verified",
      fileName: "KTP_KK_BudiSantoso.pdf",
      fileSize: "1.8 MB",
      updatedAt: "19 Okt 2026",
      verifiedBy: "Sarah Agustina (Timedoor Career Support)",
      notes: "Data NIK dan nama sesuai dengan ijazah dan paspor",
    },
    {
      id: "doc-ijazah",
      name: "Ijazah terakhir",
      requirement: "Beserta terjemahan bahasa Jepang resmi",
      status: "verified",
      fileName: "Ijazah_SMK_Terjemahan.pdf",
      fileSize: "3.1 MB",
      updatedAt: "19 Okt 2026",
      verifiedBy: "Tim Penerjemah Tersumpah Timedoor",
      notes: "SMK Jurusan Tata Boga / Pengolahan Pangan + terjemahan disahkan",
    },
    {
      id: "doc-ssw-jft",
      name: "Sertifikat SSW & JFT / JLPT",
      requirement: "Sertifikat keahlian & bahasa Jepang",
      status: "verified",
      fileName: "SSW_Food_JFT_A2_Cert.pdf",
      fileSize: "1.5 MB",
      updatedAt: "18 Okt 2026",
      verifiedBy: "Sarah Agustina (Timedoor Career Support)",
      notes: "SSW Pengolahan Makanan & JFT Basic A2 skor 214 (Lolos)",
    },
    {
      id: "doc-foto",
      name: "Pas foto 4×3 latar putih",
      requirement: "Kemeja formal, latar belakang putih polos",
      status: "verified",
      fileName: "Pasfoto_Formal_3x4.jpg",
      fileSize: "840 KB",
      updatedAt: "18 Okt 2026",
      verifiedBy: "Admin Dokumen Timedoor",
      notes: "Rasio 4x3 presisi sesuai standar Imigrasi Jepang",
    },
    {
      id: "doc-kontrak",
      name: "Kontrak kerja ditandatangani",
      requirement: "Kontrak dwibahasa Jepang–Indonesia bermeterai",
      status: "verified",
      fileName: "Kontrak_Kerja_Hatanaka_Signed.pdf",
      fileSize: "4.2 MB",
      updatedAt: "20 Okt 2026",
      verifiedBy: "TSK Timedoor & PT Hatanaka Shokuhin",
      notes: "Sudah ditandatangani kandidat & dibubuhkan e-meterai resmi",
    },
    {
      id: "doc-izin-ortu",
      name: "Surat izin orang tua / wali",
      requirement: "Template bisa diunduh",
      status: "review",
      fileName: "Surat_Izin_Ortu_Signed.pdf",
      fileSize: "1.2 MB",
      updatedAt: "Hari ini, 11:30 WITA",
      hasTemplate: true,
      notes: "Sedang dalam antrean verifikasi legal Timedoor (estimasi 1x24 jam)",
    },
    {
      id: "doc-mcu",
      name: "Hasil medical check-up",
      requirement: "Setelah jadwal MCU keluar",
      status: "pending",
      notes: "Menunggu jadwal resmi dari klinik rujukan Timedoor di Denpasar / Surabaya",
    },
    {
      id: "doc-skck",
      name: "SKCK",
      requirement: "Dari Polres sesuai domisili KTP",
      status: "pending",
      notes: "Khusus keperluan visa kerja Tokutei Ginou Jepang",
    },
  ]);

  // 7 Departure Roadmap Stages
  const roadmapStages: DepartureRoadmapStage[] = [
    {
      id: 1,
      title: "Naitei (内定)",
      japaneseTitle: "ないてい",
      description: "Lulus mensetsu perusahaan",
      status: "completed",
      dateEstimate: "18 Okt 2026",
      detailedNotes: [
        "Wawancara dengan PT Hatanaka Shokuhin dinyatakan LULUS.",
        "Surat penawaran kerja resmi (Naiteisho) telah diterbitkan dan diterima.",
      ],
    },
    {
      id: 2,
      title: "Tanda tangan kontrak kerja",
      description: "Kontrak dwibahasa Jepang–Indonesia",
      status: "completed",
      dateEstimate: "20 Okt 2026",
      detailedNotes: [
        "Kontrak kerja (Koyou Keiyakusho) dwibahasa telah disetujui.",
        "Masa kontrak awal 1 tahun (dapat diperpanjang hingga total 5 tahun SSW).",
      ],
    },
    {
      id: 3,
      title: "Pengajuan COE oleh TSK",
      japaneseTitle: "在留資格認定証明書",
      description: "Sedang diproses imigrasi Jepang, biasanya 1–3 bulan",
      status: "active",
      dateEstimate: "Okt 2026 – Jan 2027",
      actionHint: "Sedang berjalan",
      detailedNotes: [
        "TSK 'You' telah mendaftarkan berkas ke Biro Imigrasi Regional Fukuoka.",
        "Proses verifikasi COE memakan waktu rata-rata 60–90 hari kerja.",
        "Kandidat diminta memastikan nomor HP/WhatsApp selalu aktif.",
      ],
    },
    {
      id: 4,
      title: "Medical check-up",
      description: "Di klinik yang ditunjuk",
      status: "pending",
      dateEstimate: "Des 2026 / Jan 2027",
      detailedNotes: [
        "Pemeriksaan kesehatan di klinik rujukan resmi (Denpasar / Surabaya).",
        "Meliputi tes darah lengkap, rontgen toraks paru-paru, urin, hepatitis, dan fisik.",
      ],
    },
    {
      id: 5,
      title: "Pengajuan visa",
      description: "Di Kedutaan / Konsulat Jepang setelah COE terbit",
      status: "pending",
      dateEstimate: "Jan – Feb 2027",
      detailedNotes: [
        "Setelah surat fisik COE tiba di Indonesia, paspor diajukan ke Kedutaan Besar Jepang / Konsulat Jenderal.",
        "Proses visa kerja membutuhkan waktu sekitar 5–7 hari kerja.",
      ],
    },
    {
      id: 6,
      title: "E-KTKLN & BPJS Ketenagakerjaan",
      description: "Wajib untuk pekerja migran Indonesia",
      status: "pending",
      dateEstimate: "Feb 2027",
      detailedNotes: [
        "Pendaftaran Elektronik Kartu Tenaga Kerja Luar Negeri (E-KTKLN) di BP3MI.",
        "Asuransi perlindungan BPJS Ketenagakerjaan sebelum dan selama di Jepang.",
      ],
    },
    {
      id: 7,
      title: "Orientasi & keberangkatan",
      description: "Tiket pesawat dan penjemputan di Jepang",
      status: "pending",
      dateEstimate: "Maret 2027 (Musim Semi)",
      detailedNotes: [
        "Pembekalan akhir pre-departure orientation oleh Timedoor.",
        "Penerbangan ke Bandara Fukuoka / Haneda dan penjemputan oleh staf perusahaan.",
      ],
    },
  ];

  // Active Document Tab Filter: "all" | "pending" | "verified" | "review"
  const [docFilter, setDocFilter] = useState<"all" | "pending" | "verified" | "review">("all");

  // Expanded Stage in Roadmap
  const [expandedStageId, setExpandedStageId] = useState<number | null>(3); // Default Stage 3 (active COE)

  // Upload Modal State
  const [uploadModalDocId, setUploadModalDocId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Document Viewer Modal State
  const [viewingDoc, setViewingDoc] = useState<NaiteiDocumentItem | null>(null);

  // Download Template Modal State
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // WhatsApp Consultation Modal State
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [selectedConsultTopic, setSelectedConsultTopic] = useState<string>("mcu");

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Metrics calculation
  const totalDocs = documents.length; // 9
  const verifiedDocs = documents.filter((d) => d.status === "verified").length;
  const reviewDocs = documents.filter((d) => d.status === "review").length;
  const pendingDocs = documents.filter((d) => d.status === "pending").length;
  const progressPercent = Math.round((verifiedDocs / totalDocs) * 100);

  // Filtered documents
  const filteredDocuments = documents.filter((doc) => {
    if (docFilter === "all") return true;
    return doc.status === docFilter;
  });

  // Handle file drop/upload simulation
  const handleStartUpload = () => {
    if (!uploadModalDocId) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);

      // Update document status
      setDocuments((prevDocs) =>
        prevDocs.map((doc) => {
          if (doc.id === uploadModalDocId) {
            return {
              ...doc,
              status: "review",
              fileName: selectedFile?.name || `${doc.name.replace(/\s+/g, "_")}_BudiSantoso.pdf`,
              fileSize: selectedFile
                ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
                : "2.1 MB",
              updatedAt: "Baru saja",
              notes: "Berhasil diunggah. Sedang dalam antrean verifikasi Timedoor.",
            };
          }
          return doc;
        })
      );

      const uploadedDocName =
        documents.find((d) => d.id === uploadModalDocId)?.name || "Dokumen";

      setUploadModalDocId(null);
      setSelectedFile(null);
      setUploadProgress(0);
      showToast(`✓ ${uploadedDocName} berhasil diunggah! Timedoor akan memverifikasi dalam 1x24 jam.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#1E2939] text-white rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md"
        >
          <span className="w-5 h-5 rounded-full bg-[#107C41] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </span>
          <span className="text-sm font-medium leading-snug">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-white"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Sub-Header Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/job-apply/my-applications"
              className="inline-flex items-center gap-1.5 font-medium text-[#4A5565] hover:text-[#C12121] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Lamaran Saya</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 font-medium hidden md:inline">
              Naitei & Keberangkatan
            </span>
            <span className="text-slate-300 hidden md:inline">/</span>
            <span className="text-[#0A0A0A] font-semibold">
              Hub Dokumen
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#107C41] border border-[#A7F3D0]">
              <span className="w-2 h-2 rounded-full bg-[#107C41] animate-pulse" />
              <span>Lolos Mensetsu & Naitei Issued</span>
            </span>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast("Tautan halaman berkas berhasil disalin!");
              }}
              className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-white text-[#64748B] hover:text-[#0A0A0A] transition-colors"
              title="Salin tautan dokumen"
              aria-label="Salin tautan"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HERO BANNER PENERIMAAN (NAITEI) - Exact Reference Styling */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#A31D1D] via-[#B91C1C] to-[#C12121] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-red-900/20">
          {/* Subtle Decorative Japanese Wave / Sunburst Accent */}
          <div className="absolute -right-16 -top-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-20 w-60 h-60 rounded-full bg-white/5 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="space-y-3 max-w-2xl">
              {/* Japanese Celebration Badge */}
              <div className="flex flex-wrap items-center gap-2 text-white/90">
                <span className="text-base sm:text-lg font-bold tracking-wider font-sans">
                  内定おめでとうございます
                </span>
                <span className="text-[11px] bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full font-medium">
                  Naitei omedetou gozaimasu
                </span>
              </div>

              {/* Big Bold Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Selamat, kamu diterima (naitei)!
              </h1>

              {/* Job & Company Subtitle */}
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-red-100 font-medium">
                <span className="bg-black/20 px-2.5 py-0.5 rounded-md text-xs font-semibold text-white tracking-wide">
                  {matchedApp.applicationNumber || "APL-2610-0153"}
                </span>
                <span className="hidden sm:inline">·</span>
                <span>{job.title}</span>
                <span>·</span>
                <span>{job.companyName}, {job.location}</span>
              </div>
            </div>

            {/* Right Side Metric Cards */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 shrink-0">
              {/* Metric 1: Progres Dokumen */}
              <div className="flex-1 sm:flex-initial min-w-[150px] p-4 sm:p-5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 flex flex-col justify-center text-left shadow-xs">
                <span className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-red-200" />
                  Progres dokumen
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {verifiedDocs} / {totalDocs}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-white/70 mt-1.5">
                  {pendingDocs + reviewDocs > 0
                    ? `${pendingDocs + reviewDocs} berkas perlu diselesaikan`
                    : "Semua berkas siap"}
                </span>
              </div>

              {/* Metric 2: Perkiraan Berangkat Card */}
              <div className="flex-1 sm:flex-initial min-w-[170px] p-4 sm:p-5 rounded-2xl bg-white shadow-md text-[#0A0A0A] flex flex-col justify-center text-left border border-slate-100">
                <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#C12121]" />
                  Perkiraan berangkat
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#0A0A0A] mt-1 tracking-tight">
                  Maret 2027
                </span>
                <span className="text-[11px] font-medium text-[#107C41] mt-1 flex items-center gap-1">
                  <span>🌸 Musim Semi</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">±5 bln lagi</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT GRID: 7-Stage Roadmap (Left) vs 9 Documents (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: TAHAPAN SAMPAI BERANGKAT (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs">
              <div className="border-b border-[#F1F5F9] pb-4 mb-5">
                <h2 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                  Tahapan sampai berangkat
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Roadmap resmi Tokutei Ginou menuju Jepang
                </p>
              </div>

              {/* Vertical Stepper with Connected Lines */}
              <div className="relative pl-2">
                {roadmapStages.map((stage, idx) => {
                  const isCompleted = stage.status === "completed";
                  const isActive = stage.status === "active";
                  const isExpanded = expandedStageId === stage.id;
                  const isLast = idx === roadmapStages.length - 1;

                  return (
                    <div key={stage.id} className="relative flex gap-4 pb-7 last:pb-1 group">
                      {/* Connecting Line to next step */}
                      {!isLast && (
                        <div
                          className={`absolute left-[15px] top-[30px] bottom-0 w-0.5 transition-colors ${
                            isCompleted ? "bg-[#C12121]" : "bg-[#E5E7EB]"
                          }`}
                        />
                      )}

                      {/* Step Indicator Node */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedStageId(isExpanded ? null : stage.id)
                        }
                        className={`relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all select-none focus:outline-hidden ${
                          isCompleted
                            ? "bg-[#C12121] text-white shadow-xs"
                            : isActive
                            ? "bg-white text-[#C12121] border-2 border-[#C12121] ring-4 ring-red-100 shadow-xs"
                            : "bg-white text-[#64748B] border border-[#CBD5E1]"
                        }`}
                        aria-label={`Tahap ${stage.id}: ${stage.title}`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <span>{stage.id}</span>
                        )}
                      </button>

                      {/* Content block */}
                      <div className="flex-1 pt-0.5">
                        <div
                          onClick={() =>
                            setExpandedStageId(isExpanded ? null : stage.id)
                          }
                          className="cursor-pointer select-none"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h3
                              className={`text-sm font-bold tracking-tight ${
                                isCompleted
                                  ? "text-[#0A0A0A]"
                                  : isActive
                                  ? "text-[#C12121]"
                                  : "text-[#475569]"
                              }`}
                            >
                              {stage.title}
                            </h3>

                            {isActive && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEECEC] text-[#C12121] shrink-0 border border-red-200">
                                Sedang proses
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        {/* Collapsible / Expandable Details for Stage */}
                        {isExpanded && (
                          <div className="mt-3 p-3 bg-[#F9FAFB] rounded-xl border border-slate-200 text-xs text-[#334155] space-y-2 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between font-semibold text-[#0A0A0A] border-b border-slate-200/60 pb-1.5">
                              <span className="flex items-center gap-1.5 text-[#C12121]">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{stage.dateEstimate}</span>
                              </span>
                              {stage.japaneseTitle && (
                                <span className="text-[11px] text-slate-500 font-normal">
                                  {stage.japaneseTitle}
                                </span>
                              )}
                            </div>

                            <ul className="space-y-1.5 text-[11px] text-[#475569] list-disc list-inside">
                              {stage.detailedNotes.map((note, noteIdx) => (
                                <li key={noteIdx} className="leading-relaxed">
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Candidate Pre-Departure Checklist Card */}
            <div className="bg-[#FFF8F8] border border-red-200 rounded-[16px] p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#C12121]" />
                <span>Tips Kesiapan dari Timedoor</span>
              </div>
              <ul className="text-xs text-[#7F1D1D] space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#C12121]">•</span>
                  <span>
                    <strong>Jaga kondisi fisik:</strong> Hindari begadang menjelang Medical Check-up agar hasil tensi dan fungsi hati stabil.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#C12121]">•</span>
                  <span>
                    <strong>Perpanjang Paspor:</strong> Pastikan masa berlaku paspor minimal 18 bulan saat COE diajukan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#C12121]">•</span>
                  <span>
                    <strong>Latihan Kaiwa Harian:</strong> Manfaatkan waktu tunggu 1–3 bulan untuk mengasah percakapan sehari-hari.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: DOKUMEN YANG DIPERLUKAN (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-xs overflow-hidden">
              {/* Card Header & Filter Tabs */}
              <div className="p-6 border-b border-[#F1F5F9] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                      Dokumen yang diperlukan
                    </h2>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Upload foto/scan yang jelas, format PDF atau JPG
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div
                    className="inline-flex p-1 bg-gray-100 rounded-full border border-gray-200 self-start sm:self-auto text-xs font-semibold"
                    role="tablist"
                    aria-label="Filter status dokumen"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={docFilter === "all"}
                      onClick={() => setDocFilter("all")}
                      className={`px-3 py-1 rounded-full transition-all ${
                        docFilter === "all"
                          ? "bg-[#1E2939] text-white shadow-xs"
                          : "text-[#4A5565] hover:text-[#0A0A0A]"
                      }`}
                    >
                      Semua ({totalDocs})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={docFilter === "pending"}
                      onClick={() => setDocFilter("pending")}
                      className={`px-3 py-1 rounded-full transition-all ${
                        docFilter === "pending"
                          ? "bg-[#C12121] text-white shadow-xs"
                          : "text-[#4A5565] hover:text-[#0A0A0A]"
                      }`}
                    >
                      Perlu Upload ({pendingDocs})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={docFilter === "verified"}
                      onClick={() => setDocFilter("verified")}
                      className={`px-3 py-1 rounded-full transition-all ${
                        docFilter === "verified"
                          ? "bg-[#107C41] text-white shadow-xs"
                          : "text-[#4A5565] hover:text-[#0A0A0A]"
                      }`}
                    >
                      Terverifikasi ({verifiedDocs})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={docFilter === "review"}
                      onClick={() => setDocFilter("review")}
                      className={`px-3 py-1 rounded-full transition-all ${
                        docFilter === "review"
                          ? "bg-[#A16207] text-white shadow-xs"
                          : "text-[#4A5565] hover:text-[#0A0A0A]"
                      }`}
                    >
                      Sedang Dicek ({reviewDocs})
                    </button>
                  </div>
                </div>
              </div>

              {/* Document List Table */}
              <div className="divide-y divide-[#F1F5F9]">
                {filteredDocuments.map((doc) => {
                  const isVerified = doc.status === "verified";
                  const isReview = doc.status === "review";
                  const isPending = doc.status === "pending";

                  return (
                    <div
                      key={doc.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Left: Icon & Name */}
                      <div className="flex items-start gap-3.5 min-w-0">
                        {/* Status Icon Indicator */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isVerified
                              ? "bg-[#FEECEC] text-[#C12121]"
                              : isReview
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#F1F5F9] text-[#64748B]"
                          }`}
                        >
                          {isVerified ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : isReview ? (
                            <Clock className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <span className="font-bold text-sm">+</span>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-[#0A0A0A]">
                              {doc.name}
                            </span>

                            {doc.hasTemplate && (
                              <button
                                type="button"
                                onClick={() => setShowTemplateModal(true)}
                                className="text-[11px] font-semibold text-[#C12121] hover:underline flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Unduh template</span>
                              </button>
                            )}
                          </div>

                          <p className="text-xs text-[#64748B] leading-relaxed">
                            {doc.requirement}
                          </p>

                          {doc.fileName && (
                            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-[#475569]">
                              <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[200px] sm:max-w-xs">
                                {doc.fileName}
                              </span>
                              {doc.fileSize && (
                                <span className="text-slate-400">({doc.fileSize})</span>
                              )}
                              {doc.updatedAt && (
                                <>
                                  <span className="text-slate-300">·</span>
                                  <span className="text-slate-500">{doc.updatedAt}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Status Pill & Action Buttons */}
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        {isVerified && (
                          <>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEECEC] text-[#C12121]">
                              Terverifikasi
                            </span>
                            <button
                              type="button"
                              onClick={() => setViewingDoc(doc)}
                              className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-slate-100 text-[#64748B] hover:text-[#0A0A0A] transition-colors"
                              title="Lihat berkas terverifikasi"
                              aria-label={`Lihat ${doc.name}`}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {isReview && (
                          <>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                              Sedang dicek
                            </span>
                            <button
                              type="button"
                              onClick={() => setViewingDoc(doc)}
                              className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-slate-100 text-[#64748B] hover:text-[#0A0A0A] transition-colors"
                              title="Lihat berkas yang diunggah"
                              aria-label={`Lihat draf ${doc.name}`}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {isPending && (
                          <>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] text-[#64748B]">
                              Belum upload
                            </span>
                            <PushableButton
                              size="sm"
                              onClick={() => {
                                setUploadModalDocId(doc.id);
                                setSelectedFile(null);
                              }}
                            >
                              Upload
                            </PushableButton>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CARD FOOTER: Dedicated PIC Pendamping Dokumen & WhatsApp */}
              <div className="p-4 sm:p-5 bg-[#FAFAFA] border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#475569]">
                  <span className="w-6 h-6 rounded-full bg-[#182B49] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    SA
                  </span>
                  <span>
                    Pendamping dokumen:{" "}
                    <strong className="text-[#0A0A0A]">Sarah Agustina</strong> (Timedoor) · WhatsApp{" "}
                    <strong className="text-[#0A0A0A]">+62 812-3456-7890</strong>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowWhatsAppModal(true)}
                  className="font-bold text-[#C12121] hover:text-[#A31D1D] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#107C41]" />
                  <span>Tanya soal dokumen →</span>
                </button>
              </div>
            </div>

            {/* Quick Consultation FAQ Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0A0A0A] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C12121]" />
                  <span>Pertanyaan Umum Seputar Pengurusan Dokumen Naitei</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#475569]">
                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-slate-200/80 space-y-1">
                  <span className="font-bold text-[#0A0A0A] block">
                    Berapa lama COE biasanya diterbitkan?
                  </span>
                  <p className="leading-relaxed">
                    Rata-rata 1 hingga 3 bulan tergantung kecepatan Biro Imigrasi Jepang di wilayah perusahaan penempatan (Kagoshima / Fukuoka).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-slate-200/80 space-y-1">
                  <span className="font-bold text-[#0A0A0A] block">
                    Di mana saya melakukan Medical Check-up?
                  </span>
                  <p className="leading-relaxed">
                    Timedoor dan TSK akan memberikan surat pengantar ke klinik rekanan resmi terdekat dari domisili kamu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: UPLOAD DOKUMEN MODAL */}
      {uploadModalDocId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#C12121] uppercase tracking-wider">
                  Unggah Dokumen Naitei
                </span>
                <h3 className="text-lg font-bold text-[#0A0A0A] mt-0.5">
                  {documents.find((d) => d.id === uploadModalDocId)?.name}
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  {documents.find((d) => d.id === uploadModalDocId)?.requirement}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadModalDocId(null);
                  setSelectedFile(null);
                  setIsUploading(false);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dropzone Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                selectedFile
                  ? "border-[#107C41] bg-[#ECFDF5]/50"
                  : "border-slate-300 hover:border-[#C12121] bg-slate-50/50"
              }`}
            >
              <input
                type="file"
                id="file-upload-input"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />

              {!selectedFile ? (
                <label
                  htmlFor="file-upload-input"
                  className="cursor-pointer block space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#C12121] mx-auto flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#0A0A0A] hover:underline">
                      Pilih berkas dari perangkat
                    </span>
                    <p className="text-xs text-[#64748B] mt-1">
                      Format PDF, JPG, atau PNG (Maksimal 10 MB)
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#107C41]" />
                    <span>Dokumen dienkripsi aman untuk keperluan visa</span>
                  </div>
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#107C41] mx-auto flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#0A0A0A] block truncate max-w-xs mx-auto">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-[#64748B]">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Ganti berkas
                  </button>
                </div>
              )}
            </div>

            {/* Document Quality Guidance */}
            <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-slate-200 text-xs text-[#475569] space-y-1.5">
              <span className="font-semibold text-[#0A0A0A] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Ketentuan Foto / Scan Dokumen:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                <li>Seluruh 4 sudut dokumen harus terlihat jelas tanpa terpotong.</li>
                <li>Tidak ada pantulan cahaya kilat (glare) yang menutupi teks penting.</li>
                <li>Nama dan tanggal lahir harus terbaca tajam dan tidak buram.</li>
              </ul>
            </div>

            {/* Upload Progress Bar if Uploading */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#475569]">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin text-[#C12121]" />
                    <span>Mengunggah dokumen ke server...</span>
                  </span>
                  <span className="font-bold text-[#C12121]">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#C12121] h-full rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <PushableButton
                size="md"
                fullWidth
                disabled={!selectedFile || isUploading}
                onClick={handleStartUpload}
              >
                {isUploading ? "Memproses Unggahan..." : "Kirim untuk Verifikasi"}
              </PushableButton>
              <PushableButton
                variant="outline"
                size="md"
                fullWidth
                disabled={isUploading}
                onClick={() => {
                  setUploadModalDocId(null);
                  setSelectedFile(null);
                }}
              >
                Batal
              </PushableButton>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DOCUMENT PREVIEW MODAL */}
      {viewingDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-[#C12121] uppercase tracking-wider">
                  Detail Berkas Tersimpan
                </span>
                <h3 className="text-lg font-bold text-[#0A0A0A] mt-0.5">
                  {viewingDoc.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Tutup preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Document Preview Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Nama Dokumen:</span>
                <span className="font-bold text-[#0A0A0A]">{viewingDoc.fileName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Ukuran Berkas:</span>
                <span className="font-medium text-slate-700">{viewingDoc.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Status Verifikasi:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                    viewingDoc.status === "verified"
                      ? "bg-[#FEECEC] text-[#C12121]"
                      : "bg-[#FEF3C7] text-[#92400E]"
                  }`}
                >
                  {viewingDoc.status === "verified" ? "Terverifikasi" : "Sedang Dicek"}
                </span>
              </div>
              {viewingDoc.verifiedBy && (
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Diverifikasi oleh:</span>
                  <span className="font-medium text-slate-700">{viewingDoc.verifiedBy}</span>
                </div>
              )}
              {viewingDoc.notes && (
                <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700 block mb-0.5">Catatan Tim:</span>
                  <p className="italic leading-relaxed">{viewingDoc.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <PushableButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setViewingDoc(null);
                  setUploadModalDocId(viewingDoc.id);
                  setSelectedFile(null);
                }}
              >
                Unggah Versi Baru
              </PushableButton>
              <PushableButton
                size="md"
                fullWidth
                onClick={() => setViewingDoc(null)}
              >
                Tutup
              </PushableButton>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DOWNLOAD TEMPLATE SURAT IZIN ORANG TUA */}
      {showTemplateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#C12121] uppercase tracking-wider">
                  Format Resmi Timedoor
                </span>
                <h3 className="text-lg font-bold text-[#0A0A0A] mt-0.5">
                  Surat Izin Orang Tua / Wali
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Tutup modal template"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#4A5565] leading-relaxed">
              Surat izin orang tua/wali adalah syarat mutlak untuk penerbitan E-KTKLN BP2MI dan visa kerja Tokutei Ginou Jepang.
            </p>

            <div className="p-4 rounded-xl bg-[#F9FAFB] border border-slate-200 text-xs text-[#334155] space-y-2">
              <span className="font-bold text-[#0A0A0A] block">
                Petunjuk Pengisian & Legalisasi:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <li>Unduh dan cetak file template di bawah ini pada kertas A4.</li>
                <li>Isi identitas orang tua/wali serta data diri siswa sesuai KTP.</li>
                <li>Tempelkan meterai Rp 10.000 pada kolom tanda tangan orang tua/wali.</li>
                <li>Tanda tangani di atas meterai tersebut.</li>
                <li>Foto atau scan dokumen yang telah ditandatangani dan unggah kembali di Hub Dokumen.</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <PushableButton
                size="md"
                fullWidth
                onClick={() => {
                  showToast("Format surat izin (.PDF) berhasil diunduh ke perangkatmu!");
                  setShowTemplateModal(false);
                }}
              >
                <Download className="w-4 h-4 mr-1.5" />
                Unduh Format PDF (Resmi)
              </PushableButton>
              <PushableButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  showToast("Format surat izin (.DOCX) berhasil diunduh!");
                  setShowTemplateModal(false);
                }}
              >
                Unduh Format Word (.DOCX)
              </PushableButton>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: WHATSAPP PIC CONSULTATION DRAWER */}
      {showWhatsAppModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#182B49] text-white flex items-center justify-center font-bold text-sm">
                  SA
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Sarah Agustina
                  </h3>
                  <p className="text-xs text-[#107C41] flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#107C41] animate-pulse" />
                    Career & Visa Placement Support Timedoor
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Tutup modal konsultasi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#4A5565] leading-relaxed">
              Pilih topik pertanyaan seputar dokumen Naitei dan visa untuk otomatis menyusun pesan WhatsApp:
            </div>

            {/* Consultation Topics Selection */}
            <div className="space-y-2">
              {[
                {
                  id: "mcu",
                  title: "Jadwal & Klinik Rujukan Medical Check-up",
                  desc: "Tanyakan jadwal MCU dan alamat klinik terdekat.",
                },
                {
                  id: "skck",
                  title: "Format & Legalisir SKCK Luar Negeri",
                  desc: "Konsultasi syarat SKCK dari Polres untuk visa Jepang.",
                },
                {
                  id: "izin",
                  title: "Template Surat Izin Orang Tua / Wali",
                  desc: "Panduan pengisian meterai dan tanda tangan.",
                },
                {
                  id: "coe",
                  title: "Progres Pengajuan COE di Imigrasi Jepang",
                  desc: "Cek estimasi tanggal terbit Certificate of Eligibility.",
                },
              ].map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedConsultTopic(topic.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedConsultTopic === topic.id
                      ? "border-[#107C41] bg-[#ECFDF5]/60 text-[#0A0A0A]"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{topic.title}</span>
                    {selectedConsultTopic === topic.id && (
                      <Check className="w-3.5 h-3.5 text-[#107C41]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">{topic.desc}</p>
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-700 block">Preview Pesan:</span>
              <p className="italic text-[11px]">
                &quot;Halo Kak Sarah (Timedoor), saya Budi Santoso (No: {matchedApp.applicationNumber}). Mau konsultasi mengenai{" "}
                {selectedConsultTopic === "mcu"
                  ? "jadwal dan rujukan klinik Medical Check-up"
                  : selectedConsultTopic === "skck"
                  ? "pengurusan SKCK luar negeri dari Polres"
                  : selectedConsultTopic === "izin"
                  ? "pengisian surat izin orang tua/wali bermeterai"
                  : "perkembangan COE di Imigrasi Jepang"}{" "}
                untuk loker {job.companyName}. Terima kasih.&quot;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Halo Kak Sarah (Timedoor), saya Budi Santoso (No: ${matchedApp.applicationNumber}). Mau konsultasi mengenai dokumen Naitei loker ${job.companyName}. Terima kasih.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <PushableButton size="md" fullWidth>
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  Buka Chat WhatsApp
                </PushableButton>
              </a>
              <PushableButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setShowWhatsAppModal(false)}
              >
                Batal
              </PushableButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
