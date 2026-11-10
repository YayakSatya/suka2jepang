"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Check,
  ChevronDown,
  Calendar,
  User,
  Download,
  GraduationCap,
  Heart,
  Video,
  Eye,
  Copy,
  Plus,
  X,
  ChevronRight,
  Pencil,
  Trash2,
  AlertTriangle,
  FileText,
  Printer,
  Play,
  RotateCcw,
  CheckCircle2,
  Square,
  Briefcase,
} from "lucide-react";
import { PushableButton } from "@/components/common/pushable-button";

// Interfaces for Dynamic Profile Sections
export interface CertificateItem {
  id: string;
  name: string;
  category: "bahasa" | "ssw" | "lainnya";
  score: string;
  examDate: string;
  status: "verified" | "review" | "pending";
}

export interface EducationItem {
  id: string;
  level: string;
  institution: string;
  major: string;
  period: string;
  notes: string;
}

export interface WorkItem {
  id: string;
  company: string;
  role: string;
  industry: string;
  period: string;
  description: string;
}

export interface FamilyItem {
  id: string;
  name: string;
  relationship: string;
  age: string;
  occupation: string;
  isEmergencyContact: boolean;
  phone: string;
  consentStatus: string;
}

export default function ProfileAndCvPage() {
  const [activeTab, setActiveTab] = useState<string>("data_pribadi");
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScriptGuide, setShowScriptGuide] = useState(false);
  const [showFullCvModal, setShowFullCvModal] = useState(false);
  const [showRecordVideoModal, setShowRecordVideoModal] = useState(false);

  // Photo Upload State & Ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      showToast("Pas foto 3×4 berhasil diperbarui.");
    }
  };

  // Delete confirmation modal state
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{
    title: string;
    name: string;
    onConfirm: () => void;
  } | null>(null);

  // 1. Data Pribadi State — Budi Santoso (Default Realistis)
  const [fullName, setFullName] = useState("Budi Santoso");
  const [furigana, setFurigana] = useState("ブディ・サントソ");
  const [birthDate, setBirthDate] = useState("12/05/2003");
  const [maritalStatus, setMaritalStatus] = useState("Belum menikah");
  const [religion, setReligion] = useState("Islam");
  const [ktpCity, setKtpCity] = useState("Banyuwangi, Jawa Timur");

  // 2. Health states
  const [height, setHeight] = useState("165");
  const [weight, setWeight] = useState("58");
  const [bloodType, setBloodType] = useState("A");
  const [dominantHand, setDominantHand] = useState("Kanan");

  const [healthChecks, setHealthChecks] = useState({
    colorBlind: false,
    tattoo: false,
    smoking: false,
    handlePork: true,
    alcohol: false,
    hijab: false,
  });

  const [medicalHistory, setMedicalHistory] = useState("Tidak ada");

  // 3. Dynamic Bahasa & Sertifikat State (CRUD)
  const [certificates, setCertificates] = useState<CertificateItem[]>([
    {
      id: "cert-1",
      name: "JFT Basic A2",
      category: "bahasa",
      score: "Skor 214 / Lulus (Level A2)",
      examDate: "12 Agu 2026",
      status: "verified",
    },
    {
      id: "cert-2",
      name: "SSW Pengolahan Makanan（飲食料品製造）",
      category: "ssw",
      score: "Lulus Ujian Teori & Praktik",
      examDate: "28 Jun 2026",
      status: "verified",
    },
    {
      id: "cert-3",
      name: "JLPT N4",
      category: "bahasa",
      score: "Skor 108 / Lulus",
      examDate: "07 Jul 2026",
      status: "review",
    },
  ]);

  // 4. Dynamic Riwayat Pendidikan State (CRUD)
  const [educationEntries, setEducationEntries] = useState<EducationItem[]>([
    {
      id: "edu-1",
      level: "SMK / SMA Sederajat",
      institution: "SMK Negeri 1 Denpasar",
      major: "Teknik Mesin",
      period: "2018 – 2021",
      notes: "Lulus · Nilai Rata-rata 86,5",
    },
  ]);

  // 5. Dynamic Pengalaman Kerja State (CRUD)
  const [workEntries, setWorkEntries] = useState<WorkItem[]>([
    {
      id: "work-1",
      company: "PT Industri Pangan Nusantara",
      role: "Operator Pengolahan Makanan",
      industry: "Pengolahan Makanan & Minuman",
      period: "2021 – 2023",
      description: "Pengalaman relevan SSW Pengolahan Makanan (2 tahun), operasional mesin packaging & sanitasi HACCP.",
    },
  ]);

  // 6. Dynamic Keluarga State (CRUD)
  const [familyMembers, setFamilyMembers] = useState<FamilyItem[]>([
    {
      id: "fam-1",
      name: "Bambang Santoso",
      relationship: "Ayah Kandung",
      age: "52 thn",
      occupation: "Wiraswasta / Petani",
      isEmergencyContact: true,
      phone: "+62 812-3456-7890",
      consentStatus: "Sudah menyetujui izin kerja ke Jepang",
    },
    {
      id: "fam-2",
      name: "Sri Wahyuni",
      relationship: "Ibu Kandung",
      age: "48 thn",
      occupation: "Ibu Rumah Tangga",
      isEmergencyContact: false,
      phone: "+62 813-9876-5432",
      consentStatus: "Sudah menyetujui izin kerja ke Jepang",
    },
  ]);

  // Modal States for Add & Edit
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
  const [certForm, setCertForm] = useState({
    name: "",
    category: "bahasa" as "bahasa" | "ssw" | "lainnya",
    score: "",
    examDate: "",
    status: "verified" as "verified" | "review" | "pending",
  });

  // Modal 2A: Riwayat Pendidikan
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [eduForm, setEduForm] = useState({
    level: "SMK / SMA Sederajat",
    institution: "",
    major: "",
    period: "",
    notes: "",
  });

  // Modal 2B: Pengalaman Kerja
  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);
  const [workForm, setWorkForm] = useState({
    company: "",
    role: "",
    industry: "Pengolahan Makanan & Minuman",
    period: "",
    description: "",
  });

  const [familyModalOpen, setFamilyModalOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState<FamilyItem | null>(null);
  const [familyForm, setFamilyForm] = useState({
    name: "",
    relationship: "Ayah Kandung",
    age: "",
    occupation: "",
    isEmergencyContact: false,
    phone: "",
    consentStatus: "Sudah menyetujui izin kerja ke Jepang",
  });

  // Video Recording Studio State
  const [hasRecordedVideo, setHasRecordedVideo] = useState(false);
  const [videoRecordingState, setVideoRecordingState] = useState<"idle" | "recording" | "recorded">("idle");
  const [videoTimer, setVideoTimer] = useState(0);

  // Timer interval for video recording studio
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (videoRecordingState === "recording") {
      interval = setInterval(() => {
        setVideoTimer((prev) => {
          if (prev >= 60) {
            setVideoRecordingState("recorded");
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [videoRecordingState]);

  // Global ESC Key Listener to dismiss topmost open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (deleteConfirmItem) setDeleteConfirmItem(null);
        else if (certModalOpen) setCertModalOpen(false);
        else if (eduModalOpen) setEduModalOpen(false);
        else if (workModalOpen) setWorkModalOpen(false);
        else if (familyModalOpen) setFamilyModalOpen(false);
        else if (showRecordVideoModal) setShowRecordVideoModal(false);
        else if (showFullCvModal) setShowFullCvModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    deleteConfirmItem,
    certModalOpen,
    eduModalOpen,
    workModalOpen,
    familyModalOpen,
    showRecordVideoModal,
    showFullCvModal,
  ]);

  // Global Body Scroll Lock when any modal is open
  useEffect(() => {
    const isAnyModalOpen =
      !!deleteConfirmItem ||
      certModalOpen ||
      eduModalOpen ||
      workModalOpen ||
      familyModalOpen ||
      showRecordVideoModal ||
      showFullCvModal;

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [
    deleteConfirmItem,
    certModalOpen,
    eduModalOpen,
    workModalOpen,
    familyModalOpen,
    showRecordVideoModal,
    showFullCvModal,
  ]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleCopyScript = () => {
    const script = `Hajimemashite. Watashi no namae wa ${fullName} desu. Indonesia kara kimashita. 23-sai desu. Nihon de isshoukenmei hatarakitai desu. Douzo yoroshiku onegaishimasu.`;
    navigator.clipboard?.writeText(script);
    showToast("Skrip perkenalan berhasil disalin ke papan klip!");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // -------------------------------------------------------------
  // CRUD Handlers: Sertifikat
  // -------------------------------------------------------------
  const openAddCertModal = () => {
    setEditingCert(null);
    setCertForm({
      name: "",
      category: "bahasa",
      score: "",
      examDate: "",
      status: "verified",
    });
    setCertModalOpen(true);
  };

  const openEditCertModal = (item: CertificateItem) => {
    setEditingCert(item);
    setCertForm({
      name: item.name,
      category: item.category,
      score: item.score,
      examDate: item.examDate,
      status: item.status,
    });
    setCertModalOpen(true);
  };

  const saveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.name.trim()) return;

    if (editingCert) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === editingCert.id ? { ...c, ...certForm } : c
        )
      );
      showToast(`Sertifikat "${certForm.name}" berhasil diperbarui.`);
    } else {
      const newItem: CertificateItem = {
        id: `cert-${Date.now()}`,
        ...certForm,
      };
      setCertificates((prev) => [...prev, newItem]);
      showToast(`Sertifikat "${certForm.name}" berhasil ditambahkan.`);
    }
    setCertModalOpen(false);
  };

  const deleteCert = (id: string, name: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    showToast(`Sertifikat "${name}" berhasil dihapus.`);
  };

  // -------------------------------------------------------------
  // CRUD Handlers: Riwayat Pendidikan
  // -------------------------------------------------------------
  const openAddEduModal = () => {
    setEditingEdu(null);
    setEduForm({
      level: "SMK / SMA Sederajat",
      institution: "",
      major: "",
      period: "",
      notes: "",
    });
    setEduModalOpen(true);
  };

  const openEditEduModal = (item: EducationItem) => {
    setEditingEdu(item);
    setEduForm({
      level: item.level,
      institution: item.institution,
      major: item.major,
      period: item.period,
      notes: item.notes,
    });
    setEduModalOpen(true);
  };

  const saveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.institution.trim()) return;

    if (editingEdu) {
      setEducationEntries((prev) =>
        prev.map((edu) =>
          edu.id === editingEdu.id ? { ...edu, ...eduForm } : edu
        )
      );
      showToast(`Riwayat pendidikan "${eduForm.institution}" berhasil diperbarui.`);
    } else {
      const newItem: EducationItem = {
        id: `edu-${Date.now()}`,
        ...eduForm,
      };
      setEducationEntries((prev) => [...prev, newItem]);
      showToast(`Riwayat pendidikan "${eduForm.institution}" berhasil ditambahkan.`);
    }
    setEduModalOpen(false);
  };

  const deleteEdu = (id: string, institution: string) => {
    setEducationEntries((prev) => prev.filter((edu) => edu.id !== id));
    showToast(`Pendidikan "${institution}" berhasil dihapus.`);
  };

  // -------------------------------------------------------------
  // CRUD Handlers: Pengalaman Kerja
  // -------------------------------------------------------------
  const openAddWorkModal = () => {
    setEditingWork(null);
    setWorkForm({
      company: "",
      role: "",
      industry: "Pengolahan Makanan & Minuman",
      period: "",
      description: "",
    });
    setWorkModalOpen(true);
  };

  const openEditWorkModal = (item: WorkItem) => {
    setEditingWork(item);
    setWorkForm({
      company: item.company,
      role: item.role,
      industry: item.industry,
      period: item.period,
      description: item.description,
    });
    setWorkModalOpen(true);
  };

  const saveWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workForm.company.trim()) return;

    if (editingWork) {
      setWorkEntries((prev) =>
        prev.map((w) =>
          w.id === editingWork.id ? { ...w, ...workForm } : w
        )
      );
      showToast(`Pengalaman kerja "${workForm.company}" berhasil diperbarui.`);
    } else {
      const newItem: WorkItem = {
        id: `work-${Date.now()}`,
        ...workForm,
      };
      setWorkEntries((prev) => [...prev, newItem]);
      showToast(`Pengalaman kerja "${workForm.company}" berhasil ditambahkan.`);
    }
    setWorkModalOpen(false);
  };

  const deleteWork = (id: string, company: string) => {
    setWorkEntries((prev) => prev.filter((w) => w.id !== id));
    showToast(`Pengalaman kerja "${company}" berhasil dihapus.`);
  };

  // -------------------------------------------------------------
  // CRUD Handlers: Keluarga
  // -------------------------------------------------------------
  const openAddFamilyModal = () => {
    setEditingFamily(null);
    setFamilyForm({
      name: "",
      relationship: "Ayah Kandung",
      age: "",
      occupation: "",
      isEmergencyContact: false,
      phone: "",
      consentStatus: "Sudah menyetujui izin kerja ke Jepang",
    });
    setFamilyModalOpen(true);
  };

  const openEditFamilyModal = (item: FamilyItem) => {
    setEditingFamily(item);
    setFamilyForm({
      name: item.name,
      relationship: item.relationship,
      age: item.age,
      occupation: item.occupation,
      isEmergencyContact: item.isEmergencyContact,
      phone: item.phone,
      consentStatus: item.consentStatus,
    });
    setFamilyModalOpen(true);
  };

  const saveFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyForm.name.trim()) return;

    if (editingFamily) {
      setFamilyMembers((prev) =>
        prev.map((f) =>
          f.id === editingFamily.id ? { ...f, ...familyForm } : f
        )
      );
      showToast(`Data keluarga "${familyForm.name}" berhasil diperbarui.`);
    } else {
      const newItem: FamilyItem = {
        id: `fam-${Date.now()}`,
        ...familyForm,
      };
      setFamilyMembers((prev) => [...prev, newItem]);
      showToast(`Data keluarga "${familyForm.name}" berhasil ditambahkan.`);
    }
    setFamilyModalOpen(false);
  };

  const deleteFamily = (id: string, name: string) => {
    setFamilyMembers((prev) => prev.filter((f) => f.id !== id));
    showToast(`Data keluarga "${name}" berhasil dihapus.`);
  };

  const navSections = [
    { id: "data_pribadi", label: "Data pribadi", status: "complete" },
    { id: "kesehatan", label: "Kesehatan & fisik", status: "complete" },
    { id: "bahasa", label: "Bahasa & sertifikat", status: "complete" },
    { id: "pendidikan", label: "Riwayat pendidikan", status: "complete" },
    { id: "pekerjaan", label: "Pengalaman kerja", status: "complete" },
    { id: "keluarga", label: "Keluarga", status: "complete" },
    { id: "video", label: "Video perkenalan", status: hasRecordedVideo ? "complete" : "warning" },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notifications */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#107C41] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span className="text-xs font-semibold">
            Perubahan profil berhasil disimpan!
          </span>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#0A0A0A] text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Header Section: Crisp & Uncluttered */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
              Profil & CV
            </h1>
            <p className="text-sm text-[#4A5565] mt-1 leading-relaxed">
              Isi sekali, dipakai untuk semua lamaran. CV 履歴書 dibuat otomatis dari data ini.
            </p>
          </div>

          <PushableButton onClick={handleSave} size="md">
            Simpan perubahan
          </PushableButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sub-nav Sticky Rail (3 cols / ~240px) */}
          <aside className="lg:col-span-3 space-y-3 sticky top-20">
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-2 space-y-1 shadow-xs">
              {navSections.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full px-3.5 py-3 rounded-[12px] text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FEECEC] text-[#C12121]"
                        : "text-[#0A0A0A] hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.status === "complete" ? (
                      <span className="w-5 h-5 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-[#E5E7EB] text-[#4A5565] font-bold flex items-center justify-center shrink-0 text-[11px]">
                        !
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Completion Progress Widget */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0A0A0A]">Kelengkapan Profil</span>
                <span className="font-extrabold text-[#C12121]">85%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#C12121] rounded-full w-[85%] transition-all duration-500" />
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight">
                Lengkapi video perkenalan untuk mencapai 100% dan membuka akses mensetsu langsung.
              </p>
            </div>
          </aside>

          {/* Center Main Content Area (6 cols) */}
          <section className="lg:col-span-6 space-y-8">
            {/* Section 1: Data Pribadi */}
            <div id="data_pribadi" className="scroll-mt-24 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A0A0A]">Data pribadi</h2>
                <span className="text-xs text-[#107C41] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Terverifikasi
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Photo 3x4 Box with File Upload */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 sm:w-28 self-stretch min-h-[190px] rounded-[10px] border border-dashed border-[#D1D5DC] bg-[#F9FAFB] flex flex-col items-center justify-center p-3 text-center shrink-0 group hover:border-[#C12121] transition-colors cursor-pointer overflow-hidden relative"
                    title="Klik untuk unggah pas foto 3x4"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    {photoUrl ? (
                      <div className="w-full h-full flex flex-col items-center justify-center relative group">
                        <img
                          src={photoUrl}
                          alt="Pas foto 3x4"
                          className="w-20 h-28 object-cover rounded-[6px] border border-slate-200 shadow-2xs"
                        />
                        <span className="text-[10px] text-[#C12121] font-bold mt-2 hover:underline">
                          Ganti foto
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-1.5 group-hover:bg-[#FEECEC] group-hover:text-[#C12121] transition-colors">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#0A0A0A] block">
                          Pas foto 3×4
                        </span>
                        <span className="text-[11px] text-[#6A7282] mt-0.5">
                          latar putih
                        </span>
                        <span className="text-[10px] text-[#C12121] font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Unggah foto
                        </span>
                      </>
                    )}
                  </div>

                  {/* Text Fields (Clean 2-Col Grid) */}
                  <div className="flex-1 w-full space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                          Nama lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5 font-mono">
                          フリガナ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={furigana}
                          onChange={(e) => setFurigana(e.target.value)}
                          className="w-full h-11 px-3.5 text-sm font-mono bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                          Tanggal lahir <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            placeholder="dd/mm/yyyy"
                            className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] placeholder-[#99A1AF] transition-colors"
                          />
                          <Calendar className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                          Status pernikahan
                        </label>
                        <div className="relative">
                          <select
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                          >
                            <option value="Belum menikah">Belum menikah</option>
                            <option value="Menikah">Menikah</option>
                            <option value="Cerai">Cerai</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                          Agama
                        </label>
                        <div className="relative">
                          <select
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                            className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                          >
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                          Kota asal KTP
                        </label>
                        <input
                          type="text"
                          value={ktpCity}
                          onChange={(e) => setKtpCity(e.target.value)}
                          placeholder="Kabupaten / Kota"
                          className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] placeholder-[#99A1AF] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Kesehatan & Fisik */}
            <div id="kesehatan" className="scroll-mt-24 space-y-2.5">
              <h2 className="text-base font-bold text-[#0A0A0A]">Kesehatan & fisik</h2>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                      Tinggi badan (cm)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                      Berat badan (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                      Golongan darah
                    </label>
                    <div className="relative">
                      <select
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        className="w-full h-11 pl-3.5 pr-8 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                      Tangan dominan
                    </label>
                    <div className="relative">
                      <select
                        value={dominantHand}
                        onChange={(e) => setDominantHand(e.target.value)}
                        className="w-full h-11 pl-3.5 pr-8 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                      >
                        <option value="Kanan">Kanan</option>
                        <option value="Kidal">Kidal</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Pill Chips Checklist Kondisi Fisik */}
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-2.5">
                    Kondisi fisik & kebiasaan industri Jepang
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { key: "colorBlind", label: "Tidak buta warna" },
                      { key: "tattoo", label: "Tidak bertato" },
                      { key: "smoking", label: "Tidak merokok" },
                      { key: "handlePork", label: "Bersedia pegang babi (pabrik)" },
                      { key: "alcohol", label: "Tidak konsumsi alkohol" },
                      { key: "hijab", label: "Bersedia lepas hijab saat kerja" },
                    ].map((item) => {
                      const isChecked = healthChecks[item.key as keyof typeof healthChecks];
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() =>
                            setHealthChecks({
                              ...healthChecks,
                              [item.key]: !isChecked,
                            })
                          }
                          className={`h-10 px-4 rounded-full border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer select-none ${
                            isChecked
                              ? "bg-white border-[#C12121] text-[#0A0A0A] shadow-xs"
                              : "bg-white border-[#D1D5DC] text-[#4A5565] hover:border-slate-400"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${
                              isChecked
                                ? "bg-[#C12121] text-white"
                                : "border border-[#D1D5DC] bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Riwayat penyakit / operasi <span className="text-[#64748B] font-normal">(Opsional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    placeholder='Tulis "Tidak ada" jika tidak ada riwayat penyakit berat'
                    className="w-full px-3.5 py-3 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] placeholder-[#99A1AF] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Bahasa & Sertifikat (CRUD Penuh) */}
            <div id="bahasa" className="scroll-mt-24 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A0A0A]">Bahasa & sertifikat</h2>
                <span className="text-xs text-[#64748B] font-semibold">
                  {certificates.length} sertifikat tersimpan
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-[12px] bg-white border border-[#E5E7EB] hover:border-slate-300 flex items-center justify-between shadow-2xs transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0 flex-1 pr-3">
                      <span className="text-sm font-bold text-[#0A0A0A] block truncate">
                        {cert.name}
                      </span>
                      <span className="text-xs text-[#6A7282] block">
                        {cert.score} · {cert.examDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          cert.status === "verified"
                            ? "bg-[#ECFDF5] text-[#107C41]"
                            : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {cert.status === "verified" ? "Terverifikasi" : "Menunggu cek"}
                      </span>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => openEditCertModal(cert)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit sertifikat"
                        aria-label={`Edit ${cert.name}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmItem({
                            title: "Sertifikat",
                            name: cert.name,
                            onConfirm: () => deleteCert(cert.id, cert.name),
                          })
                        }
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-[#C12121] flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus sertifikat"
                        aria-label={`Hapus ${cert.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={openAddCertModal}
                  className="w-full py-3 rounded-[10px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] hover:text-[#C12121] text-xs font-bold text-[#0A0A0A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah sertifikat baru</span>
                </button>
              </div>
            </div>

            {/* Section 4: Riwayat Pendidikan (学歴 - CRUD Penuh) */}
            <div id="pendidikan" className="scroll-mt-24 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#0A0A0A]">
                    Riwayat pendidikan
                  </h2>
                  <span className="text-xs text-[#64748B]">
                    (学歴 · Gakureki)
                  </span>
                </div>
                <span className="text-xs text-[#107C41] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> {educationEntries.length} data tersimpan
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-3">
                {educationEntries.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-[12px] bg-[#F9FAFB] border border-slate-100 hover:border-slate-200 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-[#FEECEC] text-[#C12121] flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0A0A0A] block truncate">
                            {item.institution}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                            {item.level}
                          </span>
                        </div>
                        <span className="text-xs text-[#475569] block font-medium">
                          Jurusan: {item.major} · {item.period}
                        </span>
                        <span className="text-xs text-[#6A7282] block">
                          {item.notes}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditEduModal(item)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit pendidikan"
                        aria-label={`Edit ${item.institution}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmItem({
                            title: "Riwayat Pendidikan",
                            name: item.institution,
                            onConfirm: () => deleteEdu(item.id, item.institution),
                          })
                        }
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-[#C12121] flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus pendidikan"
                        aria-label={`Hapus ${item.institution}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={openAddEduModal}
                  className="w-full py-3 rounded-[10px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] hover:text-[#C12121] text-xs font-bold text-[#0A0A0A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah riwayat pendidikan</span>
                </button>
              </div>
            </div>

            {/* Section 5: Pengalaman Kerja (職歴 - CRUD Penuh) */}
            <div id="pekerjaan" className="scroll-mt-24 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#0A0A0A]">
                    Pengalaman kerja
                  </h2>
                  <span className="text-xs text-[#64748B]">
                    (職歴 · Shokureki)
                  </span>
                </div>
                <span className="text-xs text-[#107C41] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> {workEntries.length} pengalaman tersimpan
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-3">
                {workEntries.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-[12px] bg-[#F9FAFB] border border-slate-100 hover:border-slate-200 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Briefcase className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-[#0A0A0A] block truncate">
                            {item.company}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">
                            {item.industry}
                          </span>
                        </div>
                        <span className="text-xs text-[#0A0A0A] font-semibold block">
                          {item.role} · <span className="text-[#64748B] font-normal">{item.period}</span>
                        </span>
                        <p className="text-xs text-[#475569] leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditWorkModal(item)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit pengalaman kerja"
                        aria-label={`Edit ${item.company}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmItem({
                            title: "Pengalaman Kerja",
                            name: item.company,
                            onConfirm: () => deleteWork(item.id, item.company),
                          })
                        }
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-[#C12121] flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus pengalaman kerja"
                        aria-label={`Hapus ${item.company}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={openAddWorkModal}
                  className="w-full py-3 rounded-[10px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] hover:text-[#C12121] text-xs font-bold text-[#0A0A0A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah pengalaman kerja baru</span>
                </button>
              </div>
            </div>

            {/* Section 5: Keluarga (CRUD Penuh) */}
            <div id="keluarga" className="scroll-mt-24 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A0A0A]">Keluarga</h2>
                <span className="text-xs text-[#107C41] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Terverifikasi
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-3">
                {familyMembers.map((fam) => (
                  <div
                    key={fam.id}
                    className="p-4 rounded-[12px] bg-[#F9FAFB] border border-slate-100 hover:border-slate-200 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <Heart className="w-5 h-5 text-[#C12121] shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0A0A0A] text-sm truncate">
                            {fam.name} ({fam.relationship})
                          </span>
                          {fam.isEmergencyContact && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEECEC] text-[#C12121]">
                              Kontak Darurat
                            </span>
                          )}
                        </div>
                        <p className="text-[#475569]">
                          Usia: {fam.age} · Pekerjaan: {fam.occupation} · No. HP: {fam.phone}
                        </p>
                        <p className="text-[#107C41] font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{fam.consentStatus}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditFamilyModal(fam)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-[#0A0A0A] flex items-center justify-center transition-colors cursor-pointer"
                        title="Edit data keluarga"
                        aria-label={`Edit ${fam.name}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmItem({
                            title: "Anggota Keluarga",
                            name: fam.name,
                            onConfirm: () => deleteFamily(fam.id, fam.name),
                          })
                        }
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-[#C12121] flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus data keluarga"
                        aria-label={`Hapus ${fam.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={openAddFamilyModal}
                  className="w-full py-3 rounded-[10px] border-2 border-dashed border-[#D1D5DC] hover:border-[#C12121] hover:text-[#C12121] text-xs font-bold text-[#0A0A0A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-white"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah anggota keluarga</span>
                </button>
              </div>
            </div>

            {/* Section 6: Video Perkenalan (Jikoshoukai) */}
            <div id="video" className="scroll-mt-24 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0A0A0A]">
                  Video perkenalan (自己紹介)
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    hasRecordedVideo
                      ? "bg-[#ECFDF5] text-[#107C41]"
                      : "bg-[#FEF3C7] text-[#92400E]"
                  }`}
                >
                  {hasRecordedVideo ? "Sudah diunggah (1 Menit)" : "Perlu dilengkapi"}
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-7 shadow-xs space-y-4">
                {hasRecordedVideo ? (
                  <div className="p-5 rounded-[12px] border border-emerald-200 bg-[#F0FDF4] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#107C41] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="text-sm font-bold text-[#0A0A0A] block">
                          Video Perkenalan 1 Menit Tersimpan
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-emerald-700 border border-emerald-300">
                          1080p HD
                        </span>
                      </div>
                      <p className="text-xs text-[#475569]">
                        Video perkenalan diri Anda siap dilampirkan otomatis saat melamar pekerjaan Tokutei Ginou.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setVideoRecordingState("recorded");
                          setVideoTimer(60);
                          setShowRecordVideoModal(true);
                        }}
                        className="px-3.5 py-2 rounded-[8px] bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        Tinjau Video
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setVideoRecordingState("idle");
                          setVideoTimer(0);
                          setShowRecordVideoModal(true);
                        }}
                        className="px-3.5 py-2 rounded-[8px] bg-[#1E2939] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Rekam Ulang
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-[12px] border border-dashed border-amber-300 bg-[#FFFBEB] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-[#92400E] flex items-center justify-center shrink-0">
                      <Video className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-bold text-[#0A0A0A] block">
                        Rekam video perkenalan 1 menit dalam bahasa Jepang
                      </span>
                      <p className="text-xs text-[#475569]">
                        Video ini otomatis dilampirkan bersama JIS Rirekisho ke pihak penerima Jepang (TSK / Kaigo).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRecordVideoModal(true)}
                      className="px-4 py-2.5 rounded-[10px] bg-[#1E2939] text-white hover:bg-black text-xs font-semibold transition-colors cursor-pointer shrink-0"
                    >
                      Rekam sekarang
                    </button>
                  </div>
                )}

                {/* Progressive Disclosure: Contoh Skrip Jikoshoukai */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowScriptGuide(!showScriptGuide)}
                    className="text-xs text-[#C12121] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showScriptGuide ? "Sembunyikan panduan skrip" : "Lihat contoh skrip perkenalan 1 menit"}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showScriptGuide ? "rotate-90" : ""}`} />
                  </button>

                  {showScriptGuide && (
                    <div className="mt-3 p-4 rounded-[12px] bg-[#F8FAFC] border border-slate-200 text-xs space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0A0A0A]">Skrip Romaji Singkat:</span>
                        <button
                          type="button"
                          onClick={handleCopyScript}
                          className="text-[11px] text-[#2563EB] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          Salin
                        </button>
                      </div>
                      <p className="text-[#475569] font-mono leading-relaxed bg-white p-2.5 rounded border border-slate-200/80">
                        &quot;Hajimemashite. Watashi no namae wa {fullName} desu. Indonesia kara kimashita. 23-sai desu. Nihon de isshoukenmei hatarakitai desu. Douzo yoroshiku onegaishimasu.&quot;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Right Sidebar: Dynamic Preview CV Rirekisho (3 cols) */}
          <aside className="lg:col-span-3 space-y-2.5 sticky top-20">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0A0A0A]">Preview CV</h2>
              <span className="text-xs text-[#6A7282]">Format Timedoor JIS</span>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-xs space-y-4">
              {/* Dynamic Rirekisho Miniature Paper */}
              <div className="border border-[#D1D5DC] rounded-[8px] p-4 bg-white space-y-3 shadow-2xs select-none">
                <div className="text-center font-mono font-bold text-xs tracking-[0.3em] text-[#0A0A0A] border-b border-slate-200 pb-1.5">
                  履 歴 書
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="font-mono text-[9px] text-[#64748B] truncate">
                      {furigana}
                    </p>
                    <p className="font-bold text-xs text-[#0A0A0A] truncate">
                      {fullName}
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      {birthDate} (23歳) · Laki-laki
                    </p>
                    <p className="text-[9px] text-[#94A3B8] truncate">
                      {ktpCity}
                    </p>
                  </div>

                  <div className="w-12 h-16 border border-slate-300 rounded-xs bg-slate-50 shrink-0 flex items-center justify-center text-[10px] text-slate-400 overflow-hidden">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Foto 3x4" className="w-full h-full object-cover" />
                    ) : (
                      <span>写真 3×4</span>
                    )}
                  </div>
                </div>

                {/* Dynamic Education & Work rows */}
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#4A5565] block">
                    学歴・職歴:
                  </span>
                  {educationEntries.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-[9px] text-[#475569] truncate">
                      • [学] {item.period.split(" ")[0]} {item.institution}
                    </div>
                  ))}
                  {workEntries.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-[9px] text-[#475569] truncate">
                      • [職] {item.period.split(" ")[0]} {item.company}
                    </div>
                  ))}
                </div>

                {/* Dynamic Certifications */}
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#4A5565] block">
                    免許・資格:
                  </span>
                  {certificates.slice(0, 2).map((cert) => (
                    <div key={cert.id} className="text-[9px] text-[#475569] truncate">
                      • {cert.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => showToast("CV JIS Rirekisho resmi format PDF berhasil diunduh!")}
                  className="w-full h-11 px-4 rounded-[8px] bg-[#1E2939] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download CV (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowFullCvModal(true)}
                  className="w-full py-2 text-xs font-semibold text-[#4A5565] hover:text-[#0A0A0A] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat pratinjau penuh</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: Tambah / Edit Sertifikat                                   */}
      {/* ------------------------------------------------------------------ */}
      {certModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          onClick={() => setCertModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 id="cert-modal-title" className="text-base font-bold text-[#0A0A0A]">
                {editingCert ? "Edit Sertifikat" : "Tambah Sertifikat Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveCert} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Nama Sertifikat / Ujian <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: JFT Basic A2 / SSW Kaigo"
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Kategori
                  </label>
                  <div className="relative">
                    <select
                      value={certForm.category}
                      onChange={(e) =>
                        setCertForm({
                          ...certForm,
                          category: e.target.value as "bahasa" | "ssw" | "lainnya",
                        })
                      }
                      className="w-full h-11 px-3.5 pr-9 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer transition-colors"
                    >
                      <option value="bahasa">Bahasa Jepang</option>
                      <option value="ssw">SSW Keahlian Khusus</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Status Verifikasi
                  </label>
                  <div className="relative">
                    <select
                      value={certForm.status}
                      onChange={(e) =>
                        setCertForm({
                          ...certForm,
                          status: e.target.value as "verified" | "review" | "pending",
                        })
                      }
                      className="w-full h-11 px-3.5 pr-9 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer transition-colors"
                    >
                      <option value="verified">Terverifikasi</option>
                      <option value="review">Menunggu cek</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Skor / Keterangan Kelulusan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Skor 214 / Lulus Teori & Praktik"
                  value={certForm.score}
                  onChange={(e) => setCertForm({ ...certForm, score: e.target.value })}
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Tanggal Ujian
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 15 Agustus 2026"
                  value={certForm.examDate}
                  onChange={(e) => setCertForm({ ...certForm, examDate: e.target.value })}
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              {/* Optional Certificate Attachment */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Lampiran Dokumen Sertifikat <span className="text-[#64748B] font-normal">(Opsional)</span>
                </label>
                <div
                  onClick={() => showToast("Simulasi unggah: Berkas sertifikat dipilih.")}
                  className="flex items-center gap-3 p-3 rounded-[8px] border border-dashed border-[#D1D5DC] bg-[#F9FAFB] hover:border-[#C12121] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    <FileText className="w-4 h-4 text-[#C12121]" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-semibold text-[#0A0A0A] truncate">
                      Pilih file PDF atau JPG (maks. 5MB)
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      Mempercepat proses verifikasi LPK/TSK
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#C12121] shrink-0">Pilih Berkas</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <PushableButton type="submit" size="sm">
                  {editingCert ? "Simpan Perubahan" : "Simpan Sertifikat"}
                </PushableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2A: Tambah / Edit Riwayat Pendidikan                         */}
      {/* ------------------------------------------------------------------ */}
      {eduModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edu-modal-title"
          onClick={() => setEduModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 id="edu-modal-title" className="text-base font-bold text-[#0A0A0A]">
                  {editingEdu ? "Edit Riwayat Pendidikan" : "Tambah Riwayat Pendidikan"}
                </h3>
                <p className="text-[11px] text-slate-500">学歴 (Gakureki) — Ditulis resmi di CV Standar JIS</p>
              </div>
              <button
                type="button"
                onClick={() => setEduModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveEdu} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Jenjang Pendidikan <span className="text-red-500">*</span>
                </label>
                <select
                  value={eduForm.level}
                  onChange={(e) => setEduForm({ ...eduForm, level: e.target.value })}
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                >
                  <option value="SMK / SMA Sederajat">SMK / SMA Sederajat</option>
                  <option value="Diploma (D3 / D4)">Diploma (D3 / D4)</option>
                  <option value="Sarjana (S1)">Sarjana (S1)</option>
                  <option value="SMP Sederajat">SMP Sederajat</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Nama Sekolah / Perguruan Tinggi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMK Negeri 1 Denpasar"
                  value={eduForm.institution}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, institution: e.target.value })
                  }
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Jurusan / Program Studi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Teknik Mesin"
                    value={eduForm.major}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, major: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Periode / Tahun Kelulusan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2020 – 2023"
                    value={eduForm.period}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, period: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Nilai Rata-rata / Catatan Prestasi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Nilai rata-rata Ijazah 86,5 / Lulusan Terbaik"
                  value={eduForm.notes}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, notes: e.target.value })
                  }
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEduModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <PushableButton type="submit" size="sm">
                  {editingEdu ? "Simpan Perubahan" : "Simpan Pendidikan"}
                </PushableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2B: Tambah / Edit Pengalaman Kerja                           */}
      {/* ------------------------------------------------------------------ */}
      {workModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
          onClick={() => setWorkModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 id="work-modal-title" className="text-base font-bold text-[#0A0A0A]">
                  {editingWork ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
                </h3>
                <p className="text-[11px] text-slate-500">職歴 (Shokureki) — Ditulis resmi di CV Standar JIS</p>
              </div>
              <button
                type="button"
                onClick={() => setWorkModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveWork} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Nama Perusahaan / Tempat Kerja <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PT Industri Pangan Nusantara"
                  value={workForm.company}
                  onChange={(e) =>
                    setWorkForm({ ...workForm, company: e.target.value })
                  }
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Posisi / Jabatan Pekerjaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Operator Pengolahan Makanan / Teknisi Pemeliharaan"
                  value={workForm.role}
                  onChange={(e) =>
                    setWorkForm({ ...workForm, role: e.target.value })
                  }
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Bidang Industri
                  </label>
                  <select
                    value={workForm.industry}
                    onChange={(e) => setWorkForm({ ...workForm, industry: e.target.value })}
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  >
                    <option value="Pengolahan Makanan & Minuman">Pengolahan Makanan & Minuman</option>
                    <option value="Restoran & Food Service">Restoran & Food Service</option>
                    <option value="Pertanian & Peternakan">Pertanian & Peternakan</option>
                    <option value="Manufaktur & Permesinan">Manufaktur & Permesinan</option>
                    <option value="Konstruksi & Bangunan">Konstruksi & Bangunan</option>
                    <option value="Perawatan Lansia (Kaigo)">Perawatan Lansia (Kaigo)</option>
                    <option value="Perhotelan & Hospitality">Perhotelan & Hospitality</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Masa Bekerja
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2023 – 2024 (1 Tahun)"
                    value={workForm.period}
                    onChange={(e) =>
                      setWorkForm({ ...workForm, period: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Ringkasan Tanggung Jawab & Keahlian Praktis
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Mengoperasikan mesin packaging retort, menerapkan sanitasi 5S/HACCP, inspeksi kualitas akhir..."
                  value={workForm.description}
                  onChange={(e) =>
                    setWorkForm({ ...workForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] resize-none transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setWorkModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <PushableButton type="submit" size="sm">
                  {editingWork ? "Simpan Perubahan" : "Simpan Pekerjaan"}
                </PushableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: Tambah / Edit Keluarga                                     */}
      {/* ------------------------------------------------------------------ */}
      {familyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="family-modal-title"
          onClick={() => setFamilyModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 id="family-modal-title" className="text-base font-bold text-[#0A0A0A]">
                {editingFamily ? "Edit Anggota Keluarga" : "Tambah Anggota Keluarga"}
              </h3>
              <button
                type="button"
                onClick={() => setFamilyModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveFamily} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bambang Santoso"
                  value={familyForm.name}
                  onChange={(e) =>
                    setFamilyForm({ ...familyForm, name: e.target.value })
                  }
                  className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Hubungan
                  </label>
                  <div className="relative">
                    <select
                      value={familyForm.relationship}
                      onChange={(e) =>
                        setFamilyForm({ ...familyForm, relationship: e.target.value })
                      }
                      className="w-full h-11 px-3.5 pr-9 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer transition-colors"
                    >
                      <option value="Ayah Kandung">Ayah Kandung</option>
                      <option value="Ibu Kandung">Ibu Kandung</option>
                      <option value="Kakak Kandung">Kakak Kandung</option>
                      <option value="Adik Kandung">Adik Kandung</option>
                      <option value="Pasangan (Istri/Suami)">Pasangan</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Usia
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 52 thn"
                    value={familyForm.age}
                    onChange={(e) =>
                      setFamilyForm({ ...familyForm, age: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Wiraswasta"
                    value={familyForm.occupation}
                    onChange={(e) =>
                      setFamilyForm({ ...familyForm, occupation: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                    Nomor Telepon / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+62 812-xxxx-xxxx"
                    value={familyForm.phone}
                    onChange={(e) =>
                      setFamilyForm({ ...familyForm, phone: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] transition-colors"
                  />
                </div>
              </div>

              {/* Status Izin Kerja ke Jepang */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Status Izin Bekerja ke Jepang
                </label>
                <div className="relative">
                  <select
                    value={familyForm.consentStatus}
                    onChange={(e) =>
                      setFamilyForm({ ...familyForm, consentStatus: e.target.value })
                    }
                    className="w-full h-11 px-3.5 pr-9 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer transition-colors"
                  >
                    <option value="Sudah menyetujui izin kerja ke Jepang">Sudah menyetujui izin kerja ke Jepang</option>
                    <option value="Dalam proses persetujuan keluarga">Dalam proses persetujuan keluarga</option>
                    <option value="Belum diinformasikan">Belum diinformasikan</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <input
                  id="emergency"
                  type="checkbox"
                  checked={familyForm.isEmergencyContact}
                  onChange={(e) =>
                    setFamilyForm({
                      ...familyForm,
                      isEmergencyContact: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-[#C12121] accent-[#C12121] rounded border-[#D1D5DC] cursor-pointer"
                />
                <label htmlFor="emergency" className="text-xs font-medium text-[#0A0A0A] cursor-pointer">
                  Jadikan sebagai kontak darurat utama
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setFamilyModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <PushableButton type="submit" size="sm">
                  {editingFamily ? "Simpan Perubahan" : "Simpan Anggota"}
                </PushableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 4: Studio Perekaman Video Jikoshoukai 1 Menit               */}
      {/* ------------------------------------------------------------------ */}
      {showRecordVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={() => setShowRecordVideoModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </span>
                <div>
                  <h3 id="video-modal-title" className="text-base font-bold text-[#0A0A0A]">
                    Studio Video Perkenalan (自己紹介)
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Format wajib 1 menit untuk seleksi awal perusahaan Jepang & TSK
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRecordVideoModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                aria-label="Tutup modal studio video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Webcam Viewfinder Studio */}
            <div className="bg-[#0B0F17] rounded-xl overflow-hidden relative border border-slate-800 shadow-inner flex flex-col justify-between p-3.5 min-h-[220px]">
              {/* Top Viewfinder Status Overlay */}
              <div className="flex items-center justify-between text-[11px] text-white/90 z-10">
                <div className="flex items-center gap-2">
                  {videoRecordingState === "idle" && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                      Standby 1080p HD
                    </span>
                  )}
                  {videoRecordingState === "recording" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-950/90 border border-red-500/50 text-red-400 font-mono font-bold flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                      REC 00:{videoTimer.toString().padStart(2, "0")} / 01:00
                    </span>
                  )}
                  {videoRecordingState === "recorded" && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Rekaman Selesai (01:00)
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  Timedoor Camera Studio
                </span>
              </div>

              {/* Viewfinder Center Subject Area */}
              <div className="flex flex-col items-center justify-center py-6 text-center z-10">
                {videoRecordingState === "idle" && (
                  <div className="space-y-2">
                    <div className="w-24 h-28 border-2 border-dashed border-white/30 rounded-[40px] flex items-center justify-center mx-auto text-white/40">
                      <User className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Posisikan wajah Anda di dalam batas lingkaran
                    </p>
                  </div>
                )}
                {videoRecordingState === "recording" && (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="w-24 h-28 border-2 border-red-500/60 rounded-[40px] flex items-center justify-center mx-auto text-red-400/80 bg-red-950/20">
                      <User className="w-10 h-10 stroke-[2]" />
                    </div>
                    <p className="text-xs text-white font-medium">
                      Silakan berbicara dalam bahasa Jepang sekarang...
                    </p>
                    <p className="text-[11px] text-red-400 font-mono">
                      Sisa waktu: {60 - videoTimer} detik
                    </p>
                  </div>
                )}
                {videoRecordingState === "recorded" && (
                  <div className="space-y-2 animate-in zoom-in-95">
                    <button
                      type="button"
                      onClick={() => showToast("Memutar video pratinjau...")}
                      className="w-14 h-14 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white flex items-center justify-center mx-auto transition-transform hover:scale-105 cursor-pointer shadow-lg"
                      title="Putar Pratinjau"
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>
                    <p className="text-xs text-white font-bold">
                      {fullName} — Video Perkenalan
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Siap dilampirkan ke dokumen resmi JIS Rirekisho
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Equalizer Wave Simulation */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 z-10">
                <span className="flex items-center gap-1">
                  Mikrofon internal: <span className="text-emerald-400 font-semibold">Aktif (Noise Filter)</span>
                </span>
                {videoRecordingState === "recording" && (
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-red-500 rounded-full animate-bounce" />
                    <span className="w-1 h-4 bg-red-400 rounded-full animate-bounce delay-75" />
                    <span className="w-1 h-2 bg-red-500 rounded-full animate-bounce delay-150" />
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Recording Controls Bar */}
            <div className="flex items-center justify-between gap-2.5 pt-1">
              {videoRecordingState === "idle" && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowRecordVideoModal(false)}
                    className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    Batal
                  </button>
                  <PushableButton
                    onClick={() => {
                      setVideoRecordingState("recording");
                      setVideoTimer(0);
                    }}
                    size="sm"
                  >
                    <Video className="w-3.5 h-3.5 mr-1.5" />
                    Mulai Rekam (1 Menit)
                  </PushableButton>
                </>
              )}

              {videoRecordingState === "recording" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoRecordingState("idle");
                      setVideoTimer(0);
                    }}
                    className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    Batalkan Rekaman
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoRecordingState("recorded")}
                    className="px-4 py-2 rounded-[8px] text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    Selesai Merekam (Stop)
                  </button>
                </>
              )}

              {videoRecordingState === "recorded" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoRecordingState("idle");
                      setVideoTimer(0);
                    }}
                    className="px-3.5 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Rekam Ulang
                  </button>
                  <PushableButton
                    onClick={() => {
                      setHasRecordedVideo(true);
                      setShowRecordVideoModal(false);
                      showToast("Video perkenalan (1 menit) berhasil disimpan dan dilampirkan ke profil!");
                    }}
                    size="sm"
                  >
                    <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3]" />
                    Simpan & Lampirkan ke CV
                  </PushableButton>
                </>
              )}
            </div>

            {/* Skrip Contoh Singkat */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0A0A0A]">Panduan Skrip Romaji:</span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="text-[11px] text-[#2563EB] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  Salin Skrip
                </button>
              </div>
              <p className="font-mono text-[11px] text-[#475569] leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                &quot;Hajimemashite. Watashi no namae wa {fullName} desu. 23-sai desu. Indonesia kara kimashita. Nihon de isshoukenmei hatarakitai desu. Douzo yoroshiku onegaishimasu.&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 5: Fullscreen JIS CV Preview (日本産業規格 履歴書)            */}
      {/* ------------------------------------------------------------------ */}
      {showFullCvModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          onClick={() => setShowFullCvModal(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="cv-modal-title" className="text-base font-bold text-[#0A0A0A]">
                    Pratinjau Dokumen CV JIS (履歴書)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    JIS Z 8303
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Format standar resmi Kedutaan Besar Jepang & TSK penerima.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Cetak CV"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFullCvModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer text-slate-700 transition-colors"
                  aria-label="Tutup pratinjau CV"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border border-slate-300 rounded-[10px] p-6 bg-white space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-black pb-2">
                <span className="font-bold tracking-[0.25em]">履 歴 書</span>
                <span className="text-[11px] text-slate-500">令和8年 10月 21日 現在</span>
              </div>

              {/* Data Pribadi & Foto */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 space-y-1">
                  <div className="text-[10px] text-slate-500">フリガナ: {furigana}</div>
                  <div className="text-sm font-bold text-black">{fullName}</div>
                  <div className="text-[11px] text-slate-600">
                    {birthDate}生 (平成15年 5月 12日生 · 満 23歳) · 男
                  </div>
                  <div className="text-[11px] text-slate-600">現住所: {ktpCity}, Indonesia</div>
                  <div className="text-[11px] text-slate-600">連絡先: +62 812-3456-7890</div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <div className="w-16 h-20 border border-slate-400 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 overflow-hidden">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Foto 3x4" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-1 text-center">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold mb-1">
                          BS
                        </span>
                        <span className="text-[9px]">写真 3×4</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Physical & Health Status Table */}
              <div className="border-t border-slate-300 pt-3 space-y-1.5">
                <div className="font-bold text-[11px]">身体・健康状況:</div>
                <div className="text-[11px] text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded">
                  <span>身長: {height} cm</span>
                  <span>体重: {weight} kg</span>
                  <span>血液型: {bloodType} 型</span>
                  <span>利き手: {dominantHand}</span>
                </div>
                <div className="text-[10px] text-slate-500 px-1">
                  健康状態: 良好 · 既往歴・持病: {medicalHistory || "なし"} · 色覚: 異常なし
                </div>
              </div>

              {/* Education & Work Experience */}
              <div className="border-t border-slate-300 pt-3 space-y-2">
                <div className="font-bold text-[11px] text-[#0A0A0A]">学歴・職歴 (Riwayat Pendidikan & Pengalaman Kerja):</div>

                {/* Gakureki */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-600 bg-slate-100/70 px-2 py-0.5 rounded">
                    【 学 歴 】 (Pendidikan)
                  </div>
                  {educationEntries.length === 0 ? (
                    <div className="text-[10px] text-slate-400 italic px-2">Belum ada data pendidikan</div>
                  ) : (
                    educationEntries.map((item) => (
                      <div key={item.id} className="text-[11px] text-slate-700 flex justify-between px-2">
                        <span>{item.period} · {item.institution} {item.major ? `(${item.major})` : `(${item.level})`}</span>
                        <span className="text-slate-500 text-[10px]">{item.notes}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Shokureki */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-600 bg-slate-100/70 px-2 py-0.5 rounded">
                    【 職 歴 】 (Pekerjaan)
                  </div>
                  {workEntries.length === 0 ? (
                    <div className="text-[10px] text-slate-400 italic px-2">なし (Fresh Graduate / Belum Ada Pengalaman Kerja)</div>
                  ) : (
                    workEntries.map((item) => (
                      <div key={item.id} className="text-[11px] text-slate-700 flex justify-between px-2">
                        <span>{item.period} · {item.company} ({item.role})</span>
                        <span className="text-slate-500 text-[10px] max-w-[200px] truncate">{item.industry}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="text-right text-[10px] text-slate-600 font-bold pt-1 pr-2">以 上</div>
              </div>

              {/* Certifications */}
              <div className="border-t border-slate-300 pt-3 space-y-1.5">
                <div className="font-bold text-[11px]">免許・資格:</div>
                {certificates.map((cert) => (
                  <div key={cert.id} className="text-[11px] text-slate-700 flex justify-between">
                    <span>{cert.examDate} · {cert.name}</span>
                    <span className="text-emerald-700 font-semibold">{cert.score}</span>
                  </div>
                ))}
              </div>

              {/* Motivation & Self PR */}
              <div className="border-t border-slate-300 pt-3 space-y-1.5">
                <div className="font-bold text-[11px]">志望の動機・特技・アピールポイント:</div>
                <p className="text-[11px] text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded">
                  特定技能として日本の高い衛生基準と製造技術を真面目に学び、日本の現場でチームに貢献したいと考えています。協調性があり、日本語でのコミュニケーション向上にも日々励んでいます。
                </p>
              </div>

              {/* Family */}
              <div className="border-t border-slate-300 pt-3 space-y-1.5">
                <div className="font-bold text-[11px]">家族構成:</div>
                {familyMembers.map((fam) => (
                  <div key={fam.id} className="text-[11px] text-slate-700 flex justify-between">
                    <span>{fam.relationship}: {fam.name} ({fam.age})</span>
                    <span className="text-slate-500">{fam.occupation} · {fam.consentStatus}</span>
                  </div>
                ))}
              </div>

              {/* Job Preferences */}
              <div className="border-t border-slate-300 pt-3 space-y-1.5">
                <div className="font-bold text-[11px]">本人希望記入欄:</div>
                <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded">
                  希望職種: 特定技能 飲食料品製造業 / 外食業 · 勤務地: 関東・関西エリア · 赴任可能時期: 即時
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFullCvModal(false)}
                className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Tutup
              </button>
              <PushableButton
                onClick={() => {
                  setShowFullCvModal(false);
                  showToast("Dokumen CV JIS resmi format PDF berhasil diunduh.");
                }}
                size="sm"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Download PDF (JIS)
              </PushableButton>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 6: Dialog Konfirmasi Hapus Data (Destructive Action Modal)   */}
      {/* ------------------------------------------------------------------ */}
      {deleteConfirmItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
          onClick={() => setDeleteConfirmItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#C12121] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 id="delete-confirm-title" className="text-sm font-bold text-[#0A0A0A]">
                  Hapus {deleteConfirmItem.title}?
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Apakah Anda yakin ingin menghapus &quot;{deleteConfirmItem.name}&quot;? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteConfirmItem.onConfirm();
                  setDeleteConfirmItem(null);
                }}
                className="px-4 py-2 rounded-[8px] text-xs font-bold text-white bg-[#C12121] hover:bg-[#a51b1b] cursor-pointer shadow-xs transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
