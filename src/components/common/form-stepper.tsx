import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  number: number;
  label: string;
  sublabel?: string;
}

interface FormStepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  className?: string;
}

export function FormStepper({
  steps,
  currentStep,
  onStepClick,
  className = "",
}: FormStepperProps) {
  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Background Track Line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isPending = step.number > currentStep;

          return (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center bg-[#F9FAFB] px-2"
            >
              <button
                type="button"
                disabled={!onStepClick || isPending}
                onClick={() => onStepClick?.(step.number)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all select-none ${
                  isCompleted
                    ? "bg-[#C12121] text-white shadow-xs cursor-pointer hover:scale-105"
                    : isActive
                    ? "bg-[#C12121] text-white ring-4 ring-[#FEECEC] shadow-sm"
                    : "bg-white border-2 border-slate-300 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>{step.number}</span>
                )}
              </button>

              <span
                className={`text-xs mt-2 font-semibold text-center hidden sm:block ${
                  isActive
                    ? "text-[#C12121]"
                    : isCompleted
                    ? "text-[#0A0A0A]"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
