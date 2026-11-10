"use client";

import React from "react";
import Link from "next/link";

export interface PushableButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "disabled";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function PushableButton({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  size = "md",
  fullWidth = false,
}: PushableButtonProps) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";
  const isDisabled = disabled || variant === "disabled";
  const isFullWidth = fullWidth || className.includes("w-full");

  // Standard size classes for 3D buttons (surface height)
  const surfaceSizeClasses =
    size === "sm"
      ? "px-3.5 py-1.5 text-xs min-h-[36px]"
      : size === "lg"
      ? "px-6 py-3 text-base min-h-[48px]"
      : "px-5 py-2.5 text-sm min-h-[44px]";

  // Size classes for outline/flat border button — matched to full visual height (surface + 4px ledge)
  const outlineSizeClasses =
    size === "sm"
      ? "px-3.5 py-1.5 text-xs min-h-[40px] h-[40px]"
      : size === "lg"
      ? "px-6 py-3 text-base min-h-[52px] h-[52px]"
      : "px-5 py-2.5 text-sm min-h-[48px] h-[48px]";

  // Variant: Outline (flat border button without 3D ledge, but matching dimensions & radius 8px)
  if (isOutline) {
    const outlineClasses = `relative inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold select-none border transition-all ${outlineSizeClasses} ${
      isFullWidth ? "w-full" : "w-full sm:w-auto"
    } ${
      isDisabled
        ? "bg-[#E5E7EB] text-[#99A1AF] border-[#D1D5DC] cursor-not-allowed"
        : "bg-white text-[#1E2939] border-[#D1D5DC] hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] cursor-pointer shadow-xs"
    } ${className}`;

    if (href && !isDisabled) {
      return (
        <Link href={href} className={outlineClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={outlineClasses}
      >
        {children}
      </button>
    );
  }

  // Variant: Primary & Secondary (3D Pushable with 4px ledge underneath, radius 8px)
  const content = (
    <span
      className={`btn-pushable relative pb-[4px] ${
        isFullWidth ? "flex w-full" : "inline-flex w-full sm:w-auto"
      }`}
    >
      {/* 3D Ledge Underneath (Radius 8px) */}
      <span
        className={`absolute inset-0 rounded-[8px] transition-transform ${
          isDisabled
            ? "bg-[#D1D5DC] translate-y-[2px]"
            : isPrimary
            ? "bg-[#DA7A7A] translate-y-[4px]"
            : "bg-[#D1D5DC] translate-y-[4px]"
        }`}
      />

      {/* Surface Facing Front (Radius 8px) */}
      <span
        className={`relative inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold select-none w-full transition-transform active:translate-y-[0px] ${surfaceSizeClasses} ${
          isDisabled
            ? "bg-[#E5E7EB] text-[#99A1AF] translate-y-0 cursor-not-allowed border border-[#D1D5DC]"
            : isPrimary
            ? "bg-[#C12121] text-white hover:translate-y-[-2px] border-none shadow-sm cursor-pointer"
            : "bg-white text-[#1E2939] border border-[#D1D5DC] hover:translate-y-[-2px] cursor-pointer"
        }`}
      >
        {children}
      </span>
    </span>
  );

  const wrapperClasses = isFullWidth
    ? `block w-full ${className}`
    : `inline-block ${className}`;

  if (href && !isDisabled) {
    return (
      <Link href={href} className={wrapperClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={wrapperClasses}
    >
      {content}
    </button>
  );
}
