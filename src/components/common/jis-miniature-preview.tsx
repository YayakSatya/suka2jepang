import React from "react";
import { User, Download } from "lucide-react";

interface JISMiniaturePreviewProps {
  title?: string;
  subtitle?: string;
  candidateName?: string;
  onDownload?: () => void;
  className?: string;
  downloadLabel?: string;
}

export function JISMiniaturePreview({
  title = "Preview CV",
  subtitle = "Format Timedoor",
  candidateName,
  onDownload,
  className = "",
  downloadLabel = "Download CV (PDF)",
}: JISMiniaturePreviewProps) {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="type-label font-bold text-[#0A0A0A]">{title}</h2>
        <span className="type-caption text-[#64748B]">{subtitle}</span>
      </div>

      {/* Rirekisho Visual Miniature Paper */}
      <div className="border border-slate-300 rounded-lg p-4 bg-white space-y-3 shadow-2xs select-none">
        {/* Document Title Header */}
        <div className="text-center font-mono font-bold text-sm tracking-[0.3em] text-[#0A0A0A] border-b border-slate-200 pb-1.5">
          履 歴 書
        </div>

        {/* Candidate Photo & Basic Info Block */}
        <div className="flex gap-2.5 items-start">
          <div className="flex-1 space-y-1.5 pt-0.5">
            {/* Name block */}
            {candidateName ? (
              <div className="text-[11px] font-bold text-[#0A0A0A] leading-tight truncate">
                {candidateName}
              </div>
            ) : (
              <div className="h-3.5 bg-[#1E2939] rounded-xs w-4/5" />
            )}
            {/* Furigana */}
            <div className="h-2 bg-slate-400 rounded-xs w-3/5" />
            {/* Birthdate & Age */}
            <div className="h-2 bg-slate-300 rounded-xs w-1/2" />
            {/* Address line */}
            <div className="h-2 bg-slate-200 rounded-xs w-full" />
          </div>

          {/* Photo 3x4 Box Placeholder */}
          <div className="w-12 h-16 border border-slate-300 rounded-xs bg-slate-50 shrink-0 flex flex-col items-center justify-center p-1">
            <User className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Middle Info Table Skeleton Lines */}
        <div className="space-y-1 pt-1.5 border-t border-slate-200">
          <div className="flex gap-2">
            <div className="h-2 bg-slate-200 rounded-xs w-1/2" />
            <div className="h-2 bg-slate-200 rounded-xs w-1/2" />
          </div>
          <div className="flex gap-2">
            <div className="h-2 bg-slate-200 rounded-xs w-1/2" />
            <div className="h-2 bg-slate-200 rounded-xs w-1/2" />
          </div>
        </div>

        {/* Education & Work Experience (学歴・職歴) */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200">
          <span className="text-[10px] font-mono font-bold text-slate-600 block">
            学歴・職歴
          </span>
          <div className="h-2 bg-slate-300 rounded-xs w-full" />
          <div className="h-2 bg-slate-200 rounded-xs w-11/12" />
          <div className="h-2 bg-slate-200 rounded-xs w-4/5" />
          <div className="h-2 bg-slate-200 rounded-xs w-9/12" />
        </div>
      </div>

      {/* Action Button: Download CV */}
      <button
        type="button"
        onClick={onDownload}
        className="w-full h-11 px-4 rounded-[8px] bg-[#181C24] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4 text-white" />
        <span>{downloadLabel}</span>
      </button>
    </div>
  );
}
