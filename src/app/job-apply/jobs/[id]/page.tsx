"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Download } from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { PushableButton, StatTile } from "@/components/common";

export default function JobDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-gray-500">
          Memuat detail lowongan...
        </div>
      }
    >
      <JobDetailContent />
    </React.Suspense>
  );
}

function JobDetailContent() {
  const params = useParams();
  const id = (params?.id as string) || "kg-096";

  // Language switcher state: "id" | "jp" | "dual"
  const [langMode, setLangMode] = useState<"id" | "jp" | "dual">("dual");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Get job or fallback to PM-012 if not found
  const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];

  const handleDownloadKyujinhyo = () => {
    setToastMsg("Dokumen 求人票 (PDF) resmi berhasil diunduh.");
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMsg}</span>
        </div>
      )}
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Top Bar with Navigation & Language Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <Link
            href="/job-apply/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-[#C12121] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Semua loker</span>
          </Link>

          {/* Tri-state Language Switcher */}
          <div className="inline-flex p-1 rounded-full bg-[#E5E7EB] border border-[#D1D5DC]">
            <button
              type="button"
              onClick={() => setLangMode("id")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                langMode === "id"
                  ? "bg-white text-[#0A0A0A] shadow-xs"
                  : "text-[#4A5565] hover:text-[#0A0A0A]"
              }`}
            >
              Indonesia
            </button>
            <button
              type="button"
              onClick={() => setLangMode("jp")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                langMode === "jp"
                  ? "bg-white text-[#0A0A0A] shadow-xs font-mono"
                  : "text-[#4A5565] hover:text-[#0A0A0A] font-mono"
              }`}
            >
              日本語
            </button>
            <button
              type="button"
              onClick={() => setLangMode("dual")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                langMode === "dual"
                  ? "bg-white text-[#C12121] shadow-xs"
                  : "text-[#4A5565] hover:text-[#0A0A0A]"
              }`}
            >
              Dua bahasa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Job Details Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Job Header & Key Highlights */}
            <section className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 space-y-5 shadow-xs">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FEECEC] text-[#C12121]">
                  {job.sectorLabel} {job.sectorKanji ? `(${job.sectorKanji})` : ""}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F1F5F9] text-[#475569]">
                  Kedatangan baru dari luar negeri（新規入国）
                </span>
              </div>

              {/* Title & Facility */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight">
                  {job.title}
                </h1>
                <p className="text-sm text-[#475569] mt-1.5 leading-relaxed">
                  {job.companyName} {job.facilityName ? `· ${job.facilityName}` : ""}, {job.location}
                </p>
              </div>

              {/* 4 Highlight Metric Cards: Title Kecil, Nilai Besar (Identik dengan Syarat Pelamar) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                <StatTile
                  label="Gaji + tunjangan"
                  value={
                    job.salaryGrossDisplay ||
                    `¥${(job.salaryBreakdown?.gross.total || 185500).toLocaleString("id-ID")}`
                  }
                />
                <StatTile
                  label="Perkiraan bersih"
                  value={`¥${(job.salaryBreakdown?.netTakeHomeEstimate || 134628).toLocaleString("id-ID")}`}
                />
                <StatTile
                  label="Dibutuhkan"
                  value={job.positionsDisplay || "2 orang"}
                />
                <StatTile
                  label="Mulai pendaftaran"
                  value={job.applicationDeadline || "9 Okt 2026"}
                />
              </div>
            </section>

            {/* Section 2: Daya Tarik Perusahaan (Title Di Luar Card) */}
            <div className="space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">
                Daya tarik perusahaan
              </h2>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(job.companyPerks || [
                    "Dukungan Pelatihan Praktisi (実務者研修) dan sertifikasi",
                    "Seragam dipinjamkan, asrama tersedia dengan Wi-Fi",
                    "Pesangon untuk masa kerja 4 tahun ke atas",
                    "Libur 120 hari per tahun",
                    "Cuti tahunan berbayar 10 hari setelah 3 bulan",
                  ]).map((perk, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F9FAFB] border border-slate-100 flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-[#C12121] stroke-[2.5] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#475569] leading-relaxed">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Pekerjaan & Jam Kerja (Title Di Luar Card) */}
            <div className="space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">
                Pekerjaan & jam kerja
              </h2>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs space-y-4">
                <ul className="space-y-2 text-xs text-[#475569] list-disc list-inside leading-relaxed">
                  {job.sector === "kaigo" ? (
                    <>
                      <li>Perawatan penghuni fasilitas: bantuan buang air, mandi, dan makan</li>
                      <li>Dukungan rehabilitasi kehidupan sehari-hari</li>
                      <li>Rekreasi bersama penghuni dan membantu latihan jalan di bawah arahan staf rehabilitasi</li>
                    </>
                  ) : (
                    <>
                      <li>Pengolahan dan pengemasan produk makanan olahan beku standar higienis Jepang</li>
                      <li>Pengecekan kualitas bahan baku dan proses pembekuan sesuai SOP</li>
                      <li>Pembersihan dan sanitasi peralatan kerja lini produksi</li>
                    </>
                  )}
                </ul>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {(job.shifts || [
                    { name: "Pagi (Shift 1)", time: "07:30–16:10" },
                    { name: "Pagi (Shift 2)", time: "07:50–16:30" },
                    { name: "Siang (Reguler)", time: "08:50–17:30" },
                    { name: "Sore (Shift 1)", time: "10:00–18:40" },
                  ]).map((shift, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200/80 bg-[#F9FAFB] space-y-1"
                    >
                      <span className="text-xs font-medium text-[#64748B] block">
                        {shift.name}
                      </span>
                      <span className="text-sm font-bold text-[#0A0A0A] block">
                        {shift.time}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed pt-1">
                  Istirahat 60 menit tiap shift, jam kerja resmi 7 jam 40 menit. Shift malam dimulai setelah masa pelatihan adaptasi.
                </p>
              </div>
            </div>

            {/* Section 4: Rincian Gaji & Potongan (Title Di Luar Card) */}
            <div className="space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">
                Rincian gaji per bulan
              </h2>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kolom (A) Gaji & Tunjangan */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <div className="bg-[#F9FAFB] px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center justify-center shrink-0">
                          A
                        </span>
                        <span className="text-xs font-bold text-[#0A0A0A]">Gaji & Tunjangan</span>
                      </div>
                      <span className="text-[11px] text-[#64748B]">Bruto</span>
                    </div>
                    <div className="divide-y divide-slate-100 text-xs text-[#475569]">
                      <div className="flex justify-between px-4 py-3">
                        <span>Gaji pokok</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.gross.baseSalary || 145500).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-3">
                        <span>Tunjangan perbaikan perlakuan（処遇改善手当）</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.gross.treatmentAllowance || 31225).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-3">
                        <span>Tunjangan perbaikan khusus（特定処遇改善手当）</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.gross.specialTreatmentAllowance || 6500).toLocaleString("id-ID")}
                        </strong>
                      </div>
                    </div>
                    <div className="bg-[#F9FAFB] px-4 py-3 border-t border-slate-200 flex justify-between items-center text-xs font-extrabold text-[#0A0A0A]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                          A
                        </span>
                        <span>Total Pendapatan</span>
                      </span>
                      <span className="text-sm font-black text-[#0A0A0A]">
                        ¥{(job.salaryBreakdown?.gross.total || 183225).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Kolom (B) Potongan Wajib */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <div className="bg-[#F9FAFB] px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold flex items-center justify-center shrink-0">
                          B
                        </span>
                        <span className="text-xs font-bold text-[#0A0A0A]">Potongan Wajib</span>
                      </div>
                      <span className="text-[11px] text-[#64748B]">Pajak & Fasilitas</span>
                    </div>
                    <div className="divide-y divide-slate-100 text-xs text-[#475569]">
                      <div className="flex justify-between px-4 py-2.5">
                        <span>Pajak penghasilan</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.deductions.incomeTax || 2360).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-2.5">
                        <span>Jaminan sosial</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.deductions.socialInsurance || 27151).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-2.5">
                        <span>Asuransi ketenagakerjaan</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.deductions.employmentInsurance || 943).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-2.5">
                        <span>Asrama</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.deductions.dormitory || 20000).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-2.5">
                        <span>Iuran dukungan anak（子ども・子育て支援金）</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.deductions.childSupportContribution || 218).toLocaleString("id-ID")}
                        </strong>
                      </div>
                      <div className="flex justify-between px-4 py-2.5">
                        <span>Iuran koperasi karyawan（互助会費）</span>
                        <strong className="text-[#0A0A0A] font-semibold">
                          ¥{(job.salaryBreakdown?.deductions.employeeCoopFee || 200).toLocaleString("id-ID")}
                        </strong>
                      </div>
                    </div>
                    <div className="bg-[#F9FAFB] px-4 py-3 border-t border-slate-200 flex justify-between items-center text-xs font-extrabold text-[#0A0A0A]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                          B
                        </span>
                        <span>Total Potongan</span>
                      </span>
                      <span className="text-sm font-black text-[#0A0A0A]">
                        ¥{(job.salaryBreakdown?.deductions.total || 50872).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Red Highlight Banner: Perkiraan Gaji Bersih */}
                <div className="px-5 py-4 rounded-xl bg-[#C12121] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-sm md:text-base font-bold tracking-wide block">
                      Perkiraan Gaji Bersih (Take-Home Pay)
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-white/90">
                      <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                        <span>A</span> Pendapatan
                      </span>
                      <span className="font-bold">−</span>
                      <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                        <span>B</span> Potongan
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl md:text-[28px] font-black tracking-tight self-start sm:self-center">
                    ¥{(job.salaryBreakdown?.netTakeHomeEstimate || 132353).toLocaleString("id-ID")}
                  </span>
                </div>

                {/* 3 Extra Perk Cards: Title Kecil, Nilai Besar (Identik dengan Syarat Pelamar) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <StatTile
                    label="Shift malam"
                    value={
                      (job.salaryBreakdown?.additionalPerks?.nightShift || "¥10.000").replace(/\s*\/\s*kali/i, "")
                    }
                    unit="/ kali"
                  />
                  <StatTile
                    label="Bonus"
                    value={
                      (job.salaryBreakdown?.additionalPerks?.bonus || "3,55 bulan").replace(/\s*\/\s*tahun/i, "")
                    }
                    unit="/ tahun"
                  />
                  <StatTile
                    label="Kerja hari libur"
                    value={
                      (job.salaryBreakdown?.additionalPerks?.holidayWork || "¥1.000").replace(/\s*\/\s*hari/i, "")
                    }
                    unit="/ hari"
                  />
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  Tunjangan makan diberikan dalam bentuk makanan atau uang saku. Biaya makan dan listrik/air dipotong sesuai pemakaian fasilitas asrama.
                </p>
              </div>
            </div>

            {/* Section 5: Syarat Pelamar (Title Di Luar Card) */}
            <div className="space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">
                Syarat pelamar
              </h2>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs space-y-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-white text-xs">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Jenis kelamin</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.gender || "Pria & Wanita"}
                      </strong>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Usia</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.ageRange || "18–30 tahun"}
                      </strong>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Bahasa Jepang</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.japaneseLevel || "JLPT N4 ke atas"}
                      </strong>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Kewarganegaraan</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.nationality || "Indonesia"}
                      </strong>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Hijab</span>
                      <strong className="text-[#C12121] text-base font-bold block">
                        {job.requirements?.hijabPolicy || "Tidak boleh"}
                      </strong>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Tato</span>
                      <strong className="text-[#C12121] text-base font-bold block">
                        {job.requirements?.tattooPolicy || "Tidak boleh"}
                      </strong>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Pengalaman di Jepang</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.japanExperience || "Tidak wajib"}
                      </strong>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">Status pernikahan</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.maritalStatus || "Bebas"}
                      </strong>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-xs font-medium text-[#64748B] block">SIM</span>
                      <strong className="text-[#0A0A0A] text-base font-bold block">
                        {job.requirements?.driverLicense || "Tidak wajib"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Rail Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Widget 1: Cocok dengan Profilmu? (Title Di Luar Card) */}
            <div className="space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">
                Cocok dengan profilmu?
              </h2>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs space-y-5">
                <div className="space-y-3">
                  {(job.matchDetails || [
                    { label: "Usia 23 tahun — masuk rentang", matched: true },
                    { label: "JLPT N4 — memenuhi", matched: true },
                    { label: "Tidak bertato — memenuhi", matched: true },
                    { label: "Sertifikat SSW sesuai", matched: false },
                  ]).map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-[#0A0A0A]">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          detail.matched
                            ? "bg-[#C12121] text-white"
                            : "bg-[#181C24] text-white text-[10px] font-bold"
                        }`}
                      >
                        {detail.matched ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          "!"
                        )}
                      </div>
                      <span>{detail.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-2.5 pt-2">
                  <PushableButton
                    href={`/job-apply/apply/${id}`}
                    fullWidth
                    size="lg"
                    className="w-full text-center"
                  >
                    Apply loker ini
                  </PushableButton>

                  <PushableButton
                    variant="secondary"
                    fullWidth
                    size="lg"
                    onClick={handleDownloadKyujinhyo}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4 text-[#C12121]" />
                      <span>Download 求人票 (PDF)</span>
                    </span>
                  </PushableButton>
                </div>
              </div>
            </div>

            {/* Widget 2: Libur & Cuti (Title Di Luar Card) */}
            <div className="space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">Libur & cuti</h2>
              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 shadow-xs space-y-2 text-xs text-[#475569] leading-relaxed">
                <p>Libur sesuai jadwal shift, {job.leavePolicy?.annualLeaveDays || 120} hari/tahun</p>
                <p>Cuti berbayar {job.leavePolicy?.paidLeaveAfterMonths || "10 hari setelah 3 bulan bekerja"}</p>
                <p>Tunjangan saat diliburkan perusahaan: {job.leavePolicy?.leaveAllowancePercent || "60%"}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
