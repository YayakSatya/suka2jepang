"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Award, Check, ChevronDown } from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";
import { JobCard } from "@/components/job-apply/job-card";
import { PushableButton } from "@/components/common/pushable-button";

export default function JobCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9FAFB] py-8 text-center text-sm text-slate-500">Memuat katalog lowongan...</div>}>
      <JobCatalogContent />
    </Suspense>
  );
}

function JobCatalogContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";
  const initialSector = searchParams?.get("sector") || "";

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(
    initialSector ? [initialSector] : initialQ ? [] : ["pengolahan_makanan"]
  );
  const [prefectureFilter, setPrefectureFilter] = useState<string>("all");
  const [domicileFilter, setDomicileFilter] = useState<string>("sesuai");
  const [facilities, setFacilities] = useState<{
    dorm: boolean;
    hijab: boolean;
    noExp: boolean;
  }>({
    dorm: false,
    hijab: false,
    noExp: false,
  });
  const [sortBy, setSortBy] = useState("terbaru");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const sectors = [
    { id: "kaigo", label: "Kaigo", kanji: "介護" },
    { id: "kensetsu", label: "Kensetsu", kanji: "建設" },
    { id: "gijinkoku", label: "Gijinkoku", kanji: "技人国" },
    { id: "pengolahan_makanan", label: "Pengolahan Makanan", kanji: "飲食料品製造" },
    { id: "restoran", label: "Restoran", kanji: "外食" },
    { id: "manufaktur", label: "Manufaktur", kanji: "製造業" },
    { id: "pertanian", label: "Pertanian", kanji: "農業" },
  ];

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSectors([]);
    setPrefectureFilter("all");
    setDomicileFilter("semua");
    setFacilities({ dorm: false, hijab: false, noExp: false });
    setSortBy("terbaru");
    setCurrentPage(1);
  };

  const toggleSector = (id: string) => {
    setCurrentPage(1);
    if (selectedSectors.includes(id)) {
      setSelectedSectors(selectedSectors.filter((s) => s !== id));
    } else {
      setSelectedSectors([...selectedSectors, id]);
    }
  };

  // Dynamic Multi-Criteria Filtering Engine
  const filteredJobs = useMemo(() => {
    let result = [...MOCK_JOBS];

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.companyName.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.sectorLabel.toLowerCase().includes(q) ||
          job.sectorKanji.includes(q)
      );
    }

    // 2. Sector Filter (if any selected)
    if (selectedSectors.length > 0) {
      result = result.filter((job) => selectedSectors.includes(job.sector));
    }

    // 3. Prefecture Filter
    if (prefectureFilter !== "all") {
      result = result.filter(
        (job) =>
          job.prefecture.toLowerCase() === prefectureFilter.toLowerCase() ||
          job.location.toLowerCase().includes(prefectureFilter.toLowerCase())
      );
    }

    // 4. Domicile Filter
    if (domicileFilter === "sesuai") {
      // Exclude restricted domicile jobs (jobs only for candidates already living in Japan)
      result = result.filter((job) => job.status !== "restricted_domicile");
    }

    // 5. Facilities Filter
    if (facilities.dorm) {
      result = result.filter((job) =>
        job.tags.some((tag) => tag.toLowerCase().includes("asrama"))
      );
    }

    if (facilities.hijab) {
      result = result.filter(
        (job) =>
          job.requirements?.hijabPolicy?.toLowerCase().includes("boleh") ||
          job.tags.some((tag) => tag.toLowerCase().includes("hijab"))
      );
    }

    if (facilities.noExp) {
      result = result.filter(
        (job) =>
          job.requirements?.japanExperience?.toLowerCase().includes("tidak") ||
          job.tags.some((tag) => tag.toLowerCase().includes("tanpa"))
      );
    }

    // 6. Sorting
    if (sortBy === "gaji") {
      result.sort((a, b) => {
        const getSalaryNum = (val: string) => {
          const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
          return isNaN(num) ? 0 : num;
        };
        const salaryA = a.salaryBreakdown?.gross.total || getSalaryNum(a.salaryGrossDisplay);
        const salaryB = b.salaryBreakdown?.gross.total || getSalaryNum(b.salaryGrossDisplay);
        return salaryB - salaryA;
      });
    } else if (sortBy === "deadline") {
      result.sort((a, b) => {
        const scoreA = a.status === "almost_closed" ? 2 : a.applicationDeadline ? 1 : 0;
        const scoreB = b.status === "almost_closed" ? 2 : b.applicationDeadline ? 1 : 0;
        return scoreB - scoreA;
      });
    }

    return result;
  }, [searchQuery, selectedSectors, prefectureFilter, domicileFilter, facilities, sortBy]);

  // Pagination Calculation
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage));
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Top Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-[#0A0A0A] tracking-tight flex items-baseline gap-2.5">
              <span>Lowongan Kerja</span>
              <span className="font-mono text-lg md:text-xl font-normal text-[#64748B]">
                求人
              </span>
            </h1>
            <p className="text-sm text-[#4A5565] mt-1">
              {MOCK_JOBS.length} lowongan terbuka di Jepang · diperbarui 20 Okt 2026
            </p>
          </div>

          {/* Search Pill Input */}
          <div className="relative w-full md:w-[380px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Cari posisi, prefektur, perusahaan..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-11 pr-4 rounded-full border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#C12121] text-[#0A0A0A] placeholder-slate-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            />
          </div>
        </div>

        {/* Certified Status Banner */}
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-3.5 shadow-xs">
          <div className="w-9 h-9 rounded-full bg-[#065F46] text-white flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#065F46]">
              Job Matching Test · Certified (Budi Santoso)
            </h2>
            <p className="text-xs text-[#065F46]/85 mt-0.5">
              Kamu sudah memenuhi syarat untuk melamar lowongan visa Tokutei Ginou sesuai sertifikat dan domisili.
            </p>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filter + Job Grid) */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Filter Sidebar */}
          <aside className="w-full lg:w-[260px] xl:w-[270px] shrink-0 bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-base font-bold text-[#0A0A0A]">Filter</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-[#C12121] hover:underline transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Filter: BIDANG */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                BIDANG
              </span>
              <div className="space-y-2.5">
                {sectors.map((sec) => {
                  const isChecked = selectedSectors.includes(sec.id);
                  return (
                    <label
                      key={sec.id}
                      onClick={() => toggleSector(sec.id)}
                      className="flex items-center justify-between text-xs text-[#0A0A0A] cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-[#C12121] text-white"
                              : "border border-slate-300 group-hover:border-slate-400 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium text-[#1E293B] group-hover:text-[#C12121] transition-colors">
                          {sec.label}
                        </span>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px]">
                        {sec.kanji}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter: PREFEKTUR */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                PREFEKTUR
              </label>
              <div className="relative">
                <select
                  value={prefectureFilter}
                  onChange={(e) => {
                    setPrefectureFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full h-10 px-3 pr-8 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer"
                >
                  <option value="all">Semua prefektur</option>
                  <option value="Kagoshima">Kagoshima</option>
                  <option value="Ehime">Ehime</option>
                  <option value="Ishikawa">Ishikawa</option>
                  <option value="Okayama">Okayama</option>
                  <option value="Okinawa">Okinawa</option>
                  <option value="Hokkaido">Hokkaido</option>
                  <option value="Osaka">Osaka</option>
                  <option value="Tochigi">Tochigi</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Filter: DOMISILI PELAMAR */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                DOMISILI PELAMAR
              </span>
              <div className="space-y-2">
                <label
                  onClick={() => {
                    setDomicileFilter("sesuai");
                    setCurrentPage(1);
                  }}
                  className="flex items-center gap-2.5 text-xs text-[#0A0A0A] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      domicileFilter === "sesuai"
                        ? "border-[#C12121] bg-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {domicileFilter === "sesuai" && (
                      <div className="w-2 h-2 rounded-full bg-[#C12121]" />
                    )}
                  </div>
                  <span className="font-medium text-[#1E293B]">Sesuai domisili saya (RI)</span>
                </label>

                <label
                  onClick={() => {
                    setDomicileFilter("semua");
                    setCurrentPage(1);
                  }}
                  className="flex items-center gap-2.5 text-xs text-[#0A0A0A] cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      domicileFilter === "semua"
                        ? "border-[#C12121] bg-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {domicileFilter === "semua" && (
                      <div className="w-2 h-2 rounded-full bg-[#C12121]" />
                    )}
                  </div>
                  <span className="font-medium text-[#1E293B]">Tampilkan semua (termasuk Jepang)</span>
                </label>
              </div>
            </div>

            {/* Filter: FASILITAS */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                FASILITAS
              </span>
              <div className="space-y-2.5">
                {[
                  { key: "dorm" as const, label: "Asrama tersedia" },
                  { key: "hijab" as const, label: "Boleh berhijab" },
                  { key: "noExp" as const, label: "Tanpa pengalaman" },
                ].map((item) => {
                  const isChecked = facilities[item.key];
                  return (
                    <label
                      key={item.key}
                      onClick={() => {
                        setFacilities({ ...facilities, [item.key]: !isChecked });
                        setCurrentPage(1);
                      }}
                      className="flex items-center gap-2.5 text-xs text-[#0A0A0A] cursor-pointer select-none group"
                    >
                      <div
                        className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-[#C12121] text-white"
                            : "border border-slate-300 group-hover:border-slate-400 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-medium text-[#1E293B] group-hover:text-[#C12121] transition-colors">
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Main Grid */}
          <section className="flex-1 min-w-0 space-y-5">
            {/* Top Counter & Sort */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#0A0A0A]">
                <strong>{filteredJobs.length}</strong> lowongan ditemukan
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-9 pl-3 pr-8 text-xs font-semibold bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#C12121] text-[#0A0A0A] appearance-none cursor-pointer shadow-xs"
                >
                  <option value="terbaru">Urutkan: Terbaru</option>
                  <option value="gaji">Gaji Tertinggi</option>
                  <option value="deadline">Batas Waktu Terdekat</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Job Grid or Senior Empty State */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-[#FEECEC] text-[#C12121] flex items-center justify-center mx-auto shadow-xs">
                  <Search className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-[#0A0A0A]">
                    Tidak ada lowongan yang sesuai kriteria
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Coba sesuaikan kata kunci pencarian atau reset filter bidang, prefektur, dan fasilitas di sebelah kiri.
                  </p>
                </div>
                <PushableButton onClick={handleReset} size="sm">
                  Reset Semua Filter
                </PushableButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginatedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    showBookmark={false}
                    forceOpenAction={true}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls (Active when > 1 page) */}
            {filteredJobs.length > itemsPerPage && (
              <div className="pt-6 flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`w-9 h-9 rounded-lg border text-xs font-semibold flex items-center justify-center select-none shadow-xs transition-colors ${
                    currentPage === 1
                      ? "border-slate-200 bg-white text-slate-300 cursor-not-allowed"
                      : "border-slate-200 hover:border-slate-400 bg-white text-[#4A5565] cursor-pointer"
                  }`}
                  aria-label="Halaman sebelumnya"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center shadow-xs select-none transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#0A0A0A] text-white"
                        : "border border-slate-200 hover:border-slate-400 bg-white text-[#4A5565]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={`w-9 h-9 rounded-lg border text-xs font-semibold flex items-center justify-center select-none shadow-xs transition-colors ${
                    currentPage === totalPages
                      ? "border-slate-200 bg-white text-slate-300 cursor-not-allowed"
                      : "border-slate-200 hover:border-slate-400 bg-white text-[#4A5565] cursor-pointer"
                  }`}
                  aria-label="Halaman berikutnya"
                >
                  &gt;
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
