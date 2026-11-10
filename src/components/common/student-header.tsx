"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, X, LogIn } from "lucide-react";
import { SswExamInfoModal } from "@/components/job-apply/ssw-exam-info-modal";
import { NotificationsPopover } from "@/components/job-apply/notifications-popover";
import { PushableButton } from "@/components/common/pushable-button";

export function StudentHeader() {
  const pathname = usePathname();

  // Interactive States
  const [isSswModalOpen, setIsSswModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoginModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLoginModalOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLoginModalOpen]);

  const navLinks = [
    { label: "Lowongan Kerja", href: "/job-apply/jobs" },
    { label: "Untukmu", href: "/job-apply/for-you" },
    { label: "Lamaran Saya", href: "/job-apply/my-applications", badge: 2 },
    { label: "Profil & CV", href: "/job-apply/profile" },
  ];

  // If on Onboarding Wizard (Personalize), render clean onboarding header
  if (pathname === "/job-apply/personalize") {
    return (
      <>
        <header className="sticky top-0 z-40 bg-white border-b border-[#E5E5E5] px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
            <Link href="/job-apply/jobs" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-full bg-[#C12121] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                S2
              </span>
              <span className="font-bold text-lg md:text-xl text-[#0A0A0A] tracking-tight">
                Suka2Jepang
              </span>
            </Link>

            <div className="text-sm text-[#4A5565]">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="font-semibold text-[#C12121] underline hover:text-[#A31D1D] transition-colors cursor-pointer"
              >
                Masuk
              </button>
            </div>
          </div>
        </header>

        {/* Login Modal for Onboarding */}
        {isLoginModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setIsLoginModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center">
                    <LogIn className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Masuk ke Suka2Jepang</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1">
                    No. WhatsApp atau Email
                  </label>
                  <input
                    type="text"
                    defaultValue="+62 812 3456 7890"
                    className="w-full h-10 px-3 border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#C12121] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full h-10 px-3 border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#C12121] text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <PushableButton
                  href="/job-apply/for-you"
                  size="md"
                  className="w-full text-center"
                >
                  Masuk Sekarang
                </PushableButton>
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 py-1"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-3 transition-colors">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Logo & Nav items */}
          <div className="flex items-center gap-6">
            <Link href="/job-apply/for-you" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-full bg-[#C12121] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                S2
              </span>
              <span className="font-bold text-lg md:text-xl text-[#0A0A0A] tracking-tight">
                Suka2Jepang
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5" aria-label="Navigasi Utama Siswa">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/job-apply/jobs" && pathname.startsWith(link.href)) ||
                  (link.href === "/job-apply/my-applications" &&
                    (pathname.startsWith("/job-apply/interview-tsk") ||
                      pathname.startsWith("/job-apply/naitei")));

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#FDE8E8] text-[#C12121] font-semibold"
                        : "text-[#4A5565] hover:text-[#0A0A0A] hover:bg-gray-100"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge !== undefined && (
                      <span
                        className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? "bg-[#C12121] text-white"
                            : "bg-gray-200 text-[#4A5565]"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Info Ujian SSW Modal Trigger (Eliminates dead href="#") */}
              <button
                type="button"
                onClick={() => setIsSswModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#4A5565] hover:text-[#0A0A0A] hover:bg-gray-100 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Info Ujian SSW</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C12121]" />
              </button>
            </nav>
          </div>

          {/* Right: Notifications & Profile Avatar */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            {/* Notification Bell with Active Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isNotifOpen
                    ? "border-[#C12121] bg-[#FEECEC] text-[#C12121]"
                    : "border-[#E5E7EB] hover:border-gray-400 bg-white text-[#4A5565] hover:text-[#0A0A0A]"
                }`}
                aria-label="Buka Notifikasi Siswa"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C12121] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <NotificationsPopover
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
              />
            </div>

            {/* Candidate Profile Indicator — Budi Santoso (Certified) */}
            <Link
              href="/job-apply/profile"
              className="flex items-center gap-2.5 text-[#0A0A0A] hover:opacity-85 transition-opacity"
            >
              <span className="w-8 h-8 rounded-full bg-[#182B49] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                BS
              </span>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#0A0A0A] leading-tight">
                  Budi Santoso
                </span>
                <span className="text-[10px] text-[#107C41] font-semibold leading-tight flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" /> Certified
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Prometric SSW Exam Information Modal */}
      <SswExamInfoModal
        isOpen={isSswModalOpen}
        onClose={() => setIsSswModalOpen(false)}
      />
    </>
  );
}
