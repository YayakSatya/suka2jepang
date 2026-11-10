"use client";

import React from "react";
import Link from "next/link";
import {
  Bookmark,
  MapPin,
  Users,
  JapaneseYen,
  Check,
  X,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { JobItem } from "@/types/job-apply";
import { PushableButton } from "@/components/common/pushable-button";
import { MatchScoreBadge } from "./match-score-badge";

interface JobCardProps {
  job: JobItem;
  showMatchScore?: boolean;
  showBookmark?: boolean;
  forceOpenAction?: boolean;
  onBookmark?: (jobId: string) => void;
  isBookmarked?: boolean;
}

export function JobCard({
  job,
  showMatchScore = false,
  showBookmark = false,
  forceOpenAction = false,
  onBookmark,
  isBookmarked = false,
}: JobCardProps) {
  const {
    id,
    sectorLabel,
    sectorKanji,
    title,
    companyName,
    location,
    salaryGrossDisplay,
    hourlyRateDisplay,
    positionsDisplay,
    tags,
    status,
    urgencyText,
    matchScore,
    matchDetails,
    appliedStageText,
    appliedDate,
    appliedStagesCount,
  } = job;

  // Determine status configurations
  const isApplied = status === "applied";
  const isRestrictedDomicile = status === "restricted_domicile";
  const isClosed = status === "closed";
  const isAlmostClosed = status === "almost_closed";
  const isExclusiveTimedoor = status === "exclusive_timedoor";

  return (
    <article className="job-card bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-[18px] p-5 md:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] relative group">
      {/* Top Header: Category Tag (No internal code) */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#155DFC] border border-[#DBEAFE]">
            <span>{sectorLabel}</span>
            {sectorKanji && (
              <span className="font-mono text-[11px] opacity-75 font-normal">
                {sectorKanji}
              </span>
            )}
          </span>

          {showBookmark && (
            <button
              type="button"
              onClick={() => onBookmark?.(id)}
              className={`w-8 h-8 rounded-[8px] border flex items-center justify-center transition-colors ${
                isBookmarked
                  ? "bg-[#F9E9E9] border-[#DA7A7A] text-[#C12121]"
                  : "border-[#E5E5E5] text-[#99A1AF] hover:text-[#0A0A0A] hover:bg-gray-50"
              }`}
              aria-label="Simpan Lowongan"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Match Percentage Mode (For You view) */}
        {showMatchScore && matchScore !== undefined ? (
          <div className="flex items-start gap-4 mb-4">
            <MatchScoreBadge score={matchScore} />
            <div className="flex-1 min-w-0">
              <Link href={`/job-apply/jobs/${id}`} className="hover:underline">
                <h3 className="text-base md:text-lg font-bold text-[#0A0A0A] leading-snug truncate">
                  {title}
                </h3>
              </Link>
              <p className="text-xs text-[#6A7282] mt-0.5">
                {location} · {positionsDisplay}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <Link href={`/job-apply/jobs/${id}`} className="hover:underline">
              <h3 className="text-lg font-bold text-[#0A0A0A] leading-snug group-hover:text-[#C12121] transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-[#4A5565] font-medium mt-0.5">{companyName}</p>
          </div>
        )}

        {/* Info Grid (Location, Salary, Positions) - Perfectly aligned with Lucide icons */}
        {!showMatchScore && (
          <div className="space-y-2 text-xs text-[#4A5565] mb-4">
            {/* Location */}
            {location && (
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#94A3B8]">
                  <MapPin className="w-3.5 h-3.5 stroke-[2]" />
                </span>
                <span className="truncate">{location}</span>
              </div>
            )}

            {/* Salary */}
            {salaryGrossDisplay && (
              <div className="flex items-center gap-2.5 font-semibold text-[#0A0A0A]">
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#C12121]">
                  <JapaneseYen className="w-3.5 h-3.5 stroke-[2.2]" />
                </span>
                <span className="truncate">
                  {salaryGrossDisplay}
                  {hourlyRateDisplay && (
                    <span className="text-[#64748B] font-normal ml-1">· {hourlyRateDisplay}</span>
                  )}
                </span>
              </div>
            )}

            {/* Positions / Quota */}
            {positionsDisplay && !isApplied && !isRestrictedDomicile && (
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#94A3B8]">
                  <Users className="w-3.5 h-3.5 stroke-[2]" />
                </span>
                <span className="truncate">{positionsDisplay}</span>
              </div>
            )}
          </div>
        )}

        {/* Match Details Criteria Tags (For You Page) */}
        {matchDetails && matchDetails.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {matchDetails.map((item, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.matched
                    ? "bg-[#ECFDF5] text-[#107C41]"
                    : "bg-[#FFF1F2] text-[#BE2528]"
                }`}
              >
                {item.matched ? (
                  <Check className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <X className="w-3 h-3 stroke-[2.5]" />
                )}
                {item.label}
              </span>
            ))}
          </div>
        )}

        {/* Benefit & Feature Chips */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, idx) => {
              const isTimedoorSpecial = isExclusiveTimedoor || tag.toLowerCase().includes("siswa timedoor");
              return (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isTimedoorSpecial
                      ? "bg-[#182B49] text-white font-medium"
                      : "bg-[#F3F4F6] text-[#4A5565]"
                  }`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* State Banner: Applied State */}
        {isApplied && (
          <div className="mb-4 p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-xs font-semibold text-[#107C41]">
            <Check className="w-4 h-4 text-[#107C41] stroke-[2.5]" />
            <span>
              Dilamar {appliedDate} · {appliedStageText}
            </span>
          </div>
        )}

        {/* State Banner: Restricted Domicile */}
        {isRestrictedDomicile && (
          <div className="mb-4 p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center gap-2 text-xs font-medium text-[#973C00]">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 stroke-[2]" />
            <span>Hanya untuk pelamar yang tinggal di Jepang</span>
          </div>
        )}
      </div>

      {/* Footer Area: Urgency & Action Button */}
      <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between gap-3 mt-2">
        <div className="text-xs text-[#6A7282] font-medium">
          {isRestrictedDomicile ? (
            <span>{positionsDisplay || "1 posisi"}</span>
          ) : isApplied ? (
            <span>{appliedStagesCount || "1 dari 5 tahap"}</span>
          ) : urgencyText?.startsWith("• Baru") ? (
            <span className="inline-flex items-center gap-1.5 text-[#107C41] font-semibold text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" />
              {urgencyText.replace("• ", "")}
            </span>
          ) : isAlmostClosed || urgencyText?.includes("Tutup") ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#FEF3C7] text-[#92400E] font-semibold text-xs">
              <Clock className="w-3.5 h-3.5 stroke-[2]" />
              {urgencyText || "Tutup 3 hari lagi"}
            </span>
          ) : (
            <span>{urgencyText || "Status Open"}</span>
          )}
        </div>

        <div>
          {forceOpenAction ? (
            <PushableButton href={`/job-apply/jobs/${id}`} size="sm">
              Lihat & Lamar
            </PushableButton>
          ) : isApplied ? (
            <PushableButton
              variant="secondary"
              href="/job-apply/my-applications"
              size="sm"
            >
              Lihat status
            </PushableButton>
          ) : isRestrictedDomicile ? (
            <PushableButton variant="disabled" size="sm" disabled>
              Tidak bisa dilamar
            </PushableButton>
          ) : isClosed ? (
            <PushableButton variant="disabled" size="sm" disabled>
              Ditutup
            </PushableButton>
          ) : (
            <PushableButton href={`/job-apply/jobs/${id}`} size="sm">
              Lihat & Lamar
            </PushableButton>
          )}
        </div>
      </div>
    </article>
  );
}
