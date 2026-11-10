import React from "react";

interface StatTileProps {
  label: string;
  value: React.ReactNode;
  unit?: string;
  subtext?: string;
  className?: string;
}

export function StatTile({
  label,
  value,
  unit,
  subtext,
  className = "",
}: StatTileProps) {
  // Defensive guard: if string value already contains the unit, prevent double-rendering (e.g. "¥1.000 / hari / hari")
  let displayUnit = unit;
  if (typeof value === "string" && unit) {
    const normalizedUnit = unit.trim().toLowerCase();
    if (value.toLowerCase().includes(normalizedUnit)) {
      displayUnit = undefined;
    }
  }

  return (
    <div
      className={`p-3.5 rounded-xl bg-[#F9FAFB] border border-slate-200/80 space-y-1 ${className}`}
    >
      <span className="text-xs font-medium text-[#64748B] block leading-tight">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-base sm:text-[17px] font-bold text-[#0A0A0A] leading-tight">
          {value}
        </span>
        {displayUnit && (
          <span className="text-xs font-normal text-[#64748B]">{displayUnit}</span>
        )}
      </div>
      {subtext && (
        <span className="text-[11px] text-[#64748B] block">
          {subtext}
        </span>
      )}
    </div>
  );
}
