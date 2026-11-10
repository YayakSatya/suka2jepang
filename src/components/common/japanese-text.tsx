import React from "react";

interface JapaneseTextProps {
  kanji: string;
  furigana?: string;
  romaji?: string;
  indonesianMeaning?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function JapaneseText({
  kanji,
  furigana,
  indonesianMeaning,
  className = "",
  size = "md",
}: JapaneseTextProps) {
  const sizeClass =
    size === "sm"
      ? "text-xs"
      : size === "lg"
      ? "text-lg"
      : size === "xl"
      ? "text-2xl"
      : "text-base";

  return (
    <span className={`inline-flex items-baseline gap-1 font-mono ${className}`}>
      {furigana ? (
        <ruby className={`${sizeClass} font-semibold leading-relaxed`}>
          {kanji}
          <rt className="text-[10px] font-bold text-[#A31D1D] select-none tracking-tight">
            {furigana}
          </rt>
        </ruby>
      ) : (
        <span className={`${sizeClass} font-semibold`}>{kanji}</span>
      )}
      {indonesianMeaning && (
        <span className="text-xs text-[#4A5565] font-sans font-normal ml-1">
          ({indonesianMeaning})
        </span>
      )}
    </span>
  );
}
