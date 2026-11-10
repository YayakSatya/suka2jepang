"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  ArrowRight,
  Inbox,
  X,
  Check,
} from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { PushableButton } from "@/components/common/pushable-button";
import { PipelineTracker } from "@/components/job-apply/pipeline-tracker";

export default function MyApplicationsPage() {
  // Tab Filter: "aktif" | "selesai" | "all"
  const [activeTab, setActiveTab] = useState<"aktif" | "selesai" | "all">("all");

  // State for confirmed attendance on app-2 (JS-003)
  const [confirmedApps, setConfirmedApps] = useState<Record<string, boolean>>({});

  // Modal State for Confirm Attendance
  const [modalAppId, setModalAppId] = useState<string | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Applications list with interactive state updates
  const applications = MOCK_APPLICATIONS.map((app) => {
    if (confirmedApps[app.id]) {
      return {
        ...app,
        stageStatus: "passed" as const,
        stageBadgeText: "Kehadiran terkonfirmasi",
        bannerMessage:
          "✓ Kehadiran kamu telah dikonfirmasi untuk 22 Okt, 14.00 WITA via Google Meet. Link room akan dikirimkan H-1.",
      };
    }
    return app;
  });

  // Active vs Selesai counts
  const activeApplications = applications.filter(
    (app) => app.stageStatus !== "rejected" && app.currentStage !== "naitei"
  );
  const completedApplications = applications.filter(
    (app) => app.stageStatus === "rejected" || app.currentStage === "naitei"
  );

  // Filtered list based on active tab
  const displayedApplications =
    activeTab === "aktif"
      ? activeApplications
      : activeTab === "selesai"
      ? completedApplications
      : applications;

  // Handler for Confirm Attendance
  const handleConfirmAttendance = (appId: string) => {
    setConfirmedApps((prev) => ({ ...prev, [appId]: true }));
    setModalAppId(null);
    showToast("Kehadiran interview berhasil dikonfirmasi! Jadwal tersimpan.");
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#0A0A0A] text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#00BC7D] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Confirmation Modal for Attendance */}
      {modalAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E5E7EB] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-[#FCEDED] text-[#C12121] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Konfirmasi Kehadiran Interview
                  </h3>
                  <p className="text-xs text-[#6A7282]">
                    Interview Timedoor · Mekanik perawatan mobil
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalAppId(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Schedule Details Box */}
            <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-[#4A5565]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C12121]" />
                  Hari & Tanggal
                </span>
                <span className="font-semibold text-[#0A0A0A]">
                  Kamis, 22 Okt 2026
                </span>
              </div>
              <div className="flex items-center justify-between text-[#4A5565]">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C12121]" />
                  Waktu
                </span>
                <span className="font-semibold text-[#0A0A0A]">
                  14.00 WITA (15.00 JST)
                </span>
              </div>
              <div className="flex items-center justify-between text-[#4A5565]">
                <span className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#155DFC]" />
                  Platform
                </span>
                <span className="font-semibold text-[#0A0A0A]">
                  Google Meet
                </span>
              </div>
            </div>

            <p className="text-xs text-[#6A7282] leading-relaxed">
              Dengan mengonfirmasi, tim Timedoor akan mencatat kesiapanmu dan mengirimkan tautan Google Meet langsung ke WhatsApp sebelum jadwal wawancara dimulai.
            </p>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <PushableButton
                size="md"
                fullWidth
                onClick={() => handleConfirmAttendance(modalAppId)}
              >
                Ya, Saya Hadir
              </PushableButton>
              <PushableButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setModalAppId(null)}
              >
                Batal
              </PushableButton>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto">
        {/* Top Header & Segmented Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-[#0A0A0A] tracking-tight">
              Lamaran saya
            </h1>
            <p className="text-sm text-[#4A5565] mt-1">
              Pantau progres seleksi loker SSW Jepang dan jadwal interview kamu secara real-time.
            </p>
          </div>

          {/* Segmented Filter Tabs: Aktif (2) vs Selesai (1) */}
          <div
            className="inline-flex p-1 bg-gray-100/90 rounded-full border border-gray-200 self-start sm:self-auto shrink-0 shadow-2xs"
            role="tablist"
            aria-label="Filter status lamaran"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 select-none ${
                activeTab === "all"
                  ? "bg-[#1E2939] text-white shadow-xs"
                  : "text-[#4A5565] hover:text-[#0A0A0A]"
              }`}
            >
              Semua ({applications.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "aktif"}
              onClick={() => setActiveTab("aktif")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 select-none ${
                activeTab === "aktif"
                  ? "bg-[#1E2939] text-white shadow-xs"
                  : "text-[#4A5565] hover:text-[#0A0A0A]"
              }`}
            >
              Aktif ({activeApplications.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "selesai"}
              onClick={() => setActiveTab("selesai")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 select-none ${
                activeTab === "selesai"
                  ? "bg-[#1E2939] text-white shadow-xs"
                  : "text-[#4A5565] hover:text-[#0A0A0A]"
              }`}
            >
              Selesai ({completedApplications.length})
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Applications Feed (Col 8) */}
          <section className="lg:col-span-8 space-y-5" aria-label="Daftar Lamaran">
            {displayedApplications.length === 0 ? (
              /* Senior UX Standard Empty State */
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3F4F6] text-[#99A1AF] flex items-center justify-center">
                  <Inbox className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-1">
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Belum ada lamaran di kategori ini
                  </h3>
                  <p className="text-sm text-[#6A7282]">
                    {activeTab === "selesai"
                      ? "Lamaran yang ditolak atau telah selesai akan diarsipkan di sini."
                      : "Kamu belum memiliki lamaran aktif saat ini. Telusuri lowongan yang cocok untukmu sekarang."}
                  </p>
                </div>
                <PushableButton href="/job-apply/jobs" size="md">
                  Cari Lowongan Kerja
                </PushableButton>
              </div>
            ) : (
              displayedApplications.map((app) => {
                const isConfirmed = !!confirmedApps[app.id];
                const isRejected = app.stageStatus === "rejected";
                const isApp1 = app.id === "app-1";
                const isApp2 = app.id === "app-2";
                const isApp3 = app.id === "app-3";

                // Badge styling per card
                let badgeClass = "bg-[#FCEDED] text-[#C12121] border border-[#FDE8E8]";
                if (app.stageStatus === "pending") {
                  badgeClass = "bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7]";
                } else if (app.stageStatus === "rejected") {
                  badgeClass = "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]";
                } else if (isConfirmed) {
                  badgeClass = "bg-[#ECFDF5] text-[#107C41] border border-[#D1FAE5]";
                }

                // Alert Banner Background styling
                let bannerBoxClass = "bg-[#F9FAFB] border border-[#E5E7EB]";
                if (isApp1) {
                  bannerBoxClass = "bg-[#FCEDED]/70 border border-[#FDE8E8]";
                } else if (isConfirmed) {
                  bannerBoxClass = "bg-[#ECFDF5] border border-[#D1FAE5]";
                }

                return (
                  <article
                    key={app.id}
                    className="bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-[18px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all space-y-5"
                  >
                    {/* Card Top Row: Sector Kicker, Title, Subtitle, & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        {/* Red Kicker: Tracking ID · Sector */}
                        <div className="text-xs font-bold text-[#C12121] tracking-wide flex items-center gap-1.5">
                          <span className="font-mono bg-[#FEECEC] px-2 py-0.5 rounded text-[11px]">
                            {app.id === "app-1"
                              ? "APL-2610-0153"
                              : app.id === "app-2"
                              ? "APL-2610-0142"
                              : "APL-2610-0089"}
                          </span>
                          <span>·</span>
                          <span>{app.job.sectorLabel}</span>
                        </div>

                        {/* Job Position Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mt-1 tracking-tight">
                          <Link
                            href={`/job-apply/jobs/${app.job.id}`}
                            className="hover:text-[#C12121] transition-colors"
                          >
                            {app.job.title}
                          </Link>
                        </h2>

                        {/* Location & Apply Date */}
                        <p className="text-xs sm:text-sm text-[#6A7282] mt-1">
                          {app.job.location} · Apply {app.appliedDate}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="self-start">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold select-none ${badgeClass}`}
                        >
                          {app.stageBadgeText}
                        </span>
                      </div>
                    </div>

                    {/* Middle: 5-Stage Pipeline Tracker */}
                    <div className="pt-1 pb-1">
                      <PipelineTracker
                        currentStage={app.currentStage}
                        stageStatus={app.stageStatus}
                        rejectionNote={app.rejectionNote}
                      />
                    </div>

                    {/* Bottom Action Alert Box */}
                    <div
                      className={`rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${bannerBoxClass}`}
                    >
                      {/* Alert Message */}
                      <div className="flex items-start gap-2.5 max-w-xl">
                        {isConfirmed && (
                          <CheckCircle2 className="w-4 h-4 text-[#107C41] shrink-0 mt-0.5" />
                        )}
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isRejected
                              ? "text-[#4A5565]"
                              : isConfirmed
                              ? "text-[#107C41] font-medium"
                              : "text-[#0A0A0A] font-medium"
                          }`}
                        >
                          {app.bannerMessage}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 self-start sm:self-center">
                        {isApp1 && (
                          <PushableButton
                            size="sm"
                            href={app.actionCtaLink}
                          >
                            {app.actionCtaText}
                          </PushableButton>
                        )}

                        {isApp2 && (
                          isConfirmed ? (
                            <PushableButton
                              size="sm"
                              variant="secondary"
                              disabled
                            >
                              <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#107C41]" />
                                Terkonfirmasi
                              </span>
                            </PushableButton>
                          ) : (
                            <PushableButton
                              size="sm"
                              onClick={() => setModalAppId(app.id)}
                            >
                              {app.actionCtaText}
                            </PushableButton>
                          )
                        )}

                        {isApp3 && (
                          <PushableButton
                            size="sm"
                            variant="secondary"
                            href={app.actionCtaLink}
                          >
                            {app.actionCtaText}
                          </PushableButton>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>

          {/* Sidebar Widgets (Col 4) */}
          <aside className="lg:col-span-4 space-y-5" aria-label="Sidebar Informasi Lamaran">
            {/* Widget 1: Kelengkapan Profil */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  Kelengkapan profil
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#4A5565]">4 dari 5 bagian lengkap</span>
                <span className="font-extrabold text-[#0A0A0A]">80%</span>
              </div>

              {/* Progress Bar (80%) */}
              <div
                className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-[#C12121] rounded-full transition-all duration-500 ease-out"
                  style={{ width: "80%" }}
                />
              </div>

              {/* Link CTA */}
              <div className="pt-1">
                <Link
                  href="/job-apply/profile"
                  className="text-xs sm:text-sm font-bold text-[#C12121] hover:text-[#A31D1D] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Lengkapi video perkenalan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Widget 2: Jadwal Berikutnya (Dark Sumi Navy Card) */}
            <div className="bg-[#1E2939] text-white rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Jadwal berikutnya
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#00BC7D] animate-pulse" />
              </div>

              <div className="space-y-3">
                {/* Schedule Item 1: OKT 21 */}
                <Link
                  href="/job-apply/interview-tsk/pm-012"
                  className="flex items-center gap-3.5 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  {/* Red Date Tile */}
                  <div className="w-12 h-12 rounded-xl bg-[#C12121] text-white flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold tracking-wider uppercase leading-none">
                      OKT
                    </span>
                    <span className="text-lg font-black leading-none mt-0.5">
                      21
                    </span>
                  </div>

                  {/* Schedule Details */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate leading-tight group-hover:text-[#FCA5A5] transition-colors">
                      Interview TSK · Pengolahan Makanan
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <Clock className="w-3 h-3 text-slate-400" />
                      </span>
                      <span>10.00 WITA · Zoom</span>
                    </p>
                  </div>
                </Link>

                {/* Schedule Item 2: OKT 22 */}
                <div
                  onClick={() => setModalAppId("app-2")}
                  className="flex items-center gap-3.5 p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  {/* Gray Date Tile */}
                  <div className="w-12 h-12 rounded-xl bg-[#374151] text-white flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold tracking-wider uppercase leading-none">
                      OKT
                    </span>
                    <span className="text-lg font-black leading-none mt-0.5">
                      22
                    </span>
                  </div>

                  {/* Schedule Details */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate leading-tight group-hover:text-slate-200 transition-colors">
                      Interview Timedoor · JS-003
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <Video className="w-3 h-3 text-slate-400" />
                      </span>
                      <span>14.00 WITA · Google Meet</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 3: Tips Persiapan Interview */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-3.5">
              <h3 className="text-base font-bold text-[#0A0A0A]">
                Tips persiapan interview
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-[#4A5565] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C12121] mt-2 shrink-0" />
                  <span>
                    Latih jikoshoukai{" "}
                    <span className="font-japanese font-medium text-[#0A0A0A]">
                      （自己紹介）
                    </span>{" "}
                    1 menit dengan intonasi jelas dan penuh percaya diri.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C12121] mt-2 shrink-0" />
                  <span>
                    Siapkan alasan kuat mengapa kamu memilih perusahaan dan bidang kerja ini.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C12121] mt-2 shrink-0" />
                  <span>
                    Pastikan keluarga di Indonesia sudah memberikan restu dan dukungan penuh untuk bekerja ke Jepang.
                  </span>
                </li>
              </ul>
            </div>

            {/* Widget 4: Akses Cepat Hub Dokumen Naitei */}
            <div className="bg-gradient-to-br from-[#FFF5F5] to-white border border-red-200/90 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#C12121] text-white flex items-center justify-center font-bold text-xs">
                    内
                  </span>
                  <h3 className="text-sm font-bold text-[#0A0A0A]">
                    Hub Dokumen Naitei
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#107C41] border border-[#A7F3D0]">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-[#4A5565] leading-relaxed">
                Lolos Mensetsu PT Hatanaka Shokuhin? Kelola 9 dokumen wajib dan pantau progres COE menuju keberangkatan.
              </p>
              <Link
                href="/job-apply/naitei/pm-012/documents"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-[8px] bg-[#C12121] hover:bg-[#A31D1D] text-white text-xs font-semibold shadow-xs transition-colors gap-1.5"
              >
                <span>Buka Hub Dokumen (6/9 Siap)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
