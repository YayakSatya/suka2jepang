"use client";

import React from "react";
import { JobCard } from "@/components/job-apply/job-card";
import { JobItem } from "@/types/job-apply";

export default function CardVariationsShowroom() {
  // 6 specific job models tailored to showcase each exact status variation from Card job status Variation.jpg
  const variations: Array<{
    label: string;
    desc: string;
    job: JobItem;
  }> = [
    {
      label: "Default",
      desc: "Status Open, belum dilamar",
      job: {
        id: "kg-089",
        jobCode: "KG-089",
        sector: "kaigo",
        sectorLabel: "Perawatan Lansia",
        sectorKanji: "介護",
        title: "Caregiver Panti Jompo",
        companyName: "Kuma no Sato",
        location: "Kumakogen, Ehime",
        prefecture: "Ehime",
        salaryGrossDisplay: "±¥250.000 /bulan (kotor)",
        positionsCount: 4,
        positionsDisplay: "4 posisi",
        tags: ["Asrama (live-in)", "Bonus 2x/tahun"],
        status: "default",
        urgencyText: "Diterima 11 Agu 2026",
      },
    },
    {
      label: "Hampir ditutup",
      desc: "Batas waktu ≤ 3 hari",
      job: {
        id: "pm-012",
        jobCode: "PM-012",
        sector: "pengolahan_makanan",
        sectorLabel: "Pengolahan Makanan",
        sectorKanji: "飲食料品製造",
        title: "Staf Produksi Makanan Beku",
        companyName: "PT Hatanaka Shokuhin",
        location: "Izumi, Kagoshima",
        prefecture: "Kagoshima",
        salaryGrossDisplay: "¥183.225 /bulan",
        positionsCount: 14,
        positionsDisplay: "14 posisi · Pria & Wanita",
        tags: ["Asrama ¥20.000/bln", "Sistem shift"],
        status: "almost_closed",
        urgencyText: "Tutup 3 hari lagi",
      },
    },
    {
      label: "Khusus siswa Timedoor",
      desc: 'Status "Open untuk siswa timedoor"',
      job: {
        id: "ng-013",
        jobCode: "NG-013",
        sector: "pertanian",
        sectorLabel: "Pertanian",
        sectorKanji: "農業",
        title: "Staf Pertanian",
        companyName: "Via GROP",
        location: "Okayama",
        prefecture: "Okayama",
        salaryGrossDisplay: "¥200.000 /bulan",
        positionsCount: 1,
        positionsDisplay: "1 posisi · Pria",
        tags: ["Khusus siswa Timedoor", "JLPT N3+"],
        status: "exclusive_timedoor",
        urgencyText: "Diterima 15 Okt 2026",
      },
    },
    {
      label: "Sudah dilamar",
      desc: "Menampilkan tahap seleksi terakhir",
      job: {
        id: "eg-039",
        jobCode: "EG-039",
        sector: "manufaktur",
        sectorLabel: "Gijinkoku · Pemesinan",
        sectorKanji: "機械加工",
        title: "Engineer Pemesinan",
        companyName: "Via CKJ",
        location: "Ishikawa",
        prefecture: "Ishikawa",
        salaryGrossDisplay: "¥249.000 /bulan",
        positionsCount: 5,
        positionsDisplay: "5 posisi · Pria",
        tags: ["JLPT N3+", "Lulusan teknik/sains", "Pelamar di Indonesia"],
        status: "applied",
        appliedDate: "10 Okt",
        appliedStageText: "Tahap: Interview TSK",
        appliedStagesCount: "2 dari 5 tahap",
        urgencyText: "Tanpa batas waktu",
      },
    },
    {
      label: "Tidak sesuai domisili",
      desc: 'Kandidat di Indonesia, loker "Only di Jepang"',
      job: {
        id: "gs-027",
        jobCode: "GS-027",
        sector: "restoran",
        sectorLabel: "Restoran",
        sectorKanji: "外食",
        title: "Staf Restoran",
        companyName: "PLUS2 Co., Ltd.",
        location: "Hokkaido",
        prefecture: "Hokkaido",
        salaryGrossDisplay: "[Gaji dari perusahaan]",
        positionsCount: 1,
        positionsDisplay: "1 posisi",
        tags: ["Hanya pelamar di Jepang"],
        status: "restricted_domicile",
      },
    },
    {
      label: "Ditutup",
      desc: "Status Close / batas waktu lewat",
      job: {
        id: "sg-012",
        jobCode: "SG-012",
        sector: "manufaktur",
        sectorLabel: "Manufaktur",
        sectorKanji: "工業製品製造業",
        title: "Operator Produksi Logam",
        companyName: "Via GROP",
        location: "Tochigi",
        prefecture: "Tochigi",
        salaryGrossDisplay: "",
        positionsCount: 4,
        positionsDisplay: "4 posisi · maks. 30 tahun",
        tags: ["Min. SMA", "Mantan peserta magang"],
        status: "closed",
        urgencyText: "Ditutup 3 Okt 2026",
      },
    },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F9FAFB] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-[#0A0A0A] tracking-tight">
            Card Job · variasi status
          </h1>
          <p className="text-sm text-[#4A5565] mt-1.5 max-w-3xl leading-relaxed">
            Satu komponen card (<code className="text-xs bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono">.job-card</code>) untuk semua lowongan. Kolom &ldquo;Status Loker&rdquo;, &ldquo;Batas Waktu&rdquo; dan &ldquo;Domisili&rdquo; di spreadsheet menentukan badge dan tombol di bagian bawah.
          </p>
        </div>

        {/* 3x2 Grid Showroom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variations.map((item, index) => (
            <div key={index} className="space-y-2.5">
              {/* Variation Header Kicker */}
              <div className="px-0.5">
                <span className="text-sm font-bold text-[#0A0A0A] block">
                  {item.label}
                </span>
                <span className="text-xs text-[#64748B] block mt-0.5">
                  {item.desc}
                </span>
              </div>

              {/* Standardized Job Card Component */}
              <JobCard job={item.job} showBookmark={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
