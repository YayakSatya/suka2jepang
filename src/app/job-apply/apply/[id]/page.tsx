"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  Upload,
  Video,
  Check,
  FileText,
  Trash2,
  RefreshCw,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { PushableButton } from "@/components/common";
import { StepperHeader } from "@/components/job-apply/stepper-header";
import { JobApplicationFormData } from "@/types/job-apply";

export default function JobApplyStepperPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-gray-500">
          Memuat formulir pendaftaran loker...
        </div>
      }
    >
      <JobApplyStepperContent />
    </React.Suspense>
  );
}

function JobApplyStepperContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = (params?.id as string) || "pm-012";

  // Find job info (default to PM-012 from screenshot)
  const job = MOCK_JOBS.find((j) => j.id === id) || MOCK_JOBS[0];

  // Hidden input refs for simulated file uploads
  const cvInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Form State prefilled from Master Profile (Smart Defaults)
  const [formData, setFormData] = useState<JobApplicationFormData>(() => {
    const defaultData: JobApplicationFormData = {
      jobId: job.id,
      fullName: "Budi Santoso",
      katakanaName: "ブディ サントソ",
      birthDate: "2003-05-12",
      whatsappNumber: "+62 812 3456 7890",
      gender: "Laki-laki",
      domicile: "Di Indonesia",
      sswCertificate: "Pengolahan Makanan（飲食料品製造）",
      japaneseLevel: "JFT Basic A2",
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
      introVideoFileName: "",
      introVideoFileSize: "",
      agreedToTerms: true,
      lastSavedAt: "15 Okt, 10.42",
    };

    if (typeof window !== "undefined") {
      try {
        const savedDraft = localStorage.getItem(`suka2jepang_apply_draft_${job.id}`);
        if (savedDraft) {
          return { ...defaultData, ...JSON.parse(savedDraft) };
        }
      } catch {
        // Fallback to default
      }
    }

    return defaultData;
  });

  // Wizard Step State (1: Data Diri, 2: Kualifikasi, 3: Dokumen)
  const initialStepParam = Number(searchParams?.get("step")) || 1;
  const [currentStep, setCurrentStep] = useState<number>(
    initialStepParam >= 1 && initialStepParam <= 3 ? initialStepParam : 1
  );
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle Input Changes & Sync to Storage
  const handleInputChange = (field: keyof JobApplicationFormData, value: unknown) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem(`suka2jepang_apply_draft_${job.id}`, JSON.stringify(updated));
      }
      return updated;
    });
    setValidationError(null);
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Manual Save Draft Action
  const handleSaveDraft = () => {
    setIsSaving(true);
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}.${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const dateString = `${now.getDate()} Okt, ${timeString}`;

    const updatedData = {
      ...formData,
      lastSavedAt: dateString,
    };

    setFormData(updatedData);
    if (typeof window !== "undefined") {
      localStorage.setItem(`suka2jepang_apply_draft_${job.id}`, JSON.stringify(updatedData));
    }

    setTimeout(() => {
      setIsSaving(false);
      showToast("Draf berhasil disimpan! Data tersimpan dengan aman.");
    }, 300);
  };

  // Step 1 Validation & Next
  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setValidationError("Nama lengkap wajib diisi sesuai paspor.");
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setValidationError("Nomor WhatsApp wajib diisi untuk jadwal wawancara.");
      return;
    }

    setValidationError(null);
    setCompletedSteps((prev) => Array.from(new Set([...prev, 1])));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 Validation & Next
  const handleNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setCompletedSteps((prev) => Array.from(new Set([...prev, 1, 2])));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3 Validation & Route to Confirm (Screen 08)
  const handleNextFromStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cvFileName) {
      setValidationError("Dokumen CV (履歴書) wajib diunggah.");
      return;
    }
    if (!formData.agreedToTerms) {
      setValidationError("Harap setujui pernyataan pembagian data sebelum melanjutkan.");
      return;
    }

    setValidationError(null);
    setCompletedSteps((prev) => Array.from(new Set([...prev, 1, 2, 3])));

    // Save final state & navigate to Step 4: Konfirmasi (Screen 08)
    if (typeof window !== "undefined") {
      localStorage.setItem(`suka2jepang_apply_draft_${job.id}`, JSON.stringify(formData));
    }
    router.push(`/job-apply/apply/${job.id}/confirm`);
  };

  // Step Navigation Helper
  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 3) {
      setValidationError(null);
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // File Handlers
  const handleFileAttach = (field: "cv" | "cert" | "video", file: File | null) => {
    if (!file) return;
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";

    if (field === "cv") {
      handleInputChange("cvFileName", file.name);
      handleInputChange("cvFileSize", sizeInMb);
      showToast(`CV "${file.name}" berhasil diunggah.`);
    } else if (field === "cert") {
      handleInputChange("sswCertFileName", file.name);
      handleInputChange("sswCertFileSize", sizeInMb);
      showToast(`Sertifikat "${file.name}" berhasil diunggah.`);
    } else if (field === "video") {
      handleInputChange("introVideoFileName", file.name);
      handleInputChange("introVideoFileSize", sizeInMb);
      showToast(`Video perkenalan "${file.name}" berhasil diunggah.`);
    }
  };

  const removeFile = (field: "cv" | "cert" | "video") => {
    if (field === "cv") {
      handleInputChange("cvFileName", "");
      handleInputChange("cvFileSize", "");
    } else if (field === "cert") {
      handleInputChange("sswCertFileName", "");
      handleInputChange("sswCertFileSize", "");
    } else if (field === "video") {
      handleInputChange("introVideoFileName", "");
      handleInputChange("introVideoFileSize", "");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#18191B] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* In-Page Subheader / Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <Link
            href={`/job-apply/jobs/${job.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-[#C12121] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5] text-[#0A0A0A] group-hover:text-[#C12121] group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke loker</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Draf tersimpan otomatis · {formData.lastSavedAt}</span>
          </div>
        </div>

        {/* Page Title & Contextual Step Badge */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Formulir Pendaftaran · {job.title}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEECEC] text-[#C12121]">
              <Sparkles className="w-3 h-3" />
              Langkah {currentStep} dari 4
            </span>
          </div>
          <p className="text-sm text-[#4A5565] max-w-3xl leading-relaxed">
            {currentStep === 1 &&
              "Periksa dan lengkapi data identitas diri Anda sesuai dokumen paspor resmi."}
            {currentStep === 2 &&
              "Pastikan kualifikasi bahasa, sertifikat SSW, dan kriteria industri sesuai dengan profil Anda."}
            {currentStep === 3 &&
              "Unggah CV Rirekisho dan sertifikat pendukung sebelum melangkah ke konfirmasi akhir."}
          </p>
        </div>

        {/* 4-Step Interactive Stepper Header */}
        <div className="pt-1 pb-2">
          <StepperHeader
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#C12121]" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* Main Grid: Multi-Step Form (8 cols) vs Contextual Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: ACTIVE STEP FORM (ONLY 1 STEP AT A TIME)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-8">
            {/* --------------------------------------------------------- */}
            {/* STEP 1: DATA DIRI                                         */}
            {/* --------------------------------------------------------- */}
            {currentStep === 1 && (
              <form onSubmit={handleNextFromStep1} className="space-y-6">
                <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#0A0A0A] tracking-tight">
                        1. Data diri
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Data ini disinkronkan otomatis dari Master Profil Anda
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      Step 1/4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama Lengkap */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Nama lengkap (sesuai paspor) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full h-11 px-3.5 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all bg-white"
                      />
                    </div>

                    {/* Nama Katakana */}
                    <div>
                      <label
                        htmlFor="katakanaName"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Nama katakana（フリガナ）
                      </label>
                      <input
                        id="katakanaName"
                        type="text"
                        value={formData.katakanaName}
                        onChange={(e) => handleInputChange("katakanaName", e.target.value)}
                        placeholder="例 : ブディ サントソ"
                        className="w-full h-11 px-3.5 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tanggal Lahir */}
                    <div>
                      <label
                        htmlFor="birthDate"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Tanggal lahir
                      </label>
                      <div className="relative">
                        <input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          className="w-full h-11 px-3.5 pr-10 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all bg-white"
                        />
                        <Calendar className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      </div>
                    </div>

                    {/* No. WhatsApp */}
                    <div>
                      <label
                        htmlFor="whatsappNumber"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        No. WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="whatsappNumber"
                        type="text"
                        required
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                        placeholder="+62 8xx xxxx xxxx"
                        className="w-full h-11 px-3.5 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="space-y-1.5">
                    <span className="block text-xs font-semibold text-[#374151]">
                      Jenis kelamin
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange("gender", "Laki-laki")}
                        className={`h-11 px-4 rounded-[8px] border flex items-center gap-3 transition-all cursor-pointer text-sm font-medium ${
                          formData.gender === "Laki-laki"
                            ? "border-[#C12121] bg-[#FFF8F8] text-[#0A0A0A] shadow-xs"
                            : "border-[#D1D5DC] bg-white text-[#4A5565] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.gender === "Laki-laki"
                              ? "border-[#C12121] bg-[#C12121]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.gender === "Laki-laki" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span>Laki-laki</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange("gender", "Perempuan")}
                        className={`h-11 px-4 rounded-[8px] border flex items-center gap-3 transition-all cursor-pointer text-sm font-medium ${
                          formData.gender === "Perempuan"
                            ? "border-[#C12121] bg-[#FFF8F8] text-[#0A0A0A] shadow-xs"
                            : "border-[#D1D5DC] bg-white text-[#4A5565] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.gender === "Perempuan"
                              ? "border-[#C12121] bg-[#C12121]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.gender === "Perempuan" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span>Perempuan</span>
                      </button>
                    </div>
                  </div>

                  {/* Domisili Saat Ini */}
                  <div className="space-y-1.5">
                    <span className="block text-xs font-semibold text-[#374151]">
                      Domisili saat ini
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange("domicile", "Di Indonesia")}
                        className={`h-11 px-4 rounded-[8px] border flex items-center gap-3 transition-all cursor-pointer text-sm font-medium ${
                          formData.domicile === "Di Indonesia"
                            ? "border-[#C12121] bg-[#FFF8F8] text-[#0A0A0A] shadow-xs"
                            : "border-[#D1D5DC] bg-white text-[#4A5565] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.domicile === "Di Indonesia"
                              ? "border-[#C12121] bg-[#C12121]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.domicile === "Di Indonesia" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span>Di Indonesia</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange("domicile", "Di Jepang")}
                        className={`h-11 px-4 rounded-[8px] border flex items-center gap-3 transition-all cursor-pointer text-sm font-medium ${
                          formData.domicile === "Di Jepang"
                            ? "border-[#C12121] bg-[#FFF8F8] text-[#0A0A0A] shadow-xs"
                            : "border-[#D1D5DC] bg-white text-[#4A5565] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.domicile === "Di Jepang"
                              ? "border-[#C12121] bg-[#C12121]"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.domicile === "Di Jepang" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span>Di Jepang</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Step 1 Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
                  <PushableButton
                    type="button"
                    variant="secondary"
                    disabled={isSaving}
                    onClick={handleSaveDraft}
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#C12121]" />
                        <span>Menyimpan...</span>
                      </span>
                    ) : (
                      <span>Simpan draf</span>
                    )}
                  </PushableButton>

                  <PushableButton
                    type="submit"
                    size="md"
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    <span className="flex items-center gap-2">
                      <span>Lanjut ke Kualifikasi</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </PushableButton>
                </div>
              </form>
            )}

            {/* --------------------------------------------------------- */}
            {/* STEP 2: KUALIFIKASI                                       */}
            {/* --------------------------------------------------------- */}
            {currentStep === 2 && (
              <form onSubmit={handleNextFromStep2} className="space-y-6">
                <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#0A0A0A] tracking-tight">
                        2. Kualifikasi
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Kualifikasi bahasa dan sertifikasi untuk lowongan {job.jobCode}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      Step 2/4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sertifikat SSW */}
                    <div>
                      <label
                        htmlFor="sswCertificate"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Sertifikat SSW yang dimiliki
                      </label>
                      <div className="relative">
                        <select
                          id="sswCertificate"
                          value={formData.sswCertificate}
                          onChange={(e) => handleInputChange("sswCertificate", e.target.value)}
                          className="w-full h-11 px-3.5 pr-10 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] bg-white appearance-none focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all cursor-pointer"
                        >
                          <option value="Pengolahan Makanan（飲食料品製造）">
                            Pengolahan Makanan（飲食料品製造）
                          </option>
                          <option value="Kaigo / Perawat Lansia（介護）">
                            Kaigo / Perawat Lansia（介護）
                          </option>
                          <option value="Restoran / Food Service（外食業）">
                            Restoran / Food Service（外食業）
                          </option>
                          <option value="Pertanian（農業）">Pertanian（農業）</option>
                          <option value="Konstruksi（建設）">Konstruksi（建設）</option>
                          <option value="Manufaktur（製造業）">Manufaktur（製造業）</option>
                          <option value="Perawatan Mobil（自動車整備）">
                            Perawatan Mobil（自動車整備）
                          </option>
                          <option value="Belum memiliki sertifikat SSW">
                            Belum memiliki sertifikat SSW
                          </option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      </div>
                    </div>

                    {/* Bahasa Jepang */}
                    <div>
                      <label
                        htmlFor="japaneseLevel"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Bahasa Jepang
                      </label>
                      <div className="relative">
                        <select
                          id="japaneseLevel"
                          value={formData.japaneseLevel}
                          onChange={(e) => handleInputChange("japaneseLevel", e.target.value)}
                          className="w-full h-11 px-3.5 pr-10 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] bg-white appearance-none focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all cursor-pointer"
                        >
                          <option value="JFT Basic A2">JFT Basic A2</option>
                          <option value="JLPT N4">JLPT N4</option>
                          <option value="JLPT N3">JLPT N3</option>
                          <option value="JLPT N2">JLPT N2</option>
                          <option value="JLPT N5">JLPT N5</option>
                          <option value="Sedang belajar mandiri">Sedang belajar mandiri</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pendidikan Terakhir */}
                    <div>
                      <label
                        htmlFor="lastEducation"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Pendidikan terakhir
                      </label>
                      <div className="relative">
                        <select
                          id="lastEducation"
                          value={formData.lastEducation}
                          onChange={(e) => handleInputChange("lastEducation", e.target.value)}
                          className="w-full h-11 px-3.5 pr-10 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] bg-white appearance-none focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all cursor-pointer"
                        >
                          <option value="SMA/SMK">SMA/SMK</option>
                          <option value="Diploma (D3)">Diploma (D3)</option>
                          <option value="Sarjana (S1)">Sarjana (S1)</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      </div>
                    </div>

                    {/* Pengalaman Kerja di Jepang */}
                    <div>
                      <label
                        htmlFor="japanExperience"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Pengalaman kerja di Jepang
                      </label>
                      <div className="relative">
                        <select
                          id="japanExperience"
                          value={formData.japanExperience}
                          onChange={(e) => handleInputChange("japanExperience", e.target.value)}
                          className="w-full h-11 px-3.5 pr-10 rounded-[8px] border border-[#D1D5DC] text-sm text-[#0A0A0A] bg-white appearance-none focus:outline-none focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] transition-all cursor-pointer"
                        >
                          <option value="Belum pernah">Belum pernah</option>
                          <option value="Pernah Magang TITP (1–3 tahun)">
                            Pernah Magang TITP (1–3 tahun)
                          </option>
                          <option value="Pernah Magang TITP (3–5 tahun)">
                            Pernah Magang TITP (3–5 tahun)
                          </option>
                          <option value="Pernah Tokutei Ginou">Pernah Tokutei Ginou</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  {/* Info Yang Biasa Ditanyakan Perusahaan */}
                  <div className="space-y-2 pt-1">
                    <span className="block text-xs font-semibold text-[#374151]">
                      Info yang biasa ditanyakan perusahaan
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Memiliki tato */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("hasTattoo", !formData.hasTattoo)}
                        className={`h-12 px-4 rounded-[10px] border flex items-center gap-3 text-sm font-medium transition-all cursor-pointer select-none ${
                          formData.hasTattoo
                            ? "border-[#C12121] bg-white text-[#0A0A0A]"
                            : "border-[#D1D5DC] bg-white text-[#374151] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                            formData.hasTattoo
                              ? "bg-[#C12121] border-[#C12121] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.hasTattoo && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>Memiliki tato</span>
                      </button>

                      {/* Merokok */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("smoker", !formData.smoker)}
                        className={`h-12 px-4 rounded-[10px] border flex items-center gap-3 text-sm font-medium transition-all cursor-pointer select-none ${
                          formData.smoker
                            ? "border-[#C12121] bg-white text-[#0A0A0A]"
                            : "border-[#D1D5DC] bg-white text-[#374151] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                            formData.smoker
                              ? "bg-[#C12121] border-[#C12121] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.smoker && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>Merokok</span>
                      </button>

                      {/* Bisa memegang daging babi */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("canHandlePork", !formData.canHandlePork)}
                        className={`h-12 px-4 rounded-[10px] border flex items-center gap-3 text-sm font-medium transition-all cursor-pointer select-none ${
                          formData.canHandlePork
                            ? "border-[#C12121] bg-white text-[#0A0A0A]"
                            : "border-[#D1D5DC] bg-white text-[#374151] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                            formData.canHandlePork
                              ? "bg-[#C12121] border-[#C12121] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.canHandlePork && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>Bisa memegang daging babi</span>
                      </button>

                      {/* Bisa kerja shift malam */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("canNightShift", !formData.canNightShift)}
                        className={`h-12 px-4 rounded-[10px] border flex items-center gap-3 text-sm font-medium transition-all cursor-pointer select-none ${
                          formData.canNightShift
                            ? "border-[#C12121] bg-white text-[#0A0A0A]"
                            : "border-[#D1D5DC] bg-white text-[#374151] hover:border-slate-400"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                            formData.canNightShift
                              ? "bg-[#C12121] border-[#C12121] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {formData.canNightShift && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>Bisa kerja shift malam</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Step 2 Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
                  <PushableButton
                    type="button"
                    variant="secondary"
                    onClick={() => goToStep(1)}
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali ke Data Diri</span>
                    </span>
                  </PushableButton>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <PushableButton
                      type="button"
                      variant="secondary"
                      disabled={isSaving}
                      onClick={handleSaveDraft}
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      {isSaving ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-[#C12121]" />
                          <span>Menyimpan...</span>
                        </span>
                      ) : (
                        <span>Simpan draf</span>
                      )}
                    </PushableButton>

                    <PushableButton
                      type="submit"
                      size="md"
                      className="w-full sm:w-auto min-w-[190px]"
                    >
                      <span className="flex items-center gap-2">
                        <span>Lanjut ke Dokumen</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </PushableButton>
                  </div>
                </div>
              </form>
            )}

            {/* --------------------------------------------------------- */}
            {/* STEP 3: DOKUMEN & PERSETUJUAN                             */}
            {/* --------------------------------------------------------- */}
            {currentStep === 3 && (
              <form onSubmit={handleNextFromStep3} className="space-y-6">
                <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#0A0A0A] tracking-tight">
                        3. Dokumen
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Format PDF atau gambar jernih maksimal 5 MB
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      Step 3/4
                    </span>
                  </div>

                  {/* 3 Upload Dropzone Slots */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* SLOT 1: CV (履歴書) */}
                    <div className="relative group">
                      <input
                        ref={cvInputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileAttach("cv", e.target.files?.[0] || null)}
                      />

                      {formData.cvFileName ? (
                        <div className="h-full min-h-[148px] p-4 rounded-[14px] border border-emerald-300 bg-emerald-50/40 flex flex-col justify-between transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Terlampir
                            </span>
                          </div>

                          <div className="my-2">
                            <p className="text-xs font-bold text-[#0A0A0A] line-clamp-1">
                              {formData.cvFileName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {formData.cvFileSize || "1.8 MB"} · CV (履歴書)
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-emerald-200">
                            <button
                              type="button"
                              onClick={() => cvInputRef.current?.click()}
                              className="text-[11px] font-semibold text-slate-600 hover:text-[#C12121] flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" /> Ganti
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => removeFile("cv")}
                              className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" /> Hapus
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => cvInputRef.current?.click()}
                          className="h-full min-h-[148px] p-5 rounded-[14px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] bg-white flex flex-col items-center justify-center text-center cursor-pointer transition-colors group-hover:bg-[#FFFBFB]"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                            <Upload className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <p className="text-xs font-bold text-[#0A0A0A]">CV (履歴書) *</p>
                          <p className="text-[11px] text-[#71717A] mt-0.5">PDF, maks. 5 MB</p>
                        </div>
                      )}
                    </div>

                    {/* SLOT 2: Sertifikat SSW / JFT */}
                    <div className="relative group">
                      <input
                        ref={certInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => handleFileAttach("cert", e.target.files?.[0] || null)}
                      />

                      {formData.sswCertFileName ? (
                        <div className="h-full min-h-[148px] p-4 rounded-[14px] border border-emerald-300 bg-emerald-50/40 flex flex-col justify-between transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Terlampir
                            </span>
                          </div>

                          <div className="my-2">
                            <p className="text-xs font-bold text-[#0A0A0A] line-clamp-1">
                              {formData.sswCertFileName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {formData.sswCertFileSize || "2.4 MB"} · SSW / JFT
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-emerald-200">
                            <button
                              type="button"
                              onClick={() => certInputRef.current?.click()}
                              className="text-[11px] font-semibold text-slate-600 hover:text-[#C12121] flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" /> Ganti
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => removeFile("cert")}
                              className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" /> Hapus
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => certInputRef.current?.click()}
                          className="h-full min-h-[148px] p-5 rounded-[14px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] bg-white flex flex-col items-center justify-center text-center cursor-pointer transition-colors group-hover:bg-[#FFFBFB]"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                            <Upload className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <p className="text-xs font-bold text-[#0A0A0A]">Sertifikat SSW / JFT</p>
                          <p className="text-[11px] text-[#71717A] mt-0.5">PDF atau foto</p>
                        </div>
                      )}
                    </div>

                    {/* SLOT 3: Video Perkenalan */}
                    <div className="relative group">
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleFileAttach("video", e.target.files?.[0] || null)}
                      />

                      {formData.introVideoFileName ? (
                        <div className="h-full min-h-[148px] p-4 rounded-[14px] border border-blue-300 bg-blue-50/40 flex flex-col justify-between transition-all">
                          <div className="flex items-start justify-between gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <Video className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              Video Siap
                            </span>
                          </div>

                          <div className="my-2">
                            <p className="text-xs font-bold text-[#0A0A0A] line-clamp-1">
                              {formData.introVideoFileName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {formData.introVideoFileSize || "18.2 MB"} · Jikoshoukai
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-blue-200">
                            <button
                              type="button"
                              onClick={() => videoInputRef.current?.click()}
                              className="text-[11px] font-semibold text-slate-600 hover:text-[#C12121] flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" /> Ganti
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => removeFile("video")}
                              className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" /> Hapus
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => videoInputRef.current?.click()}
                          className="h-full min-h-[148px] p-5 rounded-[14px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] bg-white flex flex-col items-center justify-center text-center cursor-pointer transition-colors group-hover:bg-[#FFFBFB]"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                            <Video className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <p className="text-xs font-bold text-[#0A0A0A]">Video perkenalan</p>
                          <p className="text-[11px] text-[#71717A] mt-0.5">
                            Opsional · 1 menit, bahasa Jepang
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkbox Consent Statement */}
                  <div
                    onClick={() => handleInputChange("agreedToTerms", !formData.agreedToTerms)}
                    className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer select-none mt-4"
                  >
                    <div
                      className={`w-5 h-5 rounded-[4px] border mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                        formData.agreedToTerms
                          ? "bg-[#C12121] border-[#C12121] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {formData.agreedToTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A5565] leading-relaxed">
                      Saya menyatakan data di atas benar dan setuju data saya dibagikan ke
                      TSK/perusahaan untuk proses seleksi loker ini.
                    </p>
                  </div>
                </section>

                {/* Step 3 Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
                  <PushableButton
                    type="button"
                    variant="secondary"
                    onClick={() => goToStep(2)}
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali ke Kualifikasi</span>
                    </span>
                  </PushableButton>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <PushableButton
                      type="button"
                      variant="secondary"
                      disabled={isSaving}
                      onClick={handleSaveDraft}
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      {isSaving ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-[#C12121]" />
                          <span>Menyimpan...</span>
                        </span>
                      ) : (
                        <span>Simpan draf</span>
                      )}
                    </PushableButton>

                    <PushableButton
                      type="submit"
                      size="md"
                      className="w-full sm:w-auto min-w-[200px]"
                    >
                      <span className="flex items-center gap-2">
                        <span>Lanjut ke Konfirmasi</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </PushableButton>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: CONTEXTUAL SIDEBAR (4 cols)                 */}
          {/* ========================================================= */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* CARD 1: Job Summary Card */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-bold text-[#C12121] tracking-wider uppercase block">
                  {job.sectorLabel.toUpperCase()} {job.sectorKanji ? `(${job.sectorKanji})` : ""}
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

            {/* CARD 2: Contextual Tip per Step */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {currentStep === 1 && "Tips Pengisian Data Diri"}
                  {currentStep === 2 && "Tips Kualifikasi & Screening"}
                  {currentStep === 3 && "Tips Berkas Dokumen"}
                </span>
              </div>
              <p className="text-blue-800 leading-relaxed">
                {currentStep === 1 &&
                  "Pastikan ejaan nama lengkap persis seperti pada paspor agar tidak terkendala saat pengajuan visa Tokutei Ginou."}
                {currentStep === 2 &&
                  "Jawab kriteria fisik seperti shift malam & tato secara jujur. Perusahaan Jepang sangat menghargai integritas kandidat."}
                {currentStep === 3 &&
                  "CV berformat JIS Rirekisho standar Jepang meningkatkan peluang lolos kurasi Timedoor hingga 90%."}
              </p>
            </div>

            {/* CARD 3: Proses Setelah Apply (Dark Card) */}
            <div className="bg-[#18191B] text-white rounded-2xl p-6 shadow-md space-y-3.5">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Proses setelah apply
              </h3>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="leading-snug">Interview awal dengan Timedoor</span>
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
                  <span className="leading-snug">Mensetsu dengan perusahaan</span>
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

            {/* Quick Helper Note */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span>Terakhir disimpan: {formData.lastSavedAt}</span>
              </div>
              <p>
                Data draf Anda disimpan otomatis di peramban ini sehingga tidak akan hilang
                jika halaman tertutup atau saat berpindah langkah.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
