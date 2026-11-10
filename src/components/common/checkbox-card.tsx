import React from "react";
import { Check } from "lucide-react";

interface CheckboxCardProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  sublabel?: string;
  className?: string;
  disabled?: boolean;
}

export function CheckboxCard({
  id,
  label,
  checked,
  onChange,
  sublabel,
  className = "",
  disabled = false,
}: CheckboxCardProps) {
  return (
    <label
      htmlFor={id}
      className={`min-h-[44px] p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-all ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-slate-50 border-slate-200"
          : checked
          ? "border-[#C12121] bg-[#FEECEC]/20 text-[#0A0A0A]"
          : "border-slate-200 bg-white text-[#1E2939] hover:bg-slate-50"
      } ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 transition-colors ${
          checked
            ? "bg-[#C12121] text-white"
            : "border border-slate-300 bg-white"
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </span>
      <div className="flex-1">
        <span className="text-xs font-semibold text-[#0A0A0A] block">{label}</span>
        {sublabel && (
          <span className="text-[11px] text-[#64748B] block mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </label>
  );
}
