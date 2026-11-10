import React, { Suspense } from "react";
import { StudentHeader } from "@/components/common/student-header";

export default function JobApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Suspense
        fallback={
          <header className="h-14 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] px-4 md:px-8 py-3" />
        }
      >
        <StudentHeader />
      </Suspense>
      <main className="flex-1 pb-20">{children}</main>
    </div>
  );
}
