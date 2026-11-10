import React from "react";

interface MatchScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function MatchScoreBadge({ score, size = "md" }: MatchScoreBadgeProps) {
  const is100 = score >= 100;
  const is75 = score >= 70 && score < 100;

  let bgClass = "bg-[#F4F4F6]";
  let numberClass = "text-[#27272A]";
  let textClass = "text-[#71717A]";

  if (is100) {
    bgClass = "bg-[#C12121]";
    numberClass = "text-white";
    textClass = "text-white/90";
  } else if (is75) {
    bgClass = "bg-[#FDE8E8]";
    numberClass = "text-[#C12121]";
    textClass = "text-[#C12121]/90";
  }

  const dimensions =
    size === "sm"
      ? "w-12 h-12 text-sm"
      : size === "lg"
      ? "w-18 h-18 text-xl"
      : "w-16 h-16 text-base";

  return (
    <div
      className={`rounded-full flex flex-col items-center justify-center font-bold shrink-0 select-none ${dimensions} ${bgClass}`}
    >
      <span className={`font-black tracking-tight leading-none text-lg ${numberClass}`}>
        {score}%
      </span>
      <span className={`text-[11px] font-medium leading-tight mt-0.5 ${textClass}`}>
        cocok
      </span>
    </div>
  );
}
