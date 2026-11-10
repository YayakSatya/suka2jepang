import React from "react";

interface SectorBadgeProps {
  sector: string;
  kanji?: string;
  className?: string;
}

export function SectorBadge({ sector, kanji, className = "" }: SectorBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#155DFC] border border-[#DBEAFE] select-none ${className}`}
    >
      <span>{sector}</span>
      {kanji && (
        <span className="font-mono text-[11px] opacity-75 font-normal">
          {kanji}
        </span>
      )}
    </span>
  );
}
