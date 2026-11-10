"use client";

import { Download } from "lucide-react";
import { PushableButton } from "@/components/common";

// The browser's print dialog has "Save as PDF", so no PDF library is needed.
export function PrintButton() {
  return (
    <PushableButton onClick={() => window.print()}>
      <Download className="size-4" aria-hidden />
      Unduh PDF
    </PushableButton>
  );
}
