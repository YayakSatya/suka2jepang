import React from "react";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = "",
  id,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className={`bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 space-y-5 shadow-xs ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between gap-4">
          <div>
            {title && <h2 className="type-block-title text-[#0A0A0A]">{title}</h2>}
            {subtitle && (
              <p className="type-caption text-[#64748B] mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
