"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { PushableButton } from "@/components/common/pushable-button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PersonalizePage() {
  const router = useRouter();

  // State
  const [visaType, setVisaType] = useState<string>("tokutei_ginou");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([
    "pengolahan_makanan",
    "kaigo",
  ]);
  const [sswCert, setSswCert] = useState<string>("belum_ada");
  const [japaneseLevel, setJapaneseLevel] = useState<string>("sedang_belajar");
  const [domicile, setDomicile] = useState<string>("indonesia");
  const [referralSource, setReferralSource] = useState<string>("facebook");
  const [waNotification, setWaNotification] = useState<boolean>(true);

  const sectors = [
    { id: "pengolahan_makanan", label: "Pengolahan makanan" },
    { id: "kaigo", label: "Kaigo" },
    { id: "restoran", label: "Restoran" },
    { id: "perhotelan", label: "Perhotelan" },
    { id: "pertanian", label: "Pertanian" },
    { id: "konstruksi", label: "Konstruksi" },
    { id: "manufaktur", label: "Manufaktur" },
    { id: "perawatan_mobil", label: "Perawatan mobil" },
    { id: "transportasi", label: "Transportasi" },
    { id: "perikanan", label: "Perikanan" },
  ];

  const toggleSector = (id: string) => {
    if (selectedSectors.includes(id)) {
      setSelectedSectors(selectedSectors.filter((s) => s !== id));
    } else {
      setSelectedSectors([...selectedSectors, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/job-apply/for-you");
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vertical Stepper (Directly mirroring Personalize.jpg) */}
        <aside className="lg:col-span-4 pt-2">
          <div className="space-y-6">
            {/* Step 1: Buat akun (Completed) */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A0A0A] leading-tight">Buat akun</p>
                <p className="text-xs text-[#737373] mt-1">Nama, WhatsApp, kata sandi</p>
              </div>
            </div>

            {/* Step 2: Verifikasi WhatsApp (Completed) */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A0A0A] leading-tight">Verifikasi WhatsApp</p>
                <p className="text-xs text-[#737373] mt-1">Kode OTP 6 digit</p>
              </div>
            </div>

            {/* Step 3: Tujuan kerja (Active - Enclosed in White Card) */}
            <div className="p-4 rounded-[16px] bg-white border border-[#E5E5E5] shadow-sm flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A0A0A] leading-tight">Tujuan kerja</p>
                <p className="text-xs text-[#737373] mt-1">Untuk rekomendasi loker</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Main Wizard Form Card */}
        <section className="lg:col-span-8 bg-white border border-[#E5E5E5] rounded-[24px] p-6 sm:p-10 md:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div>
              <span className="text-xs font-bold text-[#C12121] tracking-wide block mb-1">
                Langkah 3 dari 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                Kamu ingin kerja apa di Jepang?
              </h1>
              <p className="text-sm text-[#4A5565] mt-1.5 leading-relaxed">
                Jawabanmu dipakai untuk menampilkan loker yang cocok. Bisa diubah kapan saja.
              </p>
            </div>

            {/* Fieldset 1: Jenis Visa (Radio Cards) */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#0A0A0A]">Jenis visa</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Tokutei Ginou */}
                <div
                  onClick={() => setVisaType("tokutei_ginou")}
                  className={`p-4 rounded-[14px] border cursor-pointer transition-all ${
                    visaType === "tokutei_ginou"
                      ? "border-2 border-[#C12121] bg-[#FCF4F4]/50 shadow-sm"
                      : "border-[#E5E5E5] hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        visaType === "tokutei_ginou"
                          ? "border-[#C12121]"
                          : "border-[#D1D5DC]"
                      }`}
                    >
                      {visaType === "tokutei_ginou" && (
                        <span className="w-2 h-2 rounded-full bg-[#C12121]" />
                      )}
                    </span>
                    <span className="text-sm font-bold text-[#0A0A0A]">
                      Tokutei Ginou (SSW)
                    </span>
                  </div>
                  <p className="text-xs text-[#737373] mt-2.5 leading-relaxed pl-6.5">
                    Lulusan SMA/SMK, punya atau sedang siapkan sertifikat SSW
                  </p>
                </div>

                {/* Gijinkoku */}
                <div
                  onClick={() => setVisaType("gijinkoku")}
                  className={`p-4 rounded-[14px] border cursor-pointer transition-all ${
                    visaType === "gijinkoku"
                      ? "border-2 border-[#C12121] bg-[#FCF4F4]/50 shadow-sm"
                      : "border-[#E5E5E5] hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        visaType === "gijinkoku"
                          ? "border-[#C12121]"
                          : "border-[#D1D5DC]"
                      }`}
                    >
                      {visaType === "gijinkoku" && (
                        <span className="w-2 h-2 rounded-full bg-[#C12121]" />
                      )}
                    </span>
                    <span className="text-sm font-bold text-[#0A0A0A]">Gijinkoku</span>
                  </div>
                  <p className="text-xs text-[#737373] mt-2.5 leading-relaxed pl-6.5">
                    Lulusan D3/S1, minimal JLPT N3
                  </p>
                </div>

                {/* Belum Tahu */}
                <div
                  onClick={() => setVisaType("unknown")}
                  className={`p-4 rounded-[14px] border cursor-pointer transition-all ${
                    visaType === "unknown"
                      ? "border-2 border-[#C12121] bg-[#FCF4F4]/50 shadow-sm"
                      : "border-[#E5E5E5] hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        visaType === "unknown"
                          ? "border-[#C12121]"
                          : "border-[#D1D5DC]"
                      }`}
                    >
                      {visaType === "unknown" && (
                        <span className="w-2 h-2 rounded-full bg-[#C12121]" />
                      )}
                    </span>
                    <span className="text-sm font-bold text-[#0A0A0A]">Belum tahu</span>
                  </div>
                  <p className="text-xs text-[#737373] mt-2.5 leading-relaxed pl-6.5">
                    Admin akan bantu arahkan
                  </p>
                </div>
              </div>
            </div>

            {/* Fieldset 2: Bidang yang Diminati (Chips with Checkbox Icons) */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-[#0A0A0A]">
                Bidang yang diminati{" "}
                <span className="text-xs font-normal text-[#6A7282]">
                  (boleh lebih dari satu)
                </span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {sectors.map((sector) => {
                  const isChecked = selectedSectors.includes(sector.id);
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => toggleSector(sector.id)}
                      className={`h-10 px-4 rounded-full text-xs font-semibold border flex items-center gap-2.5 transition-all select-none ${
                        isChecked
                          ? "border-[#C12121] bg-white text-[#0A0A0A] shadow-xs"
                          : "border-[#E5E5E5] bg-white text-[#4A5565] hover:border-gray-400"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#C12121] border-[#C12121] text-white"
                            : "border-[#D1D5DC] bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span>{sector.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fieldset 3: Dropdowns Baris 1 (Sertifikat SSW & Bahasa Jepang) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Sertifikat SSW yang sudah lulus
                </label>
                <div className="relative">
                  <select
                    value={sswCert}
                    onChange={(e) => setSswCert(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                  >
                    <option value="belum_ada">Belum ada</option>
                    <option value="pengolahan_makanan">SSW Pengolahan Makanan</option>
                    <option value="kaigo">SSW Kaigo (Perawat Lansia)</option>
                    <option value="pertanian">SSW Pertanian</option>
                    <option value="manufaktur">SSW Manufaktur</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Bahasa Jepang saat ini
                </label>
                <div className="relative">
                  <select
                    value={japaneseLevel}
                    onChange={(e) => setJapaneseLevel(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                  >
                    <option value="sedang_belajar">Sedang belajar (belum ujian)</option>
                    <option value="jft_a2">JFT Basic A2</option>
                    <option value="jlpt_n5">JLPT N5</option>
                    <option value="jlpt_n4">JLPT N4</option>
                    <option value="jlpt_n3">JLPT N3</option>
                    <option value="jlpt_n2_n1">JLPT N2 / N1</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Fieldset 4: Dropdowns Baris 2 (Domisili & Sumber Informasi) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Domisili saat ini
                </label>
                <div className="relative">
                  <select
                    value={domicile}
                    onChange={(e) => setDomicile(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                  >
                    <option value="indonesia">Indonesia</option>
                    <option value="jepang">Jepang</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0A] mb-1.5">
                  Tahu Suka2Jepang dari
                </label>
                <div className="relative">
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 text-sm bg-white border border-[#D1D5DC] rounded-[8px] focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                  >
                    <option value="facebook">Grup Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="teman_lpk">Teman / Alumni LPK</option>
                    <option value="iklan">Iklan Google / TikTok</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6A7282] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Fieldset 5: WhatsApp Notification Opt-in (shadcn Checkbox) */}
            <div className="flex items-center gap-3 pt-2">
              <Checkbox
                id="wa-alert"
                checked={waNotification}
                onCheckedChange={(checked) => setWaNotification(!!checked)}
              />
              <label
                htmlFor="wa-alert"
                className="text-sm font-medium text-[#0A0A0A] select-none cursor-pointer leading-tight"
              >
                Kirim info loker baru yang cocok ke WhatsApp saya
              </label>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#F3F4F6] flex items-center justify-between gap-4">
              <PushableButton
                variant="secondary"
                onClick={() => router.back()}
                type="button"
              >
                Kembali
              </PushableButton>

              <PushableButton type="submit">Lihat loker untukku</PushableButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
