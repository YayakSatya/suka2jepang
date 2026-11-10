"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  X,
  LogIn,
  CheckCircle2,
  Calendar,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Menu,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SswExamInfoModal } from "@/components/job-apply/ssw-exam-info-modal";
import { PushableButton } from "@/components/common/pushable-button";

export default function HomePage() {
  const router = useRouter();

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState("");

  // Modals States
  const [isSswModalOpen, setIsSswModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<"privacy" | "terms" | null>(null);

  // Selected Sector highlight state (Default Kaigo as in draft, but interactive!)
  const [activeSector, setActiveSector] = useState<string>("kaigo");

  // Admin Inquiry topic state
  const [adminTopic, setAdminTopic] = useState("ssw");

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLoginModalOpen(false);
        setIsAdminModalOpen(false);
        setIsFaqModalOpen(false);
        setActiveLegalModal(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/job-apply/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/job-apply/jobs");
    }
  };

  const sectors = [
    {
      id: "kaigo",
      kanji: "介護",
      name: "Kaigo",
      countText: "74 loker di 2026 · SSW",
      isPrimaryInDraft: true,
    },
    {
      id: "kensetsu",
      kanji: "建設",
      name: "Konstruksi",
      countText: "41 loker di 2026 · SSW",
    },
    {
      id: "gijinkoku",
      kanji: "技術・人文知識・国際業務",
      name: "Gijinkoku",
      countText: "38 loker di 2026 · D3/S1",
    },
    {
      id: "pengolahan_makanan",
      kanji: "飲食料品製造",
      name: "Pengolahan makanan",
      countText: "18 loker di 2026 · SSW",
    },
    {
      id: "restoran",
      kanji: "外食",
      name: "Restoran",
      countText: "14 loker di 2026 · SSW",
    },
    {
      id: "perhotelan",
      kanji: "宿泊",
      name: "Perhotelan",
      countText: "14 loker di 2026 · SSW",
    },
    {
      id: "pertanian",
      kanji: "農業",
      name: "Pertanian",
      countText: "13 loker di 2026 · SSW",
    },
    {
      id: "manufaktur",
      kanji: "製造",
      name: "Manufaktur",
      countText: "13 loker di 2026 · SSW",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Daftar & lengkapi profil",
      description: "Isi biodata, sertifikat, dan CV 履歴書 sekali saja.",
      href: "/job-apply/personalize",
    },
    {
      number: "2",
      title: "Apply loker",
      description: "Pilih loker yang sesuai sertifikat dan bahasa Jepangmu.",
      href: "/job-apply/jobs",
    },
    {
      number: "3",
      title: "Interview Timedoor",
      description: "Cek kemampuan bahasa dan kesiapan kerja.",
      href: "/job-apply/for-you",
    },
    {
      number: "4",
      title: "Interview TSK & mensetsu",
      description: "Bertemu TSK, lalu wawancara dengan perusahaan.",
      href: "/job-apply/interview-tsk/pm-012",
    },
    {
      number: "5",
      title: "Naitei & dokumen",
      description: "Kontrak, COE, visa, sampai keberangkatan.",
      href: "/job-apply/naitei/pm-012/documents",
    },
  ];

  const getAdminWhatsAppUrl = () => {
    let msg = "Halo Admin Timedoor, saya ingin konsultasi mengenai program kerja ke Jepang Suka2Jepang.";
    if (adminTopic === "ssw") {
      msg = "Halo Admin Timedoor, saya ingin bertanya tentang persiapan sertifikasi SSW dan kursus bahasa Jepang persiapan kerja.";
    } else if (adminTopic === "loker") {
      msg = "Halo Admin Timedoor, saya ingin bertanya tentang lowongan Tokutei Ginou dan persyaratan pendaftaran.";
    } else if (adminTopic === "gijinkoku") {
      msg = "Halo Admin Timedoor, saya lulusan D3/S1 dan ingin konsultasi visa Gijinkoku ke Jepang.";
    }
    return `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col font-sans selection:bg-[#FDE8E8] selection:text-[#C12121]">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F0F2F5] transition-all">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8 md:gap-10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-full bg-[#C12121] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs group-hover:scale-105 transition-transform">
                S2
              </span>
              <span className="font-extrabold text-lg md:text-xl text-[#0A0A0A] tracking-tight">
                Suka2Jepang
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi Utama">
              <Link
                href="/job-apply/jobs"
                className="text-sm font-medium text-[#4A5565] hover:text-[#0A0A0A] transition-colors"
              >
                Lowongan
              </Link>
              <button
                type="button"
                onClick={() => setIsSswModalOpen(true)}
                className="text-sm font-medium text-[#4A5565] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                Info Ujian SSW
              </button>
              <a
                href="#cara-daftar"
                className="text-sm font-medium text-[#4A5565] hover:text-[#0A0A0A] transition-colors"
              >
                Cara Daftar & FAQ
              </a>
            </nav>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Developer Hub shortcut badge */}
            <Link
              href="/screens"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
              title="Akses 12 Layar Developer Hub"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C12121]" />
              <span>12 Layar Dev Hub</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-[#1E2939] hover:bg-gray-100 rounded-[8px] border border-transparent sm:border-[#D1D5DC] transition-colors cursor-pointer"
            >
              Masuk
            </button>

            <Link
              href="/job-apply/personalize"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#C12121] hover:bg-[#A31D1D] rounded-[8px] transition-all shadow-sm active:scale-95"
            >
              Daftar gratis
            </Link>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
            <Link
              href="/job-apply/jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#0A0A0A]"
            >
              Lowongan
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSswModalOpen(true);
              }}
              className="block w-full text-left py-2 text-sm font-semibold text-[#0A0A0A]"
            >
              Info Ujian SSW
            </button>
            <a
              href="#cara-daftar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#0A0A0A]"
            >
              Cara Daftar & FAQ
            </a>
            <Link
              href="/screens"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold text-[#C12121]"
            >
              Buka 12 Layar Showroom →
            </Link>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (Hero Copy & Search Bar) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8E8] text-[#C12121] text-xs font-semibold">
                <span className="font-japanese text-[13px]">日本で働こう</span>
                <span className="text-[#DA7A7A]">·</span>
                <span>Kerja di Jepang</span>
              </div>

              {/* Main Heading (H1) */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0A0A0A] tracking-tight leading-[1.12]">
                Cari loker Jepang, apply, <br className="hidden sm:inline" />
                dan pantau sampai <br className="hidden sm:inline" />
                naitei.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#4A5565] leading-relaxed max-w-xl">
                Lowongan Tokutei Ginou (SSW) dan Gijinkoku dari puluhan mitra TSK di seluruh Jepang, diseleksi bersama LPK Timedoor.
              </p>

              {/* Interactive Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="mt-8 max-w-xl bg-white border border-[#D1D5DC] rounded-full p-1.5 pl-4 sm:pl-5 flex items-center justify-between shadow-xs hover:border-[#99A1AF] focus-within:border-[#C12121] focus-within:ring-2 focus-within:ring-[#C12121]/15 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Search className="w-5 h-5 text-[#99A1AF] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Kaigo, pengolahan makanan, Hokkaido..."
                    className="w-full bg-transparent text-sm sm:text-base text-[#0A0A0A] placeholder:text-[#99A1AF] focus:outline-none"
                    aria-label="Pencarian lowongan kerja Jepang"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-[#99A1AF] hover:text-[#0A0A0A] p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-[#1E2939] hover:bg-black text-white px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  Cari loker
                </button>
              </form>
            </div>

            {/* Right Graphic & Floating Card Showcase */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              {/* Massive Hinomaru Red Circular Backdrop */}
              <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full bg-[#C12121] absolute -top-8 -right-8 sm:-right-4 lg:-right-12 pointer-events-none opacity-95 transition-transform duration-700 hover:scale-105" />

              {/* Thin White Concentric Accent Ring */}
              <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-white/50 absolute bottom-0 right-8 sm:right-16 pointer-events-none" />

              {/* Foreground Floating Application Showcase Card */}
              <div className="relative z-10 w-full max-w-[360px] sm:max-w-[380px] bg-white rounded-2xl p-5 sm:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] border border-slate-100/90 transition-all duration-300 hover:-translate-y-1">
                {/* Top Row: Sector Code & SSW Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#C12121] tracking-wider uppercase">
                    PM-012 · MAKANAN
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                    SSW
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] mt-2 leading-snug">
                  Staf produksi makanan beku
                </h3>

                {/* Location & Quota */}
                <p className="text-xs text-[#6A7282] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#99A1AF]" />
                  <span>Izumi, Kagoshima · 14 orang</span>
                </p>

                {/* Status Tracker */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6A7282] font-medium">Status lamaranmu</span>
                    <span className="font-bold text-[#C12121] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C12121] animate-pulse" />
                      Interview TSK
                    </span>
                  </div>

                  {/* 4-bar Progress Indicator */}
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    <div className="h-2 rounded-full bg-[#C12121]" title="Tahap 1: Lolos Seleksi Profil" />
                    <div className="h-2 rounded-full bg-[#C12121]" title="Tahap 2: Lolos Interview Timedoor" />
                    <div className="h-2 rounded-full bg-[#FCA5A5]" title="Tahap 3: Sedang Berjalan (Interview TSK)" />
                    <div className="h-2 rounded-full bg-[#E5E7EB]" title="Tahap 4: Naitei & Dokumen" />
                  </div>
                </div>

                {/* Action Callout Box */}
                <Link
                  href="/job-apply/interview-tsk/pm-012"
                  className="mt-4 block bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#F3F4F6] rounded-xl p-3 text-xs font-semibold text-[#1E2939] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C12121]" />
                      <span>Interview TSK: 21 Okt, 10.00 WITA</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#C12121] transition-all" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METRICS BANNER */}
      <section className="bg-[#182230] text-white py-10 md:py-12 border-y border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                244
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium leading-snug">
                loker diterima di 2026
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                89
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium leading-snug">
                kandidat lulus mensetsu
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                40
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium leading-snug">
                TSK mitra di Jepang
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                15
              </div>
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium leading-snug">
                bidang pekerjaan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: PILIH BIDANGMU */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Pilih bidangmu
            </h2>
            <Link
              href="/job-apply/jobs"
              className="text-[#C12121] hover:text-[#A31D1D] font-semibold text-sm flex items-center gap-1 group transition-colors"
            >
              <span>Lihat semua loker</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Grid of 8 Sectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {sectors.map((sector) => {
              const isSelected = activeSector === sector.id;

              return (
                <Link
                  key={sector.id}
                  href={`/job-apply/jobs?sector=${sector.id}`}
                  onMouseEnter={() => setActiveSector(sector.id)}
                  className={`p-5 rounded-2xl transition-all duration-200 block text-left group cursor-pointer ${
                    isSelected
                      ? "bg-[#C12121] text-white shadow-lg shadow-red-500/15 -translate-y-0.5"
                      : "bg-white text-[#0A0A0A] border border-[#E5E7EB] hover:border-[#C12121] hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <span
                    className={`text-xs font-japanese font-medium block leading-tight ${
                      isSelected ? "text-white/80" : "text-[#6A7282]"
                    }`}
                  >
                    {sector.kanji}
                  </span>
                  <h3
                    className={`text-lg sm:text-xl font-bold mt-1.5 leading-snug ${
                      isSelected ? "text-white" : "text-[#0A0A0A] group-hover:text-[#C12121]"
                    }`}
                  >
                    {sector.name}
                  </h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isSelected ? "text-white/80" : "text-[#6A7282]"
                    }`}
                  >
                    {sector.countText}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SECTION: DARI DAFTAR SAMPAI BERANGKAT */}
      <section id="cara-daftar" className="py-16 sm:py-20 bg-[#F9FAFB] border-t border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                Dari daftar sampai berangkat
              </h2>
              <p className="text-sm text-[#4A5565] mt-1.5">
                Alur transparan dan pendampingan terstruktur bersama LPK Timedoor ke Jepang.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFaqModalOpen(true)}
              className="text-xs font-bold text-[#C12121] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Pertanyaan yang sering diajukan (FAQ)</span>
            </button>
          </div>

          {/* 5 Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <Link
                key={step.number}
                href={step.href}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-slate-400 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="w-7 h-7 rounded-full bg-[#C12121] text-white flex items-center justify-center font-bold text-xs shadow-xs mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] mb-2 leading-snug group-hover:text-[#C12121] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6A7282] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#99A1AF] group-hover:text-[#C12121]">
                  <span>Pelajari tahap ini</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER: BELUM PUNYA SERTIFIKAT SSW? */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#C12121] rounded-[24px] p-8 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Subtle Japanese Wave / Circle Background Accent */}
            <div className="w-[300px] h-[300px] rounded-full border-[30px] border-white/5 absolute -right-20 -bottom-20 pointer-events-none" />
            <div className="w-[180px] h-[180px] rounded-full border-[16px] border-white/5 absolute right-24 -top-12 pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Belum punya sertifikat SSW?
              </h2>
              <p className="text-white/90 text-sm sm:text-base mt-3 leading-relaxed">
                Belajar di LPK Timedoor untuk persiapan JFT, JLPT, dan ujian SSW. Siswa Timedoor juga bisa apply loker khusus siswa.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsSswModalOpen(true)}
                className="bg-white text-[#C12121] hover:bg-slate-100 font-bold px-6 py-3 rounded-[10px] text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Info ujian SSW
              </button>

              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="bg-transparent border border-white text-white hover:bg-white/10 font-bold px-6 py-3 rounded-[10px] text-sm transition-all active:scale-95 cursor-pointer"
              >
                Tanya admin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="mt-auto bg-white border-t border-[#E5E7EB] py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6A7282]">
          <div className="flex items-center gap-2">
            <span>© 2026 Suka2Jepang · LPK Timedoor, Bali</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveLegalModal("privacy")}
              className="hover:text-[#0A0A0A] hover:underline cursor-pointer"
            >
              Kebijakan privasi
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal("terms")}
              className="hover:text-[#0A0A0A] hover:underline cursor-pointer"
            >
              Syarat penggunaan
            </button>
            <button
              type="button"
              onClick={() => setIsFaqModalOpen(true)}
              className="hover:text-[#0A0A0A] hover:underline cursor-pointer"
            >
              Bantuan
            </button>
            <Link
              href="/screens"
              className="text-[#C12121] font-semibold hover:underline"
            >
              12 Layar Dev Hub
            </Link>
          </div>
        </div>
      </footer>

      {/* MODAL 1: PROMETRIC SSW EXAM INFORMATION MODAL */}
      <SswExamInfoModal
        isOpen={isSswModalOpen}
        onClose={() => setIsSswModalOpen(false)}
      />

      {/* MODAL 2: LOGIN MODAL */}
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

            <p className="text-xs text-[#6A7282]">
              Gunakan akun siswa LPK Timedoor atau nomor terdaftar untuk melanjutkan ke dashboard lowongan.
            </p>

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

      {/* MODAL 3: TANYA ADMIN / WHATSAPP CONSULTATION MODAL */}
      {isAdminModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsAdminModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#107C41] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Konsultasi Admin Timedoor</h3>
                  <p className="text-[11px] text-[#6A7282]">LPK Timedoor Bali · Career Support Office</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#4A5565] leading-relaxed">
              Pilih topik pertanyaanmu untuk langsung terhubung dengan admin dan konsultan penyaluran kerja ke Jepang melalui WhatsApp:
            </p>

            {/* Topic options */}
            <div className="space-y-2">
              {[
                {
                  id: "ssw",
                  label: "Pelatihan Bahasa & Sertifikasi SSW",
                  desc: "Persiapan JFT-Basic / JLPT N4 dan ujian keahlian Tokutei Ginou.",
                },
                {
                  id: "loker",
                  label: "Syarat & Pendaftaran Lowongan Kerja",
                  desc: "Konsultasi kecocokan loker Kaigo, Pengolahan Makanan, dll.",
                },
                {
                  id: "gijinkoku",
                  label: "Visa Gijinkoku untuk Lulusan D3/S1",
                  desc: "Jalur kerja IT, perhotelan, administrasi, dan teknik.",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAdminTopic(item.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    adminTopic === item.id
                      ? "border-[#107C41] bg-[#ECFDF5]/60 text-[#0A0A0A]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A0A0A]">{item.label}</span>
                    {adminTopic === item.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#107C41]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#6A7282] mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getAdminWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 bg-[#107C41] hover:bg-[#0E6837] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buka WhatsApp (+62 812 3456 7890)</span>
              </a>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-700 py-1"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: FAQ MODAL */}
      {isFaqModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsFaqModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C12121]" />
                <h3 className="text-base font-bold text-[#0A0A0A]">FAQ & Cara Pendaftaran</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFaqModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#4A5565] leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-[#0A0A0A] mb-1">
                  1. Apa itu visa Tokutei Ginou (SSW)?
                </h4>
                <p>
                  Tokutei Ginou (Specified Skilled Worker) adalah status visa kerja resmi pemerintah Jepang untuk tenaga kerja terampil dengan gaji dan hak setara pekerja warga Jepang.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-[#0A0A0A] mb-1">
                  2. Apa saja syarat minimal mendaftar loker?
                </h4>
                <p>
                  Usia minimal 18 tahun, lulusan SMA/SMK, memiliki sertifikat bahasa Jepang (JFT-Basic A2 atau JLPT N4), dan sertifikat kelulusan tes keahlian bidang SSW (Prometric).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-[#0A0A0A] mb-1">
                  3. Apakah pelamar dikenakan biaya pendaftaran di awal?
                </h4>
                <p>
                  Pendaftaran akun, pengisian CV digital, dan pelamaran lowongan di portal Suka2Jepang 100% gratis.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-[#0A0A0A] mb-1">
                  4. Berapa lama proses dari lamaran sampai keberangkatan?
                </h4>
                <p>
                  Rata-rata 3 hingga 6 bulan setelah pengumuman kelulusan (Naitei), meliputi pengurusan Certificate of Eligibility (COE) di imigrasi Jepang, visa kerja, dan medical check-up.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsFaqModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-[#1E2939] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: LEGAL (PRIVACY & TERMS) MODAL */}
      {activeLegalModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveLegalModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C12121]" />
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  {activeLegalModal === "privacy" ? "Kebijakan Privasi" : "Syarat & Ketentuan"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#4A5565] leading-relaxed space-y-2.5">
              {activeLegalModal === "privacy" ? (
                <>
                  <p>
                    Suka2Jepang dan LPK Timedoor berkomitmen melindungi data pribadi pelamar kerja sesuai standar perlindungan data Indonesia dan Jepang.
                  </p>
                  <p>
                    Data biodata, riwayat pendidikan, sertifikat bahasa, dan dokumen identitas hanya digunakan untuk proses seleksi penempatan kerja Tokutei Ginou dan komunikasi jadwal interview TSK.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Dengan mendaftar di Suka2Jepang, pengguna menyatakan bahwa seluruh data riwayat hidup dan sertifikat keahlian yang diunggah adalah asli dan sah.
                  </p>
                  <p>
                    Proses penempatan tenaga kerja dilaksanakan sesuai regulasi ketenagakerjaan RI (BP2MI/Kemnaker) dan imigrasi Jepang (ISA).
                  </p>
                </>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-[#1E2939] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
