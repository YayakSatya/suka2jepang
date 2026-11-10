import React from "react";

export type StatusVariant =
  | "verified"
  | "success"
  | "warning"
  | "info"
  | "neutral"
  | "danger";

interface StatusBadgeProps {
  variant?: StatusVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({
  variant = "neutral",
  children,
  className = "",
  dot = false,
}: StatusBadgeProps) {
  const variantStyles: Record<StatusVariant, string> = {
    verified: "bg-[#FEECEC] text-[#C12121]",
    success: "bg-[#ECFDF5] text-[#107C41]",
    warning: "bg-[#FEF9C3] text-[#A16207]",
    info: "bg-[#EFF6FF] text-[#155DFC]",
    neutral: "bg-[#F1F5F9] text-[#475569]",
    danger: "bg-[#FEECEC] text-[#C12121]",
  };

  const dotColors: Record<StatusVariant, string> = {
    verified: "bg-[#C12121]",
    success: "bg-[#107C41]",
    warning: "bg-[#A16207]",
    info: "bg-[#155DFC]",
    neutral: "bg-[#475569]",
    danger: "bg-[#C12121]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold select-none ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0`}
        />
      )}
      <span>{children}</span>
    </span>
  );
}
