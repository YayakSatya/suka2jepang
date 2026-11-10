"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  ExternalLink,
  X,
  Award,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { PushableButton } from "@/components/common/pushable-button";

interface SswExamInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SswExamInfoModal({ isOpen, onClose }: SswExamInfoModalProps) {
  const [activeSectorTab, setActiveSectorTab] = useState<string>("kaigo");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sectors = [
    {
      id: "kaigo",
      name: "Kaigo (Perawat Lansia)",
      japaneseName: "介護",
      fee: "Rp 350.000",
      duration: "60 menit (Teori & Bahasa)",
      slots: "Buka setiap bulan",
      nextBatch: "28 Oktober – 04 November 2026",
      quotaStatus: "Sisa 24 kursi di Jakarta",
      description:
        "Ujian evaluasi keterampilan khusus bidang perawatan lansia dan ujian evaluasi bahasa Jepang khusus keperawatan.",
      requirements: [
        "Minimal usia 17 tahun saat hari ujian",
        "Paspor RI atau e-KTP asli (tidak boleh fotokopi)",
        "Konfirmasi reservasi akun Prometric ID resmi",
      ],
    },
    {
      id: "pengolahan_makanan",
      name: "Pengolahan Makanan",
      japaneseName: "飲食料品製造業",
      fee: "Rp 400.000",
      duration: "80 menit (CBT Multi-Choice)",
      slots: "2 kali per kuartal",
      nextBatch: "10 – 16 November 2026",
      quotaStatus: "Pendaftaran dibuka 25 Okt 2026",
      description:
        "Ujian keahlian pembuatan makanan dan minuman, sanitasi HACCP, dan operasional manufaktur pangan di Jepang.",
      requirements: [
        "Usia minimal 17 tahun",
        "Wajib membawa ID Prometric berfoto",
        "Boleh diikuti lulusan SMK / SMA sederajat tanpa pengalaman",
      ],
    },
    {
      id: "restoran",
      name: "Restoran & Food Service",
      japaneseName: "外食業",
      fee: "Rp 400.000",
      duration: "70 menit (Pelayanan & Higienitas)",
      slots: "Tiap kuartal",
      nextBatch: "18 – 24 November 2026",
      quotaStatus: "Pendaftaran dibuka 01 Nov 2026",
      description:
        "Mencakup keterampilan layanan pelanggan (*setsuba*), sanitasi dapur, dan pengolahan hidangan restoran Jepang.",
      requirements: [
        "Paspor atau e-KTP aktif",
        "Bukti pembayaran Prometric voucher",
      ],
    },
    {
      id: "pertanian",
      name: "Pertanian & Budidaya",
      japaneseName: "農業",
      fee: "Rp 380.000",
      duration: "60 menit",
      slots: "3 kali setahun",
      nextBatch: "02 – 08 Desember 2026",
      quotaStatus: "Jadwal resmi diumumkan",
      description:
        "Ujian keterampilan budidaya tanaman pertanian (sayur/buah) dan peternakan (*chikusan*).",
      requirements: [
        "Minimal usia 17 tahun",
        "Kondisi fisik prima dan e-KTP resmi",
      ],
    },
  ];

  const testCenters = [
    {
      city: "Jakarta (Pusat)",
      venue: "Prometric Test Center — RDTX Square Lt. 18, Kuningan",
      address: "Jl. Prof. Dr. Satrio No. 164, Jakarta Selatan",
    },
    {
      city: "Bandung",
      venue: "Universitas Kristen Maranatha — Gedung B Lt. 3",
      address: "Jl. Prof. drg. Surya Sumantri No. 65, Bandung",
    },
    {
      city: "Surabaya",
      venue: "Test Center IT Sinarindo — Spazio Tower Lt. 5",
      address: "Jl. Mayjen Yono Suwoyo Kav. 3, Surabaya Barat",
    },
    {
      city: "Medan",
      venue: "PT Bina Insani Test Center — Medan City Center",
      address: "Jl. Balai Kota No. 1, Medan, Sumatera Utara",
    },
  ];

  const activeSector = sectors.find((s) => s.id === activeSectorTab) || sectors[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-ssw-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 overflow-hidden cursor-default"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#181C24] to-[#2B323D] text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-[11px] font-semibold border border-white/15">
              <Award className="w-3.5 h-3.5 text-[#DA7A7A]" />
              <span>Prometric Japan Official Center</span>
            </div>
            <h2 id="modal-ssw-title" className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Info & Jadwal Ujian SSW Prometric
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Jadwal reservasi tes keahlian Tokutei Ginou (SSW 1) resmi di Indonesia 2026/2027.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Tutup jendela info SSW"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Sector Tabs */}
          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
              Pilih Bidang Ujian Keahlian
            </label>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sec) => {
                const isActive = activeSectorTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSectorTab(sec.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-[#C12121] text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-[#0A0A0A] border border-slate-200/80"
                    }`}
                  >
                    <span>{sec.name}</span>
                    <span className="font-mono text-[11px] opacity-80 font-normal">
                      ({sec.japaneseName})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Sector Card */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-base font-extrabold text-[#0A0A0A] block">
                  {activeSector.name}
                </span>
                <p className="text-xs text-[#64748B] mt-0.5">{activeSector.description}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#107C41] border border-[#A7F3D0] self-start sm:self-auto shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeSector.quotaStatus}</span>
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200/70 space-y-0.5">
                <span className="text-[11px] text-[#64748B] font-medium block">Biaya Ujian</span>
                <span className="text-sm font-bold text-[#0A0A0A] block">{activeSector.fee}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/70 space-y-0.5">
                <span className="text-[11px] text-[#64748B] font-medium block">Durasi Ujian</span>
                <span className="text-sm font-bold text-[#0A0A0A] block">{activeSector.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200/70 space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-[#64748B] font-medium block">Gelombang Terdekat</span>
                <span className="text-xs font-bold text-[#C12121] block">{activeSector.nextBatch}</span>
              </div>
            </div>

            {/* Syarat Peserta */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-[#0A0A0A] block">Syarat Peserta:</span>
              <ul className="space-y-1 text-xs text-[#4A5565]">
                {activeSector.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#107C41] shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Test Center Locations */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C12121]" />
              <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider">
                Lokasi Test Center Resmi di Indonesia
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {testCenters.map((tc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 space-y-1 transition-colors"
                >
                  <span className="text-xs font-bold text-[#0A0A0A] block">{tc.city}</span>
                  <p className="text-[11px] font-medium text-[#475569] leading-tight">{tc.venue}</p>
                  <p className="text-[10px] text-[#94A3B8]">{tc.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Alert Box */}
          <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-2.5 text-xs text-[#92400E]">
            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Tips Timedoor:</strong> Kuota ujian Prometric di Jakarta dan Surabaya sangat cepat habis (dalam 15 menit setelah pendaftaran dibuka). Pastikan akun Prometric ID Anda sudah dibuat dan diverifikasi minimal H-3 sebelum tanggal pendaftaran.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#64748B] text-center sm:text-left">
            Butuh bimbingan pendaftaran akun Prometric? Hubungi mentor Timedoor.
          </span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[8px] text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors w-full sm:w-auto cursor-pointer"
            >
              Tutup
            </button>
            <PushableButton
              href="https://www.prometric-jp.com/ssw/"
              size="sm"
              className="w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-1.5">
                <span>Daftar di Prometric</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </PushableButton>
          </div>
        </div>
      </div>
    </div>
  );
}
