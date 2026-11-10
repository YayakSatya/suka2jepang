"use client";

import React from "react";
import { Check } from "lucide-react";

export interface StepperHeaderProps {
  currentStep: number;
  completedSteps?: number[];
  className?: string;
  onStepClick?: (stepNumber: number) => void;
}

const STEPS = [
  { number: 1, label: "Data diri" },
  { number: 2, label: "Kualifikasi" },
  { number: 3, label: "Dokumen" },
  { number: 4, label: "Konfirmasi" },
];

export function StepperHeader({
  currentStep = 1,
  completedSteps = [],
  className = "",
  onStepClick,
}: StepperHeaderProps) {
  return (
    <div className={`w-full space-y-2.5 ${className}`}>
      {/* 4-Segment Horizontal Bar */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.number);
          const isActive = step.number === currentStep;
          const isDoneOrActive = isCompleted || isActive || step.number < currentStep;

          return (
            <div
              key={step.number}
              className={`h-2 rounded-full transition-all duration-300 ${
                isDoneOrActive ? "bg-[#C12121]" : "bg-[#E2E8F0]"
              }`}
            />
          );
        })}
      </div>

      {/* Step Labels with Interactive Buttons */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.number) || step.number < currentStep;
          const isActive = step.number === currentStep;
          const canClick = onStepClick && (isCompleted || isActive);

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => canClick && onStepClick(step.number)}
              disabled={!canClick}
              className={`text-left text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                canClick ? "cursor-pointer hover:text-[#C12121]" : "cursor-default"
              }`}
            >
              {isCompleted && !isActive ? (
                <span className="w-4 h-4 rounded-full bg-[#C12121] text-white flex items-center justify-center shrink-0 text-[10px]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              ) : (
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    isActive
                      ? "bg-[#C12121] text-white shadow-xs"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step.number}
                </span>
              )}
              <span
                className={`${
                  isActive
                    ? "font-extrabold text-[#C12121]"
                    : isCompleted
                    ? "font-bold text-[#0A0A0A]"
                    : "font-medium text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
