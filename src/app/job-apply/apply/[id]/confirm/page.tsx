"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  FileText,
  Video,
} from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { PushableButton } from "@/components/common";
import { JobApplicationFormData } from "@/types/job-apply";

export default function JobApplyConfirmPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-gray-500">
          Memuat konfirmasi lamaran...
        </div>
      }
    >
      <JobApplyConfirmContent />
    </React.Suspense>
  );
}

function JobApplyConfirmContent() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "pm-012";

  const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];

  // Retrieve form data from draft
  const [formData] = useState<JobApplicationFormData>(() => {
    const defaultData: JobApplicationFormData = {
      jobId: job.id,
      fullName: "Budi Santoso",
      katakanaName: "ブディ サントソ",
      birthDate: "2003-05-12",
      whatsappNumber: "+62 812 3456 7890",
      gender: "Perempuan",
      domicile: "Di Indonesia",
      sswCertificate: "Pengolahan Makanan",
      japaneseLevel: "JLPT N4",
      lastEducation: "SMA/SMK",
      japanExperience: "Belum pernah",
      hasTattoo: false,
      smoker: false,
      canHandlePork: true,
      canNightShift: true,
      cvFileName: "CV_Kandidat_2026.pdf",
      cvFileSize: "1.8 MB",
      sswCertFileName: "Sertifikat_SSW_JLPT-N4.pdf",
      sswCertFileSize: "2.4 MB",
      introVideoFileName: "jikoshoukai.mp4",
      introVideoFileSize: "0:58",
      agreedToTerms: true,
      lastSavedAt: "15 Okt, 10.42",
    };

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`suka2jepang_apply_draft_${job.id}`);
        if (saved) return { ...defaultData, ...JSON.parse(saved) };
      } catch {
        // Fallback
      }
    }
    return defaultData;
  });

  // 4 Commitments Checkbox State (Job Apply Stepper-1.jpg)
  const [commitments, setCommitments] = useState({
    truthfulData: true,
    shareData: true,
    attendInterviews: true,
    batchQuotaAware: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCommitment = (key: keyof typeof commitments) => {
    setCommitments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allCommitted =
    commitments.truthfulData &&
    commitments.shareData &&
    commitments.attendInterviews &&
    commitments.batchQuotaAware;

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allCommitted) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/job-apply/apply/${job.id}/success`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* In-Page Subheader / Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <Link
            href={`/job-apply/apply/${job.id}?step=3`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-[#C12121] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5] text-[#0A0A0A] group-hover:text-[#C12121] group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Dokumen</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Draf tersimpan otomatis · {formData.lastSavedAt}</span>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
            Konfirmasi Lamaran · {job.title}
          </h1>
          <p className="text-sm text-[#4A5565]">
            Langkah terakhir: cek ulang semua data sebelum lamaran dikirim.
          </p>
        </div>

        {/* 4-Step Stepper (All 4 Active / Completed) */}
        <div className="space-y-2.5 pt-1 pb-2">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="h-1.5 rounded-full bg-[#C12121]" />
            <div className="h-1.5 rounded-full bg-[#C12121]" />
            <div className="h-1.5 rounded-full bg-[#C12121]" />
            <div className="h-1.5 rounded-full bg-[#C12121]" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-1.5 text-[#0A0A0A]">
              <span className="w-4 h-4 rounded-full bg-[#C12121] text-white flex items-center justify-center text-[10px] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className="hidden sm:inline">Data diri</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0A0A0A]">
              <span className="w-4 h-4 rounded-full bg-[#C12121] text-white flex items-center justify-center text-[10px] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className="hidden sm:inline">Kualifikasi</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0A0A0A]">
              <span className="w-4 h-4 rounded-full bg-[#C12121] text-white flex items-center justify-center text-[10px] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className="hidden sm:inline">Dokumen</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0A0A0A]">
              <span className="w-4 h-4 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                4
              </span>
              <span className="font-extrabold text-[#C12121]">Konfirmasi</span>
            </div>
          </div>
        </div>

        {/* Warning Alert Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start sm:items-center gap-3 text-amber-900 text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Periksa sekali lagi. Setelah dikirim, data lamaran tidak bisa diubah
            sendiri — perubahan harus lewat admin.
          </span>
        </div>

        {/* Main Grid Layout */}
        <form onSubmit={handleFinalSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Review Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* CARD 1: REVIEW DATA DIRI */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h2 className="text-base font-bold text-[#0A0A0A]">Data diri</h2>
                </div>
                <Link
                  href={`/job-apply/apply/${job.id}?step=1`}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-semibold text-[#1E2939] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Ubah
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block mb-0.5">Nama lengkap</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">フリガナ</span>
                  <span className="font-bold text-[#0A0A0A] font-mono">
                    {formData.katakanaName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Tanggal lahir</span>
                  <span className="font-bold text-[#0A0A0A]">
                    12 Mei 2003 (23 th)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Jenis kelamin</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.gender}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">No. WhatsApp</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.whatsappNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Domisili</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.domicile.replace("Di ", "")}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: REVIEW KUALIFIKASI */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h2 className="text-base font-bold text-[#0A0A0A]">Kualifikasi</h2>
                </div>
                <Link
                  href={`/job-apply/apply/${job.id}?step=2`}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-semibold text-[#1E2939] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Ubah
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block mb-0.5">Sertifikat SSW</span>
                  <span className="font-bold text-[#0A0A0A]">
                    Pengolahan makanan
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Bahasa Jepang</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.japaneseLevel}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Pendidikan</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.lastEducation}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">
                    Pengalaman di Jepang
                  </span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.japanExperience}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Tato / merokok</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.hasTattoo ? "Ada" : "Tidak"} /{" "}
                    {formData.smoker ? "Ya" : "Tidak"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">
                    Daging babi / shift malam
                  </span>
                  <span className="font-bold text-[#0A0A0A]">
                    {formData.canHandlePork ? "Bisa" : "Tidak"} /{" "}
                    {formData.canNightShift ? "Bisa" : "Tidak"}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 3: REVIEW DOKUMEN */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h2 className="text-base font-bold text-[#0A0A0A]">Dokumen</h2>
                </div>
                <Link
                  href={`/job-apply/apply/${job.id}?step=3`}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-xs font-semibold text-[#1E2939] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Ubah
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block mb-0.5">CV (履歴書)</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                    <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{formData.cvFileName}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Sertifikat</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                    <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{formData.sswCertFileName}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">
                    Video perkenalan
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                    <Video className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>jikoshoukai.mp4 (0:58)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: KECOCOKAN DENGAN SYARAT LOKER */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A0A0A]">
                  Kecocokan dengan syarat loker
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C12121] text-white">
                  5 / 5 terpenuhi
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span>
                      <strong className="text-[#0A0A0A]">
                        SSW Pengolahan makanan
                      </strong>{" "}
                      — Lulus
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span>
                      <strong className="text-[#0A0A0A]">
                        JFT A2 / JLPT N4
                      </strong>{" "}
                      — JLPT N4
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span>
                      <strong className="text-[#0A0A0A]">
                        Domisili Indonesia / Jepang
                      </strong>{" "}
                      — Indonesia
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span>
                      <strong className="text-[#0A0A0A]">Pria atau wanita</strong>{" "}
                      — Perempuan
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                  <span>
                    <strong className="text-[#0A0A0A]">
                      Siap shift malam (17:45–02:30)
                    </strong>{" "}
                    — Bisa
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 5: PERNYATAAN KOMITMEN */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">Pernyataan</h2>

              <div className="space-y-3">
                <div
                  onClick={() => toggleCommitment("truthfulData")}
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <div
                    className={`w-5 h-5 rounded-[4px] border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      commitments.truthfulData
                        ? "bg-[#C12121] border-[#C12121] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {commitments.truthfulData && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-[#4A5565] leading-snug">
                    Saya menyatakan semua data dan dokumen di atas benar dan milik
                    saya sendiri.
                  </span>
                </div>

                <div
                  onClick={() => toggleCommitment("shareData")}
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <div
                    className={`w-5 h-5 rounded-[4px] border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      commitments.shareData
                        ? "bg-[#C12121] border-[#C12121] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {commitments.shareData && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-[#4A5565] leading-snug">
                    Saya setuju data saya dibagikan ke TSK dan perusahaan di
                    Jepang untuk proses seleksi loker ini.
                  </span>
                </div>

                <div
                  onClick={() => toggleCommitment("attendInterviews")}
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <div
                    className={`w-5 h-5 rounded-[4px] border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      commitments.attendInterviews
                        ? "bg-[#C12121] border-[#C12121] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {commitments.attendInterviews && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-[#4A5565] leading-snug">
                    Saya bersedia mengikuti interview Timedoor, interview TSK,
                    dan mensetsu sesuai jadwal.
                  </span>
                </div>

                <div
                  onClick={() => toggleCommitment("batchQuotaAware")}
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <div
                    className={`w-5 h-5 rounded-[4px] border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                      commitments.batchQuotaAware
                        ? "bg-[#C12121] border-[#C12121] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {commitments.batchQuotaAware && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-[#4A5565] leading-snug">
                    Saya memahami mensetsu baru dijadwalkan setelah minimal 12
                    kandidat terkumpul.
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (BOTTOM) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <PushableButton
                variant="secondary"
                href={`/job-apply/apply/${job.id}?step=3`}
                size="md"
                className="w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Dokumen</span>
                </span>
              </PushableButton>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <PushableButton
                  type="button"
                  variant="secondary"
                  onClick={() => router.push(`/job-apply/apply/${job.id}?step=3`)}
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Simpan draf
                </PushableButton>

                <PushableButton
                  type="submit"
                  size="md"
                  disabled={!allCommitted || isSubmitting}
                  className="w-full sm:w-auto min-w-[170px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mengirim...</span>
                    </span>
                  ) : (
                    <span>Kirim lamaran</span>
                  )}
                </PushableButton>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* Job Summary Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-bold text-[#C12121] tracking-wider uppercase block">
                  {job.jobCode} · {job.sectorLabel.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold text-[#0A0A0A] mt-1 tracking-tight">
                  {job.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  {job.companyName} · {job.location}
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#64748B]">Gaji bulanan</span>
                  <span className="font-bold text-[#0A0A0A]">
                    {job.salaryGrossDisplay.replace("/bulan", "").trim()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#64748B]">Dibutuhkan</span>
                  <span className="font-medium text-[#0A0A0A]">
                    {job.positionsDisplay}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#64748B]">Batas apply</span>
                  <span className="font-bold text-[#C12121]">
                    {job.applicationDeadline || "19 Okt 2026"}
                  </span>
                </div>
              </div>
            </div>

            {/* Dark Process Card */}
            <div className="bg-[#18191B] text-white rounded-2xl p-6 shadow-md space-y-3.5">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Proses setelah apply
              </h3>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="leading-snug">
                    Interview awal dengan Timedoor
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="leading-snug">
                    Interview dengan TSK（登録支援機関）
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="leading-snug">
                    Mensetsu dengan perusahaan
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <span className="leading-snug">
                    Naitei (diterima) & pengurusan dokumen
                  </span>
                </li>
              </ol>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
