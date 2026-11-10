"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bookmark, Check, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { MatchScoreBadge } from "@/components/job-apply/match-score-badge";
import { PushableButton } from "@/components/common/pushable-button";
import { SswExamInfoModal } from "@/components/job-apply/ssw-exam-info-modal";

export default function ForYouPage() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    "kg-095",
    "pm-012",
    "kg-096",
  ]);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(true);
  const [isSswModalOpen, setIsSswModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Curated matching list
  const targetIds = ["pm-012", "gu-001", "kg-095", "sg-012"];
  const matchedJobs = targetIds
    .map((id) => MOCK_JOBS.find((j) => j.id === id))
    .filter(Boolean) as typeof MOCK_JOBS;

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      showToast("Lowongan dihapus dari daftar tersimpan.");
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast("Lowongan berhasil disimpan ke favorit.");
    }
  };

  const handleToggleAlert = () => {
    const nextState = !isAlertActive;
    setIsAlertActive(nextState);
    showToast(
      nextState
        ? "Notifikasi WhatsApp lowongan baru diaktifkan."
        : "Notifikasi WhatsApp dinonaktifkan."
    );
  };

  // Dynamically resolve bookmarked jobs
  const savedJobs = bookmarkedIds
    .map((id) => MOCK_JOBS.find((j) => j.id === id))
    .filter(Boolean) as typeof MOCK_JOBS;

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto">
        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-[28px] font-extrabold text-[#0A0A0A] tracking-tight">
            Loker untukmu
          </h1>
          <p className="text-sm text-[#4A5565] mt-1">
            Dicocokkan dengan profilmu: Budi Santoso, 23 th, SSW Pengolahan makanan, JFT A2, domisili Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Feed: Matched Job Cards (Col 8) */}
          <section className="lg:col-span-8 space-y-4">
            {matchedJobs.map((job) => {
              const isBookmarked = bookmarkedIds.includes(job.id);
              const isAlreadyApplied = job.id === "pm-012";

              return (
                <article
                  key={job.id}
                  className="bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-[18px] p-5 md:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
                >
                  {/* Left: Circular Match Score Badge */}
                  <div className="shrink-0">
                    <MatchScoreBadge score={job.matchScore || 0} />
                  </div>

                  {/* Center: Info Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category Pill Tag */}
                    <div className="mb-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#155DFC] border border-[#DBEAFE]">
                        <span>{job.sectorLabel}</span>
                        {job.sectorKanji && (
                          <span className="font-mono text-[11px] opacity-75 font-normal">
                            {job.sectorKanji}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Job Title */}
                    <Link href={`/job-apply/jobs/${job.id}`} className="inline-block group">
                      <h2 className="text-lg md:text-[19px] font-bold text-[#0A0A0A] group-hover:text-[#C12121] transition-colors mt-0.5 leading-snug">
                        {job.title}
                      </h2>
                    </Link>

                    {/* Location & Quota */}
                    <p className="text-sm text-[#64748B] mt-0.5 font-normal">
                      {job.location} · {job.positionsDisplay}
                    </p>

                    {/* Matching Criteria Badges */}
                    {job.matchDetails && job.matchDetails.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.matchDetails.map((req, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              req.matched
                                ? "bg-[#FEECEC] text-[#991B1B]"
                                : "bg-[#F1F5F9] text-[#475569]"
                            }`}
                          >
                            {req.matched ? (
                              <Check className="w-3.5 h-3.5 text-[#C12121] stroke-[2.5]" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-[#64748B] stroke-[2.5]" />
                            )}
                            {req.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions (Bookmark + CTA) */}
                  <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(job.id)}
                      className={`w-10 h-10 rounded-[8px] border flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                        isBookmarked
                          ? "bg-[#FEECEC] border-[#DA7A7A] text-[#C12121]"
                          : "border-slate-300 hover:border-slate-400 text-slate-700 bg-white"
                      }`}
                      aria-label={isBookmarked ? "Hapus dari simpanan" : "Simpan loker"}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${isBookmarked ? "fill-[#C12121]" : ""}`}
                      />
                    </button>

                    {isAlreadyApplied ? (
                      <PushableButton
                        variant="secondary"
                        href="/job-apply/my-applications"
                        size="sm"
                      >
                        Lihat status
                      </PushableButton>
                    ) : (
                      <PushableButton href={`/job-apply/jobs/${job.id}`} size="sm">
                        Lihat loker
                      </PushableButton>
                    )}
                  </div>
                </article>
              );
            })}
          </section>

          {/* Right Rail: 3 Widgets (Col 4) */}
          <aside className="lg:col-span-4 space-y-4">
            {/* Widget 1: Tersimpan (Dynamic from bookmarkedIds) */}
            <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                  Tersimpan ({savedJobs.length})
                </h2>
                {savedJobs.length > 0 && (
                  <span className="text-xs text-[#64748B]">Favorit Anda</span>
                )}
              </div>

              {savedJobs.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1">
                  <p className="text-xs font-semibold text-[#0A0A0A]">
                    Belum ada loker tersimpan
                  </p>
                  <p className="text-[11px] text-[#64748B]">
                    Klik ikon bookmark pada kartu lowongan untuk menyimpan loker favoritmu.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {savedJobs.map((j) => (
                    <div
                      key={j.id}
                      className="bg-[#F9FAFB] rounded-xl p-3 border border-slate-100 hover:border-slate-200 transition-colors flex items-start justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[11px] font-semibold text-[#155DFC] bg-[#EFF6FF] px-2 py-0.5 rounded-full mb-1">
                          {j.sectorLabel}
                        </span>
                        <Link
                          href={`/job-apply/jobs/${j.id}`}
                          className="block text-sm font-bold text-[#0A0A0A] hover:text-[#C12121] transition-colors truncate"
                        >
                          {j.title}
                        </Link>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          {j.location} · {j.positionsDisplay}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleBookmark(j.id)}
                        className="text-slate-400 hover:text-[#C12121] p-1 cursor-pointer shrink-0"
                        title="Hapus dari tersimpan"
                        aria-label={`Hapus ${j.title} dari tersimpan`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Widget 2: Notifikasi loker baru (Dark Theme Card) */}
            <div className="bg-[#181C24] text-white rounded-[18px] p-5 shadow-sm space-y-4">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Notifikasi loker baru
                </h2>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Kirim ke WhatsApp jika ada loker:
                </p>
              </div>

              {/* Preference Tags */}
              <div className="flex flex-wrap gap-2 pt-0.5">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2A2E37] text-slate-200 border border-white/10">
                  Pengolahan makanan
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2A2E37] text-slate-200 border border-white/10">
                  Kaigo
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2A2E37] text-slate-200 border border-white/10">
                  Domisili Indonesia
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2A2E37] text-slate-200 border border-white/10">
                  Boleh berhijab: semua
                </span>
              </div>

              {/* Status Row with Red Checkbox */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-sm font-bold text-white">
                  {isAlertActive ? "Aktif" : "Nonaktif"}
                </span>

                <button
                  type="button"
                  onClick={handleToggleAlert}
                  className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors cursor-pointer ${
                    isAlertActive ? "bg-[#C12121] text-white" : "bg-slate-700 border border-slate-600"
                  }`}
                  aria-label="Toggle status notifikasi WhatsApp"
                >
                  {isAlertActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              </div>

              {/* Bottom Link */}
              <div>
                <Link
                  href="/job-apply/personalize"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <span>Ubah preferensi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Widget 3: Tingkatkan peluangmu */}
            <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <h2 className="text-base font-bold text-[#0A0A0A] tracking-tight">
                Tingkatkan peluangmu
              </h2>
              <p className="text-sm text-[#4A5565] leading-relaxed mt-1.5">
                Lulus ujian SSW Kaigo membuka{" "}
                <strong className="text-[#0A0A0A] font-bold">74 loker</strong> tambahan tahun ini.
              </p>
              <button
                type="button"
                onClick={() => setIsSswModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C12121] hover:underline mt-3.5 transition-colors cursor-pointer"
              >
                <span>Lihat jadwal ujian Prometric</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Prometric SSW Exam Information Modal */}
      <SswExamInfoModal
        isOpen={isSswModalOpen}
        onClose={() => setIsSswModalOpen(false)}
      />
    </div>
  );
}
