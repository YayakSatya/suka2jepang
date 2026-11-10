"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Headphones,
  FileCheck2,
} from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { PushableButton } from "@/components/common";

export default function JobApplySuccessPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-gray-500">
          Memuat tanda terima lamaran...
        </div>
      }
    >
      <JobApplySuccessContent />
    </React.Suspense>
  );
}

function JobApplySuccessContent() {
  const params = useParams();
  const id = (params?.id as string) || "pm-012";
  const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* In-Page Status Pill Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
          <Link
            href="/job-apply/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-[#C12121] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5] text-[#0A0A0A] group-hover:text-[#C12121] group-hover:-translate-x-0.5 transition-transform" />
            <span>Katalog lowongan</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold overflow-x-auto">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              <span>Data diri</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              <span>Kualifikasi</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              <span>Dokumen</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C12121] text-white shadow-xs">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Terkirim</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Success Hero & Timeline (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
            {/* Big Success Icon & Heading */}
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#C12121] text-white flex items-center justify-center shadow-md">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                  Lamaranmu terkirim!
                </h1>
                <p className="text-sm sm:text-base text-[#4A5565] leading-relaxed">
                  Terima kasih sudah apply{" "}
                  <strong className="text-[#0A0A0A]">
                    {job.title} ({job.sectorLabel})
                  </strong>{" "}
                  di {job.location}. Nomor lamaran:{" "}
                  <span className="font-mono font-bold text-[#C12121] bg-[#FEECEC] px-2 py-0.5 rounded-md">
                    APL-2610-0153
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Vertical Timeline of 4 Next Steps */}
            <div className="space-y-6 pt-2">
              {/* Step 1: Done */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[#0A0A0A]">
                    Lamaran diterima sistem
                  </p>
                  <p className="text-xs text-slate-500">Hari ini, 15 Okt 2026</p>
                </div>
                <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-slate-200 -z-0" />
              </div>

              {/* Step 2: In Queue */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 z-10">
                  2
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[#0A0A0A]">
                    Dihubungi tim Timedoor via WhatsApp
                  </p>
                  <p className="text-xs text-slate-500">
                    Dalam 1–3 hari kerja untuk jadwal interview awal
                  </p>
                </div>
                <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-slate-200 -z-0" />
              </div>

              {/* Step 3: Interview Timedoor */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 z-10">
                  3
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[#0A0A0A]">
                    Interview Timedoor
                  </p>
                  <p className="text-xs text-slate-500">
                    Online 15–20 menit, pakai bahasa Jepang dasar
                  </p>
                </div>
                <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-slate-200 -z-0" />
              </div>

              {/* Step 4: Interview TSK & Mensetsu */}
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 z-10">
                  4
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[#0A0A0A]">
                    Interview TSK & mensetsu perusahaan
                  </p>
                  <p className="text-xs text-slate-500">
                    Mensetsu dijadwalkan setelah minimal 12 kandidat terkumpul
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
              <PushableButton
                href="/job-apply/my-applications"
                size="md"
                className="w-full sm:w-auto"
              >
                Lihat status lamaran
              </PushableButton>

              <PushableButton
                variant="secondary"
                href={`/job-apply/interview-tsk/${job.id}`}
                size="md"
                className="w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-[#C12121]" />
                  <span>Latihan interview</span>
                </span>
              </PushableButton>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* CARD 1: Data Yang Kamu Kirim */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <FileCheck2 className="w-4 h-4 text-[#C12121]" />
                <h2 className="text-sm font-bold text-[#0A0A0A]">
                  Data yang kamu kirim
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Nama</span>
                  <span className="font-bold text-[#0A0A0A]">Budi Santoso</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Jenis kelamin</span>
                  <span className="font-bold text-[#0A0A0A]">Laki-laki</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sertifikat</span>
                  <span className="font-bold text-[#0A0A0A]">
                    SSW Pengolahan makanan
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Bahasa</span>
                  <span className="font-bold text-[#0A0A0A]">JFT Basic A2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Domisili</span>
                  <span className="font-bold text-[#0A0A0A]">Indonesia</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Dokumen</span>
                  <span className="font-bold text-[#0A0A0A]">
                    CV, sertifikat, video
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: Pastikan WhatsApp Aktif */}
            <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-6 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C12121]" />
                <h3 className="text-sm font-bold text-[#991B1B]">
                  Pastikan WhatsApp aktif
                </h3>
              </div>
              <p className="text-xs text-[#7F1D1D] leading-relaxed">
                Tim Timedoor akan menghubungi dari nomor resmi{" "}
                <span className="font-mono font-semibold">+62 811-2345-6789</span>{" "}
                (Career Support Suka2Jepang). Simpan nomornya supaya pesan tidak terlewat.
              </p>
            </div>

            {/* CARD 3: Loker Mirip Lainnya */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-3.5">
              <h3 className="text-sm font-bold text-[#0A0A0A]">
                Loker mirip lainnya
              </h3>

              <div className="space-y-2">
                <Link
                  href="/job-apply/jobs/kg-096"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs font-semibold text-[#C12121] transition-colors group"
                >
                  <span>Kaigo Lansia · Sapporo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/job-apply/jobs/kg-095"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs font-semibold text-[#C12121] transition-colors group"
                >
                  <span>Kaigo Lansia · Hokkaido</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
