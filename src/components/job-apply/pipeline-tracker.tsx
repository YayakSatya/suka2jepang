"use client";

import React, { useState } from "react";
import { SelectionStage } from "@/types/job-apply";
import { AlertCircle, HelpCircle } from "lucide-react";

export interface PipelineTrackerProps {
  currentStage: SelectionStage;
  stageStatus: "passed" | "pending" | "scheduled" | "rejected";
  className?: string;
  rejectionNote?: string;
}

interface StageDefinition {
  key: SelectionStage;
  label: string;
}

const PIPELINE_STAGES: StageDefinition[] = [
  { key: "apply", label: "Apply" },
  { key: "interview_timedoor", label: "Interview Timedoor" },
  { key: "interview_tsk", label: "Interview TSK" },
  { key: "mensetsu", label: "Mensetsu" },
  { key: "naitei", label: "Naitei" },
];

export function PipelineTracker({
  currentStage,
  stageStatus,
  className = "",
  rejectionNote,
}: PipelineTrackerProps) {
  const currentIndex = PIPELINE_STAGES.findIndex((s) => s.key === currentStage);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className={`w-full ${className}`} aria-label="Progress Tahapan Seleksi">
      {/* 5-Stage Horizontal Progress Bars & Labels */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {PIPELINE_STAGES.map((stage, idx) => {
          let state: "passed" | "active" | "rejected" | "future" = "future";
          const labelText = stage.label;

          if (idx < currentIndex) {
            state = "passed";
          } else if (idx === currentIndex) {
            if (stageStatus === "rejected") {
              state = "rejected";
            } else if (stageStatus === "passed") {
              state = "passed";
            } else {
              state = "active";
            }
          } else {
            state = "future";
          }

          // Dynamic styling for bars
          let barClass = "bg-[#E5E7EB]";
          let textClass = "text-[#99A1AF] font-medium";

          if (state === "passed") {
            barClass = "bg-[#C12121]";
            textClass = "text-[#0A0A0A] font-semibold";
          } else if (state === "active") {
            barClass = "bg-[#FCA5A5] ring-2 ring-[#C12121]/20";
            textClass = "text-[#C12121] font-bold";
          } else if (state === "rejected") {
            barClass = "bg-[#94A3B8]";
            textClass = "text-[#475569] font-semibold";
          }

          return (
            <div
              key={stage.key}
              className="flex flex-col min-h-[48px]"
            >
              {/* Progress Line Bar */}
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-300 ${barClass}`}
                role="progressbar"
                aria-valuenow={state === "passed" ? 100 : state === "active" ? 50 : 0}
                aria-valuemin={0}
                aria-valuemax={100}
              />

              {/* Stage Label */}
              <span
                className={`text-[11px] sm:text-xs leading-tight mt-2 select-none transition-colors ${textClass}`}
              >
                {labelText}
              </span>

              {/* Sub-status Indicator */}
              {state === "rejected" ? (
                /* Focused Tooltip specifically on "Terhenti di sini" */
                <div className="relative group/tooltip inline-block mt-1">
                  <button
                    type="button"
                    onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsTooltipOpen(!isTooltipOpen);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-[#475569] hover:text-[#0A0A0A] bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 px-1.5 py-0.5 rounded cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400"
                    aria-label="Lihat catatan evaluasi seleksi"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] shrink-0" />
                    <span>Terhenti di sini</span>
                    <HelpCircle className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  </button>

                  {/* Contextual Tooltip Card specifically explaining why selection stopped */}
                  <div
                    role="tooltip"
                    className={`absolute bottom-full mb-2 left-0 sm:left-1/2 sm:-translate-x-1/2 z-50 w-64 sm:w-72 p-3 rounded-xl bg-[#0F172A] text-white shadow-2xl border border-slate-700/80 transition-all duration-200 select-none ${
                      isTooltipOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-1 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center gap-1.5 mb-1.5 text-slate-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <h5 className="text-xs font-bold text-white">
                        Catatan Evaluasi Tahap Ini
                      </h5>
                    </div>

                    {/* Explanatory Body (Why it stopped) */}
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {rejectionNote ||
                        "Kemampuan percakapan bahasa Jepang (Kaiwa) belum memenuhi standar minimum tahap ini. Disarankan memperdalam latihan dan melamar loker yang sesuai."}
                    </p>

                    {/* Recommendation hint */}
                    <div className="mt-2 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Rekomendasi: Latihan Kaiwa N4</span>
                      <span className="text-emerald-400 font-semibold">Tersedia loker lain</span>
                    </div>

                    {/* Caret Arrow */}
                    <div className="absolute -bottom-1 left-4 sm:left-1/2 sm:-translate-x-1/2 w-2 h-2 bg-[#0F172A] border-r border-b border-slate-700/80 rotate-45" />
                  </div>
                </div>
              ) : state === "active" ? (
                <span className="text-[10px] text-[#C12121] font-semibold mt-1 leading-none select-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C12121] animate-pulse shrink-0" />
                  <span className="truncate">Tahap aktif</span>
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
